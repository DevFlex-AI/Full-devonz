import { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";
import { useState } from "react";
import { AppShell } from "~/components/layout/AppShell";
export const meta: MetaFunction = () => [{ title: "AI Chat — Devonz" }];
export default function AIChatPage() {
  const [input, setInput] = useState("");
  return (
    <AppShell>
      <div className="flex flex-col h-full p-6 max-w-screen-xl mx-auto" style={{height:"calc(100vh - 0px)"}}>
        <div className="flex items-center gap-3 mb-4 shrink-0">
          <Link to="/ai" className="text-bolt-elements-textSecondary hover:text-bolt-elements-textPrimary text-sm transition-colors">AI Hub</Link>
          <div className="i-ph:caret-right w-4 h-4 text-bolt-elements-textSecondary"/>
          <span className="text-sm font-medium text-bolt-elements-textPrimary">Chat</span>
        </div>
        <div className="flex-1 rounded-2xl border border-bolt-elements-borderColor bg-bolt-elements-background-depth-2 flex flex-col overflow-hidden min-h-0">
          <div className="flex items-center justify-between px-4 py-3 border-b border-bolt-elements-borderColor shrink-0">
            <div className="flex items-center gap-2"><div className="i-ph:robot-duotone w-5 h-5 text-accent-400"/><span className="text-sm font-semibold text-bolt-elements-textPrimary">AI Chat</span></div>
            <select className="text-xs border border-bolt-elements-borderColor rounded-lg px-2 py-1 bg-bolt-elements-background-depth-3 text-bolt-elements-textSecondary focus:outline-none focus:border-accent-500">
              <option>GPT-4o</option><option>Claude 3.5 Sonnet</option><option>Gemini 2.0 Flash</option><option>DeepSeek R1</option>
            </select>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-4 min-h-0">
            <div className="flex gap-3">
              <div className="w-7 h-7 rounded-full bg-accent-500/20 text-accent-400 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">AI</div>
              <div className="max-w-xl rounded-xl rounded-tl-none bg-bolt-elements-background-depth-3 px-4 py-3 text-sm text-bolt-elements-textPrimary leading-relaxed">
                Hi! I'm your Devonz AI. I can write, refactor, debug, and explain any code. I understand your full project context, can read and edit files, run tests, and build entire features end-to-end. What are you working on?
              </div>
            </div>
          </div>
          <div className="p-3 border-t border-bolt-elements-borderColor shrink-0">
            <div className="flex items-end gap-2 rounded-xl border border-bolt-elements-borderColor bg-bolt-elements-background-depth-1 p-2 focus-within:border-accent-500 transition-colors">
              <textarea value={input} onChange={e=>setInput(e.target.value)} placeholder="Ask about your code, request a feature, debug an error…" rows={2}
                className="flex-1 resize-none bg-transparent text-sm text-bolt-elements-textPrimary placeholder:text-bolt-elements-textSecondary focus:outline-none px-2 leading-relaxed"
                onKeyDown={e=>{if(e.key==="Enter"&&!e.shiftKey){e.preventDefault();}}}/>
              <button disabled={!input.trim()} className="shrink-0 w-8 h-8 rounded-lg bg-accent-500 text-white flex items-center justify-center hover:bg-accent-600 transition-colors disabled:opacity-40 disabled:cursor-not-allowed">
                <div className="i-ph:arrow-up w-4 h-4"/>
              </button>
            </div>
            <div className="flex gap-2 mt-2 flex-wrap">
              {["Fix this bug","Write tests for this function","Explain this code","Refactor for performance","Add TypeScript types","Generate API docs"].map(s=>(
                <button key={s} onClick={()=>setInput(s)} className="text-xs px-2.5 py-1 rounded-lg bg-bolt-elements-background-depth-3 text-bolt-elements-textSecondary hover:text-bolt-elements-textPrimary hover:bg-bolt-elements-item-backgroundActive transition-colors">{s}</button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
