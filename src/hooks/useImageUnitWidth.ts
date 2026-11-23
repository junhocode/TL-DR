import { useEffect, useState } from "react";

export const useImageUnitWidth = (src: string, height: number) => {
  const [imageUnitWidth, setImageUnitWidth] = useState(0);

  useEffect(() => {
    const img = new Image();
    img.src = src;
    img.onload = () => {
      const aspectRatio = img.naturalWidth / img.naturalHeight;
      setImageUnitWidth(Math.ceil(height * aspectRatio));
    };
  }, [src, height]);

  return imageUnitWidth;
};
