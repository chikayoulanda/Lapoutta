/**
 * StoreStatusController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
    new: function (req, res) {
        res.view('store/newStatus')
    },

    view: function (req, res) {
        res.view('store/listStatus')
    },

    add: function (req, res) {
        console.log('======add store status')
        var newStatus = {
            name_status: req.param("name_status")
        }
        return Store_status.create(newStatus).then(function (_status) {
            return res.view('store/listStatus')
        })
    },

    update: function (req, res) {
        console.log('======= update store status ==========')
        return Store_status.update({ id: req.param("id") }, {
            name_status: req.param("name_status")
        }).then(function (_role) {
            return res.status(200).json({
                status: 'success'
            })
        })
    },

    find: async function (req, res) {
        var _id = req.param("id")
        var _status = await Store_status.find({ id: _id })
        var data = {
            id: _status[0].id,
            name_status: _status[0].name_status
        }
        return res.json(data)
    },

    list: async function (req, res) {
        console.log("====== list store status ======")
        var _storeStatus = await Store_status.find({
            select: ['id', 'name_status']
        });
        var data = {
            "data": _storeStatus
        }
        return res.json(data);
    },

    delete: async function (req, res) {
        console.log("Inside delete..............");
        var _id = req.param("id");
        var burnedBooks = await Store_status.destroy({ id: _id }).fetch();
        var data = {
            msg: "Berhasil menghapus data categori"
        }
        return res.send(data);
    },


};

