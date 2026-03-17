import { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";
import { AppShell } from "~/components/layout/AppShell";
export const meta: MetaFunction = () => [{ title: "Dashboard — Devonz" }];
const STATS = [
  { label:"Projects",    value:"12",    delta:"+2 this week",    icon:"i-ph:folder-duotone",        bg:"bg-blue-500/10",   c:"text-blue-400"   },
  { label:"AI Requests", value:"1,284", delta:"+18% vs last wk", icon:"i-ph:robot-duotone",         bg:"bg-purple-500/10", c:"text-purple-400" },
  { label:"Deployments", value:"47",    delta:"3 today",         icon:"i-ph:rocket-launch-duotone", bg:"bg-green-500/10",  c:"text-green-400"  },
  { label:"Team Members",value:"8",     delta:"2 online now",    icon:"i-ph:users-duotone",         bg:"bg-orange-500/10", c:"text-orange-400" },
];
const PROJECTS = [
  { id:"devonz-web",  name:"devonz-web",  lang:"TypeScript",   status:"Live",     updated:"2m ago"  },
  { id:"ai-dash",     name:"ai-dashboard",lang:"React",        status:"Building", updated:"15m ago" },
  { id:"api-gateway", name:"api-gateway", lang:"Node.js",      status:"Live",     updated:"1h ago"  },
  { id:"mobile-app",  name:"mobile-app",  lang:"React Native", status:"Draft",    updated:"3h ago"  },
];
const ACTIVITY = [
  { msg:"Deployed devonz-web to production",        time:"2m ago",  icon:"i-ph:rocket-launch-duotone", c:"text-green-400"  },
  { msg:"AI generated 47 lines in api-gateway",     time:"18m ago", icon:"i-ph:robot-duotone",         c:"text-purple-400" },
  { msg:"New team member joined: sarah@dev.io",     time:"1h ago",  icon:"i-ph:user-plus-duotone",     c:"text-blue-400"   },
  { msg:"Build failed: mobile-app (TypeError)",     time:"2h ago",  icon:"i-ph:warning-circle-duotone",c:"text-red-400"    },
  { msg:"Merged PR #42: Add dark mode support",     time:"3h ago",  icon:"i-ph:git-merge-duotone",     c:"text-accent-400" },
];
export default function DashboardPage() {
  return (
    <AppShell>
      <div className="p-6 max-w-screen-xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-bolt-elements-textPrimary">Good evening 👋</h1>
            <p className="text-sm text-bolt-elements-textSecondary mt-0.5">Here's what's happening with your projects.</p>
          </div>
          <Link to="/projects/new" className="flex items-center gap-2 px-4 py-2 rounded-lg bg-accent-500 text-white text-sm font-medium hover:bg-accent-600 transition-colors">
            <div className="i-ph:plus w-4 h-4"/>New Project
          </Link>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {STATS.map(s=>(
            <div key={s.label} className={`rounded-xl border border-bolt-elements-borderColor ${s.bg} p-4`}>
              <div className="flex items-start justify-between mb-3">
                <div className={`${s.icon} w-5 h-5 ${s.c}`}/>
                <span className="text-xs text-bolt-elements-textSecondary bg-bolt-elements-background-depth-3 px-2 py-0.5 rounded-full">{s.delta}</span>
              </div>
              <div className="text-2xl font-bold text-bolt-elements-textPrimary">{s.value}</div>
              <div className="text-xs text-bolt-elements-textSecondary mt-0.5">{s.label}</div>
            </div>
          ))}
        </div>
        <div>
          <h2 className="text-xs font-semibold uppercase tracking-wider text-bolt-elements-textSecondary mb-3">Quick Actions</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { label:"New Project",icon:"i-ph:plus-circle-duotone",      href:"/projects/new",      desc:"Blank or template"    },
              { label:"AI Chat",    icon:"i-ph:chat-circle-dots-duotone", href:"/ai/chat",           desc:"Build with AI"        },
              { label:"Editor",     icon:"i-ph:code-duotone",             href:"/editor",            desc:"Code in browser"      },
              { label:"Deploy",     icon:"i-ph:rocket-launch-duotone",    href:"/cloud/deployments", desc:"Push to production"   },
            ].map(a=>(
              <Link key={a.label} to={a.href} className="flex items-center gap-3 p-3 rounded-xl border border-bolt-elements-borderColor bg-bolt-elements-background-depth-2 hover:border-accent-500/60 transition-all">
                <div className={`${a.icon} w-7 h-7 text-accent-400 shrink-0`}/>
                <div className="min-w-0">
                  <div className="text-sm font-medium text-bolt-elements-textPrimary">{a.label}</div>
                  <div className="text-xs text-bolt-elements-textSecondary truncate">{a.desc}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          <div className="lg:col-span-2 rounded-xl border border-bolt-elements-borderColor bg-bolt-elements-background-depth-2 overflow-hidden">
            <div className="flex items-center justify-between px-4 py-3 border-b border-bolt-elements-borderColor">
              <span className="text-sm font-medium text-bolt-elements-textPrimary">Recent Projects</span>
              <Link to="/projects" className="text-xs text-accent-500 hover:underline">View all →</Link>
            </div>
            <div className="divide-y divide-bolt-elements-borderColor">
              {PROJECTS.map(p=>(
                <Link key={p.id} to={`/projects/${p.id}`} className="flex items-center gap-3 px-4 py-3 hover:bg-bolt-elements-item-backgroundActive transition-colors">
                  <div className="i-ph:folder-duotone w-8 h-8 text-bolt-elements-textSecondary"/>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-bolt-elements-textPrimary">{p.name}</div>
                    <div className="text-xs text-bolt-elements-textSecondary">{p.lang} · {p.updated}</div>
                  </div>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${p.status==="Live"?"bg-green-500/10 text-green-400":p.status==="Building"?"bg-yellow-500/10 text-yellow-400":"bg-bolt-elements-background-depth-3 text-bolt-elements-textSecondary"}`}>{p.status}</span>
                </Link>
              ))}
            </div>
          </div>
          <div className="rounded-xl border border-bolt-elements-borderColor bg-bolt-elements-background-depth-2 overflow-hidden">
            <div className="px-4 py-3 border-b border-bolt-elements-borderColor">
              <span className="text-sm font-medium text-bolt-elements-textPrimary">Activity</span>
            </div>
            <div className="p-3 space-y-3">
              {ACTIVITY.map((a,i)=>(
                <div key={i} className="flex gap-2.5 items-start">
                  <div className={`${a.icon} w-4 h-4 mt-0.5 shrink-0 ${a.c}`}/>
                  <div>
                    <p className="text-xs text-bolt-elements-textPrimary leading-relaxed">{a.msg}</p>
                    <p className="text-xs text-bolt-elements-textSecondary mt-0.5">{a.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
