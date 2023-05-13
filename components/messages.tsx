import { cls } from "@/libs/client/utils";
import Image from "next/image";

interface MessageProps {
  message: string;
  reversed?: boolean;
  avatarUrl?: string;
}

export default function Message({
  message,
  reversed,
  avatarUrl,
}: MessageProps) {
  return (
    <div
      className={cls(
        "flex items-center space-x-2",
        reversed ? "flex-row-reverse space-x-reverse" : ""
      )}
    >
      {avatarUrl ? (
        <Image
          className="w-11 h-11 rounded-full border-[1px] border-gray-300 "
          width={20}
          height={20}
          alt=""
          src={`https://imagedelivery.net/vb1hJxSPrA50SRWhJFXABQ/${avatarUrl}/avatar`}
        />
      ) : (
        <div className="w-8 h-8 rounded-full bg-slate-400" />
      )}

      <div className="w-1/2 text-sm text-gray-700 p-2 border border-gray-300 rounded-md">
        <p>{message}</p>
      </div>
    </div>
  );
}
