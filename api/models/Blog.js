/**
 * Blog.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  tableName:'blog',

  attributes: {
    id:{
      type: 'number',
      autoIncrement:true
    },

    body:{
      type:'ref',
      columnType:'text'
    },

    type:{
      type:'number'
    },

    id_product:{
      model:'product'
    }
  },

};

