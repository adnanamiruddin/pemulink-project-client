import avatarsApi from "@/api/modules/avatars.api";
import teamsApi from "@/api/modules/teams.api";
import Input from "@/components/functions/Input";
import LoadingButton from "@/components/functions/LoadingButton";
import CompetitionHeader from "@/components/layouts/CompetitionHeader";
import CompetitionTeamNavbar from "@/components/layouts/CompetitionTeamNavbar";
import { useFormik } from "formik";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import * as Yup from "yup";

export default function TeamDetail() {
  const router = useRouter();
  const { id } = router.query;

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
      setIsOnRequest(true);
      const { response, error } = await teamsApi.createTeam({
        competitionId: id,
        ...values,
      });
      setIsOnRequest(false);
      if (response) {
        createTeamForm.resetForm();
        toast.success("Tim berhasil dibuat");
        router.push(`/dashboard`);
      }
      if (error) toast.error(error.message);
    },
  });

  useEffect(() => {
    const fetchAvatars = async () => {
      const { response, error } = await avatarsApi.getAllAvatars();
      if (response) {
        setAvatars(response.reverse());
        setSelectedAvatar(response[0]);
      }
      if (error) toast.error(error.message);
    };
    fetchAvatars();
  }, []);

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
    <div>
      <CompetitionHeader />

      <div className="bg-blue-100 px-6 py-8 rounded-b-xl">
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
                <button
                  key={i}
                  className={`bg-white px-1 py-2 w-40 h-40 rounded-lg border-[3px] ${
                    selectedAvatar?.id === avatar.id
                      ? "border-blue-400"
                      : " border-white"
                  }`}
                  onClick={() => {
                    setSelectedAvatar(avatar);
                    createTeamForm.setFieldValue("avatarId", avatar.id);
                  }}
                >
                  <Image
                    src={avatar.avatarURL}
                    alt={avatar.name}
                    width={500}
                    height={500}
                    className="object-cover"
                  />
                  <p className="text-center">{avatar.name}</p>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-lg">
              Pilih Karakter ({selectedAvatar?.name})
            </label>
            <div className="flex items-center overflow-x-scroll gap-2 mt-2">
              {characters.map((character, i) => (
                <button
                  key={i}
                  className={`bg-white p-1 w-40 rounded-lg border-[3px] ${
                    createTeamForm.values.characterId === character.id
                      ? "border-blue-400"
                      : " border-white"
                  }`}
                  onClick={() => {
                    createTeamForm.setFieldValue("characterId", character.id);
                  }}
                >
                  <Image
                    src={character.characterURL}
                    alt={character.name}
                    width={100}
                    height={100}
                    className="object-cover w-full h-full"
                  />
                  <p className="text-center text-sm mt-2">{character.name}</p>
                </button>
              ))}
            </div>
          </div>

          <form onSubmit={createTeamForm.handleSubmit}>
            <LoadingButton loading={isOnRequest}>Simpan</LoadingButton>
          </form>
        </div>
      </div>
    </div>
  );
}
