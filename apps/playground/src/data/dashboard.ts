export type MetricTone = "success" | "primary" | "warning";

export type Metric = {
  label: string;
  value: string;
  delta: string;
  tone: MetricTone;
};

export type AccountHealth = "Healthy" | "Watch" | "At risk";

export type Account = {
  name: string;
  plan: string;
  owner: string;
  mrr: string;
  health: AccountHealth;
  usage: string;
};

export type ActivityStatus = "success" | "warning" | "primary" | "neutral";

export type ActivityItem = {
  title: string;
  time: string;
  status: ActivityStatus;
};

export const metrics: Metric[] = [
  { label: "MRR", value: "$128.4k", delta: "+12.8%", tone: "success" },
  { label: "Active accounts", value: "2,418", delta: "+8.1%", tone: "success" },
  { label: "Net retention", value: "118%", delta: "+3.4%", tone: "primary" },
  { label: "Open risk", value: "14", delta: "-5 this week", tone: "warning" }
];

export const accounts: Account[] = [
  { name: "Northstar Labs", plan: "Enterprise", owner: "Mina Park", mrr: "$18,400", health: "Healthy", usage: "86%" },
  { name: "Orbit Systems", plan: "Scale", owner: "Theo Grant", mrr: "$12,900", health: "Watch", usage: "64%" },
  { name: "Clearbit Studio", plan: "Growth", owner: "Ari Chen", mrr: "$8,750", health: "Healthy", usage: "79%" },
  { name: "Pioneer Ops", plan: "Enterprise", owner: "Nora Lee", mrr: "$22,100", health: "At risk", usage: "41%" },
  { name: "Helix Analytics", plan: "Scale", owner: "Sasha Vu", mrr: "$10,250", health: "Healthy", usage: "73%" },
  { name: "Lumen Forge", plan: "Growth", owner: "Ravi Shah", mrr: "$6,400", health: "Watch", usage: "58%" },
  { name: "Vector Bay", plan: "Enterprise", owner: "Jin Wu", mrr: "$27,800", health: "Healthy", usage: "91%" },
  { name: "Quartz Field", plan: "Growth", owner: "Lena Kim", mrr: "$4,950", health: "At risk", usage: "34%" }
];

export const activity: ActivityItem[] = [
  { title: "Northstar renewed annual contract", time: "12 min ago", status: "success" },
  { title: "Pioneer Ops crossed risk threshold", time: "38 min ago", status: "warning" },
  { title: "Orbit requested SSO rollout", time: "2 hr ago", status: "primary" },
  { title: "Clearbit invited 18 teammates", time: "4 hr ago", status: "neutral" }
];

export const chartBars = [42, 58, 51, 74, 68, 88, 79, 94, 86, 101, 96, 112];

export function healthVariant(health: AccountHealth) {
  if (health === "Healthy") return "success" as const;
  if (health === "Watch") return "warning" as const;
  return "destructive" as const;
}
