import type { FormatId } from "@/data/formats";
import type { Dictionary, ToolVars } from "@/i18n/types";
import { removeBg } from "@/i18n/remove-bg/fr";

const ELIDED = new Set<FormatId>(["avif", "ico"]);
const TheFormat = (id: FormatId, label: string) => (ELIDED.has(id) ? `L'${label}` : `Le ${label}`);
const ofFormat = (id: FormatId, label: string) => (ELIDED.has(id) ? `d'${label}` : `du ${label}`);

const heading = (v: ToolVars) => {
  if (v.kind === "resize-kb") return `Réduire une image à ${v.kb} Ko`;
  if (v.kind === "compress") return "Compresser une image";
  if (v.imageToPdf) return "Image en PDF";
  return `Convertir ${v.from} en ${v.to}`;
};

export const fr: Dictionary = {
  site: {
    tagline: "Convertisseur de fichiers gratuit, directement dans votre navigateur",
    description:
      "Convertissez gratuitement vos fichiers HEIC, AVIF, WebP, JFIF, PNG et JPG dans votre navigateur. Sans inscription, sans envoi, sans filigrane – vos fichiers ne quittent jamais votre appareil.",
    homeTitle: "Convertisseur gratuit – HEIC, AVIF, WebP en JPG et PNG, sans envoi",
  },
  ui: {
    nav: {
      allTools: "Tous les outils",
      tools: "Outils",
      resources: "Ressources",
      guides: "Guides",
      about: "À propos",
      privacy: "Confidentialité",
      menu: "Menu",
      toggleTheme: "Passer en mode clair ou sombre",
      language: "Langue",
      filesNeverLeave: "Vos fichiers ne quittent jamais votre appareil",
      contact: "Contact",
      footerNote: "Les fichiers sont convertis sur votre appareil et ne sont jamais envoyés en ligne.",
    },
    search: {
      trigger: "Rechercher un outil",
      title: "Rechercher un outil",
      placeholder: "Rechercher un outil… ex. heic en jpg",
      empty: "Aucun outil trouvé.",
    },
    askAi: {
      label: "Demander à une IA à propos de cette page",
      prompt:
        "Lis {url} et explique-moi en quelques étapes simples à quoi cette page peut me servir. ConvertLime est-il un moyen sûr et privé de convertir mes fichiers sans les envoyer en ligne ?",
    },
    install: {
      button: "Installer l'appli",
      title: "Installer l'appli",
      description: "Convertissez vos fichiers dans une fenêtre dédiée – elle s'ouvre instantanément et fonctionne même hors connexion.",
      appName: "ConvertLime – Convertisseur de fichiers gratuit",
      cancel: "Annuler",
      close: "Fermer",
      install: "Installer",
      iosStep1: "1. Touchez",
      iosShare: "Partager",
      iosStep2: "2. Choisissez",
      iosAdd: "Sur l'écran d'accueil",
      manual: "Ouvrez ce site dans Chrome ou Edge, puis cliquez sur l'icône d'installation à droite de la barre d'adresse.",
    },
    errors: {
      generic: "Un problème est survenu. Réessayez.",
      copy: "Impossible de copier l’image. Utilisez Télécharger.",
    },
    converter: {
      paste: "Vous pouvez aussi coller une image avec {key}+V",
      dropAnywhere: "Déposez vos fichiers pour les ajouter",
      choose: "Choisir des {files}",
      addMore: "Ajouter d'autres {files}",
      dragDrop: "ou glissez-les ici",
      local: "Converti sur votre appareil – rien n'est envoyé en ligne",
      images: "images",
      files: "fichiers {format}",
      quality: "Qualité",
      maxSize: "Taille max.",
      pageSize: "Format de page",
      sameAsImage: "Identique à l'image",
      a4: "A4",
      download: "Télécharger",
      downloadAll: "Tout télécharger ({count}) en ZIP",
      downloadPdf: "Télécharger le PDF ({count} {pages})",
      page: "page",
      pages: "pages",
      clear: "Effacer",
      smaller: "{percent} % plus léger",
      remove: "Retirer le fichier",
      readError: "Ce fichier n'a pas pu être lu comme une image.",
      webpError: "Ce navigateur ne peut pas créer de fichiers WebP. Essayez Chrome, Edge ou Firefox.",
      avifError: "Ce fichier AVIF n'a pas pu être lu. Essayez d'abord de l'ouvrir puis de l'enregistrer à nouveau.",
    },
    removeBg: {
      removeButton: "Enlever le fond",
      removeMany: "Enlever le fond de {count} images",
      format: "Format",
      downloadAs: "Télécharger en {format}",
      copy: "Copier l’image",
      copied: "Copiée",
      addMore: "Ajouter des images",
      jpgNote: "Le JPG ne gère pas la transparence : un fond blanc est utilisé. Choisissez PNG ou WebP pour garder le fond transparent.",
      preparing: "Préparation de l’outil… {percent} %",
      preparingNote: "La première fois seulement : votre navigateur télécharge l’outil une fois. Ensuite il démarre tout de suite, même hors ligne. Vos photos ne sont jamais envoyées.",
      working: "Suppression du fond…",
      failed: "Le fond n’a pas pu être supprimé. La première utilisation demande une connexion internet ; réessayez.",
      background: "Fond",
      transparent: "Transparent",
      white: "Blanc",
      black: "Noir",
      pickColor: "Couleur",
      original: "Original",
      result: "Résultat",
      compare: "Comparer l’original et le résultat",
    },
  },
  categories: {
    edit: "Modifier des images",
    iphone: "Photos d'iPhone",
    web: "Images du web",
    everyday: "Formats courants",
    compress: "Compresser et redimensionner",
    pdf: "Images en PDF",
  },
  formats: {
    heic: {
      fullName: "High Efficiency Image Container",
      origin: "le format photo par défaut des iPhone et iPad depuis iOS 11",
      bestFor: "stocker les photos du téléphone en prenant environ moitié moins de place qu'un JPG",
      weakSpot: "Windows, de nombreux sites web et les anciennes applications ne savent pas l'ouvrir",
    },
    heif: {
      fullName: "High Efficiency Image File Format",
      origin: "la norme de conteneur derrière le HEIC, utilisée par certains téléphones Android et appareils photo",
      bestFor: "des photos de haute qualité dans des fichiers légers",
      weakSpot: "les navigateurs et la plupart des logiciels de retouche ne le prennent toujours pas en charge",
    },
    avif: {
      fullName: "AV1 Image File Format",
      origin: "un format d'image moderne pour le web, basé sur le codec vidéo AV1",
      bestFor: "obtenir les images web les plus légères pour une qualité donnée",
      weakSpot: "les anciens logiciels de retouche, les applications Office et de nombreux formulaires en ligne le refusent",
    },
    jfif: {
      fullName: "JPEG File Interchange Format",
      origin: "une variante du JPEG que Windows et certains navigateurs utilisent pour enregistrer les images",
      bestFor: "les mêmes photos que le JPG",
      weakSpot: "les formulaires en ligne refusent souvent l'extension .jfif, alors que le contenu est bien du JPEG",
    },
    webp: {
      fullName: "WebP Image",
      origin: "le format d'image web de Google, aujourd'hui utilisé par la plupart des grands sites",
      bestFor: "des images web rapides à charger, avec transparence",
      weakSpot: "de nombreux logiciels, imprimantes et anciens programmes ne savent pas l'ouvrir",
    },
    png: {
      fullName: "Portable Network Graphics",
      origin: "le format d'image sans perte standard du web",
      bestFor: "les captures d'écran, logos et visuels qui demandent des contours nets ou de la transparence",
      weakSpot: "une photo en PNG pèse plusieurs fois plus lourd que la même photo en JPG",
    },
    jpg: {
      fullName: "JPEG Image",
      origin: "le format photo le plus répandu, lisible presque partout",
      bestFor: "les photos à partager, à envoyer ou à imprimer",
      weakSpot: "pas de transparence, et chaque nouvel enregistrement fait perdre un peu de qualité",
    },
    jpeg: {
      fullName: "JPEG Image",
      origin: "le même format que le JPG, simplement avec une extension plus longue",
      bestFor: "les photos à partager, à envoyer ou à imprimer",
      weakSpot: "certains formulaires en ligne n'acceptent que l'extension .jpg",
    },
    gif: {
      fullName: "Graphics Interchange Format",
      origin: "un format de 1987 encore utilisé partout pour les courtes animations",
      bestFor: "les animations simples et les stickers lisibles partout",
      weakSpot: "seulement 256 couleurs, donc les photos paraissent granuleuses",
    },
    bmp: {
      fullName: "Bitmap Image",
      origin: "un format d'image Windows non compressé",
      bestFor: "les anciens logiciels et appareils qui attendent des pixels bruts",
      weakSpot: "les fichiers sont très lourds car rien n'est compressé",
    },
    tiff: {
      fullName: "Tagged Image File Format",
      origin: "le format utilisé par les scanners, les imprimeurs et les archives photo",
      bestFor: "les numérisations et l'impression, quand aucun détail ne doit se perdre",
      weakSpot: "les navigateurs ne savent pas l'afficher et les fichiers sont lourds",
    },
    ico: {
      fullName: "Windows Icon",
      origin: "le format d'icône des applications Windows et des favicons de sites web",
      bestFor: "les favicons et les icônes de raccourci sur le bureau",
      weakSpot: "il ne sert que pour de petites icônes carrées",
    },
    svg: {
      fullName: "Scalable Vector Graphics",
      origin: "un format vectoriel fait de formes plutôt que de pixels",
      bestFor: "les logos et icônes qui doivent rester nets à toutes les tailles",
      weakSpot: "les réseaux sociaux, les documents et de nombreuses applications ne l'acceptent pas",
    },
    pdf: {
      fullName: "Portable Document Format",
      origin: "le format de document universel",
      bestFor: "envoyer, imprimer et transmettre des images en un seul document",
      weakSpot: "les images qu'il contient sont plus difficiles à modifier",
    },
  },
  compare: {
    transparent: "Fond transparent",
    animation: "Animation",
    compression: "Compression",
    bestFor: "Idéal pour",
    yes: "Oui",
    no: "Non",
    types: {
      lossy: "Avec perte",
      lossless: "Sans perte",
      both: "Avec ou sans perte",
      vector: "Vectoriel (sans pixels)",
      document: "Document",
    },
  },
  tool: {
    heading,
    title: (v) => {
      if (v.kind === "resize-kb") return `${heading(v)} en ligne – Taille exacte`;
      if (v.kind === "compress") return `${heading(v)} en ligne gratuitement`;
      if (v.imageToPdf) return "Convertir une image en PDF – Gratuit, sans inscription";
      return `${heading(v)} – Gratuit et sans inscription`;
    },
    description: (v) => {
      if (v.kind === "resize-kb")
        return `Réduisez une image à ${v.kb} Ko en quelques secondes. Obtenez une photo de moins de ${v.kb} Ko pour vos formulaires en ligne, gratuitement, sans inscription – votre photo ne quitte jamais votre appareil.`;
      if (v.kind === "compress")
        return "Compressez vos images en ligne gratuitement. Allégez vos JPG, PNG, WebP et photos d'iPhone dans votre navigateur – sans inscription, sans envoi, sans filigrane.";
      if (v.imageToPdf)
        return "Convertissez vos images en PDF gratuitement dans votre navigateur. Plusieurs photos en un seul PDF – sans inscription, sans envoi, sans filigrane. Vos fichiers ne quittent jamais votre appareil.";
      return `Convertissez ${v.from} en ${v.to} gratuitement dans votre navigateur. Plusieurs fichiers d'un seul clic – sans inscription, sans envoi, sans filigrane. Vos fichiers ne quittent jamais votre appareil.`;
    },
    lead: (v) => {
      if (v.kind === "resize-kb")
        return `Déposez une photo et obtenez un JPG de moins de ${v.kb} Ko, prêt pour vos formulaires en ligne.`;
      if (v.kind === "compress") return "Allégez vos images sans qu'elles perdent en qualité visible.";
      if (v.imageToPdf) return "Transformez vos images en un seul PDF en quelques secondes.";
      return `Transformez vos fichiers ${v.from} en ${v.to} en quelques secondes. Convertissez-en autant que vous voulez.`;
    },
    keywords: (v) => {
      if (v.kind === "resize-kb")
        return [`réduire image ${v.kb} ko`, `réduire une image à ${v.kb} ko`, `compresser image ${v.kb} ko`, `photo ${v.kb} ko`];
      if (v.kind === "compress")
        return ["compresser image", "compresser une image", "réduire taille image", "compresser photo en ligne"];
      if (v.imageToPdf) return ["image en pdf", "convertir image en pdf", "photo en pdf", "image en pdf gratuit"];
      const pair = `${v.from} en ${v.to}`.toLowerCase();
      return [`convertir ${pair}`, pair, `${pair} gratuit`, `convertisseur ${v.from.toLowerCase()} ${v.to.toLowerCase()}`];
    },
    promises: [
      "Aucun envoi – tout reste sur votre appareil",
      "Conversion instantanée par lots",
      "Gratuit, sans inscription, sans filigrane",
    ],
    howToUse: (h) => `Mode d'emploi : ${h}`,
    versus: (from, to) => `${from} ou ${to} ?`,
    faqHeading: (h) => `${h} – Questions fréquentes`,
    helpfulGuides: "Guides utiles",
    moreConverters: "Autres convertisseurs gratuits",
    breadcrumbHome: "Accueil",
  },
  content: {
    convert: {
      steps: (v) => [
        `Déposez vos fichiers ${v.from} dans la zone ci-dessus, ou touchez-la pour les choisir.`,
        `Chaque fichier est converti en ${v.to} immédiatement, dans votre navigateur.`,
        "Téléchargez les fichiers un par un, ou tous ensemble dans un ZIP.",
      ],
      why: (v, from, to) => ({
        heading: `Pourquoi convertir ${v.from} en ${v.to} ?`,
        body: [
          `${TheFormat(v.fromId, v.from)} est idéal pour ${from.bestFor}, mais ${from.weakSpot}. ${TheFormat(v.toId, v.to)}, c'est ${to.origin} : votre fichier s'ouvrira là où vous en avez besoin.`,
        ],
      }),
      devices: (v) =>
        v.fromId === "heic" || v.fromId === "heif"
          ? [
              {
                heading: `Comment convertir ${v.from} en ${v.to} sur Windows`,
                body: [
                  `Windows 10 et 11 ne peuvent pas ouvrir les photos ${v.from} sans un codec payant supplémentaire. Ouvrez cette page dans Edge ou Chrome, déposez vos photos et téléchargez les fichiers ${v.to} – rien à installer.`,
                ],
              },
              {
                heading: `Comment convertir ${v.from} en ${v.to} sur Mac`,
                body: [
                  "Aperçu ne peut exporter qu'une photo à la fois. Pour convertir tout un dossier d'un coup, faites glisser les photos sur cette page et téléchargez-les ensemble dans un ZIP.",
                ],
              },
              {
                heading: `Comment convertir ${v.from} en ${v.to} sur iPhone`,
                body: [
                  `Ouvrez cette page dans Safari, touchez la zone de dépôt, choisissez vos photos puis touchez Télécharger. Pour que vos nouvelles photos ne soient plus enregistrées en ${v.from}, allez dans Réglages → Appareil photo → Formats → Le plus compatible.`,
                ],
              },
            ]
          : [],
      aboutHeading: (f) => `Qu'est-ce qu'un fichier ${f.label} ?`,
      aboutBody: (f) => [
        `${TheFormat(f.id, f.label)} (${f.fullName}), c'est ${f.origin}. Il est idéal pour ${f.bestFor}.`,
        `Le hic : ${f.weakSpot}.`,
      ],
      safe: (_v, h) => ({
        heading: `L'outil « ${h} » est-il sûr ?`,
        body: [
          "Oui. La conversion se fait sur votre propre appareil, dans votre navigateur. Vos fichiers ne sont jamais envoyés sur un serveur, donc personne d'autre ne peut les voir – cela fonctionne même hors connexion une fois la page chargée.",
        ],
      }),
      faqs: (v, h) => [
        {
          question: `L'outil « ${h} » est-il gratuit ?`,
          answer: `Oui. Convertissez autant de fichiers ${v.from} en ${v.to} que vous voulez – sans inscription, sans limite et sans filigrane.`,
        },
        {
          question: `Mes fichiers ${v.from} sont-ils envoyés quelque part ?`,
          answer: "Non. Chaque fichier est converti sur votre appareil, dans votre navigateur. Rien n'est envoyé sur un serveur.",
        },
        {
          question: `Puis-je convertir plusieurs fichiers ${v.from} en ${v.to} en même temps ?`,
          answer: "Oui. Déposez tout un lot de fichiers et téléchargez-les ensemble dans un seul fichier ZIP.",
        },
        {
          question: `Vais-je perdre en qualité en passant ${ofFormat(v.fromId, v.from)} ${ELIDED.has(v.toId) ? "à l'" : "au "}${v.to} ?`,
          answer: v.toLossless
            ? `Non. ${TheFormat(v.toId, v.to)} conserve chaque pixel, même si le fichier peut être plus lourd que l'original.`
            : "Très peu. Utilisez le curseur de qualité : à 90 %, le résultat est identique à l'original pour presque toutes les photos.",
        },
      ],
    },
    resize: {
      steps: (kb) => [
        "Déposez votre photo ou votre signature dans la zone ci-dessus.",
        `Nous trouvons la meilleure qualité possible sous ${kb} Ko.`,
        "Téléchargez le JPG et ajoutez-le à votre formulaire.",
      ],
      sections: (kb) => [
        {
          heading: `Quand faut-il une photo de moins de ${kb} Ko ?`,
          body: [
            `Les formulaires d'examen, de candidature et des services administratifs refusent souvent les photos et signatures trop lourdes – ${kb} Ko est l'une des limites les plus courantes. Cet outil réduit le poids du fichier petit à petit et ne diminue les dimensions qu'en cas de besoin, pour que votre photo reste aussi nette que possible.`,
          ],
        },
        {
          heading: "Ma photo est-elle envoyée en ligne ?",
          body: [
            "Non. La réduction se fait dans votre navigateur : votre photo d'identité ou votre signature ne quitte jamais votre téléphone ou votre ordinateur.",
          ],
        },
      ],
      faqs: (kb) => [
        {
          question: `Comment réduire une image à ${kb} Ko ?`,
          answer: `Déposez-la dans la zone ci-dessus. Vous obtenez un JPG de moins de ${kb} Ko en une ou deux secondes.`,
        },
        {
          question: "La photo restera-t-elle nette ?",
          answer: "Oui. Nous choisissons la meilleure qualité qui respecte la limite, et ne réduisons les dimensions de la photo que si cela ne suffit pas.",
        },
        {
          question: "Puis-je réduire des photos HEIC d'iPhone ?",
          answer: "Oui. Les photos HEIC, PNG, WebP et AVIF sont toutes transformées en JPG sous la limite.",
        },
      ],
    },
    compress: {
      steps: [
        "Déposez vos images dans la zone ci-dessus.",
        "Choisissez un niveau de qualité, ou indiquez une taille maximale en Ko.",
        "Téléchargez les images allégées une par une ou dans un ZIP.",
      ],
      sections: [
        {
          heading: "Comment fonctionne la compression d'image ?",
          body: [
            "Les photos contiennent bien plus de détails que l'œil ne peut en voir. La compression retire ceux que vous ne remarquerez pas, ce qui peut réduire le poids du fichier de 60 à 80 % sans différence visible.",
          ],
        },
        {
          heading: "Mes images restent-elles privées ?",
          body: ["Oui. Les images sont compressées dans votre navigateur et ne sont jamais envoyées nulle part."],
        },
      ],
      faqs: [
        {
          question: "De combien mes images seront-elles allégées ?",
          answer: "La plupart des photos perdent 50 à 80 % de leur poids. Les captures d'écran et visuels en PNG s'allègent souvent encore davantage.",
        },
        {
          question: "Puis-je compresser une image à une taille précise ?",
          answer: "Oui. Activez l'option de taille maximale et saisissez une taille en Ko.",
        },
        { question: "La compression d'images est-elle gratuite ?", answer: "Oui – sans inscription, sans limite et sans filigrane." },
      ],
    },
    pdf: {
      imageWord: "image",
      steps: (label) => [
        `Déposez un ou plusieurs fichiers ${label} dans la zone ci-dessus.`,
        "Choisissez la taille d'origine ou des pages A4.",
        "Téléchargez un seul PDF où chaque image occupe sa propre page.",
      ],
      why: (label) => ({
        heading: `Pourquoi transformer des fichiers ${label} en PDF ?`,
        body: [
          "Un PDF s'affiche de la même façon sur tous les téléphones et ordinateurs, s'imprime proprement et regroupe de nombreuses photos dans un seul fichier – idéal pour les formulaires, les justificatifs et l'envoi de documents par e-mail.",
        ],
      }),
      faqs: (label) => [
        {
          question: `Comment convertir des fichiers ${label} en PDF ?`,
          answer: `Déposez vos fichiers ${label} ci-dessus et appuyez sur Télécharger le PDF. Chaque image devient une page, dans l'ordre où vous les avez ajoutées.`,
        },
        { question: "Y a-t-il un filigrane ?", answer: "Non. Le PDF est propre, gratuit et créé sur votre appareil." },
        {
          question: "Puis-je mettre plusieurs images dans un seul PDF ?",
          answer: "Oui. Ajoutez-en autant que vous voulez – elles sont toutes regroupées dans un seul PDF.",
        },
      ],
    },
  },
  home: {
    h1: "Convertisseur de fichiers gratuit",
    h1Accent: "Sans rien envoyer en ligne",
    intro: "Convertissez instantanément vos fichiers HEIC, AVIF, WebP, JFIF, PNG et JPG dans votre navigateur.",
    introStrong: "100 % gratuit, sans inscription, sans filigrane",
    introEnd: "– vos fichiers ne quittent jamais votre appareil.",
    promises: [
      { title: "Privé", text: "Vos fichiers ne quittent jamais votre appareil" },
      { title: "Instantané", text: "Plusieurs fichiers convertis d'un seul clic" },
      { title: "Fonctionne hors connexion", text: "Aucun envoi, aucune attente" },
    ],
    startWith: "Pour commencer",
    guides: "Guides",
    allGuides: "Tous les guides →",
    questions: "Questions",
    faqs: [
      {
        question: "ConvertLime est-il vraiment gratuit ?",
        answer: "Oui. Tous les convertisseurs sont gratuits, sans inscription, sans limite quotidienne et sans filigrane sur vos fichiers.",
      },
      {
        question: "Mes fichiers sont-ils envoyés sur un serveur ?",
        answer:
          "Non. La conversion se fait dans votre navigateur, sur votre propre téléphone ou ordinateur. Vos photos ne quittent jamais votre appareil : c'est aussi pour cela que c'est rapide et que cela fonctionne hors connexion.",
      },
      {
        question: "Quels types de fichiers puis-je convertir ?",
        answer:
          "Les photos HEIC et HEIF d'iPhone, ainsi que les formats AVIF, WebP, JFIF, PNG, JPG, GIF, BMP, TIFF, ICO et SVG. Vous pouvez aussi compresser des images, les réduire à une taille exacte en Ko et transformer des images en PDF.",
      },
      {
        question: "Est-ce que cela fonctionne sur iPhone et Android ?",
        answer:
          "Oui. Ouvrez le site dans Safari ou Chrome, touchez la zone de dépôt pour choisir vos photos et téléchargez les fichiers convertis. Vous pouvez aussi l'ajouter à votre écran d'accueil, comme une application.",
      },
    ],
    toolListName: "Convertisseurs de fichiers gratuits",
  },
  blog: {
    title: "Guides",
    metaTitle: "Guides – Ouvrir, convertir et compresser vos images",
    description:
      "Des guides pas à pas pour ouvrir les fichiers HEIC, AVIF, WebP et JFIF, les convertir en JPG ou PNG et alléger vos photos pour les formulaires – gratuitement, sans rien envoyer en ligne.",
    h1: "Guides sur les fichiers image",
    intro: "Des réponses claires, étape par étape, pour ouvrir, convertir et alléger vos fichiers image sur Windows, Mac, iPhone et Android.",
    updated: "Mis à jour le",
    minRead: "min de lecture",
    onThisPage: "Sur cette page",
    faqTitle: "Questions fréquentes",
    relatedTools: "Outils gratuits associés",
    moreGuides: "Autres guides",
    ctaTitle: (h) => `Utilisez l'outil gratuit « ${h} »`,
    ctaButton: "Convertir maintenant",
    ctaNote: "Sans inscription, sans envoi – directement dans votre navigateur",
    rssTitle: "Guides ConvertLime",
    rssDescription: "Des guides pas à pas pour ouvrir, convertir et compresser vos fichiers image.",
  },
  about: {
    metaDescription:
      "ConvertLime est un convertisseur de fichiers gratuit qui fonctionne dans votre navigateur : vos photos ne sont jamais envoyées en ligne. Voici comment il fonctionne et pourquoi nous l'avons créé.",
    h1: "À propos de ConvertLime",
    intro:
      "ConvertLime est un convertisseur gratuit pour les fichiers image qui posent le plus de problèmes : les photos HEIC d'iPhone, les images AVIF et WebP enregistrées depuis des sites web, les téléchargements en JFIF et les photos trop lourdes pour un formulaire en ligne.",
    whyHeading: "Pourquoi tout se passe dans votre navigateur",
    whyBody:
      "La plupart des convertisseurs en ligne envoient vos fichiers sur leur serveur, les convertissent là-bas puis vous les renvoient. C'est lent, et cela veut dire que l'ordinateur d'un inconnu garde une copie de vos photos. ConvertLime fait le travail directement sur votre téléphone ou votre ordinateur. Rien n'est envoyé : c'est plus rapide, cela fonctionne hors connexion et vos fichiers restent privés.",
    costHeading: "Combien ça coûte",
    costBody: "Rien. Pas de compte, pas de limite quotidienne, pas de filigrane. Si l'outil vous est utile, vous pouvez",
    installLink: "l'installer comme une application",
    costEnd: "pour y accéder en un clic.",
    contactHeading: "Contact",
    contactBody: "Une question, un bug à signaler ou un fichier qui refuse de se convertir ? Écrivez à",
    startHeading: "Par où commencer",
    start: [
      { slug: "heic-to-jpg", text: "ouvrir vos photos d'iPhone partout" },
      { slug: "compress-image", text: "alléger vos photos pour les e-mails et les formulaires" },
      { slug: "resize-image-to-50kb", text: "pour les formulaires d'examen et de candidature" },
    ],
  },
  privacy: {
    h1: "Confidentialité",
    metaDescription: "ConvertLime convertit vos fichiers sur votre propre appareil. Rien n'est envoyé ni conservé.",
    points: [
      {
        heading: "Vos fichiers restent sur votre appareil",
        body: "Chaque conversion se fait dans votre navigateur, sur votre propre ordinateur ou téléphone. Les fichiers ne sont jamais envoyés sur nos serveurs : nous ne pouvons donc ni les voir, ni les conserver, ni les partager.",
      },
      {
        heading: "Aucun compte nécessaire",
        body: "Pas d'inscription, pas de connexion. Nous ne vous demandons ni votre nom ni votre e-mail pour utiliser nos outils.",
      },
      {
        heading: "Ce que nous collectons",
        body: "Comme la plupart des sites web, nous pouvons compter les visites de pages de façon anonyme pour savoir quels outils sont les plus utilisés. Cela n'inclut jamais vos fichiers ni leur contenu.",
      },
      { heading: "Contact", body: "Une question sur la confidentialité ? Écrivez à {email}." },
    ],
  },
  notFound: {
    title: "Page introuvable",
    h1: "Cette page n'existe pas",
    body: "Le lien est peut-être ancien. Essayez l'un des convertisseurs les plus utilisés ci-dessous, ou consultez",
    allTools: "tous les outils",
  },
  removeBg,
};
