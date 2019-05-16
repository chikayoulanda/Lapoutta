'use strict'

var $ = jQuery.noConflict();
$(document).ready(function () {
    
    var table = $('#status-transaksi').DataTable({
        'destroy': true,
        'ajax': {
            url: '/transaction/list',
            type: 'GET'
        },
        'columns': [
            { data: "id" },
            { data: "name" },
            {
                data: null,
                render: function (data, type, full) {
                        return "<button data-id='" + data.id + "' class='btn btn-warning btn-transaction-update' data-toggle='modal' data-target='#modal-status-transaksi-update'>Edit</button> &nbsp";
                }
            }
        ]

    });
});

$(document).on('click', '.btn-transaction-update', function () {
    var trans_id = $(this).attr('data-id');
    var formData = new FormData();
    formData.append('id', trans_id);
    $.ajax({
        type: "POST",
        url: "/transaction/find",
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

$(document).on('submit', '#form-status-transaksi-update', function (e) {
    e.preventDefault();
    var data = $(this).serialize();
    console.log(data);
    $.post('/transaction/edit', data, function (out) {
        var jq = jQuery.noConflict();
        jq('#modal-status-transaksi-update').modal('hide');
        jq('body').removeClass('modal-open');
        jq('.modal-backdrop').remove();
        jq('#status-transaksi').DataTable().ajax.reload();
    });
});

$(document).on('click', '.btn-transaction-delete', function () {
    var _id = $(this).attr('data-id');
    //   alert(product_id)
    var formData = new FormData();
    formData.append('id', _id);
    $.ajax({
        type: "POST",
        url: "/transaction/delete",
        processData: false,
        contentType: false,
        data: formData,
        dataType: "json",
        success: function (result) {
            // alert('ok');
            alert(result.msg);
            $('#status-transaksi').DataTable().ajax.reload();
        },
        error: function (result) {
            alert('error');
        }
    });
})


$(document).ready(function () {
    
    var table = $('#transaksi').DataTable({
        'destroy': true,
        'ajax': {
            url: '/list/transaction',
            type: 'GET'
        },
        'columns': [
            { data: "id" },
            { data: "no_order" },
            {
                data: null,
                render: function (data, type, full) {
                    if(data.id_transaction_status===1){
                        return "Belum dibayar"
                    }
                    else if(data.id_transaction_status===2){
                        return "Sudah dibayar"
                    }
                    else if(data.id_transaction_status===3){
                        return "sedang dikemas"
                    }
                    else if(data.id_transaction_status===4){
                        return "dalam pengiriman"
                    }
                    else if(data.id_transaction_status===5){
                        return "dibatalkan"
                    }
                }
            },
            {
                data:null,
                render: function (data, type, full) {
                    return "<a href='/detail/taransaksi/web/" + data.id + "'>Lihat detail</a>"
                }
            }
        ]

    });
});

$(document).on('click', '.btn-transaction-update', function () {
    var trans_id = $(this).attr('data-id');
    var formData = new FormData();
    formData.append('id', trans_id);
    $.ajax({
        type: "POST",
        url: "/transaction/find",
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

$(document).on('submit', '#form-status-transaksi-update', function (e) {
    e.preventDefault();
    var data = $(this).serialize();
    console.log(data);
    $.post('/transaction/edit', data, function (out) {
        var jq = jQuery.noConflict();
        jq('#modal-status-transaksi-update').modal('hide');
        jq('body').removeClass('modal-open');
        jq('.modal-backdrop').remove();
        jq('#transaksi').DataTable().ajax.reload();
    });
});

$(document).on('click', '.btn-transaction-delete', function () {
    var _id = $(this).attr('data-id');
    //   alert(product_id)
    var formData = new FormData();
    formData.append('id', _id);
    $.ajax({
        type: "POST",
        url: "/transaction/delete",
        processData: false,
        contentType: false,
        data: formData,
        dataType: "json",
        success: function (result) {
            // alert('ok');
            alert(result.msg);
            $('#transaksi').DataTable().ajax.reload();
        },
        error: function (result) {
            alert('error');
        }
    });
})

$(document).ready(function () {
    
    var table = $('#list-bank').DataTable({
        'destroy': true,
        'ajax': {
            url: '/bank/list',
            type: 'GET'
        },
        'columns': [
            { data: "id" },
            { data: "name" },
            { data: "no_rek" },
            { data: "bank"},
            {
                data: null,
                render: function (data, type, full) {
                        return "<button data-id='" + data.id + "' class='btn btn-warning btn-bank' data-toggle='modal' data-target='#modal-bank'>Edit</button> &nbsp";
                }
            }
        ]

    });
});

$(document).on('click', '.btn-bank', function () {
    var trans_id = $(this).attr('data-id');
    var formData = new FormData();
    formData.append('id', trans_id);
    $.ajax({
        type: "POST",
        url: "/bank/find",
        data: formData,
        processData: false,
        contentType: false,
        dataType: "json",
        success: function (result) {
            $('#id').val(result.id);
            $('#name').val(result.name);
            $('#no_rek').val(result.no_rek)
            $('#bank').val(result.bank)
        },
        error: function (result) {
            alert('error');
        }
    });
})

$(document).on('submit', '#form-bank', function (e) {
    e.preventDefault();
    var data = $(this).serialize();
    console.log(data);
    $.post('/bank/edit', data, function (out) {
        var jq = jQuery.noConflict();
        jq('#modal-bank').modal('hide');
        jq('body').removeClass('modal-open');
        jq('.modal-backdrop').remove();
        jq('#list-bank').DataTable().ajax.reload();
    });
});

$(document).on('click', '.btn-bank-delete', function () {
    var _id = $(this).attr('data-id');
    var formData = new FormData();
    formData.append('id', _id);
    $.ajax({
        type: "POST",
        url: "/bank/delete",
        processData: false,
        contentType: false,
        data: formData,
        dataType: "json",
        success: function (result) {
            // alert('ok');
            alert(result.msg);
            $('#list-bank').DataTable().ajax.reload();
        },
        error: function (result) {
            alert('error');
        }
    
    });
})