# DesignAtlas - BETA

**Learn Design. Step by Step.**

Clear roadmaps for UX, UI and Product Designers. No login. No fluff. Clear learning paths.

## 🚀 Features

- **5 Comprehensive Roadmaps**
  - UX Designer
  - UI Designer
  - Product Designer
  - Design System
  - Design Thinking

- **Modern Design**
  - Gradient backgrounds
  - Glassmorphism effects
  - Smooth animations
  - Responsive layout (desktop-first)

- **No Barriers**
  - No login required
  - No tracking
  - Static site (fast & secure)

## 🛠️ Tech Stack

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first styling
- **Static Export** - Fast, deployable anywhere

## 📦 Getting Started

### Install dependencies:

```bash
npm install
```

### Run development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

### Build for production:

```bash
npm run build
```

The static site will be exported to the `out/` directory.

## 📁 Project Structure

```
designatlasbeta/
├── app/
│   ├── globals.css          # Global styles
│   ├── layout.tsx           # Root layout
│   ├── page.tsx             # Landing page
│   └── roadmap/
│       └── [slug]/
│           └── page.tsx     # Dynamic roadmap pages
├── public/                  # Static assets (if needed)
├── next.config.ts          # Next.js configuration
├── tailwind.config.ts      # Tailwind configuration
└── package.json
```

## 🎨 Roadmap Content

Each roadmap includes:

- Multiple learning sections
- Topics with descriptions
- External links to quality resources
- Visual progress indicators
- Responsive layout

## 🚢 Deployment

This is a static Next.js site that can be deployed to:

- **Vercel** (recommended)
- **Netlify**
- **GitHub Pages**
- Any static hosting provider

Simply run `npm run build` and deploy the `out/` folder.

## 📄 License

BETA Version - 2024

---

Built with ❤️ for designers learning their craft.
