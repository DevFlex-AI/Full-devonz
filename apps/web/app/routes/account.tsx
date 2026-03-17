import { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";
import { AppShell } from "~/components/layout/AppShell";
export const meta: MetaFunction = () => [{ title: "Account — Devonz" }];
const SECS = [
  { title:"Profile",       desc:"Name, avatar, bio, and social links",       icon:"i-ph:user-circle-duotone",     href:"/profile"               },
  { title:"Billing",       desc:"Plan, invoices, and payment methods",        icon:"i-ph:credit-card-duotone",     href:"/account/billing"       },
  { title:"API Keys",      desc:"Generate and manage API keys for your apps", icon:"i-ph:key-duotone",             href:"/account/api-keys"      },
  { title:"Notifications", desc:"Email and in-app notification preferences",  icon:"i-ph:bell-duotone",            href:"/account/notifications" },
  { title:"Security",      desc:"2FA, active sessions, and login history",    icon:"i-ph:shield-check-duotone",    href:"/account/security"      },
  { title:"Integrations",  desc:"GitHub, GitLab, Vercel, Netlify, Stripe…",  icon:"i-ph:plugs-connected-duotone", href:"/account/integrations"  },
  { title:"Usage",         desc:"Tokens consumed, storage used, rate limits", icon:"i-ph:chart-bar-duotone",       href:"/account/usage"         },
];
export default function AccountPage() {
  return (
    <AppShell>
      <div className="p-6 max-w-2xl mx-auto space-y-4">
        <h1 className="text-xl font-bold text-bolt-elements-textPrimary">Account Settings</h1>
        <div className="space-y-2">
          {SECS.map(s=>(
            <Link key={s.title} to={s.href} className="flex items-center gap-4 p-4 rounded-xl border border-bolt-elements-borderColor bg-bolt-elements-background-depth-2 hover:border-accent-500/50 transition-all group">
              <div className={`${s.icon} w-9 h-9 text-bolt-elements-textSecondary group-hover:text-accent-400 transition-colors shrink-0`}/>
              <div className="flex-1">
                <div className="font-medium text-bolt-elements-textPrimary text-sm">{s.title}</div>
                <div className="text-xs text-bolt-elements-textSecondary">{s.desc}</div>
              </div>
              <div className="i-ph:arrow-right w-4 h-4 text-bolt-elements-textSecondary group-hover:translate-x-0.5 transition-transform"/>
            </Link>
          ))}
        </div>
        <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-4">
          <div className="font-semibold text-red-400 text-sm mb-1">Danger Zone</div>
          <div className="text-xs text-bolt-elements-textSecondary mb-3">These actions are permanent and cannot be undone.</div>
          <div className="flex gap-2">
            <button className="text-xs px-3 py-2 rounded-lg border border-red-500/30 text-red-400 hover:bg-red-500/10 transition-colors">Delete Account</button>
            <button className="text-xs px-3 py-2 rounded-lg border border-bolt-elements-borderColor text-bolt-elements-textSecondary hover:text-bolt-elements-textPrimary transition-colors">Export Data</button>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
