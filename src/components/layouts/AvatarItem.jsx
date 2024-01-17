import Image from "next/image";

export default function AvatarItem({ data, isActive, onClick }) {
  return (
    <button
      className={`bg-white px-1 py-2 w-40 h-40 rounded-lg border-[3px] ${
        isActive ? "border-blue-400" : " border-white"
      }`}
      onClick={onClick}
    >
      <Image
        src={data.avatarURL || data.characterURL}
        alt={data.name}
        width={500}
        height={500}
        className="object-cover"
      />
      <p className="text-center">{data.name}</p>
    </button>
  );
}
