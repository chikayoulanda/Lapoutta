'use strict'

var $ = jQuery.noConflict();
$(document).ready(function () {

    var table = $('#data').DataTable({
        'destroy': true,
        'ajax': {
            url: '/list/role',
            type: 'GET'
        },
        'columns': [
            { data: "id" },
            { data: "name" },
            {
                data: null,
                render: function (data, type, full) {
                    return "<button data-id='" + data.id + "' class='btn btn-warning btn-role-update' data-toggle='modal' data-target='#modal-role-update'>Edit</button> &nbsp";
                }
            }
        ]

    });
});

$(document).on('click', '.btn-role-update', function () {
    var role_id = $(this).attr('data-id');
    var formData = new FormData();
    formData.append('id', role_id);
    $.ajax({
        type: "POST",
        url: "/role/find",
        data: formData,
        processData: false,
        contentType: false,
        dataType: "json",
        success: function (result) {
            $('#id').val(result.id);
            $('#name').val(result.name);
        },
        error: function (result) {
            alert('error');
        }
    });
})

$(document).on('submit', '#form-role-update', function (e) {
    e.preventDefault();
    var data = $(this).serialize();
    console.log(data);
    $.post('/role/update', data, function (out) {
        var jq = jQuery.noConflict();
        jq('#modal-role-update').modal('hide');
        jq('body').removeClass('modal-open');
        jq('.modal-backdrop').remove();
        jq('#data').DataTable().ajax.reload();
    });
});

$(document).on('click', '.btn-role-delete', function () {
    var _id = $(this).attr('data-id');
    //   alert(product_id)
    var formData = new FormData();
    formData.append('id', _id);
    $.ajax({
        type: "POST",
        url: "/role/delete",
        processData: false,
        contentType: false,
        data: formData,
        dataType: "json",
        success: function (result) {
            // alert('ok');
            alert(result.msg);
            $('#data').DataTable().ajax.reload();
        },
        error: function (result) {
            alert('error');
        }
    });
})