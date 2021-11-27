import React, {ReactChild, useCallback, useState} from 'react';
import WebViewModal from './WebViewModal';

const initialValues = {
  isModalOpened: false,
  url: '',
  handleClose: () => {},
  handleOpen: (a: string) => {},
};
export const WebViewModalContext =
  React.createContext<typeof initialValues>(initialValues);

export const useWebViewModal = () => {
  const [isModalOpened, setModalOpened] = useState<boolean>(false);
  const [url, setUrl] = useState<string>('');

  const setModalOpen = (url: string) => {
    setUrl(url);
    setModalOpened(true);
  };

  const setModalClose = () => {
    setModalOpened(false);
    setUrl('');
  };

  const handleOpen = useCallback((url: string) => {
    if (url) {
      setModalOpen(url);
    }
  }, []);
  const handleClose = useCallback(() => {
    setModalClose();
  }, []);

  return {isModalOpened, url, handleOpen, handleClose};
};

export default ({children}: {children: ReactChild}) => {
  const {isModalOpened, url, handleClose, handleOpen} = useWebViewModal();

  return (
    <WebViewModalContext.Provider
      value={{isModalOpened, url, handleClose, handleOpen}}>
      <WebViewModal />
      {children}
    </WebViewModalContext.Provider>
  );
};
