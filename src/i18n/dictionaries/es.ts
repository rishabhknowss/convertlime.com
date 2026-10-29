import type { Dictionary, ToolVars } from "@/i18n/types";
import { removeBg } from "@/i18n/remove-bg/es";
import { invoice } from "@/i18n/invoice/es";

const IMAGE_WORD = "imagen";
const VERBS = /^(Convertir|Comprimir|Reducir)\b/;

const lowerFirst = (text: string) => text.charAt(0).toLowerCase() + text.slice(1);

const action = (h: string) => (VERBS.test(h) ? lowerFirst(h) : `convertir ${lowerFirst(h)}`);

const pdfFiles = (label: string) => (label === IMAGE_WORD ? "imágenes" : `archivos ${label}`);

const pdfImages = (label: string) => (label === IMAGE_WORD ? "imágenes" : `imágenes ${label}`);

const pdfSource = (label: string) => (label === IMAGE_WORD ? "imágenes" : label);

const heading = (v: ToolVars) => {
  if (v.kind === "resize-kb") return `Reducir imagen a ${v.kb} KB`;
  if (v.kind === "compress") return "Comprimir imagen";
  if (v.imageToPdf) return "Imagen a PDF";
  return `Convertir ${v.from} a ${v.to}`;
};

const searchKeyword = (v: ToolVars) => {
  if (v.kind === "resize-kb") return `reducir imagen a ${v.kb} kb`;
  if (v.kind === "compress") return "comprimir imagen";
  if (v.imageToPdf) return "imagen a pdf";
  return `${v.from} a ${v.to}`.toLowerCase();
};

export const es: Dictionary = {
  site: {
    tagline: "Convertidor de archivos gratis que funciona en tu navegador",
    description:
      "Convierte archivos HEIC, AVIF, WebP, JFIF, PNG y JPG gratis desde tu navegador. Sin registro, sin subir nada y sin marca de agua: tus archivos nunca salen de tu dispositivo.",
    homeTitle: "Convertidor de archivos gratis – HEIC, AVIF y WebP a JPG y PNG",
  },
  ui: {
    nav: {
      allTools: "Todas las herramientas",
      tools: "Herramientas",
      resources: "Recursos",
      guides: "Guías",
      about: "Quiénes somos",
      privacy: "Privacidad",
      menu: "Menú",
      toggleTheme: "Cambiar entre modo claro y oscuro",
      language: "Idioma",
      filesNeverLeave: "Tus archivos nunca salen de tu dispositivo",
      contact: "Contacto",
      openSource: "Código abierto en GitHub",
      footerNote: "Los archivos se convierten en tu dispositivo y nunca se suben a internet.",
    },
    search: {
      trigger: "Buscar herramientas",
      title: "Buscar herramientas",
      placeholder: "Buscar herramientas… p. ej. heic a jpg",
      empty: "No se encontró ninguna herramienta.",
    },
    askAi: {
      label: "Pregunta a la IA sobre esta página",
      prompt:
        "Lee {url} y explícame con pasos sencillos para qué me sirve. ¿Es ConvertLime una forma segura y privada de convertir mis archivos sin subirlos?",
    },
    install: {
      button: "Instalar app",
      title: "Instalar app",
      description: "Convierte archivos en su propia ventana: se abre al instante y funciona incluso sin conexión.",
      appName: "ConvertLime – Convertidor de archivos gratis",
      cancel: "Cancelar",
      close: "Cerrar",
      install: "Instalar",
      iosStep1: "1. Toca",
      iosShare: "Compartir",
      iosStep2: "2. Elige",
      iosAdd: "Añadir a pantalla de inicio",
      manual: "Abre este sitio en Chrome o Edge y haz clic en el icono de instalar, a la derecha de la barra de direcciones.",
    },
    errors: {
      generic: "Algo salió mal. Inténtalo de nuevo.",
      copy: "No se pudo copiar la imagen. Usa Descargar.",
    },
    converter: {
      paste: "También puedes pegar una imagen con {key}+V",
      dropAnywhere: "Suelta tus archivos para añadirlos",
      choose: "Elegir {files}",
      addMore: "Añadir más {files}",
      dragDrop: "o arrástralos y suéltalos aquí",
      local: "Se convierte en tu dispositivo: no se sube nada",
      images: "imágenes",
      files: "archivos {format}",
      quality: "Calidad",
      maxSize: "Tamaño máximo",
      pageSize: "Tamaño de página",
      sameAsImage: "Igual que la imagen",
      a4: "A4",
      download: "Descargar",
      downloadAll: "Descargar todo ({count}) en ZIP",
      downloadPdf: "Descargar PDF ({count} {pages})",
      page: "página",
      pages: "páginas",
      clear: "Borrar",
      smaller: "{percent}% más pequeño",
      remove: "Quitar archivo",
      readError: "No se pudo abrir este archivo como imagen.",
      webpError: "Este navegador no puede crear archivos WebP. Prueba con Chrome, Edge o Firefox.",
      avifError: "No se pudo abrir este archivo AVIF. Prueba a abrirlo y volver a guardarlo primero.",
    },
    removeBg: {
      removeButton: "Quitar fondo",
      removeMany: "Quitar fondo de {count} imágenes",
      format: "Formato",
      downloadAs: "Descargar {format}",
      copy: "Copiar imagen",
      copied: "Copiada",
      addMore: "Añadir más imágenes",
      jpgNote: "JPG no admite transparencia, así que se usa fondo blanco. Elige PNG o WebP para mantenerlo transparente.",
      preparing: "Preparando el quitafondos… {percent}%",
      preparingNote: "Solo la primera vez: tu navegador descarga la herramienta una vez. Después empieza al instante, incluso sin conexión. Tus fotos nunca se suben.",
      working: "Quitando el fondo…",
      failed: "No se pudo quitar el fondo. La primera vez necesitas conexión a internet; inténtalo de nuevo.",
      background: "Fondo",
      transparent: "Transparente",
      white: "Blanco",
      black: "Negro",
      pickColor: "Color",
      original: "Original",
      result: "Resultado",
      compare: "Comparar original y resultado",
    },
    invoice: {
      documentTitle: "Factura",
      from: "De",
      billTo: "Facturar a",
      number: "N.º de factura",
      issued: "Fecha",
      due: "Vencimiento",
      description: "Concepto",
      quantity: "Cant.",
      rate: "Precio",
      amount: "Importe",
      subtotal: "Subtotal",
      discount: "Descuento",
      tax: "IVA",
      shipping: "Envío",
      total: "Total",
      paid: "Importe pagado",
      balance: "Saldo pendiente",
      notes: "Notas",
      terms: "Condiciones de pago",
      fromNamePlaceholder: "Tu nombre o empresa",
      fromDetailsPlaceholder: "Dirección, email, teléfono, NIF",
      toNamePlaceholder: "Nombre del cliente",
      toDetailsPlaceholder: "Dirección y email del cliente",
      itemPlaceholder: "¿Qué vendiste o hiciste?",
      notesPlaceholder: "¡Gracias por tu confianza!",
      termsPlaceholder: "Datos bancarios, enlace de pago o plazo para pagar",
      addItem: "Añadir línea",
      removeItem: "Quitar línea",
      addLogo: "Añadir logo",
      removeLogo: "Quitar logo",
      logoError: "Esa imagen no se puede usar como logo. Prueba con un PNG o JPG.",
      currency: "Moneda",
      color: "Color",
      customColor: "Color personalizado",
      newInvoice: "Nueva factura",
      newInvoiceDone: "Nueva factura creada. Se han conservado tus datos y tu logo.",
      downloadPdf: "Descargar PDF",
      print: "Imprimir",
      saved: "Guardado en este dispositivo",
      pdfFailed: "No se pudo crear el PDF. Prueba con Imprimir y elige Guardar como PDF.",
      printInstead: "Parte del texto necesita una fuente que el PDF rápido no puede usar, así que se abrirá la ventana de impresión. Elige Guardar como PDF.",
      totalDue: "Total a pagar",
      template: "Plantilla",
      templates: { classic: "Clásica", studio: "Estudio", midnight: "Medianoche", editorial: "Editorial", bold: "Intensa" },
      addCover: "Añadir una imagen de portada",
      uploadCover: "Sube la tuya",
      removeCover: "Quitar portada",
      coverError: "Esa imagen no se puede usar como portada. Prueba con un JPG o PNG.",
    },
  },
  categories: {
    edit: "Editar imágenes",
    docs: "Documentos",
    iphone: "Fotos de iPhone",
    web: "Imágenes web",
    everyday: "Formatos habituales",
    compress: "Comprimir y reducir",
    pdf: "Imágenes a PDF",
  },
  formats: {
    heic: {
      fullName: "High Efficiency Image Container",
      origin: "el formato de foto predeterminado en iPhone y iPad desde iOS 11",
      bestFor: "guardar fotos del móvil ocupando más o menos la mitad que un JPG",
      weakSpot: "Windows, muchas páginas web y las aplicaciones antiguas no lo abren",
    },
    heif: {
      fullName: "High Efficiency Image File Format",
      origin: "el estándar en el que se basa HEIC, usado por algunos móviles Android y cámaras",
      bestFor: "fotos de alta calidad en archivos pequeños",
      weakSpot: "los navegadores y la mayoría de los editores todavía no lo admiten",
    },
    avif: {
      fullName: "AV1 Image File Format",
      origin: "un formato de imagen web moderno basado en el códec de vídeo AV1",
      bestFor: "las imágenes web más ligeras con buena calidad",
      weakSpot: "los editores antiguos, Office y muchos formularios web lo rechazan",
    },
    jfif: {
      fullName: "JPEG File Interchange Format",
      origin: "una variante de JPEG con la que Windows y algunos navegadores guardan imágenes",
      bestFor: "las mismas fotos para las que sirve un JPG",
      weakSpot: "muchos formularios rechazan la extensión .jfif aunque por dentro sea un JPEG",
    },
    webp: {
      fullName: "Imagen WebP",
      origin: "el formato de imagen web de Google, que hoy usan casi todas las webs grandes",
      bestFor: "imágenes web que cargan rápido y admiten transparencia",
      weakSpot: "muchos programas de escritorio, impresoras y aplicaciones antiguas no lo abren",
    },
    png: {
      fullName: "Portable Network Graphics",
      origin: "el formato estándar de la web que no pierde calidad",
      bestFor: "capturas de pantalla, logotipos y gráficos con bordes nítidos o fondo transparente",
      weakSpot: "una foto en PNG pesa varias veces más que la misma foto en JPG",
    },
    jpg: {
      fullName: "Imagen JPEG",
      origin: "el formato de foto más compatible, que se abre en casi cualquier sitio",
      bestFor: "fotos que quieres compartir, subir o imprimir",
      weakSpot: "no admite transparencia y cada vez que se vuelve a guardar pierde un poco de calidad",
    },
    jpeg: {
      fullName: "Imagen JPEG",
      origin: "el mismo formato que JPG, solo que con la extensión más larga",
      bestFor: "fotos que quieres compartir, subir o imprimir",
      weakSpot: "algunos formularios solo aceptan la extensión .jpg",
    },
    gif: {
      fullName: "Graphics Interchange Format",
      origin: "un formato de 1987 que se sigue usando en todas partes para animaciones cortas",
      bestFor: "animaciones sencillas y stickers que se ven en cualquier sitio",
      weakSpot: "solo tiene 256 colores, así que las fotos se ven con grano",
    },
    bmp: {
      fullName: "Imagen de mapa de bits",
      origin: "un formato de imagen de Windows sin comprimir",
      bestFor: "programas y equipos antiguos que necesitan los píxeles tal cual",
      weakSpot: "los archivos son muy grandes porque no se comprime nada",
    },
    tiff: {
      fullName: "Tagged Image File Format",
      origin: "el formato que usan escáneres, imprentas y archivos fotográficos",
      bestFor: "escaneos e impresión donde no se puede perder ningún detalle",
      weakSpot: "los navegadores no lo muestran y los archivos son grandes",
    },
    ico: {
      fullName: "Icono de Windows",
      origin: "el formato de iconos de las aplicaciones de Windows y de los favicons de las webs",
      bestFor: "favicons e iconos de accesos directos del escritorio",
      weakSpot: "solo sirve para iconos pequeños y cuadrados",
    },
    svg: {
      fullName: "Scalable Vector Graphics",
      origin: "un formato vectorial hecho de formas en lugar de píxeles",
      bestFor: "logotipos e iconos que deben verse nítidos a cualquier tamaño",
      weakSpot: "las redes sociales, los documentos y muchas aplicaciones no lo aceptan",
    },
    pdf: {
      fullName: "Portable Document Format",
      origin: "el formato de documento universal",
      bestFor: "enviar, imprimir y presentar imágenes como un solo documento",
      weakSpot: "las imágenes que contiene son más difíciles de editar",
    },
  },
  compare: {
    transparent: "Fondo transparente",
    animation: "Animación",
    compression: "Compresión",
    bestFor: "Ideal para",
    yes: "Sí",
    no: "No",
    types: {
      lossy: "Con pérdida",
      lossless: "Sin pérdida",
      both: "Con o sin pérdida",
      vector: "Vectorial (sin píxeles)",
      document: "Documento",
    },
  },
  tool: {
    heading,
    h1: (v) => `${heading(v)} gratis`,
    title: (v) => {
      if (v.kind === "resize-kb") return `${heading(v)} online – Gratis y sin registro`;
      if (v.kind === "compress") return `${heading(v)} online – Gratis y sin registro`;
      return `${heading(v)} – Gratis, sin registro ni subir archivos`;
    },
    description: (v) => {
      if (v.kind === "resize-kb")
        return `Reduce tu imagen a ${v.kb} KB en segundos. Consigue una foto de menos de ${v.kb} KB para formularios y trámites, gratis, sin registro y sin que tu foto salga de tu dispositivo.`;
      if (v.kind === "compress")
        return "Comprime imágenes online gratis. Reduce el peso de fotos JPG, PNG, WebP y de iPhone desde tu navegador: sin registro, sin subir nada y sin marca de agua.";
      if (v.imageToPdf)
        return "Convierte imágenes a PDF gratis desde tu navegador. Junta varias fotos en un solo PDF: sin registro, sin subir nada y sin marca de agua. Tus archivos nunca salen de tu dispositivo.";
      return `Convierte ${v.from} a ${v.to} gratis desde tu navegador. Convierte muchos archivos de una vez: sin registro, sin subir nada y sin marca de agua. Tus archivos nunca salen de tu dispositivo.`;
    },
    lead: (v) => {
      if (v.kind === "resize-kb")
        return `Suelta una foto y obtén un JPG de menos de ${v.kb} KB, listo para formularios y trámites online.`;
      if (v.kind === "compress") return "Haz tus imágenes más ligeras sin que se vean peor.";
      if (v.imageToPdf) return "Convierte tus imágenes en un PDF en segundos. Añade todas las que quieras.";
      return `Convierte archivos ${v.from} a ${v.to} en segundos. Todos los que quieras a la vez.`;
    },
    keywords: (v) => {
      const keyword = searchKeyword(v);
      return [keyword, heading(v).toLowerCase(), `${keyword} gratis`, `${keyword} online`];
    },
    promises: ["Sin subir nada: todo queda en tu dispositivo", "Conversión al instante, por lotes", "Gratis, sin registro y sin marca de agua"],
    howToUse: (h) => `Cómo ${action(h)}`,
    versus: (from, to) => `${from} o ${to}`,
    faqHeading: (h) => `${h}: preguntas frecuentes`,
    helpfulGuides: "Guías útiles",
    moreConverters: "Más convertidores gratis",
    breadcrumbHome: "Inicio",
  },
  content: {
    convert: {
      steps: (v) => [
        `Suelta tus archivos ${v.from} en el recuadro de arriba o tócalo para elegirlos.`,
        `Cada archivo se convierte a ${v.to} al momento, en tu navegador.`,
        "Descarga los archivos uno a uno o todos juntos en un ZIP.",
      ],
      why: (v, from, to) => ({
        heading: `¿Por qué convertir ${v.from} a ${v.to}?`,
        body: [
          `${v.from} es ideal para ${from.bestFor}, pero ${from.weakSpot}. ${v.to} es ${to.origin}, así que el archivo se abrirá donde lo necesites.`,
        ],
      }),
      devices: (v) =>
        v.fromId === "heic" || v.fromId === "heif"
          ? [
              {
                heading: `Cómo convertir ${v.from} a ${v.to} en Windows`,
                body: [
                  `Windows 10 y 11 no abren fotos ${v.from} sin un códec extra de pago. Abre esta página en Edge o Chrome, suelta tus fotos y descarga los archivos ${v.to}: no tienes que instalar nada.`,
                ],
              },
              {
                heading: `Cómo convertir ${v.from} a ${v.to} en Mac`,
                body: [
                  "Vista Previa solo exporta las fotos de una en una. Para convertir una carpeta entera de golpe, arrastra las fotos a esta página y descárgalas todas juntas en un ZIP.",
                ],
              },
              {
                heading: `Cómo convertir ${v.from} a ${v.to} en iPhone`,
                body: [
                  `Abre esta página en Safari, toca el recuadro, elige tus fotos y toca Descargar. Para que las fotos nuevas dejen de guardarse en ${v.from}, ve a Ajustes → Cámara → Formatos → Más compatible.`,
                ],
              },
            ]
          : [],
      aboutHeading: (f) => `¿Qué es un archivo ${f.label}?`,
      aboutBody: (f) => [
        `${f.label} (${f.fullName}) es ${f.origin}. Es ideal para ${f.bestFor}.`,
        `El inconveniente: ${f.weakSpot}.`,
      ],
      safe: (v) => ({
        heading: `¿Es seguro convertir ${v.from} a ${v.to} aquí?`,
        body: [
          "Sí. La conversión se hace en tu propio dispositivo, dentro del navegador. Tus archivos nunca se suben a ningún servidor, así que nadie más puede verlos. Incluso funciona sin conexión una vez cargada la página.",
        ],
      }),
      faqs: (v) => [
        {
          question: `¿Es gratis convertir ${v.from} a ${v.to}?`,
          answer: `Sí. Convierte todos los archivos ${v.from} a ${v.to} que quieras: sin registro, sin límites y sin marca de agua.`,
        },
        {
          question: `¿Se suben mis archivos ${v.from} a algún sitio?`,
          answer: "No. Cada archivo se convierte en tu dispositivo, dentro del navegador. No se envía nada a ningún servidor.",
        },
        {
          question: `¿Puedo convertir muchos archivos ${v.from} a ${v.to} a la vez?`,
          answer: "Sí. Suelta todos los que quieras y descárgalos juntos en un solo archivo ZIP.",
        },
        {
          question: `¿Pierdo calidad al convertir ${v.from} a ${v.to}?`,
          answer: v.toLossless
            ? `No. ${v.to} conserva todos los píxeles, aunque el archivo puede pesar más que el original.`
            : "Muy poca. Usa el control de calidad: al 90% casi cualquier foto se ve igual que la original.",
        },
      ],
    },
    resize: {
      steps: (kb) => [
        "Suelta tu foto o tu firma en el recuadro de arriba.",
        `Buscamos la mejor calidad posible que quepa en menos de ${kb} KB.`,
        "Descarga el JPG y súbelo a tu formulario.",
      ],
      sections: (kb) => [
        {
          heading: `¿Cuándo necesitas una foto de menos de ${kb} KB?`,
          body: [
            `Los formularios de exámenes, ofertas de empleo y trámites oficiales suelen rechazar fotos y firmas que superan un tamaño máximo, y ${kb} KB es uno de los límites más habituales. Esta herramienta reduce el peso del archivo poco a poco y solo achica las dimensiones si hace falta, para que tu foto se vea lo más nítida posible.`,
          ],
        },
        {
          heading: "¿Se sube mi foto a internet?",
          body: ["No. La reducción se hace en tu navegador, así que tu foto de carnet o tu firma nunca sale de tu móvil u ordenador."],
        },
      ],
      faqs: (kb) => [
        {
          question: `¿Cómo reduzco una imagen a ${kb} KB?`,
          answer: `Suéltala en el recuadro de arriba. En un par de segundos tendrás un JPG de menos de ${kb} KB.`,
        },
        {
          question: "¿La foto se seguirá viendo bien?",
          answer: "Sí. Elegimos la mayor calidad que cabe en el límite y solo hacemos la foto más pequeña si eso no basta.",
        },
        {
          question: "¿Puedo reducir fotos HEIC del iPhone?",
          answer: "Sí. Las fotos HEIC, PNG, WebP y AVIF se convierten en un JPG por debajo del límite.",
        },
      ],
    },
    compress: {
      steps: [
        "Suelta tus imágenes en el recuadro de arriba.",
        "Elige un nivel de calidad o indica un tamaño máximo en KB.",
        "Descarga las imágenes más ligeras una a una o en un ZIP.",
      ],
      sections: [
        {
          heading: "¿Cómo funciona la compresión de imágenes?",
          body: [
            "Las fotos guardan muchos más detalles de los que el ojo puede ver. Al comprimirlas se quitan los detalles que no notarás, y el archivo puede pesar entre un 60 y un 80% menos sin ninguna diferencia visible.",
          ],
        },
        { heading: "¿Es privado?", body: ["Sí. Las imágenes se comprimen en tu navegador y nunca se suben a ningún sitio."] },
      ],
      faqs: [
        {
          question: "¿Cuánto más ligeras quedarán mis imágenes?",
          answer: "La mayoría de las fotos pesan entre un 50 y un 80% menos. Las capturas y los gráficos en PNG suelen reducirse todavía más.",
        },
        { question: "¿Puedo comprimir una imagen a un tamaño concreto?", answer: "Sí. Activa la opción de tamaño máximo y escribe un tamaño en KB." },
        { question: "¿Comprimir imágenes es gratis?", answer: "Sí: sin registro, sin límites y sin marca de agua." },
      ],
    },
    pdf: {
      imageWord: IMAGE_WORD,
      steps: (label) => [
        `Suelta una o varias ${pdfImages(label)} en el recuadro de arriba.`,
        "Elige el tamaño original o páginas A4.",
        "Descarga un solo PDF con cada imagen en su propia página.",
      ],
      why: (label) => ({
        heading: `¿Por qué convertir ${pdfFiles(label)} en PDF?`,
        body: [
          "Un PDF se ve igual en cualquier móvil u ordenador, se imprime bien y reúne muchas fotos en un solo archivo. Es ideal para formularios, recibos y para enviar documentos por correo.",
        ],
      }),
      faqs: (label) => [
        {
          question: `¿Cómo convierto ${pdfSource(label)} a PDF?`,
          answer: `Suelta tus ${pdfFiles(label)} arriba y pulsa Descargar PDF. Cada imagen será una página, en el orden en que las añadiste.`,
        },
        { question: "¿Lleva marca de agua?", answer: "No. El PDF queda limpio, es gratis y se crea en tu dispositivo." },
        { question: "¿Puedo poner muchas imágenes en un mismo PDF?", answer: "Sí. Añade todas las que quieras: irán todas en un único PDF." },
      ],
    },
  },
  home: {
    h1: "Convertidor de archivos gratis",
    h1Accent: "sin subir nada",
    intro: "Convierte archivos HEIC, AVIF, WebP, JFIF, PNG y JPG al instante desde tu navegador.",
    introStrong: "100% gratis, sin registro y sin marca de agua",
    introEnd: "– tus archivos nunca salen de tu dispositivo.",
    promises: [
      { title: "Privado", text: "Tus archivos nunca salen de tu dispositivo" },
      { title: "Al instante", text: "Convierte muchos archivos con un clic" },
      { title: "Funciona sin conexión", text: "Sin subir nada, sin esperas" },
    ],
    startWith: "Empieza con",
    guides: "Guías",
    allGuides: "Todas las guías →",
    questions: "Preguntas",
    faqs: [
      {
        question: "¿ConvertLime es gratis de verdad?",
        answer: "Sí. Todos los convertidores son gratis, sin registro, sin límite diario y sin marca de agua en tus archivos.",
      },
      {
        question: "¿Mis archivos se suben a un servidor?",
        answer:
          "No. La conversión se hace dentro del navegador, en tu propio móvil u ordenador. Tus fotos nunca salen de tu dispositivo, por eso es rápido y funciona incluso sin conexión.",
      },
      {
        question: "¿Qué tipos de archivo puedo convertir?",
        answer:
          "Fotos HEIC y HEIF del iPhone, AVIF, WebP, JFIF, PNG, JPG, GIF, BMP, TIFF, ICO y SVG. También puedes comprimir imágenes, reducirlas a un tamaño exacto en KB y convertir imágenes a PDF.",
      },
      {
        question: "¿Funciona en iPhone y Android?",
        answer:
          "Sí. Abre la web en Safari o Chrome, toca el recuadro para elegir tus fotos y descarga los archivos convertidos. También puedes añadirla a tu pantalla de inicio como si fuera una app.",
      },
    ],
    toolListName: "Convertidores de archivos gratis",
  },
  blog: {
    title: "Guías",
    metaTitle: "Guías – Abrir, convertir y comprimir imágenes",
    description:
      "Guías paso a paso para abrir archivos HEIC, AVIF, WebP y JFIF, convertirlos a JPG o PNG y reducir fotos para formularios. Gratis y sin subir nada.",
    h1: "Guías sobre archivos de imagen",
    intro: "Respuestas claras y paso a paso para abrir, convertir y reducir imágenes en Windows, Mac, iPhone y Android.",
    updated: "Actualizado",
    minRead: "min de lectura",
    onThisPage: "En esta página",
    faqTitle: "Preguntas frecuentes",
    relatedTools: "Herramientas gratis relacionadas",
    moreGuides: "Más guías",
    ctaTitle: (h) => `${h} gratis`,
    ctaButton: "Convertir ahora",
    ctaNote: "Sin registro y sin subir nada: funciona en tu navegador",
    rssTitle: "Guías de ConvertLime",
    rssDescription: "Guías paso a paso para abrir, convertir y comprimir archivos de imagen.",
  },
  about: {
    metaDescription:
      "ConvertLime es un convertidor de archivos gratis que funciona dentro de tu navegador, así que tus fotos nunca se suben a internet. Te contamos cómo funciona y por qué lo creamos.",
    h1: "Sobre ConvertLime",
    intro:
      "ConvertLime es un convertidor gratis para los archivos de imagen que más problemas dan: fotos HEIC del iPhone, imágenes AVIF y WebP guardadas de páginas web, descargas JFIF y fotos demasiado pesadas para un formulario online.",
    whyHeading: "Por qué funciona en tu navegador",
    whyBody:
      "La mayoría de los convertidores online suben tus archivos a su servidor, los convierten allí y te los devuelven. Es lento, y además el ordenador de un desconocido se queda con una copia de tus fotos. ConvertLime hace el trabajo en tu propio móvil u ordenador. No se sube nada, así que es más rápido, funciona sin conexión y tus archivos siguen siendo privados.",
    costHeading: "Cuánto cuesta",
    costBody: "Nada. No hay cuenta, ni límite diario, ni marca de agua. Si te resulta útil, puedes",
    installLink: "instalarlo como app",
    costEnd: "para tenerlo a un clic.",
    contactHeading: "Contacto",
    contactBody: "¿Tienes preguntas, has encontrado un error o un archivo no se convierte? Escribe a",
    startHeading: "Por dónde empezar",
    start: [
      { slug: "heic-to-jpg", text: "abre las fotos del iPhone en cualquier sitio" },
      { slug: "compress-image", text: "haz tus fotos más ligeras para enviarlas por correo o subirlas" },
      { slug: "resize-image-to-50kb", text: "para formularios de exámenes y ofertas de empleo" },
      { slug: "invoice-generator", text: "hacer una factura y descargarla en PDF" },
    ],
  },
  privacy: {
    h1: "Privacidad",
    metaDescription: "ConvertLime convierte tus archivos en tu propio dispositivo. No se sube ni se guarda nada.",
    points: [
      {
        heading: "Tus archivos se quedan en tu dispositivo",
        body: "Cada conversión se hace dentro de tu navegador, con tu propio ordenador o móvil. Los archivos nunca se envían a nuestros servidores, así que no podemos verlos, guardarlos ni compartirlos.",
      },
      {
        heading: "No necesitas cuenta",
        body: "No hay registro ni inicio de sesión. No te pedimos tu nombre ni tu correo para usar ninguna herramienta.",
      },
      {
        heading: "Qué datos recogemos",
        body: "Como la mayoría de las webs, podemos contar visitas anónimas para saber qué herramientas se usan más. Esto nunca incluye tus archivos ni su contenido.",
      },
      { heading: "Contacto", body: "¿Tienes preguntas sobre privacidad? Escribe a {email}." },
    ],
  },
  notFound: {
    title: "Página no encontrada",
    h1: "Esta página no existe",
    body: "Puede que el enlace sea antiguo. Prueba uno de los convertidores más usados que verás abajo o ve a",
    allTools: "todas las herramientas",
  },
  removeBg,
  invoice,
};
