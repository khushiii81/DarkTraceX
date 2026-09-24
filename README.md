# DarkTraceX 🔴

> **Interactive Malware Mechanics & Attack Vector Simulator**  
> An educational platform for cybersecurity students and analysts.

[![Next.js](https://img.shields.io/badge/Next.js-14-black?logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)](https://www.typescriptlang.org)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-11-purple?logo=framer)](https://www.framer.com/motion)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-cyan?logo=tailwindcss)](https://tailwindcss.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-red)](LICENSE)

---

## ⚠️ Educational Disclaimer

**DarkTraceX contains NO real malware.** All simulations are educational JavaScript animations that demonstrate concepts. No actual system calls, network requests to malicious infrastructure, or file system modifications are made.

---

## 🚀 Features

| Module | Topic | Key Concepts |
|--------|-------|--------------|
| 01 | Virus vs. Worm Network Map | Canvas animation, propagation comparison |
| 02 | PE Structure Inspector | DOS Header, File Header, Optional Header, Sections |
| 03 | Hash & Static Analyzer | MD5/SHA-1/SHA-256 visualization, string extraction |
| 04 | Packer & Obfuscation Sandbox | UPX compression, entropy analysis |
| 05 | Dynamic Behavior Tracker | Process/file/registry/network timeline |
| 06 | Memory & Process Injection | VirtualAllocEx, WriteProcessMemory, CreateRemoteThread |
| 07 | WannaCry Ransomware Simulator | Encryption spread, payload execution, ransom overlay |
| 08 | Stuxnet ICS/SCADA Sabotage | SCADA spoofing, PLC manipulation, centrifuge damage |
| 09 | Pegasus Zero-Click Spyware | Mobile exploitation, stealth delivery, exfiltration |

---

## 🛠️ Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript 5
- **Styling:** Tailwind CSS v3 + Custom CSS (Inferno Red theme)
- **Animation:** Framer Motion 11 (spring physics)
- **Graphics:** HTML5 Canvas API
- **Fonts:** JetBrains Mono (monospace), Inter (UI)
- **Deployment:** Vercel

---

## 📁 Project Structure

```
darktracex/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout, fonts, metadata, JSON-LD
│   │   ├── globals.css         # Inferno Red theme, animations, utilities
│   │   ├── page.tsx            # Homepage with canvas hero + module grid
│   │   ├── dashboard/
│   │   │   └── page.tsx        # Module selector dashboard
│   │   ├── module/
│   │   │   ├── 1/page.tsx      # Virus vs. Worm simulation
│   │   │   ├── 2/page.tsx      # PE Structure Inspector ★
│   │   │   ├── 3/page.tsx      # Hash & String Analyzer
│   │   │   ├── 4/page.tsx      # Packer Sandbox
│   │   │   ├── 5/page.tsx      # Dynamic Behavior Tracker
│   │   │   ├── 6/page.tsx      # Process Injection Lab
│   │   │   ├── 7/page.tsx      # WannaCry Ransomware Simulator
│   │   │   ├── 8/page.tsx      # Stuxnet ICS/SCADA Sabotage
│   │   │   └── 9/page.tsx      # Pegasus Zero-Click Spyware
│   │   ├── about/page.tsx
│   │   ├── contact/page.tsx
│   │   └── not-found.tsx       # Custom 404 "System Breached"
│   ├── components/
│   │   └── layout/
│   │       ├── Navbar.tsx
│   │       └── Footer.tsx
│   └── lib/
│       └── utils.ts
├── public/
│   ├── robots.txt
│   └── sitemap.xml
├── next.config.js              # CSP + security headers
├── vercel.json                 # Deployment config
├── SECURITY.md
└── README.md
```

---

## 🔧 Getting Started

### Prerequisites

- Node.js 18+
- npm 9+

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/darktracex.git
cd darktracex

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### Production Build

```bash
npm run build
npm start
```

---

## 🌐 Deployment (Vercel)

### One-click Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/darktracex)

### Manual Deploy

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

### Custom Domain

1. Go to your Vercel project settings
2. Navigate to **Domains**
3. Add your custom domain (e.g., `darktracex.com`)
4. Update DNS records as instructed

---

## 🔒 Security

See [SECURITY.md](SECURITY.md) for our security policy and vulnerability reporting process.

Key security measures:
- Strict Content Security Policy (CSP)
- `X-Frame-Options: DENY`
- `X-Content-Type-Options: nosniff`
- HSTS with preload
- Input sanitization on all forms
- No external script injection

---

## 📄 License

This project is licensed under the **MIT License** — see [LICENSE](LICENSE) for details.

---

## 🙏 Acknowledgments

- [SANS Institute](https://www.sans.org) — Malware analysis methodology
- [Practical Malware Analysis](https://nostarch.com/malware) — Sikorski & Honig
- [PE Format Documentation](https://docs.microsoft.com/en-us/windows/win32/debug/pe-format) — Microsoft
