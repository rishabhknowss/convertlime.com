const ARROW =
  "M63 245A148 148 0 0 1 246 58V28Q246 18 254 25L323 87Q329 93 323 99L254 161Q246 168 246 158V129A78 78 0 0 0 127 199Z";

const Mark = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 400 400" fill="#B9F34B">
    <path d={ARROW} />
    <path d={ARROW} transform="rotate(180 200 200)" />
  </svg>
);

type OgCardProps = { heading: string; subheading: string; footer: string };

export const OgCard = ({ heading, subheading, footer }: OgCardProps) => (
  <div
    style={{
      width: "100%",
      height: "100%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      background: "#182018",
      color: "#F4F6EF",
      padding: "64px 72px",
      fontFamily: "sans-serif",
    }}
  >
    <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
      <Mark size={56} />
      <span style={{ fontSize: 38, fontWeight: 700 }}>ConvertLime</span>
    </div>
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
      <div style={{ display: "flex", flexDirection: "column", maxWidth: 760 }}>
        <span style={{ fontSize: heading.length > 32 ? 60 : 84, fontWeight: 800, lineHeight: 1.08, letterSpacing: -2 }}>
          {heading}
        </span>
        <span style={{ fontSize: 34, color: "#B9F34B", marginTop: 24 }}>{subheading}</span>
      </div>
      <Mark size={260} />
    </div>
    <div style={{ display: "flex", justifyContent: "space-between", fontSize: 26, color: "#A8B0A0" }}>
      <span>{footer}</span>
      <span>convertlime.com</span>
    </div>
  </div>
);
