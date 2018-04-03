var mongoose = require('mongoose');

var adminSchema = mongoose.Schema({
    name: String,
    password: String,
    name: { type: String, trim: true },
    emailConfirmed: {type: Boolean, default: false},
    emailConfirmationToken: String,
    resetPasswordToken: String,
    resetPasswordExpires: Number
});

// generating a hash
userSchema.methods.generateHash = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
  };

  // checking if password is valid
userSchema.methods.validPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
  };

  // checking email cnfirmation
userSchema.methods.isEmailConfirmed = function () {
    return this.emailConfirmed;
  };

  module.exports = mongoose.model('teacher', teacherSchema);