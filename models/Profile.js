const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProfileSchema = new Schema({
  First_Name: String,
  Last_Name: String,
  DOB: Date,
  Gender: String,
  Father_First_Name: String,
  Father_Last_Name: String,
  Mother_First_Name: String,
  Mother_Last_Name: String,
  E_mail: String,
  Permanent_Addr: String,
  District: String,
  Ward_No: Number,
  Contact_Num: Number,
  PAN: Number,
  Voter_ID: String,
  Aadhaar_Num: String,
  Pass_Level: Number,
  Personal_Pass: String,
  Q1: Number,
  A1: String,
  Q2: Number,
  A2: String,
  Q3: Number,
  A3: String,
  Q4: Number,
  A4: String,
  Q5: Number,
  A5: String,
});


const Profile = mongoose.model('profile', ProfileSchema);

module.exports = Profile;
