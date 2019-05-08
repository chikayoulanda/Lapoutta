/**
 * CartController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
    add: async function (req, res) {
        var _addCart = {
            quantity: req.param("quantity"),
            is_active: req.param("is_active"),
            id_customer: req.param("id_customer"),
            id_product: req.param("id_product")
        }

        var _check = await Product.find({ id: req.param("id_product") })
        // console.log(_addCart.quantity)
        if (_check[0].stock >= _addCart.quantity) {
            var _add = await Cart.create(_addCart).fetch()
            return res.send(_add)
        }
        if (_check[0].stock < _addCart.quantity) {
            return res.send("insufficient stock")
        }

    },

    update: async function (req, res) {
        Product.find({id:req.param("id_product")}).exec(function(err, _check){
            if (_check[0].stock >= req.param("quantity")) {
                Cart.update({ id: req.param("id") }, {
                    quantity: req.param("quantity"),
                    is_active: req.param("is_active")
                }).then(function(err, updateCart){
                    return res.status(200).json({
                        status: "update success"
                    })
                })
            }
            if (_check[0].stock < req.param("quantity")) {
                return res.status(200).json({
                    status: "update gagal"
                })
            }
        })
        
    },

    delete: async function (req, res) {
        var _cart = await Cart.destroy({ id: req.param("id") }).fetch()
        var msg = {
            message: "deleted product"
        }
        return res.status(200).json({
            status: "deleted success"
        })
    },

    list: async function(req, res){
        var _listCart= await Cart.find({id_customer:req.param("id_customer")})
        return res.send(_listCart)
    }


};

