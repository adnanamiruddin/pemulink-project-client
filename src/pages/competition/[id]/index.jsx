import avatarsApi from "@/api/modules/avatars.api";
import teamsApi from "@/api/modules/teams.api";
import Input from "@/components/functions/Input";
import LoadingButton from "@/components/functions/LoadingButton";
import AvatarItem from "@/components/layouts/AvatarItem";
import CompetitionPage from "@/components/layouts/CompetitionPage";
import CompetitionTeamNavbar from "@/components/layouts/CompetitionTeamNavbar";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import * as Yup from "yup";
import TeamDetail from "@/components/layouts/TeamDetail";
import { useDispatch } from "react-redux";
import { setGlobalLoading } from "@/redux/features/globalLoadingSlice";

export default function CreateTeam() {
  const router = useRouter();
  const { id } = router.query;
  const dispatch = useDispatch();

  const [userTeam, setUserTeam] = useState(null);

  const [isOnRequest, setIsOnRequest] = useState(false);
  const [avatars, setAvatars] = useState([]);
  const [characters, setCharacters] = useState([]);
  const [selectedAvatar, setSelectedAvatar] = useState(undefined);

  const createTeamForm = useFormik({
    initialValues: {
      name: "",
      avatarId: "",
      characterId: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Nama Tim harus diisi"),
      avatarId: Yup.string().required("Avatar harus dipilih"),
      characterId: Yup.string().required("Karakter harus dipilih"),
    }),
    onSubmit: async (values) => {
      if (isOnRequest) return;
      setIsOnRequest(true);
      const { response, error } = await teamsApi.createTeam({
        competitionId: id,
        ...values,
      });
      setIsOnRequest(false);
      if (response) {
        createTeamForm.resetForm();
        toast.success(
          "Tim berhasil dibuat. Anda akan diarahkan ke halaman tim"
        );
        setTimeout(() => {
          router.reload();
        }, 3000);
      }
      if (error) toast.error(error.message);
    },
  });

  useEffect(() => {
    const fetchAvatars = async () => {
      dispatch(setGlobalLoading(true));
      const { response, error } = await avatarsApi.getAllAvatars();
      dispatch(setGlobalLoading(false));
      if (response) {
        setAvatars(response.reverse());
        createTeamForm.setFieldValue("avatarId", response[0].id);
        setSelectedAvatar(response[0]);
      }
      if (error) toast.error(error.message);
    };
    fetchAvatars();
  }, [dispatch]);

  useEffect(() => {
    const fetchCharacters = async () => {
      const { response, error } =
        await avatarsApi.getAvatarCharactersByAvatarId({
          id: selectedAvatar?.id,
        });
      if (response) setCharacters(response);
      if (error) toast.error(error.message);
    };
    fetchCharacters();
  }, [avatars, selectedAvatar]);

  return (
    <CompetitionPage competitionId={id} setUserTeam={setUserTeam}>
      {userTeam ? (
        <TeamDetail userTeam={userTeam} competitionId={id} />
      ) : (
        <>
          <CompetitionTeamNavbar id={id} />

          <div className="flex flex-col gap-6 mt-4">
            <Input
              label="Nama Tim"
              name="name"
              placeholder="Nama Tim"
              type="text"
              value={createTeamForm.values.name}
              onChange={createTeamForm.handleChange}
              error={
                createTeamForm.touched.name &&
                createTeamForm.errors.name !== undefined
              }
              helperText={
                createTeamForm.touched.name && createTeamForm.errors.name
              }
            />

            <div>
              <label className="text-lg">Tema Tim</label>
              <div className="flex items-center overflow-x-scroll gap-2 mt-2">
                {avatars.map((avatar, i) => (
                  <AvatarItem
                    key={i}
                    data={avatar}
                    isActive={selectedAvatar?.id === avatar.id}
                    onClick={() => {
                      setSelectedAvatar(avatar);
                      createTeamForm.setFieldValue("avatarId", avatar.id);
                    }}
                  />
                ))}
              </div>
            </div>

            <div>
              <label className="text-lg">
                Pilih Karakter ({selectedAvatar?.name})
              </label>
              <div className="flex items-center overflow-x-scroll gap-2 mt-2">
                {characters.map((character, i) => (
                  <AvatarItem
                    key={i}
                    data={character}
                    isActive={
                      createTeamForm.values.characterId === character.id
                    }
                    onClick={() => {
                      createTeamForm.setFieldValue("characterId", character.id);
                    }}
                  />
                ))}
              </div>
            </div>

            <form onSubmit={createTeamForm.handleSubmit}>
              <LoadingButton loading={isOnRequest}>Simpan</LoadingButton>
            </form>
          </div>
        </>
      )}
    </CompetitionPage>
  );
}
