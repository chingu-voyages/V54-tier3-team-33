import { ArrowPathIcon } from "@heroicons/react/20/solid";

export default function Spinner() {
  return (
    <div className="flex h-40 w-full flex-col items-center justify-center gap-2 text-gray-500">
      <ArrowPathIcon className="size-20 animate-spin" />
    </div>
  );
}
