import { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";
import { useState } from "react";
export const meta: MetaFunction = () => [{ title: "Welcome to Devonz" }];
const STEPS = [
  { emoji:"👋", title:"Welcome to Devonz",        desc:"Your AI-powered cloud IDE. Set up in 2 minutes — no install needed." },
  { emoji:"🔗", title:"Connect your Git provider", desc:"Link GitHub or GitLab to import your existing projects instantly." },
  { emoji:"🤖", title:"Pick your AI model",        desc:"Choose your default AI for inline completions and chat." },
  { emoji:"🚀", title:"Create your first project", desc:"Start from a template or import an existing repo." },
];
export default function OnboardingPage() {
  const [step, setStep] = useState(0);
  const cur = STEPS[step];
  return (
    <div className="min-h-screen bg-bolt-elements-background-depth-1 flex items-center justify-center p-6">
      <div className="w-full max-w-md space-y-6">
        <div className="flex items-center gap-2 justify-center">
          <div className="w-10 h-10 rounded-2xl bg-accent-500 flex items-center justify-center font-bold text-white text-lg">D</div>
          <span className="text-xl font-bold text-bolt-elements-textPrimary">Devonz</span>
        </div>
        <div className="flex gap-1.5">
          {STEPS.map((_,i)=><div key={i} className={`flex-1 h-1.5 rounded-full transition-all duration-300 ${i<=step?"bg-accent-500":"bg-bolt-elements-background-depth-3"}`}/>)}
        </div>
        <div className="rounded-2xl border border-bolt-elements-borderColor bg-bolt-elements-background-depth-2 p-8 text-center space-y-4">
          <div className="w-14 h-14 rounded-2xl bg-accent-500/10 flex items-center justify-center mx-auto text-3xl">{cur.emoji}</div>
          <div>
            <div className="text-xs text-bolt-elements-textSecondary mb-1">Step {step+1} of {STEPS.length}</div>
            <h2 className="text-xl font-bold text-bolt-elements-textPrimary">{cur.title}</h2>
            <p className="text-sm text-bolt-elements-textSecondary mt-2 leading-relaxed">{cur.desc}</p>
          </div>
          {step===1&&(
            <div className="space-y-2 text-left">
              {[{label:"Connect GitHub",icon:"i-ph:github-logo-duotone",color:"text-bolt-elements-textPrimary"},{label:"Connect GitLab",icon:"i-ph:gitlab-logo-duotone",color:"text-orange-400"}].map(b=>(
                <button key={b.label} className="w-full flex items-center gap-3 p-3.5 rounded-xl border border-bolt-elements-borderColor bg-bolt-elements-background-depth-1 hover:border-accent-500 transition-colors group">
                  <div className={`${b.icon} w-5 h-5 ${b.color}`}/>
                  <span className="text-sm font-medium text-bolt-elements-textPrimary flex-1 text-left">{b.label}</span>
                  <div className="i-ph:arrow-right w-4 h-4 text-bolt-elements-textSecondary group-hover:translate-x-0.5 transition-transform"/>
                </button>
              ))}
            </div>
          )}
          {step===2&&(
            <div className="space-y-2 text-left">
              {[{name:"GPT-4o",tag:"OpenAI · Fastest",recommended:true},{name:"Claude 3.5 Sonnet",tag:"Anthropic · Best at code",recommended:false},{name:"Gemini 2.0 Flash",tag:"Google · 1M context",recommended:false}].map(m=>(
                <button key={m.name} className={`w-full flex items-center gap-3 p-3.5 rounded-xl border transition-colors group ${m.recommended?"border-accent-500 bg-accent-500/5":"border-bolt-elements-borderColor bg-bolt-elements-background-depth-1 hover:border-accent-500"}`}>
                  <div className="i-ph:robot-duotone w-5 h-5 text-accent-400"/>
                  <div className="flex-1 text-left">
                    <div className="text-sm font-medium text-bolt-elements-textPrimary flex items-center gap-2">{m.name}{m.recommended&&<span className="text-xs px-1.5 py-0.5 rounded-full bg-accent-500/20 text-accent-400">Recommended</span>}</div>
                    <div className="text-xs text-bolt-elements-textSecondary">{m.tag}</div>
                  </div>
                </button>
              ))}
            </div>
          )}
          <div className="flex gap-3 pt-2">
            {step>0&&<button onClick={()=>setStep(s=>s-1)} className="flex-1 py-2.5 rounded-xl border border-bolt-elements-borderColor text-bolt-elements-textSecondary hover:text-bolt-elements-textPrimary text-sm transition-colors">Back</button>}
            {step<STEPS.length-1
              ?<button onClick={()=>setStep(s=>s+1)} className="flex-1 py-2.5 rounded-xl bg-accent-500 text-white text-sm font-semibold hover:bg-accent-600 transition-colors">{step===0?"Get Started →":"Continue →"}</button>
              :<Link to="/dashboard" className="flex-1 py-2.5 rounded-xl bg-accent-500 text-white text-sm font-semibold hover:bg-accent-600 transition-colors text-center block">Open Dashboard 🎉</Link>
            }
          </div>
          {step===0&&<Link to="/dashboard" className="block text-xs text-bolt-elements-textSecondary hover:underline">Skip setup</Link>}
        </div>
      </div>
    </div>
  );
}
