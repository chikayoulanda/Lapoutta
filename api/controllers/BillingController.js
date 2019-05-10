/**
 * BillingController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
    view: function (req, res) {
        console.log("list billing")
        Billing.find().populate('code').exec(function (err, _bill) {
            return res.view('confirmation/billing', {
                billing: _bill
            })
        })
    },

    find:function(req, res){
        Billing.find({
            select:['id', 'name', 'code', 'total', 'status_trans', 'status']
        }).exec(function(err, _data){
            var data = {
                "data": _data
            }
            return res.json(data);
        })
    },

    viewConfirm:function(req, res){
        return res.view('confirmation/confir')
    },

    confirm: function (req, res) {
        req.file('image').upload({ dirname: '../../.tmp/public/images/uploads/', maxBytes: 10000000 }, function (err, files) {
            if (files.length === 0) {
                return res.serverError("no files")
            }
            if (err) return res.serverError(err);
            var fileUID = files[0].fd.replace(/^.*[\\\/]/, '');
            Billing.update({ id: req.param('id') }, {
                image: fileUID,
                status: "Sudah dibayar"
            }).then(function (err, _profi) {
                return res.redirect('/list/billing')
            })
        })
    },

    detail: function(req, res){
        Billing.find({id:req.param('id')}).populate('code').exec(function(err, _detail){
            return res.view('confirmation/detail',{
                data:_detail
            })
        })
    },

    list: function(req, res){
        Billing.find().populate('code').exec(function(err, _bill){
            return res.json(_bill)
        })
    },

    detailApi: function(req, res){
        Billing.find({id:req.param('id')}).populate('code').exec(function(err, _detail){
            return res.json(_detail)
        })
    }

};

