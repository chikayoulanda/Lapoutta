'use strict'

var $ = jQuery.noConflict();
$(document).ready(function () {

    var table = $('#store').DataTable({
        'destroy': true,
        'ajax': {
            url: '/stores',
            type: 'GET'
        },
        'columns': [
            { data: "id" },
            { data: "name" },
            { data: "no_telp" },
            { data: "address" },
            {
                data: null,
                render: function (data, type, full) {
                    if (data.id_store_status == 1) {
                        return "Request"
                    } else if (data.id_store_status == 2) {
                        return "Diterima";
                    } else if (data.id_store_status == 3) {
                        return "Ditolak";
                    }
                }
            },           

            {
                data: null,
                render: function (data, type, full) {
                    if (data.id_store_status == 1) {
                        return "<button data-id='" + data.id + "' class='btn btn-primary btn-accept-store'>Accept</button> &nbsp; <button data-id='" + data.id + "' class='btn btn-danger btn-reject-store'>Reject</button> &nbsp";
                    } else if (data.id_store_status == 2) {
                        return "Accepted";
                    } else if (data.id_store_status == 3) {
                        return "Rejected";
                    }
                }
            }
        ]

    });
});

$(document).on('click', '.btn-accept-store', function (e) {
    console.log("berhasil")
    var store_id = $(this).attr('data-id');
    var formData = new FormData();
    formData.append('id', store_id);
    var txt;
    var r = confirm("Press accept button!");
    if (r == true) {
        $.ajax({
            type: "POST",
            url: "/accept/store",
            data: formData,
            processData: false,
            contentType: false,
            dataType: "json",
            complete: function (out) {
                console.log("sukses")
                $('#store').DataTable().ajax.reload();
            }
        });
    } else {
        $('#store').DataTable().ajax.reload();

    }
})

$(document).on('click', '.btn-reject-store', function (e) {
    console.log("berhasil")
    var store_id = $(this).attr('data-id');
    var formData = new FormData();
    formData.append('id', store_id);
    var txt;
    var r = confirm("Press reject button!");
    if (r == true) {
        $.ajax({
            type: "POST",
            url: "/reject/store",
            data: formData,
            processData: false,
            contentType: false,
            dataType: "json",
            complete: function (out) {
                console.log("sukses")
                $('#store').DataTable().ajax.reload();
            }
        });
    } else {
        $('#store').DataTable().ajax.reload();

    }
})

$(document).ready(function () {

    var table = $('#status-store').DataTable({
        'destroy': true,
        'ajax': {
            url: '/list/store',
            type: 'GET'
        },
        'columns': [
            { data: "id" },
            { data: "name_status" },
            {
                data: null,
                render: function (data, type, full) {
                    return "<button data-id='" + data.id + "' class='btn btn-warning btn-status-store-update' data-toggle='modal' data-target='#modal-status-store-update'>Edit</button> &nbsp";
                }
            }
        ]

    });
});

$(document).on('click', '.btn-status-store-update', function (e) {
    e.preventDefault();
    var status_id = $(this).attr('data-id');
    var formData = new FormData();
    formData.append('id', status_id);
    $.ajax({
        type: "POST",
        url: "/find/store/status",
        data: formData,
        processData: false,
        contentType: false,
        dataType: "json",
        success: function (result) {
            $('#id').val(result.id);
            $('#name_status').val(result.name_status);
        },
        error: function (result) {
            alert('error');
        }
    });
})

$(document).on('submit', '#form-status-store-update', function (e) {
    e.preventDefault();
    var data = $(this).serialize();
    console.log(data);
    $.post('/update/store/status', data, function (out) {
        var jq = jQuery.noConflict();
        jq('#modal-status-store-update').modal('hide');
        jq('body').removeClass('modal-open');
        jq('.modal-backdrop').remove();
        jq('#status-store').DataTable().ajax.reload();
    });
});

$(document).on('click', '.btn-status-store-delete', function (e) {
    e.preventDefault();
    var _id = $(this).attr('data-id');
    //   alert(product_id)
    var formData = new FormData();
    formData.append('id', _id);
    $.ajax({
        type: "POST",
        url: "/delete/store/status",
        processData: false,
        contentType: false,
        data: formData,
        dataType: "json",
        success: function (result) {
            var jq = jQuery.noConflict();
            // alert('ok');
            alert(result.msg);
            jq('#status-store').DataTable().ajax.reload();
        },
        error: function (result) {
            alert('error');
        }
    });
})

$(document).ready(function () {

    var table = $('#list-store').DataTable({
        'destroy': true,
        'ajax': {
            url: '/store/accept',
            type: 'GET'
        },
        'columns': [
            { data: "id" },
            { data: "name" },
            { data: "address" },
            { data: "no_telp" },

            {
                data: null,
                render: function (data, type, full) {
                    return "<a href='/detail/store/" + data.id + "'>Lihat detail</a>"
                }
            }
        ]

    });
});