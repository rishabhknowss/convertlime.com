import type { Dictionary, ToolVars } from "@/i18n/types";
import { removeBg } from "@/i18n/remove-bg/de";

const heading = (v: ToolVars) => {
  if (v.kind === "resize-kb") return `Bild auf ${v.kb} KB verkleinern`;
  if (v.kind === "compress") return "Bild komprimieren";
  if (v.imageToPdf) return "Bild in PDF umwandeln";
  return `${v.from} in ${v.to} umwandeln`;
};

const sourceFiles = (v: ToolVars) => (v.imageToPdf ? "Bilder" : `${v.from}-Dateien`);

export const de: Dictionary = {
  site: {
    tagline: "Kostenloser Datei-Konverter direkt im Browser",
    description:
      "HEIC, AVIF, WebP, JFIF, PNG und JPG kostenlos im Browser umwandeln. Ohne Anmeldung, ohne Upload, ohne Wasserzeichen – deine Dateien bleiben auf deinem Gerät.",
    homeTitle: "Kostenloser Datei-Konverter – HEIC, AVIF, WebP in JPG & PNG, ohne Upload",
  },
  ui: {
    nav: {
      allTools: "Alle Tools",
      tools: "Tools",
      resources: "Hilfe",
      guides: "Ratgeber",
      about: "Über uns",
      privacy: "Datenschutz",
      menu: "Menü",
      toggleTheme: "Zwischen hellem und dunklem Design wechseln",
      language: "Sprache",
      filesNeverLeave: "Deine Dateien bleiben auf deinem Gerät",
      contact: "Kontakt",
      footerNote: "Dateien werden auf deinem Gerät umgewandelt und nie hochgeladen.",
    },
    search: {
      trigger: "Tools durchsuchen",
      title: "Tools durchsuchen",
      placeholder: "Tool suchen … z. B. heic in jpg",
      empty: "Kein Tool gefunden.",
    },
    askAi: {
      label: "KI zu dieser Seite fragen",
      prompt:
        "Lies {url} und erkläre mir in einfachen Schritten, wobei mir die Seite hilft. Ist ConvertLime ein sicherer, privater Weg, meine Dateien umzuwandeln, ohne sie hochzuladen?",
    },
    install: {
      button: "App installieren",
      title: "App installieren",
      description:
        "Wandle Dateien in einem eigenen Fenster um – es öffnet sich sofort und funktioniert sogar ohne Internet.",
      appName: "ConvertLime – Kostenloser Datei-Konverter",
      cancel: "Abbrechen",
      close: "Schließen",
      install: "Installieren",
      iosStep1: "1. Tippe auf",
      iosShare: "Teilen",
      iosStep2: "2. Wähle",
      iosAdd: "Zum Home-Bildschirm",
      manual:
        "Öffne diese Seite in Chrome oder Edge und klicke dann rechts in der Adressleiste auf das Installieren-Symbol.",
    },
    errors: {
      generic: "Etwas ist schiefgelaufen. Bitte versuche es erneut.",
      copy: "Das Bild konnte nicht kopiert werden. Nutze stattdessen Herunterladen.",
    },
    converter: {
      paste: "Du kannst auch ein Bild mit {key}+V einfügen",
      dropAnywhere: "Dateien hier ablegen, um sie hinzuzufügen",
      choose: "{files} auswählen",
      addMore: "Weitere {files} hinzufügen",
      dragDrop: "oder hierher ziehen und ablegen",
      local: "Auf deinem Gerät umgewandelt – nichts wird hochgeladen",
      images: "Bilder",
      files: "{format}-Dateien",
      quality: "Qualität",
      maxSize: "Maximale Größe",
      pageSize: "Seitengröße",
      sameAsImage: "Wie das Bild",
      a4: "A4",
      download: "Herunterladen",
      downloadAll: "Alle ({count}) als ZIP herunterladen",
      downloadPdf: "PDF herunterladen ({count} {pages})",
      page: "Seite",
      pages: "Seiten",
      clear: "Leeren",
      smaller: "{percent} % kleiner",
      remove: "Datei entfernen",
      readError: "Diese Datei konnte nicht als Bild gelesen werden.",
      webpError: "Dieser Browser kann keine WebP-Dateien erstellen. Versuche es mit Chrome, Edge oder Firefox.",
      avifError: "Diese AVIF-Datei konnte nicht gelesen werden. Öffne sie zuerst und speichere sie neu.",
    },
    removeBg: {
      removeButton: "Hintergrund entfernen",
      removeMany: "Hintergrund von {count} Bildern entfernen",
      format: "Format",
      downloadAs: "{format} herunterladen",
      copy: "Bild kopieren",
      copied: "Kopiert",
      addMore: "Weitere Bilder hinzufügen",
      jpgNote: "JPG kann keine Transparenz, deshalb wird ein weißer Hintergrund verwendet. Wähle PNG oder WebP für einen transparenten Hintergrund.",
      preparing: "Hintergrund-Entferner wird vorbereitet… {percent} %",
      preparingNote: "Nur beim ersten Mal: Dein Browser lädt das Werkzeug einmal herunter. Danach startet es sofort, auch offline. Deine Fotos werden nie hochgeladen.",
      working: "Hintergrund wird entfernt…",
      failed: "Der Hintergrund konnte nicht entfernt werden. Beim ersten Mal brauchst du eine Internetverbindung; versuche es erneut.",
      background: "Hintergrund",
      transparent: "Transparent",
      white: "Weiß",
      black: "Schwarz",
      pickColor: "Farbe",
      original: "Original",
      result: "Ergebnis",
      compare: "Original und Ergebnis vergleichen",
    },
  },
  categories: {
    edit: "Bilder bearbeiten",
    iphone: "iPhone-Fotos",
    web: "Bilder aus dem Web",
    everyday: "Alltägliche Formate",
    compress: "Komprimieren & verkleinern",
    pdf: "Bilder in PDF",
  },
  formats: {
    heic: {
      fullName: "High Efficiency Image Container",
      origin: "seit iOS 11 das Standard-Fotoformat auf iPhones und iPads",
      bestFor: "Handyfotos, die nur etwa halb so groß sind wie ein JPG",
      weakSpot: "Windows, viele Websites und ältere Apps können das Format nicht öffnen",
    },
    heif: {
      fullName: "High Efficiency Image File Format",
      origin: "der Standard hinter HEIC, genutzt von einigen Android-Handys und Kameras",
      bestFor: "hochwertige Fotos in kleinen Dateien",
      weakSpot: "Browser und die meisten Bildprogramme unterstützen es noch nicht",
    },
    avif: {
      fullName: "AV1 Image File Format",
      origin: "ein modernes Bildformat für das Web, aufgebaut auf dem Videoformat AV1",
      bestFor: "die kleinsten Web-Bilder bei gleicher Qualität",
      weakSpot: "ältere Bildprogramme, Office-Apps und viele Upload-Formulare lehnen es ab",
    },
    jfif: {
      fullName: "JPEG File Interchange Format",
      origin: "eine JPEG-Variante, in der Windows und manche Browser Bilder speichern",
      bestFor: "dieselben Fotos, für die auch ein JPG gut ist",
      weakSpot: "Upload-Formulare lehnen die Endung .jfif oft ab, obwohl es eigentlich ein JPEG ist",
    },
    webp: {
      fullName: "WebP Image",
      origin: "das Bildformat von Google, das heute die meisten großen Websites nutzen",
      bestFor: "schnell ladende Web-Bilder mit Transparenz",
      weakSpot: "viele Desktop-Programme, Drucker und ältere Software können es nicht öffnen",
    },
    png: {
      fullName: "Portable Network Graphics",
      origin: "das Standardformat für verlustfreie Bilder im Web",
      bestFor: "Screenshots, Logos und Grafiken mit scharfen Kanten oder Transparenz",
      weakSpot: "Fotos als PNG sind um ein Vielfaches größer als dasselbe Foto als JPG",
    },
    jpg: {
      fullName: "JPEG Image",
      origin: "das am weitesten verbreitete Fotoformat, das sich fast überall öffnen lässt",
      bestFor: "Fotos zum Teilen, Hochladen oder Drucken",
      weakSpot: "keine Transparenz, und jedes erneute Speichern kostet etwas Qualität",
    },
    jpeg: {
      fullName: "JPEG Image",
      origin: "dasselbe Format wie JPG, nur mit der längeren Dateiendung",
      bestFor: "Fotos zum Teilen, Hochladen oder Drucken",
      weakSpot: "manche Upload-Formulare akzeptieren nur die Schreibweise .jpg",
    },
    gif: {
      fullName: "Graphics Interchange Format",
      origin: "ein Format von 1987, das überall noch für kurze Animationen genutzt wird",
      bestFor: "einfache Animationen und Sticker, die überall abspielen",
      weakSpot: "nur 256 Farben, deshalb wirken Fotos grobkörnig",
    },
    bmp: {
      fullName: "Bitmap Image",
      origin: "ein unkomprimiertes Bildformat von Windows",
      bestFor: "alte Software und Geräte, die reine Pixeldaten erwarten",
      weakSpot: "die Dateien sind sehr groß, weil nichts komprimiert wird",
    },
    tiff: {
      fullName: "Tagged Image File Format",
      origin: "das Format für Scanner, Druckereien und Fotoarchive",
      bestFor: "Scans und Druckarbeiten, bei denen kein Detail verloren gehen darf",
      weakSpot: "Browser können es nicht anzeigen und die Dateien sind groß",
    },
    ico: {
      fullName: "Windows Icon",
      origin: "das Symbolformat für Windows-Programme und Favicons von Websites",
      bestFor: "Favicons und Symbole für Desktop-Verknüpfungen",
      weakSpot: "es eignet sich nur für kleine, quadratische Symbole",
    },
    svg: {
      fullName: "Scalable Vector Graphics",
      origin: "ein Vektorformat aus Formen statt aus Pixeln",
      bestFor: "Logos und Symbole, die in jeder Größe scharf bleiben müssen",
      weakSpot: "soziale Netzwerke, Dokumente und viele Apps nehmen es nicht an",
    },
    pdf: {
      fullName: "Portable Document Format",
      origin: "das universelle Dokumentformat",
      bestFor: "Bilder als ein Dokument verschicken, drucken oder einreichen",
      weakSpot: "Bilder darin lassen sich schwerer bearbeiten",
    },
  },
  compare: {
    transparent: "Transparenter Hintergrund",
    animation: "Animation",
    compression: "Komprimierung",
    bestFor: "Ideal für",
    yes: "Ja",
    no: "Nein",
    types: {
      lossy: "Verlustbehaftet",
      lossless: "Verlustfrei",
      both: "Verlustbehaftet oder verlustfrei",
      vector: "Vektor (keine Pixel)",
      document: "Dokument",
    },
  },
  tool: {
    heading,
    title: (v) => {
      if (v.kind === "resize-kb") return `${heading(v)} – online, kostenlos, exakt`;
      if (v.kind === "compress") return "Bild online komprimieren – kostenlos, ohne Upload";
      return `${heading(v)} – kostenlos & ohne Upload`;
    },
    description: (v) => {
      if (v.kind === "resize-kb")
        return `Bild in Sekunden auf ${v.kb} KB verkleinern. Dein Foto passt unter ${v.kb} KB für Formulare und Uploads – kostenlos, ohne Anmeldung, und dein Foto verlässt nie dein Gerät.`;
      if (v.kind === "compress")
        return "Bilder kostenlos online komprimieren. JPG, PNG, WebP und iPhone-Fotos direkt im Browser verkleinern – ohne Anmeldung, ohne Upload, ohne Wasserzeichen.";
      return `${sourceFiles(v)} kostenlos im Browser in ${v.to} umwandeln. Viele Dateien mit einem Klick – ohne Anmeldung, ohne Upload, ohne Wasserzeichen. Deine Dateien bleiben auf deinem Gerät.`;
    },
    lead: (v) => {
      if (v.kind === "resize-kb")
        return `Foto ablegen und ein JPG unter ${v.kb} KB erhalten – fertig für Online-Formulare und Uploads.`;
      if (v.kind === "compress") return "Mach Bilder kleiner, ohne dass sie schlechter aussehen.";
      return `Wandle ${sourceFiles(v)} in Sekunden in ${v.to} um. So viele auf einmal, wie du möchtest.`;
    },
    keywords: (v) => {
      const h = heading(v).toLowerCase();
      if (v.kind === "resize-kb")
        return [h, `foto auf ${v.kb} kb verkleinern`, `bild ${v.kb} kb`, `${h} kostenlos`, `${h} online`];
      if (v.kind === "compress")
        return [h, "bild verkleinern", "foto komprimieren", "bild online komprimieren", `${h} kostenlos`];
      const from = v.imageToPdf ? "bild" : v.from.toLowerCase();
      const to = v.to.toLowerCase();
      return [h, `${from} in ${to}`, `${from} zu ${to}`, `${from} ${to} konvertieren`, `${h} kostenlos`, `${h} online`];
    },
    promises: [
      "Kein Upload – bleibt auf deinem Gerät",
      "Viele Dateien auf einmal, sofort",
      "Kostenlos, ohne Anmeldung, ohne Wasserzeichen",
    ],
    howToUse: (h) => `So geht’s: ${h}`,
    versus: (from, to) => `${from} vs. ${to}`,
    faqHeading: (h) => `${h} – häufige Fragen`,
    helpfulGuides: "Hilfreiche Ratgeber",
    moreConverters: "Weitere kostenlose Konverter",
    breadcrumbHome: "Startseite",
  },
  content: {
    convert: {
      steps: (v) => [
        `Zieh deine ${v.from}-Dateien in das Feld oben oder tippe darauf, um sie auszuwählen.`,
        `Jede Datei wird sofort in deinem Browser in ${v.to} umgewandelt.`,
        "Lade die Dateien einzeln herunter oder alle zusammen als ZIP.",
      ],
      why: (v, from, to) => ({
        heading: `Warum ${v.from} in ${v.to} umwandeln?`,
        body: [
          `${v.from} eignet sich gut für ${from.bestFor}, aber ${from.weakSpot}. ${v.to} ist ${to.origin} – die Datei öffnet sich also dort, wo du sie brauchst.`,
        ],
      }),
      devices: (v) =>
        v.fromId === "heic" || v.fromId === "heif"
          ? [
              {
                heading: `${v.from} in ${v.to} umwandeln unter Windows`,
                body: [
                  `Windows 10 und 11 können ${v.from}-Fotos ohne eine zusätzliche, kostenpflichtige Erweiterung nicht öffnen. Öffne diese Seite in Edge oder Chrome, zieh deine Fotos hinein und lade die ${v.to}-Dateien herunter – ganz ohne Installation.`,
                ],
              },
              {
                heading: `${v.from} in ${v.to} umwandeln auf dem Mac`,
                body: [
                  "Mit der App Vorschau kannst du immer nur ein Foto exportieren. Um einen ganzen Ordner auf einmal umzuwandeln, zieh die Fotos auf diese Seite und lade sie zusammen als ZIP herunter.",
                ],
              },
              {
                heading: `${v.from} in ${v.to} umwandeln auf dem iPhone`,
                body: [
                  `Öffne diese Seite in Safari, tippe auf das Feld, wähle deine Fotos aus und tippe auf „Herunterladen“. Damit neue Fotos nicht mehr als ${v.from} gespeichert werden, gehe zu Einstellungen → Kamera → Formate → Maximale Kompatibilität.`,
                ],
              },
            ]
          : [],
      aboutHeading: (f) => `Was ist eine ${f.label}-Datei?`,
      aboutBody: (f) => [`${f.label} (${f.fullName}) ist ${f.origin}. Ideal für ${f.bestFor}.`, `Der Haken: ${f.weakSpot}.`],
      safe: (v) => ({
        heading: `Ist es sicher, ${v.from} hier in ${v.to} umzuwandeln?`,
        body: [
          "Ja. Die Umwandlung passiert auf deinem eigenen Gerät in deinem Browser. Deine Dateien werden nie auf einen Server hochgeladen, also kann sie niemand sonst sehen – sobald die Seite geladen ist, funktioniert es sogar ohne Internet.",
        ],
      }),
      faqs: (v) => [
        {
          question: `Ist das Umwandeln von ${v.from} in ${v.to} kostenlos?`,
          answer: `Ja. Wandle so viele ${v.from}-Dateien in ${v.to} um, wie du möchtest – ohne Anmeldung, ohne Limit und ohne Wasserzeichen.`,
        },
        {
          question: `Werden meine ${v.from}-Dateien irgendwo hochgeladen?`,
          answer: "Nein. Jede Datei wird auf deinem Gerät in deinem Browser umgewandelt. Nichts wird an einen Server geschickt.",
        },
        {
          question: `Kann ich viele ${v.from}-Dateien auf einmal in ${v.to} umwandeln?`,
          answer: "Ja. Leg einfach einen ganzen Stapel ab und lade alle zusammen als eine ZIP-Datei herunter.",
        },
        {
          question: `Verliere ich beim Umwandeln von ${v.from} in ${v.to} an Qualität?`,
          answer: v.toLossless
            ? `Nein. ${v.to} behält jedes Pixel, die Datei kann aber größer werden als das Original.`
            : "Kaum. Nutze den Qualitätsregler – bei 90 % sieht fast jedes Foto genauso aus wie das Original.",
        },
      ],
    },
    resize: {
      steps: (kb) => [
        "Zieh dein Foto oder deine Unterschrift in das Feld oben.",
        `Wir finden die beste Qualität, die noch unter ${kb} KB passt.`,
        "Lade das JPG herunter und lade es in deinem Formular hoch.",
      ],
      sections: (kb) => [
        {
          heading: `Wann brauchst du ein Foto unter ${kb} KB?`,
          body: [
            `Formulare für Prüfungen, Bewerbungen und Behörden lehnen Fotos und Unterschriften oft ab, wenn sie zu groß sind – ${kb} KB ist eine der häufigsten Grenzen. Dieses Tool verringert die Dateigröße Schritt für Schritt und verkleinert die Abmessungen nur, wenn es nötig ist. So bleibt dein Foto so scharf wie möglich.`,
          ],
        },
        {
          heading: "Wird mein Foto hochgeladen?",
          body: [
            "Nein. Das Verkleinern passiert in deinem Browser, dein Passfoto oder deine Unterschrift verlässt also nie dein Handy oder deinen Computer.",
          ],
        },
      ],
      faqs: (kb) => [
        {
          question: `Wie verkleinere ich ein Bild auf ${kb} KB?`,
          answer: `Zieh es in das Feld oben. In ein, zwei Sekunden bekommst du ein JPG unter ${kb} KB.`,
        },
        {
          question: "Sieht das Foto danach noch klar aus?",
          answer:
            "Ja. Wir wählen die höchste Qualität, die in die Grenze passt, und machen das Foto nur dann kleiner in den Abmessungen, wenn das allein nicht reicht.",
        },
        {
          question: "Kann ich HEIC-Fotos vom iPhone verkleinern?",
          answer: "Ja. HEIC-, PNG-, WebP- und AVIF-Fotos werden alle in ein JPG unter der Grenze umgewandelt.",
        },
      ],
    },
    compress: {
      steps: [
        "Zieh deine Bilder in das Feld oben.",
        "Wähle eine Qualitätsstufe oder lege eine maximale Größe in KB fest.",
        "Lade die kleineren Bilder einzeln oder als ZIP herunter.",
      ],
      sections: [
        {
          heading: "Wie funktioniert das Komprimieren von Bildern?",
          body: [
            "Fotos speichern viel mehr Details, als dein Auge sehen kann. Beim Komprimieren werden Details entfernt, die dir nicht auffallen – so wird die Datei oft 60–80 % kleiner, ohne sichtbaren Unterschied.",
          ],
        },
        {
          heading: "Bleiben meine Bilder privat?",
          body: ["Ja. Die Bilder werden in deinem Browser komprimiert und nirgendwo hochgeladen."],
        },
      ],
      faqs: [
        {
          question: "Wie viel kleiner werden meine Bilder?",
          answer: "Die meisten Fotos werden 50–80 % kleiner. Screenshots und Grafiken im PNG-Format oft sogar noch mehr.",
        },
        {
          question: "Kann ich ein Bild auf eine bestimmte Größe komprimieren?",
          answer: "Ja. Schalte die Option für die maximale Größe ein und gib eine Größe in KB ein.",
        },
        { question: "Ist das Komprimieren von Bildern kostenlos?", answer: "Ja – ohne Anmeldung, ohne Limit und ohne Wasserzeichen." },
      ],
    },
    pdf: {
      imageWord: "Bild",
      steps: (label) => [
        `Zieh eine oder mehrere ${label}-Dateien in das Feld oben.`,
        "Wähle die Originalgröße oder A4-Seiten.",
        "Lade ein PDF herunter, in dem jedes Bild eine eigene Seite ist.",
      ],
      why: (label) => ({
        heading: `Warum ${label}-Dateien in ein PDF umwandeln?`,
        body: [
          "Ein PDF sieht auf jedem Handy und Computer gleich aus, lässt sich sauber drucken und hält viele Fotos in einer Datei zusammen – ideal für Formulare, Belege und zum Verschicken per E-Mail.",
        ],
      }),
      faqs: (label) => [
        {
          question: `Wie wandle ich ${label}-Dateien in PDF um?`,
          answer: `Zieh deine ${label}-Dateien in das Feld oben und tippe auf „PDF herunterladen“. Jedes Bild wird zu einer Seite, in der Reihenfolge, in der du sie hinzugefügt hast.`,
        },
        { question: "Gibt es ein Wasserzeichen?", answer: "Nein. Das PDF ist sauber, kostenlos und wird auf deinem Gerät erstellt." },
        {
          question: "Kann ich viele Bilder in ein PDF packen?",
          answer: "Ja. Füge so viele hinzu, wie du möchtest – alle landen in einem einzigen PDF.",
        },
      ],
    },
  },
  home: {
    h1: "Kostenloser Datei-Konverter",
    h1Accent: "ohne Upload",
    intro: "Wandle HEIC, AVIF, WebP, JFIF, PNG und JPG sofort in deinem Browser um.",
    introStrong: "100 % kostenlos, ohne Anmeldung, ohne Wasserzeichen",
    introEnd: "– deine Dateien bleiben auf deinem Gerät.",
    promises: [
      { title: "Privat", text: "Dateien bleiben auf deinem Gerät" },
      { title: "Sofort", text: "Viele Dateien mit einem Klick" },
      { title: "Auch offline", text: "Kein Upload, kein Warten" },
    ],
    startWith: "Beliebte Tools",
    guides: "Ratgeber",
    allGuides: "Alle Ratgeber →",
    questions: "Häufige Fragen",
    faqs: [
      {
        question: "Ist ConvertLime wirklich kostenlos?",
        answer: "Ja. Jeder Konverter ist kostenlos – ohne Anmeldung, ohne Tageslimit und ohne Wasserzeichen auf deinen Dateien.",
      },
      {
        question: "Werden meine Dateien auf einen Server hochgeladen?",
        answer:
          "Nein. Die Umwandlung läuft in deinem Webbrowser auf deinem eigenen Handy oder Computer. Deine Fotos verlassen nie dein Gerät – deshalb geht es auch schnell und funktioniert sogar ohne Internet.",
      },
      {
        question: "Welche Dateitypen kann ich umwandeln?",
        answer:
          "HEIC- und HEIF-Fotos vom iPhone, AVIF, WebP, JFIF, PNG, JPG, GIF, BMP, TIFF, ICO und SVG. Außerdem kannst du Bilder komprimieren, auf eine genaue Größe in KB verkleinern und Bilder in ein PDF umwandeln.",
      },
      {
        question: "Funktioniert es auf iPhone und Android?",
        answer:
          "Ja. Öffne die Seite in Safari oder Chrome, tippe auf das Feld, um Fotos auszuwählen, und lade die umgewandelten Dateien herunter. Du kannst die Seite auch wie eine App zu deinem Home-Bildschirm hinzufügen.",
      },
    ],
    toolListName: "Kostenlose Datei-Konverter",
  },
  blog: {
    title: "Ratgeber",
    metaTitle: "Ratgeber – Bilddateien öffnen, umwandeln & komprimieren",
    description:
      "Schritt-für-Schritt-Anleitungen: HEIC-, AVIF-, WebP- und JFIF-Dateien öffnen, in JPG oder PNG umwandeln und Fotos für Formulare verkleinern – kostenlos und ohne Upload.",
    h1: "Ratgeber für Bilddateien",
    intro:
      "Klare Schritt-für-Schritt-Antworten zum Öffnen, Umwandeln und Verkleinern von Bilddateien auf Windows, Mac, iPhone und Android.",
    updated: "Aktualisiert",
    minRead: "Min. Lesezeit",
    onThisPage: "Auf dieser Seite",
    faqTitle: "Häufig gestellte Fragen",
    relatedTools: "Passende kostenlose Tools",
    moreGuides: "Weitere Ratgeber",
    ctaTitle: (h) => `Jetzt kostenlos: ${h}`,
    ctaButton: "Jetzt umwandeln",
    ctaNote: "Ohne Anmeldung, ohne Upload – läuft in deinem Browser",
    rssTitle: "ConvertLime Ratgeber",
    rssDescription: "Schritt-für-Schritt-Anleitungen zum Öffnen, Umwandeln und Komprimieren von Bilddateien.",
  },
  about: {
    metaDescription:
      "ConvertLime ist ein kostenloser Datei-Konverter, der in deinem Browser arbeitet – deine Fotos werden also nie hochgeladen. So funktioniert er und darum haben wir ihn gebaut.",
    h1: "Über ConvertLime",
    intro:
      "ConvertLime ist ein kostenloser Konverter für die Bilddateien, die am meisten Ärger machen: HEIC-Fotos vom iPhone, AVIF- und WebP-Bilder von Websites, JFIF-Downloads und Fotos, die für ein Online-Formular zu groß sind.",
    whyHeading: "Warum alles in deinem Browser läuft",
    whyBody:
      "Die meisten Online-Konverter laden deine Dateien auf ihren Server, wandeln sie dort um und schicken sie zurück. Das ist langsam, und auf dem Computer von Fremden liegt dann eine Kopie deiner Fotos. ConvertLime erledigt die Arbeit stattdessen auf deinem eigenen Handy oder Computer. Nichts wird hochgeladen – deshalb ist es schneller, funktioniert ohne Internet und deine Dateien bleiben privat.",
    costHeading: "Was es kostet",
    costBody: "Nichts. Kein Konto, kein Tageslimit und kein Wasserzeichen. Wenn es dir gefällt, kannst du es",
    installLink: "als App installieren",
    costEnd: "und mit einem Klick öffnen.",
    contactHeading: "Kontakt",
    contactBody: "Fragen, Fehlermeldungen oder eine Datei, die sich nicht umwandeln lässt? Schreib eine E-Mail an",
    startHeading: "Hier anfangen",
    start: [
      { slug: "heic-to-jpg", text: "iPhone-Fotos überall öffnen" },
      { slug: "compress-image", text: "Fotos für E-Mails und Uploads verkleinern" },
      { slug: "resize-image-to-50kb", text: "für Prüfungs- und Bewerbungsformulare" },
    ],
  },
  privacy: {
    h1: "Datenschutz",
    metaDescription: "ConvertLime wandelt deine Dateien auf deinem eigenen Gerät um. Nichts wird hochgeladen oder gespeichert.",
    points: [
      {
        heading: "Deine Dateien bleiben auf deinem Gerät",
        body: "Jede Umwandlung läuft in deinem Browser auf deinem eigenen Computer oder Handy. Dateien werden nie an unsere Server geschickt – wir können sie also weder sehen noch speichern oder weitergeben.",
      },
      {
        heading: "Kein Konto nötig",
        body: "Es gibt keine Anmeldung und kein Login. Wir fragen nicht nach deinem Namen oder deiner E-Mail-Adresse, damit du ein Tool nutzen kannst.",
      },
      {
        heading: "Was wir erfassen",
        body: "Wie die meisten Websites zählen wir möglicherweise anonyme Seitenaufrufe, um zu sehen, welche Tools beliebt sind. Deine Dateien oder deren Inhalt sind dabei nie enthalten.",
      },
      { heading: "Kontakt", body: "Fragen zum Datenschutz? Schreib an {email}." },
    ],
  },
  notFound: {
    title: "Seite nicht gefunden",
    h1: "Diese Seite gibt es nicht",
    body: "Der Link ist vielleicht veraltet. Probier einen der beliebtesten Konverter unten aus oder geh zu",
    allTools: "allen Tools",
  },
  removeBg,
};
