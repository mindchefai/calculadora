// src/data/aerators.ts

export interface AeratorDosage {
  context: string;
  amount: string;
}

export interface AeratorInfo {
  base: string;
  characteristics: string[];
  applications: string[];
  dosages: AeratorDosage[];
  instructions: string[];
}

export const aerators: Record<string, AeratorInfo> = {
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
  },
  "Lecitina (E-322)": {
    base: "Soja o girasol",
    characteristics: [
      "Actúa en baja concentración",
      "Se dispersa en agua",
      "Soluble en grasa",
      "Puede dejar sabor",
      "Se puede usar en frío y caliente",
      "Mejora elasticidad en masas"
    ],
    applications: [
      "Vinagretas",
      "Aires",
      "Emulsiones",
      "Estabiliza helados",
      "Masas harinosas",
      "Tofu"
    ],
    dosages: [
      { context: "Mínimo", amount: "2g/L" },
      { context: "Máximo", amount: "15g/L" }
    ],
    instructions: [
      "Mezclar ingredientes en túrmix",
      "Dejar reposar 2 minutos",
      "Incorporar aire",
      "Recoger espuma"
    ]
  },
  "Sucroésteres": {
    base: "Se extrae mediante proceso químico. Ácidos grasos y sacarosa",
    characteristics: [
      "Aireante muy potente",
      "Disuelve en frío y caliente",
      "No disuelve en grasa",
      "Anticongelante",
      "Estable en presencia de alcohol",
      "Forma aires calientes",
      "Espuma en pH bajos"
    ],
    applications: [
      "Estabilizante",
      "Emulsionante",
      "Helados",
      "Sorbete",
      "Aire caliente",
      "Aire alcohólicos"
    ],
    dosages: [
      { context: "Habitual", amount: "0.1-1g/L" },
      { context: "Emulsiones", amount: "3g/L" },
      { context: "Aires", amount: "3g/L" }
    ],
    instructions: [
      "Mezclar con agua",
      "Añadir alcohol o grasa",
      "Dejar reposar",
      "Introducir aire en túrmix"
    ]
  }
};