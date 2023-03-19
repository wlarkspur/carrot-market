import type { NextPage } from "next";

const Chats: NextPage = () => {
  return (
    <div className="py-10 divide-y-[1px]">
      {[1, 2, 3, 4, 5, 6, 7].map((_, i) => (
        <div
          key={i}
          className="flex cursor-pointer py-3 px-4 items-center space-x-3"
        >
          <div className="w-12 h-12 rounded-full bg-slate-300" />
          <div>
            <p className="text-memidum  text-gray-700">Steve Jebs</p>
            <p className="text-sm text-gray-500">
              See you tommorrow in the corner at 2pm! &rarr;
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Chats;
