import type { Dictionary } from "@/i18n/types";

export const invoice: Dictionary["invoice"] = {
  heading: "Generador de facturas gratis",
  title: "Generador de facturas gratis – Crea y descarga tu factura en PDF",
  description:
    "Haz una factura profesional en minutos. Escribe directamente sobre la factura, añade tu logo, impuestos y descuentos, y descárgala en PDF. Gratis, sin registro.",
  lead: "Escribe directamente sobre la factura, añade tu logo y tus conceptos, y descarga un PDF limpio con un clic. Gratis, sin cuenta, y tus datos se quedan en tu dispositivo.",
  keywords: [
    "generador de facturas",
    "hacer factura online",
    "crear factura gratis",
    "factura pdf",
    "plantilla de factura",
    "modelo de factura",
    "hacer una factura",
    "programa de facturas gratis",
  ],
  promises: ["Sin registro ni marca de agua", "Descarga en PDF con un clic", "Se guarda en tu dispositivo, no en el nuestro"],
  steps: [
    "Haz clic en cualquier parte de la factura de arriba y escribe: tu nombre o empresa, tu cliente y lo que vendiste o hiciste.",
    "Añade una línea por cada producto o servicio con su cantidad y su precio. Los totales, los impuestos y los descuentos se calculan solos.",
    "Elige tu moneda y un color, y añade tu logo si tienes uno.",
    "Haz clic en Descargar PDF y envía el archivo a tu cliente. La factura se guarda en este navegador, así que puedes volver y editarla.",
  ],
  sections: [
    {
      heading: "Haz la factura tal como se verá",
      body: [
        "La mayoría de los generadores de facturas te dan un formulario largo y solo te muestran la factura al final. Aquí escribes directamente sobre la factura, así que lo que ves es exactamente lo que recibirá tu cliente.",
        "Haz clic en el nombre de tu empresa, el cliente, una fecha o una línea y empieza a escribir. Añade todas las líneas que necesites, cambia un precio, y el importe de la línea, la base imponible, los impuestos y el total se actualizan mientras escribes.",
      ],
    },
    {
      heading: "Impuestos, descuentos, envío y pagos parciales",
      body: [
        "Añade un tipo de impuesto, como el IVA, y se calcula sobre la base imponible después de aplicar el descuento. Puedes añadir un descuento en porcentaje, un gasto de envío y un importe ya pagado si tu cliente dejó un anticipo.",
        "Cuando hay un importe pagado, la factura muestra el saldo pendiente además del total, para que tu cliente vea exactamente lo que le queda por pagar.",
      ],
    },
    {
      heading: "Un PDF limpio que tu cliente puede abrir en cualquier sitio",
      body: [
        "Haz clic en Descargar PDF y obtendrás un PDF nítido y profesional, con tu logo, tus colores y todas las líneas ordenadas en una tabla. El texto del PDF es texto real, así que se imprime con nitidez y se puede buscar y copiar.",
        "Tu factura no lleva marca de agua ni ningún sello de «hecho con». Es tuya para enviarla.",
      ],
    },
    {
      heading: "Tus datos se quedan en tu dispositivo",
      body: [
        "La factura se crea y se guarda dentro de tu navegador. Tu nombre, los datos de tu cliente y tus precios nunca se suben a ConvertLime ni a ningún otro sitio.",
        "Como se guarda en este navegador, puedes cerrar la página y seguir donde lo dejaste. Al empezar una factura nueva, se conservan los datos de tu empresa, tu logo, la moneda y el tipo de impuesto, y el número de factura sube en uno.",
      ],
    },
  ],
  faqs: [
    {
      question: "¿De verdad es gratis este generador de facturas?",
      answer: "Sí. Puedes hacer y descargar todas las facturas que quieras. Sin cuenta, sin periodo de prueba y sin marca de agua.",
    },
    {
      question: "¿Tengo que registrarme?",
      answer: "No. Abre la página, rellena la factura y descárgala. No hay nada que registrar.",
    },
    {
      question: "¿Dónde se guarda mi factura?",
      answer:
        "En tu propio navegador, en este dispositivo. Nunca se sube. Si borras los datos del navegador o usas otro dispositivo, no estará, así que descarga el PDF para guardar una copia.",
    },
    {
      question: "¿Puedo añadir mi logo?",
      answer: "Sí. Haz clic en Añadir logo en la parte de arriba de la factura y elige una imagen PNG, JPG, WebP o SVG.",
    },
    {
      question: "¿Qué monedas puedo usar?",
      answer:
        "Veinte monedas habituales, como el dólar estadounidense, el euro, la libra, la rupia, el yen, el yuan, el won, el real y el peso. Los importes se escriben como corresponde a tu idioma y a tu moneda.",
    },
    {
      question: "¿Cómo añado impuestos o el IVA?",
      answer:
        "Escribe el porcentaje junto a IVA en los totales. Se aplica a la base imponible después del descuento, y el importe del impuesto y el total se actualizan al momento.",
    },
    {
      question: "¿Puedo editar una factura después de descargarla?",
      answer:
        "Sí. La factura sigue en este navegador después de descargarla. Cambia lo que quieras y vuelve a descargarla. Usa Nueva factura cuando quieras hacer la siguiente.",
    },
  ],
};
