import type { NextApiRequest, NextApiResponse } from 'next';
const db = require('/src/common/config/db/db');
db.connect();

export default function test(req : NextApiRequest, res : NextApiResponse) {

  db.query("SELECT * FROM Messages",
  function (err: any, result: any) {
    if(err) {
      console.log(err)
    } else {
      console.log(result);
      res.json(result);
    }
  });
}
