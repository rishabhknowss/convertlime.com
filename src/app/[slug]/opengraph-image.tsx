import { ImageResponse } from "next/og";
import { OgCard } from "@/components/brand/og-card";
import { TOOLS, getTool } from "@/data/tools";
import { toolHeading } from "@/lib/seo";

export const alt = "ConvertLime free file converter";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export const generateStaticParams = () => TOOLS.map((tool) => ({ slug: tool.slug }));

const Image = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const tool = getTool((await params).slug);
  const heading = tool ? toolHeading(tool) : "Free File Converter";
  return new ImageResponse(
    <OgCard heading={heading} subheading="Free. No sign-up. No upload." footer="Files never leave your device" />,
    size,
  );
};

export default Image;
