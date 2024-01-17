import avatarsApi from "@/api/modules/avatars.api";
import teamsApi from "@/api/modules/teams.api";
import Input from "@/components/functions/Input";
import LoadingButton from "@/components/functions/LoadingButton";
import AvatarItem from "@/components/layouts/AvatarItem";
import CompetitionHeader from "@/components/layouts/CompetitionHeader";
import CompetitionTeamNavbar from "@/components/layouts/CompetitionTeamNavbar";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { IoIosLink } from "react-icons/io";
import { IoShareSocialOutline } from "react-icons/io5";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { TiContacts } from "react-icons/ti";
import Image from "next/image";
import { useSelector } from "react-redux";
import { selectUser } from "@/redux/features/userSlice";

export default function TeamDetail() {
  const router = useRouter();
  const { id } = router.query;

  const { user } = useSelector(selectUser);

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
      setIsOnRequest(true);
      const { response, error } = await teamsApi.createTeam({
        competitionId: id,
        ...values,
      });
      setIsOnRequest(false);
      if (response) {
        createTeamForm.resetForm();
        toast.success("Tim berhasil dibuat");
        router.push(`/competition/${id}`);
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
      <CompetitionHeader competitionId={id} setUserTeam={setUserTeam} />

      <div className="bg-blue-100 px-6 py-8 rounded-b-xl">
        {userTeam ? (
          <div className="flex flex-col gap-6">
            <div className="bg-white p-4 rounded-xl flex flex-col justify-between gap-2">
              <div className="flex justify-between">
                <h4 className="font-medium text-lg">Kode Kamu</h4>
                <div className="flex gap-2">
                  <button className="border-2 border-gray-200 rounded-lg p-2">
                    <IoIosLink className="text-xl text-gray-500" />
                  </button>
                  <button className="border-2 border-gray-200 rounded-lg p-2">
                    <IoShareSocialOutline className="text-xl text-gray-500" />
                  </button>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <div className="flex gap-3">
                  <TiContacts className="text-5xl" />
                  <div>
                    <h4 className="font-semibold">{userTeam.code}</h4>
                    <p className="text-xs text-gray-400 mt-1">
                      Bagikan kode ke temanmu
                    </p>
                  </div>
                </div>
                <button
                  type="submit"
                  className="btn btn-sm bg-blue-500 text-white border-0 rounded-xl w-28"
                  onClick={() => {
                    navigator.clipboard.writeText(userTeam.code);
                    toast.success("Kode berhasil disalin");
                  }}
                >
                  Salin Kode
                </button>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl flex flex-col justify-between gap-4">
              <div className="flex flex-col justify-center items-center">
                <Image
                  src={userTeam.avatarURL}
                  alt={userTeam.avatarName}
                  width={100}
                  height={100}
                  className="rounded-lg"
                />
                <h4 className="font-semibold mt-2">{userTeam.name}</h4>
              </div>
              {userTeam.teamMembers.map((member, i) => (
                <div
                  key={i}
                  className="flex justify-between items-center gap-4"
                >
                  <div className="w-1/6">
                    <Image
                      src={member.characterURL}
                      alt={member.characterName}
                      width={100}
                      height={100}
                      className="rounded-lg"
                    />
                  </div>
                  <h4 className="font-bold">
                    {member.firstName + " " + member.lastName}
                  </h4>
                  <p className="text-base">
                    {member.userId === user.id
                      ? "Anda"
                      : member.role === "leader"
                      ? "Ketua"
                      : "Bergabung"}
                  </p>
                  <span
                    className={`text-sm p-2 rounded-xl font-medium ${
                      member.status === "accepted"
                        ? "bg-green-500"
                        : "bg-amber-400"
                    }`}
                  >
                    {member.status === "accepted"
                      ? "Diterima"
                      : "Pilih Karakter"}
                  </span>
                </div>
              ))}
            </div>
          </div>
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
                        createTeamForm.setFieldValue(
                          "characterId",
                          character.id
                        );
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
      </div>
    </div>
  );
}
