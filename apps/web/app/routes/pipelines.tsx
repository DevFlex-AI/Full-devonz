import { MetaFunction } from "@remix-run/node";
import { AppShell } from "~/components/layout/AppShell";
export const meta: MetaFunction = () => [{ title: "Pipelines — Devonz" }];
const PIPES = [
  { name:"devonz-web CI",    project:"devonz-web",  status:"passing", branch:"main",           duration:"3m 42s", time:"2m ago"  },
  { name:"api-gateway Tests",project:"api-gateway", status:"passing", branch:"main",           duration:"1m 18s", time:"1h ago"  },
  { name:"mobile-app Build", project:"mobile-app",  status:"failed",  branch:"feat/dark-mode", duration:"7m 03s", time:"3h ago"  },
  { name:"desktop Release",  project:"desktop",     status:"running", branch:"desktop/v1.0.0", duration:"…",      time:"12m ago" },
];
const STAGES = ["Checkout","Install","Lint","Test","Build","Deploy"];
export default function PipelinesPage() {
  return (
    <AppShell>
      <div className="p-6 max-w-screen-xl mx-auto space-y-5">
        <div className="flex items-center justify-between">
          <div><h1 className="text-xl font-bold text-bolt-elements-textPrimary">Pipelines</h1>
            <p className="text-sm text-bolt-elements-textSecondary">CI/CD workflows for all your projects</p></div>
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-accent-500 text-white text-sm font-medium hover:bg-accent-600 transition-colors">
            <div className="i-ph:plus w-4 h-4"/>New Pipeline</button>
        </div>
        <div className="rounded-xl border border-bolt-elements-borderColor bg-bolt-elements-background-depth-2 divide-y divide-bolt-elements-borderColor overflow-hidden">
          {PIPES.map(p=>(
            <div key={p.name} className="px-4 py-4 hover:bg-bolt-elements-item-backgroundActive transition-colors">
              <div className="flex items-center gap-3 mb-3">
                <div className={`w-3 h-3 rounded-full shrink-0 ${p.status==="passing"?"bg-green-500":p.status==="failed"?"bg-red-500":"bg-yellow-500 animate-pulse"}`}/>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-bolt-elements-textPrimary">{p.name}</span>
                    <span className="text-xs px-2 py-0.5 rounded bg-bolt-elements-background-depth-3 text-bolt-elements-textSecondary">{p.project}</span>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-bolt-elements-textSecondary mt-0.5">
                    <span className="flex items-center gap-1"><div className="i-ph:git-branch w-3 h-3"/>{p.branch}</span>
                    <span className="flex items-center gap-1"><div className="i-ph:clock w-3 h-3"/>{p.duration}</span>
                    <span>{p.time}</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="text-xs px-3 py-1.5 rounded-lg border border-bolt-elements-borderColor text-bolt-elements-textSecondary hover:text-bolt-elements-textPrimary transition-colors">Logs</button>
                  <button className="text-xs px-3 py-1.5 rounded-lg bg-bolt-elements-item-backgroundAccent text-bolt-elements-item-contentAccent hover:opacity-90">Re-run</button>
                </div>
              </div>
              <div className="flex items-center gap-1 ml-6 overflow-x-auto pb-1">
                {STAGES.map((s,i)=>(
                  <div key={s} className="flex items-center shrink-0">
                    <span className={`text-xs px-2 py-1 rounded font-medium whitespace-nowrap ${
                      p.status==="running"&&i===3?"bg-yellow-500/10 text-yellow-400 animate-pulse":
                      p.status==="failed"&&i===3?"bg-red-500/10 text-red-400":
                      i<(p.status==="passing"?6:p.status==="failed"?3:2)?"bg-green-500/10 text-green-400":
                      "bg-bolt-elements-background-depth-3 text-bolt-elements-textSecondary"}`}>{s}</span>
                    {i<STAGES.length-1&&<div className="w-3 h-px bg-bolt-elements-borderColor mx-0.5"/>}
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
