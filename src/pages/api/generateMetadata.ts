/**Not required Currently */
import os from 'os';
import fs from 'fs';

const handler = async (req: any, res: any) => {
  const { tokenId, description, folderName, ipfsUrl, name } = req.body;
  const filePath = `${os.homedir()}/Documents`;

  if (!fs.existsSync(`${filePath}/${folderName}`)) {
    fs.mkdirSync(`${filePath}/${folderName}`);
  }

  const jsonData = `{
  "name": "${name}",
  "description": "${description}",
  "image_url": "${ipfsUrl}",
}`;

  try {
    fs.writeFileSync(`${filePath}/${folderName}/${tokenId}`, jsonData);
  } catch (error) {
    console.log(error);
  }
};

export default handler;
