'use strict'

var $ = jQuery.noConflict();
$(document).ready(function () {
    
    var table = $('#list-product').DataTable({
        'destroy': true,
        'ajax': {
            url: '/list/product',
            type: 'GET'
        },
        'columns': [
            { data: "id" },
            { data: "name" },
            { data: "price" },
            { data: "id_category" },

            {
                data: null,
                render: function (data, type, full) {
                    return "<a href='/detail/product/web/" + data.id + "'>Lihat detail</a>"
                }
            }
        ]

    });
});

$(document).ready(function () {

    var table = $('#list-status').DataTable({
        'destroy': true,
        'ajax': {
            url: '/list/status',
            type: 'GET'
        },
        'columns': [
            { data: "id" },
            { data: "name" },
            {
                data: null,
                render: function (data, type, full) {
                    return "<button data-id='" + data.id + "' class='btn btn-warning btn-list-status-update' data-toggle='modal' data-target='#modal-list-status-update'>Edit</button> &nbsp; <button data-id='" + data.id + "' class='btn btn-danger btn-list-status-delete'>Delete</button> &nbsp";
                }
            }
        ]

    });
});

$(document).on('click', '.btn-list-status-update', function () {
    var role_id = $(this).attr('data-id');
    var formData = new FormData();
    formData.append('id', role_id);
    $.ajax({
        type: "POST",
        url: "/find/status/product",
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

$(document).on('submit', '#form-list-status-update', function (e) {
    e.preventDefault();
    var data = $(this).serialize();
    console.log(data);
    $.post('/update/status/product', data, function (out) {
        var jq = jQuery.noConflict();
        jq('#modal-list-status-update').modal('hide');
        jq('body').removeClass('modal-open');
        jq('.modal-backdrop').remove();
        jq('#list-status').DataTable().ajax.reload();
    });
});

$(document).on('click', '.btn-list-status-delete', function () {
    var _id = $(this).attr('data-id');
    //   alert(product_id)
    var formData = new FormData();
    formData.append('id', _id);
    $.ajax({
        type: "POST",
        url: "/delete/status/product",
        processData: false,
        contentType: false,
        data: formData,
        dataType: "json",
        success: function (result) {
            // alert('ok');
            alert(result.msg);
            $('#list-status').DataTable().ajax.reload();
        },
        error: function (result) {
            alert('error');
        }
    });
})

$(document).ready(function () {

    var table = $('#category').DataTable({
        'destroy': true,
        'ajax': {
            url: '/list/category',
            type: 'GET'
        },
        'columns': [
            { data: "id" },
            { data: "name" },
            {
                data: null,
                render: function (data, type, full) {
                    return "<button data-id='" + data.id + "' class='btn btn-warning btn-category-update' data-toggle='modal' data-target='#modal-category-update'>Edit</button> &nbsp; <button data-id='" + data.id + "' class='btn btn-danger btn-category-delete'>Delete</button> &nbsp";
                }
            }
        ]

    });
});

$(document).on('click', '.btn-category-update', function () {
    var role_id = $(this).attr('data-id');
    var formData = new FormData();
    formData.append('id', role_id);
    $.ajax({
        type: "POST",
        url: "/find/category",
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

$(document).on('submit', '#form-category-update', function (e) {
    e.preventDefault();
    var data = $(this).serialize();
    console.log(data);
    $.post('/update/category', data, function (out) {
        var jq = jQuery.noConflict();
        jq('#modal-category-update').modal('hide');
        jq('body').removeClass('modal-open');
        jq('.modal-backdrop').remove();
        jq('#category').DataTable().ajax.reload();
    });
});

$(document).on('click', '.btn-category-delete', function () {
    var _id = $(this).attr('data-id');
    //   alert(product_id)
    var formData = new FormData();
    formData.append('id', _id);
    $.ajax({
        type: "POST",
        url: "/delete/category",
        processData: false,
        contentType: false,
        data: formData,
        dataType: "json",
        success: function (result) {
            // alert('ok');
            alert(result.msg);
            $('#category').DataTable().ajax.reload();
        },
        error: function (result) {
            alert('error');
        }
    });
})