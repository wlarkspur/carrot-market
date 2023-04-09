import { cls } from "../libs/client/utils";

interface ButtonProps {
  text: string;
}

export default function Button({ text }: ButtonProps) {
  return (
    <button
      className={cls(
        " w-full bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 focus:outline-none"
      )}
    >
      {text}
    </button>
  );
}
