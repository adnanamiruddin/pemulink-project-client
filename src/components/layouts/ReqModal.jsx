import { useState } from "react";
import { storage } from "@/api/config/firebase.config";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
import missionAcceptanceReqsApi from "@/api/modules/missionAcceptanceReqs.api";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

export default function ReqModal({ mission }) {
  const router = useRouter();

  const [imageUpload, setImageUpload] = useState(null);

  const handleChangeUploadImage = (e) => {
    setImageUpload(e.target.files[0]);
  };

  const uploadImageToFirebase = async () => {
    if (!imageUpload) return;

    const storageRef = ref(
      storage,
      `MissionAcceptanceReq/${imageUpload.name + v4()}`
    );
    const upload = await uploadBytes(storageRef, imageUpload);
    const downloadUrl = await getDownloadURL(upload.ref);

    const { response, error } =
      await missionAcceptanceReqsApi.createMissionAcceptanceReq({
        missionId: mission.id,
        photoEvidenceURL: downloadUrl,
      });
    if (response) router.push("/dashboard");
    if (error) console.log(error);;
  };

  return (
    <div>
      <button
        className="btn"
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
          <h3 className="font-bold text-lg">{mission.title}</h3>
          <p className="py-4 flex flex-col gap-4">
            <input type="file" onChange={handleChangeUploadImage} />

            <button className="btn btn-primary" onClick={uploadImageToFirebase}>
              Upload
            </button>
          </p>

          <div className="modal-action">
            <form method="dialog">
              <button className="btn">Close</button>
            </form>
          </div>
        </div>

        <form method="dialog" className="modal-backdrop">
          <button>Close</button>
        </form>
      </dialog>
    </div>
  );
}
