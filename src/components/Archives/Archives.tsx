import type { Archive } from "@/types/archive.type";

export const Archives = ({ archives }: { archives: Archive[] }) => {
  return (
    <div className="flex flex-col md:flex-row md:flex-wrap gap-8">
      {archives.map((img, index) => (
        <div key={index}>
          <img
            src={img.src}
            alt="archive"
            className="w-full md:w-64"
          />
        </div>
      ))}
    </div>
  );
}