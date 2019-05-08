/**
 * Slide.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  tableNName:'slide',

  attributes: {
    id:{
      type:'number',
      autoIncrement:true
    },
    gambar:{
      type:'string',
    },
    name:{
      type:'string'
    }
  },

};

