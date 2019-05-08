/**
 * Product.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  tableName: 'product',
  attributes: {
    id: { type: 'number', autoIncrement: true, },

    name: {
      type: 'string',
      required: true
    },
    price: {
      type: 'ref',
      columnType: 'decimal(19,0)',
      required: true
    },
    stock: {
      type: 'number',
      required: true
    },
    description: {
      type: 'string',
      required: true
    },

    gambar:{
      type:'string'
    },

    id_category: {
      model: 'category_product'
    },
    berat: {
      type:'number',
      columnType:'Integer'
    },
    id_store: {
      model: 'store'
    },
    id_product_status: {
      model: 'product_status'
    },
    cart: {
      collection: 'cart',
      via: 'id_product'
    },
    transaction_detail: {
      collection: 'transaction_detail',
      via: 'id_product'
    },
    discount: {
      collection: 'discount',
      via: 'id_product'
    },
    review: {
      collection: 'review',
      via: 'id_product'
    },
    image:{
      collection:'image',
      via:'id_product'
    },

    blog:{
      collection:'blog',
      via:'id_product'
    }

  },

};

