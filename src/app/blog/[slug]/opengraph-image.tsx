import { ImageResponse } from "next/og";
import { OgCard } from "@/components/brand/og-card";
import { getPost, getPosts } from "@/lib/blog";

export const alt = "ConvertLime guide";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export const generateStaticParams = () => getPosts().map((post) => ({ slug: post.slug }));

const Image = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const post = getPost((await params).slug);
  return new ImageResponse(
    <OgCard heading={post?.title ?? "ConvertLime guide"} subheading="Step-by-step guide" footer="Free tools · No upload" />,
    size,
  );
};

export default Image;
