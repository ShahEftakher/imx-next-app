import { NFTStorage } from 'nft.storage';
import { NEXT_NFT_STORAGE_API_KEY } from '../config';

export const UploadDirectoryV2 = async (files: any) => {
  const apiKey = NEXT_NFT_STORAGE_API_KEY;
  console.log(apiKey);
  const nftClient = new NFTStorage({ token: apiKey });
  const res = await nftClient.storeDirectory(files);
  console.log(res);
  return res;
};
