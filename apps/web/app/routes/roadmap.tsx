import { MetaFunction } from "@remix-run/node";
import { AppShell } from "~/components/layout/AppShell";
export const meta: MetaFunction = () => [{ title: "Roadmap — Devonz" }];
const COLS = [
  { label:"✅ Shipped",        c:"text-green-400",  border:"border-green-500/20",  bg:"bg-green-500/5",   items:["AI inline completions (Cursor-style)","Vercel & Netlify deploy","GitHub & GitLab integration","MCP server support","WebContainers terminal","Real-time AI chat streaming","Collaborative editing beta"] },
  { label:"🚧 In Progress",    c:"text-blue-400",   border:"border-blue-500/20",   bg:"bg-blue-500/5",    items:["Desktop app (Windows/macOS/Linux)","AI Agents for autonomous tasks","Cloud functions & storage","Marketplace extensions","AI error autofix (Windsurfer-style)","Database branching"] },
  { label:"📋 Planned Q2 2026",c:"text-purple-400", border:"border-purple-500/20", bg:"bg-purple-500/5",  items:["Mobile app (iOS & Android)","Custom AI model fine-tuning","Multi-region edge deployment","Visual PR diff reviews","AI code review on commits","Plugin SDK public beta"] },
  { label:"🔭 Future H2 2026", c:"text-orange-400", border:"border-orange-500/20", bg:"bg-orange-500/5",  items:["Peer-to-peer code sharing","Voice coding interface","Integrated app store","AI architecture diagrams","AR/VR code visualization","Self-hosted enterprise edition"] },
];
export default function RoadmapPage() {
  return (
    <AppShell>
      <div className="p-6 max-w-screen-xl mx-auto space-y-6">
        <div className="text-center max-w-lg mx-auto">
          <h1 className="text-2xl font-bold text-bolt-elements-textPrimary">Roadmap</h1>
          <p className="text-sm text-bolt-elements-textSecondary mt-2">What we're building — and what's next. Updated weekly.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
          {COLS.map(col=>(
            <div key={col.label} className={`rounded-xl border ${col.border} ${col.bg} p-4`}>
              <div className={`text-xs font-bold uppercase tracking-wider ${col.c} mb-4`}>{col.label}</div>
              <div className="space-y-2">
                {col.items.map((item,i)=>(
                  <div key={i} className="flex items-start gap-2 p-2 rounded-lg bg-bolt-elements-background-depth-2/60 hover:bg-bolt-elements-background-depth-2 transition-colors cursor-pointer group">
                    <div className={`w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 ${col.c.replace("text-","bg-")}`}/>
                    <span className="text-xs text-bolt-elements-textSecondary group-hover:text-bolt-elements-textPrimary transition-colors leading-relaxed">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
