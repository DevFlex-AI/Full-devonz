import { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";
import { AppShell } from "~/components/layout/AppShell";
export const meta: MetaFunction = () => [{ title: "Docs — Devonz" }];
const SECTIONS = [
  { title:"Getting Started", icon:"i-ph:rocket-launch-duotone", color:"text-green-400",  docs:["Introduction","Quick Start","CLI Installation","Configuration","Environment Variables"] },
  { title:"AI Features",     icon:"i-ph:robot-duotone",         color:"text-purple-400", docs:["Inline Completions","AI Chat","AI Agents","Prompt Engineering","MCP Servers"] },
  { title:"Editor",          icon:"i-ph:code-duotone",          color:"text-blue-400",   docs:["Keyboard Shortcuts","Vim Mode","Custom Themes","Extensions","Git Integration"] },
  { title:"Cloud Services",  icon:"i-ph:cloud-duotone",         color:"text-cyan-400",   docs:["Deployments","Functions","Database","Storage","Secrets Management"] },
  { title:"Integrations",    icon:"i-ph:plugs-connected-duotone",color:"text-orange-400",docs:["GitHub","GitLab","Vercel","Netlify","Supabase","Stripe"] },
];
export default function DocsPage() {
  return (
    <AppShell>
      <div className="p-6 max-w-screen-xl mx-auto space-y-6">
        <div><h1 className="text-xl font-bold text-bolt-elements-textPrimary">Documentation</h1>
          <p className="text-sm text-bolt-elements-textSecondary">Everything you need to build with Devonz</p></div>
        <div className="relative">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 i-ph:magnifying-glass w-4 h-4 text-bolt-elements-textSecondary"/>
          <input placeholder="Search docs… (⌘K)" className="w-full pl-9 pr-4 py-3 rounded-xl border border-bolt-elements-borderColor bg-bolt-elements-background-depth-2 text-sm text-bolt-elements-textPrimary placeholder:text-bolt-elements-textSecondary focus:outline-none focus:border-accent-500"/>
        </div>
        {SECTIONS.map(sec=>(
          <div key={sec.title}>
            <div className="flex items-center gap-2 mb-3"><div className={`${sec.icon} w-5 h-5 ${sec.color}`}/><h2 className="font-semibold text-bolt-elements-textPrimary">{sec.title}</h2></div>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-3">
              {sec.docs.map(doc=>(
                <Link key={doc} to={`/docs/${doc.toLowerCase().replace(/ /g,"-")}`} className="p-4 rounded-xl border border-bolt-elements-borderColor bg-bolt-elements-background-depth-2 hover:border-accent-500/50 transition-colors group">
                  <div className="text-sm font-medium text-bolt-elements-textPrimary group-hover:text-accent-400 transition-colors">{doc}</div>
                </Link>
              ))}
            </div>
          </div>
        ))}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[{href:"/changelog",icon:"i-ph:newspaper-duotone",title:"Changelog",desc:"What's new"},{href:"/roadmap",icon:"i-ph:map-pin-duotone",title:"Roadmap",desc:"What's coming"},{href:"/status",icon:"i-ph:activity-duotone",title:"Status",desc:"System health"}].map(l=>(
            <Link key={l.href} to={l.href} className="group p-4 rounded-xl border border-bolt-elements-borderColor bg-bolt-elements-background-depth-2 hover:border-accent-500/40 transition-colors flex items-center gap-3">
              <div className={`${l.icon} w-6 h-6 text-bolt-elements-textSecondary group-hover:text-accent-400`}/>
              <div><div className="text-sm font-medium text-bolt-elements-textPrimary">{l.title}</div><div className="text-xs text-bolt-elements-textSecondary">{l.desc}</div></div>
            </Link>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
