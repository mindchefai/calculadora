// src/data/nixtamalizar.ts

export interface NixtamalizadorDosage {
  context: string;
  amount: string;
}

export interface NixtamalizadorInfo {
  origin: string;
  ph: string;
  characteristics: string[];
  applications: string[];
  dosages: NixtamalizadorDosage[];
  instructions: string[];
}

export const nixtamalizadores: Record<string, NixtamalizadorInfo> = {
  'Hidróxido de Calcio': {
    origin: 'Producto natural',
    ph: '12 (básico)',
    characteristics: [
      'Controla acidez',
      'Reacciona con pectina',
      'Mejora propiedades nutricionales'
    ],
    applications: [
      'Nixtamalización',
      'Capas de pectina en vegetales',
      'Tratamiento de maíz'
    ],
    dosages: [
      { context: 'Vegetales', amount: '20g/L' },
      { context: 'Cereales', amount: '10g/L' }
    ],
    instructions: [
      'Mezclar con el líquido',
      'Remover',
      'Usar directamente',
      'En frío, remover cada 15 min'
    ]
  },
  'Bicarbonato Sódico': {
    origin: 'Se extrae del cloruro de sodio',
    ph: '—',
    characteristics: [
      'Controla la acidez',
      'Aporta gas a las masas',
      'Gusto salado',
      'Neutraliza malos olores',
      'Mantiene el verde en vegetales (puede modificar textura)'
    ],
    applications: [
      'Cocinado de masas',
      'Equilibrio de pH',
      'Ablandamiento de proteínas',
      'Masas fritas',
      'Hidratación y ablandamiento de legumbres'
    ],
    dosages: [
      { context: 'General', amount: 'Hasta 20g/kg' }
    ],
    instructions: [
      'Mezclar con el líquido',
      'Remover',
      'Utilizar'
    ]
  },
  'Hidróxido de Sodio': {
    origin: 'Extracción química del cloruro de sodio (sal común)',
    ph: 'Muy alto (fuertemente alcalino)',
    characteristics: [
      'Controla acidez',
      'Muy abrasivo',
      'Alto poder alcalino'
    ],
    applications: [
      'Ablandamiento de aceitunas',
      'Huevos centenarios',
      'Pelado de frutas',
      'Equilibrar pH'
    ],
    dosages: [
      { context: 'Aceitunas', amount: '2-5%' },
      { context: 'Pelado de frutas', amount: '2-10%' }
    ],
    instructions: [
      'Mezclar con el líquido',
      'Remover',
      'Utilizar'
    ]
  },
  'Cítrico Sódico': {
    origin: 'Derivado del hidróxido de sodio con adición de ácido cítrico',
    ph: '—',
    characteristics: [
      'Sabor salado',
      'Propiedades conservantes',
      'Regula el pH',
      'Muy soluble'
    ],
    applications: [
      'Esferificaciones ácidas',
      'Conservación de alimentos'
    ],
    dosages: [
      { context: 'Esferificaciones', amount: '1.8-5g/L' }
    ],
    instructions: [
      'Mezclar con el líquido',
      'Remover',
      'Utilizar'
    ]
  }
};