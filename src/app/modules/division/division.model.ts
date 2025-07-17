import { model, Schema } from "mongoose";
import { IDivision } from "./division.interface";

const divisionSchema = new Schema<IDivision>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    slug: {
      type: String,
      unique: true,
      trim: true,
    },
    thumbnail: {
      type: String,
    },
    description: {
      type: String,
    },
  },
  {
    versionKey: false,
  }
);

const Division = model<IDivision>("Division", divisionSchema);

export default Division;
