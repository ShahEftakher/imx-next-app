import fs from 'fs';
import os from 'os';
const rimraf = require('rimraf');

const hanlder = async (req: any, res: any) => {
  const { tokenNumber, startingID, cid, desc } = req.body;
  const filePath = `${os.homedir()}/Documents`;
  const apiUrl = 'https://nftstorage.link/ipfs/' + cid;
  console.log(apiUrl);

  if (fs.existsSync(`${filePath}/metadata`)) {
    rimraf.sync(`${filePath}/metadata`);
  }
  fs.mkdirSync(`${filePath}/metadata`);

  for (let index = startingID; index <= tokenNumber + startingID - 1; index++) {
    const jsonData = `{
          "name": ${index},
          "description": ${desc},
          "image_url": ${apiUrl}/${index}.png,
        };`;
    console.log(index);
    try {
      fs.writeFileSync(`${filePath}/metadata/${index}`, jsonData);
    } catch (error) {
      console.log(error);
    }
  }

  res
    .status(200)
    .json({ status: 'Files created', filePath: `${filePath}/metadata` });
};

export default hanlder;
