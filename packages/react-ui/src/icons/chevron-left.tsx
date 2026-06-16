import type { SVGProps } from "react";
import { cn } from "../utils.js";

export function ChevronLeftIcon({ className, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      aria-hidden="true"
      className={cn("icon icon-tabler icons-tabler-filled icon-tabler-chevron-left", className)}
      fill="currentColor"
      height={24}
      viewBox="0 0 24 24"
      width={24}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M0 0h24v24H0z" fill="none" stroke="none" />
      <path d="M15.707 5.293a1 1 0 0 1 0 1.414l-5.293 5.293l5.293 5.293a1 1 0 0 1 -1.414 1.414l-6 -6a1 1 0 0 1 0 -1.414l6 -6a1 1 0 0 1 1.414 0" />
    </svg>
  );
}
