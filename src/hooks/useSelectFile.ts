import { useState } from "react";

const useSelectFile = () => {
  const [selectedFile, setSelectedFile] = useState<string>("");
  // handler for image change
  const onSelectedImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader();

    if (e.target.files?.[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }

    reader.onload = (readerEvent) => {
      if (readerEvent.target?.result) {
        setSelectedFile(readerEvent.target.result as string);
      }
    };
  };
  return {
    selectedFile,
    setSelectedFile,
    onSelectedImage,
  };
};

export default useSelectFile;
