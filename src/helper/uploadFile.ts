/** Not required currently */
import { NFTStorage } from 'nft.storage';
import { NEXT_NFT_STORAGE_API_KEY } from '../config';

export const uploadFile = async (file: any) => {
  const apiKey = NEXT_NFT_STORAGE_API_KEY;
  const nftClient = new NFTStorage({ token: apiKey });
  const res = await nftClient.storeBlob(file);
  return res;
};