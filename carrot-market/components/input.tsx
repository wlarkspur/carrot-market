import type { UseFormRegisterReturn } from "react-hook-form";

interface InputProps {
  label: string;
  name: string;
  required: boolean;
  kind?: "text" | "phone" | "price";
  type: string;
  register: UseFormRegisterReturn;

  //input에는 password, number, email, required 등 여러 종류의 prop을 보내야 할 수 있으니 이와 같이 코드를 명시해 놓는다.
}

export default function Input({
  name,
  label,
  kind = "text",
  register,
  type,
  required,
}: InputProps) {
  return (
    <div>
      <label
        htmlFor={name}
        className="mb-1 block text-sm font-medium text-gray-700"
      >
        {label}
      </label>
      {kind === "text" ? (
        <div className="rounded-md relative  shadow-sm flex items-center ">
          <input
            id={name}
            required={required}
            {...register}
            type={type}
            className="appearance-none pl-7 w-full px-3 py-2 border  border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500  focus:border-orange-500"
          />
        </div>
      ) : null}

      {kind === "price" ? (
        <div className="rounded-md relative  shadow-sm flex items-center ">
          {" "}
          <div className="absolute left-0 pl-3 pointer-events-none flex items-center justify-center">
            <span className="text-gray-500 text-sm">$</span>
          </div>
          <input
            id={name}
            required={required}
            {...register}
            type={type}
            className="appearance-none pl-7 w-full px-3 py-2 border  border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500  focus:border-orange-500"
          />
          <div className="absolute right-0 pointer-events-none pr-3 flex items-center">
            <span className="text-gray-500">KRW</span>
          </div>
        </div>
      ) : null}

      {kind === "phone" ? (
        <div className="flex rounded-sm shadow-sm ">
          <span className="flex items-center justify-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 select-none text-sm">
            +82
          </span>
          <input
            id={name}
            required={required}
            {...register}
            type={type}
            className="appearance-none w-full px-3 py-2 border  border-gray-300 rounded-md rounded-l-none shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500  focus:border-orange-500"
          />
        </div>
      ) : null}
    </div>
  );
}