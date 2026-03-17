import { MetaFunction } from "@remix-run/node";
import { AppShell } from "~/components/layout/AppShell";
export const meta: MetaFunction = () => [{ title: "Team — Devonz" }];
const MEMBERS = [
  { name:"Alex Chen",    email:"alex@devonz.ai",  role:"Owner",     av:"AC", online:"online",  seen:"Now"       },
  { name:"Sarah Kim",    email:"sarah@devonz.ai", role:"Admin",     av:"SK", online:"online",  seen:"5m ago"    },
  { name:"Mike Johnson", email:"mike@devonz.ai",  role:"Developer", av:"MJ", online:"away",    seen:"1h ago"    },
  { name:"Emma Davis",   email:"emma@devonz.ai",  role:"Developer", av:"ED", online:"offline", seen:"Yesterday" },
];
const ROLES = [
  { name:"Owner",     perms:["All permissions"],                        c:"text-yellow-400", bg:"bg-yellow-500/10" },
  { name:"Admin",     perms:["Manage team","Deploy","Edit code"],       c:"text-purple-400", bg:"bg-purple-500/10" },
  { name:"Developer", perms:["Deploy staging","Edit code","View logs"], c:"text-blue-400",   bg:"bg-blue-500/10"   },
  { name:"Viewer",    perms:["View code","View deployments"],           c:"text-green-400",  bg:"bg-green-500/10"  },
];
export default function TeamPage() {
  return (
    <AppShell>
      <div className="p-6 max-w-screen-xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div><h1 className="text-xl font-bold text-bolt-elements-textPrimary">Team</h1>
            <p className="text-sm text-bolt-elements-textSecondary">Manage members and permissions</p></div>
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-accent-500 text-white text-sm font-medium hover:bg-accent-600 transition-colors">
            <div className="i-ph:user-plus w-4 h-4"/>Invite Member</button>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 rounded-xl border border-bolt-elements-borderColor bg-bolt-elements-background-depth-2 overflow-hidden">
            <div className="px-4 py-3 border-b border-bolt-elements-borderColor">
              <span className="text-sm font-medium text-bolt-elements-textPrimary">{MEMBERS.length} Members</span>
            </div>
            <div className="divide-y divide-bolt-elements-borderColor">
              {MEMBERS.map(m=>(
                <div key={m.email} className="flex items-center gap-3 px-4 py-3 hover:bg-bolt-elements-item-backgroundActive transition-colors">
                  <div className="relative">
                    <div className="w-9 h-9 rounded-full bg-accent-500/20 text-accent-400 flex items-center justify-center text-sm font-semibold">{m.av}</div>
                    <div className={`absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2 border-bolt-elements-background-depth-2 ${m.online==="online"?"bg-green-500":m.online==="away"?"bg-yellow-500":"bg-gray-500"}`}/>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-bolt-elements-textPrimary">{m.name}</div>
                    <div className="text-xs text-bolt-elements-textSecondary">{m.email}</div>
                  </div>
                  <div className="hidden sm:block text-xs text-bolt-elements-textSecondary">{m.seen}</div>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${m.role==="Owner"?"bg-yellow-500/10 text-yellow-400":m.role==="Admin"?"bg-purple-500/10 text-purple-400":"bg-blue-500/10 text-blue-400"}`}>{m.role}</span>
                  <button className="i-ph:dots-three-vertical w-4 h-4 text-bolt-elements-textSecondary hover:text-bolt-elements-textPrimary"/>
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-3">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-bolt-elements-textSecondary">Roles</h2>
            {ROLES.map(r=>(
              <div key={r.name} className={`p-4 rounded-xl border border-bolt-elements-borderColor ${r.bg}`}>
                <div className={`text-sm font-bold ${r.c} mb-2`}>{r.name}</div>
                <div className="flex flex-wrap gap-1">
                  {r.perms.map(p=><span key={p} className="text-xs px-2 py-0.5 rounded bg-bolt-elements-background-depth-3 text-bolt-elements-textSecondary">{p}</span>)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppShell>
  );
}
