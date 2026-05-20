import { forwardRef, useState, type HTMLAttributes } from "react";
import { cn } from "./utils.js";

export type AvatarSize = "sm" | "md" | "lg" | "xl";

export type AvatarProps = HTMLAttributes<HTMLSpanElement> & {
  alt?: string;
  fallback?: string;
  name?: string;
  size?: AvatarSize;
  src?: string;
};

const sizeClass: Record<AvatarSize, string> = {
  sm: "davinci-avatar--sm",
  md: "davinci-avatar--md",
  lg: "davinci-avatar--lg",
  xl: "davinci-avatar--xl"
};

export const Avatar = forwardRef<HTMLSpanElement, AvatarProps>(function Avatar(
  { alt, className, fallback, name, size = "md", src, ...props },
  ref
) {
  const [imageFailed, setImageFailed] = useState(false);
  const label = alt ?? name ?? fallback ?? "Avatar";
  const initials = fallback ?? initialsFromName(name ?? alt);
  const showImage = Boolean(src) && !imageFailed;

  return (
    <span aria-label={label} className={cn("davinci-avatar", sizeClass[size], className)} ref={ref} {...props}>
      {showImage ? (
        <img alt="" className="davinci-avatar__image" onError={() => setImageFailed(true)} src={src} />
      ) : (
        <span aria-hidden="true" className="davinci-avatar__fallback">
          {initials}
        </span>
      )}
    </span>
  );
});

function initialsFromName(value: string | undefined): string {
  if (!value) return "?";
  const parts = value.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  return parts
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
}
