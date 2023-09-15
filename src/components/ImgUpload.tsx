import axios from "axios";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

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
    <div className=" mb-10 grid w-full max-w-sm items-center gap-1.5">
      <Label>Upload an image</Label>
      <Input
        type="file"
        name="imageToUpload"
        id="img-uploader"
        onChange={handleFileUpload}
      />
    </div>
  );
};

export default ImgUpload;
