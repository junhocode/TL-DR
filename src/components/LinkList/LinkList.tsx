import { motion } from "motion/react";
import { SubView } from "@/components/SubView/SubView";
import type { LinkListItem } from "@/types/linkList.type";

// id, title, src 를 가진 정보를 띄우는 컴포넌트를 추상화했다. (혹은 공동 컴포넌트)
// externals와 visuals가 해당되고 둘의 구조는 완전히 동일하다.

export const LinkList = ({ items }: { items: LinkListItem[] }) => {
  return (
    <SubView as="ul" className="flex flex-col gap-2">
      {items.map((item, index) => (
        <motion.li
          key={item.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: index * 0.05 }}
          className="group"
        >
          <a
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex gap-8 cursor-pointer transition-all text-smart-opacity hover:underline"
          >
            {item.title}
          </a>
        </motion.li>
      ))}
    </SubView>
  );
};