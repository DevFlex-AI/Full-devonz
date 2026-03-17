import { Link, useLocation } from "@remix-run/react";
import { useState } from "react";
import { classNames } from "~/utils/classNames";

const NAV = [
  { icon:"i-ph:house-duotone",          label:"Home",        href:"/"           },
  { icon:"i-ph:squares-four-duotone",   label:"Dashboard",   href:"/dashboard"  },
  { icon:"i-ph:folder-open-duotone",    label:"Projects",    href:"/projects"   },
  { icon:"i-ph:code-duotone",           label:"Editor",      href:"/editor"     },
  { icon:"i-ph:play-circle-duotone",    label:"Playground",  href:"/playground" },
  { icon:"i-ph:code-block-duotone",     label:"Snippets",    href:"/snippets"   },
  { icon:"i-ph:robot-duotone",          label:"AI Hub",      href:"/ai"         },
  { icon:"i-ph:cloud-duotone",          label:"Cloud",       href:"/cloud"      },
  { icon:"i-ph:users-duotone",          label:"Team",        href:"/team"       },
  { icon:"i-ph:storefront-duotone",     label:"Marketplace", href:"/marketplace"},
  { icon:"i-ph:layout-duotone",         label:"Templates",   href:"/templates"  },
  { icon:"i-ph:chart-bar-duotone",      label:"Analytics",   href:"/analytics"  },
  { icon:"i-ph:git-branch-duotone",     label:"Pipelines",   href:"/pipelines"  },
  { icon:"i-ph:book-open-duotone",      label:"Docs",        href:"/docs"       },
  { icon:"i-ph:map-pin-duotone",        label:"Roadmap",     href:"/roadmap"    },
  { icon:"i-ph:newspaper-duotone",      label:"Changelog",   href:"/changelog"  },
];

export function AppShell({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex h-screen w-screen bg-bolt-elements-background-depth-1 text-bolt-elements-textPrimary overflow-hidden">
      <aside className={classNames(
        "flex flex-col border-r border-bolt-elements-borderColor bg-bolt-elements-background-depth-2 transition-all duration-200 shrink-0",
        collapsed ? "w-[52px]" : "w-56"
      )}>
        <div className="flex items-center gap-2 px-3 py-3 border-b border-bolt-elements-borderColor shrink-0">
          <div className="w-7 h-7 rounded-lg bg-accent-500 flex items-center justify-center shrink-0 font-bold text-white text-sm">D</div>
          {!collapsed && <span className="font-semibold text-sm text-bolt-elements-textPrimary flex-1">Devonz</span>}
          <button onClick={() => setCollapsed(c => !c)} className="ml-auto text-bolt-elements-textSecondary hover:text-bolt-elements-textPrimary transition-colors">
            <div className={classNames("w-4 h-4", collapsed ? "i-ph:sidebar-simple" : "i-ph:sidebar-simple-fill")} />
          </button>
        </div>
        <nav className="flex-1 overflow-y-auto py-2 px-1.5 space-y-0.5">
          {NAV.map(item => {
            const active = item.href === "/" ? location.pathname === "/" : location.pathname.startsWith(item.href);
            return (
              <Link key={item.href} to={item.href} title={collapsed ? item.label : undefined}
                className={classNames(
                  "flex items-center gap-2.5 px-2 py-1.5 rounded-md text-sm transition-colors",
                  active
                    ? "bg-bolt-elements-item-backgroundAccent text-bolt-elements-item-contentAccent"
                    : "text-bolt-elements-textSecondary hover:bg-bolt-elements-item-backgroundActive hover:text-bolt-elements-textPrimary"
                )}>
                <div className={classNames(item.icon, "w-4 h-4 shrink-0")} />
                {!collapsed && <span className="truncate">{item.label}</span>}
              </Link>
            );
          })}
        </nav>
        <div className="border-t border-bolt-elements-borderColor p-1.5 space-y-0.5 shrink-0">
          {[
            { icon:"i-ph:activity-duotone",    label:"Status",  href:"/status"  },
            { icon:"i-ph:gear-duotone",        label:"Account", href:"/account" },
            { icon:"i-ph:user-circle-duotone", label:"Profile", href:"/profile" },
          ].map(item => (
            <Link key={item.href} to={item.href} title={collapsed ? item.label : undefined}
              className="flex items-center gap-2.5 px-2 py-1.5 rounded-md text-sm text-bolt-elements-textSecondary hover:bg-bolt-elements-item-backgroundActive hover:text-bolt-elements-textPrimary transition-colors">
              <div className={classNames(item.icon, "w-4 h-4 shrink-0")} />
              {!collapsed && <span className="truncate">{item.label}</span>}
            </Link>
          ))}
        </div>
      </aside>
      <main className="flex-1 overflow-y-auto min-w-0">{children}</main>
    </div>
  );
}
