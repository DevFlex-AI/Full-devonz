import { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";
import { AppShell } from "~/components/layout/AppShell";
export const meta: MetaFunction = () => [{ title: "Cloud — Devonz" }];
const SERVICES = [
  { title:"Functions",   desc:"Serverless edge functions — zero cold starts, global edge network",        icon:"i-ph:function-duotone",       href:"/cloud/functions",   stat:"12 active",  color:"text-blue-400"   },
  { title:"Storage",     desc:"S3-compatible object storage with CDN, signed URLs, lifecycle rules",      icon:"i-ph:hard-drives-duotone",    href:"/cloud/storage",     stat:"2.4 GB",     color:"text-green-400"  },
  { title:"Database",    desc:"PostgreSQL + real-time subscriptions, branching, auto-migrations",         icon:"i-ph:database-duotone",       href:"/cloud/database",    stat:"3 databases",color:"text-purple-400" },
  { title:"Secrets",     desc:"Encrypted env vars and API keys synced to all your deployments",          icon:"i-ph:lock-key-duotone",       href:"/cloud/secrets",     stat:"47 secrets", color:"text-orange-400" },
  { title:"Domains",     desc:"Custom domains with auto-SSL, wildcard certs, instant propagation",       icon:"i-ph:globe-duotone",          href:"/cloud/domains",     stat:"3 domains",  color:"text-cyan-400"   },
  { title:"Deployments", desc:"All builds with logs, previews, rollbacks, and promotion between envs",   icon:"i-ph:rocket-launch-duotone",  href:"/cloud/deployments", stat:"47 builds",  color:"text-pink-400"   },
  { title:"Logs",        desc:"Unified real-time log viewer across all services, functions, and builds", icon:"i-ph:article-duotone",        href:"/cloud/logs",        stat:"Live stream",color:"text-yellow-400" },
  { title:"Monitoring",  desc:"Uptime, p95 latency, error rate, apdex score, and custom metrics",        icon:"i-ph:activity-duotone",       href:"/cloud/monitoring",  stat:"99.97% up",  color:"text-green-400"  },
];
export default function CloudPage() {
  return (
    <AppShell>
      <div className="p-6 max-w-screen-xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div><h1 className="text-xl font-bold text-bolt-elements-textPrimary">Cloud Services</h1>
            <p className="text-sm text-bolt-elements-textSecondary">Full-stack infrastructure for every project</p></div>
          <div className="flex items-center gap-2 text-xs text-green-400 bg-green-500/10 px-3 py-1.5 rounded-full border border-green-500/20">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"/>All systems operational
          </div>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[{label:"Uptime",value:"99.97%",sub:"Last 90d",c:"text-green-400",bg:"bg-green-500/10"},{label:"Requests",value:"1.2M",sub:"This month",c:"text-blue-400",bg:"bg-blue-500/10"},{label:"Transfer",value:"48 GB",sub:"This month",c:"text-purple-400",bg:"bg-purple-500/10"},{label:"Functions",value:"89K",sub:"Invocations",c:"text-orange-400",bg:"bg-orange-500/10"}].map(s=>(
            <div key={s.label} className={`rounded-xl border border-bolt-elements-borderColor ${s.bg} p-4`}>
              <div className={`text-2xl font-bold ${s.c}`}>{s.value}</div>
              <div className="text-sm font-medium text-bolt-elements-textPrimary mt-0.5">{s.label}</div>
              <div className="text-xs text-bolt-elements-textSecondary">{s.sub}</div>
            </div>
          ))}
        </div>
        <div>
          <h2 className="text-xs font-semibold uppercase tracking-wider text-bolt-elements-textSecondary mb-3">Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3">
            {SERVICES.map(s=>(
              <Link key={s.title} to={s.href} className="group p-4 rounded-xl border border-bolt-elements-borderColor bg-bolt-elements-background-depth-2 hover:border-accent-500/50 transition-all">
                <div className={`${s.icon} w-7 h-7 text-bolt-elements-textSecondary mb-3 group-hover:text-accent-400 transition-colors`}/>
                <div className="font-semibold text-bolt-elements-textPrimary text-sm mb-1">{s.title}</div>
                <div className="text-xs text-bolt-elements-textSecondary mb-3 leading-relaxed">{s.desc}</div>
                <div className={`text-xs font-medium ${s.color}`}>{s.stat}</div>
              </Link>
            ))}
          </div>
        </div>
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-bolt-elements-textSecondary">Recent Deployments</h2>
            <Link to="/cloud/deployments" className="text-xs text-accent-500 hover:underline">View all →</Link>
          </div>
          <div className="rounded-xl border border-bolt-elements-borderColor bg-bolt-elements-background-depth-2 divide-y divide-bolt-elements-borderColor overflow-hidden">
            {[{project:"devonz-web",env:"production",ok:true,time:"2m ago",commit:"feat: add AI hub page"},{project:"api-gateway",env:"production",ok:true,time:"1h ago",commit:"fix: rate limiting"},{project:"mobile-app",env:"preview",ok:false,time:"3h ago",commit:"chore: update deps"}].map((d,i)=>(
              <div key={i} className="flex items-center gap-4 px-4 py-3 hover:bg-bolt-elements-item-backgroundActive transition-colors">
                <div className={`w-2 h-2 rounded-full shrink-0 ${d.ok?"bg-green-500":"bg-red-500"}`}/>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-bolt-elements-textPrimary">{d.project}</span>
                    <span className="text-xs px-1.5 py-0.5 rounded bg-bolt-elements-background-depth-3 text-bolt-elements-textSecondary">{d.env}</span>
                  </div>
                  <div className="text-xs text-bolt-elements-textSecondary font-mono truncate">{d.commit}</div>
                </div>
                <span className="text-xs text-bolt-elements-textSecondary shrink-0">{d.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppShell>
  );
}
