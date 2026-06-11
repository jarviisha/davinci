import type { SVGProps } from "react";
import { cn } from "../utils.js";

export function ChevronUpIcon({ className, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      aria-hidden="true"
      className={cn("icon icon-tabler icons-tabler-filled icon-tabler-chevron-up", className)}
      fill="currentColor"
      height={24}
      viewBox="0 0 24 24"
      width={24}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M0 0h24v24H0z" fill="none" stroke="none" />
      <path d="M11.293 7.293a1 1 0 0 1 1.32 -.083l.094 .083l6 6a1 1 0 0 1 -1.32 1.497l-.094 -.083l-5.293 -5.292l-5.293 5.292a1 1 0 0 1 -1.32 .083l-.094 -.083a1 1 0 0 1 -.083 -1.32l.083 -.094l6 -6z" />
    </svg>
  );
}
