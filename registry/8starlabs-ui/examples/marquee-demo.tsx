import Marquee from "../blocks/marquee";

export default function MarqueeDemo() {
  return (
    <Marquee>
      {" "}
      <div className="w-48 h-25">
        <img
          src="/svgs/oikova_logo_light.svg"
          alt=""
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain"
          }}
        />
      </div>
      <div className="w-48 h-25">
        <img
          src="/svgs/vercel-logotype-light.svg"
          alt=""
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain"
          }}
        />
      </div>
      <div className="w-48 h-25">
        <img
          src="/svgs/supabase-logo-wordmark--light.svg"
          alt=""
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain"
          }}
        />
      </div>
    </Marquee>
  );
}
