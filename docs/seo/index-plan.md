# Indexing plan

Status on 2026-11-25: Google crawls and indexes the site (484 pages indexed, no manual action, live test passes),
but impressions have been zero since 2026-11-10. 717 pages are "Crawled – currently not indexed".

## Done

- Bare domain redirects to `https://www.convertlime.com` (308), so only one host serves pages.
- `docs/seo/disavow.txt` lists the 197 spam domains (numbered `.xyz` sites and link-selling `.shop` sites, first seen 2026-10-28 to 2026-11-06).
  Upload it in the disavow tool to the URL-prefix property `https://www.convertlime.com/`; the tool doesn't support domain properties.

## Wait until 2026-12-16

Give Google three weeks after the disavow and host fix. Request indexing for the core pages in URL inspection:
`/`, `/heic-to-jpg`, `/webp-to-jpg`, `/avif-to-jpg`, `/png-to-jpg`, `/remove-background`, `/invoice-generator`, `/compress-image`, `/image-to-pdf`.

## If impressions are still at zero

Cut the index down to the pages that earned impressions or target a known keyword, then grow it back as they rank.

1. Keep indexed:
   - every English page, all guides in every locale
   - featured converters, compress, image to PDF, remove background and invoice generator in every locale
   - any locale × converter page in the GSC export with impressions, or listed in `docs/seo/kd0-keywords.md`
2. `noindex, follow` the rest of the locale × converter pages (for example `ko/jpg-to-bmp`, `ja/png-to-tiff`).
   Pages stay live and linked; only the robots meta changes.
3. Drop the noindexed URLs from the sitemap and hreflang alternates so Google sees one consistent set.
4. Re-run `npm run indexnow` and resubmit the sitemap.
5. Re-allow a page to be indexed once its English version ranks in the top 20.
