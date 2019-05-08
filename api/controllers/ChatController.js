/**
 * ChatController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
    create: function (req, res) {
        var _newChat = {
            id_sender: req.param("id_sender"),
            id_receiver: req.param("id_receiver"),
            message: req.param("message")
        }
        Chat.create(_newChat).then(function (err, _chat) {
            return res.status(200).json({
                status: "Success"
            })
        })

    },

    list: async function (req, res) {
        var _list = await Chat.find().populate('id_sender').populate('id_receiver')
            console.log(_list)
            if (_list[0].id_sender || _list[0].id_receiver === _list[0].id_sender.id || _list[0].id_receiver.id) {
                var data = await Chat.find().populate('id_sender').populate('id_receiver')
                return res.send(data)
            }
    }

};

