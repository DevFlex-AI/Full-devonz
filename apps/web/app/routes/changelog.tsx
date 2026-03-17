import { MetaFunction } from "@remix-run/node";
import { AppShell } from "~/components/layout/AppShell";
export const meta: MetaFunction = () => [{ title: "Changelog — Devonz" }];
const REL = [
  { v:"1.4.0", date:"March 15, 2026", type:"major", title:"AI Hub & Desktop Builds", changes:[
    { t:"new",     s:"AI Hub — model comparison, prompt library, agent management" },
    { t:"new",     s:"Desktop builds: macOS Intel + ARM, Windows, Linux via GitHub Actions" },
    { t:"new",     s:"15 new pages: Dashboard, Cloud, Team, Marketplace, Analytics, Pipelines, Docs, Roadmap, Changelog, Status, Profile, Account, Templates, Snippets, Onboarding" },
    { t:"improve", s:"50% faster AI response streaming with improved token chunking" },
    { t:"fix",     s:"Fixed TypeScript errors in devonzBridgeService.ts imports" },
    { t:"fix",     s:"GitHub Actions workflow now runs buildreact before compile" },
  ]},
  { v:"1.3.0", date:"March 1, 2026", type:"minor", title:"Cloud & Pipelines", changes:[
    { t:"new",     s:"Cloud service overview: functions, storage, database, secrets, domains" },
    { t:"new",     s:"CI/CD Pipeline viewer with stage visualization and re-run support" },
    { t:"new",     s:"Team management with RBAC — Owner, Admin, Developer, Viewer roles" },
    { t:"improve", s:"Deployment logs now stream in real-time via SSE" },
    { t:"fix",     s:"Fixed Netlify token refresh race condition" },
  ]},
  { v:"1.2.0", date:"Feb 14, 2026", type:"minor", title:"Marketplace & Snippets", changes:[
    { t:"new",     s:"Marketplace for 12+ extensions, themes, and MCP servers" },
    { t:"new",     s:"Snippet library with search, tag filtering, one-click copy" },
    { t:"new",     s:"Real-time collaborative editing with live presence cursors" },
    { t:"improve", s:"Editor performance improvements for files over 10K lines" },
  ]},
];
const TC: Record<string,string> = { new:"bg-green-500/10 text-green-400", improve:"bg-blue-500/10 text-blue-400", fix:"bg-orange-500/10 text-orange-400" };
export default function ChangelogPage() {
  return (
    <AppShell>
      <div className="p-6 max-w-3xl mx-auto space-y-8">
        <div><h1 className="text-xl font-bold text-bolt-elements-textPrimary">Changelog</h1>
          <p className="text-sm text-bolt-elements-textSecondary">New features, improvements, and bug fixes</p></div>
        {REL.map(r=>(
          <div key={r.v} className="relative pl-6">
            <div className="absolute left-0 top-2 w-3 h-3 rounded-full border-2 border-accent-500 bg-bolt-elements-background-depth-1"/>
            <div className="absolute left-1.5 top-5 bottom-0 w-px bg-bolt-elements-borderColor"/>
            <div className="mb-3">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-lg font-bold text-bolt-elements-textPrimary">v{r.v}</span>
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${r.type==="major"?"bg-accent-500/10 text-accent-400":"bg-bolt-elements-background-depth-3 text-bolt-elements-textSecondary"}`}>{r.type}</span>
                <span className="text-sm text-bolt-elements-textSecondary">{r.date}</span>
              </div>
              <h2 className="font-semibold text-bolt-elements-textPrimary mt-0.5">{r.title}</h2>
            </div>
            <div className="rounded-xl border border-bolt-elements-borderColor bg-bolt-elements-background-depth-2 p-4 space-y-2">
              {r.changes.map((c,i)=>(
                <div key={i} className="flex items-start gap-2">
                  <span className={`text-xs px-1.5 py-0.5 rounded font-medium shrink-0 mt-0.5 ${TC[c.t]||""}`}>{c.t}</span>
                  <span className="text-sm text-bolt-elements-textSecondary leading-relaxed">{c.s}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </AppShell>
  );
}
