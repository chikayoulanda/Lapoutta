/**
 * StoreController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

    view: function (req, res) {
        res.view('store/list')
    },

    store: function (req, res) {
        res.view('store/lists')
    },

    request: async function (req, res) {
        console.log("======= request store ========")
        var newRequest = {
            name: req.param("name"),
            no_telp: req.param("no_telp"),
            address: req.param("address"),
            provinsi: req.param("provinsi"),
            kabupatenKota: req.param("kabupatenKota"),
            kecamatan: req.param('kecamatan'),
            id_customer: req.param("id_customer"),
            no_KTP: req.param("no_KTP"),
            no_Rekening: req.param("no_Rekening"),
            id_store_status: 1
        }
        Store.create(newRequest).then(function (err, _data) {
            Store.find().sort('id DESC').exec(function (err, _newStore) {
                Store.find().sort('id DESC').limit(1).exec(function (err, print) {
                    console.log(_newStore[0].id)
                    var _notif = {
                        body: "Request store form customer",
                        title: "Request Store",
                        role: "Store",
                        id_receiver: 1,
                        id_request: _newStore[0].id
                    }
                    Notif.create(_notif).then(function (err, _next) {
                        console.log("hsasia")
                        return res.send(print)
                    })
                })
            })
        })
    },

    status: async function (req, res) {
        console.log("masuk list")
        var _store = await Store.find({
            select: ['id', 'name', 'no_telp', 'address', 'id_store_status']
        })
        var data = {
            "data": _store
        }
        return res.json(data)
    },

    list: async function (req, res) {
        console.log("masuk list Toko")
        var _store = await Store.find({
            select: ['id', 'name', 'no_telp', 'address', 'id_store_status']
        }).where({ id_store_status: 2 })
        var data = {
            "data": _store
        }
        return res.json(data)

    },

    accept: function (req, res) {
        console.log("===accept=====")
        Store.update({ id: req.param("id") }, {
            id_store_status: 2
        }).exec(function (err, _storeUpdate) {
            Store.find({ id: req.param("id") }).exec(function (err, _store) {
                var data = {
                    body: "Your store request has been received. Please manage your store",
                    title: "Store Accepted",
                    role: "Store",
                    id_receiver: _store[0].id_customer,
                    id_request: req.param("id")
                }
                Notif.create(data).then(function (_notif) {
                    return res.send();
                })
            })

        })

    },

    reject: function (req, res) {
        console.log("===reject====")
        return Store.update({ id: req.param("id") }, {
            id_store_status: 3
        }).then(function (err, _storeUpdate) {
            Store.find({ id: req.param("id") }).exec(function (_store) {
                var data = {
                    body: "Your store request has been rejected. Please request again with the request data",
                    title: "Store Rejected",
                    role: "Store",
                    id_receiver: _store[0].id_customer,
                    id_request: req.param("id")
                }
                return Notif.create(data).then(function (_notif) {
                    res.send();
                })
            })
        })
    },

    viewDetail: function (req, res) {
        Store.find({ id: req.param("id") }).populate('id_customer').exec(function (err, _store) {
            return res.view('store/detail', {
                store: _store
            })
        })
    },

    updateStore: async function (req, res) {
        var _id = req.param("id")
        var find = Store.find({ id: _id })
        var _update = await Store.update({ id: _id }, {
            name: req.param("name"),
            no_telp: req.param("no_telp"),
            address: req.param("address"),
            provinsi: req.param("provinsi"),
            kabupatenKota: req.param("kabupatenKota"),
            kecamatan:req.param("kecamatan"),
            no_KTP: req.param("no_KTP"),
            no_Rekening: req.param("no_Rekening")
        }).fetch()
        return res.send(_update)
    },

    detailApi: async function (req, res) {
        console.log("detail store")
        var _id = req.param("id")
        var data = await Store.find({ id: _id })
        return res.send(data)
    },

    detailApiCus: async function (req, res) {
        var _id = req.param("id_customer")
        var data = await Store.find({ id_customer: _id })
        return res.send(data)
    }



};

