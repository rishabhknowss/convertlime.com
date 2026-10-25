import { FileImage, FileText, Minimize2, Scaling, Smartphone, Globe, Repeat } from "lucide-react";
import type { Tool } from "@/data/tools";

const ICONS = {
  iphone: Smartphone,
  web: Globe,
  everyday: Repeat,
  compress: Minimize2,
  pdf: FileText,
};

export const ToolIcon = ({ tool, className }: { tool: Tool; className?: string }) => {
  if (tool.kind === "resize-kb") return <Scaling className={className} />;
  if (tool.kind === "to-pdf") return <FileText className={className} />;
  const Icon = ICONS[tool.category] ?? FileImage;
  return <Icon className={className} />;
};
