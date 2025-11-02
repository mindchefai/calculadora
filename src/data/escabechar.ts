// src/data/escabechar.ts

export interface EscabecheIngredient {
  name: string;
  amount: string;
  unit: string;
}

export interface EscabecheRecipe {
  name: string;
  description: string;
  type: 'pescado' | 'ave' | 'carne' | 'vegetal' | 'otro';
  yield: string; // Rendimiento de la receta
  ingredients: EscabecheIngredient[];
  preparation: string[];
  cookingTime?: string;
  marinadeTime?: string;
  storage?: string;
  tips: string[];
}

export interface EscabecheCategory {
  name: string;
  description: string;
  recipes: EscabecheRecipe[];
}

export const escabeches: Record<string, EscabecheCategory> = {
  'Aves y Carnes': {
    name: 'Aves y Carnes',
    description: 'Escabeches tradicionales de aves de caza y carnes',
    recipes: [
      {
        name: 'Paloma Escabechada',
        description: 'Escabeche tradicional de paloma con verduras',
        type: 'ave',
        yield: '6 palomas',
        ingredients: [
          { name: 'Palomas (con hígado y corazón)', amount: '6', unit: 'unidades' },
          { name: 'Aceite de oliva suave', amount: '500', unit: 'g' },
          { name: 'Cebolla en paisana', amount: '1', unit: 'unidad' },
          { name: 'Zanahorias en paisana', amount: '2', unit: 'unidades' },
          { name: 'Puerros en paisana', amount: '2', unit: 'unidades' },
          { name: 'Ajos laminados', amount: '3', unit: 'dientes' },
          { name: 'Vino blanco', amount: '250', unit: 'g' },
          { name: 'Vinagre de vino blanco', amount: '500', unit: 'g' },
          { name: 'Agua', amount: '250', unit: 'g' },
          { name: 'Pimienta negra en grano', amount: 'c.s.', unit: '' },
          { name: 'Tomillo', amount: 'c.s.', unit: '' },
          { name: 'Laurel', amount: 'c.s.', unit: '' },
          { name: 'Sal', amount: 'c.s.', unit: '' }
        ],
        preparation: [
          'Rehogar las palomas en el aceite de oliva hasta obtener un tono dorado',
          'Añadir las verduras, el ajo, la pimienta negra, el tomillo, el laurel y dorar',
          'Verter el vino blanco y dejar reducir hasta que se evapore el alcohol',
          'Cocer durante 5 minutos',
          'Agregar el vinagre y cubrir con el agua',
          'Cocinar durante 3 horas hasta que las palomas estén tiernas',
          'Poner a punto de sal y dejar enfriar a temperatura ambiente durante 12 horas',
          'Pasar todo el conjunto a un recipiente hermético',
          'Reservar en cámara a 3-4°C durante 24 horas'
        ],
        cookingTime: '3 horas',
        marinadeTime: '24 horas',
        storage: 'Refrigerado 3-4°C',
        tips: [
          'Las palomas deben estar bien doradas antes de añadir líquidos',
          'El tiempo de cocción largo es esencial para que queden tiernas',
          'Dejar reposar mínimo 24h para que desarrolle sabor'
        ]
      },
      {
        name: 'Perdiz Escabechada',
        description: 'Escabeche clásico de perdiz de caza',
        type: 'ave',
        yield: '3 perdices',
        ingredients: [
          { name: 'Perdices sin interiores', amount: '3', unit: 'unidades' },
          { name: 'Aceite', amount: '1', unit: 'litro' },
          { name: 'Cebolla', amount: '1', unit: 'unidad' },
          { name: 'Puerros', amount: '3', unit: 'unidades' },
          { name: 'Zanahorias', amount: '3', unit: 'unidades' },
          { name: 'Ajos laminados', amount: '4', unit: 'dientes' },
          { name: 'Vinagre', amount: '1', unit: 'litro' },
          { name: 'Vino blanco', amount: '500', unit: 'ml' },
          { name: 'Agua', amount: '500', unit: 'ml' },
          { name: 'Laurel', amount: 'c.s.', unit: '' },
          { name: 'Pimienta negra en grano', amount: 'c.s.', unit: '' },
          { name: 'Sal', amount: 'c.s.', unit: '' }
        ],
        preparation: [
          'Bridar las perdices',
          'Rehogar en el aceite hasta que adquieran un tono dorado',
          'Añadir todas las verduras cortadas en paisana, el ajo, el laurel y la pimienta negra',
          'Seguir rehogando e incorporar el vinagre, el vino blanco y el agua',
          'Poner punto de sal',
          'Cocer durante 4 horas aproximadamente, hasta que las perdices estén tiernas',
          'Dejar enfriar',
          'Introducir en un recipiente hermético',
          'Reservar en cámara a 3-4°C durante un mínimo de 48 horas'
        ],
        cookingTime: '4 horas',
        marinadeTime: '48 horas mínimo',
        storage: 'Refrigerado 3-4°C',
        tips: [
          'Bridar ayuda a mantener la forma durante la cocción larga',
          'La cocción de 4 horas es necesaria para perdices tiernas',
          'Reposar mínimo 48h mejora significativamente el sabor'
        ]
      },
      {
        name: 'Codorniz Escabechada',
        description: 'Escabeche aromático de codorniz con especias',
        type: 'ave',
        yield: '400g de pechuga',
        ingredients: [
          { name: 'Pechuga de codorniz', amount: '400', unit: 'g' },
          { name: 'Cebolla en juliana', amount: '90', unit: 'g' },
          { name: 'Ajo laminado', amount: '8', unit: 'g' },
          { name: 'Aceite', amount: '200', unit: 'g' },
          { name: 'Zanahoria en juliana', amount: '40', unit: 'g' },
          { name: 'Sal', amount: '10', unit: 'g' },
          { name: 'Pimienta negra en grano', amount: '6', unit: 'g' },
          { name: 'Pimentón dulce Tap de Cortí', amount: '9', unit: 'g' },
          { name: 'Enebro', amount: '5', unit: 'g' },
          { name: 'Clavo de olor', amount: '3', unit: 'g' },
          { name: 'Canela en rama', amount: '7', unit: 'g' },
          { name: 'Azúcar moreno', amount: '50', unit: 'g' },
          { name: 'Agua', amount: '200', unit: 'g' },
          { name: 'Zumo de naranja', amount: '100', unit: 'g' },
          { name: 'Vinagre de sidra', amount: '200', unit: 'g' }
        ],
        preparation: [
          'Limpiar las pechugas de codorniz y disponer en un recipiente hondo',
          'Sofreír la cebolla y el ajo en una olla',
          'Una vez dorados, agregar la zanahoria y rehogar hasta que resulte tierna',
          'Añadir la sal, pimienta, pimentón, enebro, clavo y canela',
          'Cocinar a fuego medio durante 20-30 segundos',
          'Incorporar el azúcar moreno y disolver',
          'Agregar el agua y el zumo de naranja, llevar a ebullición',
          'Añadir el vinagre y dejar reducir ⅓',
          'Retirar del fuego y verter en caliente sobre las pechugas',
          'Dejar escabechar en cámara durante 12 horas',
          'Extraer las pechugas y secar sobre papel absorbente',
          'En el momento del pase: salpimentar, brasear y cortar en siete trozos'
        ],
        cookingTime: '20-30 minutos',
        marinadeTime: '12 horas',
        storage: 'Refrigerado',
        tips: [
          'Las especias deben tostarse brevemente para liberar aromas',
          'El zumo de naranja aporta dulzor y acidez equilibrada',
          'Brasear justo antes de servir para mejor textura'
        ]
      }
    ]
  },
  'Pescados': {
    name: 'Pescados',
    description: 'Escabeches de pescado y mariscos',
    recipes: [
      {
        name: 'Escabeche de Trucha',
        description: 'Trucha al vacío con escabeche',
        type: 'pescado',
        yield: '500g de trucha',
        ingredients: [
          { name: 'Trucha', amount: '500', unit: 'g' },
          { name: 'Cebolleta', amount: '1', unit: 'unidad' },
          { name: 'Limón', amount: '1', unit: 'unidad' },
          { name: 'Guindilla', amount: 'c.s.', unit: '' },
          { name: 'Vino blanco', amount: '500', unit: 'ml' },
          { name: 'Salsa de soja', amount: 'c.s.', unit: '' },
          { name: 'Cabeza de ajo', amount: '1', unit: 'unidad' },
          { name: 'Aceite de oliva', amount: '500', unit: 'ml' },
          { name: 'Vinagre de Jerez', amount: '250', unit: 'ml' },
          { name: 'Vinagre balsámico', amount: '250', unit: 'ml' },
          { name: 'Hojas de laurel', amount: '4', unit: 'unidades' },
          { name: 'Sal', amount: 'c.s.', unit: '' },
          { name: 'Pimienta en grano', amount: 'c.s.', unit: '' }
        ],
        preparation: [
          'Cortar el tallo de la cebolleta y picar el ajo',
          'Cocer en una sartén con el vino blanco y el aceite de oliva',
          'Añadir la guindilla, granos de pimienta, laurel, los vinagres y salsa de soja',
          'Cocinar durante 25 minutos y reservar',
          'Limpiar y abrir la trucha',
          'Sazonar, colocar un par de rodajas de limón y cerrar',
          'Introducir en una bolsa de vacío la trucha junto al escabeche',
          'Cocinar al vacío a 65°C durante 10 minutos'
        ],
        cookingTime: '25 min + 10 min vacío',
        marinadeTime: 'Inmediato',
        storage: 'Consumir recién hecho',
        tips: [
          'La cocción al vacío mantiene la trucha jugosa',
          'Los dos tipos de vinagre aportan complejidad',
          'Las rodajas de limón aromatizan desde dentro'
        ]
      }
    ]
  },
  'Vegetales': {
    name: 'Vegetales',
    description: 'Escabeches de verduras y hortalizas',
    recipes: [
      {
        name: 'Puré de Zanahoria Escabechada',
        description: 'Puré cremoso con sabor a escabeche',
        type: 'vegetal',
        yield: '200g de zanahoria',
        ingredients: [
          { name: 'Zanahoria', amount: '200', unit: 'g' },
          { name: 'Agua', amount: '1', unit: 'litro' },
          { name: 'Hoja de laurel', amount: '1', unit: 'unidad' },
          { name: 'Aceite de oliva virgen extra', amount: '20', unit: 'g' },
          { name: 'Vinagre de Jerez', amount: '20', unit: 'g' },
          { name: 'Sal', amount: 'c.s.', unit: '' },
          { name: 'Pimienta negra recién molida', amount: 'c.s.', unit: '' },
          { name: 'Comino en polvo', amount: 'c.s.', unit: '' }
        ],
        preparation: [
          'Pelar y cortar la zanahoria en rodajas',
          'Introducir en una olla con el agua y la hoja de laurel',
          'Llevar a ebullición y cocer durante 20 minutos hasta que esté tierna',
          'Triturar la zanahoria con el aceite y el vinagre hasta obtener un puré liso',
          'Pasar por un colador fino',
          'Salpimentar y agregar comino en polvo',
          'Introducir en una manga y reservar'
        ],
        cookingTime: '20 minutos',
        marinadeTime: 'No requiere',
        storage: 'Refrigerado: 2-3 días',
        tips: [
          'El comino aporta un toque especiado característico',
          'Colar bien para textura sedosa',
          'Usar manga pastelera para emplatado elegante'
        ]
      },
            {
        name: 'Escabeche de Remolacha',
        description: 'Escabeche dulce con licuado de remolacha',
        type: 'otro',
        yield: '400g licuado',
        ingredients: [
          { name: 'Licuado de remolacha', amount: '400', unit: 'g' },
          { name: 'Vinagre de Módena', amount: '50', unit: 'g' },
          { name: 'Azúcar moreno', amount: '25', unit: 'g' },
          { name: 'Granos de pimienta de Jamaica', amount: '8', unit: 'unidades' },
          { name: 'Clavos', amount: '3', unit: 'unidades' },
          { name: 'Pimienta rosa', amount: '3', unit: 'g' },
          { name: 'Anís estrellado', amount: '1', unit: 'unidad' },
          { name: 'Rama de canela', amount: '0,5', unit: 'unidad' },
          { name: 'Tomillo', amount: 'c.s.', unit: '' }
        ],
        preparation: [
          'Introducir todos los ingredientes en un cazo',
          'Llevar a ebullición',
          'Cocer a fuego suave 10 minutos',
          'Retirar del fuego y filmar',
          'Dejar infusionar 12 horas',
          'Colar y reservar'
        ],
        cookingTime: '10 minutos',
        marinadeTime: '12 horas',
        storage: 'Refrigerado: 1 semana',
        tips: [
          'La infusión larga desarrolla los aromas',
          'El color intenso es espectacular',
          'Versátil para distintas aplicaciones'
        ]
      },
      {
        name: 'Terrina de Escabeche de Coliflor',
        description: 'Coliflor escabechada gelificada con agar',
        type: 'vegetal',
        yield: '600g de coliflor',
        ingredients: [
          { name: 'Coliflor rallada', amount: '600', unit: 'g' },
          { name: 'Cebolla en brunoise', amount: '200', unit: 'g' },
          { name: 'Zanahoria en brunoise', amount: '70', unit: 'g' },
          { name: 'Ajo en brunoise', amount: '10', unit: 'g' },
          { name: 'Pimentón dulce', amount: '10', unit: 'g' },
          { name: 'Vinagre de sidra', amount: '300', unit: 'g' },
          { name: 'Agua', amount: '400', unit: 'g' },
          { name: 'Aceite de oliva suave', amount: '200', unit: 'g' },
          { name: 'Hoja de laurel', amount: '1', unit: 'unidad' },
          { name: 'Canela en rama', amount: '20', unit: 'g' },
          { name: 'Clavos de olor', amount: '4', unit: 'unidades' },
          { name: 'Anís estrellado', amount: '2', unit: 'unidades' },
          { name: 'Agar agar', amount: '16', unit: 'g' }
        ],
        preparation: [
          'Sofreír la brunoise de cebolla, zanahoria y ajo',
          'Incorporar el pimentón dulce y el vinagre de sidra',
          'Dejar reducir el vinagre a la mitad',
          'Agregar el agua, el aceite y las especias',
          'Cocer durante 10 minutos y colar',
          'Añadir el agar agar y llevar a ebullición',
          'Retirar del fuego e incorporar la coliflor rallada',
          'Extender en una bandeja y dejar gelificar en cámara',
          'Cortar en dados de 1 cm de lado'
        ],
        cookingTime: '10 minutos',
        marinadeTime: 'Gelificación',
        storage: 'Refrigerado: 3-4 días',
        tips: [
          'El agar agar debe hervir para activarse',
          'Cortar en dados uniformes para presentación',
          'La coliflor se añade cruda al final'
        ]
      },
      {
        name: 'Patata en Escabeche',
        description: 'Patatas escabechadas con especias',
        type: 'vegetal',
        yield: '500g de patata',
        ingredients: [
          { name: 'Patata', amount: '500', unit: 'g' },
          { name: 'Cebolla en brunoise', amount: '100', unit: 'g' },
          { name: 'Zanahoria en brunoise', amount: '70', unit: 'g' },
          { name: 'Ajo en brunoise', amount: '10', unit: 'g' },
          { name: 'Aceite de oliva suave', amount: '500', unit: 'g' },
          { name: 'Vinagre de sidra', amount: '500', unit: 'g' },
          { name: 'Pimentón dulce', amount: '10', unit: 'g' },
          { name: 'Enebro', amount: '5', unit: 'g' },
          { name: 'Clavo de olor', amount: '3', unit: 'g' },
          { name: 'Rama de canela', amount: '1', unit: 'unidad' },
          { name: 'Hojas de laurel', amount: '2', unit: 'unidades' },
          { name: 'Sal', amount: '15', unit: 'g' },
          { name: 'Pimienta negra recién molida', amount: '3', unit: 'g' },
          { name: 'Agua', amount: '1', unit: 'litro' }
        ],
        preparation: [
          'Sofreír la cebolla, zanahoria y ajo en el aceite',
          'Incorporar el vinagre y dejar reducir ⅓',
          'Agregar pimentón, enebro, clavo, canela, laurel, sal y pimienta',
          'Verter el agua y dejar reducir a la mitad',
          'Colar y llevar el escabeche a ebullición',
          'Añadir la patata pelada y cortada en dados de 1 cm',
          'Cocer a fuego lento durante 10 minutos',
          'Dejar enfriar',
          'Calentar en su escabeche antes de servir'
        ],
        cookingTime: '10 minutos',
        marinadeTime: 'En su escabeche',
        storage: 'Refrigerado en líquido',
        tips: [
          'Las patatas Ratte son ideales por su textura',
          'Cortar en dados uniformes para cocción pareja',
          'Calentar justo antes de servir'
        ]
      },
      {
        name: 'Setas Escabechadas',
        description: 'Setas con escabeche de miso',
        type: 'vegetal',
        yield: '500g de setas',
        ingredients: [
          { name: 'Setas', amount: '500', unit: 'g' },
          { name: 'Ajos', amount: '3', unit: 'dientes' },
          { name: 'Aceite de oliva 0.4', amount: '150', unit: 'g' },
          { name: 'Vinagre de arroz', amount: '45', unit: 'g' },
          { name: 'Rama de tomillo', amount: '1', unit: 'unidad' },
          { name: 'Miso', amount: '250', unit: 'g' },
          { name: 'Fondo de pollo', amount: '50', unit: 'g' }
        ],
        preparation: [
          'Sofreír los ajos en el aceite',
          'Agregar el vinagre y cocinar 2 minutos',
          'Añadir el fondo de pollo, tomillo y miso',
          'Llevar a ebullición, retirar y filmar',
          'Dejar infusionar 30 minutos',
          'Retirar el tomillo y triturar',
          'Pasar por colador de malla fina',
          'Envasar el escabeche con las setas',
          'Cocinar al vacío a 65°C durante 3 minutos'
        ],
        cookingTime: '30 min + 3 min vacío',
        marinadeTime: '30 minutos',
        storage: 'Refrigerado: 2-3 días',
        tips: [
          'El miso de almendras aporta umami único',
          'La cocción al vacío preserva textura',
          'Ideal para tartar o como guarnición'
        ]
      },
      {
        name: 'Cogollo Escabechado',
        description: 'Cogollos macerados en escabeche complejo',
        type: 'vegetal',
        yield: '2 cogollos',
        ingredients: [
          { name: 'Cogollos de lechuga', amount: '2', unit: 'unidades' },
          { name: 'Vinagre balsámico blanco', amount: '240', unit: 'g' },
          { name: 'Vinagre de manzana', amount: '500', unit: 'g' },
          { name: 'Vinagre de Jerez', amount: '180', unit: 'g' },
          { name: 'Aceite de girasol', amount: '300', unit: 'g' },
          { name: 'AOVE', amount: '300', unit: 'g' },
          { name: 'Cebolla en juliana', amount: '400', unit: 'g' },
          { name: 'Ajo', amount: '30', unit: 'g' },
          { name: 'Caldo de verduras', amount: '230', unit: 'g' },
          { name: 'Pimienta negra en grano', amount: '5', unit: 'g' },
          { name: 'Garum o colatura', amount: '30', unit: 'g' }
        ],
        preparation: [
          'Mezclar los tres vinagres',
          'Mezclar ambos aceites',
          'Pochar la cebolla, ajo y pimienta en los aceites sin dorar',
          'Agregar caldo y vinagres',
          'Cocinar 5 minutos y dejar enfriar',
          'Añadir el garum o colatura para punto de sal',
          'Triturar y colar',
          'Limpiar y centrifugar cogollos',
          'Envasar con escabeche al 100% vacío',
          'Macerar 1-2 meses en cámara'
        ],
        cookingTime: '5 minutos',
        marinadeTime: '1-2 meses',
        storage: 'Refrigerado al vacío',
        tips: [
          'La maceración larga es fundamental',
          'El garum o la colatura aporta umami y salinidad',
          'Centrifugar bien antes de envasar'
        ]
      },
      {
        name: 'Algas Escabechadas',
        description: 'Algas en escabeche dulce de arroz',
        type: 'vegetal',
        yield: '500g de algas',
        ingredients: [
          { name: 'Lechuga de mar', amount: '500', unit: 'g' },
          { name: 'Vinagre de arroz', amount: '200', unit: 'g' },
          { name: 'Agua', amount: '50', unit: 'g' },
          { name: 'Azúcar', amount: '25', unit: 'g' }
        ],
        preparation: [
          'Llevar el vinagre, agua y azúcar a ebullición',
          'Añadir las algas',
          'Cocinar durante 1 minuto',
          'Retirar del fuego y dejar enfriar',
          'Reservar'
        ],
        cookingTime: '1 minuto',
        marinadeTime: 'Enfriar',
        storage: 'Refrigerado: 3-4 días',
        tips: [
          'Cocción muy breve para mantener textura',
          'El vinagre de arroz es más suave',
          'Perfecto acompañamiento para pescados'
        ]
      }
    ]
  },
  'Otros Escabeches': {
    name: 'Otros Escabeches',
    description: 'Escabeches especiales y creativos',
    recipes: [
      {
        name: 'Escabeche de Coco',
        description: 'Escabeche exótico con crema y leche de coco',
        type: 'otro',
        yield: '100g',
        ingredients: [
          { name: 'Crema de coco', amount: '43.25', unit: 'g' },
          { name: 'Leche de coco', amount: '86.51', unit: 'g' },
          { name: 'Glicerina', amount: '4.33', unit: 'g' },
          { name: 'Comino en grano', amount: '0.43', unit: 'g' },
          { name: 'Pimienta negra', amount: '0.61', unit: 'g' },
          { name: 'Laurel', amount: '0.26', unit: 'g' },
          { name: 'Colatura de anchoa', amount: '8.65', unit: 'g' },
          { name: 'Cebolla seca pelada', amount: '21.63', unit: 'g' },
          { name: 'Aceite de coco', amount: '12.98', unit: 'g' },
          { name: 'Ajo pelado', amount: '3.03', unit: 'g' },
          { name: 'Vinagre de manzana', amount: '11.68', unit: 'g' }
        ],
        preparation: [
          'Cortar la cebolla en juliana',
          'Sofreír junto con el ajo en el aceite de coco',
          'Añadir el resto de ingredientes',
          'Llevar a ebullición y reducir',
          'Enfriar y reservar en un biberón'
        ],
        cookingTime: '10-15 minutos',
        marinadeTime: 'Enfriar',
        storage: 'Refrigerado',
        tips: [
          'Receta de precisión con medidas exactas',
          'El aceite de coco aporta textura única',
          'La colatura aporta umami intenso'
        ]
      }
    ]
  }
}