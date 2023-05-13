import User from "../../backend/entities/user.entity";
import { dbConnect } from "../../data-engine/ETL/helper/mongohelper";

const saveUser = async (user) => {
  const { sid } = user;
  const newUser = new User({ sid });
  // await newUser.save();
  return;
};

export default async function handler(req, res) {
  dbConnect();
  const { body, method } = req;
  switch (method) {
    case "POST":
      try {
        console.log(body);
        await saveUser(body);
      } catch (error) {
        res.status(400).json({ success: false, data: error });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
