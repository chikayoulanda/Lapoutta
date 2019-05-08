'use strict'

var $ = jQuery.noConflict();
$(document).ready(function (err) {
    
    var table = $('#payment').DataTable({
        'destroy': true,
        'ajax': {
            url: '/confirmation/payment',
            type: 'GET'
        },
        'columns': [
            { data: "id" },
            { data: "transfer_from" },
            { data: "id_transaction"},
            { data: "total" },
            {
                data: null,
                render: function (data, type, full) {
                    if(data.id_bank==1){
                        return "Mandiri"
                    }
                    else if(data.id_bank==2){
                        return "BRI"
                    }
                    else if(data.id_bank==3){
                        return "BNI"
                    }
                }
            },
            {
                data: null,
                render: function (data, type, full) {
                    if(data.id_payment_status==1){
                        return "<button data-id='" + data.id + "' class='btn btn-primary btn-accept'>Accept</button> &nbsp; <button data-id='" + data.id + "' class='btn btn-danger btn-reject'>Reject</button> &nbsp";
                    }
                    else if(data.id_payment_status==2){
                        return "Diterima"
                    }else if(data.id_payment_status=3){
                        return "Ditolak"
                    }
                }
            }
        ]

    });
});

$(document).on('click', '.btn-accept', function (e) {
    console.log("berhasil")
    var payment = $(this).attr('data-id');
    var formData = new FormData();
    formData.append('id', payment);
    var txt;
    var r = confirm("Press accept button!");
    if (r == true) {
        $.ajax({
            type: "POST",
            url: "/accept/payment",
            data: formData,
            processData: false,
            contentType: false,
            dataType: "json",
            complete: function (out) {
                console.log("sukses")
                $('#payment').DataTable().ajax.reload();
            }
        });
    } else {
        $('#payment').DataTable().ajax.reload();

    }
})

$(document).on('click', '.btn-reject', function (e) {
    console.log("berhasil")
    var payment = $(this).attr('data-id');
    var formData = new FormData();
    formData.append('id', payment);
    var r = confirm("Press reject button!");
    if (r == true) {
        $.ajax({
            type: "POST",
            url: "/reject/payment",
            data: formData,
            processData: false,
            contentType: false,
            dataType: "json",
            complete: function (out) {
                console.log("sukses")
                $('#payment').DataTable().ajax.reload();
            }
        });
    } else {
        $('#payment').DataTable().ajax.reload();

    }
})