import { MetaFunction } from "@remix-run/node";
import { AppShell } from "~/components/layout/AppShell";
export const meta: MetaFunction = () => [{ title: "Profile — Devonz" }];
export default function ProfilePage() {
  return (
    <AppShell>
      <div className="p-6 max-w-2xl mx-auto space-y-5">
        <h1 className="text-xl font-bold text-bolt-elements-textPrimary">Profile</h1>
        <div className="rounded-xl border border-bolt-elements-borderColor bg-bolt-elements-background-depth-2 p-6">
          <div className="flex items-center gap-5 mb-6">
            <div className="relative">
              <div className="w-16 h-16 rounded-2xl bg-accent-500/20 text-accent-400 flex items-center justify-center text-2xl font-bold">D</div>
              <button className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-accent-500 text-white flex items-center justify-center hover:bg-accent-600 transition-colors">
                <div className="i-ph:pencil-simple w-3 h-3"/>
              </button>
            </div>
            <div>
              <div className="text-lg font-bold text-bolt-elements-textPrimary">Devonz User</div>
              <div className="text-sm text-bolt-elements-textSecondary">developer@devonz.ai</div>
              <div className="flex items-center gap-2 mt-1.5">
                <span className="text-xs px-2 py-0.5 rounded-full bg-accent-500/10 text-accent-400">Pro Plan</span>
                <span className="text-xs text-bolt-elements-textSecondary">Since Jan 2025</span>
              </div>
            </div>
            <button className="ml-auto text-sm px-4 py-2 rounded-lg border border-bolt-elements-borderColor text-bolt-elements-textSecondary hover:text-bolt-elements-textPrimary transition-colors">Edit Profile</button>
          </div>
          <div className="grid grid-cols-3 gap-4 py-4 border-t border-b border-bolt-elements-borderColor mb-5">
            {[{label:"Projects",value:"12"},{label:"Commits",value:"847"},{label:"AI Requests",value:"12.4K"}].map(s=>(
              <div key={s.label} className="text-center">
                <div className="text-xl font-bold text-bolt-elements-textPrimary">{s.value}</div>
                <div className="text-xs text-bolt-elements-textSecondary">{s.label}</div>
              </div>
            ))}
          </div>
          <div className="space-y-4">
            {[
              { label:"Full Name", value:"Devonz User",           icon:"i-ph:user-duotone"         },
              { label:"Email",     value:"developer@devonz.ai",   icon:"i-ph:envelope-duotone"     },
              { label:"GitHub",    value:"@devflex-ai",           icon:"i-ph:github-logo-duotone"  },
              { label:"Location",  value:"San Francisco, CA",     icon:"i-ph:map-pin-duotone"      },
              { label:"Timezone",  value:"America/Los_Angeles",   icon:"i-ph:clock-duotone"        },
              { label:"Website",   value:"devonz.ai",             icon:"i-ph:globe-duotone"        },
            ].map(f=>(
              <div key={f.label} className="flex items-center gap-3">
                <div className={`${f.icon} w-4 h-4 text-bolt-elements-textSecondary shrink-0`}/>
                <span className="text-sm text-bolt-elements-textSecondary w-24 shrink-0">{f.label}</span>
                <span className="text-sm text-bolt-elements-textPrimary">{f.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppShell>
  );
}
