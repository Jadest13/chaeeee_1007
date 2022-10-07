import { Resolver } from 'dns';
import type { NextApiRequest, NextApiResponse } from 'next';
const db = require('/src/common/config/db/db');
db.connect();

export default function test(req : NextApiRequest, res : NextApiResponse) {

  if(req.method === 'POST') {
    console.log('POST');
    const { msgtext, publisher, image } = req.body;
    db.query("INSERT INTO Messages VALUES (0, '" + msgtext + "', '" + publisher + "', '" + image + "', NOW())",
    function (err: any, result: any) {
      if(err) {
        console.log(err)
      } else {
        console.log(result);
        res.json(result);
      }
    });
  } else if(req.method === 'GET') {
    console.log('GET');
    db.query("SELECT * FROM Messages",
    function (err: any, result: any) {
      if(err) {
        console.log(err)
      } else {
        console.log(result)
        res.json(result);
        res.end();
      }
    });
  }
}
