import { cls } from "../libs/client/utils";

interface ButtonProps {
  text: string;
  [key: string]: any;
  onClick?: () => void;
}

export default function Button({ text, href, onClick }: ButtonProps) {
  return (
    <a className="w-full" href={href} onClick={onClick}>
      <button
        className={cls(
          " w-full bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 focus:outline-none"
        )}
      >
        {text}
      </button>
    </a>
  );
}
