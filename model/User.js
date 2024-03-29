const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  fullName:{type:String , required: true,},
  email: {
    type: String,
    unique: true,
    required: true,
    minlength: 10,
    maxlength: 255,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    maxlength: 1024,
  },
  isAdmin:{
    type:Boolean,
    default:false,
  },
}, { timestamps: true });

userSchema.methods.generateTokens = function(){
  const token = jwt.sign({_id:this._id,isAdmin:this.isAdmin}, 'privateKey',
  {expiresIn:process.env.JWT_EXP
  });
  return token ;
}

module.exports = mongoose.model("User", userSchema);
