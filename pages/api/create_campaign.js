import formidable from "formidable";
import { dbConnect } from "../../data-engine/ETL/helper/mongohelper";
import Advertiser from "../../backend/entities/advertiser.entity";
import Campaign from "../../backend/entities/campaign.entity";
import fs from "fs";

export const config = {
  api: {
    bodyParser: false,
  },
};

const saveCampaign = async (fields, file) => {
  const { description, advertiser, mode, title, budget, duration } = fields;
  const timeRemaining = duration;
  const runningStatus = true;
  const lastStatusChange = Date.now();

  const media = fs.readFileSync(file.filepath);
  const campaign = new Campaign({
    media,
    description,
    advertiser,
    mode,
    title,
    budget,
    runningStatus,
    lastStatusChange,
    timeRemaining,
  });
  console.log({
    media,
    description,
    advertiser,
    mode,
    title,
    budget,
    runningStatus,
    lastStatusChange,
    timeRemaining,
  });
  await campaign.save();
  return;
};

export default async function handler(req, res) {
  const form = new formidable.IncomingForm();
  form.keepExtensions = true;
  dbConnect();
  const { method } = req;

  const ad = await Advertiser.findOne();
  if (!ad) {
    console.log("a");
    const testAdvertiser = new Advertiser({ name: "test" });
    testAdvertiser.save();
  }

  switch (method) {
    case "POST":
      try {
        const data = await new Promise((resolve, reject) => {
          form.parse(req, async function (err, fields, files) {
            console.log(err, fields, files);
            if (err) {
              return reject(err);
            }
            resolve({ fields, files });
          });
        });

        await saveCampaign(data.fields, data.files.files);
        res.status(201).json({ success: true });
      } catch (error) {
        res.status(400).json({ success: false, data: error });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
