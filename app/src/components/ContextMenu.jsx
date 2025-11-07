import { useRouter } from "next/router";
import React from "react";

function ContextMenu({ data }) {
  const router = useRouter();
  return (
    <div
      className={`z-10 bg-neutral-light divide-y divide-neutral-medium/30 shadow-2xl border border-neutral-medium/30 w-44 dark:bg-neutral-dark dark:divide-neutral-medium
      fixed right-5 top-20 
      `}
    >
      <ul className="py-2 text-sm text-neutral-dark dark:text-neutral-light">
        {data.map(({ name, callback }, index) => {
          return (
            <li
              key={index}
              onClick={callback}
              className="block px-4 py-2 hover:bg-secondary dark:hover:bg-neutral-medium dark:hover:text-neutral-light cursor-pointer"
            >
              {name}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default ContextMenu;
