import { Link } from '@imtbl/imx-sdk';
import { useEffect, useState } from 'react';
import { NEXT_APP_SANDBOX_LINK_URL } from '../config';

const useLink = () => {
  const [link, setLink] = useState<Link>();

  const initLink = async () => {
    const link = new Link(NEXT_APP_SANDBOX_LINK_URL);
    setLink(link);
  };

  useEffect(() => {
    initLink();
  }, []);
  return link;
};

export default useLink;
