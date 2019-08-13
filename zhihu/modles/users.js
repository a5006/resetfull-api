const mongoose = require('mongoose')
const { Schema, model } = mongoose
const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  password:{
    type:String,
    required:true,
    select:false, //不返回密码
  },
  __v:{
    type:Number,
    select:false,
  }
})

module.exports = model('User', userSchema)