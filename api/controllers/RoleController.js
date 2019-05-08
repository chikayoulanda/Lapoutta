/**
 * RoleController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
    new: function (req, res) {
        res.view('role/new')
    },

    view: function (req, res) {
        res.view('role/list')
    },

    add: function (req, res) {
        var newRole = {
            name: req.param("name")
        }
        return Role.create(newRole).then(function (_newRole) {
            return res.view('role/list')
        })
    },

    update: function (req, res) {
        return Role.update({ id: req.param("id") }, {
            name: req.param("name")
        }).then(function (_role) {
            return res.status(200).json({
                status: 'success'
            })
        })
    },
    
    find:async function(req, res){
        console.log("......find......")
        var _id= req.param("id")
        var _role= await Role.find({id:_id})
        var data={
            id:_role[0].id,
            name:_role[0].name
        }
        return res.json(data)
    },

    list: async function (req, res) {
        console.log("list produk.....")
        var _role = await Role.find({
            select: ['id', 'name']
        });
        var data = {
            "data": _role
        }
        return res.json(data);
    },

    delete: async function (req, res) {
        console.log("Inside delete..............");
        var _id = req.param("id");
        var burnedBooks = await Role.destroy({ id: _id }).fetch();
        var data = {
            msg: "data role berhasil untuk dihapus"
        }
        return res.send(data);
    },
};

