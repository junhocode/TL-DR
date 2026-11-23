import { useEffect, useState } from "react";
import { FOOTER_HEIGHT } from "@/constants/layout";

export const useImageUnitWidth = (src: string) => {
  const [imageUnitWidth, setImageUnitWidth] = useState(0);

  useEffect(() => {
    const img = new Image();
    img.src = src;
    img.onload = () => {
      const aspectRatio = img.naturalWidth / img.naturalHeight;
      setImageUnitWidth(Math.ceil(FOOTER_HEIGHT * aspectRatio));
    };
  }, [src]);

  return imageUnitWidth;
};
