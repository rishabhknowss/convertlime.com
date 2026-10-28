import type { Dictionary, ToolVars } from "@/i18n/types";
import { removeBg } from "@/i18n/remove-bg/ja";

const heading = (v: ToolVars) => {
  if (v.kind === "compress") return "画像圧縮";
  if (v.kind === "resize-kb") return `画像を${v.kb}KBに圧縮`;
  if (v.imageToPdf) return "画像をPDFに変換";
  return `${v.from}を${v.to}に変換`;
};

export const ja: Dictionary = {
  site: {
    tagline: "ブラウザで使える無料のファイル変換ツール",
    description:
      "HEIC・AVIF・WebP・JFIF・PNG・JPGをブラウザで無料変換。登録不要・アップロード不要・透かしなし。ファイルがお使いの端末の外に出ることはありません。",
    homeTitle: "無料ファイル変換｜HEIC・AVIF・WebPをJPG・PNGに、アップロード不要",
  },
  ui: {
    nav: {
      allTools: "すべてのツール",
      tools: "ツール",
      resources: "お役立ち情報",
      guides: "使い方ガイド",
      about: "ConvertLimeについて",
      privacy: "プライバシー",
      menu: "メニュー",
      toggleTheme: "ライトモードとダークモードを切り替え",
      language: "言語",
      filesNeverLeave: "ファイルが端末の外に出ることはありません",
      contact: "お問い合わせ",
      openSource: "GitHubでソースを公開中",
      footerNote: "ファイルはお使いの端末で変換され、アップロードされることはありません。",
    },
    search: {
      trigger: "ツールを検索",
      title: "ツールを検索",
      placeholder: "ツールを検索… 例：heic jpg",
      empty: "ツールが見つかりませんでした。",
    },
    askAi: {
      label: "このページについてAIに聞く",
      prompt:
        "{url} を読んで、このページで何ができるのかを簡単な手順で説明してください。ConvertLimeは、ファイルをアップロードせずに安全かつプライベートに変換できる方法ですか？",
    },
    install: {
      button: "アプリをインストール",
      title: "アプリをインストール",
      description: "専用のウィンドウでファイルを変換できます。すぐに開き、オフラインでも使えます。",
      appName: "ConvertLime – 無料ファイル変換",
      cancel: "キャンセル",
      close: "閉じる",
      install: "インストール",
      iosStep1: "1. 次をタップ：",
      iosShare: "共有",
      iosStep2: "2. 次を選択：",
      iosAdd: "ホーム画面に追加",
      manual: "このサイトをChromeまたはEdgeで開き、アドレスバー右側のインストールアイコンをクリックしてください。",
    },
    errors: {
      generic: "問題が発生しました。もう一度お試しください。",
      copy: "画像をコピーできませんでした。ダウンロードをご利用ください。",
    },
    converter: {
      paste: "{key}+V で画像を貼り付けることもできます",
      dropAnywhere: "ここにファイルをドロップして追加",
      choose: "{files}を選択",
      addMore: "{files}を追加",
      dragDrop: "またはここにドラッグ＆ドロップ",
      local: "お使いの端末で変換。アップロードは一切ありません",
      images: "画像",
      files: "{format}ファイル",
      quality: "画質",
      maxSize: "最大サイズ",
      pageSize: "ページサイズ",
      sameAsImage: "画像と同じ",
      a4: "A4",
      download: "ダウンロード",
      downloadAll: "すべて（{count}件）をZIPでダウンロード",
      downloadPdf: "PDFをダウンロード（{count}{pages}）",
      page: "ページ",
      pages: "ページ",
      clear: "クリア",
      smaller: "{percent}%小さくなりました",
      remove: "ファイルを削除",
      readError: "このファイルは画像として読み込めませんでした。",
      webpError: "このブラウザではWebPファイルを作成できません。Chrome、Edge、Firefoxをお試しください。",
      avifError: "このAVIFファイルを読み込めませんでした。一度開いて保存し直してからお試しください。",
    },
    removeBg: {
      removeButton: "背景を透過する",
      removeMany: "{count}枚の背景を透過する",
      format: "形式",
      downloadAs: "{format}でダウンロード",
      copy: "画像をコピー",
      copied: "コピーしました",
      addMore: "画像を追加",
      jpgNote: "JPGは透明にできないため、背景は白になります。透明のままにするにはPNGかWebPを選んでください。",
      preparing: "背景透過ツールを準備中… {percent}%",
      preparingNote: "初回のみ、ブラウザがツールを一度だけ読み込みます。次回からはすぐに使え、オフラインでも動きます。写真がアップロードされることはありません。",
      working: "背景を透過中…",
      failed: "背景を透過できませんでした。初回はインターネット接続が必要です。もう一度お試しください。",
      background: "背景",
      transparent: "透明",
      white: "白",
      black: "黒",
      pickColor: "色を選ぶ",
      original: "元の画像",
      result: "透過後",
      compare: "元の画像と透過後を比べる",
    },
  },
  categories: {
    edit: "画像を編集",
    iphone: "iPhoneの写真",
    web: "Web画像",
    everyday: "よく使う形式",
    compress: "圧縮・サイズ変更",
    pdf: "画像をPDFに",
  },
  formats: {
    heic: {
      fullName: "High Efficiency Image Container",
      origin: "iOS 11以降のiPhoneやiPadで標準の写真形式",
      bestFor: "スマホの写真をJPGの約半分のサイズで保存すること",
      weakSpot: "Windowsや多くのWebサイト、古いアプリでは開けません",
    },
    heif: {
      fullName: "High Efficiency Image File Format",
      origin: "HEICのもとになっている規格で、一部のAndroidスマホやカメラで使われている形式",
      bestFor: "高画質な写真を小さなファイルで保存すること",
      weakSpot: "ブラウザやほとんどの編集ソフトはまだ対応していません",
    },
    avif: {
      fullName: "AV1 Image File Format",
      origin: "動画技術AV1をもとにした新しいWeb用の画像形式",
      bestFor: "同じ画質でWeb画像をできるだけ小さくすること",
      weakSpot: "古い編集ソフトやOfficeアプリ、多くのアップロードフォームで受け付けられません",
    },
    jfif: {
      fullName: "JPEG File Interchange Format",
      origin: "Windowsや一部のブラウザが画像を保存するときに使うJPEGの一種",
      bestFor: "JPGと同じく写真の保存",
      weakSpot: "中身はJPEGなのに、アップロードフォームで.jfifという拡張子がはじかれることがよくあります",
    },
    webp: {
      fullName: "WebP Image",
      origin: "Googleが開発したWeb用の画像形式で、現在は多くの大手サイトで使われている形式",
      bestFor: "透過にも対応した、すばやく表示されるWeb画像",
      weakSpot: "多くのパソコン用アプリやプリンター、古いソフトでは開けません",
    },
    png: {
      fullName: "Portable Network Graphics",
      origin: "Webで標準的な、画質が劣化しない画像形式",
      bestFor: "くっきりした輪郭や透過が必要なスクリーンショット、ロゴ、イラスト",
      weakSpot: "写真をPNGで保存すると、JPGの数倍のサイズになります",
    },
    jpg: {
      fullName: "JPEG Image",
      origin: "最も広く使われている写真形式で、ほぼどこでも開ける形式",
      bestFor: "共有・アップロード・印刷する写真",
      weakSpot: "透過に対応しておらず、保存し直すたびに少しずつ画質が落ちます",
    },
    jpeg: {
      fullName: "JPEG Image",
      origin: "JPGと同じ形式で、拡張子が長いだけのもの",
      bestFor: "共有・アップロード・印刷する写真",
      weakSpot: "一部のアップロードフォームは.jpgという表記しか受け付けません",
    },
    gif: {
      fullName: "Graphics Interchange Format",
      origin: "1987年に生まれ、今も短いアニメーションで広く使われている形式",
      bestFor: "どこでも再生できるシンプルなアニメーションやスタンプ",
      weakSpot: "256色までしか使えないため、写真は粗く見えます",
    },
    bmp: {
      fullName: "Bitmap Image",
      origin: "圧縮しないWindowsの画像形式",
      bestFor: "圧縮していない画像データを必要とする古いソフトや機器",
      weakSpot: "まったく圧縮されないため、ファイルがとても大きくなります",
    },
    tiff: {
      fullName: "Tagged Image File Format",
      origin: "スキャナーやプリンター、写真のアーカイブで使われる形式",
      bestFor: "細部を一切失いたくないスキャンや印刷用データ",
      weakSpot: "ブラウザで表示できず、ファイルも大きくなります",
    },
    ico: {
      fullName: "Windows Icon",
      origin: "Windowsアプリのアイコンやサイトのファビコンに使われる形式",
      bestFor: "ファビコンやデスクトップのショートカットアイコン",
      weakSpot: "小さな正方形のアイコンにしか使えません",
    },
    svg: {
      fullName: "Scalable Vector Graphics",
      origin: "画素ではなく図形で描かれるベクター形式",
      bestFor: "どのサイズでもくっきり表示したいロゴやアイコン",
      weakSpot: "SNSや文書、多くのアプリでは受け付けられません",
    },
    pdf: {
      fullName: "Portable Document Format",
      origin: "どこでも使える文書形式",
      bestFor: "画像を1つの文書として送信・印刷・提出すること",
      weakSpot: "中の画像は編集しにくくなります",
    },
  },
  compare: {
    transparent: "背景の透過",
    animation: "アニメーション",
    compression: "圧縮方式",
    bestFor: "向いている用途",
    yes: "あり",
    no: "なし",
    types: {
      lossy: "非可逆",
      lossless: "可逆（劣化なし）",
      both: "非可逆・可逆の両方",
      vector: "ベクター（画素なし）",
      document: "文書",
    },
  },
  tool: {
    heading,
    title: (v) => {
      if (v.kind === "resize-kb") return `${heading(v)}｜無料・サイズぴったり`;
      return `${heading(v)}｜無料・アップロード不要`;
    },
    description: (v) => {
      if (v.kind === "resize-kb")
        return `画像を${v.kb}KB以下に数秒で圧縮。申し込みフォームやアップロード用の写真を無料・登録不要で作れます。写真が端末の外に出ることはありません。`;
      if (v.kind === "compress")
        return "画像を無料でオンライン圧縮。JPG・PNG・WebP・iPhoneの写真をブラウザで小さくできます。登録不要・アップロード不要・透かしなし。";
      if (v.imageToPdf)
        return "画像をブラウザで無料でPDFに変換。まとめて1つのPDFにできます。登録不要・アップロード不要・透かしなし。ファイルが端末の外に出ることはありません。";
      return `${v.from}をブラウザで無料で${v.to}に変換。ワンクリックでまとめて一括変換できます。登録不要・アップロード不要・透かしなし。ファイルが端末の外に出ることはありません。`;
    },
    lead: (v) => {
      if (v.kind === "resize-kb") return `写真をドロップするだけで、${v.kb}KB以下のJPGに。オンラインの申し込みやアップロードにそのまま使えます。`;
      if (v.kind === "compress") return "見た目はそのままで、画像のサイズを小さくします。";
      if (v.imageToPdf) return "画像を数秒でPDFに。何枚でもまとめて変換できます。";
      return `${v.from}ファイルを数秒で${v.to}に。何枚でもまとめて変換できます。`;
    },
    keywords: (v) => {
      if (v.kind === "compress") return ["画像圧縮", "画像 圧縮", "画像 圧縮 無料", "画像 軽量化", "写真 容量 小さく"];
      if (v.kind === "resize-kb")
        return [heading(v), `画像 ${v.kb}kb 圧縮`, `写真 ${v.kb}kb 以下`, `画像 ${v.kb}kb 以下 無料`];
      if (v.imageToPdf) return ["画像をPDFに変換", "画像 pdf 変換", "画像 pdf 変換 無料", "写真 pdf 変換"];
      const from = v.from.toLowerCase();
      const to = v.to.toLowerCase();
      return [heading(v), `${from} ${to} 変換`, `${from} ${to} 変換 無料`, `${from} 変換`];
    },
    promises: ["アップロード不要・端末内で完結", "すぐに一括変換", "無料・登録不要・透かしなし"],
    howToUse: (h) => `${h}する方法`,
    versus: (from, to) => `${from}と${to}の違い`,
    faqHeading: (h) => `${h}に関するよくある質問`,
    helpfulGuides: "お役立ちガイド",
    moreConverters: "その他の無料変換ツール",
    breadcrumbHome: "ホーム",
  },
  content: {
    convert: {
      steps: (v) => [
        `上の枠に${v.from}ファイルをドロップするか、タップして選びます。`,
        `ファイルはブラウザ内ですぐに${v.to}へ変換されます。`,
        "1つずつ、またはZIPでまとめてダウンロードします。",
      ],
      why: (v, from, to) => ({
        heading: `${v.from}を${v.to}に変換する理由`,
        body: [
          `${v.from}は${from.bestFor}に向いていますが、${from.weakSpot}。${v.to}は${to.origin}なので、必要な場所で開けるようになります。`,
        ],
      }),
      devices: (v) =>
        v.fromId === "heic" || v.fromId === "heif"
          ? [
              {
                heading: `Windowsで${v.from}を${v.to}に変換する方法`,
                body: [
                  `Windows 10・11では、有料の拡張機能を追加しないと${v.from}の写真を開けません。このページをEdgeかChromeで開き、写真をドロップして${v.to}ファイルをダウンロードするだけ。インストールは不要です。`,
                ],
              },
              {
                heading: `Macで${v.from}を${v.to}に変換する方法`,
                body: [
                  "「プレビュー」では1枚ずつしか書き出せません。フォルダ内の写真をまとめて変換したいときは、このページに写真をドラッグして、ZIPで一括ダウンロードしてください。",
                ],
              },
              {
                heading: `iPhoneで${v.from}を${v.to}に変換する方法`,
                body: [
                  `このページをSafariで開き、枠をタップして写真を選び、「ダウンロード」をタップします。今後の写真を${v.from}で保存しないようにするには、「設定」→「カメラ」→「フォーマット」→「互換性優先」を選んでください。`,
                ],
              },
            ]
          : [],
      aboutHeading: (f) => `${f.label}ファイルとは？`,
      aboutBody: (f) => [
        `${f.label}（${f.fullName}）は、${f.origin}です。${f.bestFor}に向いています。`,
        `注意点：${f.weakSpot}。`,
      ],
      safe: (_v, h) => ({
        heading: `ConvertLimeで${h}しても安全ですか？`,
        body: [
          "はい。変換はお使いの端末のブラウザ内で行われます。ファイルがサーバーにアップロードされることはないため、ほかの人に見られることはありません。ページを一度開けば、オフラインでも使えます。",
        ],
      }),
      faqs: (v) => [
        {
          question: `${v.from}から${v.to}への変換は無料ですか？`,
          answer: `はい。${v.from}ファイルを何枚でも${v.to}に変換できます。登録不要・制限なし・透かしなしです。`,
        },
        {
          question: `${v.from}ファイルがどこかにアップロードされることはありますか？`,
          answer: "いいえ。すべてのファイルはお使いの端末のブラウザ内で変換されます。サーバーには何も送信されません。",
        },
        {
          question: `複数の${v.from}ファイルをまとめて${v.to}に変換できますか？`,
          answer: "はい。まとめてドロップして、1つのZIPファイルで一括ダウンロードできます。",
        },
        {
          question: `${v.from}を${v.to}に変換すると画質は落ちますか？`,
          answer: v.toLossless
            ? `いいえ。${v.to}はすべての画素をそのまま保つため画質は落ちません。ただし、元のファイルよりサイズが大きくなることがあります。`
            : "ほとんど落ちません。画質のスライダーで調整でき、90%ならほぼすべての写真で元と見分けがつきません。",
        },
      ],
    },
    resize: {
      steps: (kb) => [
        "上の枠に写真や署名の画像をドロップします。",
        `${kb}KB以下に収まる、できるだけ高い画質を自動で探します。`,
        "JPGをダウンロードして、フォームにアップロードします。",
      ],
      sections: (kb) => [
        {
          heading: `${kb}KB以下の写真が必要になるのはどんなとき？`,
          body: [
            `試験や求人への応募、役所の手続きなどのフォームでは、写真や署名の画像にサイズの上限があることがよくあります。${kb}KBはよくある上限の一つです。このツールはファイルサイズを少しずつ下げ、どうしても必要なときだけ画像の縦横のサイズを小さくするので、写真をできるだけきれいなまま保てます。`,
          ],
        },
        {
          heading: "写真はアップロードされますか？",
          body: ["いいえ。サイズの変更はブラウザ内で行われるため、証明写真や署名の画像がスマホやパソコンの外に出ることはありません。"],
        },
      ],
      faqs: (kb) => [
        { question: `画像を${kb}KBにするにはどうすればいいですか？`, answer: `上の枠にドロップするだけです。1〜2秒で${kb}KB以下のJPGができあがります。` },
        {
          question: "写真はきれいなままですか？",
          answer: "はい。上限に収まる中でいちばん高い画質を選び、それだけでは足りない場合にのみ写真の縦横のサイズを小さくします。",
        },
        { question: "iPhoneのHEIC写真も小さくできますか？", answer: "はい。HEIC・PNG・WebP・AVIFの写真も、上限以下のJPGに変換されます。" },
      ],
    },
    compress: {
      steps: [
        "上の枠に画像をドロップします。",
        "画質を選ぶか、最大サイズをKBで指定します。",
        "小さくなった画像を1つずつ、またはZIPでまとめてダウンロードします。",
      ],
      sections: [
        {
          heading: "画像圧縮のしくみ",
          body: [
            "写真には、目で見分けられる以上の細かい情報が記録されています。圧縮では気づかない程度の情報を取り除くため、見た目をほとんど変えずにファイルサイズを60〜80%減らせることがあります。",
          ],
        },
        { heading: "プライバシーは守られますか？", body: ["はい。画像はブラウザ内で圧縮され、どこにもアップロードされません。"] },
      ],
      faqs: [
        { question: "画像はどれくらい小さくなりますか？", answer: "ほとんどの写真は50〜80%小さくなります。PNGで保存したスクリーンショットやイラストは、さらに小さくなることもよくあります。" },
        { question: "画像を決まったサイズに圧縮できますか？", answer: "はい。最大サイズのオプションをオンにして、サイズをKBで入力してください。" },
        { question: "画像の圧縮は無料ですか？", answer: "はい。登録不要・制限なし・透かしなしです。" },
      ],
    },
    pdf: {
      imageWord: "画像",
      steps: (label) => [
        `上の枠に${label}ファイルを1つ以上ドロップします。`,
        "元のサイズかA4サイズのページを選びます。",
        "1枚ずつ1ページになった、1つのPDFをダウンロードします。",
      ],
      why: (label) => ({
        heading: `${label}をPDFにする理由`,
        body: [
          "PDFはどのスマホやパソコンでも同じように表示され、きれいに印刷でき、たくさんの写真を1つのファイルにまとめられます。申込書や領収書、メールでの書類送付にぴったりです。",
        ],
      }),
      faqs: (label) => [
        {
          question: `${label}をPDFに変換するにはどうすればいいですか？`,
          answer: `上の枠に${label}ファイルをドロップして「PDFをダウンロード」を押します。追加した順に、1枚が1ページになります。`,
        },
        { question: "透かしは入りますか？", answer: "いいえ。PDFに透かしは入らず、無料でお使いの端末上で作成されます。" },
        { question: "たくさんの画像を1つのPDFにできますか？", answer: "はい。何枚でも追加でき、すべて1つのPDFにまとまります。" },
      ],
    },
  },
  home: {
    h1: "無料ファイル変換",
    h1Accent: "アップロード不要",
    intro: "HEIC・AVIF・WebP・JFIF・PNG・JPGファイルを、ブラウザですぐに変換できます。",
    introStrong: "完全無料・登録不要・透かしなし",
    introEnd: "で、ファイルが端末の外に出ることはありません。",
    promises: [
      { title: "プライベート", text: "ファイルは端末の外に出ません" },
      { title: "すぐ変換", text: "ワンクリックで一括変換" },
      { title: "オフラインでも使える", text: "アップロードも待ち時間もなし" },
    ],
    startWith: "まずはこちら",
    guides: "使い方ガイド",
    allGuides: "すべてのガイド →",
    questions: "よくある質問",
    faqs: [
      { question: "ConvertLimeは本当に無料ですか？", answer: "はい。すべての変換ツールが無料です。登録不要で、1日の回数制限もなく、ファイルに透かしも入りません。" },
      {
        question: "ファイルはサーバーにアップロードされますか？",
        answer:
          "いいえ。変換はお使いのスマホやパソコンのブラウザ内で行われます。写真が端末の外に出ることはないので、速く、オフラインでも使えます。",
      },
      {
        question: "どんなファイルを変換できますか？",
        answer:
          "iPhoneのHEIC・HEIF写真、AVIF、WebP、JFIF、PNG、JPG、GIF、BMP、TIFF、ICO、SVGに対応しています。画像の圧縮、KB単位でぴったりのサイズへの縮小、画像のPDF化もできます。",
      },
      {
        question: "iPhoneやAndroidでも使えますか？",
        answer:
          "はい。SafariやChromeでサイトを開き、枠をタップして写真を選び、変換したファイルをダウンロードしてください。アプリのようにホーム画面に追加することもできます。",
      },
    ],
    toolListName: "無料ファイル変換ツール",
  },
  blog: {
    title: "使い方ガイド",
    metaTitle: "使い方ガイド｜画像ファイルを開く・変換する・圧縮する",
    description:
      "HEIC・AVIF・WebP・JFIFファイルの開き方、JPGやPNGへの変換方法、フォーム用に写真を小さくする方法を手順つきで解説。無料・アップロード不要です。",
    h1: "画像ファイルの使い方ガイド",
    intro: "Windows・Mac・iPhone・Androidで画像ファイルを開く・変換する・小さくする方法を、わかりやすい手順でお答えします。",
    updated: "更新日",
    minRead: "分で読めます",
    onThisPage: "このページの内容",
    faqTitle: "よくある質問",
    relatedTools: "関連する無料ツール",
    moreGuides: "その他のガイド",
    ctaTitle: (h) => `無料ツールで${h}`,
    ctaButton: "今すぐ変換",
    ctaNote: "登録不要・アップロード不要。ブラウザで使えます",
    rssTitle: "ConvertLime 使い方ガイド",
    rssDescription: "画像ファイルを開く・変換する・圧縮するための手順ガイド。",
  },
  about: {
    metaDescription:
      "ConvertLimeはブラウザ内で動く無料のファイル変換ツールなので、写真がアップロードされることはありません。しくみと、作った理由をご紹介します。",
    h1: "ConvertLimeについて",
    intro:
      "ConvertLimeは、困りごとの多い画像ファイルのための無料変換ツールです。iPhoneのHEIC写真、Webサイトから保存したAVIFやWebP画像、JFIFでダウンロードされた画像、オンラインのフォームには大きすぎる写真などに対応しています。",
    whyHeading: "ブラウザ内で動く理由",
    whyBody:
      "多くのオンライン変換ツールは、ファイルを自社のサーバーにアップロードし、そこで変換してから送り返します。これでは時間がかかるうえ、知らない人のコンピューターにあなたの写真のコピーが残ることになります。ConvertLimeは、お使いのスマホやパソコン上で変換を行います。何もアップロードしないので、より速く、オフラインでも使え、ファイルのプライバシーも守られます。",
    costHeading: "料金",
    costBody: "無料です。アカウント登録も、1日の回数制限も、透かしもありません。便利だと感じたら、",
    installLink: "アプリとしてインストール",
    costEnd: "して、ワンクリックで開けるようにできます。",
    contactHeading: "お問い合わせ",
    contactBody: "ご質問や不具合のご報告、変換できないファイルがある場合は、こちらまでメールでご連絡ください：",
    startHeading: "まずはこちらから",
    start: [
      { slug: "heic-to-jpg", text: "iPhoneの写真をどこでも開けるように" },
      { slug: "compress-image", text: "メールやアップロード用に写真を小さく" },
      { slug: "resize-image-to-50kb", text: "試験や求人応募のフォーム用に" },
    ],
  },
  privacy: {
    h1: "プライバシー",
    metaDescription: "ConvertLimeはお使いの端末上でファイルを変換します。何もアップロード・保存されません。",
    points: [
      {
        heading: "ファイルは端末の中にとどまります",
        body: "すべての変換は、お使いのパソコンやスマホのブラウザ内で行われます。ファイルが当社のサーバーに送られることはないため、私たちがファイルを見たり、保存したり、共有したりすることはできません。",
      },
      { heading: "アカウントは不要です", body: "登録もログインもありません。どのツールを使う場合も、お名前やメールアドレスをお聞きすることはありません。" },
      {
        heading: "収集している情報",
        body: "多くのWebサイトと同じように、どのツールがよく使われているかを知るため、匿名でページの閲覧数を数えることがあります。ファイルやその中身が含まれることは一切ありません。",
      },
      { heading: "お問い合わせ", body: "プライバシーに関するご質問は、{email} までメールでご連絡ください。" },
    ],
  },
  notFound: {
    title: "ページが見つかりません",
    h1: "このページは存在しません",
    body: "リンクが古い可能性があります。下のよく使われている変換ツールをお試しいただくか、こちらへどうぞ：",
    allTools: "すべてのツール",
  },
  removeBg,
};
