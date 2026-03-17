import { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";
import { AppShell } from "~/components/layout/AppShell";
export const meta: MetaFunction = () => [{ title: "Model Comparison — Devonz" }];
const MODELS = [
  { name:"GPT-4o",            provider:"OpenAI",        ctx:"128K", speed:"Fast",    coding:5, reason:5, vision:true,  price:"$5/1M",    icon:"⚡", status:"connected" },
  { name:"Claude 3.5 Sonnet", provider:"Anthropic",     ctx:"200K", speed:"Fast",    coding:5, reason:5, vision:true,  price:"$3/1M",    icon:"🤖", status:"connected" },
  { name:"Gemini 2.0 Flash",  provider:"Google",        ctx:"1M",   speed:"Fastest", coding:4, reason:4, vision:true,  price:"$0.10/1M", icon:"🌟", status:"connected" },
  { name:"DeepSeek R1",       provider:"DeepSeek",      ctx:"64K",  speed:"Medium",  coding:5, reason:5, vision:false, price:"$0.55/1M", icon:"🔍", status:"available" },
  { name:"Llama 3.3 70B",     provider:"Ollama (local)",ctx:"128K", speed:"Variable",coding:4, reason:4, vision:false, price:"Free",     icon:"🦙", status:"offline"   },
  { name:"Mistral Large 2",   provider:"Mistral AI",    ctx:"128K", speed:"Fast",    coding:4, reason:4, vision:false, price:"$2/1M",    icon:"🌊", status:"available" },
];
const Dots = ({n,color}:{n:number,color:string}) => (
  <div className="flex gap-0.5">{[0,1,2,3,4].map(i=><div key={i} className={`w-2 h-2 rounded-full ${i<n?color:"bg-bolt-elements-background-depth-3"}`}/>)}</div>
);
export default function AIModelsPage() {
  return (
    <AppShell>
      <div className="p-6 max-w-screen-xl mx-auto space-y-5">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Link to="/ai" className="text-bolt-elements-textSecondary hover:text-bolt-elements-textPrimary text-sm transition-colors">AI Hub</Link>
              <div className="i-ph:caret-right w-4 h-4 text-bolt-elements-textSecondary"/>
              <span className="text-sm font-medium text-bolt-elements-textPrimary">Models</span>
            </div>
            <h1 className="text-xl font-bold text-bolt-elements-textPrimary">Model Comparison</h1>
            <p className="text-sm text-bolt-elements-textSecondary">Compare AI models by speed, quality, context, and price</p>
          </div>
        </div>
        <div className="rounded-xl border border-bolt-elements-borderColor bg-bolt-elements-background-depth-2 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-bolt-elements-borderColor">
                  {["Model","Provider","Context","Speed","Coding","Reasoning","Vision","Price","Status"].map(h=>(
                    <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-bolt-elements-textSecondary uppercase tracking-wider whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-bolt-elements-borderColor">
                {MODELS.map(m=>(
                  <tr key={m.name} className="hover:bg-bolt-elements-item-backgroundActive transition-colors">
                    <td className="px-4 py-3 whitespace-nowrap"><div className="flex items-center gap-2"><span className="text-xl">{m.icon}</span><span className="font-semibold text-bolt-elements-textPrimary">{m.name}</span></div></td>
                    <td className="px-4 py-3 text-bolt-elements-textSecondary whitespace-nowrap">{m.provider}</td>
                    <td className="px-4 py-3 text-bolt-elements-textSecondary">{m.ctx}</td>
                    <td className="px-4 py-3 text-bolt-elements-textSecondary whitespace-nowrap">{m.speed}</td>
                    <td className="px-4 py-3"><Dots n={m.coding} color="bg-accent-500"/></td>
                    <td className="px-4 py-3"><Dots n={m.reason} color="bg-purple-500"/></td>
                    <td className="px-4 py-3">{m.vision?<div className="i-ph:check-circle-duotone w-4 h-4 text-green-400"/>:<div className="i-ph:x-circle-duotone w-4 h-4 text-bolt-elements-background-depth-3"/>}</td>
                    <td className="px-4 py-3 font-mono text-xs text-bolt-elements-textSecondary whitespace-nowrap">{m.price}</td>
                    <td className="px-4 py-3 whitespace-nowrap"><span className={`text-xs px-2 py-0.5 rounded-full font-medium ${m.status==="connected"?"bg-green-500/10 text-green-400":m.status==="available"?"bg-blue-500/10 text-blue-400":"bg-bolt-elements-background-depth-3 text-bolt-elements-textSecondary"}`}>{m.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
