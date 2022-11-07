import PinataClient from '@pinata/sdk';

const handler = async (req: any, res: any) => {
  const pinataApiKey = process.env.NEXT_APP_PINATA_API_KEY;
  const pinataSecretApiKey = process.env.NEXT_APP_PINATA_SECRET_KEY;
  console.log(pinataApiKey);
  const { filePath } = req.query;
  console.log(filePath);
  const pinata = new PinataClient({ pinataApiKey, pinataSecretApiKey });
  //   const streamableFile = fs.createReadStream(filePath);
  try {
    await pinata.pinFromFS(filePath);
    res.status(200).json({ status: 'File Uploaded' });
  } catch (error) {
    console.log(error);
    res.status(400).json({ status: error });
  }
};

export default handler;
