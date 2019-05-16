/**
 * PaymentStatusController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
    new: function (req, res) {
        res.view('payment/new')

    },

    view: function (req, res) {
        res.view('payment/listStatus')
    },

    add: function (req, res) {
        var _status = {
            name: req.param("name")
        }
        return Payment_status.create(_status).then(function (err, _data) {
            return res.view('payment/listStatus')
        })

    },

    edit: function (req, res) {
        return Payment_status.update({ id: req.param("id") }, {
            name: req.param("name")
        }).then(function (err, _update) {
            return res.view('payment/listStatus')
        })

    },

    find: async function (req, res) {
        var _id = req.param("id")
        var _status = await Payment_status.find({ id: _id })
        var data = {
            id: _status[0].id,
            name: _status[0].name
        }
        return res.json(data)
    },

    list: async function (req, res) {
        console.log("====== list store status ======")
        var _Status = await Payment_status.find({
            select: ['id', 'name']
        });
        var data = {
            "data": _Status
        }
        return res.json(data);
    },

    delete: async function (req, res) {
        var data = await Payment_status.destroy({ id: req.param("id") }).fetch()
        var message = {
            msg: "telah berhasil menghapus status transaksi"
        }
        return res.send(message)
    },

    listApi:function(req, res){
        Payment_status.find().exec(function(err, _newStatus){
            return res.send(_newStatus)
        })       
    },

    detailPay:function(req, res){
        Payment_confirmation.find({id:req.param("id")}).populate('id_transaction').populate('id_payment_status').exec(function(err, Pay){
            return res.view('confirmation/payDetail',{
                _pay:Pay
            })
        })
    }

};

