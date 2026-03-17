import { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";
import { AppShell } from "~/components/layout/AppShell";
export const meta: MetaFunction = () => [{ title: "Editor — Devonz" }];
const FEATURES = [
  { icon:"i-ph:robot-duotone",            title:"AI Inline Completions", desc:"Cursor-style tab completions — GPT-4o, Claude 3.5, Gemini. Understands your full codebase context" },
  { icon:"i-ph:chat-circle-duotone",      title:"AI Chat Panel",         desc:"Ask about code, get refactors, generate tests, explain logic — all without leaving the editor" },
  { icon:"i-ph:users-three-duotone",      title:"Live Collaboration",    desc:"Real-time multiplayer editing with presence cursors, shared terminals, and live voice chat" },
  { icon:"i-ph:git-diff-duotone",         title:"Git & Diff View",       desc:"Stage, commit, push, create PRs, review diffs — fully integrated with GitHub & GitLab" },
  { icon:"i-ph:terminal-window-duotone",  title:"Integrated Terminal",   desc:"Full bash terminal via WebContainers — run npm, git, pytest, cargo, anything in-browser" },
  { icon:"i-ph:magnifying-glass-duotone", title:"Global Search",         desc:"Regex cross-file search with instant results, replace, and symbol navigation" },
  { icon:"i-ph:keyboard-duotone",         title:"Vim / Emacs Mode",      desc:"Full Vim motions, Emacs keybindings, or import any VS Code keymap file" },
  { icon:"i-ph:warning-duotone",          title:"AI Error Autofix",      desc:"Windsurfer-style error detection — AI explains and auto-fixes TypeScript, lint, and runtime errors" },
  { icon:"i-ph:test-tube-duotone",        title:"Inline Test Runner",    desc:"Run Jest, Vitest, pytest inline — results shown next to each test case as you type" },
  { icon:"i-ph:eye-duotone",              title:"AI Code Review",        desc:"AI reviews your diff before you commit — flags bugs, security issues, and style violations" },
  { icon:"i-ph:lightning-duotone",        title:"Instant Preview",       desc:"Live hot-reload preview pane side-by-side with your code for all web projects" },
  { icon:"i-ph:paint-brush-duotone",      title:"Custom Themes",         desc:"20+ built-in themes, import any VS Code theme, full CSS override support" },
];
export default function EditorPage() {
  return (
    <AppShell>
      <div className="p-6 max-w-screen-xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-bolt-elements-textPrimary">Online Editor</h1>
            <p className="text-sm text-bolt-elements-textSecondary">Full VS Code experience — running 100% in your browser</p>
          </div>
          <div className="flex gap-2">
            <Link to="/playground" className="flex items-center gap-2 px-4 py-2 rounded-lg border border-bolt-elements-borderColor text-sm text-bolt-elements-textSecondary hover:text-bolt-elements-textPrimary transition-colors">
              <div className="i-ph:play-circle-duotone w-4 h-4"/>Playground
            </Link>
            <a href="/devonz-editor" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 rounded-lg bg-accent-500 text-white text-sm font-medium hover:bg-accent-600 transition-colors">
              <div className="i-ph:arrow-square-out-duotone w-4 h-4"/>Launch Editor
            </a>
          </div>
        </div>
        <div className="rounded-2xl border border-bolt-elements-borderColor bg-bolt-elements-background-depth-2 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="p-8">
              <span className="text-xs font-semibold uppercase tracking-wider text-accent-400 bg-accent-500/10 px-2.5 py-1 rounded-full">Devonz Editor</span>
              <h2 className="mt-3 text-3xl font-bold text-bolt-elements-textPrimary leading-tight">Code smarter with<br/><span className="text-accent-500">AI at your side</span></h2>
              <p className="mt-3 text-sm text-bolt-elements-textSecondary leading-relaxed max-w-sm">Full VS Code in the browser. Inline AI completions, chat with your codebase, real-time collab, one-click deploy — no install required.</p>
              <div className="mt-5 flex gap-3 flex-wrap">
                <a href="/devonz-editor" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-accent-500 text-white text-sm font-semibold hover:bg-accent-600 transition-colors">
                  <div className="i-ph:code-duotone w-4 h-4"/>Open Editor
                </a>
                <Link to="/projects/new" className="flex items-center gap-2 px-5 py-2.5 rounded-lg border border-bolt-elements-borderColor text-sm text-bolt-elements-textSecondary hover:text-bolt-elements-textPrimary transition-colors">
                  <div className="i-ph:folder-plus-duotone w-4 h-4"/>New Project
                </Link>
              </div>
              <div className="mt-4 flex gap-4 flex-wrap text-xs text-bolt-elements-textSecondary">
                <span className="flex items-center gap-1"><div className="i-ph:check-circle w-3.5 h-3.5 text-green-400"/>No install</span>
                <span className="flex items-center gap-1"><div className="i-ph:check-circle w-3.5 h-3.5 text-green-400"/>Any device</span>
                <span className="flex items-center gap-1"><div className="i-ph:check-circle w-3.5 h-3.5 text-green-400"/>Desktop app too</span>
              </div>
            </div>
            <div className="hidden lg:block bg-bolt-elements-background-depth-1 border-l border-bolt-elements-borderColor overflow-hidden">
              <div className="flex items-center gap-2 px-4 py-3 border-b border-bolt-elements-borderColor bg-bolt-elements-background-depth-2">
                <div className="flex gap-1.5"><div className="w-3 h-3 rounded-full bg-red-500/60"/><div className="w-3 h-3 rounded-full bg-yellow-500/60"/><div className="w-3 h-3 rounded-full bg-green-500/60"/></div>
                <span className="text-xs text-bolt-elements-textSecondary ml-2 font-mono">app/routes/index.tsx</span>
                <span className="ml-auto text-xs text-accent-400 bg-accent-500/10 px-2 py-0.5 rounded">AI: 3 suggestions</span>
              </div>
              <pre className="p-5 text-xs font-mono leading-6 text-bolt-elements-textSecondary overflow-hidden select-none whitespace-pre-wrap">{`import { useState } from 'react'
import { DevonzAI } from '@devonz/ai'

// ✨ AI suggestion: add error boundary
export default function App() {
  const [prompt, setPrompt] = useState('')

  return (
    <DevonzAI
      prompt={prompt}
      onChange={setPrompt}
      model="gpt-4o"
    />
  )
}`}</pre>
            </div>
          </div>
        </div>
        <div>
          <h2 className="text-xs font-semibold uppercase tracking-wider text-bolt-elements-textSecondary mb-4">Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3">
            {FEATURES.map(f=>(
              <div key={f.title} className="p-4 rounded-xl border border-bolt-elements-borderColor bg-bolt-elements-background-depth-2 hover:border-accent-500/40 transition-colors">
                <div className={`${f.icon} w-6 h-6 text-accent-400 mb-2`}/>
                <div className="font-semibold text-bolt-elements-textPrimary text-sm mb-1">{f.title}</div>
                <div className="text-xs text-bolt-elements-textSecondary leading-relaxed">{f.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppShell>
  );
}
