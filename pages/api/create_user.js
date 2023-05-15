import User from "../../backend/entities/user.entity";
import { dbConnect } from "../../data-engine/ETL/helper/mongohelper";

const saveUser = async (user) => {
  const { user_id } = user;
  const newUser = new User({ userID: user_id });

  await newUser.save();
  return newUser;
};

export default async function handler(req, res) {
  dbConnect();
  const { body, method } = req;
  switch (method) {
    case "POST":
      try {
        const user = await saveUser(body);
        res.status(201).json({success: true, data: user});
      } catch (error) {
        console.log(error);
        res.status(400).json({ success: false, data: error });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
