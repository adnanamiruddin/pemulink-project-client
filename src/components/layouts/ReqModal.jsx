import { useState } from "react";
import { storage } from "@/api/config/firebase.config";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
import missionAcceptanceReqsApi from "@/api/modules/missionAcceptanceReqs.api";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { IoClose } from "react-icons/io5";
import { IoCloudUploadOutline } from "react-icons/io5";

export default function ReqModal({ mission }) {
  const router = useRouter();

  const [imageUpload, setImageUpload] = useState(null);
  const [isImageUploaded, setIsImageUploaded] = useState(false);

  const handleChangeUploadImage = (e) => {
    const uploadedImage = e.target.files[0];
    setImageUpload(uploadedImage);
    setIsImageUploaded(true);
  };

  const uploadImageToFirebase = async () => {
    if (!isImageUploaded || imageUpload === undefined) {
      toast.error("Harap upload foto");
      return;
    }

    const storageRef = ref(
      storage,
      `MissionAcceptanceReqs/${imageUpload.name + v4()}`
    );
    const upload = await uploadBytes(storageRef, imageUpload);
    const downloadUrl = await getDownloadURL(upload.ref);

    const { response, error } =
      await missionAcceptanceReqsApi.createMissionAcceptanceReq({
        id: mission.id,
        photoEvidenceURL: downloadUrl,
      });
    if (response) {
      toast.success("Foto sampah berhasil diupload");
      router.push("/dashboard");
    }
    if (error) toast.error(error);
  };

  return (
    <div>
      <button
        className="btn w-full bg-blue-500 text-white border-0 text-lg font-normal hover:bg-blue-700"
        onClick={() =>
          document.getElementById("acceptance_req_modal").showModal()
        }
      >
        Upload Foto Sampah
      </button>

      <dialog
        id="acceptance_req_modal"
        className="modal modal-bottom sm:modal-middle"
      >
        <div className="modal-box bg-gray-50 p-8">
          <div className="flex justify-between items-center">
            <h3 className="text-2xl font-medium">Upload Foto Sampah</h3>
            <form method="dialog">
              <button>
                <IoClose className="text-3xl hover:text-gray-600" />
              </button>
            </form>
          </div>

          <p className="py-4 flex flex-col gap-6 mt-2">
            <div className="flex items-center justify-center w-full relative">
              <label
                htmlFor="dropzone-file"
                className={`flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 ${
                  isImageUploaded
                    ? "border-b-4 border-green-500"
                    : "border-dashed"
                }`}
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <IoCloudUploadOutline className="text-4xl text-gray-500 mb-4" />
                  <p className="mb-2 text-sm text-gray-500">
                    <span className="font-semibold">Klik untuk upload </span>
                    atau seret dan lepaskan foto
                  </p>
                  <p className="text-xs text-gray-500">
                    SVG, PNG, JPG, JPEG, atau WEBP
                  </p>
                </div>
                <input
                  id="dropzone-file"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleChangeUploadImage}
                />
              </label>
            </div>

            <button
              className={`btn bg-blue-500 text-white border-0 text-lg hover:bg-blue-700 ${
                isImageUploaded ? "" : "opacity-50 cursor-not-allowed"
              }`}
              onClick={uploadImageToFirebase}
              disabled={!isImageUploaded}
            >
              Upload
            </button>
          </p>
        </div>

        <form method="dialog" className="modal-backdrop">
          <button>Close</button>
        </form>
      </dialog>
    </div>
  );
}
