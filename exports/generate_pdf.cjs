const PDFDocument = require('/home/runner/workspace/.config/npm/node_global/lib/node_modules/pdfkit');
const fs = require('fs');

const doc = new PDFDocument({ margin: 50, size: 'A4' });
const out = fs.createWriteStream('/home/runner/workspace/exports/StudyBuddy_Tech_Details.pdf');
doc.pipe(out);

const purple = '#7C3AED';
const blue = '#3B82F6';
const dark = '#1e1b4b';
const gray = '#6b7280';
const textDark = '#374151';
const textBlack = '#111827';

function sectionHead(text) {
  doc.moveDown(0.8)
     .fontSize(13).fillColor(purple).font('Helvetica-Bold')
     .text(text)
     .moveDown(0.25)
     .moveTo(50, doc.y).lineTo(545, doc.y).strokeColor(purple).lineWidth(0.8).stroke()
     .moveDown(0.4);
}

function row(label, value, note) {
  doc.fontSize(9.5).fillColor(textBlack).font('Helvetica-Bold')
     .text(label + '   ', { continued: true });
  doc.fillColor(blue).font('Helvetica').text(value, { continued: !!note });
  if (note) doc.fillColor(gray).font('Helvetica-Oblique').text('   — ' + note);
  doc.moveDown(0.25);
}

function bullet(title, desc) {
  doc.fontSize(9.5).fillColor(textBlack).font('Helvetica-Bold')
     .text('• ' + title + ':   ', { continued: true });
  doc.fillColor(textDark).font('Helvetica').text(desc);
  doc.moveDown(0.2);
}

// ─── COVER PAGE ──────────────────────────────────────────────────────────────
doc.rect(0, 0, 595, 210).fill(dark);

doc.fontSize(32).fillColor('#a78bfa').font('Helvetica-Bold')
   .text('📚 StudyBuddy AI', 50, 65, { align: 'center' });

doc.fontSize(13).fillColor('#c7d2fe').font('Helvetica')
   .text('Complete Technology Stack & Feature Documentation', 50, 115, { align: 'center' });

doc.fontSize(10).fillColor('#818cf8')
   .text('React + Vite  •  Express.js  •  OpenAI GPT-4o mini  •  Replit Platform', 50, 145, { align: 'center' });

doc.fontSize(9).fillColor('#6366f1')
   .text('Generated: March 2026  |  Built on Replit', 50, 170, { align: 'center' });

doc.moveDown(3.5);

// ─── PROJECT OVERVIEW ────────────────────────────────────────────────────────
sectionHead('📋 Project Overview');
doc.fontSize(10).fillColor(textDark).font('Helvetica')
   .text(
     'StudyBuddy AI is a full-stack AI-powered study assistant web application with bilingual support (English + Hindi). It generates MCQ quizzes for any topic, provides AI-generated detailed explanations using OpenAI GPT-4o mini, includes an Exam Stress Help panel with breathing exercises and motivational quotes, a 7-Day AI Study Planner, and a premium dark purple/blue ExamEase-inspired UI theme.',
     { lineGap: 4 }
   );
doc.moveDown(0.4);

// ─── ARCHITECTURE ───────────────────────────────────────────────────────────
sectionHead('🏗️  Architecture');
row('Application Type:', 'Full-Stack Web Application', 'React SPA frontend + Express.js REST backend');
row('Monorepo Manager:', 'pnpm Workspaces', 'Multiple packages managed in single repo');
row('Frontend Location:', 'artifacts/studybuddy/', 'React + Vite Single Page Application');
row('Backend Location:', 'artifacts/api-server/', 'Express.js REST API server');
row('API Communication:', 'Vite Dev Proxy → localhost:8080', '/api/* requests forwarded from frontend to backend');
row('Package Name:', '@workspace/studybuddy (frontend), @workspace/api-server (backend)', '');

// ─── FRONTEND STACK ──────────────────────────────────────────────────────────
sectionHead('🖥️  Frontend Stack');
row('Framework:', 'React 18', 'Component-based UI library by Meta');
row('Build Tool:', 'Vite v7', 'Ultra-fast dev server, HMR, and production bundler');
row('Language:', 'TypeScript', 'Statically typed JavaScript');
row('Styling:', 'Tailwind CSS v4', 'Utility-first CSS framework');
row('Routing:', 'Wouter v3', 'Lightweight client-side routing (alternative to React Router)');
row('State Management:', 'React Hooks (useState, useEffect, useRef)', 'Built-in React state management');
row('Animations:', 'Framer Motion + CSS @keyframes', 'slide-up, fade-in, panel transitions');
row('Icons:', 'Lucide React + React Icons v5', 'SVG icon libraries');
row('Forms:', 'React Hook Form v7 + Zod', 'Performant forms with schema validation');
row('API Queries:', '@tanstack/react-query', 'Server-state management and data fetching');
row('Data Fetching:', 'Native fetch() API', 'Direct fetch calls for AI explanation endpoint');

// ─── UI COMPONENTS ──────────────────────────────────────────────────────────
sectionHead('🎨 UI Component Library — Radix UI Primitives');
doc.fontSize(9.5).fillColor(textDark).font('Helvetica')
   .text('All Radix UI components are unstyled, accessible primitives styled via Tailwind CSS:', { lineGap: 3 });
doc.moveDown(0.2);

const radixComponents = [
  'Accordion', 'Alert Dialog', 'Aspect Ratio', 'Avatar', 'Checkbox', 'Collapsible',
  'Context Menu', 'Dialog', 'Dropdown Menu', 'Hover Card', 'Label', 'Menubar',
  'Navigation Menu', 'Popover', 'Progress', 'Radio Group', 'Scroll Area', 'Select',
  'Separator', 'Slider', 'Slot', 'Switch', 'Tabs', 'Toast', 'Toggle', 'Toggle Group', 'Tooltip'
];

doc.fontSize(8.5).fillColor(purple).font('Helvetica')
   .text(radixComponents.map(c => '@radix-ui/react-' + c.toLowerCase().replace(/ /g, '-')).join('  •  '),
         { lineGap: 4 });
doc.moveDown(0.4);

row('Class Utilities:', 'clsx + tailwind-merge + class-variance-authority', 'Conditional & dynamic CSS class management');
row('Date Utilities:', 'date-fns + react-day-picker', 'Date formatting and calendar picker component');
row('Carousel:', 'Embla Carousel React', 'Touch-friendly, accessible carousel');
row('Charts:', 'Recharts v2', 'Composable charting library built on D3');
row('Notifications:', 'Sonner', 'Beautiful toast notifications');
row('OTP Input:', 'input-otp', 'One-time password input with styling');
row('Bottom Sheet:', 'Vaul', 'Mobile-first animated bottom drawer/sheet');
row('Command Palette:', 'cmdk', 'Accessible command palette (⌘K style)');
row('Theme Toggle:', 'next-themes', 'Dark/light/system theme switching');
row('Resizable Panels:', 'react-resizable-panels', 'Drag-to-resize panel layouts');

// ─── BACKEND STACK ──────────────────────────────────────────────────────────
sectionHead('⚙️  Backend Stack');
row('Runtime:', 'Node.js (ESM — ES Modules)', 'Server-side JavaScript with native ES module support');
row('Framework:', 'Express.js v5', 'Minimal and flexible Node.js HTTP framework');
row('Bundler:', 'esbuild + esbuild-plugin-pino', 'Extremely fast JS bundler; pino plugin for worker threads');
row('Logging:', 'Pino v9 + pino-http v10', 'High-performance structured JSON logger for HTTP requests');
row('CORS:', 'cors v2', 'Cross-Origin Resource Sharing middleware');
row('Cookie Parsing:', 'cookie-parser', 'HTTP cookie parsing middleware');
row('Database ORM:', 'Drizzle ORM', 'TypeScript-first, lightweight SQL ORM');
row('Shared Schemas:', '@workspace/api-zod', 'Shared Zod validation schemas (monorepo internal package)');
row('Database Client:', '@workspace/db', 'Shared database connection layer (monorepo internal package)');
row('Type Safety:', 'TypeScript + @types/express, @types/node, @types/cors', 'Full type safety on backend');

// ─── AI INTEGRATION ─────────────────────────────────────────────────────────
sectionHead('🤖 AI Integration — OpenAI via Replit Proxy');
row('AI Provider:', 'OpenAI', 'Industry-leading large language model provider');
row('Model Used:', 'gpt-4o-mini', 'Fast, cost-efficient model — ideal for educational content');
row('SDK:', 'openai v6.32.0', 'Official OpenAI Node.js SDK with TypeScript support');
row('Integration Method:', 'Replit AI Integrations Proxy', 'No user API key required — billed via Replit credits');
row('API Endpoint:', 'POST /api/explain', 'REST endpoint on Express backend');
row('Request Body:', '{ topic: string, lang: "en" | "hi" }', 'Topic name + selected language');
row('Response:', '{ explanation: string }', 'Formatted explanation with emoji headers, bullets, numbered steps');
row('Token Limit:', 'max_tokens: 1000 per request', 'Controls explanation length and cost');
row('English Prompt:', 'Structured system prompt', 'Definition → How it works → Key concepts → Examples → Real-life uses');
row('Hindi Prompt:', 'Devanagari-script system prompt', 'Same structure but in Hindi with Devanagari script');
row('Known Topics:', 'Photosynthesis, Algebra, Gravity, Computer', 'Served instantly from local hardcoded data');
row('Custom Topics:', 'Any text input by user', 'Triggers real-time OpenAI API call');
row('Env Var (Base URL):', 'AI_INTEGRATIONS_OPENAI_BASE_URL', 'Replit-managed proxy base URL');
row('Env Var (API Key):', 'AI_INTEGRATIONS_OPENAI_API_KEY', 'Replit-managed proxy key');

// ─── KEY FEATURES ──────────────────────────────────────────────────────────
sectionHead('✨ Key Features');
bullet('MCQ Quiz Generator', '10 multiple-choice questions per topic with answer reveal, score display, and retry option');
bullet('AI Explanations', 'Detailed structured explanations for ANY topic — generated by OpenAI in English or Hindi');
bullet('Bilingual Toggle (EN/HI)', 'Full UI text + quiz content + AI explanations switch between English and Hindi');
bullet('Language Toggle Position', 'Top-left corner button — switches entire app language instantly');
bullet('Exam Stress Help Panel', 'Right-side panel with breathing exercise animation, motivation quotes, study tips');
bullet('Stress Panel Behavior', 'Toggle button hides when panel opens; body scroll locked; full-height with own scroll');
bullet('7-Day Study Planner', 'Floating bottom-right button; bottom-sheet modal; input subjects → generate 7-day schedule');
bullet('Study Plan Full-Screen', 'Plan result opens in full-screen overlay (z-index 60) with individual day cards');
bullet('Dark Purple/Blue Theme', 'ExamEase-style gradient — indigo/violet/purple palette throughout');
bullet('Scroll Lock', 'document.body.style.overflow = "hidden" when any panel is open');
bullet('Smooth Animations', 'CSS @keyframes slideUp for bottom sheet; Framer Motion for panels');
bullet('Auto-scroll', 'Explanation and quiz sections scroll into view automatically after generation');
bullet('Pre-wrap Rendering', 'Explanation text rendered with style={{ whiteSpace: "pre-wrap" }} for proper formatting');

// ─── ENVIRONMENT VARIABLES ──────────────────────────────────────────────────
sectionHead('🔐 Environment Variables');
row('PORT', 'Auto-assigned by Replit per artifact', 'Unique port for each workflow/artifact');
row('BASE_PATH', 'Auto-assigned by Replit', 'URL base path for Vite (e.g., /studybuddy)');
row('NODE_ENV', '"development" or "production"', 'Controls dev vs production behavior');
row('AI_INTEGRATIONS_OPENAI_BASE_URL', 'Replit proxy endpoint URL', 'OpenAI-compatible base URL via Replit integration');
row('AI_INTEGRATIONS_OPENAI_API_KEY', 'Replit-managed key', 'Set automatically — no manual API key setup needed');
row('REPL_ID', 'Replit workspace ID', 'Used for Cartographer and dev banner Vite plugins');

// ─── MONOREPO PACKAGES ──────────────────────────────────────────────────────
sectionHead('📦 Monorepo Workspace Packages');
row('@workspace/studybuddy', 'Frontend React app', 'artifacts/studybuddy/');
row('@workspace/api-server', 'Backend Express.js API', 'artifacts/api-server/');
row('@workspace/api-zod', 'Shared Zod validation schemas', 'Shared between frontend and backend');
row('@workspace/db', 'Shared Drizzle ORM database layer', 'PostgreSQL connection utilities');
row('@workspace/api-client-react', 'Typed React API client hooks', 'Generated API client used in frontend');
row('@workspace/mockup-sandbox', 'Component preview Vite server', 'Used for canvas UI prototyping');

// ─── REPLIT PLATFORM ────────────────────────────────────────────────────────
sectionHead('🔁 Replit Platform Specifics');
row('Workflows:', '3 workflows configured', 'studybuddy (web), api-server (API), mockup-sandbox (design)');
row('Vite Proxy:', '/api/* → http://localhost:8080', 'Dev proxy routes API calls to Express backend');
row('Allowed Hosts:', 'allowedHosts: true in vite.config.ts', 'Required for Replit iframe preview to work');
row('Replit Vite Plugins:', '@replit/vite-plugin-cartographer', 'File browser integration in Replit workspace');
row('', '@replit/vite-plugin-dev-banner', 'Dev environment banner');
row('', '@replit/vite-plugin-runtime-error-modal', 'Overlay for runtime errors in dev');
row('Deployment:', 'Replit Deploy (.replit.app domain)', 'One-click cloud hosting');
row('Checkpoints:', 'Automatic git commits by Replit Agent', 'Saves state at every milestone');
row('Database:', 'Replit PostgreSQL (built-in)', 'Managed PostgreSQL instance');

// ─── FOOTER ─────────────────────────────────────────────────────────────────
doc.moveDown(1.5);
doc.moveTo(50, doc.y).lineTo(545, doc.y).strokeColor('#d1d5db').lineWidth(0.5).stroke();
doc.moveDown(0.5);
doc.fontSize(8.5).fillColor(gray).font('Helvetica')
   .text(
     'Generated by Replit Agent  •  StudyBuddy AI  •  March 2026  •  All packages are open-source unless noted',
     { align: 'center' }
   );

doc.end();
out.on('finish', () => console.log('PDF created successfully at exports/StudyBuddy_Tech_Details.pdf'));
out.on('error', (err) => console.error('Error:', err));
