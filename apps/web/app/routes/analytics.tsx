import { MetaFunction } from "@remix-run/node";
import { AppShell } from "~/components/layout/AppShell";
export const meta: MetaFunction = () => [{ title: "Analytics — Devonz" }];
const METRICS = [
  { label:"Page Views",  value:"48,291", delta:"+12.3%", up:true,  icon:"i-ph:eye-duotone"            },
  { label:"Unique Users",value:"3,841",  delta:"+8.1%",  up:true,  icon:"i-ph:users-duotone"          },
  { label:"AI Requests", value:"127K",   delta:"+31.5%", up:true,  icon:"i-ph:robot-duotone"          },
  { label:"Error Rate",  value:"0.21%",  delta:"-0.04%", up:false, icon:"i-ph:warning-circle-duotone" },
];
const TOP = [
  { page:"/",           views:"18,240", pct:38 },
  { page:"/editor",     views:"9,120",  pct:19 },
  { page:"/playground", views:"6,843",  pct:14 },
  { page:"/ai",         views:"5,760",  pct:12 },
  { page:"/dashboard",  views:"4,321",  pct:9  },
];
export default function AnalyticsPage() {
  const bars = [30,45,38,52,61,48,72,65,80,55,42,68,75,90,82,71,85,93,78,88,95,72,84,91,76,89,94,87,96,100];
  return (
    <AppShell>
      <div className="p-6 max-w-screen-xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div><h1 className="text-xl font-bold text-bolt-elements-textPrimary">Analytics</h1>
            <p className="text-sm text-bolt-elements-textSecondary">Usage metrics and performance insights</p></div>
          <div className="flex gap-1 p-1 rounded-lg border border-bolt-elements-borderColor bg-bolt-elements-background-depth-2">
            {["7d","30d","90d"].map(r=><button key={r} className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${r==="30d"?"bg-accent-500 text-white":"text-bolt-elements-textSecondary hover:text-bolt-elements-textPrimary"}`}>{r}</button>)}
          </div>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {METRICS.map(m=>(
            <div key={m.label} className="rounded-xl border border-bolt-elements-borderColor bg-bolt-elements-background-depth-2 p-4">
              <div className="flex items-center justify-between mb-2">
                <div className={`${m.icon} w-4 h-4 text-bolt-elements-textSecondary`}/>
                <span className={`text-xs font-medium ${m.up?"text-green-400":"text-red-400"}`}>{m.delta}</span>
              </div>
              <div className="text-2xl font-bold text-bolt-elements-textPrimary">{m.value}</div>
              <div className="text-xs text-bolt-elements-textSecondary mt-0.5">{m.label}</div>
            </div>
          ))}
        </div>
        <div className="rounded-xl border border-bolt-elements-borderColor bg-bolt-elements-background-depth-2 p-5">
          <h2 className="text-sm font-medium text-bolt-elements-textPrimary mb-4">Traffic — Last 30 days</h2>
          <div className="flex items-end gap-0.5 h-36">
            {bars.map((h,i)=><div key={i} style={{height:`${h}%`}} className="flex-1 rounded-t bg-accent-500/40 hover:bg-accent-500 transition-colors cursor-pointer"/>)}
          </div>
          <div className="flex justify-between text-xs text-bolt-elements-textSecondary mt-2">
            <span>Feb 15</span><span>Mar 1</span><span>Mar 15</span>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <div className="rounded-xl border border-bolt-elements-borderColor bg-bolt-elements-background-depth-2 overflow-hidden">
            <div className="px-4 py-3 border-b border-bolt-elements-borderColor"><span className="text-sm font-medium text-bolt-elements-textPrimary">Top Pages</span></div>
            <div className="p-4 space-y-3">
              {TOP.map(p=>(
                <div key={p.page}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-mono text-bolt-elements-textPrimary">{p.page}</span>
                    <span className="text-xs text-bolt-elements-textSecondary">{p.views}</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-bolt-elements-background-depth-3">
                    <div className="h-full rounded-full bg-accent-500" style={{width:`${p.pct}%`}}/>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-xl border border-bolt-elements-borderColor bg-bolt-elements-background-depth-2 overflow-hidden">
            <div className="px-4 py-3 border-b border-bolt-elements-borderColor"><span className="text-sm font-medium text-bolt-elements-textPrimary">Top Errors</span></div>
            <div className="p-3 space-y-2">
              {[{msg:"TypeError: Cannot read property of undefined",n:142},{msg:"404 Not Found: /api/models",n:89},{msg:"NetworkError: Failed to fetch",n:67},{msg:"RangeError: Maximum call stack exceeded",n:23}].map((e,i)=>(
                <div key={i} className="flex items-start gap-2 p-2 rounded-lg hover:bg-bolt-elements-item-backgroundActive transition-colors">
                  <div className="w-4 h-4 rounded-full bg-red-500/10 text-red-400 flex items-center justify-center text-xs shrink-0 mt-0.5 font-bold">!</div>
                  <div className="flex-1 min-w-0"><div className="text-xs font-mono text-bolt-elements-textPrimary truncate">{e.msg}</div></div>
                  <span className="text-xs text-bolt-elements-textSecondary shrink-0">{e.n}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
