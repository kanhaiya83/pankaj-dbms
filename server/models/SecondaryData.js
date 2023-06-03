import mongoose from "mongoose";

const secondaryDataScheme = new mongoose.Schema({
  dri_id: { type: String, default: "" ,unique: true},
  address: { type: String, default: "" },
  profession: { type: String, default: "" },
  residentialPhone: { type: String, default: "" },
  officePhone: { type: String, default: "" },
});

export default mongoose.model("SecondaryData", secondaryDataScheme);
