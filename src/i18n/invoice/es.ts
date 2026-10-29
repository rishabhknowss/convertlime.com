import type { Dictionary } from "@/i18n/types";

export const invoice: Dictionary["invoice"] = {
  heading: "Generador de facturas gratis",
  title: "Generador de facturas gratis y sin registro – Factura en PDF",
  description:
    "Generador de facturas gratis: elige una plantilla, escribe sobre la factura, añade tu logo y el IVA y descárgala en PDF. Sin registro ni marca de agua.",
  lead: "Este generador de facturas te deja elegir una plantilla, escribir directamente sobre ella y descargar un PDF limpio con un clic. Gratis, sin cuenta, sin marca de agua y sin que tus datos salgan de tu dispositivo.",
  keywords: [
    "generador de facturas",
    "generador de facturas gratis",
    "hacer factura",
    "hacer una factura",
    "crear factura",
    "crear factura online",
    "factura online",
    "factura gratis",
    "plantilla de factura",
    "factura en pdf",
  ],
  promises: ["Sin registro ni marca de agua", "Descarga en PDF con un clic", "Se guarda en tu dispositivo, no en el nuestro"],
  steps: [
    "Elige una plantilla de factura: Clásica, Estudio, Medianoche, Editorial o Intensa.",
    "Haz clic en cualquier parte de la factura y escribe los datos de tu negocio, los de tu cliente y una línea por cada producto o servicio con su cantidad y su precio.",
    "Añade el IVA, un descuento, el envío o un importe ya pagado. Elige la moneda y el color, y pon tu logo.",
    "Haz clic en Descargar PDF y envíasela a tu cliente. La factura queda guardada en este navegador para que puedas editarla más tarde.",
  ],
  sections: [
    {
      heading: "Un generador de facturas en el que escribes sobre la propia factura",
      body: [
        "Casi todos los programas para hacer facturas online te ponen delante un formulario largo y solo te enseñan la factura al final. Aquí escribes directamente sobre ella, así que lo que ves es exactamente lo que recibirá tu cliente.",
        "Haz clic en el nombre de tu negocio, en el cliente, en una fecha o en una línea y empieza a escribir. Añade todas las líneas que necesites: los importes, el subtotal, el IVA y el total se actualizan mientras escribes.",
      ],
    },
    {
      heading: "Cinco plantillas de factura para elegir",
      body: [
        "Clásica es un diseño limpio y tradicional. Estudio y Medianoche añaden un título grande y una imagen de portada en la parte de arriba, en claro o en oscuro. Editorial usa una tipografía con serifa elegante, e Intensa pone el total bien a la vista.",
        "Todas las plantillas admiten tu logo y tu color, y puedes cambiar de una a otra cuando quieras sin perder nada de lo que has escrito.",
      ],
    },
    {
      heading: "Qué debe llevar una factura",
      body: [
        "Una factura completa incluye el nombre y los datos de contacto de tu negocio, el nombre y la dirección de tu cliente, un número de factura único, la fecha de emisión y la fecha de vencimiento.",
        "Debajo van los productos o servicios, cada uno con su cantidad y su precio, y después el subtotal, el descuento si lo hay, impuestos como el IVA y el total a pagar. Indica en las notas o en las condiciones cómo te tienen que pagar.",
      ],
    },
    {
      heading: "IVA, descuentos, envío y pagos parciales",
      body: [
        "Escribe un tipo de IVA y se calcula sobre el subtotal después del descuento. También puedes añadir un descuento en porcentaje, un gasto de envío y un importe ya pagado si tu cliente dejó un anticipo.",
        "Cuando hay algo pagado, la factura muestra el saldo pendiente además del total, para que tu cliente vea exactamente lo que le queda por pagar.",
      ],
    },
    {
      heading: "Números de factura que se suman solos",
      body: [
        "Cada factura necesita su propio número. Empieza por INV-0001 o por tu propio formato, y al hacer clic en Nueva factura el número sube en uno y conserva el prefijo que uses.",
        "Los datos de tu negocio, el logo, la moneda, la plantilla y el tipo de IVA pasan a la siguiente factura, así que crear una nueva te lleva unos segundos.",
      ],
    },
    {
      heading: "Una factura en PDF limpia y sin marca de agua",
      body: [
        "Descargar PDF te da un PDF nítido y profesional, con tu logo, tus colores y todas las líneas ordenadas en una tabla. El texto es texto real, así que se imprime con nitidez y se puede buscar y copiar.",
        "No lleva marca de agua ni ningún sello de «hecho con». También puedes imprimir la factura directamente desde el navegador.",
      ],
    },
    {
      heading: "Tus datos se quedan en tu dispositivo",
      body: [
        "Este generador de facturas funciona por completo en tu navegador. Tu nombre, los datos de tu cliente y tus precios nunca se suben a ConvertLime ni a ningún otro sitio.",
        "La factura se guarda en este navegador, así que puedes cerrar la página y seguir más tarde donde lo dejaste.",
      ],
    },
  ],
  faqs: [
    {
      question: "¿De verdad es gratis este generador de facturas?",
      answer: "Sí. Puedes hacer y descargar todas las facturas que quieras. Sin cuenta, sin periodo de prueba, sin límites y sin marca de agua.",
    },
    {
      question: "¿Tengo que registrarme?",
      answer: "No. Abre la página, rellena la factura y descárgala. No hay nada que registrar.",
    },
    {
      question: "¿Cómo hago una factura?",
      answer:
        "Elige una plantilla, escribe tus datos y los de tu cliente, añade una línea por cada concepto con su cantidad y su precio, pon el IVA o el descuento si hace falta y haz clic en Descargar PDF.",
    },
    {
      question: "¿Qué plantillas de factura hay?",
      answer:
        "Cinco: Clásica, Estudio, Medianoche, Editorial e Intensa. Todas admiten tu logo y tu color, y puedes cambiar de plantilla cuando quieras.",
    },
    {
      question: "¿Dónde se guarda mi factura?",
      answer:
        "En tu propio navegador, en este dispositivo. Nunca se sube. Si borras los datos del navegador o cambias de dispositivo, no estará, así que descarga el PDF para guardar una copia.",
    },
    {
      question: "¿Puedo añadir mi logo?",
      answer: "Sí. Haz clic en Añadir logo en la parte de arriba de la factura y elige una imagen PNG, JPG, WebP o SVG.",
    },
    {
      question: "¿Qué monedas puedo usar?",
      answer:
        "Veinte monedas habituales, entre ellas el dólar estadounidense, el euro, la libra, la rupia, el yen, el yuan, el won, el real y el peso. La factura empieza en la moneda de tu idioma y escribe los importes como corresponde a cada moneda.",
    },
    {
      question: "¿Cómo añado el IVA u otro impuesto?",
      answer:
        "Escribe el porcentaje junto a IVA en los totales. Se aplica sobre el subtotal después del descuento, y el impuesto y el total se actualizan al momento.",
    },
    {
      question: "¿Puedo editar una factura después de descargarla?",
      answer:
        "Sí. La factura sigue en este navegador después de descargarla. Cambia lo que quieras y vuelve a descargarla, o haz clic en Nueva factura para hacer la siguiente.",
    },
  ],
};
