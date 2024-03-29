import { dbConnect } from '../../data-engine/ETL/helper/mongohelper'
import { mainPipeline } from '../../data-engine/ETL/controler/pipelines/main.transaction.controler'


export default async function handler (req, res) {
  const { method } = req

  dbConnect()
  
  switch (method) {
    case 'GET':
      try {
        // mainPipeline()
        res.status(200).json({ success: true })
      } catch (error) {
        res.status(400).json({ success: false, data: error })
      }
      break
    case 'POST':
      try {
        res.status(201).json({ success: true, data: transactions.data })
      } catch (error) {
        res.status(400).json({ success: false, data: error })
      }
      break
    default:
      res.status(400).json({ success: false })
      break
  }
}
