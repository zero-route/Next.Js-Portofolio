import {
  FaGithub, FaGitlab, FaLinkedinIn, FaTelegram, FaInstagram, FaTiktok,
  FaWindows, FaJava, FaCode, FaMusic, FaBrain, FaRobot,
  FaDownload, FaMugHot, FaEnvelope, FaLocationDot, FaArrowUpRightFromSquare,
  FaMagnifyingGlass, FaXmark, FaPaperPlane, FaStar, FaTrophy, FaRotateRight,
  FaBackwardStep, FaForwardStep, FaChevronDown, FaVolumeLow, FaFlagCheckered,
  FaArrowRight, FaCompactDisc, FaPlay, FaPause,
} from "react-icons/fa6";
import {
  SiHtml5, SiCss, SiTailwindcss, SiSass, SiBootstrap, SiJavascript,
  SiTypescript, SiReact, SiNodedotjs, SiPhp, SiRuby, SiMongodb, SiMysql,
  SiPostgresql, SiC, SiCplusplus, SiPython, SiGit, SiGithub, SiGitlab,
  SiGithubactions, SiArchlinux, SiArtixlinux, SiLinuxmint, SiKalilinux,
  SiGentoo, SiRedhat,
} from "react-icons/si";
import type { IconType } from "react-icons";

export const ICONS: Record<string, IconType> = {
  github: FaGithub,
  gitlab: FaGitlab,
  linkedin: FaLinkedinIn,
  telegram: FaTelegram,
  instagram: FaInstagram,
  tiktok: FaTiktok,
  music: FaMusic,
  brain: FaBrain,
  robot: FaRobot,
  download: FaDownload,
  coffee: FaMugHot,
  code: FaCode,
  envelope: FaEnvelope,
  location: FaLocationDot,
  external: FaArrowUpRightFromSquare,
  search: FaMagnifyingGlass,
  xmark: FaXmark,
  send: FaPaperPlane,
  star: FaStar,
  trophy: FaTrophy,
  retry: FaRotateRight,
  prev: FaBackwardStep,
  next: FaForwardStep,
  chevronDown: FaChevronDown,
  volume: FaVolumeLow,
  flag: FaFlagCheckered,
  arrowRight: FaArrowRight,
  disc: FaCompactDisc,
  play: FaPlay,
  pause: FaPause,

  html5: SiHtml5,
  css3: SiCss,
  tailwind: SiTailwindcss,
  sass: SiSass,
  bootstrap: SiBootstrap,
  javascript: SiJavascript,
  typescript: SiTypescript,
  react: SiReact,
  nodejs: SiNodedotjs,
  php: SiPhp,
  ruby: SiRuby,
  mongodb: SiMongodb,
  mysql: SiMysql,
  postgresql: SiPostgresql,
  c: SiC,
  cpp: SiCplusplus,
  java: FaJava,
  python: SiPython,
  git: SiGit,
  codespaces: FaCode,
  actions: SiGithubactions,
  windows: FaWindows,
  archlinux: SiArchlinux,
  linux: SiArtixlinux,
  linuxmint: SiLinuxmint,
  kali: SiKalilinux,
  gentoo: SiGentoo,
  redhat: SiRedhat,
};

// alias khusus supaya `github`/`gitlab` di skill grid pakai versi Simple Icons (lebih mirip devicon "colored")
export const SKILL_ICONS: Record<string, IconType> = {
  ...ICONS,
  github: SiGithub,
  gitlab: SiGitlab,
};

export function Icon({
  name,
  className,
  fromSkillSet = false,
}: {
  name: string;
  className?: string;
  fromSkillSet?: boolean;
}) {
  const set = fromSkillSet ? SKILL_ICONS : ICONS;
  const Cmp = set[name] ?? FaCode;
  return <Cmp className={className} aria-hidden="true" />;
}
