module.exports = {

    create: async function (req, res, image) {
        var newProduct = {
            name: req.param("name"),
            price: req.param("price"),
            stock: req.param("stock"),
            description: req.param("description"),
            id_category: req.param("id_category"),
            berat: req.param("berat"),
            id_store: req.param("id_store"),
            id_product_status: req.param("id_product_status")
        }
        var data = await Product.create(newProduct).fetch()
        Product.find({ id: data.id }).populate('id_store').populate('id_product_status').exec(function (err, _product) {
            return res.send(_product)
        })
    },

    update: async function (req, res) {
        console.log("update product")
        var _discount = await Product.update({ id: req.param("id") }, {
            name: req.param("name"),
            price: req.param("price"),
            stock: req.param("stock"),
            description: req.param("description"),
            id_category: req.param("id_category"),
            berat: req.param("berat"),
            id_product_status: req.param("id_product_status")
        }).fetch()
        console.log(_discount)
        var _diskon = {
            discount: req.param("discount"),
            id_product: _discount.id
        }
        Discount.create(_diskon).fetch()
        return res.send(_discount)

    },

    delete: function (req, res) {
        return Product.destroy({ id: req.param("id") }).fetch()
    },

    detail: function (req, res) {
        console.log("masuk detail...")
        var _id = req.param("id")
        console.log(_id)
        Product.find({ id: _id }).populate('id_category').populate('id_store').populate('id_product_status').exec(function (err, _product) {
            Review.find({ id_product: _id }).populate('id_customer').exec(function (err, _review) {
                // Image.find({ id_product: _id }).exec(function (err, _image) {
                    return res.view("product/detail", {
                        product: _product,
                        review: _review,
                        // image: _image
                    // })
                    // })
                })
            })

        })
    },

    lists: function (req, res) {
        res.view('product/list')
    },

    list: async function (req, res) {
        var _product = await Product.find({
            select: ['id', 'name', 'price', 'id_category']
        })
        var data = {
            "data": _product
        }
        return res.json(data)
    },

    details: function (req, res) {
        res.view('product/detail')
    },

    detailApi: function (req, res) {
        console.log("=====detail Product=====")
        var _id = req.param("id")
        try {
            Product.find({ id: _id }).populate('id_store').populate('id_product_status').exec(function (err, _detail) {
                console.log(_detail)
                return res.send(_detail)
            })

        } catch (error) {

        }
    },

    listApi: async function (req, res) {
        var _list = await Product.find().sort( 'id ASC' ).populate('id_store').populate('id_product_status')
        var data = {
            "List": _list
        }
        return res.json(data)
    },

    listApiName: async function (req, res) {
        var _list = await Product.find().sort('name ASC').populate('id_store').populate('id_product_status')
        var data = {
            "List": _list
        }
        return res.json(data)
    },

    listApiPrice: async function (req, res) {
        var _list = await Product.find().sort('price ASC').populate('id_store').populate('id_product_status')
        var data = {
            "List": _list
        }
        return res.json(data)
    },

    listApiPrice2: async function (req, res) {
        var _list = await Product.find().sort('price DESC').populate('id_store').populate('id_product_status')
        var data = {
            "List": _list
        }
        return res.json(data)
    },

    listApiStore: async function (req, res) {
        var _list = await Product.find({ id_store: req.param("id_store") }).sort( 'id ASC' ).populate('id_store').populate('id_product_status')
        var data = {
            "List": _list
        }
        return res.json(data)
    },

    listApiStoreName: async function (req, res) {
        var _list = await Product.find({ id_store: req.param("id_store") }).sort('name ASC').populate('id_store').populate('id_product_status')
        var data = {
            "List": _list
        }
        return res.json(data)
    },

    listApiStorePrice: async function (req, res) {
        var _list = await Product.find({ id_store: req.param("id_store") }).sort('price ASC').populate('id_store').populate('id_product_status')
        var data = {
            "List": _list
        }
        return res.json(data)
    },

    listApiStorePrice2: async function (req, res) {
        var _list = await Product.find({ id_store: req.param("id_store") }).sort('price DESC').populate('id_store').populate('id_product_status')
        var data = {
            "List": _list
        }
        return res.json(data)
    },

    listApiCategory: async function (req, res) {
        var _list = await Product.find({ id: req.param("id_category") }).sort([{ id: 'ASC' }]).populate('id_store').populate('id_product_status')
        var data = {
            "List": _list
        }
        return res.json(data)
    },

    addImage: function (req, res) {
        req.file('gambar').upload({ dirname: '../../.tmp/public/images/uploads/', maxBytes: 10000000 }, function (err, files) {
            req.file('gambar').upload({ dirname: '../../assets/images/uploads/' }, function (err, data) {
                console.log(data)
                if (files.length === 0) {
                    return res.serverError("no files")
                }
            })
            if (err) return res.serverError(err);
            var fileUID = files[0].fd.replace(/^.*[\\\/]/, '');
            Product.update({ id: req.param("id") }, {
                gambar: fileUID
            }).exec(function (err, _profi) {
                res.json({ status: 200, file: files })

            })
        })
    },

    listProductCategory: function (req, res) {
        Category_product.find({ id: req.param("id") }).exec(function (err, _category) {
            Product.find({ id_category: _category[0].id }).populate('id_product_status').populate('id_store').exec(function (err, _product) {
                return res.send(_product)
            })
        })
    },

    search: async function (req, res) {
        var _name = req.param("name")
        // Product.find().where({name:_name}).exec(function(err, _product){
        //     console.log(_product)
        //     return res.send(_product)
        // })
        var _product = await Product.find({
            name: { startsWith: _name }
        }).populate('id_store').populate('id_product_status')
        return res.send(_product)
    },

    coba: async function (req, res) {
        req.session.authenticated = true
        console.log(req.session)
        var _list = await Product.find().sort([{ id: 'ASC' }]).populate('id_store').populate('id_product_status')
        var data = {
            "List": _list
        }
        return res.json(data)
    }

};