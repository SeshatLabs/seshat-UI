import searchGraphQuery from '../../backend/controller/search.controller'
export default async function handler(req, res) {
  const { method } = req;
  const query = req.query.text
  switch (method) {
    case 'GET':
      try {
        let data = await searchGraphQuery(query)
        let node_data;
        let relationship_data;
        if (data.records.length === 0) {
          node_data = [];
          relationship_data = [];
        } else {
          node_data = data.records.at(0).get('nodes');
          relationship_data = data.records.at(0).get('relationships');
        }
        res.status(200).json({ success: true, data: { node_data, relationship_data } })
      } catch (error) {
        res.status(400).json({ success: false, data: error })
      }
      break
    default:
      res.status(400).json({ success: false })
      break
  }
}
