export const factorUnits = {
  electricity: "kgCO2/kWh",
  naturalGas: "kgCO2/m\u00b3",
  heating: "kgCO2/GJ",
  cooling: "kgCO2/kWh",
  concrete: "kgCO2/m\u00b3",
  steel: "kgCO2/t",
  glass: "kgCO2/m\u00b2",
  aluminum: "kgCO2/t",
  insulation: "kgCO2/m\u00b3",
  block: "kgCO2/m\u00b3",
};

export const defaultEmissionFactors = {
  electricity: 0.55,
  naturalGas: 2.16,
  heating: 0,
  cooling: 0,
  concrete: 300,
  steel: 1800,
  glass: 25,
  aluminum: 9500,
  insulation: 0,
  block: 0,
};

const exampleSourceNote =
  "\u5f53\u524d\u4e3a\u793a\u4f8b\u6570\u636e\u5e93\uff0c\u6b63\u5f0f\u6838\u7b97\u65f6\u8bf7\u66ff\u6362\u4e3a\u6700\u65b0\u5b98\u65b9\u53d1\u5e03\u6570\u636e\u3001\u5730\u65b9\u6807\u51c6\u3001\u9879\u76ee\u6307\u5b9a\u6570\u636e\u5e93\u6216\u6743\u5a01 LCA \u6570\u636e\u5e93\u3002";

function createFactorSet(regionName, displayName, aliases, factors) {
  return {
    regionName,
    displayName,
    aliases,
    sourceType: "\u793a\u4f8b\u6570\u636e\u5e93",
    sourceNote: exampleSourceNote,
    factors: {
      ...defaultEmissionFactors,
      ...factors,
    },
    units: factorUnits,
  };
}

export const defaultEmissionFactorSet = createFactorSet(
  "\u9ed8\u8ba4",
  "\u9ed8\u8ba4\u78b3\u6392\u653e\u56e0\u5b50\u7ec4",
  ["\u9ed8\u8ba4"],
  defaultEmissionFactors,
);

export const regionEmissionFactorSets = [
  defaultEmissionFactorSet,
  createFactorSet("\u5317\u4eac", "\u5317\u4eac\u5e02\u78b3\u6392\u653e\u56e0\u5b50\u7ec4", ["\u5317\u4eac", "\u5317\u4eac\u5e02"], {
    electricity: 0.56,
    naturalGas: 2.16,
    concrete: 305,
    steel: 1820,
    glass: 26,
    aluminum: 9600,
  }),
  createFactorSet("\u4e0a\u6d77", "\u4e0a\u6d77\u5e02\u78b3\u6392\u653e\u56e0\u5b50\u7ec4", ["\u4e0a\u6d77", "\u4e0a\u6d77\u5e02"], {
    electricity: 0.52,
    naturalGas: 2.15,
    concrete: 298,
    steel: 1790,
    glass: 25,
    aluminum: 9480,
  }),
  createFactorSet("\u5e7f\u4e1c", "\u5e7f\u4e1c\u7701\u78b3\u6392\u653e\u56e0\u5b50\u7ec4", ["\u5e7f\u4e1c", "\u5e7f\u4e1c\u7701", "\u5e7f\u5dde", "\u5e7f\u5dde\u5e02", "\u6df1\u5733", "\u6df1\u5733\u5e02"], {
    electricity: 0.48,
    naturalGas: 2.14,
    concrete: 292,
    steel: 1760,
    glass: 24,
    aluminum: 9300,
  }),
  createFactorSet("\u6c5f\u82cf", "\u6c5f\u82cf\u7701\u78b3\u6392\u653e\u56e0\u5b50\u7ec4", ["\u6c5f\u82cf", "\u6c5f\u82cf\u7701", "\u5357\u4eac", "\u5357\u4eac\u5e02", "\u82cf\u5dde", "\u82cf\u5dde\u5e02"], {
    electricity: 0.57,
    naturalGas: 2.16,
    concrete: 302,
    steel: 1810,
    glass: 25,
    aluminum: 9550,
  }),
  createFactorSet("\u6d59\u6c5f", "\u6d59\u6c5f\u7701\u78b3\u6392\u653e\u56e0\u5b50\u7ec4", ["\u6d59\u6c5f", "\u6d59\u6c5f\u7701", "\u676d\u5dde", "\u676d\u5dde\u5e02"], {
    electricity: 0.50,
    naturalGas: 2.15,
    concrete: 296,
    steel: 1785,
    glass: 24.5,
    aluminum: 9400,
  }),
  createFactorSet("\u5c71\u4e1c", "\u5c71\u4e1c\u7701\u78b3\u6392\u653e\u56e0\u5b50\u7ec4", ["\u5c71\u4e1c", "\u5c71\u4e1c\u7701", "\u6d4e\u5357", "\u6d4e\u5357\u5e02", "\u9752\u5c9b", "\u9752\u5c9b\u5e02"], {
    electricity: 0.60,
    naturalGas: 2.16,
    concrete: 310,
    steel: 1840,
    glass: 26,
    aluminum: 9700,
  }),
  createFactorSet("\u56db\u5ddd", "\u56db\u5ddd\u7701\u78b3\u6392\u653e\u56e0\u5b50\u7ec4", ["\u56db\u5ddd", "\u56db\u5ddd\u7701", "\u6210\u90fd", "\u6210\u90fd\u5e02"], {
    electricity: 0.38,
    naturalGas: 2.14,
    concrete: 290,
    steel: 1750,
    glass: 24,
    aluminum: 9250,
  }),
  createFactorSet("\u6e56\u5317", "\u6e56\u5317\u7701\u78b3\u6392\u653e\u56e0\u5b50\u7ec4", ["\u6e56\u5317", "\u6e56\u5317\u7701", "\u6b66\u6c49", "\u6b66\u6c49\u5e02"], {
    electricity: 0.53,
    naturalGas: 2.16,
    concrete: 299,
    steel: 1800,
    glass: 25,
    aluminum: 9500,
  }),
  createFactorSet("\u9655\u897f", "\u9655\u897f\u7701\u78b3\u6392\u653e\u56e0\u5b50\u7ec4", ["\u9655\u897f", "\u9655\u897f\u7701", "\u897f\u5b89", "\u897f\u5b89\u5e02"], {
    electricity: 0.58,
    naturalGas: 2.16,
    concrete: 306,
    steel: 1830,
    glass: 25.5,
    aluminum: 9650,
  }),
];

export function factorsToInputValues(factors) {
  return Object.fromEntries(
    Object.entries(factorUnits).map(([key]) => [key, String(factors[key] ?? 0)]),
  );
}

export function findRegionEmissionFactorSet(region) {
  const normalizedRegion = region.trim().replace(/\s/g, "");

  if (!normalizedRegion) {
    return null;
  }

  return (
    regionEmissionFactorSets.find((set) =>
      set.aliases.some((alias) => alias === normalizedRegion),
    ) ?? null
  );
}
