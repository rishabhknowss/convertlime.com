import type { Dictionary, ToolVars } from "@/i18n/types";
import { removeBg } from "@/i18n/remove-bg/zh";
import { invoice } from "@/i18n/invoice/zh";

const heading = (v: ToolVars) => {
  if (v.kind === "compress") return "图片压缩";
  if (v.kind === "resize-kb") return `图片压缩到${v.kb}KB`;
  if (v.imageToPdf) return "图片转PDF";
  return `${v.from}转${v.to}`;
};

export const zh: Dictionary = {
  site: {
    tagline: "在浏览器里就能用的免费格式转换工具",
    description:
      "免费在线转换HEIC、AVIF、WebP、JFIF、PNG和JPG图片。无需注册，无需上传，不加水印，文件始终留在你自己的设备上。",
    homeTitle: "免费图片格式转换 - HEIC、AVIF、WebP转JPG/PNG，无需上传",
  },
  ui: {
    nav: {
      allTools: "全部工具",
      tools: "工具",
      resources: "资源",
      guides: "使用指南",
      about: "关于我们",
      privacy: "隐私",
      menu: "菜单",
      toggleTheme: "切换浅色/深色模式",
      language: "语言",
      filesNeverLeave: "文件始终留在你的设备上",
      contact: "联系我们",
      openSource: "在 GitHub 上开源",
      footerNote: "文件在你的设备上完成转换，绝不上传。",
    },
    search: {
      trigger: "搜索工具",
      title: "搜索工具",
      placeholder: "搜索工具… 例如 heic转jpg",
      empty: "没有找到相关工具。",
    },
    askAi: {
      label: "让AI解读这个页面",
      prompt:
        "请阅读 {url}，用简单的步骤告诉我它能帮我做什么。用ConvertLime转换文件、不上传文件，安全吗？能保护隐私吗？",
    },
    install: {
      button: "安装应用",
      title: "安装应用",
      description: "在独立窗口中转换文件，打开即用，没有网络也能使用。",
      appName: "ConvertLime - 免费格式转换",
      cancel: "取消",
      close: "关闭",
      install: "安装",
      iosStep1: "1. 点按",
      iosShare: "共享",
      iosStep2: "2. 选择",
      iosAdd: "添加到主屏幕",
      manual: "请用Chrome或Edge打开本网站，然后点击地址栏右侧的安装图标。",
    },
    errors: {
      generic: "出了点问题，请重试。",
      copy: "无法复制图片，请改用下载。",
    },
    converter: {
      paste: "也可以用 {key}+V 粘贴图片",
      dropAnywhere: "松开即可添加文件",
      choose: "选择{files}",
      addMore: "继续添加{files}",
      dragDrop: "或把文件拖到这里",
      local: "在你的设备上转换，不会上传任何内容",
      images: "图片",
      files: "{format}文件",
      quality: "画质",
      maxSize: "最大大小",
      pageSize: "页面尺寸",
      sameAsImage: "与图片相同",
      a4: "A4",
      download: "下载",
      downloadAll: "全部下载（{count}个）为ZIP压缩包",
      downloadPdf: "下载PDF（{count}{pages}）",
      page: "页",
      pages: "页",
      clear: "清空",
      smaller: "缩小了{percent}%",
      remove: "移除文件",
      readError: "无法将此文件识别为图片。",
      webpError: "当前浏览器无法生成WebP文件，请换用Chrome、Edge或Firefox试试。",
      avifError: "无法读取这个AVIF文件。请先打开它并重新保存一次，再试一下。",
    },
    removeBg: {
      removeButton: "一键去背",
      removeMany: "给 {count} 张图片去背",
      format: "格式",
      downloadAs: "下载 {format}",
      copy: "复制图片",
      copied: "已复制",
      addMore: "添加更多图片",
      jpgNote: "JPG 不支持透明，所以会使用白色背景。想保留透明背景请选择 PNG 或 WebP。",
      preparing: "正在准备去背工具… {percent}%",
      preparingNote: "仅第一次：浏览器会下载一次工具。之后会立即启动，离线也能用。你的照片绝不会上传。",
      working: "正在去背…",
      failed: "无法去除背景。首次使用需要联网，请重试。",
      background: "背景",
      transparent: "透明",
      white: "白色",
      black: "黑色",
      pickColor: "颜色",
      original: "原图",
      result: "结果",
      compare: "对比原图和结果",
    },
    invoice: {
      documentTitle: "发票",
      from: "开票方",
      billTo: "收票方",
      number: "发票编号",
      issued: "开票日期",
      due: "付款期限",
      description: "项目",
      quantity: "数量",
      rate: "单价",
      amount: "金额",
      subtotal: "小计",
      discount: "折扣",
      tax: "税费",
      shipping: "运费",
      total: "总计",
      paid: "已付金额",
      balance: "应付余额",
      notes: "备注",
      terms: "付款条款",
      fromNamePlaceholder: "你的姓名或公司名称",
      fromDetailsPlaceholder: "地址、邮箱、电话、税号",
      toNamePlaceholder: "客户名称",
      toDetailsPlaceholder: "客户地址和邮箱",
      itemPlaceholder: "你卖了什么或做了什么？",
      notesPlaceholder: "感谢惠顾！",
      termsPlaceholder: "银行账户、付款链接或付款期限",
      addItem: "添加一行",
      removeItem: "删除此行",
      addLogo: "添加 Logo",
      removeLogo: "移除 Logo",
      logoError: "这张图片无法用作 Logo，请试试 PNG 或 JPG。",
      currency: "币种",
      color: "颜色",
      newInvoice: "新建发票",
      newInvoiceDone: "已新建发票，你的信息和 Logo 已保留。",
      downloadPdf: "下载 PDF",
      print: "打印",
      saved: "已保存在此设备",
      pdfFailed: "无法生成 PDF。请试试“打印”，然后选择“另存为 PDF”。",
      printInstead: "部分文字需要快速 PDF 无法使用的字体，因此将打开打印窗口。请选择“另存为 PDF”。",
      totalDue: "应付总额",
    },
  },
  categories: {
    edit: "编辑图片",
    docs: "文档",
    iphone: "iPhone照片",
    web: "网页图片",
    everyday: "常用格式",
    compress: "压缩与调整大小",
    pdf: "图片转PDF",
  },
  formats: {
    heic: {
      fullName: "高效图像容器",
      origin: "自iOS 11起iPhone和iPad默认的照片格式",
      bestFor: "以约为JPG一半的体积保存手机照片",
      weakSpot: "Windows、很多网站和旧版应用都打不开它",
    },
    heif: {
      fullName: "高效图像文件格式",
      origin: "HEIC背后的容器标准，部分安卓手机和相机也在使用",
      bestFor: "用小文件保存高画质照片",
      weakSpot: "浏览器和大多数编辑软件仍不支持它",
    },
    avif: {
      fullName: "AV1图像文件格式",
      origin: "基于AV1视频编码的新一代网页图片格式",
      bestFor: "在同等画质下得到体积最小的网页图片",
      weakSpot: "旧版编辑软件、Office和很多上传页面都不接受它",
    },
    jfif: {
      fullName: "JPEG文件交换格式",
      origin: "Windows和部分浏览器保存图片时使用的一种JPEG变体",
      bestFor: "保存与JPG相同用途的照片",
      weakSpot: "虽然内容就是JPEG，但很多上传页面不接受.jfif后缀",
    },
    webp: {
      fullName: "WebP图像",
      origin: "谷歌推出的网页图片格式，如今大多数大型网站都在使用",
      bestFor: "加载快、支持透明背景的网页图片",
      weakSpot: "很多电脑软件、打印机和旧版程序都打不开它",
    },
    png: {
      fullName: "便携式网络图形",
      origin: "网页上标准的无损图片格式",
      bestFor: "需要清晰边缘或透明背景的截图、标志和图形",
      weakSpot: "同一张照片存成PNG，体积往往是JPG的好几倍",
    },
    jpg: {
      fullName: "JPEG图像",
      origin: "兼容性最广的照片格式，几乎在哪里都能打开",
      bestFor: "需要分享、上传或打印的照片",
      weakSpot: "不支持透明背景，而且每次重新保存都会损失一点画质",
    },
    jpeg: {
      fullName: "JPEG图像",
      origin: "与JPG完全相同的格式，只是文件后缀更长",
      bestFor: "需要分享、上传或打印的照片",
      weakSpot: "有些上传页面只接受.jpg这种写法",
    },
    gif: {
      fullName: "图形交换格式",
      origin: "1987年诞生、至今仍随处可见的短动画格式",
      bestFor: "在哪里都能播放的简单动图和表情",
      weakSpot: "最多只有256种颜色，照片看起来会有颗粒感",
    },
    bmp: {
      fullName: "位图图像",
      origin: "Windows上一种不压缩的图片格式",
      bestFor: "需要原始像素数据的旧软件和旧设备",
      weakSpot: "完全不压缩，所以文件非常大",
    },
    tiff: {
      fullName: "标签图像文件格式",
      origin: "扫描仪、打印机和照片存档常用的格式",
      bestFor: "不能丢失任何细节的扫描件和印刷用图",
      weakSpot: "浏览器无法显示，而且文件很大",
    },
    ico: {
      fullName: "Windows图标",
      origin: "Windows应用和网站小图标（favicon）使用的图标格式",
      bestFor: "网站小图标和桌面快捷方式图标",
      weakSpot: "只适合做小尺寸的方形图标",
    },
    svg: {
      fullName: "可缩放矢量图形",
      origin: "一种由图形线条而不是像素组成的矢量格式",
      bestFor: "放大到任意尺寸都要保持清晰的标志和图标",
      weakSpot: "社交平台、文档和很多应用都不接受它",
    },
    pdf: {
      fullName: "便携式文档格式",
      origin: "通用的文档格式",
      bestFor: "把图片整理成一份文档来发送、打印或提交",
      weakSpot: "里面的图片不太方便再编辑",
    },
  },
  compare: {
    transparent: "透明背景",
    animation: "动画",
    compression: "压缩方式",
    bestFor: "最适合",
    yes: "支持",
    no: "不支持",
    types: {
      lossy: "有损",
      lossless: "无损",
      both: "有损或无损",
      vector: "矢量（无像素）",
      document: "文档",
    },
  },
  tool: {
    heading,
    title: (v) => {
      if (v.kind === "resize-kb") return `${heading(v)} - 免费在线压缩，大小精准`;
      if (v.kind === "compress") return `${heading(v)} - 免费在线压缩图片大小，无需上传`;
      return `${heading(v)} - 免费在线转换，无需上传`;
    },
    description: (v) => {
      if (v.kind === "resize-kb")
        return `几秒钟就能把图片压缩到${v.kb}KB以内，适合报名表和各类上传要求。免费使用，无需注册，照片不会离开你的设备。`;
      if (v.kind === "compress")
        return "免费在线压缩图片。在浏览器里直接缩小JPG、PNG、WebP和iPhone照片，无需注册，无需上传，不加水印。";
      if (v.imageToPdf)
        return "免费在线把图片转成PDF。一次添加多张图片，一键生成一份PDF，无需注册，无需上传，不加水印。文件始终留在你的设备上。";
      return `在浏览器里免费把${v.from}转换成${v.to}，一键批量转换，无需注册，无需上传，不加水印。文件始终留在你的设备上。`;
    },
    lead: (v) => {
      if (v.kind === "resize-kb") return `放入一张照片，即可得到小于${v.kb}KB的JPG，直接用于网上报名和上传。`;
      if (v.kind === "compress") return "让图片变小，看起来却和原来一样清楚。";
      if (v.imageToPdf) return "几秒钟把图片变成PDF，想放多少张都可以。";
      return `几秒钟把${v.from}文件转换成${v.to}，想批量转换多少张都可以。`;
    },
    keywords: (v) => {
      const h = heading(v).toLowerCase();
      if (v.kind === "compress") return [h, "在线压缩图片", "图片压缩 免费", "照片压缩"];
      if (v.kind === "resize-kb") return [h, `照片压缩到${v.kb}kb`, `图片${v.kb}kb以内`, `${h} 在线`];
      return [h, `${h} 在线`, `${h} 免费`, `${h}工具`];
    },
    promises: ["无需上传，文件留在本机", "即时批量转换", "免费，无需注册，不加水印"],
    howToUse: (h) => `如何使用${h}工具`,
    versus: (from, to) => `${from}与${to}对比`,
    faqHeading: (h) => `${h}常见问题`,
    helpfulGuides: "实用指南",
    moreConverters: "更多免费转换工具",
    breadcrumbHome: "首页",
  },
  content: {
    convert: {
      steps: (v) => [
        `把${v.from}文件拖到上方的框里，或点击选择文件。`,
        `每个文件都会立即在浏览器里转换成${v.to}。`,
        "逐个下载，或打包成ZIP一次全部下载。",
      ],
      why: (v, from, to) => ({
        heading: `为什么要把${v.from}转换成${v.to}？`,
        body: [
          `${v.from}很适合${from.bestFor}，但${from.weakSpot}。${v.to}是${to.origin}，转换后在你需要的地方都能打开。`,
        ],
      }),
      devices: (v) =>
        v.fromId === "heic" || v.fromId === "heif"
          ? [
              {
                heading: `在Windows上如何把${v.from}转换成${v.to}`,
                body: [
                  `Windows 10和11不额外购买解码插件就打不开${v.from}照片。用Edge或Chrome打开本页面，把照片拖进来，再下载${v.to}文件即可，什么都不用安装。`,
                ],
              },
              {
                heading: `在Mac上如何把${v.from}转换成${v.to}`,
                body: [
                  "用“预览”一次只能导出一张照片。想一次转换整个文件夹，把照片拖到本页面，再打包成ZIP一起下载即可。",
                ],
              },
              {
                heading: `在iPhone上如何把${v.from}转换成${v.to}`,
                body: [
                  `用Safari打开本页面，点按上传区域，选好照片后点按“下载”。如果不想让新拍的照片再保存为${v.from}，请前往“设置”→“相机”→“格式”，选择“兼容性最佳”。`,
                ],
              },
            ]
          : [],
      aboutHeading: (f) => `什么是${f.label}文件？`,
      aboutBody: (f) => [`${f.label}（${f.fullName}）是${f.origin}，最适合${f.bestFor}。`, `不足之处：${f.weakSpot}。`],
      safe: (_v, h) => ({
        heading: `这个${h}工具安全吗？`,
        body: [
          "安全。转换是在你自己设备的浏览器里完成的。文件绝不会上传到服务器，所以别人看不到；页面加载完成后，即使断网也能继续使用。",
        ],
      }),
      faqs: (v, h) => [
        {
          question: `${h}工具免费吗？`,
          answer: `免费。想把多少${v.from}文件转换成${v.to}都可以，无需注册，没有次数限制，也不加水印。`,
        },
        {
          question: `我的${v.from}文件会被上传吗？`,
          answer: "不会。每个文件都在你的设备上、在浏览器里完成转换，不会发送到任何服务器。",
        },
        {
          question: `可以一次把很多${v.from}文件转换成${v.to}吗？`,
          answer: "可以。一次放入一批文件，然后打包成一个ZIP文件全部下载。",
        },
        {
          question: `把${v.from}转换成${v.to}会损失画质吗？`,
          answer: v.toLossless
            ? `不会。${v.to}会保留每一个像素，不过文件可能比原来的大。`
            : "几乎不会。可以用画质滑块调整，设为90%时，绝大多数照片看起来和原图一模一样。",
        },
      ],
    },
    resize: {
      steps: (kb) => [
        "把照片或签名图片放到上方的框里。",
        `我们会自动找到小于${kb}KB的最佳画质。`,
        "下载JPG，然后上传到你要填写的表单。",
      ],
      sections: (kb) => [
        {
          heading: `什么时候需要小于${kb}KB的照片？`,
          body: [
            `考试报名、求职和政务办事的表单，常常不接受超过大小限制的照片和签名，${kb}KB就是最常见的限制之一。这个工具会一步步降低文件大小，只有在必要时才缩小尺寸，尽量让照片保持清晰。`,
          ],
        },
        {
          heading: "我的照片会被上传吗？",
          body: ["不会。压缩是在浏览器里完成的，你的证件照或签名始终留在你的手机或电脑上。"],
        },
      ],
      faqs: (kb) => [
        { question: `怎样把图片压缩到${kb}KB？`, answer: `把图片放到上方的框里，一两秒就能得到小于${kb}KB的JPG。` },
        {
          question: "压缩后照片还清楚吗？",
          answer: "清楚。我们会选在限制内能达到的最高画质，只有这样还不够时，才会缩小照片尺寸。",
        },
        { question: "可以压缩iPhone的HEIC照片吗？", answer: "可以。HEIC、PNG、WebP和AVIF照片都会转换成符合大小限制的JPG。" },
      ],
    },
    compress: {
      steps: ["把图片放到上方的框里。", "选择画质，或设置以KB为单位的最大大小。", "逐个下载压缩后的图片，或打包成ZIP下载。"],
      sections: [
        {
          heading: "图片压缩是怎么做到的？",
          body: [
            "照片里保存的细节远比肉眼能看到的多。压缩会去掉那些你察觉不到的细节，文件大小可以减少60%–80%，看起来却没有区别。",
          ],
        },
        { heading: "会泄露隐私吗？", body: ["不会。图片在你的浏览器里完成压缩，绝不会上传到任何地方。"] },
      ],
      faqs: [
        { question: "图片能缩小多少？", answer: "大多数照片能缩小50%–80%。存成PNG的截图和图形，往往还能缩小得更多。" },
        { question: "可以把图片压缩到指定大小吗？", answer: "可以。打开“最大大小”选项，输入以KB为单位的大小即可。" },
        { question: "压缩图片要收费吗？", answer: "不收费。无需注册，没有次数限制，也不加水印。" },
      ],
    },
    pdf: {
      imageWord: "图片",
      steps: (label) => [
        `把一个或多个${label}文件放到上方的框里。`,
        "选择保持原图尺寸，或使用A4页面。",
        "下载一份PDF，每张图片各占一页。",
      ],
      why: (label) => ({
        heading: `为什么要把${label}文件转成PDF？`,
        body: [
          "PDF在任何手机和电脑上打开都一样，打印效果清晰，还能把多张照片合成一个文件，非常适合填表、整理票据和通过邮件发送文件。",
        ],
      }),
      faqs: (label) => [
        {
          question: `怎样把${label}转换成PDF？`,
          answer: `把${label}文件放到上方，然后点击“下载PDF”。每张图片会按添加顺序各占一页。`,
        },
        { question: "会有水印吗？", answer: "没有。生成的PDF干净无水印，完全免费，并且在你的设备上完成。" },
        { question: "可以把很多张图片放进一个PDF吗？", answer: "可以。想加多少张都行，它们会全部合成一个PDF。" },
      ],
    },
  },
  home: {
    h1: "免费格式转换工具",
    h1Accent: "无需上传",
    intro: "在浏览器里即时转换HEIC、AVIF、WebP、JFIF、PNG和JPG文件。",
    introStrong: "100%免费，无需注册，不加水印",
    introEnd: "，文件始终留在你的设备上。",
    promises: [
      { title: "保护隐私", text: "文件始终留在你的设备上" },
      { title: "即时转换", text: "一键批量转换" },
      { title: "离线可用", text: "无需上传，无需等待" },
    ],
    startWith: "从这里开始",
    guides: "使用指南",
    allGuides: "全部指南 →",
    questions: "常见问题",
    faqs: [
      { question: "ConvertLime真的免费吗？", answer: "是的。所有转换工具都免费，无需注册，没有每日次数限制，文件也不会被加水印。" },
      {
        question: "我的文件会上传到服务器吗？",
        answer: "不会。转换是在你自己手机或电脑的浏览器里完成的。照片始终留在你的设备上，所以速度更快，断网也能用。",
      },
      {
        question: "可以转换哪些格式？",
        answer:
          "iPhone的HEIC和HEIF照片，以及AVIF、WebP、JFIF、PNG、JPG、GIF、BMP、TIFF、ICO和SVG。你还可以压缩图片、把图片压缩到指定的KB大小，或把图片转成PDF。",
      },
      {
        question: "iPhone和安卓手机能用吗？",
        answer: "能用。用Safari或Chrome打开本网站，点按上传区域选择照片，再下载转换好的文件即可。你还可以把它添加到主屏幕，像App一样使用。",
      },
    ],
    toolListName: "免费格式转换工具",
  },
  blog: {
    title: "使用指南",
    metaTitle: "使用指南 - 图片文件的打开、转换与压缩",
    description: "手把手教你打开HEIC、AVIF、WebP和JFIF文件，把它们转换成JPG或PNG，以及为报名表压缩照片。免费，无需上传。",
    h1: "图片文件使用指南",
    intro: "在Windows、Mac、iPhone和安卓上打开、转换和压缩图片文件，一步步讲清楚。",
    updated: "更新于",
    minRead: "分钟阅读",
    onThisPage: "本页内容",
    faqTitle: "常见问题",
    relatedTools: "相关免费工具",
    moreGuides: "更多指南",
    ctaTitle: (h) => `免费使用${h}工具`,
    ctaButton: "立即转换",
    ctaNote: "无需注册，无需上传，在浏览器里直接使用",
    rssTitle: "ConvertLime使用指南",
    rssDescription: "手把手教你打开、转换和压缩图片文件。",
  },
  about: {
    metaDescription: "ConvertLime是一款在浏览器里运行的免费格式转换工具，你的照片绝不会被上传。来看看它是怎么做到的，以及我们为什么做它。",
    h1: "关于ConvertLime",
    intro:
      "ConvertLime是一款免费转换工具，专门解决最让人头疼的图片文件：iPhone拍的HEIC照片、从网页保存下来的AVIF和WebP图片、下载得到的JFIF文件，还有在网上填表时太大传不上去的照片。",
    whyHeading: "为什么在浏览器里运行",
    whyBody:
      "大多数在线转换工具会把你的文件上传到它们的服务器，在那里转换后再传回来。这样不仅慢，还意味着陌生人的电脑里存着你照片的副本。ConvertLime则直接在你自己的手机或电脑上完成转换。什么都不上传，所以速度更快，断网也能用，文件也更私密。",
    costHeading: "收费吗",
    costBody: "完全免费。不用注册账号，没有每日次数限制，也不加水印。如果觉得好用，可以",
    installLink: "把它安装成应用",
    costEnd: "，一键就能打开。",
    contactHeading: "联系我们",
    contactBody: "有疑问、发现问题，或者有文件转换不了？请发邮件至",
    startHeading: "从哪里开始",
    start: [
      { slug: "heic-to-jpg", text: "让iPhone照片在哪里都能打开" },
      { slug: "compress-image", text: "缩小照片，方便发邮件和上传" },
      { slug: "resize-image-to-50kb", text: "适用于考试报名和求职表单" },
    ],
  },
  privacy: {
    h1: "隐私",
    metaDescription: "ConvertLime在你自己的设备上转换文件，不上传也不保存任何内容。",
    points: [
      {
        heading: "文件始终留在你的设备上",
        body: "每次转换都在你的浏览器里、用你自己的电脑或手机完成。文件绝不会发送到我们的服务器，所以我们看不到、不会保存，也不会分享你的文件。",
      },
      { heading: "无需账号", body: "不用注册，也不用登录。使用任何工具都不需要提供你的姓名或邮箱。" },
      {
        heading: "我们会收集哪些信息",
        body: "和大多数网站一样，我们可能会统计匿名的页面访问量，以了解哪些工具更受欢迎。这绝不包括你的文件或文件内容。",
      },
      { heading: "联系我们", body: "对隐私有疑问？请发邮件至 {email}。" },
    ],
  },
  notFound: {
    title: "页面不存在",
    h1: "这个页面不存在",
    body: "链接可能已经失效。试试下面最常用的转换工具，或者前往",
    allTools: "全部工具",
  },
  removeBg,
  invoice,
};
