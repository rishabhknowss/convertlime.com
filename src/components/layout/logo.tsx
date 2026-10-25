"use client";

import Link from "next/link";
import Image from "next/image";
import { SITE } from "@/config/site";
import { useLocalePath } from "@/i18n/locale-provider";

export const Logo = () => {
  const toPath = useLocalePath();
  return (
    <Link href={toPath("/")} aria-label={`${SITE.name} home`} className="flex w-fit items-center gap-2 font-semibold tracking-tight">
      <Image src="/brand/mark.svg" width={36} height={36} alt="" className="shrink-0" />
      <span className="text-[19px] leading-none text-foreground">{SITE.name}</span>
    </Link>
  );
};
