import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  name: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  // 어떤 종류의 request인지 check
  if (req.method === "POST") {
    const { username, text } = req.body;

    console.log("asdasddas")
    console.log(username)

    const newFeedback = {
      id: new Date().toISOString(),
      username,
      text,
    };

    // 데이터베이스에 저장하거나 파일에 저장한다.
    const filePath = path.join(process.cwd(), "data", "feedback.json");
    const fileData = fs.readFileSync(filePath);
    const data = JSON.parse(fileData);
    data.push(newFeedback);
    fs.writeFileSync(filePath, JSON.stringify(data));

    res.status(201).json({ name: 'Success!', feedback: newFeedback });
  } else {
    res.status(200).json({ name: 'asd' });
  }
}
