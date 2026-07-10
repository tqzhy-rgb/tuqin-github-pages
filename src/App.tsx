import {
  ArrowRight,
  Heart,
  Mail,
  ShoppingBag,
  X
} from "lucide-react";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import type { CSSProperties, MouseEvent, PointerEvent, ReactNode } from "react";
import Lanyard3D from "./Lanyard3D";

const easeOut: [number, number, number, number] = [0.22, 1, 0.36, 1];
const scrambleChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_./";

type HeroMediaSource = {
  type: "image" | "video";
  src: string;
  poster?: string;
  alt: string;
};

const assetUrl = (path: string) => `${import.meta.env.BASE_URL}${path.replace(/^\/+/, "")}`;

const heroMedia: HeroMediaSource = {
  type: "video",
  src: assetUrl("hero-screen-1.mp4"),
  alt: "TUQIN personal site hero video"
};

const featuredWorks = [
  {
    title: "恩佐德鲁 · 创意公司",
    image: assetUrl("work/2.webp"),
    tags: ["网页设计与开发"]
  },
  {
    title: "疯狂的七个阶段",
    image: assetUrl("work/4.webp"),
    tags: ["品牌识别", "动态 3D"]
  },
  {
    title: "Kastle AI",
    image: assetUrl("work/5.webp"),
    tags: ["动态 3D", "网页设计与开发"]
  },
  {
    title: "运动内容实验室",
    image: assetUrl("work/6.webp"),
    tags: ["视觉运营", "网页设计"]
  },
  {
    title: "七阶段品牌片",
    image: assetUrl("work/1-v2.webp"),
    tags: ["品牌策划", "AI 视频"]
  },
  {
    title: "智能业务界面",
    image: assetUrl("work/3.webp"),
    tags: ["VI 系统", "产品视觉"]
  }
];

const services = [
  {
    title: "品牌识别",
    label: "Brand identity",
    video: assetUrl("service-videos/KEY01.webm"),
    text: "定义品牌的市场位置、语气和视觉原则，把抽象优势转成可执行的传播系统。",
    bullets: ["品牌定位", "命名与语气", "内容叙事", "发布路径"]
  },
  {
    title: "网页设计与开发",
    label: "Web design & development",
    video: assetUrl("service-videos/KEY02.webm"),
    text: "用清晰的信息架构、动效节奏和响应式界面，为品牌搭建可持续运营的网站与产品体验。",
    bullets: ["官网设计", "交互原型", "视觉组件", "前端落地"]
  },
  {
    title: "动态系统",
    label: "Motion system",
    video: assetUrl("service-videos/KEY03.webm"),
    text: "结合 AI 视频、三维视觉和运营模板，为品牌持续输出更有记忆点的内容资产。",
    bullets: ["AI 视频", "视觉运营", "短片节奏", "活动物料"]
  }
];

const testimonials = [
  {
    quote:
      "与 TUQIN 合作最舒服的是推进很快。前期把品牌方向和视觉规则讲清楚，后面每一次延展都能保持统一，不需要反复返工。",
    name: "查理斯·伍兹",
    role: "Brand Lead",
    initials: "CW",
    avatarColor: "linear-gradient(135deg, #ff5a1f, #ffb199)",
    offset: 34
  },
  {
    quote:
      "他们不是只给一套好看的画面，而是把官网、运营内容、短视频物料放在一个系统里思考。上线后团队继续使用也很顺。",
    name: "麦克斯·吉尔伯格",
    role: "主理人",
    initials: "MG",
    avatarColor: "linear-gradient(135deg, #7bdff2, #263238)",
    offset: -18
  },
  {
    quote:
      "从 Logo 到页面动效，语言一直保持稳定。TUQIN 对细节的判断很准，也会主动提醒哪些视觉资产可以被长期复用。",
    name: "赛琳娜·詹森",
    role: "Creative Partner",
    initials: "SJ",
    avatarColor: "linear-gradient(135deg, #f7d794, #b33939)",
    offset: 46
  },
  {
    quote:
      "这次合作像一次完整的品牌梳理。视觉方向、内容节奏和开发落地都被放在同一张桌子上讨论，决策效率非常高。",
    name: "侯瑞米·布沙尔",
    role: "策略顾问",
    initials: "HB",
    avatarColor: "linear-gradient(135deg, #dfe6e9, #2d3436)",
    offset: 4
  },
  {
    quote:
      "TUQIN 的优势是能把策略、视觉和技术合在一起推进。每个节点都有明确判断，最终呈现比我们最初预想得更完整。",
    name: "索菲娅·陈",
    role: "项目负责人",
    initials: "SC",
    avatarColor: "linear-gradient(135deg, #ffeaa7, #6c5ce7)",
    offset: -28
  },
  {
    quote: "很喜欢这套工作方式，直接、克制，但结果有记忆点。",
    name: "洛伦佐·马拉森",
    role: "品牌合伙人",
    initials: "LM",
    avatarColor: "linear-gradient(135deg, #ffffff, #636e72)",
    offset: 22
  }
];

const communityAvatars = [
  ...testimonials.map((item) => ({
    name: item.name,
    initials: item.initials,
    avatarColor: item.avatarColor
  })),
  { name: "Motion Partner", initials: "MP", avatarColor: "linear-gradient(135deg, #c3f73a, #143d2a)" },
  { name: "AI Director", initials: "AI", avatarColor: "linear-gradient(135deg, #ffffff, #ff5a1f)" },
  { name: "Visual Designer", initials: "VI", avatarColor: "linear-gradient(135deg, #d7c9ff, #2d1a66)" },
  { name: "Web Engineer", initials: "WE", avatarColor: "linear-gradient(135deg, #8ad7ff, #111827)" },
  { name: "Brand Strategist", initials: "BS", avatarColor: "linear-gradient(135deg, #ffe8a3, #8b3f12)" },
  { name: "3D Artist", initials: "3D", avatarColor: "linear-gradient(135deg, #e8ecef, #161616)" }
];

const servedBrands = [
  "服务过的品牌方",
  "Microsoft",
  "Kastle AI",
  "7Mesh",
  "Enzo Drew",
  "OKOK",
  "Noir Studio",
  "Parallax"
];

const studioStats = [
  ["13+", "经验年限"],
  ["35+", "跨项目实践"],
  ["100+", "满意的客户"]
];

const toolLogos = [
  { name: "AI", src: assetUrl("tool-logos/AI.jpg") },
  { name: "Logo 01", src: assetUrl("tool-logos/BMe8vlkPa8N2JjxcYLPmKLGiBzM.avif") },
  { name: "C", src: assetUrl("tool-logos/c.jpg") },
  { name: "Logo 02", src: assetUrl("tool-logos/Hz0gCwbQxcpVlO41HhRZPoUn6g.avif") },
  { name: "M", src: assetUrl("tool-logos/m.jpg") },
  { name: "Logo 03", src: assetUrl("tool-logos/VC5o6lscCcFa03XfPOdeZltqxdQ.avif") },
  { name: "J", src: assetUrl("tool-logos/j.jpg") }
];

type CursorMode = "default" | "nav" | "media";

const cursorModes: Record<CursorMode, { label: string; className: string }> = {
  default: { label: "", className: "custom-cursor--default" },
  nav: { label: "", className: "custom-cursor--nav" },
  media: { label: "终身专案", className: "custom-cursor--media" }
};

function scrambleText(target: string, progress: number) {
  if (progress >= 0.99) {
    return target;
  }

  const revealCount = Math.floor(target.length * progress);
  const frame = Math.floor(progress * 100);

  return Array.from(target)
    .map((character, index) => {
      if (character === " " || index < revealCount) {
        return character;
      }

      return scrambleChars[(index * 17 + frame * 13) % scrambleChars.length];
    })
    .join("");
}

function formatPercent(value: number) {
  return `${String(value).padStart(3, "0")}%`;
}

function Preloader() {
  const shouldSkip =
    typeof window !== "undefined" && new URLSearchParams(window.location.search).has("skipLoader");
  const [percent, setPercent] = useState(0);
  const [isLeaving, setIsLeaving] = useState(false);
  const [isGone, setIsGone] = useState(shouldSkip);

  useEffect(() => {
    if (shouldSkip) {
      return;
    }

    const duration = 1900;
    const start = performance.now();
    let frameId = 0;
    let leaveTimer = 0;
    let goneTimer = 0;

    document.body.style.overflow = "hidden";

    const tick = (now: number) => {
      const next = Math.min(100, Math.round(((now - start) / duration) * 100));
      setPercent(next);

      if (next < 100) {
        frameId = requestAnimationFrame(tick);
        return;
      }

      leaveTimer = window.setTimeout(() => setIsLeaving(true), 260);
      goneTimer = window.setTimeout(() => {
        setIsGone(true);
        document.body.style.overflow = "";
      }, 980);
    };

    frameId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frameId);
      window.clearTimeout(leaveTimer);
      window.clearTimeout(goneTimer);
      document.body.style.overflow = "";
    };
  }, [shouldSkip]);

  if (isGone) {
    return null;
  }

  const progress = percent / 100;

  return (
    <motion.div
      className="loader"
      animate={isLeaving ? { y: "-100%" } : { y: "0%" }}
      transition={{ duration: 0.72, ease: easeOut }}
    >
      <div className="loader__brand">
        <span className="brand-mark">✣</span>
        <span>TUQIN</span>
      </div>
      <div className="loader__content">
        <div className="loader__line">{scrambleText("Loading brand momentum___", progress)}</div>
        <div className="loader__progress">
          <span>{scrambleText("Calibrating digital craft___", progress)}</span>
          <span>{formatPercent(percent)}</span>
        </div>
        <div className="loader__bar">
          <span style={{ width: `${percent}%` }} />
        </div>
      </div>
    </motion.div>
  );
}

function Reveal({
  children,
  className = "",
  delay = 0
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-90px" });
  const [hasEntered, setHasEntered] = useState(false);

  useEffect(() => {
    if (isInView) {
      setHasEntered(true);
    }
  }, [isInView]);

  useEffect(() => {
    const node = ref.current;

    if (!node || hasEntered) {
      return;
    }

    const checkPosition = () => {
      const rect = node.getBoundingClientRect();
      const viewportHeight = window.innerHeight || document.documentElement.clientHeight;

      if (rect.top < viewportHeight * 0.92 && rect.bottom > 0) {
        setHasEntered(true);
      }
    };

    checkPosition();
    window.addEventListener("scroll", checkPosition, { passive: true });
    window.addEventListener("resize", checkPosition);

    return () => {
      window.removeEventListener("scroll", checkPosition);
      window.removeEventListener("resize", checkPosition);
    };
  }, [hasEntered]);

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 26 }}
      animate={hasEntered ? { opacity: 1, y: 0 } : { opacity: 0, y: 26 }}
      transition={{ duration: 0.72, delay, ease: easeOut }}
    >
      {children}
    </motion.div>
  );
}

function CustomCursor() {
  const [cursor, setCursor] = useState({
    x: 0,
    y: 0,
    visible: false,
    mode: "default" as CursorMode,
    label: ""
  });

  useEffect(() => {
    const canUseCustomCursor = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

    if (!canUseCustomCursor) {
      return;
    }

    const root = document.documentElement;
    root.classList.add("has-custom-cursor");

    const handlePointerMove = (event: globalThis.PointerEvent) => {
      const target = event.target instanceof Element ? event.target : null;
      const cursorTarget = target?.closest<HTMLElement>("[data-cursor]");
      const nextMode = (cursorTarget?.dataset.cursor || "default") as CursorMode;
      const mode = nextMode in cursorModes ? nextMode : "default";
      const label = cursorTarget?.dataset.cursorLabel || cursorModes[mode].label;

      setCursor({
        x: event.clientX,
        y: event.clientY,
        visible: true,
        mode,
        label
      });
    };

    const hideCursor = () => {
      setCursor((current) => ({ ...current, visible: false }));
    };

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerleave", hideCursor);
    window.addEventListener("blur", hideCursor);

    return () => {
      root.classList.remove("has-custom-cursor");
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerleave", hideCursor);
      window.removeEventListener("blur", hideCursor);
    };
  }, []);

  return (
    <div
      className={`custom-cursor ${cursorModes[cursor.mode].className} ${
        cursor.visible ? "is-visible" : ""
      }`}
      style={{ left: cursor.x, top: cursor.y }}
      aria-hidden="true"
    >
      {cursor.label ? <span>{cursor.label}</span> : null}
    </div>
  );
}

function ContactHangTag({
  isOpen,
  onClose
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  return (
    <AnimatePresence>
      {isOpen ? (
        <motion.aside
          className="contact-hangtag"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45, ease: easeOut }}
        >
          <button
            className="contact-hangtag__close"
            type="button"
            onClick={onClose}
            aria-label="关闭联系吊牌"
            data-cursor="nav"
          >
            <X size={16} />
          </button>
          <Lanyard3D className="contact-hangtag__scene" position={[0, 0, 24]} fov={24} />
        </motion.aside>
      ) : null}
    </AnimatePresence>
  );
}

function SiteNav({
  onContactClick
}: {
  onContactClick: (event: MouseEvent<HTMLAnchorElement>) => void;
}) {
  const [isHovering, setIsHovering] = useState(false);
  const [pointer, setPointer] = useState({ x: 0, y: 0 });
  const navStyle = {
    "--nav-x": `${pointer.x}px`,
    "--nav-y": `${pointer.y}px`
  } as CSSProperties;

  const updatePointer = (event: PointerEvent<HTMLElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setPointer({
      x: event.clientX - rect.left,
      y: event.clientY - rect.top
    });
  };

  const navItems = [
    { href: "#work", label: "作品", english: "WORK" },
    { href: "#services", label: "优势", english: "ADVANTAGES" },
    { href: "#about", label: "关于我", english: "ABOUT ME" }
  ];

  return (
    <header
      className={`site-nav ${isHovering ? "is-hovering" : ""}`}
      onPointerEnter={() => setIsHovering(true)}
      onPointerLeave={() => setIsHovering(false)}
      onPointerMove={updatePointer}
      style={navStyle}
    >
      <a href="#home" className="site-nav__brand" aria-label="TUQIN home">
        <span className="brand-mark">✣</span>
        <span>TUQIN</span>
      </a>
      <nav className="site-nav__links" aria-label="Main navigation">
        {navItems.map((item) => (
          <a
            href={item.href}
            data-cursor="nav"
            onClick={item.href === "#contact" ? onContactClick : undefined}
            key={item.href}
          >
            <span className="nav-label">
              <span className="nav-label__cn">{item.label}</span>
              <span className="nav-label__en">{item.english}</span>
            </span>
          </a>
        ))}
      </nav>
      <a href="#contact" className="site-nav__cta" data-cursor="nav" onClick={onContactClick}>
        <span className="nav-label">
          <span className="nav-label__cn">联系我</span>
          <span className="nav-label__en">CONTACT</span>
        </span>
        <ArrowRight size={14} />
      </a>
    </header>
  );
}

function HeroMedia({ source }: { source: HeroMediaSource }) {
  const shouldRenderVideo =
    source.type === "video" || /\.(mp4|webm|ogg|mov)(\?|$)/i.test(source.src);

  if (shouldRenderVideo) {
    return (
      <video
        className="hero-banner__asset"
        src={source.src}
        poster={source.poster}
        autoPlay
        loop
        muted
        playsInline
        aria-label={source.alt}
      />
    );
  }

  return <img className="hero-banner__asset" src={source.src} alt={source.alt} />;
}

function Hero({
  onContactClick
}: {
  onContactClick: (event: MouseEvent<HTMLAnchorElement>) => void;
}) {
  return (
    <section
      id="home"
      className={`hero-banner ${heroMedia.type === "video" ? "hero-banner--video" : ""}`}
      data-cursor="media"
      data-cursor-label="终身专案"
    >
      <div className="hero-banner__media">
        <HeroMedia source={heroMedia} />
        {heroMedia.type === "image" ? (
          <div className="hero-object" aria-hidden="true">
            <span className="hero-object__bar hero-object__bar--one" />
            <span className="hero-object__bar hero-object__bar--two" />
            <span className="hero-object__bar hero-object__bar--three" />
            <span className="hero-object__core" />
          </div>
        ) : null}
        <div className="hero-banner__scrim" />
      </div>

      <div className="hero-banner__content">
        <div className="hero-copy-block">
          <motion.p
            className="hero-banner__kicker"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.72, delay: 0.18, ease: easeOut }}
          >
            Brand systems / Visual operation / AI video
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 34 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.82, delay: 0.28, ease: easeOut }}
          >
            推动 品牌 前进
          </motion.h1>
          <motion.p
            className="hero-banner__statement"
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.78, delay: 0.42, ease: easeOut }}
          >
            以品牌策划、视觉运营、VI / Logo 与 AI 视频为核心，为个人与品牌建立有记忆点、可持续生长的数字表达。
          </motion.p>
          <motion.div
            className="hero-actions"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.72, delay: 0.58, ease: easeOut }}
          >
            <a href="#work" data-cursor="media" data-cursor-label="看作品">
              看作品
              <ArrowRight size={14} />
            </a>
            <a href="#contact" data-cursor="media" data-cursor-label="联系我" onClick={onContactClick}>
              联系我
              <ArrowRight size={14} />
            </a>
          </motion.div>
        </div>
      </div>

      <motion.div
        className="hero-banner__bottom"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.72, delay: 0.62, ease: easeOut }}
      >
        <div className="hero-banner__meta">
          <span>Shanghai / Remote</span>
          <span>2026 Portfolio</span>
        </div>
        <a href="#work" className="scroll-cue">
          看作品
          <ArrowRight size={14} className="rotate-down" />
        </a>
      </motion.div>
    </section>
  );
}

function MotionBand() {
  return (
    <section className="motion-band" aria-label="服务过的品牌方">
      <div className="motion-band__track">
        {Array.from({ length: 4 }).map((_, groupIndex) => (
          <span className="motion-band__group" key={groupIndex}>
            {servedBrands.map((brand, index) => (
              <span className={index === 0 ? "motion-band__label" : "motion-band__brand"} key={brand}>
                {brand}
                <i>✣</i>
              </span>
            ))}
          </span>
        ))}
      </div>
    </section>
  );
}

function CommunityGlobeCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) {
      return;
    }

    let frameId = 0;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const draw = (time = 0) => {
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      const width = Math.max(1, rect.width);
      const height = Math.max(1, rect.height);

      const nextWidth = Math.round(width * dpr);
      const nextHeight = Math.round(height * dpr);

      if (canvas.width !== nextWidth || canvas.height !== nextHeight) {
        canvas.width = nextWidth;
        canvas.height = nextHeight;
      }

      const context = canvas.getContext("2d");

      if (!context) {
        return;
      }

      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      context.clearRect(0, 0, width, height);

      const cx = width * 0.5;
      const cy = height * 0.52;
      const radius = Math.min(width, height) * 0.38;
      const centerLon = 112 + (reduceMotion ? 0 : time * 0.004);
      const tilt = 0.18;
      const toRad = Math.PI / 180;

      const project = (lon: number, lat: number) => {
        const lambda = (lon - centerLon) * toRad;
        const phi = lat * toRad;
        const visibility = Math.cos(phi) * Math.cos(lambda);

        if (visibility < -0.02) {
          return null;
        }

        return {
          x: cx + radius * Math.cos(phi) * Math.sin(lambda),
          y: cy - radius * (Math.sin(phi) * 0.86 + Math.cos(phi) * Math.cos(lambda) * tilt),
          visibility: Math.max(0, visibility)
        };
      };

      const drawProjectedLine = (
        points: Array<[number, number]>,
        color: string,
        lineWidth: number
      ) => {
        context.beginPath();
        let hasPoint = false;

        points.forEach(([lon, lat]) => {
          const point = project(lon, lat);

          if (!point) {
            hasPoint = false;
            return;
          }

          if (!hasPoint) {
            context.moveTo(point.x, point.y);
            hasPoint = true;
            return;
          }

          context.lineTo(point.x, point.y);
        });

        context.strokeStyle = color;
        context.lineWidth = lineWidth;
        context.stroke();
      };

      const globeGradient = context.createRadialGradient(
        cx - radius * 0.3,
        cy - radius * 0.35,
        radius * 0.1,
        cx,
        cy,
        radius
      );
      globeGradient.addColorStop(0, "rgba(255, 255, 255, 0.96)");
      globeGradient.addColorStop(0.72, "rgba(246, 241, 232, 0.86)");
      globeGradient.addColorStop(1, "rgba(220, 214, 202, 0.56)");

      context.beginPath();
      context.arc(cx, cy, radius, 0, Math.PI * 2);
      context.fillStyle = globeGradient;
      context.fill();

      context.save();
      context.beginPath();
      context.arc(cx, cy, radius, 0, Math.PI * 2);
      context.clip();

      context.fillStyle = "rgba(5, 5, 5, 0.64)";
      for (let lat = -62; lat <= 72; lat += 3) {
        for (let lon = centerLon - 88; lon <= centerLon + 88; lon += 4) {
          const point = project(lon, lat);

          if (!point) {
            continue;
          }

          context.globalAlpha = 0.12 + point.visibility * 0.34;
          context.beginPath();
          context.arc(point.x, point.y, 0.92, 0, Math.PI * 2);
          context.fill();
        }
      }

      context.globalAlpha = 1;

      for (let lat = -60; lat <= 75; lat += 15) {
        const points: Array<[number, number]> = [];
        for (let lon = centerLon - 90; lon <= centerLon + 90; lon += 2) {
          points.push([lon, lat]);
        }
        drawProjectedLine(points, "rgba(5,5,5,0.11)", 1);
      }

      for (let lon = -180; lon <= 180; lon += 15) {
        const points: Array<[number, number]> = [];
        for (let lat = -70; lat <= 82; lat += 2) {
          points.push([lon, lat]);
        }
        drawProjectedLine(points, "rgba(5,5,5,0.1)", 1);
      }

      const outlines: Array<Array<[number, number]>> = [
        [[-10, 36], [0, 44], [12, 48], [22, 42], [32, 45], [42, 55], [58, 58], [70, 54], [84, 58], [102, 52], [122, 48], [142, 42], [132, 30], [112, 22], [94, 16], [78, 22], [65, 31], [48, 28], [36, 35], [24, 36], [10, 41], [-10, 36]],
        [[-17, 35], [2, 36], [22, 31], [36, 20], [43, 4], [36, -18], [24, -34], [8, -34], [-8, -20], [-16, 0], [-17, 35]],
        [[66, 25], [78, 28], [88, 20], [84, 8], [74, 8], [68, 17], [66, 25]],
        [[96, 40], [112, 45], [124, 38], [123, 25], [110, 19], [100, 26], [96, 40]],
        [[128, 43], [140, 38], [143, 31], [136, 27], [129, 33], [128, 43]],
        [[108, -9], [125, -18], [145, -18], [155, -30], [136, -43], [114, -36], [108, -9]]
      ];

      outlines.forEach((outline) => drawProjectedLine(outline, "rgba(5,5,5,0.58)", 1.15));

      const markers: Array<[number, number, string, number]> = [
        [117.23, 31.82, "#ff5a1f", 3.8],
        [121.47, 31.23, "#15f739", 2.8],
        [2.35, 48.86, "#050505", 2.4],
        [-74.01, 40.71, "#050505", 2.4],
        [139.69, 35.68, "#050505", 2.4]
      ];

      markers.forEach(([lon, lat, color, size]) => {
        const point = project(lon, lat);

        if (!point) {
          return;
        }

        const glowColor =
          color === "#ff5a1f"
            ? "rgba(255, 90, 31, 0.16)"
            : color === "#15f739"
              ? "rgba(21, 247, 57, 0.16)"
              : "rgba(5, 5, 5, 0.1)";

        context.globalAlpha = 0.48 + point.visibility * 0.52;
        context.beginPath();
        context.arc(point.x, point.y, size + 5, 0, Math.PI * 2);
        context.fillStyle = glowColor;
        context.fill();
        context.globalAlpha = 1;
        context.beginPath();
        context.arc(point.x, point.y, size, 0, Math.PI * 2);
        context.fillStyle = color;
        context.fill();
      });

      context.restore();

      context.beginPath();
      context.arc(cx, cy, radius, 0, Math.PI * 2);
      context.strokeStyle = "rgba(5,5,5,0.16)";
      context.lineWidth = 1.2;
      context.stroke();

    };

    const render = (time: number) => {
      draw(time);

      if (!reduceMotion) {
        frameId = requestAnimationFrame(render);
      }
    };

    const resizeObserver = new ResizeObserver(() => draw(0));
    resizeObserver.observe(canvas);
    render(0);

    return () => {
      resizeObserver.disconnect();
      cancelAnimationFrame(frameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="community-globe__canvas" aria-hidden="true" />;
}

function CommunityGlobe() {
  return (
    <div className="community-card__inner community-card__inner--globe-only">
      <div className="community-card__visual" data-cursor="media" data-cursor-label="全球协作">
        <div className="community-globe">
          <CommunityGlobeCanvas />
          <div className="community-orbit" aria-hidden="true">
            <div className="community-orbit__ring">
              {communityAvatars.map((avatar, index) => (
                <span
                  className="community-orbit__slot"
                  key={`${avatar.initials}-${index}`}
                  style={
                    {
                      "--angle": `${(360 / communityAvatars.length) * index}deg`
                    } as CSSProperties
                  }
                >
                  <span
                    className="community-orbit__avatar"
                    style={{ "--avatar-bg": avatar.avatarColor } as CSSProperties}
                    title={avatar.name}
                  >
                    <span>{avatar.initials}</span>
                  </span>
                </span>
              ))}
            </div>
          </div>
          <div className="community-globe__meta">
            <span>HEFEI, CN</span>
            <span>AVAILABLE WORLDWIDE</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function FeaturedWork() {
  return (
    <section id="work" className="page-shell page-shell--work">
      <div className="work-showcase">
        <Reveal className="work-heading">
          <h2>
            精选作品
            <Heart size={18} fill="currentColor" />
          </h2>
          <a href="#contact" data-cursor="media" data-cursor-label="查看更多">
            查看全部
            <ArrowRight size={14} />
          </a>
        </Reveal>
        <div className="work-grid">
          {featuredWorks.map((work, index) => (
            <Reveal delay={index * 0.05} key={work.title}>
              <a
                href="#contact"
                className="work-card"
                data-cursor="media"
                data-cursor-label="终身专案"
              >
                <img className="work-card__image" src={work.image} alt={work.title} />
                <div className="work-card__shade" />
                <div className="work-card__content">
                  <h3>{work.title}</h3>
                  <div className="work-card__tags">
                    {work.tags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                </div>
                <span className="work-card__arrow">
                  <ArrowRight size={18} />
                </span>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Services() {
  return (
    <section id="services" className="page-shell page-shell--studio">
      <div className="black-canvas studio-canvas">
        <Reveal className="studio-heading">
          <p className="studio-section-label">
            （服务与专案）
            <ArrowRight size={13} />
          </p>
          <h2>数字设计优势</h2>
          <p>
            过去十年，我用在数位设计领域精进了魔法般的技能，提供精通至极致的服务，始终以动能为核心。
          </p>
        </Reveal>

        <div className="studio-feature-grid">
          {services.map((service, index) => (
            <Reveal delay={index * 0.06} key={service.title}>
              <article className="studio-feature-card" data-cursor="media" data-cursor-label={service.title}>
                <div className="studio-feature-card__visual">
                  <video
                    className="studio-feature-card__video"
                    src={service.video}
                    autoPlay
                    loop
                    muted
                    playsInline
                    aria-label={service.title}
                  />
                </div>
                <h3>{service.title}</h3>
                <p>{service.label}</p>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal className="studio-section-label studio-section-label--about" delay={0.04}>
          <span>（关于我们）</span>
          <ArrowRight size={13} />
        </Reveal>

        <div className="studio-grid">
          <Reveal className="metric-stack">
            {studioStats.map(([value, label]) => (
              <div className="metric-row" key={label}>
                <strong>{value}</strong>
                <span>{label}</span>
              </div>
            ))}
          </Reveal>

          <Reveal className="studio-object-card" delay={0.06}>
            <img className="studio-object-image" src={assetUrl("service-images/T-v2.jpg")} alt="TUQIN T 3D mark" />
            <p>Framer 专案需求即时库</p>
            <span>了解更多 →</span>
          </Reveal>

          <Reveal className="community-card" delay={0.1}>
            <CommunityGlobe />
          </Reveal>

          <Reveal className="creator-card" delay={0.12}>
            <div className="creator-photo">
              <div className="creator-photo__caption">
                <strong>tuqin</strong>
                <span>创办人/美术创意总监</span>
              </div>
            </div>
            <div id="about" className="creator-copy">
              <h3>创办人</h3>
              <p>
                TUQIN 以品牌策略、视觉运营、网页设计与动态内容为核心，帮助项目建立清晰、可复制、可持续运营的数字表达。
              </p>
              <p>
                我擅长把抽象的商业目标转译成明确的视觉系统，从品牌识别、页面结构到 AI 视频物料，让每一次发布都服务于长期增长。
              </p>
              <a href="#contact" data-cursor="media" data-cursor-label="联系我">
                与我合作
                <ArrowRight size={14} />
              </a>
            </div>
          </Reveal>

          <Reveal className="studio-side-card" delay={0.14}>
            <img className="studio-object-image studio-object-image--side" src={assetUrl("service-images/Q-v2.jpg")} alt="TUQIN Q 3D mark" />
            <p>深角度工作室专案</p>
            <span>了解更多 →</span>
          </Reveal>
        </div>

        <Reveal className="tool-dock">
          <div className="tool-dock__intro">
            <strong>每日工具箱</strong>
            <span>每个专案都用适合的工具流程。</span>
          </div>
          <div className="tool-dock__marquee" aria-label="日常工具">
            <div className="tool-dock__track">
              {[...toolLogos, ...toolLogos, ...toolLogos].map((tool, index) => (
                <span className="tool-logo" key={`${tool.name}-${index}`}>
                  <img src={tool.src} alt={tool.name} />
                </span>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Testimonials() {
  return (
    <section className="testimonial-shell">
      <Reveal className="testimonial-title">
        <span>VOICE</span>
        <h2>
          别只听我们说
          <i>*</i>
        </h2>
        <p>来自合作中的真实反馈。</p>
      </Reveal>
      <div className="testimonial-marquee">
        <div className="testimonial-marquee__track">
          {[...testimonials, ...testimonials].map((item, index) => (
            <article
              className="quote-card"
              key={`${item.name}-${index}`}
              style={{ "--quote-offset": `${item.offset}px` } as CSSProperties}
              data-cursor="media"
              data-cursor-label="查看评价"
            >
              <p>{item.quote}</p>
              <div className="quote-card__footer">
                <span
                  className="quote-card__avatar"
                  style={{ "--avatar-bg": item.avatarColor } as CSSProperties}
                  aria-hidden="true"
                >
                  {item.initials}
                </span>
                <div>
                  <strong>{item.name}</strong>
                  <span>{item.role}</span>
                </div>
              </div>
              <span className="quote-card__mark" aria-hidden="true">
                ”
              </span>
            </article>
          ))}
        </div>
      </div>
      <a className="testimonial-cta" href="#contact" data-cursor="media" data-cursor-label="联系我们">
        查看更多反馈
        <ArrowRight size={14} />
      </a>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="footer-shell">
      <div className="footer-hero">
        <div className="footer-topline">
          <strong>TUQIN Creative Co.</strong>
          <nav className="footer-link-groups" aria-label="Footer navigation">
            <div className="footer-link-group">
              <p>
                <strong>索引</strong>
              </p>
              <a href="#work">作品</a>
              <a href="#services">优势</a>
              <a href="#about">关于我</a>
            </div>
            <div className="footer-link-group">
              <p>
                <strong>条款与政策</strong>
              </p>
              <a href="#contact">授权协议</a>
              <a href="#contact">隐私政策</a>
            </div>
            <div className="footer-link-group">
              <p>
                <strong>联系方式</strong>
              </p>
              <a href="mailto:hello@tuqin.studio">邮件</a>
              <a href="#contact">微信</a>
              <a href="#contact">电话</a>
            </div>
          </nav>
        </div>
        <video className="footer-video" src={assetUrl("footer-video.mp4")} autoPlay loop muted playsInline />
        <div className="footer-bottomline">
          <span>© 2026 TUQIN</span>
          <a href="mailto:hello@tuqin.studio">
            <Mail size={15} />
            hello@tuqin.studio
          </a>
          <span>
            <ShoppingBag size={15} />
            Brand systems / Digital experiences / Motion content
          </span>
        </div>
      </div>
    </section>
  );
}

export default function App() {
  const [isContactTagOpen, setIsContactTagOpen] = useState(
    () => typeof window !== "undefined" && new URLSearchParams(window.location.search).has("contactTag")
  );

  const openContactTag = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    setIsContactTagOpen(true);
  };

  return (
    <>
      <Preloader />
      <CustomCursor />
      <ContactHangTag isOpen={isContactTagOpen} onClose={() => setIsContactTagOpen(false)} />
      <SiteNav onContactClick={openContactTag} />
      <main>
        <Hero onContactClick={openContactTag} />
        <FeaturedWork />
        <Services />
        <Testimonials />
        <Contact />
      </main>
    </>
  );
}
