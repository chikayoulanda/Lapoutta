/**
 * CustomerController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
    view: function (req, res) {
        res.view('customer/list')
    },
    list: async function (req, res) {
        var _customer = await Customer.find({
            select: ['id', 'name', 'no_telp']
        })
        var data = {
            "data": _customer
        }
        return res.json(data)
    },
    detail: function (req, res) {
        var _id = req.param('id')
        Customer.find({ id: _id }).populate('id_user').exec(function (err, _customer) {
            return res.view("customer/detail", {
                customer: _customer
            })
        })
    },
    details: function (req, res) {
        res.view('customer/detail')
    }


};


