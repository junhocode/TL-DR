interface Archive {
  id: string;
  src: string;
}

const ARCHIVE_IMAGES: Archive[] = [
  { id: "1", src: "/images/wrist_1.jpg" },
  { id: "2", src: "/images/wrist_2.jpg" },
  { id: "3", src: "/images/wrist_3.jpg" },
  { id: "4", src: "/images/wrist_4.jpg" },
];

export const Archive = () => {
  return (
    <div className="flex gap-6">
      {ARCHIVE_IMAGES.map((img) => (
        <div className="relative overflow-hidden"
        >
          <img
            src={img.src}
            alt="archive"
            className="w-64"
          />
        </div>
      ))}
    </div>
  );
};