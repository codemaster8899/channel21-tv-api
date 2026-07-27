const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const AdminSchema = mongoose.Schema({
  name: {
    am: { type: String, trim: true },
    ru: { type: String, trim: true },
    en: { type: String, trim: true },
  },

  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    validate(value) {
      // Allow username login (e.g. asimonyan) or a normal email
      const isUsername = /^[a-zA-Z0-9._-]{3,}$/.test(value);
      if (!isUsername && !validator.isEmail(value)) {
        throw new Error("Email is invalid!");
      }
    },
  },

  password: {
    type: String,
    required: true,
    trim: true,
    validate(value) {
      if (validator.isEmpty(value)) {
        throw new Error("Please enter your password!");
      } else if (validator.equals(value.toLowerCase(), "password")) {
        throw new Error("Password is invalid!");
      } else if (validator.contains(value.toLowerCase(), "password")) {
        throw new Error("Password should not contain password!");
      }
    },
  },

  isAdmin: {
    type: Boolean,
    default: false,
  },
});

AdminSchema.methods.generateAuthToken = async function () {
  const admin = this;
  const token = jwt.sign(
    { _id: admin._id.toString(), email: admin.email },
    process.env.JWT_PRIVATE_KEY,
    { expiresIn: "7d" },
  );
  return token;
};

AdminSchema.pre("save", async function (next) {
  const admin = this;
  if (admin.isModified("password")) {
    admin.password = await bcrypt.hash(admin.password, 8);
  }
  next();
});

AdminSchema.methods.toJSON = function () {
  const admin = this;
  const adminObject = admin.toObject();
  delete adminObject.password;
  return adminObject;
};

const Admin = mongoose.model("admin", AdminSchema);

// const add = async () => {
//   const admin = await Admin.create({
//     name: "admin",
//     email: "21tv.development@gmail.com",
//     password: "!123Dar21",
//     isAdmin: true
//   })

//   console.log(admin);
// }
// add()

module.exports = Admin;
