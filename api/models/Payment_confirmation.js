module.exports = {
  tableName:'payment_confirmation',

  attributes: {

    id:{
      type:'number',
      autoIncrement:true
    },
    transfer_from:{
      type:'string'
    },
    transfer_to:{
      type:'string'
    },
    total:{
      type:'number',
      columnType: 'double'
    },
    id_transaction:{
      model:'transaction'
    },
    id_bank:{
      model:'ref_bank'
    },
    id_payment_status:{
      model:'payment_status'
    },
  },
};

