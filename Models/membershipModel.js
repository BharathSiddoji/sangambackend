const mongoose = require("mongoose");

const membershipSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "name is required"],
  },
  phone: {
    type: String,
    required: [true, "Phone number is required"],
  },
  email: {
    type: String,
    required: [true, "email address is required"],
  },
  sonof: {
    type: String,
    required: [true, "father name is required"],
  },
  dob: {
    type: String,
    required: [true, "Date of birth is required"],
  },
  pob: {
    type: String,
    required: [true, "place of birth is required"],
  },
  gender: {
    type: String,
    required: [true, "Gender is required"],
  },
  address: {
    type: String,
    required: [true, "Address is required"],
  },
  state: {
    type: String,
    required: [true, "State is required"],
  },
  qualification: {
    type: String,
    required: [true, "Qualification is required"],
  },
  tamil: {
    type: String,
    required: [true, "Do you know tamil field is required"],
  },
  maleMembers: {
    type: String,
    required: [true, "numbers of males in your family is required"],
  },
  femaleMembers: {
    type: String,
    required: [true, "numbers of female in your family is required"],
  },
  employmentStatus: {
    type: String,
    required: [true, "Employement status is requird"],
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
},
{ versionKey: false });


const Member = mongoose.model("Member",membershipSchema)

module.exports = Member;