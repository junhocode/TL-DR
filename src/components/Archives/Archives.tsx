import type { Archive } from "@/types/archive.type";

// Archives.tsx 수정
export const Archives = ({ archives }: { archives: Archive[] }) => {
  return (
    /* pb-20을 추가해서 리스트 끝에 공간 확보 */
    <div className="flex flex-col md:flex-row md:flex-wrap gap-8 w-full pb-10">
      {archives.map((img, index) => (
        <div key={index} className="relative shrink-0">
          <img
            src={img.src}
            alt="archive"
            className="w-full md:w-64 h-auto object-cover"
          />
        </div>
      ))}
    </div>
  );
};