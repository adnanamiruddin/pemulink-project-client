import teamsApi from "@/api/modules/teams.api";
import CompetitionPage from "@/components/layouts/CompetitionPage";
import CompetitionTeamNavbar from "@/components/layouts/CompetitionTeamNavbar";
import TeamDetail from "@/components/layouts/TeamDetail";
import { selectUser } from "@/redux/features/userSlice";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import { useState } from "react";
import { IoIosLink } from "react-icons/io";
import { IoShareSocialOutline } from "react-icons/io5";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import * as Yup from "yup";

export default function JoinTeam() {
  const router = useRouter();
  const { id } = router.query;

  const { user } = useSelector(selectUser);

  const [userTeam, setUserTeam] = useState(null);

  const [isOnRequest, setIsOnRequest] = useState(false);
  const [errorMessage, setErrorMessage] = useState(undefined);

  const joinTeamForm = useFormik({
    initialValues: {
      code: "",
    },
    validationSchema: Yup.object({
      code: Yup.string().required("Kode harus diisi"),
    }),
    onSubmit: async (values) => {
      if (isOnRequest) return;
      setIsOnRequest(true);
      const { response, error } = await teamsApi.joinTeam({
        competitionId: id,
        ...values,
      });
      setIsOnRequest(false);
      if (response) {
        joinTeamForm.resetForm();
        toast.success("Berhasil bergabung ke tim. Anda akan diarahkan ke tim");
        setTimeout(() => {
          router.reload();
        }, 3000);
      }
      if (error) setErrorMessage(error.message);
    },
  });

  return (
    <CompetitionPage competitionId={id} setUserTeam={setUserTeam}>
      {userTeam ? (
        <TeamDetail userTeam={userTeam} competitionId={id} />
      ) : (
        <div className="flex flex-col gap-6">
          <CompetitionTeamNavbar id={id} />

          <div className="bg-white p-4 rounded-xl flex flex-col justify-between gap-2">
            <div className="flex justify-between">
              <h4 className="font-medium text-lg">Masukkan Kode</h4>
              <div className="flex gap-2">
                <button className="border-2 border-gray-200 rounded-lg p-2">
                  <IoIosLink className="text-xl text-gray-500" />
                </button>
                <button className="border-2 border-gray-200 rounded-lg p-2">
                  <IoShareSocialOutline className="text-xl text-gray-500" />
                </button>
              </div>
            </div>

            <form
              onSubmit={joinTeamForm.handleSubmit}
              className="flex justify-between items-end gap-6"
            >
              <div className="w-10/12">
                <input
                  name="code"
                  placeholder="Ketik di sini"
                  type="text"
                  value={joinTeamForm.values.code}
                  onChange={joinTeamForm.handleChange}
                  className="input rounded-xl border-2 border-gray-200 bg-gray-100 w-full"
                />
                {(joinTeamForm.touched.code &&
                  joinTeamForm.errors.code !== undefined) ||
                errorMessage !== undefined ? (
                  <div className="label">
                    <span className="label-text-alt text-error">
                      {(joinTeamForm.touched.code &&
                        joinTeamForm.errors.code) ||
                        errorMessage}
                    </span>
                  </div>
                ) : null}
              </div>
              <button
                type="submit"
                className="btn btn-sm bg-blue-500 text-white border-0 rounded-xl w-28"
              >
                {isOnRequest ? (
                  <span className="loading loading-dots loading-sm"></span>
                ) : (
                  "Gabung Tim"
                )}
              </button>
            </form>
          </div>
        </div>
      )}
    </CompetitionPage>
  );
}
