// src/data/esferificar.ts

export interface EsferificacionDosage {
  type: string;
  amount: string;
  bathAmount?: string;
}

export interface EsferificacionInfo {
  name: string;
  description: string;
  ingredients: string[];
  characteristics: string[];
  applications: string[];
  dosages: EsferificacionDosage[];
  instructions: string[];
  tips: string[];
}

export const esferificaciones: Record<string, EsferificacionInfo> = {
  'Esferificación Básica (Directa)': {
    name: 'Esferificación Básica',
    description: 'La esferificación directa consiste en sumergir un líquido con alginato en un baño de calcio',
    ingredients: [
      'Alginato de sodio',
      'Cloruro de calcio o gluconato de calcio'
    ],
    characteristics: [
      'Crea esferas con membrana fina',
      'El proceso continúa hasta sacar del baño',
      'No apto para líquidos con calcio natural',
      'Ideal para líquidos sin lácteos'
    ],
    applications: [
      'Caviar de aceite balsámico',
      'Esferas de zumos',
      'Perlas de licores',
      'Caviar de aceites aromatizados'
    ],
    dosages: [
      { 
        type: 'Líquido base', 
        amount: '5g/L de alginato',
        bathAmount: '5g/L de cloruro de calcio'
      }
    ],
    instructions: [
      'Mezclar el alginato con el líquido usando túrmix',
      'Dejar reposar en nevera 12-24h para eliminar burbujas',
      'Preparar baño de calcio (5g/L en agua)',
      'Con jeringa o cuchara, dejar caer gotas en el baño de calcio',
      'Dejar 1-3 minutos según grosor deseado',
      'Enjuagar en agua limpia',
      'Consumir inmediatamente o conservar en líquido sin calcio'
    ],
    tips: [
      'Usar líquidos sin calcio natural',
      'Eliminar todas las burbujas antes de esferificar',
      'Temperatura ambiente para mejores resultados',
      'No dejar demasiado tiempo en el baño o se endurecerán'
    ]
  },
  'Esferificación Inversa': {
    name: 'Esferificación Inversa',
    description: 'Se sumerge un líquido con calcio en un baño de alginato. Permite trabajar con líquidos que contienen calcio',
    ingredients: [
      'Gluconolactato de calcio',
      'Alginato de sodio',
      'Goma xantana (opcional, para espesar baño)'
    ],
    characteristics: [
      'Apta para lácteos y líquidos con calcio',
      'El proceso se detiene al sacar del baño',
      'Crea esferas más estables en el tiempo',
      'Permite rellenar previamente'
    ],
    applications: [
      'Esferas de yogurt',
      'Raviolis líquidos',
      'Esferas de nata',
      'Perlas de cremas',
      'Yemas líquidas'
    ],
    dosages: [
      { 
        type: 'Líquido base', 
        amount: '5g/L de gluconolactato de calcio',
        bathAmount: '5g/L de alginato + 2g/L xantana'
      }
    ],
    instructions: [
      'Añadir gluconolactato al líquido base y mezclar bien',
      'Preparar baño: mezclar alginato (y xantana) con agua',
      'Dejar reposar ambos líquidos 12h en nevera',
      'Con cuchara o molde, sumergir porciones en el baño de alginato',
      'Dejar 2-3 minutos',
      'Enjuagar suavemente en agua',
      'Servir inmediatamente o conservar refrigerado'
    ],
    tips: [
      'La xantana ayuda a suspender las esferas en el baño',
      'Ideal para líquidos cremosos y lácteos',
      'Se pueden hacer esferas más grandes',
      'Más control sobre el grosor de la membrana'
    ]
  },
  'Esferificación Congelada': {
    name: 'Esferificación Congelada',
    description: 'Se congela el líquido en forma esférica y luego se sumerge en alginato para crear la membrana',
    ingredients: [
      'Gluconolactato de calcio',
      'Alginato de sodio',
      'Goma xantana'
    ],
    characteristics: [
      'Permite crear esferas perfectamente redondas',
      'Controla mejor el tamaño',
      'La membrana se forma sobre producto congelado',
      'Requiere moldes esféricos'
    ],
    applications: [
      'Esferas de helado líquido',
      'Raviolis grandes',
      'Bombas heladas',
      'Postres esféricos'
    ],
    dosages: [
      { 
        type: 'Líquido a congelar', 
        amount: '5g/L de gluconolactato de calcio',
        bathAmount: '5g/L de alginato + 2g/L xantana'
      }
    ],
    instructions: [
      'Mezclar gluconolactato con el líquido base',
      'Llenar moldes esféricos y congelar completamente',
      'Preparar baño de alginato con xantana',
      'Sumergir las esferas congeladas 3-5 minutos',
      'Enjuagar en agua fría',
      'Dejar descongelar antes de servir o servir semi-congeladas'
    ],
    tips: [
      'Usar moldes de silicona para esferas',
      'El tiempo en baño depende del tamaño',
      'Trabajar rápido para que no se descongelen',
      'Ideal para efectos sorpresa al cortar'
    ]
  },
  'Falsa Esferificación (Caviar de Agar)': {
    name: 'Falsa Esferificación',
    description: 'Utiliza agar agar y aceite frío para crear pequeñas perlas sin usar alginato ni calcio',
    ingredients: [
      'Agar agar',
      'Aceite vegetal frío'
    ],
    characteristics: [
      'No requiere baño de calcio',
      'Textura más firme que esferificación tradicional',
      'Proceso más rápido',
      'Estable a temperatura ambiente'
    ],
    applications: [
      'Caviar balsámico',
      'Perlas de salsas',
      'Caviar de vino',
      'Topping para platos'
    ],
    dosages: [
      { 
        type: 'Líquido base', 
        amount: '10g/L de agar agar'
      }
    ],
    instructions: [
      'Mezclar agar con el líquido y llevar a ebullición',
      'Enfriar aceite en congelador (30 min)',
      'Con jeringa, dejar caer gotas en aceite frío',
      'Las gotas se solidificarán inmediatamente',
      'Colar y enjuagar con agua',
      'Conservar refrigerado'
    ],
    tips: [
      'El aceite debe estar muy frío',
      'Usar jeringas de diferentes calibres para distintos tamaños',
      'El resultado es más estable que con alginato',
      'No se deshace con el tiempo'
    ]
  }
};