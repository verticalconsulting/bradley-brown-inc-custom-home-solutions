// Renovation Planner — pure logic for computing timeline, disruption score, and checklist.

export const PLANNER_QUESTIONS = [
  {
    id: "project_type",
    label: "What type of project are you planning?",
    type: "radio",
    icon: "home",
    options: [
      { value: "kitchen", label: "Kitchen Remodel" },
      { value: "bathroom", label: "Bathroom Remodel" },
      { value: "addition", label: "Room Addition" },
      { value: "whole_home", label: "Whole-Home Renovation" },
      { value: "outdoor", label: "Outdoor Living" },
      { value: "custom_home", label: "Custom Home Build" },
    ],
  },
  {
    id: "scope",
    label: "How large is the project area?",
    type: "radio",
    icon: "ruler",
    options: [
      { value: "small", label: "Small (under 150 sq ft)" },
      { value: "medium", label: "Medium (150–400 sq ft)" },
      { value: "large", label: "Large (400+ sq ft)" },
    ],
  },
  {
    id: "work_from_home",
    label: "Do you work from home?",
    type: "radio",
    icon: "laptop",
    options: [
      { value: "yes", label: "Yes" },
      { value: "no", label: "No" },
    ],
  },
  {
    id: "household",
    label: "Who's at home during the day?",
    type: "multi",
    icon: "users",
    options: [
      { value: "children", label: "Children" },
      { value: "pets", label: "Pets" },
      { value: "seniors", label: "Seniors / Elderly" },
      { value: "none", label: "No one during the day" },
    ],
  },
  {
    id: "accessibility",
    label: "Does anyone in the household have accessibility needs?",
    type: "radio",
    icon: "accessibility",
    options: [
      { value: "yes", label: "Yes" },
      { value: "no", label: "No" },
    ],
  },
  {
    id: "relocate",
    label: "Can you temporarily relocate during construction?",
    type: "radio",
    icon: "map",
    options: [
      { value: "yes", label: "Yes, I can stay elsewhere" },
      { value: "partial", label: "Partially — some rooms only" },
      { value: "no", label: "No, I must stay in the home" },
    ],
  },
  {
    id: "start_timeframe",
    label: "When would you like to start?",
    type: "radio",
    icon: "calendar",
    options: [
      { value: "asap", label: "As soon as possible" },
      { value: "1-3", label: "1–3 months" },
      { value: "3-6", label: "3–6 months" },
      { value: "6+", label: "6+ months out" },
    ],
  },
  {
    id: "disruption_tolerance",
    label: "How much disruption can you comfortably tolerate?",
    type: "radio",
    icon: "gauge",
    options: [
      { value: "minimal", label: "Minimal — I need things quiet" },
      { value: "moderate", label: "Moderate — some noise is fine" },
      { value: "significant", label: "Significant — I can handle it" },
    ],
  },
];

const BASE_WEEKS = {
  kitchen: 4,
  bathroom: 3,
  addition: 8,
  whole_home: 16,
  outdoor: 4,
  custom_home: 24,
};

const SIZE_MULTIPLIER = { small: 0.7, medium: 1, large: 1.4 };

const DISRUPTION_BASE = {
  kitchen: 7,
  bathroom: 5,
  addition: 6,
  whole_home: 9,
  outdoor: 3,
  custom_home: 2,
};

const PROJECT_LABELS = {
  kitchen: "Kitchen Remodel",
  bathroom: "Bathroom Remodel",
  addition: "Room Addition",
  whole_home: "Whole-Home Renovation",
  outdoor: "Outdoor Living",
  custom_home: "Custom Home Build",
};

export function computeTimeline(answers) {
  const base = BASE_WEEKS[answers.project_type] ?? 6;
  const mult = SIZE_MULTIPLIER[answers.scope] ?? 1;
  return Math.ceil(base * mult);
}

export function computeDisruption(answers) {
  let score = DISRUPTION_BASE[answers.project_type] ?? 5;
  if (answers.work_from_home === "yes") score += 2;
  if (answers.household?.includes("children")) score += 1;
  if (answers.household?.includes("pets")) score += 1;
  if (answers.household?.includes("seniors")) score += 1;
  if (answers.accessibility === "yes") score += 1;
  if (answers.relocate === "yes") score -= 3;
  if (answers.relocate === "partial") score -= 1;
  return Math.max(1, Math.min(10, score));
}

export function disruptionLevel(score) {
  if (score <= 3) return { label: "Low", color: "green", desc: "Manageable disruption with minor daily-life adjustments." };
  if (score <= 6) return { label: "Moderate", color: "amber", desc: "Noticeable disruption — temporary routines recommended." };
  if (score <= 8) return { label: "High", color: "orange", desc: "Significant disruption — plan alternative living arrangements." };
  return { label: "Severe", color: "red", desc: "Major disruption — temporary relocation strongly advised." };
}

export function buildChecklist(answers) {
  const type = answers.project_type;
  const items = [];

  items.push({ category: "General", item: "Clear the work area of personal belongings and furniture" });
  items.push({ category: "General", item: "Set up a temporary space for daily activities away from the construction zone" });
  items.push({ category: "General", item: "Review and sign the project contract and scope of work" });
  items.push({ category: "General", item: "Confirm a project communication plan with your contractor (weekly check-ins)" });

  if (type === "kitchen") {
    items.push({ category: "Kitchen", item: "Set up a temporary kitchen station (microwave, mini fridge, paper plates)" });
    items.push({ category: "Kitchen", item: "Meal-plan for the duration — stock easy/no-cook meals or budget for takeout" });
    items.push({ category: "Kitchen", item: "Box up pantry items and fragile dishware before demolition starts" });
  }
  if (type === "bathroom") {
    items.push({ category: "Bathroom", item: "Ensure an alternate bathroom is available and accessible" });
    items.push({ category: "Bathroom", item: "Remove toiletries, medications, and towels from the work area" });
    items.push({ category: "Bathroom", item: "Stock extra towels and cleaning supplies for dust management" });
  }
  if (type === "whole_home" || type === "custom_home") {
    items.push({ category: "Logistics", item: "Arrange off-site storage for furniture and valuables" });
    items.push({ category: "Logistics", item: "Plan a temporary living arrangement for the construction period" });
    items.push({ category: "Logistics", item: "Forward mail and update temporary address if relocating" });
  }
  if (type === "addition") {
    items.push({ category: "Addition", item: "Mark utility line locations before excavation begins" });
    items.push({ category: "Addition", item: "Confirm permit approvals and HOA approvals are in hand" });
  }
  if (type === "outdoor") {
    items.push({ category: "Outdoor", item: "Mark irrigation lines and underground utilities" });
    items.push({ category: "Outdoor", item: "Plan for weather contingencies and material storage" });
  }

  if (answers.work_from_home === "yes") {
    items.push({ category: "Work From Home", item: "Identify a quiet workspace away from construction noise" });
    items.push({ category: "Work From Home", item: "Coordinate meeting schedules around expected noisy work hours" });
    items.push({ category: "Work From Home", item: "Consider a co-working space or library for key deadline days" });
  }
  if (answers.household?.includes("children")) {
    items.push({ category: "Family", item: "Establish a safety perimeter and explain construction zones to children" });
    items.push({ category: "Family", item: "Arrange childcare during peak demolition and framing days" });
  }
  if (answers.household?.includes("pets")) {
    items.push({ category: "Pets", item: "Set up a safe, quiet area for pets away from construction" });
    items.push({ category: "Pets", item: "Keep pet routines consistent to reduce stress" });
    items.push({ category: "Pets", item: "Watch for open doors — brief workers on pet containment" });
  }
  if (answers.household?.includes("seniors")) {
    items.push({ category: "Seniors", item: "Ensure clear, slip-free pathways to essential rooms" });
    items.push({ category: "Seniors", item: "Coordinate medication and mobility access during construction" });
  }
  if (answers.accessibility === "yes") {
    items.push({ category: "Accessibility", item: "Plan temporary accessible routes and keep them clear" });
    items.push({ category: "Accessibility", item: "Coordinate accessibility modifications with the contractor early" });
  }
  if (answers.relocate === "yes") {
    items.push({ category: "Relocation", item: "Book temporary housing well in advance of the start date" });
    items.push({ category: "Relocation", item: "Pack essentials separately for your temporary stay" });
    items.push({ category: "Relocation", item: "Schedule a final walkthrough and handover of keys/access" });
  }
  if (answers.relocate === "partial") {
    items.push({ category: "Relocation", item: "Seal off construction zones with dust barriers and zip walls" });
    items.push({ category: "Relocation", item: "Protect HVAC returns from construction dust with filters" });
  }
  if (answers.start_timeframe === "asap") {
    items.push({ category: "Timeline", item: "Prioritize contractor availability — book immediately to secure your slot" });
    items.push({ category: "Timeline", item: "Order materials with long lead times now to avoid delays" });
  }
  if (answers.disruption_tolerance === "minimal") {
    items.push({ category: "Comfort", item: "Schedule the noisiest work (demolition, framing) in concentrated blocks" });
    items.push({ category: "Comfort", item: "Invest in dust containment and air filtration for occupied areas" });
  }

  return items;
}

export function computeResults(answers) {
  const timelineWeeks = computeTimeline(answers);
  const disruptionScore = computeDisruption(answers);
  const level = disruptionLevel(disruptionScore);
  const checklist = buildChecklist(answers);

  return {
    projectLabel: PROJECT_LABELS[answers.project_type] || "Your Project",
    timelineWeeks,
    timelineRange: `${Math.max(1, timelineWeeks - 1)}–${timelineWeeks + 2} weeks`,
    disruptionScore,
    disruptionLabel: level.label,
    disruptionColor: level.color,
    disruptionDesc: level.desc,
    checklist,
  };
}

export function answersToSummary(answers) {
  const lines = [];
  PLANNER_QUESTIONS.forEach((q) => {
    const a = answers[q.id];
    if (!a) return;
    if (q.type === "multi") {
      const labels = q.options.filter((o) => a.includes(o.value)).map((o) => o.label);
      lines.push(`${q.label} ${labels.join(", ")}`);
    } else {
      const opt = q.options.find((o) => o.value === a);
      lines.push(`${q.label} ${opt?.label || a}`);
    }
  });
  return lines.join("\n");
}