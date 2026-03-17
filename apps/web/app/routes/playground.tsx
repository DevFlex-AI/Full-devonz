import { MetaFunction } from "@remix-run/node";
import { useState } from "react";
import { AppShell } from "~/components/layout/AppShell";
export const meta: MetaFunction = () => [{ title: "Playground — Devonz" }];
const LANGS = [
  { id:"ts", label:"TypeScript", color:"text-blue-400",   starter:"// TypeScript\nconst greet = (name: string): string => `Hello, ${name}!`;\nconsole.log(greet(\"Devonz\"));" },
  { id:"js", label:"JavaScript", color:"text-yellow-300", starter:"// JavaScript\nconst nums = [3,1,4,1,5,9,2,6];\nconst sorted = [...nums].sort((a,b)=>a-b);\nconsole.log(sorted);" },
  { id:"py", label:"Python",     color:"text-yellow-400", starter:"# Python\ndef fib(n):\n    a,b=0,1\n    for _ in range(n): a,b=b,a+b\n    return a\nprint([fib(i) for i in range(10)])" },
  { id:"rs", label:"Rust",       color:"text-orange-400", starter:"fn main() {\n    let nums = vec![1,2,3,4,5];\n    let sum: i32 = nums.iter().sum();\n    println!(\"Sum: {}\", sum);\n}" },
  { id:"go", label:"Go",         color:"text-cyan-400",   starter:'package main\nimport "fmt"\nfunc main() {\n    for i:=0;i<5;i++ { fmt.Printf("Line %d\\n",i) }\n}' },
  { id:"sh", label:"Bash",       color:"text-green-400",  starter:'#!/bin/bash\nfor i in {1..5}; do\n  echo "Iteration $i"\ndone' },
];
const TEMPLATES = [
  { title:"React useState Counter", id:"ts", desc:"Simple state management example"    },
  { title:"Fetch with Retry",       id:"ts", desc:"HTTP requests with exponential backoff" },
  { title:"Fibonacci Memoized",     id:"py", desc:"Dynamic programming classic"         },
  { title:"Binary Search",          id:"js", desc:"Efficient O(log n) search"           },
  { title:"HTTP Server",            id:"go", desc:"Minimal REST API in Go"              },
  { title:"File Watcher",           id:"sh", desc:"Watch dir for changes"               },
];
export default function PlaygroundPage() {
  const [lang, setLang] = useState("ts");
  const cur = LANGS.find(l=>l.id===lang)!;
  const [code, setCode] = useState(cur.starter);
  return (
    <AppShell>
      <div className="p-6 max-w-screen-xl mx-auto space-y-5">
        <div>
          <h1 className="text-xl font-bold text-bolt-elements-textPrimary">Code Playground</h1>
          <p className="text-sm text-bolt-elements-textSecondary">Write, run, and share code — no setup, no installs</p>
        </div>
        <div className="flex gap-2 flex-wrap">
          {LANGS.map(l=>(
            <button key={l.id} onClick={()=>{setLang(l.id);setCode(l.starter);}}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-medium transition-colors ${lang===l.id?"border-accent-500 bg-accent-500/10 text-accent-400":"border-bolt-elements-borderColor bg-bolt-elements-background-depth-2 text-bolt-elements-textSecondary hover:text-bolt-elements-textPrimary"}`}>
              <span className={`font-mono text-xs ${l.color}`}>{l.label}</span>
            </button>
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 h-[440px]">
          <div className="rounded-xl border border-bolt-elements-borderColor bg-bolt-elements-background-depth-2 flex flex-col overflow-hidden">
            <div className="flex items-center justify-between px-4 py-2.5 border-b border-bolt-elements-borderColor shrink-0">
              <span className="text-xs font-medium text-bolt-elements-textSecondary">Editor — {cur.label}</span>
              <div className="flex gap-2">
                <button className="text-xs px-2.5 py-1 rounded bg-bolt-elements-background-depth-3 text-bolt-elements-textSecondary hover:text-bolt-elements-textPrimary transition-colors flex items-center gap-1">
                  <div className="i-ph:robot-duotone w-3 h-3"/>AI Fix
                </button>
                <button className="text-xs px-2.5 py-1 rounded bg-accent-500 text-white hover:bg-accent-600 transition-colors flex items-center gap-1">
                  <div className="i-ph:play-fill w-3 h-3"/>Run
                </button>
              </div>
            </div>
            <textarea value={code} onChange={e=>setCode(e.target.value)}
              className="flex-1 p-4 bg-transparent text-xs font-mono text-bolt-elements-textPrimary resize-none focus:outline-none leading-relaxed"/>
          </div>
          <div className="rounded-xl border border-bolt-elements-borderColor bg-bolt-elements-background-depth-1 flex flex-col overflow-hidden">
            <div className="flex items-center gap-2 px-4 py-2.5 border-b border-bolt-elements-borderColor shrink-0">
              <span className="text-xs font-medium text-bolt-elements-textSecondary">Output</span>
              <div className="ml-auto flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"/>
                <span className="text-xs text-green-400">Ready</span>
              </div>
            </div>
            <pre className="flex-1 p-4 text-xs font-mono text-bolt-elements-textSecondary overflow-auto">Run your code to see output here…</pre>
          </div>
        </div>
        <div>
          <h2 className="text-xs font-semibold uppercase tracking-wider text-bolt-elements-textSecondary mb-3">Starter Templates</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
            {TEMPLATES.map(t=>(
              <button key={t.title} onClick={()=>{const l=LANGS.find(x=>x.id===t.id)!;setLang(t.id);setCode(l.starter);}}
                className="text-left p-4 rounded-xl border border-bolt-elements-borderColor bg-bolt-elements-background-depth-2 hover:border-accent-500/50 transition-colors group">
                <div className="text-sm font-medium text-bolt-elements-textPrimary group-hover:text-accent-400 transition-colors">{t.title}</div>
                <div className="text-xs text-bolt-elements-textSecondary mt-0.5">{t.desc}</div>
                <span className={`text-xs mt-2 inline-block px-2 py-0.5 rounded bg-bolt-elements-background-depth-3 ${LANGS.find(l=>l.id===t.id)?.color}`}>{LANGS.find(l=>l.id===t.id)?.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </AppShell>
  );
}
