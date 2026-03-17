import { MetaFunction } from "@remix-run/node";
import { useState } from "react";
import { AppShell } from "~/components/layout/AppShell";
export const meta: MetaFunction = () => [{ title: "Marketplace — Devonz" }];
const CATS = ["All","AI Tools","Integrations","Themes","Extensions","MCP Servers","Templates"];
const ITEMS = [
  { title:"Supabase Integration",  cat:"Integrations", desc:"Full Supabase — auth, DB, storage, realtime, edge functions",       icon:"i-ph:database-duotone",         n:8200,  r:4.9, free:true  },
  { title:"Prettier Formatter",    cat:"Extensions",   desc:"Auto-format on save for every file type in the editor",             icon:"i-ph:magic-wand-duotone",       n:31000, r:4.9, free:true  },
  { title:"Web Search MCP",        cat:"MCP Servers",  desc:"Give AI live web search via Brave Search API",                     icon:"i-ph:magnifying-glass-duotone", n:9100,  r:4.6, free:true  },
  { title:"Dracula Pro Theme",     cat:"Themes",       desc:"The iconic Dracula theme ported for Devonz editor",                icon:"i-ph:palette-duotone",          n:24000, r:4.7, free:false },
  { title:"GitHub Copilot Bridge", cat:"AI Tools",     desc:"Use GitHub Copilot as an AI provider inside Devonz",               icon:"i-ph:git-branch-duotone",       n:12400, r:4.8, free:false },
  { title:"Next.js Starter Kit",   cat:"Templates",    desc:"Production-ready Next.js 15 with auth, DB, and AI",               icon:"i-ph:rocket-launch-duotone",    n:5600,  r:4.8, free:true  },
  { title:"Stripe Integration",    cat:"Integrations", desc:"Payments and subscriptions — zero boilerplate setup",              icon:"i-ph:credit-card-duotone",      n:6700,  r:4.8, free:true  },
  { title:"Docker Compose Gen",    cat:"AI Tools",     desc:"AI generates docker-compose.yml from your project structure",      icon:"i-ph:cube-duotone",             n:3200,  r:4.5, free:true  },
  { title:"VS Code Keybindings",   cat:"Extensions",   desc:"Import any VS Code keymap and use it in Devonz editor",           icon:"i-ph:keyboard-duotone",         n:18000, r:4.7, free:true  },
  { title:"File System MCP",       cat:"MCP Servers",  desc:"AI reads, writes, and navigates your entire file system",         icon:"i-ph:folder-open-duotone",      n:11300, r:4.8, free:true  },
  { title:"Catppuccin Theme",      cat:"Themes",       desc:"Pastel — Mocha, Latte, Frappé, Macchiato variants",              icon:"i-ph:paint-bucket-duotone",     n:7800,  r:4.9, free:true  },
  { title:"SvelteKit Template",    cat:"Templates",    desc:"Fullstack SvelteKit with Drizzle ORM + Lucia auth",              icon:"i-ph:fire-duotone",             n:2900,  r:4.7, free:true  },
];
export default function MarketplacePage() {
  const [cat, setCat] = useState("All");
  const [q, setQ] = useState("");
  const list = ITEMS.filter(i=>(cat==="All"||i.cat===cat)&&(i.title.toLowerCase().includes(q.toLowerCase())||i.desc.toLowerCase().includes(q.toLowerCase())));
  return (
    <AppShell>
      <div className="p-6 max-w-screen-xl mx-auto space-y-5">
        <div><h1 className="text-xl font-bold text-bolt-elements-textPrimary">Marketplace</h1>
          <p className="text-sm text-bolt-elements-textSecondary">Extend Devonz with plugins, themes, integrations, and MCP servers</p></div>
        <div className="relative">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 i-ph:magnifying-glass w-4 h-4 text-bolt-elements-textSecondary"/>
          <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search marketplace…" className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-bolt-elements-borderColor bg-bolt-elements-background-depth-2 text-sm text-bolt-elements-textPrimary placeholder:text-bolt-elements-textSecondary focus:outline-none focus:border-accent-500"/>
        </div>
        <div className="flex gap-2 flex-wrap">
          {CATS.map(c=><button key={c} onClick={()=>setCat(c)} className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${cat===c?"bg-accent-500 text-white":"border border-bolt-elements-borderColor bg-bolt-elements-background-depth-2 text-bolt-elements-textSecondary hover:text-bolt-elements-textPrimary"}`}>{c}</button>)}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {list.map(item=>(
            <div key={item.title} className="rounded-xl border border-bolt-elements-borderColor bg-bolt-elements-background-depth-2 p-4 hover:border-accent-500/40 transition-colors">
              <div className="flex items-start gap-3 mb-3">
                <div className={`${item.icon} w-9 h-9 text-accent-400 shrink-0`}/>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-bolt-elements-textPrimary text-sm">{item.title}</div>
                  <div className="text-xs text-bolt-elements-textSecondary">{item.cat}</div>
                </div>
              </div>
              <p className="text-xs text-bolt-elements-textSecondary mb-4 leading-relaxed">{item.desc}</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 text-xs text-bolt-elements-textSecondary">
                  <span className="flex items-center gap-1"><div className="i-ph:star-fill w-3 h-3 text-yellow-400"/>{item.r}</span>
                  <span className="flex items-center gap-1"><div className="i-ph:download-simple w-3 h-3"/>{item.n>999?(item.n/1000).toFixed(0)+"K":item.n}</span>
                </div>
                <button className={`text-xs px-3 py-1.5 rounded-lg font-medium transition-colors ${item.free?"bg-green-500/10 text-green-400 hover:bg-green-500/20":"bg-accent-500/10 text-accent-400 hover:bg-accent-500/20"}`}>{item.free?"Install Free":"$2/mo"}</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
