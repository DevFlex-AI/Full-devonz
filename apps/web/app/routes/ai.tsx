import { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";
import { AppShell } from "~/components/layout/AppShell";
export const meta: MetaFunction = () => [{ title: "AI Hub — Devonz" }];
const TOOLS = [
  { title:"AI Chat",        desc:"Chat with your codebase — questions, refactors, features, full end-to-end tasks",              icon:"i-ph:chat-circle-dots-duotone",       href:"/ai/chat",    badge:"Most Used", grad:"from-blue-500/15"   },
  { title:"AI Agents",      desc:"Autonomous agents that write, test, and deploy code. Give a task, come back to a PR",          icon:"i-ph:robot-duotone",                   href:"/ai/agents",  badge:"New",       grad:"from-purple-500/15" },
  { title:"Prompt Library", desc:"Save, version, and share your best prompts. One-click reuse across any project",               icon:"i-ph:book-open-duotone",               href:"/ai/prompts",  badge:null,       grad:"from-green-500/15"  },
  { title:"Model Compare",  desc:"Side-by-side benchmark GPT-4o vs Claude 3.5 vs Gemini 2.0 on your actual tasks",              icon:"i-ph:scales-duotone",                  href:"/ai/models",   badge:null,       grad:"from-orange-500/15" },
  { title:"MCP Tools",      desc:"Browse and install MCP servers — web search, browser control, file ops, database access",     icon:"i-ph:toolbox-duotone",                 href:"/ai/tools",    badge:null,       grad:"from-cyan-500/15"   },
  { title:"Chat History",   desc:"Full search and replay of every AI conversation with context preserved exactly as it was",    icon:"i-ph:clock-counter-clockwise-duotone", href:"/ai/history",  badge:null,       grad:"from-pink-500/15"   },
];
const MODELS = [
  { name:"GPT-4o",           provider:"OpenAI",         ctx:"128K", icon:"⚡", status:"connected" },
  { name:"Claude 3.5 Sonnet",provider:"Anthropic",      ctx:"200K", icon:"🤖", status:"connected" },
  { name:"Gemini 2.0 Flash", provider:"Google",         ctx:"1M",   icon:"🌟", status:"connected" },
  { name:"DeepSeek R1",      provider:"DeepSeek",       ctx:"64K",  icon:"🔍", status:"available" },
  { name:"Llama 3.3 70B",    provider:"Ollama (local)", ctx:"128K", icon:"🦙", status:"offline"   },
];
export default function AIHubPage() {
  return (
    <AppShell>
      <div className="p-6 max-w-screen-xl mx-auto space-y-6">
        <div>
          <h1 className="text-xl font-bold text-bolt-elements-textPrimary">AI Hub</h1>
          <p className="text-sm text-bolt-elements-textSecondary">Your command center for AI-powered development</p>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {[{label:"Tokens today",value:"124,832",icon:"i-ph:lightning-duotone",color:"text-yellow-400"},{label:"Requests today",value:"847",icon:"i-ph:arrow-up-right-duotone",color:"text-green-400"},{label:"Avg latency",value:"1.2s",icon:"i-ph:timer-duotone",color:"text-blue-400"},{label:"Cost today",value:"$0.34",icon:"i-ph:currency-dollar-duotone",color:"text-purple-400"}].map(s=>(
            <div key={s.label} className="rounded-xl border border-bolt-elements-borderColor bg-bolt-elements-background-depth-2 p-3">
              <div className={`${s.icon} w-4 h-4 ${s.color} mb-2`}/>
              <div className="text-lg font-bold text-bolt-elements-textPrimary">{s.value}</div>
              <div className="text-xs text-bolt-elements-textSecondary">{s.label}</div>
            </div>
          ))}
        </div>
        <div>
          <h2 className="text-xs font-semibold uppercase tracking-wider text-bolt-elements-textSecondary mb-3">Tools</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {TOOLS.map(t=>(
              <Link key={t.title} to={t.href} className={`group p-5 rounded-xl border border-bolt-elements-borderColor bg-gradient-to-br ${t.grad} to-transparent hover:border-accent-500/50 transition-all`}>
                <div className="flex items-start justify-between mb-3">
                  <div className={`${t.icon} w-7 h-7 text-bolt-elements-textPrimary`}/>
                  <div className="flex items-center gap-2">
                    {t.badge&&<span className="text-xs px-1.5 py-0.5 rounded-full bg-accent-500/20 text-accent-400 font-medium">{t.badge}</span>}
                    <div className="i-ph:arrow-right w-4 h-4 text-bolt-elements-textSecondary group-hover:translate-x-0.5 transition-transform"/>
                  </div>
                </div>
                <div className="font-semibold text-bolt-elements-textPrimary text-sm mb-1">{t.title}</div>
                <p className="text-xs text-bolt-elements-textSecondary leading-relaxed">{t.desc}</p>
              </Link>
            ))}
          </div>
        </div>
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-bolt-elements-textSecondary">Models</h2>
            <Link to="/ai/models" className="text-xs text-accent-500 hover:underline">Compare all →</Link>
          </div>
          <div className="rounded-xl border border-bolt-elements-borderColor bg-bolt-elements-background-depth-2 divide-y divide-bolt-elements-borderColor overflow-hidden">
            {MODELS.map(m=>(
              <div key={m.name} className="flex items-center gap-4 px-4 py-3 hover:bg-bolt-elements-item-backgroundActive transition-colors">
                <span className="text-xl">{m.icon}</span>
                <div className="flex-1"><div className="text-sm font-medium text-bolt-elements-textPrimary">{m.name}</div><div className="text-xs text-bolt-elements-textSecondary">{m.provider} · {m.ctx} ctx</div></div>
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${m.status==="connected"?"bg-green-500/10 text-green-400":m.status==="available"?"bg-blue-500/10 text-blue-400":"bg-bolt-elements-background-depth-3 text-bolt-elements-textSecondary"}`}>{m.status}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppShell>
  );
}
