// src/data/encurtir.ts

export interface EncurtidoRecipe {
  name: string;
  vegetables: string[];
  brineType: string;
  vinegar?: string;
  salt: string;
  sugar?: string;
  spices: string[];
  preparation: string[];
  time: string;
  storage: string;
  tips: string[];
  uses: string[];
}

export interface EncurtidoCategory {
  name: string;
  description: string;
  recipes: EncurtidoRecipe[];
  generalTips: string[];
}

export const encurtidos: Record<string, EncurtidoCategory> = {
  'Encurtidos Rápidos': {
    name: 'Encurtidos Rápidos (Quick Pickles)',
    description: 'Encurtidos que se pueden consumir en pocas horas o días. Ideales para principiantes y consumo inmediato',
    recipes: [
      {
        name: 'Pepinillos Rápidos',
        vegetables: ['Pepinos', 'Ajo', 'Eneldo fresco'],
        brineType: 'Vinagre caliente',
        vinegar: 'Vinagre blanco o de manzana',
        salt: '30g por litro',
        sugar: '50g por litro',
        spices: ['Semillas de mostaza', 'Granos de pimienta', 'Hojas de laurel'],
        preparation: [
          'Lavar y cortar pepinos en rodajas o lanzas',
          'Colocar en frascos limpios con ajo y eneldo',
          'Hervir vinagre, agua (50/50), sal y azúcar',
          'Añadir especias a la salmuera',
          'Verter salmuera caliente sobre los pepinos',
          'Dejar enfriar y refrigerar',
          'Esperar mínimo 2 horas antes de consumir'
        ],
        time: '2-24 horas',
        storage: 'Refrigerado: 2-3 semanas',
        tips: [
          'Los pepinos pequeños quedan más crujientes',
          'No hervir los pepinos, solo la salmuera',
          'Mejor sabor después de 24 horas'
        ],
        uses: ['Hamburguesas', 'Sándwiches', 'Ensaladas', 'Aperitivos', 'Acompañamiento']
      },
      {
        name: 'Cebollas Encurtidas',
        vegetables: ['Cebollas rojas', 'Ajo'],
        brineType: 'Vinagre caliente',
        vinegar: 'Vinagre de vino tinto o blanco',
        salt: '20g por litro',
        sugar: '30g por litro',
        spices: ['Orégano', 'Comino', 'Chile seco'],
        preparation: [
          'Cortar cebollas en rodajas finas',
          'Colocar en frasco limpio',
          'Hervir vinagre, agua (60/40), sal, azúcar y especias',
          'Verter sobre las cebollas',
          'Dejar enfriar y refrigerar',
          'Listas en 1 hora, mejor a las 4 horas'
        ],
        time: '1-4 horas',
        storage: 'Refrigerado: 2-3 semanas',
        tips: [
          'Las cebollas rojas mantienen mejor el color',
          'Excelentes para tacos y hamburguesas',
          'Se pueden añadir jalapeños'
        ],
        uses: ['Tacos', 'Hamburguesas', 'Ensaladas', 'Ceviches', 'Tostadas']
      },
      {
        name: 'Zanahorias y Rábanos',
        vegetables: ['Zanahorias', 'Rábanos', 'Jengibre'],
        brineType: 'Vinagre caliente',
        vinegar: 'Vinagre de arroz',
        salt: '25g por litro',
        sugar: '40g por litro',
        spices: ['Anís estrellado', 'Cilantro en grano'],
        preparation: [
          'Cortar verduras en bastones o rodajas finas',
          'Blanquear 1 minuto en agua hirviendo (opcional)',
          'Colocar en frasco con jengibre',
          'Hervir vinagre, agua, sal, azúcar y especias',
          'Verter sobre las verduras',
          'Enfriar y refrigerar',
          'Listas en 2-4 horas'
        ],
        time: '2-4 horas',
        storage: 'Refrigerado: 2 semanas',
        tips: [
          'Cortar en bastones uniformes',
          'Blanquear mantiene color vibrante',
          'Ideales para banh mi'
        ],
        uses: ['Banh mi', 'Bowls', 'Ensaladas', 'Guarnición asiática']
      },
      {
        name: 'Jalapeños Encurtidos',
        vegetables: ['Jalapeños', 'Ajo', 'Cebolla'],
        brineType: 'Vinagre caliente',
        vinegar: 'Vinagre blanco',
        salt: '30g por litro',
        sugar: '20g por litro (opcional)',
        spices: ['Orégano', 'Comino', 'Hojas de laurel'],
        preparation: [
          'Cortar jalapeños en rodajas',
          'Cortar ajo y cebolla',
          'Colocar todo en frasco',
          'Hervir vinagre, agua (70/30), sal, azúcar y especias',
          'Verter sobre los jalapeños',
          'Dejar enfriar completamente',
          'Refrigerar mínimo 1 hora'
        ],
        time: '1-2 horas',
        storage: 'Refrigerado: 1 mes',
        tips: [
          'Usar guantes al cortar',
          'Quitar semillas para menos picante',
          'La salmuera se puede reutilizar una vez'
        ],
        uses: ['Nachos', 'Tacos', 'Pizza', 'Hamburguesas', 'Quesadillas']
      }
    ],
    generalTips: [
      'Siempre usar frascos limpios y esterilizados',
      'Salmuera caliente acelera el proceso',
      'Consumir dentro de 2-3 semanas refrigerado',
      'No son aptos para conserva a largo plazo sin refrigeración',
      'Probar la salmuera antes de verter (debe estar bien sazonada)',
      'Dejar enfriar completamente antes de tapar'
    ]
  },
  'Fermentados (Lacto-fermentación)': {
    name: 'Fermentados (Lacto-fermentación)',
    description: 'Encurtidos tradicionales fermentados con sal, sin vinagre. Desarrollan probióticos beneficiosos',
    recipes: [
      {
        name: 'Chucrut (Sauerkraut)',
        vegetables: ['Col blanca o morada'],
        brineType: 'Salmuera natural (solo sal)',
        salt: '20-30g por kilo de col',
        spices: ['Semillas de alcaravea', 'Bayas de enebro (opcional)'],
        preparation: [
          'Cortar col en tiras finas',
          'Pesar la col y calcular 2-3% de sal',
          'Mezclar col con sal en un bowl grande',
          'Masajear durante 5-10 minutos hasta que suelte líquido',
          'Transferir a frasco limpio, presionando firmemente',
          'El líquido debe cubrir completamente la col',
          'Dejar 5cm de espacio en la parte superior',
          'Tapar dejando escapar gases (válvula o tapón suelto)',
          'Fermentar a temperatura ambiente (18-22°C) 3-10 días',
          'Probar diariamente hasta lograr acidez deseada',
          'Refrigerar cuando esté listo'
        ],
        time: '3-10 días de fermentación',
        storage: 'Refrigerado: varios meses',
        tips: [
          'La col debe estar completamente sumergida',
          'Usar peso de fermentación si es necesario',
          'Burbujas y espuma son normales',
          'Olor fuerte es parte del proceso',
          'Desechar si aparece moho en superficie'
        ],
        uses: ['Hot dogs', 'Reuben sandwich', 'Guarnición', 'Ensaladas', 'Probiótico natural']
      },
      {
        name: 'Pepinillos Fermentados (Pickles clásicos)',
        vegetables: ['Pepinos pequeños', 'Ajo', 'Eneldo', 'Hojas de vid o roble'],
        brineType: 'Salmuera de sal',
        salt: '50-60g por litro de agua',
        spices: ['Granos de pimienta', 'Semillas de mostaza', 'Chile seco', 'Hojas de laurel'],
        preparation: [
          'Lavar pepinos y quitar extremo de la flor',
          'Colocar hojas de vid en fondo del frasco (mantiene crujiente)',
          'Añadir pepinos, ajo, eneldo y especias',
          'Disolver sal en agua fría para hacer salmuera',
          'Verter salmuera hasta cubrir pepinos completamente',
          'Usar peso para mantener sumergidos',
          'Tapar con tapa de fermentación o gasa',
          'Fermentar 3-7 días a temperatura ambiente',
          'Probar diariamente',
          'Refrigerar cuando alcance el punto deseado'
        ],
        time: '3-7 días de fermentación',
        storage: 'Refrigerado: 6 meses o más',
        tips: [
          'Las hojas de vid/roble contienen taninos que mantienen textura crujiente',
          'Quitar el extremo de la flor previene ablandamiento',
          'Temperatura ideal: 18-22°C',
          'Cuanto más tiempo, más ácido'
        ],
        uses: ['Snack', 'Sándwiches', 'Hamburguesas', 'Ensaladas', 'Tabla de quesos']
      },
      {
        name: 'Kimchi Básico',
        vegetables: ['Col napa', 'Rábano daikon', 'Cebolletas', 'Ajo', 'Jengibre'],
        brineType: 'Salmuera + pasta de chile',
        salt: '30g por litro para salmuera inicial + pasta',
        spices: ['Gochugaru (chile coreano)', 'Salsa de pescado (opcional)'],
        preparation: [
          'Cortar col napa en cuartos y luego en trozos',
          'Sumergir en salmuera (30g/L) durante 2-4 horas',
          'Enjuagar y escurrir bien',
          'Hacer pasta: mezclar gochugaru, ajo, jengibre, salsa de pescado',
          'Cortar rábano y cebolletas',
          'Mezclar todas las verduras con la pasta',
          'Empacar firmemente en frasco limpio',
          'Presionar para eliminar bolsas de aire',
          'Dejar espacio superior, el líquido subirá',
          'Fermentar 1-5 días a temperatura ambiente',
          'Presionar diariamente para liberar gases',
          'Refrigerar cuando esté al gusto'
        ],
        time: '1-5 días de fermentación',
        storage: 'Refrigerado: varios meses, mejora con el tiempo',
        tips: [
          'Usar guantes al mezclar la pasta',
          'El gochugaru es esencial para sabor auténtico',
          'Se puede hacer versión vegetariana sin salsa de pescado',
          'Mejora después de 2 semanas en nevera'
        ],
        uses: ['Acompañamiento coreano', 'Arroz frito', 'Ramen', 'Tacos', 'Probiótico']
      },
      {
        name: 'Zanahorias Fermentadas',
        vegetables: ['Zanahorias', 'Ajo', 'Jengibre'],
        brineType: 'Salmuera de sal',
        salt: '30g por litro de agua',
        spices: ['Cúrcuma', 'Comino', 'Cilantro en grano'],
        preparation: [
          'Pelar y cortar zanahorias en bastones',
          'Colocar en frasco con ajo y jengibre',
          'Disolver sal en agua para hacer salmuera',
          'Añadir especias a la salmuera',
          'Verter sobre zanahorias hasta cubrirlas',
          'Usar peso para mantener sumergidas',
          'Tapar con válvula de fermentación',
          'Fermentar 5-7 días a temperatura ambiente',
          'Probar y refrigerar cuando estén listas'
        ],
        time: '5-7 días de fermentación',
        storage: 'Refrigerado: 3-4 meses',
        tips: [
          'Bastones gruesos mantienen mejor la textura',
          'La cúrcuma aporta color y propiedades',
          'Excelente aperitivo probiótico'
        ],
        uses: ['Snack saludable', 'Ensaladas', 'Bowl', 'Guarnición', 'Probiótico']
      }
    ],
    generalTips: [
      'NUNCA usar sal yodada, inhibe la fermentación',
      'Usar sal marina sin aditivos',
      'Mantener verduras siempre sumergidas en salmuera',
      'Temperatura ideal: 18-22°C',
      'Burbujas, espuma y olor fuerte son normales',
      'Moho blanco en superficie: quitar y continuar. Moho de colores: desechar todo',
      'Presionar diariamente para liberar gases',
      'Probar frecuentemente para encontrar tu punto preferido',
      'Una vez refrigerados, la fermentación se ralentiza mucho',
      'Los fermentados mejoran con el tiempo en nevera'
    ]
  },
  'Encurtidos en Conserva': {
    name: 'Encurtidos en Conserva (Larga duración)',
    description: 'Encurtidos procesados al baño maría para conservación prolongada sin refrigeración',
    recipes: [
      {
        name: 'Pepinillos en Conserva',
        vegetables: ['Pepinos', 'Cebolla', 'Ajo', 'Eneldo'],
        brineType: 'Vinagre procesado',
        vinegar: 'Vinagre blanco (5% acidez)',
        salt: '50g por litro',
        sugar: '100g por litro',
        spices: ['Semillas de mostaza', 'Cúrcuma', 'Granos de pimienta', 'Hojas de laurel'],
        preparation: [
          'Esterilizar frascos en agua hirviendo 10 minutos',
          'Cortar pepinos en rodajas o lanzas',
          'Empacar pepinos, cebolla, ajo y eneldo en frascos calientes',
          'Hervir vinagre, agua (50/50), sal, azúcar y especias',
          'Verter salmuera caliente dejando 1cm de espacio superior',
          'Limpiar bordes del frasco',
          'Colocar tapas nuevas y cerrar',
          'Procesar al baño maría: 10 min frascos pequeños, 15 min grandes',
          'Dejar enfriar completamente',
          'Verificar sellado (tapa cóncava)',
          'Etiquetar con fecha',
          'Esperar 6 semanas antes de abrir para mejor sabor'
        ],
        time: 'Procesamiento: 1-2 horas. Curado: 6 semanas',
        storage: 'Sellado: 1 año. Abierto refrigerado: 1 mes',
        tips: [
          'Solo usar vinagre de 5% acidez o más',
          'Tapas deben ser nuevas para cada conserva',
          'Si la tapa no selló, refrigerar y consumir pronto',
          'Desechar si hay olor extraño, moho o tapa abombada'
        ],
        uses: ['Larga conservación', 'Despensa', 'Regalos', 'Uso durante todo el año']
      },
      {
        name: 'Chutney de Mango',
        vegetables: ['Mangos verdes o semi-maduros', 'Cebolla', 'Jengibre', 'Pasas'],
        brineType: 'Vinagre cocido con azúcar',
        vinegar: 'Vinagre de manzana',
        salt: '20g por kilo de fruta',
        sugar: '400-500g por kilo de fruta',
        spices: ['Canela', 'Clavo', 'Comino', 'Mostaza en grano', 'Chile seco'],
        preparation: [
          'Pelar y cortar mangos en cubos',
          'Picar cebolla, jengibre finamente',
          'Tostar especias ligeramente',
          'Combinar todo en olla grande',
          'Añadir vinagre, azúcar, sal',
          'Cocinar a fuego lento 45-60 minutos, removiendo',
          'La mezcla debe espesar considerablemente',
          'Verter en frascos esterilizados calientes',
          'Llenar dejando 1cm de espacio',
          'Procesar al baño maría 15 minutos',
          'Enfriar y verificar sellado'
        ],
        time: 'Procesamiento: 2-3 horas. Maduración: 2-4 semanas',
        storage: 'Sellado: 1 año. Abierto refrigerado: 2 meses',
        tips: [
          'Debe quedar espeso, no líquido',
          'Mejora el sabor después de 1 mes',
          'Excelente regalo gourmet'
        ],
        uses: ['Carnes', 'Curry', 'Quesos', 'Sándwiches', 'Samosas']
      },
      {
        name: 'Pimientos Rojos Asados en Conserva',
        vegetables: ['Pimientos rojos', 'Ajo'],
        brineType: 'Vinagre o aceite + vinagre',
        vinegar: 'Vinagre de vino',
        salt: '30g por litro',
        spices: ['Orégano', 'Albahaca'],
        preparation: [
          'Asar pimientos hasta que la piel se ennegrezca',
          'Colocar en bolsa cerrada 10 minutos para sudar',
          'Pelar y quitar semillas',
          'Cortar en tiras',
          'Colocar en frascos esterilizados con ajo',
          'Opción 1: Cubrir con salmuera de vinagre hirviendo',
          'Opción 2: Cubrir con aceite de oliva + poco vinagre',
          'Dejar 1cm de espacio superior',
          'Procesar al baño maría 15 minutos',
          'Enfriar y verificar sellado'
        ],
        time: 'Procesamiento: 2 horas',
        storage: 'Sellado: 1 año. Abierto refrigerado: 2 semanas',
        tips: [
          'Si se usa aceite, agregar al menos 10% vinagre por seguridad',
          'Asegurarse de no dejar bolsas de aire',
          'El aceite solidifica en frío (normal)'
        ],
        uses: ['Antipasto', 'Pizza', 'Pasta', 'Sándwiches', 'Ensaladas']
      }
    ],
    generalTips: [
      'IMPORTANTE: Seguir estrictamente recetas probadas para seguridad',
      'Usar solo vinagre de al menos 5% acidez',
      'Esterilizar siempre frascos y tapas',
      'Tapas deben ser nuevas para cada procesamiento',
      'Procesar el tiempo completo indicado',
      'Verificar sellado: la tapa debe estar cóncava y no moverse al presionar',
      'Si no selló correctamente: refrigerar y consumir pronto',
      'DESECHAR si: tapa abombada, olor extraño, líquido turbio, moho',
      'Etiquetar con contenido y fecha',
      'Conservas duran 1 año en lugar fresco y oscuro',
      'Una vez abierto, refrigerar y consumir en 1-2 semanas'
    ]
  },
  'Encurtidos Exóticos': {
    name: 'Encurtidos Exóticos e Internacionales',
    description: 'Recetas especiales de diferentes culturas gastronómicas',
    recipes: [
      {
        name: 'Gari (Jengibre Encurtido Japonés)',
        vegetables: ['Jengibre joven'],
        brineType: 'Vinagre de arroz dulce',
        vinegar: 'Vinagre de arroz',
        salt: '20g por 250g de jengibre',
        sugar: '100g por 250ml de vinagre',
        spices: [],
        preparation: [
          'Pelar jengibre joven con cuchara',
          'Cortar en láminas muy finas (mandolina)',
          'Espolvorear con sal, dejar reposar 30 minutos',
          'Enjuagar y exprimir suavemente',
          'Blanquear en agua hirviendo 30 segundos',
          'Escurrir y colocar en frasco',
          'Calentar vinagre con azúcar hasta disolver',
          'Verter sobre el jengibre',
          'Enfriar y refrigerar',
          'Listo en 3-4 horas, mejor después de 1 día'
        ],
        time: '4 horas - 1 día',
        storage: 'Refrigerado: 2-3 meses',
        tips: [
          'El jengibre joven es menos fibroso',
          'Tomará color rosado natural con el tiempo',
          'Esencial en sushi'
        ],
        uses: ['Sushi', 'Sashimi', 'Limpia paladar', 'Guarnición japonesa']
      },
      {
        name: 'Tsukemono (Encurtido Japonés de Nabo)',
        vegetables: ['Nabo daikon', 'Alga kombu'],
        brineType: 'Sal y prensado',
        salt: '30g por kilo de nabo',
        sugar: '20g por kilo',
        spices: ['Yuzu o limón', 'Chile japonés'],
        preparation: [
          'Cortar daikon en medias lunas gruesas',
          'Colocar en recipiente con tapa pesada',
          'Espolvorear con sal y azúcar',
          'Añadir alga kombu y ralladura de yuzu',
          'Colocar peso encima (2-3 kg)',
          'Dejar a temperatura ambiente 1-2 días',
          'Refrigerar',
          'Enjuagar antes de servir'
        ],
        time: '1-2 días',
        storage: 'Refrigerado: 1 semana',
        tips: [
          'El peso hace que suelte su propio líquido',
          'Típico desayuno japonés',
          'Crujiente y refrescante'
        ],
        uses: ['Desayuno japonés', 'Acompañamiento', 'Arroz', 'Bento']
      },
      {
        name: 'Encurtido Mexicano (Escabeche)',
        vegetables: ['Zanahorias', 'Cebollas', 'Jalapeños', 'Coliflor', 'Ajo'],
        brineType: 'Vinagre con especias mexicanas',
        vinegar: 'Vinagre blanco',
        salt: '30g por litro',
        sugar: '50g por litro',
        spices: ['Orégano mexicano', 'Comino', 'Hojas de laurel', 'Pimienta gorda'],
        preparation: [
          'Cortar todas las verduras en trozos medianos',
          'Blanquear zanahorias y coliflor 2 minutos',
          'Colocar todas las verduras en frasco',
          'Hervir vinagre, agua (60/40), sal, azúcar y especias',
          'Verter sobre las verduras',
          'Dejar enfriar',
          'Refrigerar mínimo 4 horas',
          'Mejor después de 24 horas'
        ],
        time: '4-24 horas',
        storage: 'Refrigerado: 1 mes',
        tips: [
          'Mezcla colorida y versátil',
          'Ajustar picante según preferencia',
          'Se puede procesar al baño maría para conserva'
        ],
        uses: ['Tacos', 'Tortas', 'Tostadas', 'Quesadillas', 'Guarnición mexicana']
      },
      {
        name: 'Atchara (Papaya Verde Filipina)',
        vegetables: ['Papaya verde', 'Zanahoria', 'Pimiento', 'Cebolla', 'Pasas'],
        brineType: 'Vinagre dulce',
        vinegar: 'Vinagre blanco o de caña',
        salt: '20g por litro',
        sugar: '200g por litro',
        spices: ['Jengibre', 'Ajo'],
        preparation: [
          'Rallar papaya verde en tiras',
          'Salar y dejar reposar 1 hora',
          'Enjuagar y exprimir',
          'Cortar zanahoria y pimiento en juliana',
          'Picar cebolla y jengibre',
          'Mezclar todas las verduras',
          'Hervir vinagre con azúcar, jengibre y ajo',
          'Verter sobre las verduras',
          'Añadir pasas',
          'Enfriar y refrigerar',
          'Listo en 1 día'
        ],
        time: '1 día',
        storage: 'Refrigerado: 2 semanas',
        tips: [
          'Debe quedar crujiente y dulce-ácido',
          'Acompaña carnes fritas filipinas',
          'Colorido y tropical'
        ],
        uses: ['Acompañamiento filipino', 'Carnes fritas', 'Arroz', 'BBQ']
      }
    ],
    generalTips: [
      'Respetar las proporciones y técnicas tradicionales',
      'Investigar ingredientes auténticos cuando sea posible',
      'Cada cultura tiene su equilibrio único de sabores',
      'Excelentes para explorar otras gastronomías',
      'Pueden adaptarse pero mantener esencia original',
      'Ideales para acompañar platos de su región de origen'
    ]
  }
};