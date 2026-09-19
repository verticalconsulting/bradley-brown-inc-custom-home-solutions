import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Clock, AlertTriangle, CheckSquare, FileDown, FileText, RefreshCw, Phone } from "lucide-react";

export default function PlannerResults({ results, answers, onRestart }) {
  const [exporting, setExporting] = useState(false);
  const navigate = useNavigate();

  const colorMap = {
    green: { bg: "bg-green-50", border: "border-green-200", text: "text-green-700", bar: "bg-green-500" },
    amber: { bg: "bg-amber-50", border: "border-amber-200", text: "text-amber-700", bar: "bg-amber-500" },
    orange: { bg: "bg-orange-50", border: "border-orange-200", text: "text-orange-700", bar: "bg-orange-500" },
    red: { bg: "bg-red-50", border: "border-red-200", text: "text-red-700", bar: "bg-red-500" },
  };
  const dc = colorMap[results.disruptionColor] || colorMap.amber;

  // Group checklist by category
  const grouped = results.checklist.reduce((acc, item) => {
    if (!acc[item.category]) acc[item.category] = [];
    acc[item.category].push(item.item);
    return acc;
  }, {});

  const handleExportPDF = async () => {
    setExporting(true);
    try {
      const { jsPDF } = await import("jspdf");
      const doc = new jsPDF({ unit: "pt", format: "letter" });
      const margin = 48;
      let y = margin;

      // Header
      doc.setFontSize(20);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(30, 45, 61);
      doc.text("Your Renovation Plan", margin, y);
      y += 8;
      doc.setDrawColor(196, 146, 42);
      doc.setLineWidth(2);
      doc.line(margin, y, margin + 80, y);
      y += 24;

      doc.setFontSize(11);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(100, 116, 139);
      doc.text("Bradley Brown Inc. — Personalized Project Planner", margin, y);
      y += 28;

      // Project summary
      doc.setFontSize(14);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(30, 45, 61);
      doc.text(results.projectLabel, margin, y);
      y += 22;

      // Timeline + Disruption box
      doc.setFontSize(12);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(30, 45, 61);
      doc.text(`Estimated Timeline: ${results.timelineRange}`, margin, y);
      y += 18;
      doc.text(`Disruption Level: ${results.disruptionLabel} (${results.disruptionScore}/10)`, margin, y);
      y += 16;
      doc.setFont("helvetica", "normal");
      doc.setFontSize(10);
      doc.setTextColor(100, 116, 139);
      const descLines = doc.splitTextToSize(results.disruptionDesc, 468);
      doc.text(descLines, margin, y);
      y += descLines.length * 13 + 16;

      // Checklist
      doc.setFontSize(13);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(30, 45, 61);
      doc.text("Your Preparation Checklist", margin, y);
      y += 20;

      doc.setFontSize(10);
      Object.entries(grouped).forEach(([category, items]) => {
        if (y > 720) {
          doc.addPage();
          y = margin;
        }
        doc.setFont("helvetica", "bold");
        doc.setTextColor(196, 146, 42);
        doc.text(category.toUpperCase(), margin, y);
        y += 15;
        doc.setFont("helvetica", "normal");
        doc.setTextColor(51, 65, 85);
        items.forEach((item) => {
          const lines = doc.splitTextToSize(item, 440);
          if (y + lines.length * 13 > 740) {
            doc.addPage();
            y = margin;
          }
          doc.text(`\u2022  ${lines[0]}`, margin + 4, y);
          for (let i = 1; i < lines.length; i++) {
            y += 13;
            doc.text(lines[i], margin + 18, y);
          }
          y += 15;
        });
        y += 6;
      });

      // Footer
      y = 760;
      doc.setFontSize(9);
      doc.setTextColor(148, 163, 184);
      doc.text("Bradley Brown Inc. — Brandon, MS — (844) 351-4154 — bradleybrowninc.com", margin, y);

      doc.save("renovation-plan.pdf");
    } catch (err) {
      console.error("PDF export failed:", err);
    } finally {
      setExporting(false);
    }
  };

  const handleAttachToQuote = () => {
    const summary = results.checklist.map((c) => `[${c.category}] ${c.item}`).join("\n");
    const plannerSummary = `Renovation Planner Results:\nProject: ${results.projectLabel}\nTimeline: ${results.timelineRange}\nDisruption: ${results.disruptionLabel} (${results.disruptionScore}/10)\n\nPreparation Checklist:\n${summary}`;
    sessionStorage.setItem("plannerResults", JSON.stringify({ summary: plannerSummary, project_type: answers.project_type }));
    navigate("/estimate?from=planner");
  };

  return (
    <div>
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 bg-green-100 rounded-full px-4 py-1.5 mb-3">
          <CheckSquare className="w-4 h-4 text-green-600" />
          <span className="text-green-700 text-sm font-semibold">Your plan is ready</span>
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-[#1E2D3D]">{results.projectLabel}</h2>
        <p className="text-slate-500 mt-1 text-sm">Personalized timeline, disruption assessment & preparation checklist.</p>
      </div>

      {/* Timeline + Disruption cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <div className="bg-gradient-to-br from-[#1E2D3D] to-[#2C3E50] rounded-xl p-6 text-white text-center">
          <Clock className="w-7 h-7 text-[#C4922A] mx-auto mb-2" />
          <p className="text-slate-300 text-xs uppercase tracking-wider mb-1">Estimated Timeline</p>
          <p className="text-2xl font-bold">{results.timelineRange}</p>
          <p className="text-slate-400 text-xs mt-1">Based on scope & project type</p>
        </div>
        <div className={`${dc.bg} ${dc.border} border rounded-xl p-6 text-center`}>
          <AlertTriangle className={`w-7 h-7 ${dc.text} mx-auto mb-2`} />
          <p className="text-slate-500 text-xs uppercase tracking-wider mb-1">Disruption Level</p>
          <p className={`text-2xl font-bold ${dc.text}`}>{results.disruptionLabel} · {results.disruptionScore}/10</p>
          <p className="text-slate-500 text-xs mt-1">{results.disruptionDesc}</p>
          {/* Disruption meter */}
          <div className="mt-3 h-2 bg-white/60 rounded-full overflow-hidden">
            <div
              className={`h-full ${dc.bar} rounded-full transition-all`}
              style={{ width: `${results.disruptionScore * 10}%` }}
            />
          </div>
        </div>
      </div>

      {/* Checklist */}
      <div className="bg-white border border-[#E2D9CC] rounded-xl p-5 md:p-6 mb-8">
        <div className="flex items-center gap-2 mb-4">
          <CheckSquare className="w-5 h-5 text-[#C4922A]" />
          <h3 className="font-bold text-[#1E2D3D]">Your Preparation Checklist</h3>
          <span className="text-xs text-slate-400 ml-auto">{results.checklist.length} items</span>
        </div>
        <div className="space-y-5">
          {Object.entries(grouped).map(([category, items]) => (
            <div key={category}>
              <p className="text-xs font-bold text-[#C4922A] uppercase tracking-wider mb-2">{category}</p>
              <ul className="space-y-1.5">
                {items.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                    <span className="text-[#C4922A] mt-0.5 flex-shrink-0">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Action buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
        <button
          onClick={handleExportPDF}
          disabled={exporting}
          className="flex items-center justify-center gap-2 bg-[#1E2D3D] text-white px-5 py-3 min-h-[48px] rounded-lg font-semibold text-sm hover:bg-[#2C3E50] transition-colors disabled:opacity-50"
        >
          {exporting ? (
            <><RefreshCw className="w-4 h-4 animate-spin" /> Generating PDF…</>
          ) : (
            <><FileDown className="w-4 h-4" /> Export to PDF</>
          )}
        </button>
        <button
          onClick={handleAttachToQuote}
          className="flex items-center justify-center gap-2 bg-[#C4922A] text-white px-5 py-3 min-h-[48px] rounded-lg font-semibold text-sm hover:bg-[#A37820] transition-colors"
        >
          <FileText className="w-4 h-4" /> Attach to Quote Request
        </button>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <button
          onClick={onRestart}
          className="flex-1 flex items-center justify-center gap-2 border border-slate-300 text-slate-600 px-5 py-3 min-h-[48px] rounded-lg font-semibold text-sm hover:bg-slate-50 transition-colors"
        >
          <RefreshCw className="w-4 h-4" /> Start Over
        </button>
        <a
          href="tel:+18443514154"
          className="flex-1 flex items-center justify-center gap-2 border border-[#1E2D3D] text-[#1E2D3D] px-5 py-3 min-h-[48px] rounded-lg font-semibold text-sm hover:bg-[#1E2D3D] hover:text-white transition-colors"
        >
          <Phone className="w-4 h-4" /> Call to Discuss
        </a>
      </div>
    </div>
  );
}