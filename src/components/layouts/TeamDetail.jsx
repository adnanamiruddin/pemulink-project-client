import Image from "next/image";
import { IoIosLink } from "react-icons/io";
import { IoShareSocialOutline } from "react-icons/io5";
import { TiContacts } from "react-icons/ti";
import AvatarItem from "./AvatarItem";
import LoadingButton from "../functions/LoadingButton";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useSelector } from "react-redux";
import { selectUser } from "@/redux/features/userSlice";
import { useEffect, useState } from "react";
import avatarsApi from "@/api/modules/avatars.api";
import teamsApi from "@/api/modules/teams.api";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import defaultTeamMemberIcon from "../../../public/default-team-member-icon.svg";

export default function TeamDetail({ userTeam, competitionId }) {
  const router = useRouter();

  const { user } = useSelector(selectUser);

  const [isOnRequest, setIsOnRequest] = useState(false);
  const [errorMessage, setErrorMessage] = useState(undefined);
  const [characters, setCharacters] = useState([]);

  const chooseCharacterForm = useFormik({
    initialValues: {
      characterId: "",
    },
    validationSchema: Yup.object({
      characterId: Yup.string().required("Karakter harus dipilih"),
    }),
    onSubmit: async (values) => {
      if (isOnRequest) return;
      setIsOnRequest(true);
      const { response, error } = await teamsApi.chooseCharacter({
        competitionId,
        teamId: userTeam.id,
        ...values,
      });
      setIsOnRequest(false);
      if (response) {
        chooseCharacterForm.resetForm();
        toast.success("Berhasil memilih karakter. Halaman akan direfresh");
        setTimeout(() => {
          router.reload();
        }, 3000);
      }
      if (error) setErrorMessage(error.message);
    },
  });

  useEffect(() => {
    const fetchCharacters = async () => {
      const { response, error } =
        await avatarsApi.getAvatarCharactersByAvatarId({
          id: userTeam?.avatarId,
        });
      if (response) setCharacters(response);
      if (error) toast.error(error.message);
    };
    fetchCharacters();
  }, [userTeam]);

  const startTeam = async (e) => {
    if (isOnRequest) return;
    e.preventDefault();
    setIsOnRequest(true);
    // Validate minimum 2 members
    if (userTeam.teamMembers.length < 2) {
      toast.error("Tim harus memiliki setidaknya 2 anggota");
      setTimeout(() => {
        setIsOnRequest(false);
      }, 500);
      return;
    }
    // Validate if all members already choose character
    if (
      userTeam.teamMembers.filter((member) => member.status === "accepted")
        .length !== userTeam.teamMembers.length
    ) {
      toast.error("Semua anggota tim harus memilih karakter");
      setTimeout(() => {
        setIsOnRequest(false);
      }, 500);
      return;
    }
    const { response, error } = await teamsApi.startTeam({
      competitionId,
      teamId: userTeam.id,
    });
    if (response) {
      toast.success("Berhasil memulai misi. Halaman akan direfresh");
      setTimeout(() => {
        router.reload();
      }, 3000);
    }
    if (error) toast.error(error.message);
    setTimeout(() => {
      setIsOnRequest(false);
    }, 4000);
  };

  return (
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

      <div className="bg-white py-6 px-4 rounded-xl flex flex-col justify-between gap-4">
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
          <div key={i} className="flex justify-between items-center gap-3">
            <div className="w-1/6">
              <Image
                src={member.characterURL || defaultTeamMemberIcon}
                alt={member.characterName}
                width={100}
                height={100}
                className="rounded-lg"
              />
            </div>
            <h4 className="font-bold text-sm">
              {member.firstName + " " + member.lastName}
            </h4>
            <p className="text-xs">
              {member.userId === user.id
                ? "Anda"
                : member.role === "leader"
                ? "Ketua"
                : "Bergabung"}
            </p>
            <span
              className={`text-xs p-1.5 px-2 rounded-lg ${
                member.status === "accepted" ? "bg-green-500" : "bg-amber-400"
              }`}
            >
              {member.status === "accepted" ? "Diterima" : "Pilih Karakter"}
            </span>
          </div>
        ))}
      </div>

      {/* Validate if user already choose character*/}
      {userTeam.teamMembers.find((member) => member.userId === user.id)
        .status === "pending" ? (
        <>
          <div>
            <label className="text-lg">
              Pilih Karakter ({userTeam.avatarName})
            </label>
            <div className="flex items-center overflow-x-scroll gap-2 mt-2">
              {characters.map((character, i) => (
                <AvatarItem
                  key={i}
                  data={character}
                  isActive={
                    chooseCharacterForm.values.characterId === character.id
                  }
                  onClick={() => {
                    chooseCharacterForm.setFieldValue(
                      "characterId",
                      character.id
                    );
                  }}
                  isAlreadyTaken={
                    userTeam.teamMembers.filter(
                      (member) => member.characterId === character.id
                    ).length > 0
                  }
                />
              ))}
            </div>
            {(chooseCharacterForm.touched.characterId &&
              chooseCharacterForm.errors.characterId !== undefined) ||
            errorMessage !== undefined ? (
              <div className="label">
                <span className="label-text-alt text-error">
                  {(chooseCharacterForm.touched.characterId &&
                    chooseCharacterForm.errors.characterId) ||
                    errorMessage}
                </span>
              </div>
            ) : null}
          </div>

          <form onSubmit={chooseCharacterForm.handleSubmit}>
            <LoadingButton loading={isOnRequest}>Pilih Karakter</LoadingButton>
          </form>
        </>
      ) : userTeam.teamMembers.find((member) => member.userId === user.id)
          .role === "leader" && userTeam.status === "pending" ? (
        <form onSubmit={startTeam}>
          <LoadingButton loading={isOnRequest}>Mulai Misi</LoadingButton>
        </form>
      ) : (
        <div className="btn bg-blue-500 w-full border-0 text-white text-lg opacity-70 hover:bg-blue-700">
          {userTeam.status === "pending"
            ? "Menunggu Ketua Memulai..."
            : "Tim Telah Dimulai"}
        </div>
      )}
    </div>
  );
}
