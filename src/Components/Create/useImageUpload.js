import { useState } from 'react';

const useImageUpload = () => {
  const [file, setFile] = useState(null);
  const [url, setURL] = useState('');

  const handleImageChange = (e) => {
    setFile(e.target.files[0]);
  };

  return {
    file,
    url,
    handleImageChange,
    setURL
  };
};

export default useImageUpload;
