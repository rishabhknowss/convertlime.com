import Script from "next/script";

const GOOGLE_MEASUREMENT_ID = "G-76ZK8NC22W";

export const Analytics = () => (
  <>
    <Script
      id="google-analytics"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GOOGLE_MEASUREMENT_ID}', {
  allow_google_signals: false,
  allow_ad_personalization_signals: false
});`,
      }}
    />
    <Script
      src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_MEASUREMENT_ID}`}
      strategy="afterInteractive"
    />
    <Script
      src="https://analytics.ahrefs.com/analytics.js"
      data-key="ltX9gYAxs4C1pu74L7+/0A"
      strategy="afterInteractive"
    />
  </>
);
