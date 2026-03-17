import { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";
import { useState } from "react";
import { AppShell } from "~/components/layout/AppShell";
export const meta: MetaFunction = () => [{ title: "Projects — Devonz" }];
const ALL = [
  { id:"devonz-web",    name:"devonz-web",    desc:"Main web platform",          lang:"TypeScript",   status:"Live",     stars:42, updated:"2m ago"  },
  { id:"ai-dashboard",  name:"ai-dashboard",  desc:"Analytics with AI insights", lang:"React",        status:"Building", stars:18, updated:"15m ago" },
  { id:"api-gateway",   name:"api-gateway",   desc:"REST + GraphQL API gateway", lang:"Node.js",      status:"Live",     stars:35, updated:"1h ago"  },
  { id:"mobile-app",    name:"mobile-app",    desc:"Cross-platform mobile app",  lang:"React Native", status:"Draft",    stars:7,  updated:"3h ago"  },
  { id:"design-system", name:"design-system", desc:"Shared component library",   lang:"TypeScript",   status:"Live",     stars:29, updated:"1d ago"  },
  { id:"docs-site",     name:"docs-site",     desc:"Documentation website",      lang:"MDX",          status:"Live",     stars:11, updated:"2d ago"  },
];
export default function ProjectsPage() {
  const [filter, setFilter] = useState("All");
  const [q, setQ] = useState("");
  const list = ALL.filter(p=>(filter==="All"||p.status===filter)&&(p.name.toLowerCase().includes(q.toLowerCase())||p.desc.toLowerCase().includes(q.toLowerCase())));
  return (
    <AppShell>
      <div className="p-6 max-w-screen-xl mx-auto space-y-5">
        <div className="flex items-center justify-between">
          <div><h1 className="text-xl font-bold text-bolt-elements-textPrimary">Projects</h1>
            <p className="text-sm text-bolt-elements-textSecondary">All your repositories and workspaces</p></div>
          <Link to="/projects/new" className="flex items-center gap-2 px-4 py-2 rounded-lg bg-accent-500 text-white text-sm font-medium hover:bg-accent-600 transition-colors">
            <div className="i-ph:plus w-4 h-4"/>New Project</Link>
        </div>
        <div className="flex gap-3 flex-wrap">
          <div className="relative flex-1 min-w-40">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 i-ph:magnifying-glass w-4 h-4 text-bolt-elements-textSecondary"/>
            <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search projects…" className="w-full pl-9 pr-3 py-2 rounded-lg border border-bolt-elements-borderColor bg-bolt-elements-background-depth-2 text-sm text-bolt-elements-textPrimary placeholder:text-bolt-elements-textSecondary focus:outline-none focus:border-accent-500"/>
          </div>
          <div className="flex gap-1 p-1 rounded-lg border border-bolt-elements-borderColor bg-bolt-elements-background-depth-2">
            {["All","Live","Building","Draft"].map(f=>(
              <button key={f} onClick={()=>setFilter(f)} className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${filter===f?"bg-accent-500 text-white":"text-bolt-elements-textSecondary hover:text-bolt-elements-textPrimary"}`}>{f}</button>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {list.map(p=>(
            <div key={p.id} className="group rounded-xl border border-bolt-elements-borderColor bg-bolt-elements-background-depth-2 p-4 hover:border-accent-500/50 transition-colors">
              <div className="flex items-start justify-between mb-3">
                <div><Link to={`/projects/${p.id}`} className="font-medium text-bolt-elements-textPrimary hover:text-accent-500 transition-colors">{p.name}</Link>
                  <p className="text-xs text-bolt-elements-textSecondary mt-0.5">{p.desc}</p></div>
                <span className={`shrink-0 text-xs px-2 py-0.5 rounded-full font-medium ml-2 ${p.status==="Live"?"bg-green-500/10 text-green-400":p.status==="Building"?"bg-yellow-500/10 text-yellow-400":"bg-bolt-elements-background-depth-3 text-bolt-elements-textSecondary"}`}>{p.status}</span>
              </div>
              <div className="flex items-center gap-4 text-xs text-bolt-elements-textSecondary">
                <span className="flex items-center gap-1"><div className="i-ph:circle-fill w-2 h-2 text-blue-400"/>{p.lang}</span>
                <span className="flex items-center gap-1"><div className="i-ph:star w-3 h-3"/>{p.stars}</span>
                <span className="ml-auto">{p.updated}</span>
              </div>
              <div className="flex gap-2 mt-3 opacity-0 group-hover:opacity-100 transition-opacity">
                <Link to={`/projects/${p.id}/editor`} className="flex-1 text-center text-xs py-1.5 rounded-md bg-bolt-elements-item-backgroundAccent text-bolt-elements-item-contentAccent hover:opacity-90">Open Editor</Link>
                <Link to={`/projects/${p.id}/deploy`} className="flex-1 text-center text-xs py-1.5 rounded-md border border-bolt-elements-borderColor text-bolt-elements-textSecondary hover:text-bolt-elements-textPrimary transition-colors">Deploy</Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
