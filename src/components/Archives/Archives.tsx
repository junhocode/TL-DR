import type { Archive } from "@/types/archive.type";

export const Archives = ({ archives }: { archives: Archive[] }) => {
  return (
    <div className="flex flex-col md:flex-row md:flex-wrap gap-8 w-full pb-10">
      {archives.map((img, index) => (
        <div key={index} className="relative">
          <img
            src={img.src}
            alt="archive"
            className="w-full md:w-64 h-auto object-cover "
          />
        </div>
      ))}
    </div>
  );
};