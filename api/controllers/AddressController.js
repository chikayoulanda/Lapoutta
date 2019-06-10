module.exports = {
    address: async function(req, res) {
        var _address = {
            name: req.param("name"),
            no_telp: req.param("no_telp"),
            provinsi: req.param("provinsi"),
            kabupatenKota: req.param("kabupatenKota"),
            kecamatan: req.param("kecamatan"),
            address: req.param("address"),
            pos_code: req.param("pos_code"),
            id_customer: req.param("id_customer")
        }
        try {
            var _newAddress = await Address.create(_address).fetch()
            return res.send(_newAddress)
        } catch (error) {

        }

    },

    update: function(req, res) {
        Address.update({ id: req.param("id") }, {
            name: req.param("name"),
            no_telp: req.param("no_telp"),
            provinsi: req.param("provinsi"),
            kabupatenKota: req.param("kabupatenKota"),
            kecamatan: req.param("kecamatan"),
            address: req.param("address"),
            pos_code: req.param("pos_code")
        }).exec(function(err, _updateAddress) {
            Address.find({ id: req.param("id") }).exec(function(err, _address) {
                return res.json(_address)
            })
        })
    },

    detail: function(req, res) {
        Address.find({ id_customer: req.param("id_customer") }).exec(function(err, _address) {
            return res.json(_address)
        })
    }


};