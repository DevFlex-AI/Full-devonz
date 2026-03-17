import { MetaFunction } from "@remix-run/node";
import { AppShell } from "~/components/layout/AppShell";
export const meta: MetaFunction = () => [{ title: "Status — Devonz" }];
const SVCS = [
  { name:"API Gateway",         latency:"42ms",  status:"operational" },
  { name:"Web App",             latency:"89ms",  status:"operational" },
  { name:"AI Inference (GPT-4o)",latency:"1.2s", status:"operational" },
  { name:"WebContainers",       latency:"234ms", status:"operational" },
  { name:"PostgreSQL Database", latency:"8ms",   status:"operational" },
  { name:"Storage CDN",         latency:"31ms",  status:"operational" },
  { name:"GitHub Integration",  latency:"180ms", status:"operational" },
  { name:"Desktop Update Srv",  latency:"55ms",  status:"operational" },
];
const HIST = Array.from({length:90},(_,i)=>i===15||i===44?"incident":i===23?"degraded":"operational");
export default function StatusPage() {
  return (
    <AppShell>
      <div className="p-6 max-w-3xl mx-auto space-y-6">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-sm font-medium mb-3">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"/>All Systems Operational
          </div>
          <h1 className="text-2xl font-bold text-bolt-elements-textPrimary">Devonz Status</h1>
          <p className="text-sm text-bolt-elements-textSecondary mt-1">Updated in real-time · All times UTC</p>
        </div>
        <div className="rounded-xl border border-bolt-elements-borderColor bg-bolt-elements-background-depth-2 overflow-hidden divide-y divide-bolt-elements-borderColor">
          {SVCS.map(s=>(
            <div key={s.name} className="flex items-center gap-4 px-4 py-3">
              <span className="text-sm text-bolt-elements-textPrimary flex-1">{s.name}</span>
              <span className="text-xs text-bolt-elements-textSecondary">{s.latency}</span>
              <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-green-500"/><span className="text-xs text-green-400 capitalize">{s.status}</span></div>
            </div>
          ))}
        </div>
        <div className="rounded-xl border border-bolt-elements-borderColor bg-bolt-elements-background-depth-2 p-4">
          <h2 className="text-sm font-medium text-bolt-elements-textPrimary mb-3">90-Day History</h2>
          <div className="flex gap-0.5">
            {HIST.map((s,i)=><div key={i} title={`${s}`} className={`flex-1 h-8 rounded-sm cursor-pointer hover:opacity-80 transition-opacity ${s==="operational"?"bg-green-500":s==="degraded"?"bg-yellow-500":"bg-red-500"}`}/>)}
          </div>
          <div className="flex justify-between text-xs text-bolt-elements-textSecondary mt-2">
            <span>90 days ago</span>
            <span className="flex items-center gap-3">
              <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-sm bg-green-500"/>Operational</span>
              <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-sm bg-yellow-500"/>Degraded</span>
              <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-sm bg-red-500"/>Incident</span>
            </span>
            <span>Today</span>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
