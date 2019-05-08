/**
 * ConfirmController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
    viewPayment: function (req, res) {
        return res.view('confirmation/payment')
    },

    confirmPayment: async function (req, res) {
        var _payment = await Payment_confirmation.find({select: ['transfer_from', 'id_transaction', 'total', 'id_bank', 'id_payment_status']})
        var data = {
            "data": _payment
        }
        return res.send(data)
    },

    accept: function (req, res) {
        console.log("diterimaaaaa")
        Payment_confirmation.update({ id: req.param("id") }, {
            id_payment_status: 2
        }).exec(function (err, _payment) {
            Payment_confirmation.find({ id: req.param("id") }).exec(function (err, _pay) {
                console.log(_pay[0].id_transaction)
                Transaction.update({ id: _pay[0].id_transaction }, {
                    id_transaction_status: 2
                }).exec(function (err, _trans) {
                    Transaction.find({ id: _pay[0].id_transaction }).exec(function (err, _notif) {
                        console.log("notifffffff")
                        var _data = {
                            body: "Confirmation of payment received the item will be packaged immediately",
                            title: "Payment Accepted",
                            role: "product",
                            id_receiver: _notif[0].id_customer,
                            id_request:_notif[0].no_order
                        }
                        Notif.create(_data).exec(function (err, _next) {
                            return res.send(_next)
                        })
                    })

                })
            })

        })
    },

    reject: function (req, res) {
        console.log("diterimaaaaa")
        Payment_confirmation.update({ id: req.param("id") }, {
            id_payment_status: 3
        }).exec(function (err, _payment) {
            Payment_confirmation.find({ id: req.param("id") }).exec(function (err, _pay) {
                console.log(_pay[0].id_transaction)
                Transaction.update({ id: _pay[0].id_transaction }, {
                    id_transaction_status: 1
                }).exec(function (err, _trans) {
                    Transaction.find({ id: _pay[0].id_transaction }).exec(function (err, _notif) {
                        console.log("notifffffff")
                        var _data = {
                            body: "Confirmation of payment rejected the item will be packaged immediately",
                            title: "Payment Rejected",
                            role: "product",
                            id_receiver: _notif[0].id_customer,
                            id_request:_notif[0].no_order
                        }
                        Notif.create(_data).exec(function (err, _next) {
                            return res.send(_next)
                        })
                    })
                })
            })

        })
    },

    addNotif: function (req, res) {
        Transaction.find({ id: req.param("id_transaction") }).exec(function (err, _trans) {
            var _notif = {
                title: req.param("title"),
                body: req.param("body"),
                id_receiver: _trans[0].id_customer
            }
            Notif.create(_notif).fetch()
        })
        return res.view('confirmation/payment')

    },

    listNotif: async function (req, res) {
        var _list = await Notif.find().where({ id_receiver: req.param("id_receiver") }).sort('id DESC')
        return res.json(_list)
    },

    list:function (req, res){
    
    }
};

