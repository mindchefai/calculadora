// src/data/texturizantes.ts

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

export const texturizantes: Record<string, IngredientInfo> = {
  'Goma Xantana': {
    origin: 'Fermentación, E-415',
    hydrationTemp: 'Disuelve en frío y caliente',
    gelTemp: '—',
    ph: '',
    characteristics: [
      'No deja sabor',
      'Se puede usar en grasa y alcohol hasta 50%'
    ],
    applications: [
      'Espesante',
      'Estabilizante',
      'Emulsiones',
      'Gelificante (junto con goma garrofín)',
      'Espumas calientes'
    ],
    dosages: [
      { texture: 'Salsa fina y ligera', amount: '2.5g/L' },
      { texture: 'Salsa espesa', amount: '7-15g/L' },
      { texture: 'Espumas', amount: '5-8g/L' }
    ],
    instructions: [
      'Verter poco a poco',
      'Batir durante 1 min',
      'Reposar hasta eliminar aire o usar vacío'
    ]
  },

  'Goma Garrofín': {
    origin: 'Semilla del algarrobo, E-410',
    hydrationTemp: 'Actúa a partir de 60°C',
    gelTemp: '90°C para hidratación completa',
    ph: '',
    characteristics: [
      'Deja sabor',
      'No disuelve en grasa ni alcohol'
    ],
    applications: [
      'Espesante',
      'Estabilizante',
      'Gelificante (junto con xantana a partes iguales)'
    ],
    dosages: [
      { texture: 'Salsa poco espesa', amount: '2-4g/L' },
      { texture: 'Salsa espesa', amount: '5-7g/L' },
      { texture: 'Crema espesa', amount: '8-10g/L' }
    ],
    instructions: [
      'Mezclar con el líquido en frío',
      'Llevar a 90°C para que actúe',
      'No dejar de mover'
    ]
  },

  'Inulina': {
    origin: 'Raíz de la achicoria',
    hydrationTemp: 'Hidratación en frío',
    gelTemp: 'No superar 60°C',
    ph: '',
    characteristics: ['Sabor neutro'],
    applications: [
      'Espesante',
      'Estabilizante',
      'Gelificante (sustituto de lácteos o grasas)'
    ],
    dosages: [
      { texture: 'Espesante ligero', amount: '3-5g/L' },
      { texture: 'Crema suave', amount: '8-12g/L' },
      { texture: 'Mousse', amount: '15-20g/L' },
      { texture: 'Gel cremoso', amount: '25-40g/L' },
      { texture: 'Sustituto grasa', amount: '50-80g/L' }
    ],
    instructions: [
      'Añadir al líquido',
      'Mezclar mediante agitación mecánica',
      'Calentar sin superar 60°C',
      'Reposar en frío 12h'
    ]
  },

  'Goma Arábiga': {
    origin: 'Árbol acacia, E-414',
    hydrationTemp: 'Diluir en frío o caliente',
    gelTemp: '90°C (1 min)',
    ph: '',
    characteristics: [
      'No soluble en alcohol ni grasas'
    ],
    applications: [
      'Estabilizante de espumas y emulsiones',
      'Espesante',
      'Gominolas',
      'Estabiliza helados',
      'Caramelos'
    ],
    dosages: [
      { texture: 'General', amount: '5-50%' }
    ],
    instructions: [
      'Diluir en frío',
      'Calentar la mezcla a 90°C durante 1 min'
    ]
  },

  'Goma Guar': {
    origin: 'Semilla de cyamopsis, E-412',
    hydrationTemp: 'Soluble en frío y caliente',
    gelTemp: '—',
    ph: '',
    characteristics: [
      'No disuelve en alcohol',
      'Sustituto del gluten'
    ],
    applications: [
      'Espesante',
      'Estabilizante (helado, espumas, pastelería)',
      'Emulsiones en grasa al 50%'
    ],
    dosages: [
      { texture: 'Salsa ligera', amount: '2-4g/L' },
      { texture: 'Salsa espesa', amount: '5-7g/L' },
      { texture: 'Crema espesa', amount: '8-10g/L' }
    ],
    instructions: [
      'Añadir al líquido a espesar',
      'Usar en frío o caliente (mejor efecto en caliente)'
    ]
  },

  'Goma Tara': {
    origin: 'Árbol cesalpinia, E-417',
    hydrationTemp: 'Diluir en frío',
    gelTemp: 'Hidratación entre 70-90°C',
    ph: '',
    characteristics: [
      'Resistente a la congelación',
      'Retiene gas (ideal para pan sin gluten)',
      'No soluble en alcohol',
      'Emulsiona en grasa'
    ],
    applications: [
      'Espesante',
      'Gelificante (con kappa o xantana)',
      'Espumas calientes'
    ],
    dosages: [
      { texture: 'Salsa ligera', amount: '2-4g/L' },
      { texture: 'Salsa espesa', amount: '5-7g/L' },
      { texture: 'Crema espesa', amount: '8-10g/L' }
    ],
    instructions: [
      'Verter sobre el líquido',
      'Mezclar con túrmix',
      'Calentar mínimo a 70°C',
      'Espesará al enfriarse'
    ]
  },

  'Kuzu': {
    origin: 'Raíz de planta trepadora',
    hydrationTemp: 'Diluir en agua fría',
    gelTemp: 'A partir de 80°C',
    ph: '',
    characteristics: [
      'No disuelve en grasa ni alcohol'
    ],
    applications: [
      'Caldos/salsas',
      'Cremas/purés',
      'Crujientes/velos',
      'Falsas pastas',
      'Pan/mochis',
      'Cristal',
      'Estabilizante'
    ],
    dosages: [
      { texture: 'Textura ligera', amount: '20g/L' },
      { texture: 'Salsas', amount: '50g/L' },
      { texture: 'Salsa muy espesa', amount: '70g/L' },
      { texture: 'Puré o gelatina', amount: '100g/L' }
    ],
    instructions: [
      'Diluir en frío',
      'Añadir al líquido a calentar',
      'Calentar a más de 80°C',
      'Remover constantemente'
    ]
  },

  'Almidón Natural': {
    origin: 'Cereales y tubérculos',
    hydrationTemp: 'No se disuelve en caliente',
    gelTemp: 'Mínimo 80°C',
    ph: '',
    characteristics: [
      'Suele dejar sabor',
      'Tiende a formar grumos',
      'Mala congelación'
    ],
    applications: [
      'Espesante',
      'Gelificante'
    ],
    dosages: [
      { texture: 'Salsas', amount: '20g/L' },
      { texture: 'Salsas espesas', amount: '20-60g/L' },
      { texture: 'Textura crema', amount: '60-80g/L' },
      { texture: 'Geles', amount: '80-100g/L' }
    ],
    instructions: [
      'Diluir en frío',
      'Llevar a mínimo 80°C',
      'Verter el líquido en forma de hilo sin parar de remover'
    ]
  },

  'Almidón Modificado': {
    origin: 'Cereales y tubérculos modificados',
    hydrationTemp: 'Actúa en frío y caliente',
    gelTemp: '—',
    ph: '',
    characteristics: [
      'Algunos tipos resisten congelación'
    ],
    applications: [
      'Espesante',
      'Gelificante'
    ],
    dosages: [
      { texture: 'Espesante ligero', amount: '2-5g/L' },
      { texture: 'Espesante medio', amount: '5-10g/L' },
      { texture: 'Crema espesa', amount: '10-15g/L' },
      { texture: 'Gel suave', amount: '15-20g/L' },
      { texture: 'Gel firme', amount: '20-30g/L' }
    ],
    instructions: [
      'Incorporar el almidón al líquido',
      'Mover durante 1 min'
    ]
  },

  'Goma Konjac': {
    origin: 'Tubérculo',
    hydrationTemp: 'Soluble en frío',
    gelTemp: 'Espesa solo a >80°C',
    ph: '',
    characteristics: [
      'Espesante',
      'Sensación grasa',
      'Estabilizante',
      'Gelificante (con xantana)',
      'Pastas alcalinas (kon-nyaku, shirataki)'
    ],
    applications: [
      'Espumas calientes',
      'Pastas alcalinas'
    ],
    dosages: [
      { texture: 'Salsa ligera', amount: '0.5g/L' },
      { texture: 'Crema espesa', amount: '2g/L' },
      { texture: 'Masa manejable', amount: '5g/L' }
    ],
    instructions: [
      'Añadir al líquido a espesar',
      'Mezclar agitando',
      'Llevar a ebullición'
    ]
  }
};