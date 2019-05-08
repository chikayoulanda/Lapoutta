/**
 * TransactionStatusController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
    new: function(req, res) {
        res.view('transaction/new')

    },

    view: function(req, res) {
        res.view('transaction/listStatus')
    },

    add: function(req, res) {
        var _status = {
            name: req.param("name")
        }
        return Transaction_status.create(_status).then(function(err, _data) {
            return res.view('transaction/listStatus')
        })

    },

    edit: function(req, res) {
        return Transaction_status.update({ id: req.param("id") }, {
            name: req.param("name")
        }).then(function(err, _update) {
            return res.view('transaction/listStatus')
        })

    },

    find: async function(req, res) {
        var _id = req.param("id")
        var _status = await Transaction_status.find({ id: _id })
        var data = {
            id: _status[0].id,
            name: _status[0].name
        }
        return res.json(data)
    },

    list: async function(req, res) {
        console.log("====== list store status ======")
        var _transactionStatus = await Transaction_status.find({
            select: ['id', 'name']
        });
        var data = {
            "data": _transactionStatus
        }
        return res.json(data);
    },

    delete: async function(req, res) {
        var data = await Transaction_status.destroy({ id: req.param("id") }).fetch()
        var message = {
            msg: "telah berhasil menghapus status transaksi"
        }
        return res.send(message)
    },

    listApi: function(req, res) {
        Transaction_status.find({ id: req.param("id") }).exec(function(err, _list) {
            return res.send(_list)
        })
    },

    listTransApi: function(req, res) {
        Transaction_status.find().exec(function(err, _trans) {
            return res.json(_trans)
        })
    }
};