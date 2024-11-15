import { Button } from "./ui/button";

const Loading = () => {
  return (
    <button
      disabled
      className="flex items-center gap-2 p-3 border-2 border-[#f5deb3] rounded-xl mt-5"
    >
      <svg className="border-4 border-[#124d6a] border-l-blue-100 h-8 w-8 rounded-full animate-spin"></svg>
      <span className="text-black">Data from database is loaded...</span>{" "}
    </button>
  );
};

export default Loading;
