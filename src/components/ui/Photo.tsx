import Image from "next/image";
import { CSSProperties } from "react";

interface PhotoProps {
  src: string;
  alt: string;
  /** Fixed height for the crop frame (matches the Placeholder it replaces). */
  h?: number | string;
  className?: string;
  style?: CSSProperties;
  /** next/image responsive sizes hint. */
  sizes?: string;
  priority?: boolean;
}

// Real-photo slot — a cover-cropped frame that drops in where a Placeholder was.
export default function Photo({
  src,
  alt,
  h,
  className,
  style,
  sizes = "(max-width: 768px) 100vw, 50vw",
  priority = false,
}: PhotoProps) {
  return (
    <div
      className={className}
      style={{ position: "relative", width: "100%", height: h, overflow: "hidden", ...style }}
    >
      <Image src={src} alt={alt} fill sizes={sizes} priority={priority} style={{ objectFit: "cover" }} />
    </div>
  );
}
