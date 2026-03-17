import { MetaFunction } from "@remix-run/node";
import { useState } from "react";
import { AppShell } from "~/components/layout/AppShell";
export const meta: MetaFunction = () => [{ title: "Snippets — Devonz" }];
const SNIPS = [
  { title:"useDebounce Hook",  lang:"TypeScript", tags:["react","hooks"],   likes:142, code:'const useDebounce = <T,>(val: T, delay: number): T => {\n  const [v, setV] = useState(val);\n  useEffect(() => {\n    const t = setTimeout(() => setV(val), delay);\n    return () => clearTimeout(t);\n  }, [val, delay]);\n  return v;\n};' },
  { title:"Deep Clone",        lang:"TypeScript", tags:["utils"],            likes:98,  code:'const deepClone = <T,>(obj: T): T => structuredClone(obj);' },
  { title:"Fetch with Retry",  lang:"TypeScript", tags:["api","async"],      likes:76,  code:'async function fetchRetry(url: string, n = 3): Promise<Response> {\n  for (let i = 0; i < n; i++) {\n    try { return await fetch(url); }\n    catch (e) { if (i===n-1) throw e; await new Promise(r=>setTimeout(r,1000*2**i)); }\n  }\n  throw new Error();\n}' },
  { title:"cn() Class Merger", lang:"TypeScript", tags:["ui","tailwind"],    likes:234, code:'import { clsx, type ClassValue } from "clsx";\nimport { twMerge } from "tailwind-merge";\nexport const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));' },
];
export default function SnippetsPage() {
  const [q, setQ] = useState("");
  const list = SNIPS.filter(s=>s.title.toLowerCase().includes(q.toLowerCase())||s.tags.some(t=>t.includes(q.toLowerCase())));
  return (
    <AppShell>
      <div className="p-6 max-w-screen-xl mx-auto space-y-5">
        <div className="flex items-center justify-between">
          <div><h1 className="text-xl font-bold text-bolt-elements-textPrimary">Snippets</h1>
            <p className="text-sm text-bolt-elements-textSecondary">Reusable code — save, search, share</p></div>
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-accent-500 text-white text-sm font-medium hover:bg-accent-600 transition-colors">
            <div className="i-ph:plus w-4 h-4"/>New Snippet</button>
        </div>
        <div className="relative">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 i-ph:magnifying-glass w-4 h-4 text-bolt-elements-textSecondary"/>
          <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search snippets…" className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-bolt-elements-borderColor bg-bolt-elements-background-depth-2 text-sm text-bolt-elements-textPrimary placeholder:text-bolt-elements-textSecondary focus:outline-none focus:border-accent-500"/>
        </div>
        <div className="space-y-4">
          {list.map(s=>(
            <div key={s.title} className="rounded-xl border border-bolt-elements-borderColor bg-bolt-elements-background-depth-2 overflow-hidden">
              <div className="flex flex-wrap items-center gap-2 px-4 py-3 border-b border-bolt-elements-borderColor">
                <span className="font-semibold text-bolt-elements-textPrimary text-sm">{s.title}</span>
                <span className="text-xs px-2 py-0.5 rounded bg-bolt-elements-background-depth-3 text-bolt-elements-textSecondary">{s.lang}</span>
                {s.tags.map(t=><span key={t} className="text-xs px-1.5 py-0.5 rounded-full bg-accent-500/10 text-accent-400">#{t}</span>)}
                <div className="ml-auto flex items-center gap-3">
                  <button className="flex items-center gap-1 text-xs text-bolt-elements-textSecondary hover:text-red-400 transition-colors"><div className="i-ph:heart w-3 h-3"/>{s.likes}</button>
                  <button className="flex items-center gap-1 text-xs text-bolt-elements-textSecondary hover:text-bolt-elements-textPrimary transition-colors"><div className="i-ph:copy w-3 h-3"/>Copy</button>
                </div>
              </div>
              <pre className="p-4 text-xs font-mono text-bolt-elements-textSecondary overflow-x-auto leading-relaxed">{s.code}</pre>
            </div>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
