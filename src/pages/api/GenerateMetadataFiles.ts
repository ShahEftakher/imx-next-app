import fs from 'fs';
import os from 'os';

const hanlder = async (req: any, res: any) => {
  const { tokenNumber, startingID, cid, desc } = req.body;
  console.log(req.body);
  const homeDir = os.homedir();
  const apiUrl = 'https://nftstorage.link/ipfs/' + cid;
  console.log(cid);
  for (let index = startingID; index <= tokenNumber; index++) {
    const jsonData = `{
          "name": ${index},
          "description": ${desc},
          "image_url": ${apiUrl}/${index}.png,
        };`;

    fs.writeFileSync(`${homeDir}/Documents/${index}`, jsonData);
  }

  res.status(200).json({ status: 'Files created' });
};

export default hanlder;
