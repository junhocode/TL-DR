import { SubView } from "@/components/SubView/SubView";
import type { ArchiveItem } from "@/types/archive.type";

export const Archive = ({ archive }: { archive: ArchiveItem[] }) => {
  return (
    <SubView>
      <div className="grid grid-cols-1 md:grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-8">
        {archive.map((img) => (
          <div key={img.id}>
            <img src={img.src} alt={img.id} className="w-full" />
          </div>
        ))}
      </div>
    </SubView>
  );
};