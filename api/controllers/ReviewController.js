/**
 * ReviewController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
    create: function(req, res){
        var _review={
            body:req.param("body"),
            id_customer:req.param("id_customer"),
            id_product:req.param("id_product")
        }
        Review.create(_review).then(function(_newReview){
            return res.status(200).json({
                status:"success"
            })
        })
    },

    list: async function(req, res){
        var _review= await Review.find().where({id_product:req.param("id_product")}).populate('id_customer').populate('id_product')
        return res.send(_review)
    },

    listby: async function(req, res){
        var _review= await Review.find().where({id:req.param("id_product")}).populate('id_customer').populate('id_product').limit(3)
        return res.send(_review)
    },

    delete: async function(req, res){
        var _review=await Review.destroy({id:req.param("id")}).fetch()
        var msg={
            message:"deleted review product"
        }
        return res.send("delete succces")
    }
  

};

