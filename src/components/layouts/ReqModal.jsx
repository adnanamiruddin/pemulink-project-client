import { useState } from "react";
import { storage } from "@/api/config/firebase.config";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
import missionAcceptanceReqsApi from "@/api/modules/missionAcceptanceReqs.api";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { IoClose } from "react-icons/io5";

export default function ReqModal({ mission }) {
  const router = useRouter();

  const [imageUpload, setImageUpload] = useState(null);

  const handleChangeUploadImage = (e) => {
    setImageUpload(e.target.files[0]);
  };

  const uploadImageToFirebase = async () => {
    if (!imageUpload) {
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
    if (response) router.push("/dashboard");
    if (error) toast.error(error);
  };

  return (
    <div>
      <button
        className="btn w-full bg-blue-500 text-white border-0"
        onClick={() =>
          document.getElementById("acceptance_req_modal").showModal()
        }
      >
        Kirim Permintaan Penerimaan Misi
      </button>

      <dialog
        id="acceptance_req_modal"
        className="modal modal-bottom sm:modal-middle"
      >
        <div className="modal-box bg-gray-50">
          <div className="flex justify-between">
            <h3 className="font-bold text-xl">Upload Bukti Foto</h3>
            <form method="dialog">
              <button>
                <IoClose className="text-3xl hover:text-gray-600" />
              </button>
            </form>
          </div>

          <p className="py-4 flex flex-col gap-6 mt-2">
            <input
              type="file"
              accept="image/*"
              onChange={handleChangeUploadImage}
            />

            <button
              className="btn bg-blue-500 text-white border-0 text-lg"
              onClick={uploadImageToFirebase}
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
