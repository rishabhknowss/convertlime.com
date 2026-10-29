import { Eraser, FileText, Globe, Minimize2, ReceiptText, Repeat, Scaling, Smartphone } from "lucide-react";
import type { CategoryId } from "@/data/tools";

const ICONS = {
  edit: Eraser,
  docs: ReceiptText,
  iphone: Smartphone,
  web: Globe,
  everyday: Repeat,
  compress: Minimize2,
  pdf: FileText,
};

type ToolIconProps = { category: CategoryId; slug: string; className?: string };

export const ToolIcon = ({ category, slug, className }: ToolIconProps) => {
  if (slug.startsWith("resize-image-to-")) return <Scaling className={className} />;
  if (slug.endsWith("-to-pdf")) return <FileText className={className} />;
  const Icon = ICONS[category];
  return <Icon className={className} />;
};
