

export default function AvatarItem() {
  return (                <button
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
  )
}
