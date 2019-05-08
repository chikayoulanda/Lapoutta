/**
 * ShipmentController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
    new: function(req, res) {
        return res.view('transaction/newShipment')
    },

    view: function(req, res) {
        Shipment_status.find().exec(function(err, _shipment) {
            return res.view('transaction/shipmentStatus', {
                shipment: _shipment
            })
        })
    },

    update: function(req, res) {
        Shipment_status.find({ id: req.param("id") }).exec(function(err, _shipment) {
            return res.view('transaction/editShipment', {
                shipment: _shipment
            })
        })
    },

    create: function(req, res) {
        var data = {
            name_shipment_status: req.param("name_shipment_status")
        }
        return Shipment_status.create(data).then(function(err, _find) {
            Shipment_status.find().exec(function(err, _shipment) {
                return res.view('transaction/shipmentStatus', {
                    shipment: _shipment
                })
            })
        })

    },

    edit: function(req, res) {
        return Shipment_status.update({ id: req.param("id") }, {
            name_shipment_status: req.param("name_shipment_status")
        }).then(function(err, _find) {
            Shipment_status.find().exec(function(err, _shipment) {
                return res.view('transaction/shipmentStatus', {
                    shipment: _shipment
                })
            })
        })
    },

    delete: async function(req, res) {
        var _delete = await Shipment_status.destroy({ id: req.param("id") }).fetch()
        Shipment_status.find().exec(function(err, _shipment) {
            return res.view('transaction/shipmentStatus', {
                shipment: _shipment
            })
        })

    },

    listApi: function(req, res) {
        Shipment_status.find().exec(function(err, _status) {
            return res.send(_status)
        })
    }

};