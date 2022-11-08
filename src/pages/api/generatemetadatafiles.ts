import fs from 'fs';
import os from 'os';

const hanlder = async (req: any, res: any) => {
  const { tokenNumber, startingID, cid, desc } = req.body;
  const filePath = `${os.homedir()}/Documents`;
  const apiUrl = 'https://nftstorage.link/ipfs/' + cid;
  console.log(cid);
  for (let index = startingID; index <= tokenNumber; index++) {
    const jsonData = `{
          "name": ${index},
          "description": ${desc},
          "image_url": ${apiUrl}/${index}.png,
        };`;
    if (!fs.existsSync(filePath)) {
      fs.rmSync(`${filePath}/metadata`);
      fs.mkdirSync(`${filePath}/metadata`);
    }
    fs.writeFileSync(`${filePath}/metadata${index}`, jsonData);
  }

  res
    .status(200)
    .json({ status: 'Files created', filePath: `${filePath}/metadata` });
};

export default hanlder;
