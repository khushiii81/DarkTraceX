import Link from "next/link";
import Image from "next/image";
import { Code, MessageSquare, Globe } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-white/5 bg-[#0a0a0a] mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-red-700 to-red-900 flex items-center justify-center overflow-hidden relative">
                <Image src="/logo.png" alt="DarkTraceX" fill sizes="32px" className="object-cover" />
              </div>
              <span className="font-mono font-bold text-lg">
                <span className="text-red-500">Dark</span>
                <span className="text-white">Trace</span>
                <span className="text-red-400">X</span>
              </span>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed max-w-xs">
              An interactive educational platform for malware mechanics and attack vector simulation. For educational and research purposes only.
            </p>
            <div className="flex items-center gap-3 mt-4">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="p-2 text-gray-600 hover:text-red-400 transition-colors">
                <Code className="w-4 h-4" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="p-2 text-gray-600 hover:text-red-400 transition-colors">
                <MessageSquare className="w-4 h-4" />
              </a>
              <a href="https://darktracex.vercel.app" target="_blank" rel="noopener noreferrer" className="p-2 text-gray-600 hover:text-red-400 transition-colors">
                <Globe className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Modules */}
          <div>
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-4">Modules</h3>
            <ul className="space-y-2">
              {[
                { label: "Phishing Dropper", href: "/module/1" },
                { label: "Unpacking Lab", href: "/module/2" },
                { label: "Sandbox Evasion", href: "/module/3" },
                { label: "System Persistence", href: "/module/4" },
                { label: "Registry Tracker", href: "/module/5" },
                { label: "Process Injection", href: "/module/6" },
                { label: "WannaCry Sandbox", href: "/module/7" },
                { label: "Stuxnet SCADA", href: "/module/8" },
                { label: "Pegasus Spyware", href: "/module/9" },
                { label: "Emotet Dropper", href: "/module/10" },
                { label: "Zeus Stealer", href: "/module/11" },
                { label: "NotPetya Wiper", href: "/module/12" },
              ].map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-sm text-gray-500 hover:text-red-400 transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-4">Legal</h3>
            <ul className="space-y-2">
              {[
                { label: "About", href: "/about" },
                { label: "Contact", href: "/contact" },
                { label: "Security Policy", href: "/security" },
                { label: "Privacy Notice", href: "/privacy" },
              ].map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-sm text-gray-500 hover:text-red-400 transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-gray-600 font-mono">
            © 2024 DarkTraceX — For educational purposes only. No actual malware.
          </p>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-red-500 pulse-ring inline-block" />
            <span className="text-xs text-gray-600 font-mono">SIMULATION MODE ACTIVE</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
