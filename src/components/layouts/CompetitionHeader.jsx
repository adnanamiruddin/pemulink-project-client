import Link from "next/link";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { HiOutlineInformationCircle } from "react-icons/hi2";

export default function CompetitionHeader() {
  return (
    <div className="mt-4 flex flex-col gap-8">
      <div className="flex items-center gap-3">
        <Link href="/dashboard">
          <AiOutlineArrowLeft className="text-xl" />
        </Link>
        <h1 className="text-xl font-semibold">Misi Spesial</h1>
      </div>

      <div className="bg-green-400 py-1 px-3 rounded-full text-white flex items-center gap-3 text-sm">
        <HiOutlineInformationCircle className="text-3xl" />
        Tata cara menjalankan misi. Tekan untuk melihat
      </div>

      <div className="rounded-t-xl bg-white flex justify-between items-center">
        <Link href="/" className="py-4 px-8 font-medium">
          Tim
        </Link>
        <Link href="/" className="py-4 px-8 font-medium">
          Misi
        </Link>
        <Link href="/" className="py-4 px-8 font-medium">
          Peringkat
        </Link>
      </div>
    </div>
  );
}
