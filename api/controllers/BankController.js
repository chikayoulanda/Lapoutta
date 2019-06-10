module.exports = {

    new: function(req, res) {
        res.view('bank/new')

    },

    view: function(req, res) {
        res.view('bank/list')
    },

    add: function(req, res) {
        var _bank = {
            name: req.param("name"),
            no_rek: req.param("no_rek"),
            bank: req.param("bank")
        }
        return Ref_bank.create(_bank).then(function(err, _data) {
            return res.view('bank/list')
        })

    },

    edit: function(req, res) {
        return Ref_bank.update({ id: req.param("id") }, {
            name: req.param("name"),
            no_rek: req.param("no_rek"),
            bank: req.param("bank")
        }).then(function(err, _update) {
            return res.view('bank/list')
        })

    },

    find: async function(req, res) {
        var _id = req.param("id")
        var _bank = await Ref_bank.find({ id: _id })
        var data = {
            id: _bank[0].id,
            name: _bank[0].name,
            no_rek: _bank[0].no_rek,
            bank: _bank[0].bank
        }
        return res.json(data)
    },

    list: async function(req, res) {
        console.log("====== list store status ======")
        var _bank = await Ref_bank.find({
            select: ['id', 'name', 'no_rek', 'bank']
        });
        var data = {
            "data": _bank
        }
        return res.json(data);
    },

    delete: async function(req, res) {
        var data = await Ref_bank.destroy({ id: req.param("id") }).fetch()
        var message = {
            msg: "telah berhasil menghapus status transaksi"
        }
        return res.send(message)
    },

    listApi: function(req, res) {
        Ref_bank.find().exec(function(err, _bank) {
            return res.json(_bank)
        })
    }

};