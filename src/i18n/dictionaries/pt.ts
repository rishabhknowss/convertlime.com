import type { Dictionary, ToolVars } from "@/i18n/types";
import { removeBg } from "@/i18n/remove-bg/pt";

const heading = (v: ToolVars) => {
  if (v.kind === "resize-kb") return `Reduzir imagem para ${v.kb}KB`;
  if (v.kind === "compress") return "Comprimir imagem";
  if (v.imageToPdf) return "Imagem para PDF";
  return `Converter ${v.from} para ${v.to}`;
};

const shortKeyword = (v: ToolVars) => {
  if (v.kind === "resize-kb") return `reduzir imagem para ${v.kb}kb`;
  if (v.kind === "compress") return "comprimir imagem";
  if (v.imageToPdf) return "imagem para pdf";
  return `${v.from} para ${v.to}`.toLowerCase();
};

export const pt: Dictionary = {
  site: {
    tagline: "Conversor de arquivos grátis que funciona no seu navegador",
    description:
      "Converta arquivos HEIC, AVIF, WebP, JFIF, PNG e JPG grátis no seu navegador. Sem cadastro, sem enviar nada e sem marca d'água – seus arquivos nunca saem do seu aparelho.",
    homeTitle: "Conversor de Arquivos Grátis – HEIC, AVIF, WebP para JPG e PNG, Sem Upload",
  },
  ui: {
    nav: {
      allTools: "Todas as ferramentas",
      tools: "Ferramentas",
      resources: "Recursos",
      guides: "Guias",
      about: "Sobre",
      privacy: "Privacidade",
      menu: "Menu",
      toggleTheme: "Alternar entre modo claro e escuro",
      language: "Idioma",
      filesNeverLeave: "Seus arquivos nunca saem do seu aparelho",
      contact: "Contato",
      footerNote: "Os arquivos são convertidos no seu aparelho e nunca são enviados para a internet.",
    },
    search: {
      trigger: "Buscar ferramentas",
      title: "Buscar ferramentas",
      placeholder: "Buscar ferramentas… ex.: heic para jpg",
      empty: "Nenhuma ferramenta encontrada.",
    },
    askAi: {
      label: "Perguntar à IA sobre esta página",
      prompt:
        "Leia {url} e explique em passos simples para que serve. O ConvertLime é uma forma segura e privada de converter meus arquivos sem enviá-los para a internet?",
    },
    install: {
      button: "Instalar app",
      title: "Instalar app",
      description: "Converta arquivos numa janela própria – abre na hora e funciona até sem internet.",
      appName: "ConvertLime – Conversor de Arquivos Grátis",
      cancel: "Cancelar",
      close: "Fechar",
      install: "Instalar",
      iosStep1: "1. Toque em",
      iosShare: "Compartilhar",
      iosStep2: "2. Escolha",
      iosAdd: "Adicionar à Tela de Início",
      manual: "Abra este site no Chrome ou no Edge e clique no ícone de instalar, à direita da barra de endereço.",
    },
    errors: {
      generic: "Algo deu errado. Tente de novo.",
      copy: "Não foi possível copiar a imagem. Use Baixar.",
    },
    converter: {
      paste: "Você também pode colar uma imagem com {key}+V",
      dropAnywhere: "Solte seus arquivos para adicionar",
      choose: "Escolher {files}",
      addMore: "Adicionar mais {files}",
      dragDrop: "ou arraste e solte aqui",
      local: "Convertido no seu aparelho – nada é enviado",
      images: "imagens",
      files: "arquivos {format}",
      quality: "Qualidade",
      maxSize: "Tamanho máximo",
      pageSize: "Tamanho da página",
      sameAsImage: "Igual à imagem",
      a4: "A4",
      download: "Baixar",
      downloadAll: "Baixar todos ({count}) em ZIP",
      downloadPdf: "Baixar PDF ({count} {pages})",
      page: "página",
      pages: "páginas",
      clear: "Limpar",
      smaller: "{percent}% menor",
      remove: "Remover arquivo",
      readError: "Não foi possível abrir este arquivo como imagem.",
      webpError: "Este navegador não consegue criar arquivos WebP. Tente o Chrome, o Edge ou o Firefox.",
      avifError: "Não foi possível abrir este arquivo AVIF. Tente abrir e salvar de novo antes.",
    },
    removeBg: {
      removeButton: "Remover fundo",
      removeMany: "Remover fundo de {count} imagens",
      format: "Formato",
      downloadAs: "Baixar {format}",
      copy: "Copiar imagem",
      copied: "Copiada",
      addMore: "Adicionar mais imagens",
      jpgNote: "JPG não tem transparência, então o fundo fica branco. Escolha PNG ou WebP para manter o fundo transparente.",
      preparing: "Preparando o removedor de fundo… {percent}%",
      preparingNote: "Só na primeira vez: seu navegador baixa a ferramenta uma vez. Depois ela abre na hora, até sem internet. Suas fotos nunca são enviadas.",
      working: "Removendo o fundo…",
      failed: "Não foi possível remover o fundo. Na primeira vez é preciso estar conectado à internet; tente de novo.",
      background: "Fundo",
      transparent: "Transparente",
      white: "Branco",
      black: "Preto",
      pickColor: "Cor",
      original: "Original",
      result: "Resultado",
      compare: "Comparar original e resultado",
    },
  },
  categories: {
    edit: "Editar imagens",
    iphone: "Fotos do iPhone",
    web: "Imagens da web",
    everyday: "Formatos do dia a dia",
    compress: "Comprimir e reduzir",
    pdf: "Imagens para PDF",
  },
  formats: {
    heic: {
      fullName: "High Efficiency Image Container",
      origin: "o formato padrão de fotos no iPhone e no iPad desde o iOS 11",
      bestFor: "guardar fotos do celular com cerca de metade do tamanho de um JPG",
      weakSpot: "o Windows, muitos sites e apps mais antigos não conseguem abri-lo",
    },
    heif: {
      fullName: "High Efficiency Image File Format",
      origin: "o padrão por trás do HEIC, usado por alguns celulares Android e câmeras",
      bestFor: "fotos de alta qualidade em arquivos pequenos",
      weakSpot: "os navegadores e a maioria dos editores ainda não o aceitam",
    },
    avif: {
      fullName: "AV1 Image File Format",
      origin: "um formato moderno de imagem para a web, baseado no codec de vídeo AV1",
      bestFor: "as imagens mais leves para a web com a mesma qualidade",
      weakSpot: "editores mais antigos, o Office e muitos formulários de envio o recusam",
    },
    jfif: {
      fullName: "JPEG File Interchange Format",
      origin: "uma variante do JPEG em que o Windows e alguns navegadores salvam imagens",
      bestFor: "as mesmas fotos para as quais o JPG é bom",
      weakSpot: "formulários de envio costumam recusar a extensão .jfif, mesmo o conteúdo sendo JPEG",
    },
    webp: {
      fullName: "WebP Image",
      origin: "o formato de imagem do Google para a web, hoje usado pela maioria dos grandes sites",
      bestFor: "imagens que carregam rápido na web, com transparência",
      weakSpot: "muitos programas de computador, impressoras e softwares antigos não conseguem abri-lo",
    },
    png: {
      fullName: "Portable Network Graphics",
      origin: "o formato de imagem sem perda padrão da web",
      bestFor: "capturas de tela, logotipos e gráficos que precisam de bordas nítidas ou transparência",
      weakSpot: "uma foto em PNG fica várias vezes maior que a mesma foto em JPG",
    },
    jpg: {
      fullName: "JPEG Image",
      origin: "o formato de foto mais aceito, que abre em quase qualquer lugar",
      bestFor: "fotos que você precisa compartilhar, enviar ou imprimir",
      weakSpot: "não tem transparência, e cada vez que é salvo de novo perde um pouco de qualidade",
    },
    jpeg: {
      fullName: "JPEG Image",
      origin: "o mesmo formato do JPG, só que com a extensão mais longa",
      bestFor: "fotos que você precisa compartilhar, enviar ou imprimir",
      weakSpot: "alguns formulários de envio só aceitam a extensão .jpg",
    },
    gif: {
      fullName: "Graphics Interchange Format",
      origin: "um formato de 1987 que ainda é usado em todo lugar para animações curtas",
      bestFor: "animações simples e figurinhas que funcionam em qualquer lugar",
      weakSpot: "só tem 256 cores, então as fotos ficam granuladas",
    },
    bmp: {
      fullName: "Bitmap Image",
      origin: "um formato de imagem do Windows sem compressão",
      bestFor: "programas e equipamentos antigos que esperam pixels puros",
      weakSpot: "os arquivos ficam muito grandes porque nada é comprimido",
    },
    tiff: {
      fullName: "Tagged Image File Format",
      origin: "o formato usado por scanners, impressoras e arquivos de fotos",
      bestFor: "digitalizações e trabalhos de impressão em que nenhum detalhe pode se perder",
      weakSpot: "os navegadores não conseguem exibi-lo e os arquivos são grandes",
    },
    ico: {
      fullName: "Windows Icon",
      origin: "o formato de ícone dos apps do Windows e dos favicons de sites",
      bestFor: "favicons e ícones de atalho na área de trabalho",
      weakSpot: "só serve para ícones pequenos e quadrados",
    },
    svg: {
      fullName: "Scalable Vector Graphics",
      origin: "um formato vetorial feito de formas em vez de pixels",
      bestFor: "logotipos e ícones que precisam ficar nítidos em qualquer tamanho",
      weakSpot: "redes sociais, documentos e muitos apps não o aceitam",
    },
    pdf: {
      fullName: "Portable Document Format",
      origin: "o formato universal de documentos",
      bestFor: "enviar, imprimir e entregar imagens como um único documento",
      weakSpot: "as imagens dentro dele são mais difíceis de editar",
    },
  },
  compare: {
    transparent: "Fundo transparente",
    animation: "Animação",
    compression: "Compressão",
    bestFor: "Ideal para",
    yes: "Sim",
    no: "Não",
    types: {
      lossy: "Com perda",
      lossless: "Sem perda",
      both: "Com ou sem perda",
      vector: "Vetorial (sem pixels)",
      document: "Documento",
    },
  },
  tool: {
    heading,
    title: (v) => {
      if (v.kind === "resize-kb") return `${heading(v)} online grátis, tamanho exato`;
      if (v.kind === "compress") return `${heading(v)} online grátis, sem enviar arquivos`;
      return `${heading(v)} online grátis e sem cadastro`;
    },
    description: (v) => {
      if (v.kind === "resize-kb")
        return `Reduza sua imagem para ${v.kb}KB em segundos. Deixe a foto com menos de ${v.kb}KB para formulários e envios, grátis, sem cadastro, e sua foto nunca sai do seu aparelho.`;
      if (v.kind === "compress")
        return "Comprima imagens online grátis. Diminua fotos JPG, PNG, WebP e do iPhone no seu navegador – sem cadastro, sem enviar nada e sem marca d'água.";
      if (v.imageToPdf)
        return "Converta imagens em PDF grátis no seu navegador. Junte várias fotos num só PDF com um clique – sem cadastro, sem enviar nada e sem marca d'água. Seus arquivos nunca saem do seu aparelho.";
      return `Converta ${v.from} para ${v.to} grátis no seu navegador. Converta vários de uma vez com um clique – sem cadastro, sem enviar nada e sem marca d'água. Seus arquivos nunca saem do seu aparelho.`;
    },
    lead: (v) => {
      if (v.kind === "resize-kb") return `Solte uma foto e receba um JPG com menos de ${v.kb}KB, pronto para formulários e envios online.`;
      if (v.kind === "compress") return "Deixe suas imagens mais leves sem que fiquem piores.";
      if (v.imageToPdf) return "Transforme suas imagens em PDF em segundos. Adicione quantas quiser.";
      return `Transforme arquivos ${v.from} em ${v.to} em segundos. Converta quantos quiser de uma vez.`;
    },
    keywords: (v) => {
      const keyword = shortKeyword(v);
      return [heading(v).toLowerCase(), keyword, `${keyword} grátis`, `${keyword} online`];
    },
    promises: ["Sem upload – tudo fica no seu aparelho", "Conversão em lote na hora", "Grátis, sem cadastro e sem marca d'água"],
    howToUse: (h) => `Passo a passo: ${h}`,
    versus: (from, to) => `${from} ou ${to}?`,
    faqHeading: (h) => `${h}: perguntas frequentes`,
    helpfulGuides: "Guias úteis",
    moreConverters: "Mais conversores grátis",
    breadcrumbHome: "Início",
  },
  content: {
    convert: {
      steps: (v) => [
        `Solte seus arquivos ${v.from} na caixa acima ou toque para escolhê-los.`,
        `Cada arquivo vira ${v.to} na hora, no seu navegador.`,
        "Baixe os arquivos um por um ou todos de uma vez em um ZIP.",
      ],
      why: (v, from, to) => ({
        heading: `Por que converter ${v.from} para ${v.to}?`,
        body: [
          `O ${v.from} é ótimo para ${from.bestFor}, mas ${from.weakSpot}. O ${v.to} é ${to.origin}, então o arquivo vai abrir onde você precisar.`,
        ],
      }),
      devices: (v) =>
        v.fromId === "heic" || v.fromId === "heif"
          ? [
              {
                heading: `Como converter ${v.from} para ${v.to} no Windows`,
                body: [
                  `O Windows 10 e 11 não abrem fotos ${v.from} sem um codec extra pago. Abra esta página no Edge ou no Chrome, solte suas fotos e baixe os arquivos ${v.to} – não precisa instalar nada.`,
                ],
              },
              {
                heading: `Como converter ${v.from} para ${v.to} no Mac`,
                body: [
                  "A Pré-Visualização exporta uma foto por vez. Para converter uma pasta inteira de uma vez, arraste as fotos para esta página e baixe todas juntas em um ZIP.",
                ],
              },
              {
                heading: `Como converter ${v.from} para ${v.to} no iPhone`,
                body: [
                  `Abra esta página no Safari, toque na área de envio, escolha suas fotos e toque em Baixar. Para que as novas fotos não sejam mais salvas em ${v.from}, vá em Ajustes → Câmera → Formatos → Mais Compatível.`,
                ],
              },
            ]
          : [],
      aboutHeading: (f) => `O que é um arquivo ${f.label}?`,
      aboutBody: (f) => [
        `${f.label} (${f.fullName}) é ${f.origin}. É ideal para ${f.bestFor}.`,
        `O problema: ${f.weakSpot}.`,
      ],
      safe: (v) => ({
        heading: `É seguro converter ${v.from} para ${v.to} aqui?`,
        body: [
          "Sim. A conversão acontece no seu próprio aparelho, dentro do navegador. Seus arquivos nunca são enviados para um servidor, então ninguém mais consegue vê-los – e depois que a página carrega, funciona até sem internet.",
        ],
      }),
      faqs: (v) => [
        {
          question: `É grátis converter ${v.from} para ${v.to}?`,
          answer: `Sim. Converta quantos arquivos ${v.from} para ${v.to} quiser – sem cadastro, sem limites e sem marca d'água.`,
        },
        {
          question: `Meus arquivos ${v.from} são enviados para algum lugar?`,
          answer: "Não. Cada arquivo é convertido no seu aparelho, no seu navegador. Nada é enviado para um servidor.",
        },
        {
          question: `Posso converter vários arquivos ${v.from} para ${v.to} de uma vez?`,
          answer: "Sim. Solte um lote inteiro e baixe todos juntos em um único arquivo ZIP.",
        },
        {
          question: `Vou perder qualidade ao converter ${v.from} para ${v.to}?`,
          answer: v.toLossless
            ? `Não. O ${v.to} mantém cada pixel, mas o arquivo pode ficar maior que o original.`
            : "Muito pouco. Use o controle de qualidade – em 90%, quase toda foto fica igual à original.",
        },
      ],
    },
    resize: {
      steps: (kb) => [
        "Solte sua foto ou assinatura na caixa acima.",
        `Encontramos a melhor qualidade que ainda fica abaixo de ${kb}KB.`,
        "Baixe o JPG e envie no seu formulário.",
      ],
      sections: (kb) => [
        {
          heading: `Quando você precisa de uma foto com menos de ${kb}KB?`,
          body: [
            `Formulários de concursos, vagas de emprego e órgãos do governo costumam recusar fotos e assinaturas acima de um limite de tamanho – ${kb}KB é um dos mais comuns. Esta ferramenta diminui o tamanho do arquivo aos poucos e só reduz as dimensões se for preciso, para que sua foto fique o mais nítida possível.`,
          ],
        },
        {
          heading: "Minha foto é enviada para algum lugar?",
          body: ["Não. A redução acontece no seu navegador, então sua foto de documento ou assinatura nunca sai do seu celular ou computador."],
        },
      ],
      faqs: (kb) => [
        {
          question: `Como reduzir uma imagem para ${kb}KB?`,
          answer: `Solte a imagem na caixa acima. Você recebe um JPG com menos de ${kb}KB em um ou dois segundos.`,
        },
        {
          question: "A foto vai continuar nítida?",
          answer: "Sim. Escolhemos a maior qualidade que cabe no limite e só diminuímos as dimensões da foto se isso não bastar.",
        },
        { question: "Posso reduzir fotos HEIC do iPhone?", answer: "Sim. Fotos HEIC, PNG, WebP e AVIF viram um JPG abaixo do limite." },
      ],
    },
    compress: {
      steps: [
        "Solte suas imagens na caixa acima.",
        "Escolha um nível de qualidade ou defina um tamanho máximo em KB.",
        "Baixe as imagens menores uma por uma ou em um ZIP.",
      ],
      sections: [
        {
          heading: "Como funciona a compressão de imagens?",
          body: [
            "As fotos guardam muito mais detalhes do que o olho consegue ver. A compressão tira os detalhes que você não vai notar, o que pode reduzir o tamanho do arquivo em 60–80% sem diferença visível.",
          ],
        },
        { heading: "É privado?", body: ["Sim. As imagens são comprimidas no seu navegador e nunca são enviadas para lugar nenhum."] },
      ],
      faqs: [
        {
          question: "Quanto minhas imagens vão diminuir?",
          answer: "A maioria das fotos fica 50–80% menor. Capturas de tela e gráficos salvos em PNG costumam diminuir ainda mais.",
        },
        { question: "Posso comprimir uma imagem para um tamanho específico?", answer: "Sim. Ative a opção de tamanho máximo e digite um tamanho em KB." },
        { question: "Comprimir imagens é grátis?", answer: "Sim – sem cadastro, sem limites e sem marca d'água." },
      ],
    },
    pdf: {
      imageWord: "imagem",
      steps: (label) => [
        `Solte um ou mais arquivos ${label} na caixa acima.`,
        "Escolha o tamanho original ou páginas A4.",
        "Baixe um único PDF com cada imagem em uma página.",
      ],
      why: (label) => ({
        heading: `Por que transformar arquivos ${label} em PDF?`,
        body: [
          "Um PDF abre do mesmo jeito em qualquer celular ou computador, imprime bem e junta várias fotos num só arquivo – ideal para formulários, comprovantes e para mandar documentos por e-mail.",
        ],
      }),
      faqs: (label) => [
        {
          question: `Como converter ${label} para PDF?`,
          answer: `Solte seus arquivos ${label} acima e toque em Baixar PDF. Cada imagem vira uma página, na ordem em que você adicionou.`,
        },
        { question: "Tem marca d'água?", answer: "Não. O PDF sai limpo, grátis e é feito no seu aparelho." },
        { question: "Posso colocar várias imagens em um PDF?", answer: "Sim. Adicione quantas quiser – todas vão para um único PDF." },
      ],
    },
  },
  home: {
    h1: "Conversor de Arquivos Grátis",
    h1Accent: "Sem Enviar Nada",
    intro: "Converta arquivos HEIC, AVIF, WebP, JFIF, PNG e JPG na hora, no seu navegador.",
    introStrong: "100% grátis, sem cadastro e sem marca d'água",
    introEnd: "– seus arquivos nunca saem do seu aparelho.",
    promises: [
      { title: "Privado", text: "Os arquivos nunca saem do seu aparelho" },
      { title: "Na hora", text: "Converta vários de uma vez com um clique" },
      { title: "Funciona sem internet", text: "Sem enviar nada, sem esperar" },
    ],
    startWith: "Comece por",
    guides: "Guias",
    allGuides: "Todos os guias →",
    questions: "Perguntas",
    faqs: [
      {
        question: "O ConvertLime é grátis mesmo?",
        answer: "Sim. Todos os conversores são grátis, sem cadastro, sem limite diário e sem marca d'água nos seus arquivos.",
      },
      {
        question: "Meus arquivos são enviados para um servidor?",
        answer:
          "Não. A conversão acontece dentro do navegador, no seu próprio celular ou computador. Suas fotos nunca saem do seu aparelho, o que também deixa tudo mais rápido e permite usar sem internet.",
      },
      {
        question: "Quais tipos de arquivo posso converter?",
        answer:
          "Fotos HEIC e HEIF do iPhone, AVIF, WebP, JFIF, PNG, JPG, GIF, BMP, TIFF, ICO e SVG. Você também pode comprimir imagens, reduzir para um tamanho exato em KB e transformar imagens em PDF.",
      },
      {
        question: "Funciona no iPhone e no Android?",
        answer:
          "Sim. Abra o site no Safari ou no Chrome, toque na área de envio para escolher as fotos e baixe os arquivos convertidos. Você também pode adicioná-lo à tela de início como um app.",
      },
    ],
    toolListName: "Conversores de arquivos grátis",
  },
  blog: {
    title: "Guias",
    metaTitle: "Guias – Abrir, Converter e Comprimir Imagens",
    description:
      "Guias passo a passo para abrir arquivos HEIC, AVIF, WebP e JFIF, convertê-los para JPG ou PNG e diminuir fotos para formulários – grátis e sem enviar nada.",
    h1: "Guias de arquivos de imagem",
    intro: "Respostas claras, passo a passo, para abrir, converter e diminuir imagens no Windows, Mac, iPhone e Android.",
    updated: "Atualizado em",
    minRead: "min de leitura",
    onThisPage: "Nesta página",
    faqTitle: "Perguntas frequentes",
    relatedTools: "Ferramentas grátis relacionadas",
    moreGuides: "Mais guias",
    ctaTitle: (h) => `Experimente grátis: ${h}`,
    ctaButton: "Converter agora",
    ctaNote: "Sem cadastro e sem enviar nada – funciona no seu navegador",
    rssTitle: "Guias do ConvertLime",
    rssDescription: "Guias passo a passo para abrir, converter e comprimir arquivos de imagem.",
  },
  about: {
    metaDescription:
      "O ConvertLime é um conversor de arquivos grátis que funciona dentro do seu navegador, então suas fotos nunca são enviadas. Veja como funciona e por que o criamos.",
    h1: "Sobre o ConvertLime",
    intro:
      "O ConvertLime é um conversor grátis para os arquivos de imagem que mais dão dor de cabeça: fotos HEIC do iPhone, imagens AVIF e WebP salvas de sites, downloads em JFIF e fotos grandes demais para um formulário online.",
    whyHeading: "Por que funciona no seu navegador",
    whyBody:
      "A maioria dos conversores online envia seus arquivos para o servidor deles, converte lá e devolve. Isso é lento e significa que o computador de um estranho fica com uma cópia das suas fotos. O ConvertLime faz o trabalho no seu próprio celular ou computador. Nada é enviado, então é mais rápido, funciona sem internet e seus arquivos continuam privados.",
    costHeading: "Quanto custa",
    costBody: "Nada. Não tem conta, nem limite diário, nem marca d'água. Se achar útil, você pode",
    installLink: "instalar como app",
    costEnd: "para abrir com um clique.",
    contactHeading: "Contato",
    contactBody: "Dúvidas, problemas ou um arquivo que não converte? Mande um e-mail para",
    startHeading: "Por onde começar",
    start: [
      { slug: "heic-to-jpg", text: "abra fotos do iPhone em qualquer lugar" },
      { slug: "compress-image", text: "deixe fotos mais leves para e-mail e envios" },
      { slug: "resize-image-to-50kb", text: "para formulários de concursos e vagas de emprego" },
    ],
  },
  privacy: {
    h1: "Privacidade",
    metaDescription: "O ConvertLime converte seus arquivos no seu próprio aparelho. Nada é enviado nem guardado.",
    points: [
      {
        heading: "Seus arquivos ficam no seu aparelho",
        body: "Toda conversão acontece dentro do seu navegador, usando seu próprio computador ou celular. Os arquivos nunca são enviados para nossos servidores, então não podemos vê-los, guardá-los nem compartilhá-los.",
      },
      {
        heading: "Não precisa de conta",
        body: "Não tem cadastro nem login. Não pedimos seu nome nem seu e-mail para usar nenhuma ferramenta.",
      },
      {
        heading: "O que coletamos",
        body: "Como a maioria dos sites, podemos contar visitas anônimas às páginas para saber quais ferramentas são mais usadas. Isso nunca inclui seus arquivos nem o conteúdo deles.",
      },
      { heading: "Contato", body: "Dúvidas sobre privacidade? Mande um e-mail para {email}." },
    ],
  },
  notFound: {
    title: "Página não encontrada",
    h1: "Esta página não existe",
    body: "O link pode estar desatualizado. Experimente um dos conversores mais usados abaixo ou vá para",
    allTools: "todas as ferramentas",
  },
  removeBg,
};
