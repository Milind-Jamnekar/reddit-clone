import { Button, Flex, Image, Input, Stack } from "@chakra-ui/react";
import React, { useRef } from "react";

interface IImageUploadProps {
  onSelectedImage: (e: React.ChangeEvent<HTMLInputElement>) => void;
  selectedFile: string;
  setSelectedFile: (value: string) => void;
  setSelectedTab: (value: string) => void;
}

const ImageUpload: React.FunctionComponent<IImageUploadProps> = ({
  onSelectedImage,
  setSelectedTab,
  setSelectedFile,
  selectedFile,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <Flex direction={"column"} justify="center" align="center" width="100%">
      {selectedFile ? (
        <>
          <Image
            src={selectedFile}
            maxW="400px"
            maxHeight="400px"
            alt={`your uploaded image`}
          />
          <Stack direction="row" mt="20px">
            <Button height="28px" onClick={() => setSelectedTab("Post")}>
              Back to post
            </Button>
            <Button height="28px" onClick={() => setSelectedFile("")}>
              Remove
            </Button>
          </Stack>
        </>
      ) : (
        <Flex
          justify="center"
          align="center"
          p={20}
          border="2px dashed"
          borderColor="gray.200"
          width="100%"
          borderRadius={10}
        >
          <Button
            variant="outline"
            height="26px"
            onClick={() => fileInputRef.current?.click()}
          >
            Upload
          </Button>
          <Input
            type="file"
            ref={fileInputRef}
            hidden
            onChange={onSelectedImage}
          />
        </Flex>
      )}
    </Flex>
  );
};

export default ImageUpload;
