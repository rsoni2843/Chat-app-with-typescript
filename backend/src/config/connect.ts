import mongoose from "mongoose";

const obj = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
};
const connectDb = async (DATABASE_URL: string) => {
  try {
    await mongoose.connect(DATABASE_URL);
    console.log("Connected to Mongo Database", DATABASE_URL);
  } catch (err) {
    console.log(err);
  }
};

export default connectDb;
