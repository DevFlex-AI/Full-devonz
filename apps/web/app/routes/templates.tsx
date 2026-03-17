import { MetaFunction } from "@remix-run/node";
import { useState } from "react";
import { AppShell } from "~/components/layout/AppShell";
export const meta: MetaFunction = () => [{ title: "Templates — Devonz" }];
const CATS = ["All","Full-Stack","Frontend","Backend","AI/ML","Mobile","CLI"];
const T = [
  { title:"Next.js + Supabase", cat:"Full-Stack", desc:"Auth, DB, storage, realtime — all wired",   icon:"⚡", stars:1240, d:"24K", tags:["Next.js","Supabase","TypeScript"]     },
  { title:"React + Vite SPA",   cat:"Frontend",   desc:"Minimal React + Vite + Tailwind setup",     icon:"⚛️", stars:890,  d:"31K", tags:["React","Vite","Tailwind"]             },
  { title:"Express REST API",   cat:"Backend",    desc:"Typed Express + JWT auth + PostgreSQL",     icon:"🔧", stars:540,  d:"18K", tags:["Express","Node.js","TypeScript"]      },
  { title:"AI Chatbot Starter", cat:"AI/ML",      desc:"Multi-provider chatbot with streaming",     icon:"🤖", stars:2100, d:"9K",  tags:["AI SDK","OpenAI","Streaming"]        },
  { title:"React Native Expo",  cat:"Mobile",     desc:"Expo app with navigation and state mgmt",   icon:"📱", stars:320,  d:"5K",  tags:["React Native","Expo"]                },
  { title:"CLI Tool Starter",   cat:"CLI",        desc:"Node CLI with arg parsing and colors",      icon:"💻", stars:180,  d:"3K",  tags:["Commander","Chalk","TypeScript"]      },
  { title:"SvelteKit App",      cat:"Full-Stack", desc:"Fullstack SvelteKit + Drizzle + Lucia",     icon:"🔥", stars:720,  d:"12K", tags:["SvelteKit","Drizzle","Lucia"]         },
  { title:"Python FastAPI",     cat:"Backend",    desc:"Async Python API + Pydantic + SQLAlchemy",  icon:"🐍", stars:680,  d:"15K", tags:["FastAPI","Python","PostgreSQL"]       },
];
export default function TemplatesPage() {
  const [cat, setCat] = useState("All");
  return (
    <AppShell>
      <div className="p-6 max-w-screen-xl mx-auto space-y-5">
        <div><h1 className="text-xl font-bold text-bolt-elements-textPrimary">Templates</h1>
          <p className="text-sm text-bolt-elements-textSecondary">Production-ready starters — fork and deploy in one click</p></div>
        <div className="flex gap-2 flex-wrap">
          {CATS.map(c=><button key={c} onClick={()=>setCat(c)} className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${cat===c?"bg-accent-500 text-white":"border border-bolt-elements-borderColor bg-bolt-elements-background-depth-2 text-bolt-elements-textSecondary hover:text-bolt-elements-textPrimary"}`}>{c}</button>)}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
          {T.filter(t=>cat==="All"||t.cat===cat).map(t=>(
            <div key={t.title} className="rounded-xl border border-bolt-elements-borderColor bg-bolt-elements-background-depth-2 p-4 hover:border-accent-500/50 transition-colors">
              <div className="text-3xl mb-3">{t.icon}</div>
              <div className="font-semibold text-bolt-elements-textPrimary text-sm mb-1">{t.title}</div>
              <div className="text-xs text-bolt-elements-textSecondary mb-3 leading-relaxed">{t.desc}</div>
              <div className="flex flex-wrap gap-1 mb-3">{t.tags.map(tag=><span key={tag} className="text-xs px-1.5 py-0.5 rounded bg-bolt-elements-background-depth-3 text-bolt-elements-textSecondary">{tag}</span>)}</div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 text-xs text-bolt-elements-textSecondary">
                  <span className="flex items-center gap-1"><div className="i-ph:star w-3 h-3"/>{t.stars}</span>
                  <span className="flex items-center gap-1"><div className="i-ph:rocket-launch w-3 h-3"/>{t.d}</span>
                </div>
                <button className="text-xs px-3 py-1.5 rounded-lg bg-accent-500 text-white hover:bg-accent-600 transition-colors">Deploy</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
