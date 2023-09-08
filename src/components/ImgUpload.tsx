import axios from "axios";

const API_KEY = process.env.NEXT_PUBLIC_REACT_FILESTACK_API_KEY;

const ImgUpload = ({
  onImageUpload,
}: {
  onImageUpload: (url: string) => void;
}) => {
  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files !== null) {
      const response = await axios.post(
        `https://www.filestackapi.com/api/store/S3?key=${API_KEY}`,
        event.target.files[0],
        {
          headers: {
            "Content-Type": "image/png",
          },
        }
      );

      onImageUpload(response.data.url);
    }
  };

  return (
    <>
      <h1>Upload an image</h1>
      <input
        type="file"
        name="imageToUpload"
        id="img-uploader"
        onChange={handleFileUpload}
      />
    </>
  );
};

export default ImgUpload;
