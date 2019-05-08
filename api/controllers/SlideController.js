/**
 * SlideController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
    find: async function(req, res) {
        var data = await Slide.find()
        return res.send(data)
    },

    new: function(req, res) {
        return res.view('banner/new')
    },

    list: function(req, res) {
        Slide.find().exec(function(err, _slide) {
            return res.view('banner/slide', {
                data: _slide
            })
        })
    },

    update: function(req, res) {
        Slide.find({ id: req.param("id") }).exec(function(err, _slider) {
            return res.view('banner/edit', {
                data: _slider
            })
        })
    },

    create: function(req, res) {
        req.file('gambar').upload({ dirname: '../../assets/images/uploads/', maxBytes: 10000000 }, function(err, files) {
            req.file('gambar').upload({ dirname: '../../assets/images/uploads/' }, function(err, data) {
                console.log(data)
                if (files.length === 0) {
                    return res.serverError("no files")
                }
            })
            if (err) return res.serverError(err);
            var fileUID = files[0].fd.replace(/^.*[\\\/]/, '');

            var data = {
                name: req.param("name"),
                gambar: fileUID
            }
            Slide.create(data).then(function(err, _slide) {
                return res.redirect('/list/banner')
            })
        })
    },

    edit: function(req, res) {
        req.file('gambar').upload({ dirname: '../../assets/images/uploads/', maxBytes: 10000000 }, function(err, files) {
            req.file('gambar').upload({ dirname: '../../assets/images/uploads/' }, function(err, data) {
                console.log(data)
                if (files.length === 0) {
                    return res.serverError("no files")
                }
            })
            if (err) return res.serverError(err);
            var fileUID = files[0].fd.replace(/^.*[\\\/]/, '');
            Slide.update({ id: req.param("id") }, {
                name: req.param("name"),
                gambar: fileUID
            }).then(function(err, _update) {
                return res.redirect('/list/banner')
            })

        })
    },

    delete: function(req, res) {
        Slide.destroy({ id: req.param("id") }).exec(function(err, _slide) {
            return res.redirect('/list/banner')
        })
    }



};