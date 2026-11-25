import type { ReactNode } from "react";
import { motion } from "motion/react";
import { BackButton } from "@/components/BackButton/BackButton";
import { PAGE_TRANSITION } from "@/constants/motion";

// 진입 / 퇴장 애니메이션과 백 버튼을 제공하는 래퍼

type MotionTag = "div" | "ul";

export const SubView = ({ children, className = "", as = "div" }: {
  children: ReactNode;
  className?: string;
  as?: MotionTag;
}) => {
  const Component = motion[as];
  return (
    <Component {...PAGE_TRANSITION} className={className}>
      <BackButton className="mb-4" />
      {children}
    </Component>
  );
};