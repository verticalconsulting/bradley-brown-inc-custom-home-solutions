import React, { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import {
  ShieldCheck, CheckCircle2, XCircle, AlertTriangle, RefreshCw,
  Tag, Target, Activity, ExternalLink, Copy, Info, Zap, Eye
} from "lucide-react";

// ── All known tags & conversions extracted from the codebase ─────────────────
const TAGS = [
  {
    id: "GT-NCGLDK7F",
    type: "Google tag",
    description: "Bradley Brown Google tag associated with the Ads configuration",
    location: "Google tag settings (remote)",
    critical: true,
  },
  {
    id: "G-1QRCJ0WQK4",
    type: "Google Analytics 4",
    description: "Bradley Brown GA4 destination",
    location: "Destination of the Bradley Brown Google tag",
    critical: true,
  },
  {
    id: "AW-17864041271",
    type: "Google Ads",
    description: "Bradley Brown Ads destination and the single on-page loader/config ID",
    location: "index.html + Google tag settings",
    critical: true,
  },
];

const CONVERSIONS = [
  {
    name: "Phone Click — Nav / Footer",
    send_to: "AW-17864041271/21TJCO2Bj5ccELfGnsZC",
    value: 30,
    currency: "USD",
    location: "Layout.jsx (nav phone link + footer phone link)",
    trigger: "User clicks (844) 351-4154 in the header or footer",
    type: "phone_call",
  },
  {
    name: "Successful Quote / Contact Lead",
    send_to: "AW-17864041271/aquote_form",
    value: 75,
    currency: "USD",
    location: "pages/Estimate.jsx + pages/Contact.jsx + components/LeadCaptureForm.jsx",
    trigger: "A lead record is saved successfully",
    type: "form_submit",
  },
  {
    name: "Successful Site Visit Booking",
    send_to: "AW-17864041271/xdzhCPzmwZwcELfGnsZC",
    value: 100,
    currency: "USD",
    location: "pages/ScheduleVisit.jsx",
    trigger: "The scheduling backend confirms the booking request",
    type: "form_submit",
    note: "Disable the old URL-based /schedulevisit conversion rule in Google Ads to prevent duplicates.",
  },
];

const ISSUES = [
  {
    severity: "warning",
    title: "Google Admin cleanup required",
    detail: "Vehicle Donation tag G-FEQZWHQV5K is remotely connected to the Bradley Brown Google tag. This cannot be repaired in website code and must be disconnected in Google tag administration.",
    fix: `Keep only these Bradley Brown destinations:
G-1QRCJ0WQK4
AW-17864041271

Disconnect G-FEQZWHQV5K and AW-17766361797.`,
    page: "Google tag Admin → Manage Google tag",
  },
  {
    severity: "warning",
    title: "Remove automatic page-view conversions",
    detail: "Google Ads still contains URL-based conversion rules for /schedulevisit, /thank-you, and the legacy /Contact path. These can count visits without a successful lead action.",
    fix: `Remove or set to Secondary the URL/page-load rules.
Keep the success-based events implemented in the website code.`,
    page: "Google Ads → Goals → Conversions",
  },
];

const SEVERITY_CONFIG = {
  error:   { color: "bg-red-50 border-red-200 text-red-700",   icon: XCircle,        badge: "bg-red-100 text-red-700",   label: "Error"   },
  warning: { color: "bg-amber-50 border-amber-200 text-amber-700", icon: AlertTriangle, badge: "bg-amber-100 text-amber-700", label: "Warning" },
  info:    { color: "bg-sky-50 border-sky-200 text-sky-700",   icon: Info,           badge: "bg-sky-100 text-sky-700",   label: "Info"    },
};

// ── Live runtime checks ───────────────────────────────────────────────────────
function RuntimeChecker() {
  const [results, setResults] = useState(null);
  const [running, setRunning] = useState(false);

  const runChecks = () => {
    setRunning(true);
    setTimeout(() => {
      const checks = [
        {
          name: "gtag function defined",
          pass: typeof window.gtag === "function",
          detail: typeof window.gtag === "function"
            ? "window.gtag() is available — Google tag loaded successfully."
            : "window.gtag is NOT defined. The Google Ads script may have been blocked or failed to load.",
        },
        {
          name: "dataLayer array exists",
          pass: Array.isArray(window.dataLayer),
          detail: Array.isArray(window.dataLayer)
            ? `dataLayer found with ${window.dataLayer.length} event(s) pushed.`
            : "window.dataLayer is missing — the base tag did not initialize.",
        },
        {
          name: "AW-17864041271 config event fired",
          pass: Array.isArray(window.dataLayer) && window.dataLayer.some(
            e => e[0] === "config" && e[1] === "AW-17864041271"
          ),
          detail: Array.isArray(window.dataLayer) && window.dataLayer.some(
            e => e[0] === "config" && e[1] === "AW-17864041271"
          )
            ? "Config event for AW-17864041271 found in dataLayer."
            : "Config event for AW-17864041271 NOT found in dataLayer. The Ads tag may not be firing.",
        },
        {
          name: "Google tag script loaded",
          pass: !!document.querySelector('script[src*="googletagmanager.com/gtag"]'),
          detail: !!document.querySelector('script[src*="googletagmanager.com/gtag"]')
            ? "Google tag script found in DOM. GA4 is delivered through the tag's G-1QRCJ0WQK4 destination."
            : "Google tag script NOT found. Check index.html.",
        },
      ];
      setResults(checks);
      setRunning(false);
    }, 800);
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="flex items-center justify-between p-5 border-b border-gray-100">
        <div className="flex items-center gap-2">
          <Activity className="w-5 h-5 text-sky-500" />
          <div>
            <h2 className="font-bold text-[#1E2D3D]">Live Runtime Check</h2>
            <p className="text-xs text-slate-400 mt-0.5">Inspects the current browser environment for tag presence</p>
          </div>
        </div>
        <button
          onClick={runChecks}
          disabled={running}
          className="flex items-center gap-2 bg-sky-500 hover:bg-sky-600 disabled:opacity-60 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors"
        >
          <RefreshCw className={`w-4 h-4 ${running ? "animate-spin" : ""}`} />
          {running ? "Checking…" : "Run Checks"}
        </button>
      </div>
      <div className="p-5">
        {!results && !running && (
          <p className="text-slate-400 text-sm">Click "Run Checks" to inspect the live browser environment.</p>
        )}
        {running && (
          <div className="flex items-center gap-2 text-slate-500 text-sm">
            <RefreshCw className="w-4 h-4 animate-spin" /> Inspecting window.gtag, dataLayer, and script tags…
          </div>
        )}
        {results && (
          <div className="space-y-2">
            {results.map((r, i) => (
              <div key={i} className={`flex items-start gap-3 p-3 rounded-xl border ${
                r.isWarning
                  ? (r.pass ? "bg-green-50 border-green-200" : "bg-amber-50 border-amber-200")
                  : (r.pass ? "bg-green-50 border-green-200" : "bg-red-50 border-red-200")
              }`}>
                {r.isWarning
                  ? (r.pass
                      ? <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                      : <AlertTriangle className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />)
                  : (r.pass
                      ? <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                      : <XCircle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />)
                }
                <div>
                  <p className={`text-sm font-semibold ${
                    r.isWarning
                      ? (r.pass ? "text-green-700" : "text-amber-700")
                      : (r.pass ? "text-green-700" : "text-red-700")
                  }`}>{r.name}</p>
                  <p className="text-xs text-slate-500 mt-0.5">{r.detail}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ── Copy button ───────────────────────────────────────────────────────────────
function CopyButton({ text }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      onClick={() => { navigator.clipboard.writeText(text); setCopied(true); setTimeout(() => setCopied(false), 1500); }}
      className="p-1 hover:bg-gray-100 rounded transition-colors"
      title="Copy"
    >
      {copied ? <CheckCircle2 className="w-3.5 h-3.5 text-green-500" /> : <Copy className="w-3.5 h-3.5 text-slate-400" />}
    </button>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────
export default function ConversionDashboard() {
  const [user, setUser] = useState(null);
  const [authChecked, setAuthChecked] = useState(false);
  const [expandedFix, setExpandedFix] = useState(null);

  useEffect(() => {
    base44.auth.me().then(u => setUser(u)).catch(() => {}).finally(() => setAuthChecked(true));
  }, []);

  if (!authChecked) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-8 h-8 border-4 border-slate-200 border-t-[#1E2D3D] rounded-full animate-spin" />
    </div>
  );

  if (!user || user.role !== "admin") {
    return (
      <div className="min-h-screen bg-[#FAFAF8] pt-20 flex items-center justify-center">
        <div className="text-center">
          <ShieldCheck className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h2 className="text-xl font-bold text-[#1E2D3D]">Admin Access Required</h2>
          <p className="text-slate-500 text-sm mt-1">This page is restricted to administrators.</p>
        </div>
      </div>
    );
  }

  const errorCount = ISSUES.filter(i => i.severity === "error").length;
  const warnCount = ISSUES.filter(i => i.severity === "warning").length;

  return (
    <div className="min-h-screen bg-[#FAFAF8] pt-20 pb-16">
      {/* Header */}
      <div className="bg-[#1E2D3D] py-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <h1 className="text-2xl md:text-3xl font-bold text-white">Google Tag & Conversion Health</h1>
          <p className="text-slate-400 mt-1 text-sm">Audit your gtag.js setup, conversion IDs, and diagnose tracking issues</p>
          <div className="flex gap-3 mt-4">
            {errorCount > 0 && (
              <span className="inline-flex items-center gap-1.5 bg-red-500/20 border border-red-400/40 text-red-300 text-xs font-semibold px-3 py-1 rounded-full">
                <XCircle className="w-3.5 h-3.5" /> {errorCount} Error{errorCount > 1 ? "s" : ""}
              </span>
            )}
            {warnCount > 0 && (
              <span className="inline-flex items-center gap-1.5 bg-amber-500/20 border border-amber-400/40 text-amber-300 text-xs font-semibold px-3 py-1 rounded-full">
                <AlertTriangle className="w-3.5 h-3.5" /> {warnCount} Warning{warnCount > 1 ? "s" : ""}
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-8">

        {/* ── Live Runtime Checker ── */}
        <RuntimeChecker />

        {/* ── Issues & Diagnostics ── */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="flex items-center gap-2 p-5 border-b border-gray-100">
            <AlertTriangle className="w-5 h-5 text-amber-500" />
            <div>
              <h2 className="font-bold text-[#1E2D3D]">Detected Issues & Fixes</h2>
              <p className="text-xs text-slate-400 mt-0.5">Code checks plus required Google-account cleanup</p>
            </div>
          </div>
          <div className="p-5 space-y-4">
            {ISSUES.map((issue, i) => {
              const cfg = SEVERITY_CONFIG[issue.severity];
              const Icon = cfg.icon;
              const isOpen = expandedFix === i;
              return (
                <div key={i} className={`border rounded-xl overflow-hidden ${cfg.color}`}>
                  <div className="p-4">
                    <div className="flex items-start gap-3">
                      <Icon className="w-4 h-4 flex-shrink-0 mt-0.5" />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap mb-1">
                          <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${cfg.badge}`}>{cfg.label}</span>
                          <span className="font-semibold text-sm">{issue.title}</span>
                        </div>
                        <p className="text-xs leading-relaxed opacity-80">{issue.detail}</p>
                        <p className="text-xs mt-1 opacity-60 font-mono">{issue.page}</p>
                      </div>
                      <button
                        onClick={() => setExpandedFix(isOpen ? null : i)}
                        className="flex-shrink-0 flex items-center gap-1 text-xs font-semibold bg-white/60 hover:bg-white/80 px-3 py-1.5 rounded-lg transition-colors"
                      >
                        <Eye className="w-3.5 h-3.5" /> {isOpen ? "Hide Fix" : "See Fix"}
                      </button>
                    </div>
                  </div>
                  {isOpen && (
                    <div className="border-t border-current/20 bg-[#1E2D3D] p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs text-slate-400 font-semibold">Suggested Fix</span>
                        <CopyButton text={issue.fix} />
                      </div>
                      <pre className="text-xs text-green-300 font-mono whitespace-pre-wrap leading-relaxed overflow-x-auto">{issue.fix}</pre>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* ── Installed Tags ── */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="flex items-center gap-2 p-5 border-b border-gray-100">
            <Tag className="w-5 h-5 text-sky-500" />
            <div>
              <h2 className="font-bold text-[#1E2D3D]">Installed Tags</h2>
              <p className="text-xs text-slate-400 mt-0.5">All tracking tags found in your app</p>
            </div>
          </div>
          <div className="divide-y divide-gray-50">
            {TAGS.map((tag, i) => (
              <div key={i} className="p-5 flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-sky-50 flex items-center justify-center flex-shrink-0">
                  <Tag className="w-5 h-5 text-sky-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <span className="font-bold text-[#1E2D3D] text-sm">{tag.type}</span>
                    {tag.critical && (
                      <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-medium">Global</span>
                    )}
                  </div>
                  <p className="text-xs text-slate-500 mb-1">{tag.description}</p>
                  <div className="flex items-center gap-1 font-mono text-xs text-slate-600 bg-slate-50 rounded px-2 py-1 w-fit">
                    {tag.id}
                    <CopyButton text={tag.id} />
                  </div>
                  <p className="text-xs text-slate-400 mt-1">📍 {tag.location}</p>
                </div>
                <a
                  href={`https://ads.google.com`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-shrink-0 text-slate-400 hover:text-sky-500 transition-colors"
                  title="Open Google Ads"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* ── Conversion Actions ── */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="flex items-center gap-2 p-5 border-b border-gray-100">
            <Target className="w-5 h-5 text-sky-500" />
            <div>
              <h2 className="font-bold text-[#1E2D3D]">Conversion Actions</h2>
              <p className="text-xs text-slate-400 mt-0.5">All gtag conversion events found in the codebase</p>
            </div>
          </div>
          <div className="divide-y divide-gray-50">
            {CONVERSIONS.map((conv, i) => (
              <div key={i} className="p-5">
                <div className="flex items-start gap-3">
                  <div className={`w-2.5 h-2.5 rounded-full mt-1.5 flex-shrink-0 ${conv.note ? "bg-amber-400" : "bg-green-400"}`} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <span className="font-bold text-[#1E2D3D] text-sm">{conv.name}</span>
                      <span className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full">{conv.type}</span>
                      <span className="text-xs bg-green-50 text-green-700 px-2 py-0.5 rounded-full font-semibold">${conv.value} {conv.currency}</span>
                    </div>
                    <p className="text-xs text-slate-500 mb-2">🎯 {conv.trigger}</p>
                    <div className="flex items-center gap-1 font-mono text-xs text-slate-600 bg-slate-50 rounded px-2 py-1 w-fit mb-1">
                      {conv.send_to}
                      <CopyButton text={conv.send_to} />
                    </div>
                    <p className="text-xs text-slate-400">📍 {conv.location}</p>
                    {conv.note && (
                      <div className="mt-2 flex items-start gap-1.5 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2">
                        <AlertTriangle className="w-3.5 h-3.5 text-amber-500 flex-shrink-0 mt-0.5" />
                        <p className="text-xs text-amber-700">{conv.note}</p>
                      </div>
                    )}
                  </div>
                  <a
                    href={`https://ads.google.com/aw/conversions`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-shrink-0 text-slate-400 hover:text-sky-500 transition-colors"
                    title="Open Google Ads Conversions"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Quick Links ── */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <h2 className="font-bold text-[#1E2D3D] mb-4 flex items-center gap-2">
            <Zap className="w-4 h-4 text-sky-500" /> Quick Links — Fix & Verify
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { label: "Google Ads Conversion Actions", url: "https://ads.google.com/aw/conversions", desc: "View & verify conversion labels" },
              { label: "Google Tag Assistant", url: "https://tagassistant.google.com", desc: "Live debug your gtag installation" },
              { label: "Google Analytics 4", url: "https://analytics.google.com", desc: "Set up GA4 & link to Ads" },
              { label: "Google Ads Linked Accounts", url: "https://ads.google.com/aw/linkedaccounts", desc: "Link GA4 to Google Ads" },
              { label: "GTM Preview Mode", url: "https://tagmanager.google.com", desc: "Debug tags before going live" },
              { label: "Ads Conversion Diagnosis", url: "https://ads.google.com/aw/diagnostics", desc: "See why conversions may not be recording" },
            ].map((link) => (
              <a
                key={link.label}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3 p-4 border border-gray-200 rounded-xl hover:border-sky-300 hover:bg-sky-50 transition-colors group"
              >
                <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-sky-500 mt-0.5 flex-shrink-0 transition-colors" />
                <div>
                  <p className="text-sm font-semibold text-[#1E2D3D] group-hover:text-sky-700 transition-colors">{link.label}</p>
                  <p className="text-xs text-slate-400">{link.desc}</p>
                </div>
              </a>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
