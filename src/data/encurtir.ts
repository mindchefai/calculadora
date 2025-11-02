// src/data/encurtir.ts

export interface EncurtidoIngredient {
  name: string;
  amount: string;
  unit: string;
}

export interface EncurtidoRecipe {
  name: string;
  description: string;
  yield: string;
  ingredients: EncurtidoIngredient[];
  preparation: string[];
  time: string;
  storage?: string;
  tips: string[];
}

export interface EncurtidoCategory {
  name: string;
  description: string;
  recipes: EncurtidoRecipe[];
}

export const encurtidos: Record<string, EncurtidoCategory> = {
  'Encurtidos de Verduras': {
    name: 'Encurtidos de Verduras',
    description: 'Encurtidos rápidos y tradicionales de vegetales',
    recipes: [
      {
        name: 'Remolacha Encurtida',
        description: 'Dados de remolacha',
        yield: '100g de remolacha',
        ingredients: [
          { name: 'Remolacha roja en dados', amount: '100', unit: 'g' },
          { name: 'Vinagre de arroz', amount: '50', unit: 'g' },
          { name: 'Aceite de oliva virgen extra', amount: '50', unit: 'g' },
          { name: 'Sal', amount: '5', unit: 'g' },
          { name: 'Pimienta rosa en grano', amount: '5', unit: 'g' },
          { name: 'Agua', amount: 'c.s.', unit: '' }
        ],
        preparation: [
          'Cocer los dados de la remolacha durante 5 minutos',
          'Mezclar el vinagre con el aceite, la sal y la pimienta rosa',
          'Sumergir los dados de remolacha roja',
          'Dejar encurtir ambos durante 12 horas en cámara hasta el momento del pase'
        ],
        time: '12 horas',
        storage: 'Refrigerado',
        tips: [
          'La pimienta rosa aporta un toque visual y aromático'
        ]
      },
      {
        name: 'Remolacha Encurtida (al Vacío)',
        description: 'Remolacha entera cocida y encurtida al vacío',
        yield: '4 remolachas',
        ingredients: [
          { name: 'Remolachas peladas', amount: '4', unit: 'unidades' },
          { name: 'Vinagre de arroz', amount: '50', unit: 'g' },
          { name: 'Agua', amount: '75', unit: 'g' },
          { name: 'Zanahoria laminada', amount: '25', unit: 'g' },
          { name: 'Pimienta rosa en grano', amount: '10', unit: 'g' },
          { name: 'Perejil', amount: '2', unit: 'g' },
          { name: 'Rama de canela', amount: '1/2', unit: 'unidad' },
          { name: 'Hoja de laurel', amount: '2', unit: 'unidades' },
          { name: 'Sal', amount: 'c.s.', unit: '' },
          { name: 'Azúcar', amount: 'c.s.', unit: '' }
        ],
        preparation: [
          'Envasar las remolachas con el resto de ingredientes, previamente mezclados, al vacío',
          'Cocer a 90°C durante 30 minutos',
          'Enfriar',
          'Dejar encurtir en cámara durante un mínimo de 3 meses hasta el momento de su utilización'
        ],
        time: '3 meses mínimo',
        storage: 'Refrigerado al vacío',
        tips: [
          'La cocción al vacío mantiene textura y sabor',
          'Requiere paciencia: el encurtido largo mejora el sabor',
          'Ideal para preparar con antelación'
        ]
      },
      {
        name: 'Setas Encurtidas',
        description: 'Setas en encurtido rápido',
        yield: '200g de setas',
        ingredients: [
          { name: 'Setas', amount: '200', unit: 'g' },
          { name: 'Vinagre de manzana', amount: '100', unit: 'g' },
          { name: 'Agua', amount: '30', unit: 'g' },
          { name: 'Azúcar', amount: '10', unit: 'g' }
        ],
        preparation: [
          'Unir todos los ingredientes, excepto las setas, en un cazo',
          'Llevar a ebullición',
          'Una vez arranque el hervor, verter sobre las setas previamente dispuestas en una Gastronorm',
          'Filmar a piel',
          'Dejar cocinar a temperatura ambiente hasta que la mezcla se enfríe',
          'Reservar para el tartar de setas'
        ],
        time: '2-3 horas',
        storage: 'Refrigerado: 3-4 días',
        tips: [
          'Las setas absorben bien el encurtido',
          'Perfecto para tartar o guarnición',
          'El azúcar equilibra la acidez'
        ]
      },
      {
        name: 'Rábanos Encurtidos',
        description: 'Círculos de rábano con salmuera asiática',
        yield: 'Variable',
        ingredients: [
          { name: 'Círculos de rábano', amount: 'c.s.', unit: '' },
          { name: 'Agua', amount: '500', unit: 'g' },
          { name: 'Vinagre de arroz', amount: '250', unit: 'g' },
          { name: 'Aceite de sésamo', amount: '100', unit: 'g' },
          { name: 'Chile picante', amount: '1', unit: 'unidad' },
          { name: 'Pimiento verde troceado', amount: '1', unit: 'unidad' },
          { name: 'Pimienta negra en grano', amount: '15', unit: 'g' },
          { name: 'Albahaca roja', amount: '15', unit: 'g' },
          { name: 'Sal', amount: '20', unit: 'g' },
          { name: 'Azúcar de caña', amount: '6', unit: 'g' },
          { name: 'Tallo de lemon grass', amount: '1', unit: 'unidad' },
          { name: 'Galanga fresca', amount: '10', unit: 'g' }
        ],
        preparation: [
          'Elaborar una salmuera con todos los ingredientes excepto el rábano',
          'Introducir en bolsas de vacío los círculos de rábano y la salmuera',
          'Usar 40 círculos y 50g de salmuera por bolsa',
          'Reservar durante 3 horas'
        ],
        time: '3 horas',
        storage: 'Refrigerado al vacío',
        tips: [
          'Sabores asiáticos intensos',
          'El lemon grass y la galanga son esenciales',
          'Perfecto para platos orientales'
        ]
      }
    ]
  },
  'Encurtidos Genéricos': {
    name: 'Encurtidos Genéricos',
    description: 'Encurtidos para ingredientes y aplicaciones concretas',
    recipes: [
      {
        name: 'Encurtido para flores y vegetales delicados',
        description: 'Encurtido suave para flores y vegetales delicados',
        yield: '150g de producto',
        ingredients: [
          { name: 'Ingrediente a encurtir (ej: hinojo Marino, Flor de Calabacín)', amount: '150', unit: 'g' },
          { name: 'Vinagre de arroz', amount: '40', unit: 'g' },
          { name: 'Vinagre balsámico blanco', amount: '60', unit: 'g' },
          { name: 'Agua', amount: '20', unit: 'g' },
          { name: 'Sal', amount: 'c.s.', unit: '' }
        ],
        preparation: [
          'Mezclar los líquidos con la sal hasta homogenizar',
          'Envasar con el ingrediente a encurtir al vacío',
          'Dejar encurtir en cámara durante un mínimo de 2 meses'
        ],
        time: '2 meses mínimo',
        storage: 'Refrigerado al vacío',
        tips: [
          'Para ingredientes delicados',
          'La larga maceración es clave',
          'Ideal para flores comestibles'
        ]
      },
      {
        name: 'Encurtidos al vacío',
        description: 'Encurtido cocido al vacío',
        yield: '4 porciones',
        ingredients: [
          { name: 'Ingredientes a encurtir (ej: cebolla, cebolleta, colinabo)', amount: '4', unit: 'porciones' },
          { name: 'Vinagre de arroz', amount: '75', unit: 'g' },
          { name: 'Agua', amount: '75', unit: 'g' },
          { name: 'Pimienta rosa en grano', amount: '10', unit: 'g' },
          { name: 'Perejil', amount: '2', unit: 'g' },
          { name: 'Rama de canela', amount: '2', unit: 'unidades' },
          { name: 'Hoja de laurel', amount: '12', unit: 'unidades' },
          { name: 'Sal', amount: 'c.s.', unit: '' },
          { name: 'Azúcar', amount: 'c.s.', unit: '' }
        ],
        preparation: [
          'Envasar los ingredientes a encurtir con el resto de elementos, previamente mezclados, al vacío',
          'Cocer a 90°C durante 30 minutos',
          'Enfriar',
          'Dejar encurtir en cámara durante un mínimo de 3 meses'
        ],
        time: '3 meses mínimo',
        storage: 'Refrigerado al vacío',
        tips: [
          'Cocción al vacío conserva estructura',
          'Las especias aportan complejidad',
          'Paciencia recompensada con el tiempo'
        ]
      },
      {
        name: 'Encurtidos para pimientos',
        description: 'Encurtido para pimientos',
        yield: '50g de producto',
        ingredients: [
          { name: 'Ingrediente a encurtir (ej: pimiento de Padrón)', amount: '50', unit: 'g' },
          { name: 'Vinagre balsámico blanco', amount: '100', unit: 'g' },
          { name: 'Vinagre de manzana', amount: '30', unit: 'g' },
          { name: 'Sal', amount: '10', unit: 'g' },
          { name: 'Agua', amount: '30', unit: 'g' }
        ],
        preparation: [
          'Mezclar ambos vinagres',
          'Incorporar la sal y remover hasta disolverla',
          'Agregar el agua',
          'Envasar al vacío con el ingrediente a encurtir',
          'Dejar encurtir en cámara durante un mínimo de 2 semanas'
        ],
        time: '2 semanas mínimo',
        storage: 'Refrigerado al vacío',
        tips: [
          'Equilibrio perfecto para pimientos',
          'El balsámico blanco aporta suavidad',
          'Dos semanas mínimo para mejor resultado'
        ]
      },
      {
        name: 'Encurtido para vegetales',
        description: 'Encurtido dulce para vegetales',
        yield: '50g de producto',
        ingredients: [
          { name: 'Ingrediente a encurtir (ej: pepinillo, zanahoria)', amount: '50', unit: 'g' },
          { name: 'Vinagre de arroz', amount: '100', unit: 'g' },
          { name: 'Vinagre balsámico blanco', amount: '50', unit: 'g' },
          { name: 'Sal', amount: '15', unit: 'g' },
          { name: 'Azúcar', amount: '15', unit: 'g' }
        ],
        preparation: [
          'Mezclar ambos vinagres',
          'Incorporar la sal y el azúcar',
          'Remover hasta homogeneizar',
          'Envasar con el ingrediente a encurtir al vacío',
          'Dejar encurtir en cámara durante un mínimo de 2 semanas'
        ],
        time: '2 semanas mínimo',
        storage: 'Refrigerado al vacío',
        tips: [
          'Balance dulce-ácido perfecto',
          'Ideal para pepinillos y zanahorias',
          'También funciona con flores comestibles'
        ]
      }
    ]
  },
  'Otros Encurtidos': {
    name: 'Otros Encurtidos',
    description: 'Encurtidos únicos y preparaciones especiales',
    recipes: [
      {
        name: 'Cereza Encurtida',
        description: 'Cerezas deshuesadas en vinagre de sidra',
        yield: '30 unidades',
        ingredients: [
          { name: 'Cerezas', amount: '30', unit: 'unidades' },
          { name: 'Vinagre de sidra', amount: 'c.s.', unit: '' }
        ],
        preparation: [
          'Deshuesar las cerezas',
          'Introducir en un bol',
          'Cubrir con el vinagre de sidra',
          'Dejar encurtir en cámara durante 2 horas',
          'Reservar hasta el momento del pase',
          'Atemperar antes de servir',
          'Hacer por servicio'
        ],
        time: '2 horas',
        storage: 'Hacer por servicio',
        tips: [
          'Encurtido rápido',
          'Atemperar antes de servir para mejor sabor',
          'Ideal para postres o platos agridulces'
        ]
      },
      {
        name: 'Algas Encurtidas',
        description: 'Alga roja en vinagre con almíbar',
        yield: '200g de algas',
        ingredients: [
          { name: 'Alga roja', amount: '200', unit: 'g' },
          { name: 'Vinagre Chardonnay', amount: '100', unit: 'g' },
          { name: 'Almíbar TPT', amount: '30', unit: 'g' },
          { name: 'Sal', amount: '5', unit: 'g' }
        ],
        preparation: [
          'Mezclar todos los ingredientes en frío',
          'Dejar marinar en cámara durante 24 horas',
          'Reservar en cámara hasta el momento del pase'
        ],
        time: '24 horas',
        storage: 'Refrigerado',
        tips: [
          'Preparación en frío',
          'El almíbar equilibra la acidez',
          'Textura única de las algas'
        ]
      },
      {
        name: 'Mostaza Encurtida',
        description: 'Granos de mostaza cocidos en vinagre',
        yield: '150g de mostaza',
        ingredients: [
          { name: 'Mostaza en grano', amount: '150', unit: 'g' },
          { name: 'Vinagre de manzana', amount: '350', unit: 'g' },
          { name: 'Agua', amount: '350', unit: 'g' },
          { name: 'Azúcar', amount: '120', unit: 'g' }
        ],
        preparation: [
          'Mezclar todos los ingredientes',
          'Llevar a ebullición',
          'Una vez arranque el hervor, cocer hasta enternecer la mostaza y evaporar los líquidos',
          'Reservar hasta el momento del pase'
        ],
        time: '30-40 minutos',
        storage: 'Refrigerado: 1 semana',
        tips: [
          'La cocción debe reducir bien el líquido',
          'Textura final: granos tiernos',
          'Excelente condimento para carnes'
        ]
      },
      {
        name: 'Yema Encurtida',
        description: 'Yemas curadas en sal',
        yield: '6 yemas',
        ingredients: [
          { name: 'Yemas de huevo', amount: '6', unit: 'unidades' },
          { name: 'Sal', amount: '250', unit: 'g' }
        ],
        preparation: [
          'Colocar la mitad de la sal en la base de un bol',
          'Sacar cuidadosamente las yemas y colocar sobre la sal',
          'Cubrir las yemas con la sal restante',
          'Dejar que la sal actúe durante 4 horas',
          'Lavar las yemas con un hilo de agua fresca para evitar que se rompan',
          'Secar',
          'Batir con unas varillas para obtener una pasta muy sedosa'
        ],
        time: '4 horas',
        storage: 'Refrigerado: 2-3 días',
        tips: [
          'Manipular con extremo cuidado',
          'El curado con sal concentra sabores',
          'Textura sedosa única',
          'Usar como condimento gourmet'
        ]
      }
    ]
  }
};