import { SubView } from "@/components/SubView/SubView";
import { ARCHIVE } from "@/constants/archive";

export const Archive = () => {
  return (
    <SubView className="flex-1 min-w-0">
      <div className="grid grid-cols-1 md:grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-8">
        {ARCHIVE.map((img) => (
          <div key={img.id}>
            <img
              src={img.src}
              alt={`Archive ${img.id}`}
              width={img.width}
              height={img.height}
              loading="lazy"
              decoding="async"
              className="w-full"
            />
          </div>
        ))}
      </div>
    </SubView>
  );
};
