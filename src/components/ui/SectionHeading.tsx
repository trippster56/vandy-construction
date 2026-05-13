interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
}

export default function SectionHeading({ title, subtitle, centered = true }: SectionHeadingProps) {
  return (
    <div className={`mb-12 ${centered ? "text-center" : ""}`}>
      <h2 className="text-3xl md:text-4xl font-bold text-foreground">{title}</h2>
      <div className={`h-1 w-20 bg-primary mt-4 mb-4 rounded-full ${centered ? "mx-auto" : ""}`} />
      {subtitle && (
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">{subtitle}</p>
      )}
    </div>
  );
}
