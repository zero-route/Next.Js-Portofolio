export const socials = [
  { name: "GitHub", href: "https://github.com/zero-route", icon: "github" },
  { name: "GitLab", href: "https://gitlab.com/-/user_settings/profile", icon: "gitlab" },
  { name: "LinkedIn", href: "https://www.linkedin.com/in/dimas-aksa-oktapian-096541406", icon: "linkedin" },
  { name: "Telegram", href: "https://t.me/Tehpucuts", icon: "telegram" },
  { name: "Instagram", href: "https://www.instagram.com/uknown.9182/", icon: "instagram" },
  { name: "TikTok", href: "https://www.tiktok.com/@altera1975", icon: "tiktok" },
] as const;

export const rolesList = [
  "Website Developer",
  "Network Engineer",
  "Penetration Testing",
  "Full-Stack Developer",
  "Automation Engineer",
  "Robotic Engineer",
  "Electrical Engineer",
];

export const skillsTyping = [
  "HTML5", "CSS3", "Tailwind-CSS", "JavaScript", "TypeScript", "React",
  "Node.js", "PHP", "Laravel", "Ruby", "MongoDB", "PostgreSQL", "MySQL",
  "GitLab", "GitHub", "Python", "C++", "C", "Java", "VS-Code",
];

export const timelineProjects = [
  {
    type: "chart" as const,
    title: "GitHub Activity",
    desc: "Jumlah kontribusi saya di github, Berbasis data realtime dari akun zero-route.io.",
    img: "https://ghchart.rshah.org/39d353/zero-route",
  },
  {
    type: "image" as const,
    title: "Esp Robotic AI",
    desc: "Robot multi medan, dengan berbasis Esp32 dan AI terintegrasi.",
    img: "/asset/esp-robot.jpg",
  },
  {
    type: "image" as const,
    title: "AI Agent",
    desc: "AI Agent pribadi yang dibangun berdasarkan bahasa pemrograman Python dan library machine learning.",
    img: "/asset/pythonAI.jpg",
  },
  {
    type: "image" as const,
    title: "N8n AI Agent",
    desc: "AI Agent berbasis N8N untuk otomatisasi berbagai tugas sederhana.",
    img: "/asset/n8n.jpg",
  },
];

export const webProjects = [
  {
    title: "Eirp Calculator",
    desc: "Web khusus untuk kalkulasi keamanan & keandalan dalam pemilihan perangkat RF, dan menghindari estimasi perangkat jamming.",
    img: "/asset/eirp.jpg",
  },
  {
    title: "Kali Tools",
    desc: "Website untuk referensi tools, berdasarkan tools resmi di Kali Linux, dibuat sebagai panduan dan penjelasan singkat.",
    img: "/asset/kali.jpg",
  },
  {
    title: "Pmr Website",
    desc: "Project website untuk keperluan organisasi Palang Merah Remaja yang bermarkas di UPT SMKN 2 BARRU.",
    img: "/asset/pmr.jpg",
  },
];

export const tools = [
  { number: "01", name: "Visual Studio Code", desc: "Code editor populer buatan Microsoft untuk menulis dan mengedit skrip program (Python, JavaScript, HTML, dll.). Ringan, kaya fitur, dan memiliki ribuan ekstensi pendukung." },
  { number: "02", name: "SPCK Editor", desc: "Aplikasi code editor khusus perangkat seluler (Android/iOS). Memungkinkan pengembang menulis, mengedit, serta menjalankan kode JavaScript/Web langsung dari ponsel." },
  { number: "03", name: "Vercel", desc: "Platform cloud hosting yang dirancang untuk mendeploy website frontend dan aplikasi web (seperti Next.js atau React) secara otomatis langsung dari repository Git (GitHub/GitLab)." },
  { number: "04", name: "Termius SSH", desc: "Aplikasi SSH client modern dengan antarmuka yang rapi untuk meremote server (Linux/VPS) atau perangkat jaringan secara aman dari komputer maupun smartphone." },
  { number: "05", name: "Winbox", desc: "Aplikasi GUI (Graphical User Interface) buatan MikroTik untuk mengonfigurasi dan mengelola perangkat MikroTik RouterOS dengan mudah tanpa perlu mengetik perintah CLI secara manual." },
  { number: "06", name: "Cisco Packet Tracer", desc: "Software simulasi jaringan buatan Cisco untuk merancang, mengonfigurasi, dan mensimulasikan topologi jaringan (router, switch, server) sebelum diterapkan pada perangkat asli." },
  { number: "07", name: "NMAP (Network Mapper)", desc: "Tool command-line untuk memindai jaringan (network scanning). Digunakan untuk menemukan perangkat yang aktif, port yang terbuka, serta layanan/sistem operasi yang berjalan pada suatu target." },
  { number: "08", name: "Hydra (THC-Hydra)", desc: "Tool keamanan yang digunakan untuk pengujian serangan brute-force secara cepat. Berfungsi menebak username dan password pada berbagai protokol login (seperti SSH, FTP, HTTP, Telnet)." },
  { number: "09", name: "Metasploit Framework", desc: "Platform penetration testing komprehensif yang berisi ribuan exploit siap pakai. Digunakan oleh profesional keamanan untuk menguji, mengeksploitasi, dan membuktikan celah kerentanan pada suatu sistem." },
];

export const skillGroups = [
  {
    title: "Frontend",
    items: [
      { name: "HTML5", icon: "html5" }, { name: "CSS3", icon: "css3" },
      { name: "TailwindCSS", icon: "tailwind" }, { name: "SCSS", icon: "sass" },
      { name: "Bootstrap", icon: "bootstrap" }, { name: "JavaScript", icon: "javascript" },
      { name: "TypeScript", icon: "typescript" }, { name: "React", icon: "react" },
    ],
  },
  {
    title: "Backend",
    items: [
      { name: "Node.js", icon: "nodejs" }, { name: "PHP", icon: "php" }, { name: "Ruby", icon: "ruby" },
    ],
  },
  {
    title: "Database",
    items: [
      { name: "MongoDB", icon: "mongodb" }, { name: "MySQL", icon: "mysql" }, { name: "PostgreSQL", icon: "postgresql" },
    ],
  },
  {
    title: "Programming",
    items: [
      { name: "C", icon: "c" }, { name: "C++", icon: "cpp" }, { name: "Java", icon: "java" }, { name: "Python", icon: "python" },
    ],
  },
  {
    title: "GIT",
    items: [
      { name: "GIT", icon: "git" }, { name: "GitHub", icon: "github" }, { name: "GitLab", icon: "gitlab" },
      { name: "GitHubCodeSpace", icon: "codespaces" }, { name: "GitHubActions", icon: "actions" },
    ],
  },
  {
    title: "OS Installation",
    items: [
      { name: "Windows 10", icon: "windows" }, { name: "Windows 11", icon: "windows" },
      { name: "Arch Linux", icon: "archlinux" }, { name: "Artix Linux", icon: "linux" },
      { name: "Linux Mint", icon: "linuxmint" }, { name: "Kali Linux", icon: "kali" },
      { name: "Gentoo", icon: "gentoo" }, { name: "RedHat", icon: "redhat" },
    ],
  },
];
