// src/data/escabechar.ts

export interface EscabecheIngredient {
  name: string;
  amount: string; // Relativo a aceite, ej: "30% del aceite", "10g/L de aceite"
  optional?: boolean;
}

export interface EscabecheRecipe {
  name: string;
  description: string;
  type: 'pescado' | 'ave' | 'carne' | 'vegetal';
  oilType: string[];
  vinegarRatio: string; // % respecto al aceite
  ingredients: EscabecheIngredient[];
  spices: string[];
  preparation: string[];
  cookingTemp?: string;
  cookingTime?: string;
  marinadeTime: string;
  storage: string;
  tips: string[];
  uses: string[];
}

export interface EscabecheCategory {
  name: string;
  description: string;
  recipes: EscabecheRecipe[];
  generalTips: string[];
}

export const escabeches: Record<string, EscabecheCategory> = {
  'Pescados y Mariscos': {
    name: 'Pescados y Mariscos',
    description: 'Escabeches clásicos de pescados y mariscos, perfectos como tapas o entrantes',
    recipes: [
      {
        name: 'Escabeche de Pescado Blanco',
        description: 'Clásico escabeche español con pescado frito',
        type: 'pescado',
        oilType: ['Aceite de oliva virgen extra', 'Aceite de oliva suave'],
        vinegarRatio: '20-25%',
        ingredients: [
          { name: 'Cebolla', amount: '100g por litro de aceite' },
          { name: 'Zanahoria', amount: '80g por litro de aceite' },
          { name: 'Ajo', amount: '4-6 dientes por litro' },
          { name: 'Puerro', amount: '50g por litro de aceite', optional: true }
        ],
        spices: [
          'Hojas de laurel',
          'Granos de pimienta negra',
          'Pimentón dulce',
          'Tomillo o romero fresco'
        ],
        preparation: [
          'Freír el pescado previamente enharinado hasta dorar',
          'Retirar y colocar en recipiente profundo',
          'En el mismo aceite, sofreír cebolla y zanahoria en juliana',
          'Añadir ajo laminado y las especias',
          'Cuando las verduras estén tiernas, añadir el vinagre',
          'Cocinar 3-4 minutos para que reduzca el alcohol',
          'Verter el escabeche caliente sobre el pescado',
          'Asegurarse de que el pescado quede completamente cubierto',
          'Dejar enfriar a temperatura ambiente',
          'Refrigerar mínimo 12 horas antes de consumir'
        ],
        cookingTemp: 'Fuego medio-alto para freír, medio para escabeche',
        cookingTime: '15-20 minutos',
        marinadeTime: '12-48 horas',
        storage: 'Refrigerado: 5-7 días',
        tips: [
          'El pescado debe quedar completamente cubierto de aceite',
          'Mejor con pescados de carne firme: lubina, dorada, bacalao',
          'El sabor mejora al segundo día',
          'Servir a temperatura ambiente'
        ],
        uses: ['Tapa española', 'Entrante frío', 'Picoteo', 'Comida de verano']
      },
      {
        name: 'Escabeche de Sardinas',
        description: 'Sardinas en escabeche casero, tradición mediterránea',
        type: 'pescado',
        oilType: ['Aceite de oliva virgen extra'],
        vinegarRatio: '25-30%',
        ingredients: [
          { name: 'Cebolla', amount: '120g por litro de aceite' },
          { name: 'Zanahoria', amount: '100g por litro de aceite' },
          { name: 'Ajo', amount: '6-8 dientes por litro' }
        ],
        spices: [
          'Hojas de laurel',
          'Orégano seco',
          'Granos de pimienta',
          'Pimentón de la Vera'
        ],
        preparation: [
          'Limpiar sardinas, quitar cabeza y vísceras',
          'Salar ligeramente y dejar reposar 15 minutos',
          'Freír sardinas hasta que estén doradas',
          'Colocar en recipiente de vidrio',
          'Sofreír verduras en juliana fina',
          'Añadir especias y tostar ligeramente',
          'Incorporar vinagre y cocinar 5 minutos',
          'Verter sobre las sardinas caliente',
          'Dejar enfriar y refrigerar 24 horas'
        ],
        cookingTemp: 'Fuego medio-alto',
        cookingTime: '20 minutos',
        marinadeTime: '24-72 horas',
        storage: 'Refrigerado: 1 semana',
        tips: [
          'Sardinas frescas son esenciales',
          'El vinagre ayuda a ablandar las espinas',
          'Excelente para conservar sardinas de temporada',
          'Se puede enlatar si se procesa correctamente'
        ],
        uses: ['Tapa tradicional', 'Bocadillo', 'Sobre tostadas', 'Ensalada']
      },
      {
        name: 'Escabeche de Mejillones',
        description: 'Mejillones en escabeche suave y aromático',
        type: 'pescado',
        oilType: ['Aceite de oliva suave', 'Aceite de girasol'],
        vinegarRatio: '15-20%',
        ingredients: [
          { name: 'Cebolla', amount: '80g por litro de aceite' },
          { name: 'Pimiento rojo', amount: '60g por litro de aceite' },
          { name: 'Ajo', amount: '3-4 dientes por litro' }
        ],
        spices: [
          'Hojas de laurel',
          'Perejil fresco',
          'Pimienta blanca',
          'Clavo de olor (1-2 unidades)'
        ],
        preparation: [
          'Cocer mejillones al vapor hasta que se abran',
          'Extraer de las valvas y reservar',
          'Sofreír cebolla y pimiento en juliana',
          'Añadir ajo picado y especias',
          'Incorporar vinagre y reducir 2 minutos',
          'Añadir mejillones al escabeche',
          'Cocinar suavemente 3-4 minutos',
          'Trasladar a frasco de vidrio',
          'Cubrir completamente con el líquido',
          'Refrigerar mínimo 6 horas'
        ],
        cookingTemp: 'Fuego medio',
        cookingTime: '15 minutos',
        marinadeTime: '6-24 horas',
        storage: 'Refrigerado: 4-5 días',
        tips: [
          'Desechar mejillones que no se abran',
          'No sobrecocinar o quedarán gomosos',
          'Guardar agua de cocción para sopas',
          'Perfecto para aperitivo rápido'
        ],
        uses: ['Aperitivo', 'Tapa', 'Ensalada de arroz', 'Picoteo']
      },
      {
        name: 'Escabeche de Pulpo',
        description: 'Pulpo tierno en escabeche gallego',
        type: 'pescado',
        oilType: ['Aceite de oliva virgen extra'],
        vinegarRatio: '20%',
        ingredients: [
          { name: 'Cebolla', amount: '100g por litro de aceite' },
          { name: 'Pimiento verde', amount: '80g por litro de aceite' },
          { name: 'Ajo', amount: '5-6 dientes por litro' },
          { name: 'Caldo de cocción del pulpo', amount: '100ml por litro de aceite' }
        ],
        spices: [
          'Hojas de laurel',
          'Pimentón de la Vera (dulce y picante)',
          'Pimienta negra'
        ],
        preparation: [
          'Cocer pulpo con laurel hasta tierno (40-60 min)',
          'Dejar enfriar en su caldo, cortar en rodajas',
          'Sofreír cebolla y pimiento en juliana',
          'Añadir ajo laminado y especias',
          'Incorporar vinagre y caldo de cocción',
          'Cocinar 5 minutos',
          'Añadir pulpo y cocinar 2-3 minutos más',
          'Trasladar a recipiente de vidrio',
          'Enfriar y refrigerar 12-24 horas'
        ],
        cookingTemp: 'Fuego medio-bajo',
        cookingTime: '10 minutos (escabeche)',
        marinadeTime: '12-24 horas',
        storage: 'Refrigerado: 5 días',
        tips: [
          'El pulpo debe estar muy tierno antes de escabechar',
          'El caldo de cocción aporta mucho sabor',
          'Excelente tapa gallega',
          'Se puede congelar el pulpo antes de cocer'
        ],
        uses: ['Tapa', 'Entrante', 'Ensalada de pulpo', 'Empanada']
      }
    ],
    generalTips: [
      'Siempre usar pescado fresco y de calidad',
      'El pescado debe quedar completamente cubierto de aceite',
      'El vinagre ayuda a conservar y aporta acidez',
      'Mejor en recipientes de vidrio o cerámica',
      'El sabor mejora después de 24 horas',
      'Servir a temperatura ambiente para mejor sabor'
    ]
  },
  'Aves y Carnes': {
    name: 'Aves y Carnes',
    description: 'Escabeches de pollo, codorniz y otras carnes, técnica tradicional de conservación',
    recipes: [
      {
        name: 'Escabeche de Pollo',
        description: 'Pollo tierno en escabeche aromático',
        type: 'ave',
        oilType: ['Aceite de oliva', 'Aceite de girasol'],
        vinegarRatio: '20-25%',
        ingredients: [
          { name: 'Cebolla', amount: '120g por litro de aceite' },
          { name: 'Zanahoria', amount: '100g por litro de aceite' },
          { name: 'Ajo', amount: '6-8 dientes por litro' },
          { name: 'Vino blanco', amount: '100ml por litro de aceite', optional: true }
        ],
        spices: [
          'Hojas de laurel',
          'Tomillo fresco',
          'Romero',
          'Granos de pimienta',
          'Pimentón dulce'
        ],
        preparation: [
          'Trocear pollo en piezas medianas',
          'Salpimentar y dorar en aceite hasta que esté cocido',
          'Retirar y colocar en recipiente',
          'En el mismo aceite, sofreír cebolla y zanahoria',
          'Añadir ajo y especias, tostar ligeramente',
          'Incorporar vinagre (y vino si se usa)',
          'Cocinar 5-7 minutos a fuego medio',
          'Verter sobre el pollo caliente',
          'Asegurar que quede completamente cubierto',
          'Enfriar y refrigerar 24 horas'
        ],
        cookingTemp: 'Fuego medio-alto para dorar, medio para escabeche',
        cookingTime: '25-30 minutos',
        marinadeTime: '24-48 horas',
        storage: 'Refrigerado: 1 semana',
        tips: [
          'Mejor con muslos y contramuslos (más jugosos)',
          'El pollo debe estar bien cocido antes',
          'Excelente para aprovechar pollo entero',
          'Se puede servir frío o tibio'
        ],
        uses: ['Plato principal frío', 'Comida de verano', 'Picnic', 'Ensalada']
      },
      {
        name: 'Escabeche de Codornices',
        description: 'Codornices en escabeche fino, receta gourmet',
        type: 'ave',
        oilType: ['Aceite de oliva virgen extra'],
        vinegarRatio: '25%',
        ingredients: [
          { name: 'Cebolla', amount: '100g por litro de aceite' },
          { name: 'Zanahoria', amount: '80g por litro de aceite' },
          { name: 'Chalota', amount: '60g por litro de aceite' },
          { name: 'Ajo', amount: '4-5 dientes por litro' },
          { name: 'Vino blanco', amount: '150ml por litro de aceite' }
        ],
        spices: [
          'Hojas de laurel',
          'Tomillo fresco',
          'Enebro',
          'Pimienta rosa y negra',
          'Clavo de olor'
        ],
        preparation: [
          'Limpiar y bridar codornices',
          'Dorar en aceite hasta que estén bien cocidas',
          'Reservar en recipiente hondo',
          'Sofreír verduras en juliana fina',
          'Añadir especias y tostar',
          'Incorporar vino blanco y reducir a la mitad',
          'Añadir vinagre y cocinar 5 minutos',
          'Verter sobre codornices caliente',
          'Enfriar y refrigerar 24-48 horas'
        ],
        cookingTemp: 'Fuego medio-alto',
        cookingTime: '20-25 minutos',
        marinadeTime: '24-48 horas',
        storage: 'Refrigerado: 5-7 días',
        tips: [
          'Las codornices deben quedar jugosas por dentro',
          'Plato elegante para ocasiones especiales',
          'Se pueden deshuesar antes para facilitar consumo',
          'Mejor con codornices de granja'
        ],
        uses: ['Entrante gourmet', 'Plato principal', 'Ocasiones especiales']
      },
      {
        name: 'Escabeche de Conejo',
        description: 'Conejo tierno en escabeche rústico',
        type: 'carne',
        oilType: ['Aceite de oliva'],
        vinegarRatio: '20-25%',
        ingredients: [
          { name: 'Cebolla', amount: '150g por litro de aceite' },
          { name: 'Zanahoria', amount: '100g por litro de aceite' },
          { name: 'Ajo', amount: '8-10 dientes por litro' },
          { name: 'Vino tinto', amount: '200ml por litro de aceite', optional: true }
        ],
        spices: [
          'Hojas de laurel',
          'Romero fresco',
          'Tomillo',
          'Pimienta negra',
          'Pimentón dulce'
        ],
        preparation: [
          'Trocear conejo en piezas',
          'Marinar con sal, pimienta y hierbas 1 hora',
          'Dorar bien en aceite hasta cocinar',
          'Reservar en cazuela de barro',
          'Sofreír verduras en el mismo aceite',
          'Añadir especias y ajo',
          'Incorporar vinagre (y vino si se usa)',
          'Cocinar 8-10 minutos',
          'Verter sobre el conejo',
          'Enfriar y refrigerar 24-48 horas'
        ],
        cookingTemp: 'Fuego medio',
        cookingTime: '35-40 minutos',
        marinadeTime: '24-48 horas',
        storage: 'Refrigerado: 1 semana',
        tips: [
          'El conejo debe estar muy tierno',
          'Plato tradicional de caza',
          'Mejora mucho al segundo día',
          'Servir con pan rústico'
        ],
        uses: ['Plato tradicional', 'Comida campestre', 'Ocasión especial']
      },
      {
        name: 'Escabeche de Cerdo (Lomo)',
        description: 'Lomo de cerdo en escabeche suave',
        type: 'carne',
        oilType: ['Aceite de oliva', 'Aceite de girasol'],
        vinegarRatio: '15-20%',
        ingredients: [
          { name: 'Cebolla', amount: '100g por litro de aceite' },
          { name: 'Pimiento rojo', amount: '80g por litro de aceite' },
          { name: 'Ajo', amount: '5-6 dientes por litro' }
        ],
        spices: [
          'Hojas de laurel',
          'Orégano',
          'Pimentón dulce',
          'Comino',
          'Pimienta negra'
        ],
        preparation: [
          'Cortar lomo en medallones gruesos',
          'Salpimentar y dorar bien por ambos lados',
          'Terminar cocción hasta 65°C interno',
          'Reservar en recipiente',
          'Sofreír verduras en juliana',
          'Añadir especias y tostar',
          'Incorporar vinagre y cocinar 5 minutos',
          'Verter sobre el lomo',
          'Enfriar y refrigerar 12-24 horas'
        ],
        cookingTemp: 'Fuego medio-alto para sellar, medio para terminar',
        cookingTime: '20 minutos',
        marinadeTime: '12-24 horas',
        storage: 'Refrigerado: 5-7 días',
        tips: [
          'No sobrecocinar el lomo para que quede jugoso',
          'Cortar en lonchas finas al servir',
          'Excelente para bocadillos',
          'Más suave que otros escabeches'
        ],
        uses: ['Bocadillo', 'Plato frío', 'Tapas', 'Ensalada']
      }
    ],
    generalTips: [
      'La carne debe estar completamente cocida antes de escabechar',
      'Dorar bien para sellar jugos y dar sabor',
      'El escabeche ayuda a conservar y ablandar',
      'Mejor con cortes tiernos o aves pequeñas',
      'Servir a temperatura ambiente',
      'El sabor se intensifica con los días'
    ]
  },
  'Vegetales': {
    name: 'Vegetales',
    description: 'Escabeches de verduras, perfectos como guarnición o tapa vegetariana',
    recipes: [
      {
        name: 'Berenjenas en Escabeche',
        description: 'Berenjenas tiernas en escabeche aromático',
        type: 'vegetal',
        oilType: ['Aceite de oliva virgen extra'],
        vinegarRatio: '20-25%',
        ingredients: [
          { name: 'Cebolla', amount: '80g por litro de aceite' },
          { name: 'Ajo', amount: '6-8 dientes por litro' },
          { name: 'Pimiento rojo', amount: '60g por litro de aceite', optional: true }
        ],
        spices: [
          'Orégano seco',
          'Hojas de laurel',
          'Comino molido',
          'Pimentón dulce',
          'Perejil fresco'
        ],
        preparation: [
          'Cortar berenjenas en rodajas de 1cm',
          'Salar y dejar sudar 30 minutos',
          'Enjuagar y secar bien',
          'Freír en aceite hasta dorar',
          'Colocar en recipiente de vidrio',
          'Sofreír cebolla y ajo en el aceite',
          'Añadir especias y tostar',
          'Incorporar vinagre y cocinar 3 minutos',
          'Verter sobre berenjenas caliente',
          'Enfriar y refrigerar 12-24 horas'
        ],
        cookingTemp: 'Fuego medio-alto',
        cookingTime: '15-20 minutos',
        marinadeTime: '12-24 horas',
        storage: 'Refrigerado: 1 semana',
        tips: [
          'Salar las berenjenas elimina amargor',
          'No empapar demasiado de aceite al freír',
          'Mejor con berenjenas medianas',
          'Excelente tapa vegetariana'
        ],
        uses: ['Tapa', 'Guarnición', 'Bocadillo', 'Ensalada']
      },
      {
        name: 'Calabacín en Escabeche',
        description: 'Calabacín suave en escabeche ligero',
        type: 'vegetal',
        oilType: ['Aceite de oliva'],
        vinegarRatio: '20%',
        ingredients: [
          { name: 'Cebolla', amount: '70g por litro de aceite' },
          { name: 'Ajo', amount: '4-5 dientes por litro' },
          { name: 'Zanahoria', amount: '50g por litro de aceite', optional: true }
        ],
        spices: [
          'Hojas de laurel',
          'Tomillo fresco',
          'Menta fresca',
          'Pimienta negra'
        ],
        preparation: [
          'Cortar calabacín en rodajas gruesas',
          'Marcar a la plancha o freír ligeramente',
          'No cocinar completamente, debe quedar firme',
          'Colocar en recipiente',
          'Sofreír cebolla y ajo',
          'Añadir hierbas frescas y especias',
          'Incorporar vinagre y cocinar 3 minutos',
          'Verter sobre calabacín',
          'Enfriar y refrigerar 6-12 horas'
        ],
        cookingTemp: 'Fuego medio-alto',
        cookingTime: '10-15 minutos',
        marinadeTime: '6-12 horas',
        storage: 'Refrigerado: 5 días',
        tips: [
          'El calabacín debe quedar al dente',
          'Escabeche ligero y refrescante',
          'Perfecto para verano',
          'Se puede hacer con calabacín crudo'
        ],
        uses: ['Guarnición', 'Ensalada', 'Tapa ligera', 'Bowl vegetariano']
      },
      {
        name: 'Champiñones en Escabeche',
        description: 'Champiñones en escabeche rápido',
        type: 'vegetal',
        oilType: ['Aceite de oliva', 'Aceite de girasol'],
        vinegarRatio: '25-30%',
        ingredients: [
          { name: 'Cebolla', amount: '60g por litro de aceite' },
          { name: 'Ajo', amount: '5-6 dientes por litro' },
          { name: 'Chalota', amount: '40g por litro de aceite', optional: true }
        ],
        spices: [
          'Hojas de laurel',
          'Tomillo',
          'Perejil fresco',
          'Pimienta negra',
          'Pimentón dulce'
        ],
        preparation: [
          'Limpiar champiñones con trapo húmedo',
          'Cortar en cuartos o mitades',
          'Saltear rápidamente en aceite',
          'No deben soltar agua, fuego alto',
          'Reservar en frasco',
          'Sofreír cebolla y ajo en el aceite',
          'Añadir especias',
          'Incorporar vinagre y cocinar 2 minutos',
          'Verter sobre champiñones',
          'Enfriar y refrigerar 4-6 horas'
        ],
        cookingTemp: 'Fuego alto para champiñones, medio para escabeche',
        cookingTime: '10 minutos',
        marinadeTime: '4-6 horas',
        storage: 'Refrigerado: 1 semana',
        tips: [
          'No lavar champiñones, solo limpiar',
          'Cocción rápida a fuego alto',
          'Listos para consumir en pocas horas',
          'Perfectos para aperitivo'
        ],
        uses: ['Tapa', 'Aperitivo', 'Ensalada', 'Picoteo']
      },
      {
        name: 'Alcachofas en Escabeche',
        description: 'Alcachofas tiernas en escabeche mediterráneo',
        type: 'vegetal',
        oilType: ['Aceite de oliva virgen extra'],
        vinegarRatio: '15-20%',
        ingredients: [
          { name: 'Cebolla', amount: '50g por litro de aceite' },
          { name: 'Ajo', amount: '6-8 dientes por litro' },
          { name: 'Limón', amount: '1 por litro de aceite' }
        ],
        spices: [
          'Hojas de laurel',
          'Hierbas provenzales',
          'Pimienta negra',
          'Cilantro en grano'
        ],
        preparation: [
          'Limpiar alcachofas, quitar hojas duras',
          'Cortar en cuartos, frotar con limón',
          'Blanquear en agua con limón 5 minutos',
          'Escurrir bien',
          'Freír ligeramente en aceite',
          'Colocar en frasco',
          'Sofreír cebolla y ajo',
          'Añadir especias, vinagre y zumo de limón',
          'Cocinar 3 minutos',
          'Verter sobre alcachofas',
          'Enfriar y refrigerar 12 horas'
        ],
        cookingTemp: 'Fuego medio',
        cookingTime: '15 minutos',
        marinadeTime: '12-24 horas',
        storage: 'Refrigerado: 1 semana',
        tips: [
          'Alcachofas pequeñas son más tiernas',
          'El limón evita oxidación',
          'Escabeche suave y delicado',
          'Excelente antipasto'
        ],
        uses: ['Antipasto', 'Ensalada', 'Guarnición', 'Tabla de quesos']
      }
    ],
    generalTips: [
      'Las verduras deben estar tiernas pero firmes',
      'No sobrecocinar para mantener textura',
      'Escabeches vegetales son más ligeros en vinagre',
      'Perfectos para preparar con antelación',
      'Ideales para dietas vegetarianas',
      'Combinar diferentes verduras en un mismo escabeche'
    ]
  }
};