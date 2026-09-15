import React, { useState, useMemo } from "react";
import {
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  isSameMonth,
  addMonths,
  isToday,
} from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react";

const CATEGORY_STYLES = {
  "kitchen-remodeling": { label: "Kitchen", chip: "bg-amber-100 text-amber-800", dot: "bg-amber-400" },
  "bathroom-remodeling": { label: "Bathroom", chip: "bg-sky-100 text-sky-800", dot: "bg-sky-400" },
  "outdoor-living": { label: "Outdoor Living", chip: "bg-green-100 text-green-800", dot: "bg-green-400" },
  "curb-appeal": { label: "Curb Appeal", chip: "bg-pink-100 text-pink-800", dot: "bg-pink-400" },
  "home-value": { label: "Home Value", chip: "bg-violet-100 text-violet-800", dot: "bg-violet-400" },
  "interior-updates": { label: "Interior Updates", chip: "bg-indigo-100 text-indigo-800", dot: "bg-indigo-400" },
  "home-remodeling": { label: "Home Remodeling", chip: "bg-blue-100 text-blue-800", dot: "bg-blue-400" },
};

const styleFor = (cat) => CATEGORY_STYLES[cat] || CATEGORY_STYLES["home-remodeling"];

export default function BlogCalendar({ posts, onEdit }) {
  const [cursor, setCursor] = useState(new Date());

  const days = useMemo(
    () =>
      eachDayOfInterval({
        start: startOfWeek(startOfMonth(cursor), { weekStartsOn: 0 }),
        end: endOfWeek(endOfMonth(cursor), { weekStartsOn: 0 }),
      }),
    [cursor]
  );

  const postsByDay = useMemo(() => {
    const map = {};
    (posts || []).forEach((p) => {
      if (!p.created_date) return;
      const key = format(new Date(p.created_date), "yyyy-MM-dd");
      if (!map[key]) map[key] = [];
      map[key].push(p);
    });
    return map;
  }, [posts]);

  const monthPosts = useMemo(
    () => (posts || []).filter((p) => p.created_date && isSameMonth(new Date(p.created_date), cursor)),
    [posts, cursor]
  );

  const coverage = useMemo(() => {
    const counts = {};
    Object.keys(CATEGORY_STYLES).forEach((c) => { counts[c] = 0; });
    monthPosts.forEach((p) => {
      if (counts[p.category] !== undefined) counts[p.category] += 1;
    });
    return counts;
  }, [monthPosts]);

  return (
    <div className="space-y-6">
      {/* Month navigation */}
      <div className="flex items-center justify-between bg-white border border-gray-100 rounded-xl shadow-sm px-4 py-3">
        <button
          onClick={() => setCursor(addMonths(cursor, -1))}
          aria-label="Previous month"
          className="p-2 rounded-lg hover:bg-gray-100 min-w-[44px] min-h-[44px] flex items-center justify-center"
        >
          <ChevronLeft className="w-5 h-5 text-slate-600" />
        </button>
        <h2 className="font-bold text-foreground">{format(cursor, "MMMM yyyy")}</h2>
        <button
          onClick={() => setCursor(addMonths(cursor, 1))}
          aria-label="Next month"
          className="p-2 rounded-lg hover:bg-gray-100 min-w-[44px] min-h-[44px] flex items-center justify-center"
        >
          <ChevronRight className="w-5 h-5 text-slate-600" />
        </button>
      </div>

      {/* Calendar grid */}
      <div className="bg-white border border-gray-100 rounded-xl shadow-sm p-3 overflow-x-auto">
        <div className="min-w-[640px]">
          <div className="grid grid-cols-7 gap-1 mb-1">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
              <div key={d} className="text-center text-xs font-semibold text-slate-400 py-2">
                {d}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-1">
            {days.map((day) => {
              const key = format(day, "yyyy-MM-dd");
              const dayPosts = postsByDay[key] || [];
              const inMonth = isSameMonth(day, cursor);
              return (
                <div
                  key={key}
                  className={`border rounded-lg min-h-[84px] p-1.5 ${
                    inMonth ? "border-gray-100 bg-white" : "border-transparent bg-slate-50 opacity-60"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span
                      className={`text-xs font-semibold ${
                        isToday(day) ? "bg-foreground text-white rounded-full px-1.5" : "text-slate-500"
                      }`}
                    >
                      {format(day, "d")}
                    </span>
                    {dayPosts.length > 0 && (
                      <span className="text-[10px] text-slate-400">{dayPosts.length}</span>
                    )}
                  </div>
                  <div className="space-y-1">
                    {dayPosts.slice(0, 2).map((p) => (
                      <button
                        key={p.id}
                        onClick={() => onEdit(p)}
                        title={p.title}
                        className={`w-full text-left text-[10px] leading-tight px-1.5 py-1 rounded truncate border border-transparent ${styleFor(p.category).chip}`}
                      >
                        {p.title}
                      </button>
                    ))}
                    {dayPosts.length > 2 && (
                      <p className="text-[10px] text-slate-400 px-1">+{dayPosts.length - 2} more</p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Legend + SEO topic coverage */}
      <div className="bg-white border border-gray-100 rounded-xl shadow-sm p-5">
        <h3 className="font-bold text-foreground text-sm mb-1">
          SEO Topic Coverage — {format(cursor, "MMMM yyyy")}
        </h3>
        <p className="text-xs text-slate-400 mb-4">
          {monthPosts.length} post{monthPosts.length === 1 ? "" : "s"} this month · dashed boxes show topics with no coverage yet
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {Object.entries(coverage).map(([cat, count]) => {
            const s = CATEGORY_STYLES[cat];
            return (
              <div
                key={cat}
                className={`flex items-center gap-2 rounded-lg px-3 py-2 text-xs border ${
                  count > 0 ? "border-gray-100" : "border-dashed border-gray-200"
                }`}
              >
                <span className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${s.dot}`} />
                <span className="font-medium text-slate-600">{s.label}</span>
                <span className={`ml-auto font-bold ${count > 0 ? "text-foreground" : "text-slate-300"}`}>
                  {count}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}