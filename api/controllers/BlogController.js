/**
 * BlogController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
    create:function(req, res){
        var _blog={
            body:req.param("body"),
            type:req.param("type"),
            id_product:req.param("id_product")
        }
        Blog.create(_blog).then(function(err, _newBlog){
            return res.status(200).json({
                status:"success"
            })
        })
    },

    update:function(req, res){
        Blog.update({id:req.param("id")},{
            body:req.param("body"),
            type:req.param("type")
        })
        return res.status(200).json({
            status:"success"
        })
    },

    list:function(req, res){
        Blog.find({id_product:req.param("id_product")}).populate('id_product').exec(function(err, _blog){
            return res.json(_blog)
        })
    },

    delete:function(req, res){
        Blog.destroy({id:req.param("id")}).exec(function(err, _blog){
            return res.status(200).json({
                status: "success"
            })
        })
    }

};

