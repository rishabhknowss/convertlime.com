export const JsonLd = ({ graph }: { graph: Record<string, unknown>[] }) => (
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@graph": graph }) }}
  />
);
