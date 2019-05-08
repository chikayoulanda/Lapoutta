'use strict'

var $ = jQuery.noConflict();
$(document).ready(function () {
    
    var table = $('#table').DataTable({
        'destroy': true,
        'ajax': {
            url: '/customer',
            type: 'GET'
        },
        'columns': [
            { data: "id" },
            { data: "name" },
            { data: "no_telp" },
            {
                data: null,
                render: function (data, type, full) {
                    return "<a href='/detail/customer/"+ data.id + "'>Lihat detail</a>"
                   
                }
            }
        ]

    });
});