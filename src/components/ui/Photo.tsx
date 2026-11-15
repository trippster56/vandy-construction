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
  /** The page's LCP image: preloaded and fetched at high priority. Use on at most one or two images per page. */
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
      {/* Next 16 replaced `priority` with `preload`; fetchPriority="high" also
          rides on the preload link so the LCP request isn't queued behind others. */}
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        preload={priority}
        fetchPriority={priority ? "high" : undefined}
        style={{ objectFit: "cover" }}
      />
    </div>
  );
}
