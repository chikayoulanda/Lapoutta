/**
 * TransactionController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
const crypto = require('crypto');

module.exports = {
    orderNow: async function(req, res) {
        var _newTrans = {
            id_customer: req.param("id_customer"),
            id_shipment: 1,
            no_order: crypto.randomBytes(4).toString('hex'),
            id_transaction_status: 1
        }
        var _dataStore = await Store.find().where({ id_customer: _newTrans.id_customer })
        if (_dataStore != 0) {
            return res.json("this is your product")
        }
        if (_dataStore == 0) {
            var trans = await Transaction.create(_newTrans).fetch()
            var _quantity = req.param("quantity")
            var _product = req.param("id_product")
            var _find = await Product.find({ id: _product })
            if (_quantity == 1) {
                var _detailTrans = {
                    quantity: 1,
                    sub_total: _find[0].price,
                    id_product: _product,
                    id_transaction: trans.id
                }
                return Transaction_detail.create(_detailTrans).then(function(err, _detail) {
                    Transaction_detail.find({ id_transaction: trans.id }).exec(function(err, _transNow) {
                        return res.json(_transNow)
                    })
                })
            }
            if (_quantity != 1) {
                var _detailTrans = {
                    quantity: _quantity,
                    sub_total: _quantity * _find[0].price,
                    id_product: _product,
                    id_transaction: trans.id
                }
                return Transaction_detail.create(_detailTrans).then(function(err, _detail) {
                    Transaction_detail.find({ id_transaction: trans.id }).exec(function(err, _transNow) {
                        return res.json(_transNow)
                    })
                })
            }

        }


    },

    payment: async function(req, res) {
        var data_payment = {
            transfer_from: req.param("transfer_from"),
            transfer_to: req.param("transfer_to"),
            total: req.param("total"),
            id_transaction: req.param("id_transaction"),
            id_customer: req.param("id_customer"),
            id_bank: req.param("id_bank"),
            id_payment_status: 1
        }
        if (data_payment.id_transaction != null && data_payment.id_customer != null) {
            var _payment = await Payment_confirmation.create(data_payment).fetch()
            return res.send(_payment)
        }
    },

    checkout: function(req, res) {
        var _checkout = {
            id_customer: req.param("id_customer"),
            id_shipment: 1,
            no_order: crypto.randomBytes(4).toString('hex'),
            id_transaction_status: 1
        }
        Cart.find({ id_customer: _checkout.id_customer }).populate('id_product').exec(function(err, _cart) {
            Store.find().where({ id: _cart[0].id_product.id_store }).exec(async function(err, _store) {
                if (_store[0].id_customer === _checkout.id_customer) {
                    return res.json("this is your product")
                }

                if (_store[0].id_customer != _checkout.id_customer) {
                    var _trans = await Transaction.create(_checkout).fetch()
                    var data = await Cart.find({
                        where: {
                            id_customer: _trans.id_customer,
                            is_active: 1
                        }
                    })
                    if (data.length == 1) {
                        var _count = data[0].quantity
                        var _find = await Product.find({ where: { id: data[0].id_product } })
                        var _product = {
                            quantity: _count,
                            sub_total: _count * _find[0].price,
                            id_product: data[0].id_product,
                            id_transaction: _trans.id
                        }
                        return Transaction_detail.create(_product).then(async function(err, _cart) {
                            var _data = await Cart.destroy({ id: data[0].id }).fetch()
                            Transaction_detail.find({ id_transaction: _trans.id }).exec(function(err, _transNow) {
                                return res.json(_transNow)
                            })
                        })
                    }
                    if (data.length > 1) {
                        for (var i = 0; i < data.length; i++) {
                            var _count = data[i].quantity
                            var _find = await Product.find({
                                where: {
                                    id: data[i].id_product
                                }
                            })
                            console.log(_find)
                            var _product = {
                                quantity: _count,
                                sub_total: _count * _find[0].price,
                                id_product: data[i].id_product,
                                id_transaction: _trans.id
                            }
                            var _detail = await Transaction_detail.create(_product).fetch()
                            var _cart = await Cart.destroy({ id: data[i].id })

                        }
                        Transaction_detail.find({ id_transaction: _trans.id }).exec(function(err, _transNow) {
                            return res.json(_transNow)
                        })
                    }
                }
            })
        })
    },

    view: function(req, res) {
        return res.view('transaction/list')
    },

    list: async function(req, res) {
        console.log("====== list store status ======")
        var _transactionStatus = await Transaction.find({
            select: ['id', 'no_order', 'id_transaction_status']
        });
        var data = {
            "data": _transactionStatus
        }
        return res.json(data);
    },

    listApi: function(req, res) {
        console.log("++list==")
        Transaction_detail.find({ id_transaction: req.param("id_transaction") }).exec(function(err, _trans) {
            return res.send(_trans)
        })
    },

    listTransaction: function(req, res) {
        console.log("++list transaksi==")
        Transaction.find({ id: req.param("id") }).exec(function(err, _trans) {
            return res.send(_trans)
        })
    },

    listTransaksiUser: function(req, res) {
        console.log("list transaksi berdasrkan id_user")
        Transaction.find({ id_customer: req.param("id_customer") }).exec(function(err, _trans) {
            return res.send(_trans)
        })
    },

    detailTrans: function(req, res) {
        Transaction.find({ id: req.param("id") }).exec(function(err, _detail) {
            return res.send(_detail)
        })
    },

    listTransStore: function(req, res) {
        console.log("===Masuk=====")
        Store.find({ id: req.param("id") }).populate('product').exec(function(err, _store) {
            console.log(_store)
            Transaction_detail.find({ id_product: _store[0].product.id }).exec(function(err, _list) {
                Transaction.find({ id: _list[0].id_transaction }).exec(function(err, _transaction) {
                    return res.send(_transaction)
                })
            })
        })
    },

    listApiStore: function(req, res) {
        console.log("===Masuk=====")
        Store.find({ id: req.param("id") }).populate('product').exec(function(err, _store) {
            console.log(_store)
            Transaction_detail.find({ id_product: _store[0].product.id }).exec(function(err, _list) {
                return res.send(_list)
            })
        })
    },

    updateship: async function(req, res) {
        var _update = await Transaction.update({ id: req.param("id") }, {
            id_shipment: req.param("id_shipment")
        }).fetch()
        return res.send(_update)
    },

    ongkir: function(req, res) {
        Transaction.update({ id: req.param("id") }, {
            ongkir: req.param("ongkir")
        }).exec(function(err, _ongkir) {
            Transaction.find({ id: req.param("id") }).exec(function(err, _trans) {
                return res.json(_trans)
            })
        })
    },

    detail:function(req, res){
        Transaction_detail.find({id_transaction:req.param('id')}).populate('id_customer').populate('id_product').populate('id_transaction').exec(function(err, _detail){
            Address.find({id_customer:_detail[0].id_customer}).exec(function(err, _cust){
                return res.view('transaction/detail',{
                    data:_detail,
                    cus:_cust
                })
            })
        })
    } 
};