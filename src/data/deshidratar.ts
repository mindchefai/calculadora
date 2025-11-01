// src/data/deshidratar.ts

export interface DeshidratacionItem {
  name: string;
  prepTime?: string;
  temperature: string;
  time: string;
  thickness?: string;
  preparation: string[];
  tips: string[];
  uses: string[];
}

export interface DeshidratacionCategory {
  name: string;
  description: string;
  items: DeshidratacionItem[];
  generalTips: string[];
}

export const deshidratacion: Record<string, DeshidratacionCategory> = {
  'Frutas': {
    name: 'Frutas',
    description: 'Las frutas deshidratadas concentran sus azúcares naturales y pueden usarse como snacks, en postres o para decoración',
    items: [
      {
        name: 'Manzana',
        temperature: '55-60°C',
        time: '6-12 horas',
        thickness: '3-5mm',
        preparation: [
          'Lavar y pelar (opcional)',
          'Cortar en rodajas uniformes',
          'Sumergir en agua con limón para evitar oxidación',
          'Secar con papel absorbente',
          'Colocar en bandejas sin superposición'
        ],
        tips: [
          'Dejar la piel aporta más fibra',
          'Quitar el corazón y semillas',
          'Las rodajas más finas quedan más crujientes'
        ],
        uses: ['Snacks', 'Chips de manzana', 'Decoración', 'Infusiones', 'Compota reconstituida']
      },
      {
        name: 'Plátano',
        temperature: '55-60°C',
        time: '8-12 horas',
        thickness: '5-7mm',
        preparation: [
          'Pelar',
          'Cortar en rodajas o longitudinal',
          'Opcional: pincelar con jugo de limón',
          'Colocar en bandejas'
        ],
        tips: [
          'Usar plátanos maduros pero firmes',
          'Quedan más dulces cuanto más maduros',
          'Las rodajas diagonales son más atractivas'
        ],
        uses: ['Chips dulces', 'Snacks', 'Cereales', 'Trail mix', 'Smoothie bowls']
      },
      {
        name: 'Fresas',
        temperature: '55-60°C',
        time: '8-16 horas',
        thickness: '5mm',
        preparation: [
          'Lavar y quitar el tallo',
          'Cortar en mitades o cuartos',
          'Para chips: cortar en láminas finas',
          'Secar bien el exceso de agua'
        ],
        tips: [
          'Usar fresas maduras pero firmes',
          'Las más grandes tardan más tiempo',
          'Girar a mitad del proceso'
        ],
        uses: ['Snacks', 'Decoración de postres', 'Cereales', 'Tés', 'Polvo de fresa']
      },
      {
        name: 'Piña',
        temperature: '55-60°C',
        time: '10-18 horas',
        thickness: '5-8mm',
        preparation: [
          'Pelar y quitar el corazón',
          'Cortar en rodajas o trozos',
          'Secar el exceso de jugo',
          'Colocar sin superposición'
        ],
        tips: [
          'Usar piña madura pero firme',
          'El corazón se puede deshidratar aparte',
          'Más tiempo = más caramelizada'
        ],
        uses: ['Snacks', 'Decoración', 'Cócteles', 'Trail mix', 'Infusiones']
      },
      {
        name: 'Mango',
        temperature: '55-60°C',
        time: '8-12 horas',
        thickness: '5mm',
        preparation: [
          'Pelar y quitar el hueso',
          'Cortar en tiras o láminas',
          'Secar el exceso de jugo',
          'Distribuir en bandejas'
        ],
        tips: [
          'Usar mangos maduros pero no blandos',
          'Las tiras son más fáciles de comer',
          'Resultado flexible, no crujiente'
        ],
        uses: ['Snacks', 'Trail mix', 'Ensaladas', 'Decoración', 'Cereales']
      },
      {
        name: 'Cítricos (Naranja, Limón, Lima)',
        temperature: '55-60°C',
        time: '6-12 horas',
        thickness: '3-5mm',
        preparation: [
          'Lavar bien la piel',
          'Cortar en rodajas finas uniformes',
          'Secar con papel absorbente',
          'Quitar semillas (opcional)',
          'Colocar en bandejas'
        ],
        tips: [
          'Rodajas más finas = más rápido y crujiente',
          'Ideales para decoración',
          'Se pueden espolvorear con azúcar antes'
        ],
        uses: ['Decoración cócteles', 'Infusiones', 'Garnish', 'Aromatizar', 'Postres']
      }
    ],
    generalTips: [
      'Elegir frutas maduras pero firmes',
      'Cortar en grosores uniformes para deshidratación pareja',
      'Las frutas con mucha agua tardan más',
      'Girar las bandejas cada 2-3 horas para uniformidad',
      'Están listas cuando son flexibles pero no pegajosas',
      'Almacenar en recipientes herméticos'
    ]
  },
  'Verduras y Hortalizas': {
    name: 'Verduras y Hortalizas',
    description: 'Las verduras deshidratadas son perfectas para sopas, caldos, snacks saludables y conservar la cosecha',
    items: [
      {
        name: 'Tomate',
        temperature: '55-65°C',
        time: '8-14 horas',
        thickness: '5-8mm',
        preparation: [
          'Lavar y quitar el tallo',
          'Cortar en rodajas o mitades',
          'Quitar semillas (opcional)',
          'Salar ligeramente (opcional)',
          'Colocar con el corte hacia arriba'
        ],
        tips: [
          'Cherry o pera funcionan mejor enteros',
          'Salar ayuda a extraer humedad',
          'Pueden marinarse antes con hierbas y aceite'
        ],
        uses: ['Ensaladas', 'Pasta', 'Pizza', 'Antipasto', 'Sopas', 'Pesto']
      },
      {
        name: 'Pimiento',
        temperature: '55-60°C',
        time: '6-12 horas',
        thickness: '5mm (tiras)',
        preparation: [
          'Lavar y quitar semillas',
          'Cortar en tiras o cuadrados',
          'Blanquear 2-3 min (opcional)',
          'Secar bien',
          'Distribuir en bandejas'
        ],
        tips: [
          'Los rojos son más dulces deshidratados',
          'Blanquear preserva mejor el color',
          'Se pueden asar antes para más sabor'
        ],
        uses: ['Sopas', 'Guisos', 'Arroces', 'Condimento', 'Polvo de pimiento']
      },
      {
        name: 'Zanahoria',
        temperature: '55-60°C',
        time: '6-10 horas',
        thickness: '3-5mm',
        preparation: [
          'Pelar y lavar',
          'Cortar en rodajas o bastones',
          'Blanquear 3-4 min',
          'Sumergir en agua helada',
          'Secar bien y colocar en bandejas'
        ],
        tips: [
          'Blanquear mejora color y sabor',
          'Rodajas finas quedan tipo chips',
          'Zanahorias tiernas son mejores'
        ],
        uses: ['Chips', 'Sopas', 'Caldos', 'Snacks', 'Polvo para salsas']
      },
      {
        name: 'Calabacín',
        temperature: '55-60°C',
        time: '6-10 horas',
        thickness: '3-5mm',
        preparation: [
          'Lavar (no pelar)',
          'Cortar en rodajas o chips',
          'Salar y dejar 10 min',
          'Enjuagar y secar bien',
          'Colocar en bandejas'
        ],
        tips: [
          'Salar extrae el exceso de agua',
          'Quedan excelentes tipo chips',
          'Se pueden condimentar antes'
        ],
        uses: ['Chips', 'Snacks', 'Sopas', 'Rehidratados en guisos', 'Polvo vegetal']
      },
      {
        name: 'Col rizada (kale)',
        temperature: '50-55°C',
        time: '4-8 horas',
        preparation: [
          'Lavar y secar muy bien',
          'Quitar el tallo grueso',
          'Trozar en pedazos medianos',
          'Masajear con aceite y sal',
          'Distribuir sin amontonar'
        ],
        tips: [
          'Debe quedar completamente seco antes',
          'No apilar o quedarán húmedos',
          'Temperatura baja mantiene nutrientes',
          'Quedan tipo chips crujientes'
        ],
        uses: ['Chips saludables', 'Snacks', 'Polvo verde', 'Condimento']
      },
      {
        name: 'Champiñones',
        temperature: '50-55°C',
        time: '6-10 horas',
        thickness: '5mm',
        preparation: [
          'Limpiar con pincel o trapo húmedo',
          'No lavar bajo agua',
          'Cortar en láminas',
          'Colocar en bandejas'
        ],
        tips: [
          'No absorben agua al deshidratarse',
          'Conservan muy bien el sabor',
          'Se pueden moler para condimento umami'
        ],
        uses: ['Sopas', 'Risottos', 'Salsas', 'Caldos', 'Polvo umami']
      }
    ],
    generalTips: [
      'Blanquear preserva color, textura y nutrientes',
      'Secar muy bien después de lavar',
      'Cortar en tamaños uniformes',
      'Algunas verduras quedan mejor sin pelar',
      'Están listas cuando son quebradizas o coriáceas',
      'Almacenar protegidas de la luz y humedad'
    ]
  },
  'Hierbas y Especias': {
    name: 'Hierbas y Especias',
    description: 'Deshidratar hierbas conserva sus aceites esenciales y permite tener condimentos caseros todo el año',
    items: [
      {
        name: 'Albahaca',
        temperature: '35-40°C',
        time: '2-4 horas',
        preparation: [
          'Lavar suavemente',
          'Secar completamente con papel',
          'Quitar hojas de los tallos',
          'Colocar en una sola capa'
        ],
        tips: [
          'Temperatura baja preserva aceites',
          'No apilar las hojas',
          'Se oscurecen al deshidratar (normal)',
          'Triturar después de deshidratar'
        ],
        uses: ['Condimento', 'Mezclas de hierbas', 'Aceites', 'Pestos secos', 'Tés']
      },
      {
        name: 'Orégano',
        temperature: '35-40°C',
        time: '2-4 horas',
        preparation: [
          'Lavar y secar bien',
          'Dejar en ramas o quitar hojas',
          'Distribuir en bandejas',
          'Dar vuelta a mitad del tiempo'
        ],
        tips: [
          'Se puede colgar para secar también',
          'Sabor más concentrado que fresco',
          'Guardar hojas enteras y moler al usar'
        ],
        uses: ['Pizzas', 'Pastas', 'Carnes', 'Mezclas italianas', 'Aceites']
      },
      {
        name: 'Romero',
        temperature: '35-40°C',
        time: '2-4 horas',
        preparation: [
          'Lavar ramas enteras',
          'Secar completamente',
          'Colocar ramas separadas',
          'Pueden deshidratarse enteras'
        ],
        tips: [
          'Las hojas se caen fácilmente al secar',
          'Muy aromático incluso seco',
          'Se puede moler para mezclas'
        ],
        uses: ['Asados', 'Panes', 'Aceites', 'Sales aromáticas', 'Infusiones']
      },
      {
        name: 'Perejil',
        temperature: '40-45°C',
        time: '2-4 horas',
        preparation: [
          'Lavar y centrifugar',
          'Secar muy bien',
          'Quitar tallos gruesos',
          'Colocar suelto en bandejas'
        ],
        tips: [
          'Debe estar completamente seco antes',
          'Pierde color pero no sabor',
          'Desmorona fácilmente cuando está listo'
        ],
        uses: ['Condimento universal', 'Mezclas', 'Salsas secas', 'Decoración']
      },
      {
        name: 'Tomillo',
        temperature: '35-40°C',
        time: '2-4 horas',
        preparation: [
          'Lavar ramas',
          'Secar bien',
          'Colocar ramas enteras',
          'No requiere voltear'
        ],
        tips: [
          'Conserva muy bien su aroma',
          'Las hojas se desprenden fácil al secar',
          'Guardar entero y triturar al usar'
        ],
        uses: ['Guisos', 'Carnes', 'Sopas', 'Bouquet garni', 'Sales']
      },
      {
        name: 'Cilantro',
        temperature: '40-45°C',
        time: '2-4 horas',
        preparation: [
          'Lavar bien',
          'Secar completamente',
          'Separar hojas de tallos',
          'Distribuir en capa fina'
        ],
        tips: [
          'Pierde algo de sabor al deshidratar',
          'Mejor usar en cocciones largas',
          'Las semillas (coriandro) también se pueden secar'
        ],
        uses: ['Currys', 'Guisos', 'Mezclas mexicanas', 'Marinados']
      }
    ],
    generalTips: [
      'Temperatura baja es crucial para preservar aceites',
      'Deben estar completamente secas antes de guardar',
      'Oscurecer es normal, no pierden propiedades',
      'Guardar enteras y moler justo antes de usar',
      'Conservar en frascos oscuros, herméticos',
      'Duran hasta 1 año con buen almacenamiento'
    ]
  },
  'Carnes y Pescados': {
    name: 'Carnes y Pescados',
    description: 'Cecinas, jerkys y pescados secos son excelentes fuentes de proteína para snacks y viajes',
    items: [
      {
        name: 'Beef Jerky (Ternera)',
        temperature: '60-70°C',
        time: '4-8 horas',
        thickness: '3-5mm',
        preparation: [
          'Usar cortes magros (sin grasa)',
          'Congelar 30 min para cortar más fácil',
          'Cortar en láminas finas contra la fibra',
          'Marinar 6-24 horas',
          'Secar y colocar en bandejas'
        ],
        tips: [
          'La grasa se pone rancia, usar cortes magros',
          'Contra la fibra = más tierno',
          'Debe alcanzar 70°C por seguridad',
          'Flexible pero no húmedo cuando está listo'
        ],
        uses: ['Snack proteico', 'Senderismo', 'Viajes', 'Emergencias']
      },
      {
        name: 'Jerky de Pavo',
        temperature: '60-70°C',
        time: '4-8 horas',
        thickness: '3-5mm',
        preparation: [
          'Usar pechuga de pavo',
          'Cortar en tiras finas',
          'Marinar con salsa soja, especias',
          'Secar marinado',
          'Distribuir sin superposición'
        ],
        tips: [
          'Más bajo en grasa que ternera',
          'Se seca más rápido',
          'Marinado aporta todo el sabor'
        ],
        uses: ['Snack bajo en grasa', 'Deportes', 'Viajes', 'Proteína portátil']
      },
      {
        name: 'Salmón Seco',
        temperature: '60-70°C',
        time: '6-10 horas',
        thickness: '5-8mm',
        preparation: [
          'Usar salmón fresco de calidad',
          'Cortar en tiras',
          'Curar con sal y azúcar 2-4 horas',
          'Enjuagar y secar',
          'Colocar en bandejas'
        ],
        tips: [
          'Curado previo es esencial',
          'Resultado similar al gravlax',
          'Alto en omega-3',
          'Consumir en 1-2 semanas'
        ],
        uses: ['Aperitivos', 'Ensaladas', 'Canapés', 'Snacks gourmet']
      },
      {
        name: 'Cecina de Cerdo',
        temperature: '60-70°C',
        time: '4-8 horas',
        thickness: '3-5mm',
        preparation: [
          'Usar lomo o partes magras',
          'Cortar en láminas finas',
          'Marinar con especias 12-24h',
          'Escurrir y secar',
          'Deshidratar hasta quebradizo'
        ],
        tips: [
          'Evitar grasa visible',
          'Cocinar completamente por seguridad',
          'Variedad de marinados posibles'
        ],
        uses: ['Snacks', 'Tapas', 'Proteína de viaje', 'Aperitivos']
      }
    ],
    generalTips: [
      'CRÍTICO: mantener temperatura mínima 60°C por seguridad',
      'Usar solo carnes frescas de alta calidad',
      'Eliminar toda la grasa visible',
      'Marinar siempre en refrigeración',
      'Almacenar en refrigeración (duran 1-2 semanas)',
      'En congelador pueden durar meses',
      'Si hay duda sobre seguridad, desechar'
    ]
  },
  'Flores Comestibles': {
    name: 'Flores Comestibles',
    description: 'Las flores deshidratadas son perfectas para decoración de platos, tés e infusiones',
    items: [
      {
        name: 'Rosa',
        temperature: '35-40°C',
        time: '2-4 horas',
        preparation: [
          'Usar rosas orgánicas sin pesticidas',
          'Quitar pétalos del tallo',
          'Lavar suavemente',
          'Secar con cuidado',
          'Colocar pétalos sueltos'
        ],
        tips: [
          'Solo usar rosas comestibles',
          'Conservan bien el color',
          'Muy frágiles al secar'
        ],
        uses: ['Tés', 'Decoración', 'Postres', 'Sales florales', 'Azúcares aromatizados']
      },
      {
        name: 'Lavanda',
        temperature: '35-40°C',
        time: '2-4 horas',
        preparation: [
          'Cortar tallos con flores',
          'Colgar o colocar en bandejas',
          'Separar flores de tallos al secar',
          'Guardar solo las flores'
        ],
        tips: [
          'Muy aromática',
          'Usar con moderación en cocina',
          'Excelente para repostería'
        ],
        uses: ['Tés', 'Repostería', 'Sales', 'Decoración', 'Sachets aromáticos']
      },
      {
        name: 'Caléndula',
        temperature: '35-40°C',
        time: '2-4 horas',
        preparation: [
          'Usar solo flores comestibles',
          'Quitar pétalos o secar enteras',
          'Colocar en una capa',
          'Dar vuelta a mitad'
        ],
        tips: [
          'Color amarillo/naranja intenso',
          'Comestible y decorativa',
          'Propiedades beneficiosas'
        ],
        uses: ['Tés', 'Decoración', 'Ensaladas', 'Infusiones medicinales']
      },
      {
        name: 'Violeta',
        temperature: '35-40°C',
        time: '2-4 horas',
        preparation: [
          'Recolectar flores enteras',
          'Lavar delicadamente',
          'Secar con papel',
          'Colocar separadas'
        ],
        tips: [
          'Muy delicadas',
          'Pierden algo de color',
          'Sabor suave'
        ],
        uses: ['Decoración', 'Postres', 'Confitadas', 'Tés', 'Cristalizadas']
      }
    ],
    generalTips: [
      'IMPORTANTE: Solo usar flores comestibles certificadas',
      'Nunca usar flores de floristerías (tienen químicos)',
      'Cosechar por la mañana después del rocío',
      'Temperatura baja preserva colores y propiedades',
      'Guardar protegidas de la luz',
      'Duran 6-12 meses bien almacenadas'
    ]
  }
};