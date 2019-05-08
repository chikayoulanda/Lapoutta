/**
 * ProductStatusController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
    new: function (req, res) {
        res.view('product/status')
    },

    view: function (req, res) {
        res.view('product/listStatus')
    },

    add: function (req, res) {
        console.log('add product status')
        var newStatus = {
            name: req.param("name")
        }
        return Product_status.create(newStatus).then(function (_status) {
            return res.view('product/listStatus')
        })
    },

    update: function (req, res) {
        console.log('======= update product status ==========')
        return Product_status.update({ id: req.param("id") }, {
            name: req.param("name")
        }).then(function (_role) {
            return res.view('product/listStatus')
        })
    },

    find: async function (req, res) {
        var _id = req.param("id")
        var status = await Product_status.find({ id: _id })
        var data = {
            id: status[0].id,
            name: status[0].name
        }
        return res.json(data)
    },

    list: async function (req, res) {
        console.log("====== list product status ======")
        var _productStatus = await Product_status.find({
            select: ['id', 'name']
        });
        var data = {
            "data": _productStatus
        }
        return res.json(data);
    },

    delete: async function (req, res) {
        console.log("Inside delete..............");
        var _id = req.param("id");
        var burnedBooks = await Product_status.destroy({ id: _id }).fetch();
        var data = {
            msg: "Anda telah berhasil menghapus data status produk"
        }
        return res.send(data);
    },

    listApi:function(req, res){
        Product_status.find().exec(function(err, _status){
            return res.send(_status)
        })
    }

};

