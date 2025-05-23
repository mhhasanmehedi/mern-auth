import { useState } from "react";
import axios from "axios";
import useAuth from "@/hooks/useAuth";
import { toast } from "react-toastify";

export default function UploadImage({
  avatar,
  setAvatar,
}: {
  avatar: string | null;
  setAvatar: React.Dispatch<React.SetStateAction<string>>;
}) {
  const { backendUrl } = useAuth();
  const [uploading, setUploading] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile)); // show preview
    }
  };

  const handleUpload = async () => {
    if (!file) return alert("Please select a file");

    const formData = new FormData();
    formData.append("image", file);

    try {
      setUploading(true);
      const res = await axios.post(backendUrl + "/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });
      setAvatar(res.data.filename);
      toast.success(res.data.message);
      setPreview(null); // optionally clear preview after upload
    } catch (err) {
      console.error(err);
      toast.error("Upload Failed");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex items-center gap-4">
      <div className="relative">
        <label className="size-20 rounded-full bg-muted cursor-pointer block overflow-hidden">
          {preview || avatar ? (
            <img
              src={preview || avatar!}
              alt="Avatar Preview"
              className="object-cover w-full h-full rounded-full"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-xs text-gray-400">
              Choose File
            </div>
          )}
          <input type="file" accept="image/*" hidden onChange={handleChange} />
        </label>
      </div>

      <button
        onClick={handleUpload}
        disabled={!file || uploading}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        {uploading ? "Uploading..." : "Upload"}
      </button>
    </div>
  );
}
