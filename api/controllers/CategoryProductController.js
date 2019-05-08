module.exports = {
    new: function (req, res) {
        console.log("===masuk===")
        
        Category_product.count(function(err, num){
            console.log(num)
        })
        res.view('product/category')
    },

    view: function (req, res) {
        res.view('product/listCategory')
    },

    add: function (req, res) {
        console.log('======add category product =======')
        var newCategory = {
            name: req.param("name")
        }
        return Category_product.create(newCategory).then(function (_category) {
            return res.view('product/listCategory')
        })
    },

    update: function (req, res) {
        console.log('======= update category product ==========')
        return Category_product.update({ id: req.param("id") }, {
            name: req.param("name")
        }).then(function (_role) {
            return res.view('product/listCategory')
        })
    },

    find: async function (req, res) {
        var _id = req.param("id")
        var _category = await Category_product.find({ id: _id })
        var data = {
            id: _category[0].id,
            name: _category[0].name
        }
        return res.json(data)
    },

    list: async function (req, res) {
        console.log("====== list category product ======")
        var _category = await Category_product.find({
            select: ['id', 'name']
        });
        var data = {
            "data": _category
        }
        return res.json(data);
    },

    delete: async function (req, res) {
        console.log("Inside delete..............");
        var _id = req.param("id");
        var burnedBooks = await Category_product.destroy({ id: _id }).fetch();
        var data = {
            msg: "berhasil menghapus data categori"
        }
        return res.send(data);
    },

    listApi:function(req, res){
        Category_product.find().exec(function(err, _category){
            return res.send(_category)
        })
    },

    uodateApi:function(req, res){
        Category_product.find({id:req.param("id")}).exec(function(err, _category){
            return res.send(_category)
        })
    }

};

