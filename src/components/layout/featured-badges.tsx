import { FEATURED_BADGES } from "@/data/featured-badges";

export const FeaturedBadges = () => (
  <div className="mx-auto mt-8 flex max-w-5xl flex-wrap items-center gap-3">
    {FEATURED_BADGES.map((badge) => (
      <a key={badge.name} href={badge.href} target="_blank" rel="noopener">
        <img src={badge.src} alt={badge.alt} width={badge.width} height={badge.height} loading="lazy" className="h-9 w-auto" />
      </a>
    ))}
  </div>
);
