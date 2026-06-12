"use client";

import { useRef, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  defaultEmissionFactorSet,
  factorUnits,
  factorsToInputValues,
  findRegionEmissionFactorSet,
} from "../lib/regionEmissionFactors";

const text = {
  eyebrow: "\u5efa\u7b51\u5168\u751f\u547d\u5468\u671f\u78b3\u6392\u653e\u6d4b\u7b97\u5de5\u5177",
  title: "\u5efa\u7b51\u78b3\u6392\u653e\u5feb\u901f\u4f30\u7b97\u5668",
  subtitle:
    "\u7528\u4e8e\u5efa\u7b51\u65b9\u6848\u9636\u6bb5\u7684\u78b3\u6392\u653e\u521d\u6b65\u6d4b\u7b97\u4e0e\u7ed3\u679c\u53ef\u89c6\u5316",
  inputTitle: "\u8f93\u5165\u533a",
  inputIntro:
    "\u586b\u5199\u5efa\u7b51\u65b9\u6848\u3001\u8fd0\u884c\u80fd\u8017\u3001\u5efa\u6750\u7528\u91cf\u548c\u78b3\u6392\u653e\u56e0\u5b50",
  stage: "\u7b2c\u4e5d\u9636\u6bb5",
  toolIntro:
    "\u5efa\u7b51\u78b3\u6392\u653e\u5feb\u901f\u4f30\u7b97\u5668\u662f\u4e00\u6b3e\u9762\u5411\u5efa\u7b51\u65b9\u6848\u9636\u6bb5\u3001\u8bfe\u7a0b\u4f5c\u4e1a\u3001\u8bfe\u9898\u6c47\u62a5\u548c\u4f4e\u78b3\u8bbe\u8ba1\u521d\u6b65\u5206\u6790\u7684\u5728\u7ebf\u8ba1\u7b97\u5de5\u5177\u3002",
  scenariosTitle: "\u9002\u7528\u573a\u666f",
  serviceTitle: "\u670d\u52a1\u8bf4\u660e",
  serviceDescription:
    "\u5982\u9700\u5b9a\u5236\u5efa\u7b51\u78b3\u6392\u653e\u8ba1\u7b97\u62a5\u544a\u3001\u4f4e\u78b3\u5efa\u7b51\u8bc4\u4ef7\u5de5\u5177\u6216\u8bfe\u9898\u7ec4\u5c55\u793a\u7cfb\u7edf\uff0c\u53ef\u8054\u7cfb\u5f00\u53d1\u8005\u3002",
  contactTitle: "\u8054\u7cfb\u4fe1\u606f",
  wechat: "\u5fae\u4fe1",
  email: "\u90ae\u7bb1",
  wechatPlaceholder: "\u8bf7\u586b\u5199\u4f60\u7684\u5fae\u4fe1",
  emailPlaceholder: "\u8bf7\u586b\u5199\u4f60\u7684\u90ae\u7bb1",
  disclaimerTitle: "\u514d\u8d23\u58f0\u660e",
  disclaimer:
    "\u672c\u5de5\u5177\u4ec5\u7528\u4e8e\u65b9\u6848\u9636\u6bb5\u5feb\u901f\u4f30\u7b97\u548c\u6559\u5b66\u79d1\u7814\u8f85\u52a9\uff0c\u4e0d\u4f5c\u4e3a\u6b63\u5f0f\u78b3\u6838\u7b97\u3001\u78b3\u5ba1\u8ba1\u6216\u6cd5\u5b9a\u8bc4\u4ef7\u4f9d\u636e\u3002",
  basicInfo: "\u57fa\u7840\u4fe1\u606f",
  buildingName: "\u5efa\u7b51\u540d\u79f0",
  buildingType: "\u5efa\u7b51\u7c7b\u578b",
  region: "\u6240\u5728\u5730\u533a",
  area: "\u5efa\u7b51\u9762\u79ef",
  lifeSpan: "\u5efa\u7b51\u5bff\u547d",
  operationInput: "\u8fd0\u884c\u80fd\u8017\u8f93\u5165",
  annualElectricity: "\u5e74\u7528\u7535\u91cf",
  annualGas: "\u5e74\u5929\u7136\u6c14\u7528\u91cf",
  materialInput: "\u5efa\u6750\u7528\u91cf\u8f93\u5165",
  concrete: "\u6df7\u51dd\u571f",
  steel: "\u94a2\u7b4b",
  glass: "\u73bb\u7483",
  aluminum: "\u94dd\u6750",
  factorSettings: "\u78b3\u6392\u653e\u56e0\u5b50\u8bbe\u7f6e",
  electricityFactor: "\u7535\u529b",
  gasFactor: "\u5929\u7136\u6c14",
  heatingFactor: "\u4f9b\u70ed",
  coolingFactor: "\u5236\u51b7",
  insulationFactor: "\u4fdd\u6e29\u6750\u6599",
  blockFactor: "\u780c\u5757",
  resetFactors: "\u6062\u590d\u9ed8\u8ba4\u56e0\u5b50",
  matchRegionFactors: "\u5339\u914d\u5730\u533a\u56e0\u5b50",
  rematchRegionFactors: "\u91cd\u65b0\u5339\u914d\u5730\u533a\u56e0\u5b50",
  factorGroup: "\u5f53\u524d\u56e0\u5b50\u7ec4",
  factorStatus: "\u56e0\u5b50\u72b6\u6001",
  factorSource: "\u56e0\u5b50\u6765\u6e90",
  userCorrection: "\u7528\u6237\u4fee\u6b63",
  notModified: "\u672a\u624b\u52a8\u4fee\u6b63",
  modified: "\u5df2\u624b\u52a8\u4fee\u6b63\u90e8\u5206\u56e0\u5b50",
  matchedPrefix: "\u5df2\u5339\u914d\uff1a",
  unmatchedMessage:
    "\u6682\u672a\u5339\u914d\u5230\u8be5\u5730\u533a\u4e13\u5c5e\u56e0\u5b50\uff0c\u5f53\u524d\u4f7f\u7528\u9ed8\u8ba4\u78b3\u6392\u653e\u56e0\u5b50\u3002",
  factorLibraryNote:
    "\u4e0d\u540c\u5730\u533a\u3001\u4e0d\u540c\u6807\u51c6\u3001\u4e0d\u540c\u80fd\u6e90\u7ed3\u6784\u548c\u6750\u6599\u751f\u4ea7\u5de5\u827a\u4e0b\uff0c\u78b3\u6392\u653e\u56e0\u5b50\u53ef\u80fd\u5b58\u5728\u5dee\u5f02\u3002\u672c\u5de5\u5177\u5f53\u524d\u63d0\u4f9b\u5730\u533a\u56e0\u5b50\u5339\u914d\u673a\u5236\uff0c\u5185\u7f6e\u6570\u503c\u4e3a\u793a\u4f8b\u6570\u636e\u5e93\uff0c\u6b63\u5f0f\u6838\u7b97\u65f6\u5e94\u4f9d\u636e\u6700\u65b0\u5b98\u65b9\u53d1\u5e03\u7684\u533a\u57df\u7535\u7f51\u6392\u653e\u56e0\u5b50\u3001\u5730\u65b9\u6807\u51c6\u3001\u9879\u76ee\u6307\u5b9a\u6570\u636e\u5e93\u6216\u6743\u5a01 LCA \u6570\u636e\u5e93\u8fdb\u884c\u66ff\u6362\u3002",
  calculate: "\u5f00\u59cb\u8ba1\u7b97",
  resultTitle: "\u7ed3\u679c\u9884\u89c8\u533a",
  resultIntro:
    "\u70b9\u51fb\u5f00\u59cb\u8ba1\u7b97\u540e\u663e\u793a\u57fa\u7840\u78b3\u6392\u653e\u4f30\u7b97\u7ed3\u679c",
  totalCarbon: "\u603b\u78b3\u6392\u653e",
  areaCarbon: "\u5355\u4f4d\u9762\u79ef\u78b3\u6392\u653e",
  materialCarbon: "\u5efa\u6750\u9636\u6bb5\u78b3\u6392\u653e",
  operationCarbon: "\u8fd0\u884c\u9636\u6bb5\u78b3\u6392\u653e",
  pending: "\u5f85\u8ba1\u7b97",
  emptyArea: "\u2014",
  placeholderProject: "\u4f8b\u5982\uff1a\u67d0\u6559\u5b66\u697c\u65b9\u6848",
  placeholderRegion: "\u4f8b\u5982\uff1a\u5317\u4eac\u3001\u4e0a\u6d77\u3001\u5e7f\u5dde",
  placeholderArea: "\u4f8b\u5982\uff1a12000",
  placeholderZero: "\u672a\u586b\u5199\u6309 0 \u5904\u7406",
  factorNote:
    "\u5f53\u524d\u7ed3\u679c\u4f7f\u7528\u8f93\u5165\u533a\u4e2d\u8bbe\u7f6e\u7684\u78b3\u6392\u653e\u56e0\u5b50\u8fdb\u884c\u8ba1\u7b97\u3002",
  footerNote:
    "\u672c\u5de5\u5177\u7528\u4e8e\u65b9\u6848\u9636\u6bb5\u5feb\u901f\u4f30\u7b97\uff0c\u78b3\u6392\u653e\u56e0\u5b50\u53ef\u6839\u636e\u5177\u4f53\u5730\u533a\u3001\u6807\u51c6\u6216\u6570\u636e\u5e93\u8fdb\u884c\u4fee\u6b63\u3002",
  stageChartTitle: "\u78b3\u6392\u653e\u9636\u6bb5\u5360\u6bd4\u56fe",
  materialChartTitle: "\u5efa\u6750\u78b3\u6392\u653e\u8d21\u732e\u56fe",
  chartUnit: "tCO2e",
  analysisTitle: "\u81ea\u52a8\u5206\u6790\u7ed3\u8bba",
  operationMainSource:
    "\u4e3b\u8981\u78b3\u6392\u653e\u6765\u6e90\u4e3a\u5efa\u7b51\u8fd0\u884c\u80fd\u8017\u3002",
  materialMainSource:
    "\u4e3b\u8981\u78b3\u6392\u653e\u6765\u6e90\u4e3a\u5efa\u6750\u751f\u4ea7\u9636\u6bb5\u3002",
  operationSuggestion:
    "\u5efa\u8bae\u4f18\u5316\u56f4\u62a4\u7ed3\u6784\u6027\u80fd\u3001\u63d0\u9ad8\u8bbe\u5907\u80fd\u6548\u3001\u964d\u4f4e\u7528\u7535\u5f3a\u5ea6\uff0c\u5e76\u589e\u52a0\u53ef\u518d\u751f\u80fd\u6e90\u5229\u7528\u3002",
  materialSuggestion:
    "\u5efa\u8bae\u4f18\u5316\u7ed3\u6784\u7528\u91cf\u3001\u9009\u7528\u4f4e\u78b3\u6df7\u51dd\u571f\u548c\u518d\u751f\u94a2\u6750\uff0c\u5e76\u964d\u4f4e\u9ad8\u78b3\u6750\u6599\u4f7f\u7528\u6bd4\u4f8b\u3002",
  materialNoInput:
    "\u5404\u7c7b\u5efa\u6750\u78b3\u6392\u653e\u5747\u4e3a 0\uff0c\u6682\u65f6\u65e0\u6cd5\u8bc6\u522b\u4e3b\u8981\u5efa\u6750\u8d21\u732e\u9879\u3002",
  exportPdf: "\u5bfc\u51fa PDF \u62a5\u544a",
  exportingPdf: "\u6b63\u5728\u5bfc\u51fa...",
  reportTitle: "\u5efa\u7b51\u78b3\u6392\u653e\u5feb\u901f\u4f30\u7b97\u62a5\u544a",
  projectInfo: "\u4e00\u3001\u9879\u76ee\u57fa\u672c\u4fe1\u606f",
  inputData: "\u4e8c\u3001\u8f93\u5165\u6570\u636e",
  factorData: "\u4e09\u3001\u78b3\u6392\u653e\u56e0\u5b50",
  factorGroupData: "\u4e09\u3001\u5730\u533a\u56e0\u5b50\u7ec4\u4fe1\u606f",
  resultData: "\u56db\u3001\u8ba1\u7b97\u7ed3\u679c",
  analysisData: "\u4e94\u3001\u81ea\u52a8\u5206\u6790\u7ed3\u8bba",
  annualOperationCarbon:
    "\u8fd0\u884c\u9636\u6bb5\u5e74\u78b3\u6392\u653e",
};

const scenarios = [
  "\u8bfe\u7a0b\u4f5c\u4e1a",
  "\u8bfe\u9898\u6c47\u62a5",
  "\u5efa\u7b51\u65b9\u6848\u6bd4\u9009",
  "\u4f4e\u78b3\u8bbe\u8ba1\u521d\u6b65\u8bc4\u4f30",
  "\u8bba\u6587\u56fe\u8868\u8f85\u52a9\u751f\u6210",
];

const buildingTypes = [
  "\u4f4f\u5b85",
  "\u529e\u516c",
  "\u5b66\u6821",
  "\u5546\u4e1a",
  "\u533b\u9662",
  "\u5176\u4ed6",
];

const defaultFactorInputs = factorsToInputValues(defaultEmissionFactorSet.factors);

const factorFields = [
  { name: "electricity", label: text.electricityFactor, unit: factorUnits.electricity },
  { name: "naturalGas", label: text.gasFactor, unit: factorUnits.naturalGas },
  { name: "concrete", label: text.concrete, unit: factorUnits.concrete },
  { name: "steel", label: text.steel, unit: factorUnits.steel },
  { name: "glass", label: text.glass, unit: factorUnits.glass },
  { name: "aluminum", label: text.aluminum, unit: factorUnits.aluminum },
];

const reportFactorFields = [
  { name: "electricity", label: text.electricityFactor, unit: factorUnits.electricity },
  { name: "naturalGas", label: text.gasFactor, unit: factorUnits.naturalGas },
  { name: "heating", label: text.heatingFactor, unit: factorUnits.heating },
  { name: "cooling", label: text.coolingFactor, unit: factorUnits.cooling },
  { name: "concrete", label: text.concrete, unit: factorUnits.concrete },
  { name: "steel", label: text.steel, unit: factorUnits.steel },
  { name: "glass", label: text.glass, unit: factorUnits.glass },
  { name: "aluminum", label: text.aluminum, unit: factorUnits.aluminum },
  { name: "insulation", label: text.insulationFactor, unit: factorUnits.insulation },
  { name: "block", label: text.blockFactor, unit: factorUnits.block },
];

const initialForm = {
  buildingName: "",
  buildingType: buildingTypes[0],
  region: "",
  area: "",
  lifeSpan: "50",
  annualElectricity: "",
  annualGas: "",
  concrete: "",
  steel: "",
  glass: "",
  aluminum: "",
};

function toNumber(value) {
  const number = Number(value);
  return Number.isFinite(number) && number > 0 ? number : 0;
}

function kgToTon(value) {
  return value / 1000;
}

function formatTon(value) {
  return `${kgToTon(value).toLocaleString("zh-CN", {
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
  })} tCO2e`;
}

function formatAreaValue(value) {
  if (value === null) {
    return text.emptyArea;
  }

  return `${value.toLocaleString("zh-CN", {
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
  })} kgCO2e/m\u00b2`;
}

function formatAreaForAnalysis(value) {
  if (value === null) {
    return text.emptyArea;
  }

  return `${value.toLocaleString("zh-CN", {
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
  })} kgCO2e/m\u00b2`;
}

function displayText(value) {
  return value ? value : "\u672a\u586b\u5199";
}

function displayNumber(value, unit) {
  const number = toNumber(value);
  return `${number.toLocaleString("zh-CN", {
    maximumFractionDigits: 2,
  })} ${unit}`;
}

function displayFactor(value, unit) {
  const number = toNumber(value);
  return `${number.toLocaleString("zh-CN", {
    maximumFractionDigits: 4,
  })} ${unit}`;
}

function formatChartValue(value) {
  return `${value.toLocaleString("zh-CN", {
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
  })} ${text.chartUnit}`;
}

function buildAnalysis(results) {
  const operationIsMain = results.operationCarbon > results.materialCarbon;
  const mainSource = operationIsMain
    ? text.operationMainSource
    : text.materialMainSource;
  const suggestion = operationIsMain
    ? text.operationSuggestion
    : text.materialSuggestion;
  const topMaterial = results.materialItems.reduce((current, item) =>
    item.value > current.value ? item : current,
  );
  const materialSummary =
    topMaterial.value > 0
      ? `\u5728\u5efa\u6750\u5206\u9879\u4e2d\uff0c${topMaterial.name}\u78b3\u6392\u653e\u6700\u9ad8\uff0c\u4e3a ${formatChartValue(
          topMaterial.value,
        )}\u3002`
      : text.materialNoInput;

  return `\u672c\u5efa\u7b51\u5168\u751f\u547d\u5468\u671f\u4f30\u7b97\u603b\u78b3\u6392\u653e\u4e3a ${formatTon(
    results.totalCarbon,
  )}\uff0c\u5355\u4f4d\u9762\u79ef\u78b3\u6392\u653e\u4e3a ${formatAreaForAnalysis(
    results.areaCarbon,
  )}\u3002${mainSource}${materialSummary}${suggestion}`;
}

function ChartTooltip({ active, payload }) {
  if (!active || !payload || payload.length === 0) {
    return null;
  }

  const item = payload[0];

  return (
    <div className="rounded border border-slate-200 bg-white px-3 py-2 text-sm shadow-sm">
      <p className="font-medium text-slate-700">{item.name}</p>
      <p className="text-slate-600">{formatChartValue(item.value)}</p>
    </div>
  );
}

function Field({ label, unit, children }) {
  return (
    <label className="grid gap-2">
      <span className="text-sm font-medium text-slate-700">
        {label}
        {unit ? <span className="font-normal text-slate-500"> {unit}</span> : null}
      </span>
      {children}
    </label>
  );
}

function ReportSection({ title, rows }) {
  return (
    <section className="mt-6">
      <h2 className="border-b border-slate-300 pb-2 text-lg font-semibold text-slate-950">
        {title}
      </h2>
      <div className="mt-3 grid grid-cols-2 gap-x-6 gap-y-2 text-sm text-slate-700">
        {rows.map((row) => (
          <div
            className="flex justify-between gap-4 border-b border-slate-100 py-2"
            key={row.label}
          >
            <span className="text-slate-500">{row.label}</span>
            <span className="text-right font-medium text-slate-900">
              {row.value}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}

function PdfReport({
  analysis,
  factorSet,
  factors,
  form,
  hasManualFactorEdit,
  results,
}) {
  if (!results) {
    return null;
  }

  const projectRows = [
    { label: text.buildingName, value: displayText(form.buildingName) },
    { label: text.buildingType, value: form.buildingType },
    { label: text.region, value: displayText(form.region) },
    { label: text.area, value: displayNumber(form.area, "m\u00b2") },
    { label: text.lifeSpan, value: displayNumber(form.lifeSpan, "\u5e74") },
  ];
  const inputRows = [
    {
      label: text.annualElectricity,
      value: displayNumber(form.annualElectricity, "kWh/\u5e74"),
    },
    { label: text.annualGas, value: displayNumber(form.annualGas, "m\u00b3/\u5e74") },
    { label: text.concrete, value: displayNumber(form.concrete, "m\u00b3") },
    { label: text.steel, value: displayNumber(form.steel, "t") },
    { label: text.glass, value: displayNumber(form.glass, "m\u00b2") },
    { label: text.aluminum, value: displayNumber(form.aluminum, "t") },
  ];
  const factorGroupRows = [
    { label: text.region, value: displayText(form.region) },
    { label: text.factorGroup, value: factorSet.displayName },
    { label: text.factorStatus, value: factorSet.sourceType },
    { label: text.factorSource, value: factorSet.sourceNote },
    {
      label: text.userCorrection,
      value: hasManualFactorEdit ? text.modified : text.notModified,
    },
  ];
  const factorRows = reportFactorFields.map((field) => ({
    label: field.label,
    value: displayFactor(factors[field.name], field.unit),
  }));
  const resultRows = [
    { label: text.materialCarbon, value: formatTon(results.materialCarbon) },
    {
      label: text.annualOperationCarbon,
      value: formatTon(results.annualOperationCarbon),
    },
    { label: text.operationCarbon, value: formatTon(results.operationCarbon) },
    { label: text.totalCarbon, value: formatTon(results.totalCarbon) },
    { label: text.areaCarbon, value: formatAreaValue(results.areaCarbon) },
  ];

  return (
    <div className="bg-white p-10 text-slate-950" style={{ width: "794px" }}>
      <header className="border-b-2 border-slate-900 pb-5">
        <h1 className="text-3xl font-semibold">{text.reportTitle}</h1>
        <p className="mt-3 text-sm leading-6 text-slate-600">
          {text.footerNote}
        </p>
      </header>

      <ReportSection rows={projectRows} title={text.projectInfo} />
      <ReportSection rows={inputRows} title={text.inputData} />
      <ReportSection rows={factorGroupRows} title={text.factorGroupData} />
      <ReportSection rows={factorRows} title={text.factorData} />
      <ReportSection rows={resultRows} title={text.resultData} />

      <section className="mt-6">
        <h2 className="border-b border-slate-300 pb-2 text-lg font-semibold text-slate-950">
          {text.analysisData}
        </h2>
        <p className="mt-3 text-sm leading-7 text-slate-700">{analysis}</p>
      </section>
    </div>
  );
}

export default function Home() {
  const [form, setForm] = useState(initialForm);
  const [factorInputs, setFactorInputs] = useState(defaultFactorInputs);
  const [currentFactorSet, setCurrentFactorSet] = useState(defaultEmissionFactorSet);
  const [hasManualFactorEdit, setHasManualFactorEdit] = useState(false);
  const [factorMatchMessage, setFactorMatchMessage] = useState("");
  const [results, setResults] = useState(null);
  const [isExporting, setIsExporting] = useState(false);
  const reportRef = useRef(null);

  function updateField(name, value) {
    setForm((current) => ({
      ...current,
      [name]: value,
    }));
  }

  function updateFactor(name, value) {
    setFactorInputs((current) => ({
      ...current,
      [name]: value,
    }));
    setHasManualFactorEdit(true);
  }

  function resetFactors() {
    setFactorInputs(defaultFactorInputs);
    setCurrentFactorSet(defaultEmissionFactorSet);
    setHasManualFactorEdit(false);
    setFactorMatchMessage("");
  }

  function applyFactorSet(factorSet) {
    setFactorInputs(factorsToInputValues(factorSet.factors));
    setCurrentFactorSet(factorSet);
    setHasManualFactorEdit(false);
    setFactorMatchMessage(`${text.matchedPrefix}${factorSet.displayName}`);
  }

  function matchRegionFactors() {
    const matchedFactorSet = findRegionEmissionFactorSet(form.region);

    if (matchedFactorSet) {
      applyFactorSet(matchedFactorSet);
      return;
    }

    setFactorInputs(defaultFactorInputs);
    setCurrentFactorSet(defaultEmissionFactorSet);
    setHasManualFactorEdit(false);
    setFactorMatchMessage(text.unmatchedMessage);
  }

  function handleCalculate(event) {
    event.preventDefault();

    const area = toNumber(form.area);
    const lifeSpan = toNumber(form.lifeSpan);
    const concrete = toNumber(form.concrete);
    const steel = toNumber(form.steel);
    const glass = toNumber(form.glass);
    const aluminum = toNumber(form.aluminum);
    const annualElectricity = toNumber(form.annualElectricity);
    const annualGas = toNumber(form.annualGas);

    const factors = {
      electricity: toNumber(factorInputs.electricity),
      naturalGas: toNumber(factorInputs.naturalGas),
      concrete: toNumber(factorInputs.concrete),
      steel: toNumber(factorInputs.steel),
      glass: toNumber(factorInputs.glass),
      aluminum: toNumber(factorInputs.aluminum),
    };

    const concreteCarbon = concrete * factors.concrete;
    const steelCarbon = steel * factors.steel;
    const glassCarbon = glass * factors.glass;
    const aluminumCarbon = aluminum * factors.aluminum;

    const materialCarbon =
      concreteCarbon + steelCarbon + glassCarbon + aluminumCarbon;

    const annualOperationCarbon =
      annualElectricity * factors.electricity +
      annualGas * factors.naturalGas;

    const operationCarbon = annualOperationCarbon * lifeSpan;
    const totalCarbon = materialCarbon + operationCarbon;
    const areaCarbon = area > 0 ? totalCarbon / area : null;

    setResults({
      totalCarbon,
      areaCarbon,
      materialCarbon,
      annualOperationCarbon,
      operationCarbon,
      materialItems: [
        { name: text.concrete, value: kgToTon(concreteCarbon) },
        { name: text.steel, value: kgToTon(steelCarbon) },
        { name: text.glass, value: kgToTon(glassCarbon) },
        { name: text.aluminum, value: kgToTon(aluminumCarbon) },
      ],
      stageItems: [
        { name: text.materialCarbon, value: kgToTon(materialCarbon) },
        { name: text.operationCarbon, value: kgToTon(operationCarbon) },
      ],
    });
  }

  async function handleExportPdf() {
    if (!reportRef.current || !results) {
      return;
    }

    setIsExporting(true);

    try {
      const html2canvas = (await import("html2canvas")).default;
      const { jsPDF } = await import("jspdf");
      const canvas = await html2canvas(reportRef.current, {
        backgroundColor: "#ffffff",
        scale: 2,
        useCORS: true,
      });
      const imageData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const margin = 10;
      const imageWidth = pageWidth - margin * 2;
      const imageHeight = (canvas.height * imageWidth) / canvas.width;

      let remainingHeight = imageHeight;
      let position = margin;

      pdf.addImage(imageData, "PNG", margin, position, imageWidth, imageHeight);
      remainingHeight -= pageHeight - margin * 2;

      while (remainingHeight > 0) {
        position = remainingHeight - imageHeight + margin;
        pdf.addPage();
        pdf.addImage(imageData, "PNG", margin, position, imageWidth, imageHeight);
        remainingHeight -= pageHeight - margin * 2;
      }

      pdf.save("building-carbon-report.pdf");
    } finally {
      setIsExporting(false);
    }
  }

  const resultCards = [
    {
      title: text.totalCarbon,
      value: results ? formatTon(results.totalCarbon) : text.pending,
    },
    {
      title: text.areaCarbon,
      value: results ? formatAreaValue(results.areaCarbon) : text.pending,
    },
    {
      title: text.materialCarbon,
      value: results ? formatTon(results.materialCarbon) : text.pending,
    },
    {
      title: text.operationCarbon,
      value: results ? formatTon(results.operationCarbon) : text.pending,
    },
  ];

  const inputClass =
    "h-11 rounded border border-slate-300 bg-white px-3 text-slate-950 outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100";
  const stageColors = ["#047857", "#334155"];
  const materialColor = "#0f766e";
  const analysis = results ? buildAnalysis(results) : "";

  return (
    <main className="min-h-screen px-5 py-8 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <header className="border-b border-slate-200 pb-8">
          <p className="mb-3 text-sm font-medium tracking-wide text-emerald-700">
            {text.eyebrow}
          </p>
          <h1 className="text-3xl font-semibold text-slate-950 sm:text-4xl">
            {text.title}
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-7 text-slate-600 sm:text-lg">
            {text.subtitle}
          </p>
          <p className="mt-4 max-w-4xl text-sm leading-7 text-slate-600 sm:text-base">
            {text.toolIntro}
          </p>
        </header>

        <section className="grid gap-6 border-b border-slate-200 py-8 lg:grid-cols-[1fr_1fr]">
          <div>
            <h2 className="text-xl font-semibold text-slate-950">
              {text.scenariosTitle}
            </h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {scenarios.map((scenario) => (
                <div
                  className="rounded border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700"
                  key={scenario}
                >
                  {scenario}
                </div>
              ))}
            </div>
          </div>

          <div className="rounded border border-slate-200 bg-white p-5">
            <h2 className="text-xl font-semibold text-slate-950">
              {text.serviceTitle}
            </h2>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              {text.serviceDescription}
            </p>
            <div className="mt-4 grid gap-2 text-sm text-slate-600">
              <p>
                <span className="font-medium text-slate-800">{text.wechat}：</span>
                {text.wechatPlaceholder}
              </p>
              <p>
                <span className="font-medium text-slate-800">{text.email}：</span>
                {text.emailPlaceholder}
              </p>
            </div>
          </div>
        </section>

        <section className="grid gap-8 py-8 lg:grid-cols-[minmax(0,1fr)_minmax(360px,0.9fr)]">
          <div className="rounded border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-6 flex items-end justify-between gap-4 border-b border-slate-100 pb-4">
              <div>
                <h2 className="text-xl font-semibold text-slate-950">
                  {text.inputTitle}
                </h2>
                <p className="mt-1 text-sm text-slate-500">{text.inputIntro}</p>
              </div>
              <span className="text-sm text-slate-400">{text.stage}</span>
            </div>

            <form className="grid gap-7" onSubmit={handleCalculate}>
              <div className="grid gap-5">
                <h3 className="text-base font-semibold text-slate-900">
                  {text.basicInfo}
                </h3>
                <Field label={text.buildingName}>
                  <input
                    className={inputClass}
                    onChange={(event) =>
                      updateField("buildingName", event.target.value)
                    }
                    placeholder={text.placeholderProject}
                    type="text"
                    value={form.buildingName}
                  />
                </Field>

                <Field label={text.buildingType}>
                  <select
                    className={inputClass}
                    onChange={(event) =>
                      updateField("buildingType", event.target.value)
                    }
                    value={form.buildingType}
                  >
                    {buildingTypes.map((type) => (
                      <option key={type}>{type}</option>
                    ))}
                  </select>
                </Field>

                <Field label={text.region}>
                  <div className="grid gap-3 sm:grid-cols-[minmax(0,1fr)_auto]">
                    <input
                      className={inputClass}
                      onChange={(event) =>
                        updateField("region", event.target.value)
                      }
                      placeholder={text.placeholderRegion}
                      type="text"
                      value={form.region}
                    />
                    <button
                      className="h-11 rounded border border-emerald-700 bg-white px-4 text-sm font-semibold text-emerald-800 transition hover:bg-emerald-50"
                      onClick={matchRegionFactors}
                      type="button"
                    >
                      {text.matchRegionFactors}
                    </button>
                  </div>
                </Field>

                <div className="grid gap-5 sm:grid-cols-2">
                  <Field label={text.area} unit="m\u00b2">
                    <input
                      className={inputClass}
                      min="0"
                      onChange={(event) => updateField("area", event.target.value)}
                      placeholder={text.placeholderArea}
                      type="number"
                      value={form.area}
                    />
                  </Field>

                  <Field label={text.lifeSpan} unit="\u5e74">
                    <input
                      className={inputClass}
                      min="1"
                      onChange={(event) =>
                        updateField("lifeSpan", event.target.value)
                      }
                      type="number"
                      value={form.lifeSpan}
                    />
                  </Field>
                </div>
              </div>

              <div className="grid gap-5 border-t border-slate-100 pt-6">
                <h3 className="text-base font-semibold text-slate-900">
                  {text.operationInput}
                </h3>
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field label={text.annualElectricity} unit="kWh/\u5e74">
                    <input
                      className={inputClass}
                      min="0"
                      onChange={(event) =>
                        updateField("annualElectricity", event.target.value)
                      }
                      placeholder={text.placeholderZero}
                      type="number"
                      value={form.annualElectricity}
                    />
                  </Field>

                  <Field label={text.annualGas} unit="m\u00b3/\u5e74">
                    <input
                      className={inputClass}
                      min="0"
                      onChange={(event) =>
                        updateField("annualGas", event.target.value)
                      }
                      placeholder={text.placeholderZero}
                      type="number"
                      value={form.annualGas}
                    />
                  </Field>
                </div>
              </div>

              <div className="grid gap-5 border-t border-slate-100 pt-6">
                <h3 className="text-base font-semibold text-slate-900">
                  {text.materialInput}
                </h3>
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field label={text.concrete} unit="m\u00b3">
                    <input
                      className={inputClass}
                      min="0"
                      onChange={(event) =>
                        updateField("concrete", event.target.value)
                      }
                      placeholder={text.placeholderZero}
                      type="number"
                      value={form.concrete}
                    />
                  </Field>

                  <Field label={text.steel} unit="t">
                    <input
                      className={inputClass}
                      min="0"
                      onChange={(event) => updateField("steel", event.target.value)}
                      placeholder={text.placeholderZero}
                      type="number"
                      value={form.steel}
                    />
                  </Field>

                  <Field label={text.glass} unit="m\u00b2">
                    <input
                      className={inputClass}
                      min="0"
                      onChange={(event) => updateField("glass", event.target.value)}
                      placeholder={text.placeholderZero}
                      type="number"
                      value={form.glass}
                    />
                  </Field>

                  <Field label={text.aluminum} unit="t">
                    <input
                      className={inputClass}
                      min="0"
                      onChange={(event) =>
                        updateField("aluminum", event.target.value)
                      }
                      placeholder={text.placeholderZero}
                      type="number"
                      value={form.aluminum}
                    />
                  </Field>
                </div>
              </div>

              <details
                className="rounded border border-slate-200 bg-slate-50 p-4"
                open
              >
                <summary className="cursor-pointer text-base font-semibold text-slate-900">
                  {text.factorSettings}
                </summary>
                <div className="mt-4 rounded border border-slate-200 bg-white p-4 text-sm leading-6 text-slate-600">
                  <p>
                    <span className="font-medium text-slate-800">
                      {text.factorGroup}：
                    </span>
                    {currentFactorSet.displayName}
                  </p>
                  <p>
                    <span className="font-medium text-slate-800">
                      {text.factorStatus}：
                    </span>
                    {currentFactorSet.sourceType}
                  </p>
                  <p>
                    <span className="font-medium text-slate-800">
                      {text.factorSource}：
                    </span>
                    {currentFactorSet.sourceNote}
                  </p>
                  <p>
                    <span className="font-medium text-slate-800">
                      {text.userCorrection}：
                    </span>
                    {hasManualFactorEdit ? text.modified : text.notModified}
                  </p>
                  {factorMatchMessage ? (
                    <p className="mt-2 font-medium text-emerald-700">
                      {factorMatchMessage}
                    </p>
                  ) : null}
                </div>
                <div className="mt-5 grid gap-5 sm:grid-cols-2">
                  {factorFields.map((field) => (
                    <Field
                      key={field.name}
                      label={field.label}
                      unit={field.unit}
                    >
                      <input
                        className={inputClass}
                        min="0"
                        onChange={(event) =>
                          updateFactor(field.name, event.target.value)
                        }
                        step="any"
                        type="number"
                        value={factorInputs[field.name]}
                      />
                    </Field>
                  ))}
                </div>
                <button
                  className="mt-5 h-10 rounded border border-slate-300 bg-white px-4 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
                  onClick={resetFactors}
                  type="button"
                >
                  {text.resetFactors}
                </button>
                <button
                  className="ml-0 mt-3 h-10 rounded border border-slate-300 bg-white px-4 text-sm font-medium text-slate-700 transition hover:bg-slate-100 sm:ml-3"
                  onClick={matchRegionFactors}
                  type="button"
                >
                  {text.rematchRegionFactors}
                </button>
                <p className="mt-4 text-sm leading-6 text-slate-500">
                  {text.factorLibraryNote}
                </p>
              </details>

              <button
                className="h-12 rounded bg-emerald-700 px-5 text-base font-semibold text-white transition hover:bg-emerald-800 focus:outline-none focus:ring-2 focus:ring-emerald-200"
                type="submit"
              >
                {text.calculate}
              </button>
            </form>
          </div>

          <aside className="rounded border border-slate-200 bg-slate-50 p-6">
            <div className="mb-6 border-b border-slate-200 pb-4">
              <h2 className="text-xl font-semibold text-slate-950">
                {text.resultTitle}
              </h2>
              <p className="mt-1 text-sm text-slate-500">{text.resultIntro}</p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
              {resultCards.map((card) => (
                <div
                  className="min-h-36 rounded border border-slate-200 bg-white p-5 shadow-sm"
                  key={card.title}
                >
                  <p className="text-sm font-medium text-slate-600">
                    {card.title}
                  </p>
                  <p className="mt-7 min-h-8 text-2xl font-semibold text-slate-950">
                    {card.value}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-6 rounded border border-slate-200 bg-white p-4 text-sm leading-6 text-slate-500">
              {text.factorNote}
            </div>

            {results ? (
              <>
                <button
                  className="mt-6 h-11 w-full rounded bg-slate-900 px-5 text-sm font-semibold text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:bg-slate-400"
                  disabled={isExporting}
                  onClick={handleExportPdf}
                  type="button"
                >
                  {isExporting ? text.exportingPdf : text.exportPdf}
                </button>

                <section className="mt-6 rounded border border-slate-200 bg-white p-5">
                  <h3 className="text-base font-semibold text-slate-950">
                    {text.analysisTitle}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600">
                    {analysis}
                  </p>
                </section>
              </>
            ) : null}

            {results ? (
              <div className="mt-6 grid gap-6">
                <section className="rounded border border-slate-200 bg-white p-5">
                  <h3 className="text-base font-semibold text-slate-950">
                    {text.stageChartTitle}
                  </h3>
                  <div className="mt-4 h-72">
                    <ResponsiveContainer height="100%" width="100%">
                      <PieChart>
                        <Pie
                          cx="50%"
                          cy="48%"
                          data={results.stageItems}
                          dataKey="value"
                          innerRadius={58}
                          nameKey="name"
                          outerRadius={86}
                          paddingAngle={2}
                        >
                          {results.stageItems.map((entry, index) => (
                            <Cell
                              fill={stageColors[index % stageColors.length]}
                              key={entry.name}
                            />
                          ))}
                        </Pie>
                        <Tooltip content={<ChartTooltip />} />
                        <Legend
                          formatter={(value) => (
                            <span className="text-sm text-slate-600">
                              {value}
                            </span>
                          )}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </section>

                <section className="rounded border border-slate-200 bg-white p-5">
                  <h3 className="text-base font-semibold text-slate-950">
                    {text.materialChartTitle}
                  </h3>
                  <div className="mt-4 h-72">
                    <ResponsiveContainer height="100%" width="100%">
                      <BarChart
                        data={results.materialItems}
                        margin={{ bottom: 8, left: 8, right: 8, top: 16 }}
                      >
                        <CartesianGrid stroke="#e2e8f0" strokeDasharray="3 3" />
                        <XAxis
                          dataKey="name"
                          tick={{ fill: "#475569", fontSize: 12 }}
                          tickLine={false}
                        />
                        <YAxis
                          tick={{ fill: "#475569", fontSize: 12 }}
                          tickFormatter={(value) => value.toLocaleString("zh-CN")}
                          tickLine={false}
                          width={48}
                        />
                        <Tooltip content={<ChartTooltip />} />
                        <Bar
                          dataKey="value"
                          fill={materialColor}
                          name={text.chartUnit}
                          radius={[4, 4, 0, 0]}
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                  <p className="mt-2 text-xs text-slate-500">
                    {text.chartUnit}
                  </p>
                </section>
              </div>
            ) : null}
          </aside>
        </section>

        <footer className="grid gap-4 border-t border-slate-200 pt-5 text-sm leading-6 text-slate-500">
          <p>{text.footerNote}</p>
          <div className="rounded border border-slate-200 bg-white p-4">
            <p className="font-semibold text-slate-800">{text.disclaimerTitle}</p>
            <p className="mt-2">{text.disclaimer}</p>
          </div>
        </footer>

        <div
          aria-hidden="true"
          ref={reportRef}
          style={{
            left: "-9999px",
            position: "absolute",
            top: 0,
          }}
        >
          <PdfReport
            analysis={analysis}
            factorSet={currentFactorSet}
            factors={factorInputs}
            form={form}
            hasManualFactorEdit={hasManualFactorEdit}
            results={results}
          />
        </div>
      </div>
    </main>
  );
}
