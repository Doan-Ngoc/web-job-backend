/* eslint-disable no-shadow */
/* eslint-disable consistent-return */
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const { roles } = require("../constants");
const configs = require("../configs");

const userSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      // unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
      enum: [roles.admin, roles.company, roles.applicant],
    },

    isActive: {
      type: Boolean,
      required: true,
      default: true,
    },

    // associatedProfile: {
    //   type: mongoose.Types.ObjectId,
    //   ref: "UserProfile",
    // },

    // associatedCompany: {
    //   type: mongoose.Types.ObjectId,
    //   ref: "Company",
    // },
  },
  {
    toJSON: { virtuals: true },
  }
);

userSchema.pre("save", function (next) {
  const user = this;

  // only hash the password if it has been modified (or is new)
  if (!user.isModified("password")) return next();

  // generate a salt
  bcrypt.genSalt(configs.salt, (err, salt) => {
    if (err) return next(err);

    // hash the password using our new salt
    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) {
        return next(err);
      }
      // override the cleartext password with the hashed one
      user.password = hash;
      return next();
    });
  });
});

userSchema.methods.comparePassword = async function (candidatePassword) {
  const isMatchedPassword = await bcrypt.compare(
    candidatePassword,
    this.password
  );
  return isMatchedPassword;
};

const userModel = mongoose.model("User", userSchema);

module.exports = userModel;
