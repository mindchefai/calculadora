// src/data/espumators.ts

export interface EspumatorDosage {
  context: string;
  amount: string;
}

export interface EspumatorInfo {
  base: string;
  characteristics: string[];
  applications: string[];
  dosages: EspumatorDosage[];
  instructions: string[];
}

export const espumators: Record<string, EspumatorInfo> = {
  "Albúmina": {
    base: "Proteína animal. Procede de la clara.",
    characteristics: [
      "Coagula a los 57º",
      "Es soluble en agua",
      "No funciona en pH ácidos, alcohólicos o grasa",
      "Alto poder montante",
      "Emulsiones grasas",
      "Forma mejor espuma con reposo de 12 h"
    ],
    applications: [
      "Espumas",
      "Merengues",
      "Macarons",
      "Aire",
      "Estabilizante"
    ],
    dosages: [
      { context: "Pulpa", amount: "25g/L" },
      { context: "Líquidos", amount: "90-100g/L" }
    ],
    instructions: [
      "Montar",
      "Dar forma",
      "Hornear"
    ]
  },
  "Proteína de leche": {
    base: "Caseína",
    characteristics: [
      "Se utiliza en frío o caliente",
      "Poder emulsionante"
    ],
    applications: [
      "Espumante",
      "Aireante frío/caliente",
      "Emulsionante",
      "Forma aires",
      "Mousse"
    ],
    dosages: [
      { context: "Merengue", amount: "1-2g/L" },
      { context: "Marshmallow", amount: "3g/L" },
      { context: "Espumas", amount: "5g/L" }
    ],
    instructions: [
      "Mezclar ingredientes",
      "Montar o sifón",
      "Dar forma",
      "Hornear"
    ]
  },
  "Mono-diglicéridos (E-471)": {
    base: "Se disuelven en grasa",
    characteristics: [
      "Disolución a 65º",
      "Soporta alcohol",
      "Puede aportar sabores",
      "Propiedades anticongelantes",
      "Estabiliza espumas"
    ],
    applications: [
      "Helado",
      "Ganache",
      "Mousse",
      "Emulsiones",
      "Aceite texturizado",
      "Sorbete"
    ],
    dosages: [
      { context: "Emulsionantes", amount: "40-100g/L" },
      { context: "Texturizante", amount: "40-80g/L" },
      { context: "Aceite", amount: "6g/100ml" }
    ],
    instructions: [
      "Mezclar glicérido y grasa",
      "Calentar a 65º",
      "Enfriar"
    ]
  }
};