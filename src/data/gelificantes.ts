// src/data/gelificantes.ts

export interface Dosage {
  texture: string;
  amount: string;
}

export interface IngredientInfo {
  origin: string;
  hydrationTemp: string;
  gelTemp: string;
  ph: string;
  characteristics: string[];
  applications: string[];
  dosages: Dosage[];
  maxDosage?: string;
  instructions: string[];
}

export const gelificantes: Record<string, IngredientInfo> = {
  'Agar Agar': {
    origin: 'Algas rojas',
    hydrationTemp: '80°C',
    gelTemp: '35-40°C',
    ph: '7-8',
    characteristics: [
      'No se disuelve en grasa',
      'Tolera ácidos, alcoholes, sal y azúcar',
      'Gelifica en frío y caliente',
      'Previene sinéresis con 0,1-0,2% garrofín'
    ],
    applications: [
      'Espumas calientes',
      'Caviar duro',
      'Film',
      'Ganache',
      'Geles',
      'Gelatinas frías',
      'Gelatinas calientes',
      'Rellenos',
      'Salsas/puré'
    ],
    dosages: [
      { texture: 'Salsa', amount: '2g/L' },
      { texture: 'Geles blandos', amount: '+2g/L' },
      { texture: 'Geles medios', amount: '3-5g/L' },
      { texture: 'Geles duros', amount: '5-10g/L' }
    ],
    maxDosage: '30g/L',
    instructions: [
      'Mezclar todos los ingredientes en frío',
      'Calentar la mezcla hasta la ebullición',
      'Verter la mezcla en el molde deseado',
      'Mantener en nevera hasta que gelifique'
    ]
  },
  'Carragenato Kappa': {
    origin: 'Algas rojas (E-407)',
    hydrationTemp: '80°C durante 5 min',
    gelTemp: '30-60°C',
    ph: '4-10',
    characteristics: [
      'No aguanta congelación',
      'Se dispersa en frío',
      'Gelifica en presencia de calcio',
      'Geles transparentes'
    ],
    applications: [
      'Gelatinas en frío',
      'Espumas en frío',
      'Film/Velos',
      'Recubrimientos',
      'Espumas y emulsionantes'
    ],
    dosages: [
      { texture: 'Textura salsa', amount: '5g/L' },
      { texture: 'Crema espesa', amount: '5-6g/L' },
      { texture: 'Geles firmes', amount: '6-9g/L' },
      { texture: 'Geles duros', amount: '10g/L' }
    ],
    instructions: [
      'Mezclar ingredientes',
      'Llevar la mezcla a ebullición',
      'Disponer en moldes',
      'Dejar enfriar'
    ]
  },
  'Carragenato Iota': {
    origin: 'Algas rojas (E-407)',
    hydrationTemp: '80°C',
    gelTemp: '40-70°C',
    ph: '4-10',
    characteristics: [
      'Solamente gelificable en presencia de calcio',
      'Se puede congelar',
      'Geles fluidos',
      'Efecto suspensor'
    ],
    applications: [
      'Salsas',
      'Gelatinas frías',
      'Espumas y emulsiones',
      'Pudding, flan, cuajada, panacota'
    ],
    dosages: [
      { texture: 'Líquido suspensor', amount: '2g/L' },
      { texture: 'Crema espesa', amount: '3-6g/L' },
      { texture: 'Textura flan', amount: '6g/L' },
      { texture: 'Gel blando', amount: '6-10g/L' }
    ],
    instructions: [
      'Mezclar los ingredientes, utilizando túrmix',
      'Llevar la mezcla a la ebullición',
      'Disponer en los moldes',
      'Dejar enfriar'
    ]
  },
  'Alginato': {
    origin: 'Algas pardas (E-401)',
    hydrationTemp: 'Gelifica en frío',
    gelTemp: 'Actúa en presencia de calcio',
    ph: 'Precipita a pH inferior a 3,65',
    characteristics: [
      'Sin calcio actúa de espesante',
      'Esferificaciones inversas y directas',
      'Gelificante y espesante'
    ],
    applications: [
      'Film',
      'Esferas carbonatadas',
      'Esferificaciones'
    ],
    dosages: [
      { texture: 'Estabilizante helados', amount: '1-5g/L' },
      { texture: 'Baño alginato directo', amount: '6-7g/L' },
      { texture: 'Baño inverso', amount: '6-7g/L + 2g/L xantana' }
    ],
    instructions: [
      'Hacer el baño alginato y solución con calcio',
      'Mezclar con ayuda de túrmix',
      'Eliminar el aire con vacío',
      'Lavar el resultado en baño de agua'
    ]
  },
  'Pectina HM': {
    origin: 'Frutas y vegetales',
    hydrationTemp: '80°C durante 5 min',
    gelTemp: '40-85°C',
    ph: '2,8-3,4 + 50% de azúcar para gelificar',
    characteristics: [
      'No se disuelve en grasa',
      'Se disuelve en frío',
      'Necesita azúcar para gelificar'
    ],
    applications: [
      'Salsas y gelatinas',
      'Pâte de fruit',
      'Espumas y emulsiones',
      'Compotas',
      'Sorbetes',
      'Helados',
      'Mermeladas'
    ],
    dosages: [
      { texture: 'Sorbetes', amount: '6g/L' },
      { texture: 'Gel general', amount: '10-30g/L + 50% azúcar + 5-10g/L ácido cítrico' }
    ],
    maxDosage: '60g/L',
    instructions: [
      'Hervir el agua con el 25% de azúcar. Enfriar solución',
      'Añadir la pectina mezclada con el 25% de azúcar y el resto de ingredientes',
      'Triturar con túrmix. Llevar a ebullición. Hervir 5 min',
      'Pasar a un molde y dejar enfriar'
    ]
  },
  'Pectina LM': {
    origin: 'Frutas y vegetales con proceso químico',
    hydrationTemp: '80°C',
    gelTemp: 'Gelifica con iones de calcio',
    ph: '2,5-6,5',
    characteristics: [
      'No se disuelve en grasa',
      'Gelifica alcoholes a bajas concentraciones',
      'Su gelificación no depende del azúcar',
      'Disolver en frío'
    ],
    applications: [
      'Salsas/purés',
      'Gelatinas',
      'Pâte de fruit',
      'Espumas y emulsiones',
      'Láminas deshidratadas',
      'Sorbetes',
      'Helados',
      'Pegado de fruta'
    ],
    dosages: [
      { texture: 'Textura salsa espesa', amount: '10g/L' },
      { texture: 'Gelatina suave', amount: '10-20g/L' },
      { texture: 'Gelatina firme', amount: '20g/L' }
    ],
    instructions: [
      'Mezclar todos los ingredientes y triturar con túrmix',
      'Llevar la mezcla a la ebullición',
      'Pasar a un molde y dejar enfriar'
    ]
  },
  'Gelatina Animal': {
    origin: 'Colágeno animal',
    hydrationTemp: 'Hidratar con agua y hielo previamente',
    gelTemp: 'Se derrite a partir de 35°C',
    ph: '4-10',
    characteristics: [
      'Alcohol por debajo del 40%',
      'No llevar a la ebullición'
    ],
    applications: [
      'Salsas/purés',
      'Gelatinas frías',
      'Mousse',
      'Ganache/geles fluidos',
      'Espumas y emulsiones',
      'Nubes/helados/sorbetes'
    ],
    dosages: [
      { texture: 'Geles concentrados', amount: '6-8g/L' },
      { texture: 'Geles blandos', amount: '10g/L' },
      { texture: 'Geles medios', amount: '17-24g/L' },
      { texture: 'Geles duros', amount: '+24g/L' },
      { texture: 'Espumas', amount: '5-15g/L' }
    ],
    instructions: [
      'Llevar parte del líquido a ebullición',
      'Apartar el líquido del fuego',
      'Añadir la gelatina en polvo o las hojas hidratadas',
      'Pasar a un molde y dejar enfriar'
    ]
  }
};