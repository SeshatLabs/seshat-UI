import { dbConnect } from "../../data-engine/ETL/helper/mongohelper";
import User from "../../backend/entities/user.entity";

export default async function handler(req, res) {
  dbConnect();
  const { method } = req;
  const { userID } = req.query;
  switch (method) {
    case "GET":
      try {
        const user = await User.findOne({ userID: userID });
        res.status(200).json({ success: true, data: user });
      } catch (error) {
        res.status(400).json({ success: false, data: error });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
