import { CSSProperties, ReactNode } from "react";

interface PlaceholderProps {
  label?: string;
  w?: number | string;
  h?: number | string;
  tone?: string;
  ratio?: string;
  corner?: string;
  dense?: boolean;
  style?: CSSProperties;
  className?: string;
  children?: ReactNode;
}

// Striped slab — a slot for a real photo. Looks intentional on its own.
export default function Placeholder({
  label = "image",
  w,
  h,
  tone,
  ratio,
  corner,
  dense = false,
  style,
  className,
  children,
}: PlaceholderProps) {
  const bg = tone || "#d8d1c1";
  const stripe = "rgba(0,0,0,0.045)";
  return (
    <div
      className={`ph ${className ?? ""}`}
      style={{
        width: w,
        height: h,
        aspectRatio: ratio,
        backgroundColor: bg,
        backgroundImage: `repeating-linear-gradient(135deg, ${stripe} 0 1px, transparent 1px ${dense ? 8 : 14}px)`,
        ...style,
      }}
    >
      {corner && <span className="ph-corner">{corner}</span>}
      <span style={{ position: "relative", zIndex: 1 }}>{label}</span>
      {children}
    </div>
  );
}
