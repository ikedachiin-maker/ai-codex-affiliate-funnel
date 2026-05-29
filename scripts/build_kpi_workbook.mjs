import fs from "node:fs/promises";
import { SpreadsheetFile, Workbook } from "@oai/artifact-tool";

const workbook = Workbook.create();
const dashboard = workbook.worksheets.add("Dashboard");
const tracker = workbook.worksheets.add("Daily Tracker");
const assumptions = workbook.worksheets.add("Assumptions");
const checklist = workbook.worksheets.add("Launch Checklist");

assumptions.getRange("A1:B9").values = [
  ["Metric", "Value"],
  ["Codex reward per sale", 2490],
  ["Meikyo reward per sale", 14900],
  ["Target monthly revenue", 1000000],
  ["Target LINE registrations", 1500],
  ["Target Codex sales", 100],
  ["Target Meikyo sales", 50],
  ["Front product URL", "[CODEX_BRAIN_AFFILIATE_URL]"],
  ["Backend product URL", "[MEIKYO_BRAIN_AFFILIATE_URL]"],
];

tracker.getRange("A1:M1").values = [[
  "Date",
  "X Posts",
  "Impressions",
  "Profile Clicks",
  "LINE Registrations",
  "Codex Clicks",
  "Codex Sales",
  "Meikyo Clicks",
  "Meikyo Sales",
  "Codex Reward",
  "Meikyo Reward",
  "Total Reward",
  "Notes",
]];

const rows = [];
const start = new Date("2026-05-27T00:00:00+09:00");
for (let i = 0; i < 90; i += 1) {
  const d = new Date(start);
  d.setDate(start.getDate() + i);
  rows.push([d, "", "", "", "", "", "", "", "", "", "", "", ""]);
}
tracker.getRange("A2:M91").values = rows;
tracker.getRange("J2:J91").formulas = Array.from({ length: 90 }, (_, i) => [`=IF(G${i + 2}="","",G${i + 2}*Assumptions!$B$2)`]);
tracker.getRange("K2:K91").formulas = Array.from({ length: 90 }, (_, i) => [`=IF(I${i + 2}="","",I${i + 2}*Assumptions!$B$3)`]);
tracker.getRange("L2:L91").formulas = Array.from({ length: 90 }, (_, i) => [`=IF(AND(J${i + 2}="",K${i + 2}=""),"",SUM(J${i + 2}:K${i + 2}))`]);

dashboard.getRange("A1:H1").values = [["Codex x AI Marketing Affiliate Funnel KPI Dashboard", "", "", "", "", "", "", ""]];
dashboard.getRange("A3:B12").values = [
  ["KPI", "Value"],
  ["X Posts", ""],
  ["Impressions", ""],
  ["Profile Clicks", ""],
  ["LINE Registrations", ""],
  ["Codex Clicks", ""],
  ["Codex Sales", ""],
  ["Meikyo Clicks", ""],
  ["Meikyo Sales", ""],
  ["Estimated Reward", ""],
];
dashboard.getRange("B4:B12").formulas = [
  ["=SUM('Daily Tracker'!B2:B91)"],
  ["=SUM('Daily Tracker'!C2:C91)"],
  ["=SUM('Daily Tracker'!D2:D91)"],
  ["=SUM('Daily Tracker'!E2:E91)"],
  ["=SUM('Daily Tracker'!F2:F91)"],
  ["=SUM('Daily Tracker'!G2:G91)"],
  ["=SUM('Daily Tracker'!H2:H91)"],
  ["=SUM('Daily Tracker'!I2:I91)"],
  ["=SUM('Daily Tracker'!L2:L91)"],
];
dashboard.getRange("D3:H8").values = [
  ["Funnel Rate", "Formula", "Current", "Target", "Status"],
  ["Profile CTR", "Profile Clicks / Impressions", "", 0.01, ""],
  ["LINE CVR", "LINE Reg / Profile Clicks", "", 0.2, ""],
  ["Codex CVR", "Codex Sales / Codex Clicks", "", 0.05, ""],
  ["Meikyo CVR", "Meikyo Sales / Meikyo Clicks", "", 0.02, ""],
  ["Revenue Progress", "Reward / Target", "", 1, ""],
];
dashboard.getRange("F4:F8").formulas = [
  ["=IFERROR(B6/B5,0)"],
  ["=IFERROR(B7/B6,0)"],
  ["=IFERROR(B9/B8,0)"],
  ["=IFERROR(B11/B10,0)"],
  ["=IFERROR(B12/Assumptions!$B$4,0)"],
];
dashboard.getRange("H4:H8").formulas = [
  ["=IF(F4>=G4,\"OK\",\"Needs work\")"],
  ["=IF(F5>=G5,\"OK\",\"Needs work\")"],
  ["=IF(F6>=G6,\"OK\",\"Needs work\")"],
  ["=IF(F7>=G7,\"OK\",\"Needs work\")"],
  ["=IF(F8>=G8,\"OK\",\"Needs work\")"],
];

checklist.getRange("A1:C14").values = [
  ["Item", "Status", "Notes"],
  ["LINE opt-in URL inserted", "TODO", "[LINE_OPTIN_URL]"],
  ["Codex affiliate URL inserted", "TODO", "[CODEX_BRAIN_AFFILIATE_URL]"],
  ["Meikyo affiliate URL inserted", "TODO", "[MEIKYO_BRAIN_AFFILIATE_URL]"],
  ["Disclosure text inserted", "TODO", "[DISCLOSURE_TEXT]"],
  ["X profile updated", "TODO", ""],
  ["Pinned post published", "TODO", ""],
  ["Lead magnet uploaded", "TODO", ""],
  ["LINE sequence registered", "TODO", ""],
  ["Codex review published", "TODO", ""],
  ["Meikyo review published", "TODO", ""],
  ["Bridge articles published", "TODO", ""],
  ["100 X posts queued", "TODO", ""],
  ["Compliance review complete", "TODO", ""],
];

for (const sheet of [dashboard, tracker, assumptions, checklist]) {
  sheet.getRange("A1:Z1").format = { font: { bold: true } };
}
dashboard.getRange("A:A").format.columnWidthPx = 180;
dashboard.getRange("B:B").format.columnWidthPx = 120;
dashboard.getRange("D:D").format.columnWidthPx = 160;
dashboard.getRange("E:E").format.columnWidthPx = 230;
dashboard.getRange("F:H").format.columnWidthPx = 120;
dashboard.getRange("F4:G8").format.numberFormat = "0.0%";
dashboard.getRange("B12:B12").format.numberFormat = "#,##0";
tracker.getRange("A:A").format.columnWidthPx = 115;
tracker.getRange("B:L").format.columnWidthPx = 110;
tracker.getRange("M:M").format.columnWidthPx = 260;
tracker.getRange("J:L").format.numberFormat = "#,##0";
assumptions.getRange("A:A").format.columnWidthPx = 220;
assumptions.getRange("B:B").format.columnWidthPx = 260;
checklist.getRange("A:A").format.columnWidthPx = 260;
checklist.getRange("B:B").format.columnWidthPx = 120;
checklist.getRange("C:C").format.columnWidthPx = 320;

const outputDir = new URL("../outputs/", import.meta.url);
await fs.mkdir(outputDir, { recursive: true });
const output = await SpreadsheetFile.exportXlsx(workbook);
await output.save(new URL("codex_ai_affiliate_kpi.xlsx", outputDir).pathname);

const scan = await workbook.inspect({
  kind: "match",
  searchTerm: "#REF!|#DIV/0!|#VALUE!|#NAME\\?|#N/A",
  options: { useRegex: true, maxResults: 100 },
  summary: "formula error scan",
});
console.log(scan.ndjson);
