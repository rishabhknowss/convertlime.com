import type { Dictionary, ToolVars } from "@/i18n/types";
import { removeBg } from "@/i18n/remove-bg/ko";
import { invoice } from "@/i18n/invoice/ko";

const heading = (v: ToolVars) => {
  if (v.kind === "resize-kb") return `사진 ${v.kb}KB로 줄이기`;
  if (v.kind === "compress") return "이미지 용량 줄이기";
  if (v.kind === "to-pdf") return v.imageToPdf ? "이미지 PDF 변환" : `${v.from} PDF 변환`;
  return `${v.from} ${v.to} 변환`;
};

export const ko: Dictionary = {
  site: {
    tagline: "브라우저에서 바로 쓰는 무료 파일 변환기",
    description:
      "HEIC, AVIF, WebP, JFIF, PNG, JPG 파일을 브라우저에서 무료로 변환하세요. 회원가입, 업로드, 워터마크가 없고 파일이 내 기기 밖으로 나가지 않아요.",
    homeTitle: "무료 파일 변환기 – HEIC, AVIF, WebP를 JPG·PNG로, 업로드 없이",
  },
  ui: {
    nav: {
      allTools: "전체 도구",
      tools: "도구",
      resources: "자료",
      guides: "가이드",
      about: "소개",
      privacy: "개인정보 보호",
      menu: "메뉴",
      toggleTheme: "라이트/다크 모드 전환",
      language: "언어",
      filesNeverLeave: "파일이 내 기기 밖으로 나가지 않아요",
      contact: "문의",
      openSource: "GitHub에서 오픈소스로 공개",
      footerNote: "파일은 내 기기에서 변환되며 어디에도 업로드되지 않아요.",
    },
    search: {
      trigger: "도구 검색",
      title: "도구 검색",
      placeholder: "도구 검색… 예: heic jpg 변환",
      empty: "찾는 도구가 없어요.",
    },
    askAi: {
      label: "이 페이지에 대해 AI에게 물어보기",
      prompt:
        "{url} 페이지를 읽고, 이 페이지로 무엇을 할 수 있는지 쉬운 단계로 설명해 주세요. ConvertLime은 파일을 업로드하지 않고 안전하게 변환할 수 있는 방법인가요?",
    },
    install: {
      button: "앱 설치",
      title: "앱 설치",
      description: "전용 창에서 파일을 변환하세요. 바로 열리고 인터넷이 연결되지 않아도 작동해요.",
      appName: "ConvertLime – 무료 파일 변환기",
      cancel: "취소",
      close: "닫기",
      install: "설치",
      iosStep1: "1. 다음을 탭하세요:",
      iosShare: "공유",
      iosStep2: "2. 다음을 선택하세요:",
      iosAdd: "홈 화면에 추가",
      manual: "Chrome이나 Edge에서 이 사이트를 연 다음, 주소창 오른쪽에 있는 설치 아이콘을 클릭하세요.",
    },
    errors: {
      generic: "문제가 생겼어요. 다시 시도해 주세요.",
      copy: "이미지를 복사하지 못했어요. 다운로드를 이용해 주세요.",
    },
    converter: {
      paste: "{key}+V로 이미지를 붙여넣을 수도 있어요",
      dropAnywhere: "파일을 놓으면 바로 추가돼요",
      choose: "{files} 선택",
      addMore: "{files} 더 추가",
      dragDrop: "또는 여기로 끌어다 놓으세요",
      local: "내 기기에서 변환돼요 – 아무것도 업로드되지 않아요",
      images: "이미지",
      files: "{format} 파일",
      quality: "화질",
      maxSize: "최대 용량",
      pageSize: "페이지 크기",
      sameAsImage: "이미지와 같게",
      a4: "A4",
      download: "다운로드",
      downloadAll: "전체 ({count}개) ZIP으로 다운로드",
      downloadPdf: "PDF 다운로드 ({count}{pages})",
      page: "페이지",
      pages: "페이지",
      clear: "모두 지우기",
      smaller: "{percent}% 줄었어요",
      remove: "파일 삭제",
      readError: "이 파일은 이미지로 읽을 수 없어요.",
      webpError: "이 브라우저에서는 WebP 파일을 만들 수 없어요. Chrome, Edge 또는 Firefox를 사용해 보세요.",
      avifError: "이 AVIF 파일을 읽을 수 없어요. 파일을 한 번 열어서 다시 저장한 뒤 시도해 보세요.",
    },
    removeBg: {
      removeButton: "배경 제거하기",
      removeMany: "이미지 {count}장 배경 제거",
      format: "형식",
      downloadAs: "{format} 다운로드",
      copy: "이미지 복사",
      copied: "복사됨",
      addMore: "이미지 추가",
      jpgNote: "JPG는 투명 배경을 지원하지 않아 흰색 배경으로 저장돼요. 투명하게 두려면 PNG나 WebP를 고르세요.",
      preparing: "배경 제거 도구 준비 중… {percent}%",
      preparingNote: "처음 한 번만 브라우저가 도구를 내려받습니다. 그다음부터는 바로 시작되고 인터넷이 없어도 됩니다. 사진은 절대 업로드되지 않습니다.",
      working: "배경 제거 중…",
      failed: "배경을 제거하지 못했습니다. 처음 사용할 때는 인터넷 연결이 필요해요. 다시 시도해 주세요.",
      background: "배경",
      transparent: "투명",
      white: "흰색",
      black: "검은색",
      pickColor: "색상",
      original: "원본",
      result: "결과",
      compare: "원본과 결과 비교",
    },
    invoice: {
      documentTitle: "청구서",
      from: "공급자",
      billTo: "청구 대상",
      number: "청구서 번호",
      issued: "발행일",
      due: "결제 기한",
      description: "품목",
      quantity: "수량",
      rate: "단가",
      amount: "금액",
      subtotal: "소계",
      discount: "할인",
      tax: "부가세",
      shipping: "배송비",
      total: "합계",
      paid: "받은 금액",
      balance: "남은 금액",
      notes: "메모",
      terms: "결제 조건",
      fromNamePlaceholder: "내 이름 또는 상호",
      fromDetailsPlaceholder: "주소, 이메일, 전화번호, 사업자등록번호",
      toNamePlaceholder: "거래처 이름",
      toDetailsPlaceholder: "거래처 주소와 이메일",
      itemPlaceholder: "판매한 상품이나 한 일",
      notesPlaceholder: "거래해 주셔서 감사합니다!",
      termsPlaceholder: "입금 계좌, 결제 링크 또는 결제 기한",
      addItem: "줄 추가",
      removeItem: "줄 삭제",
      addLogo: "로고 추가",
      removeLogo: "로고 삭제",
      logoError: "이 이미지는 로고로 쓸 수 없어요. PNG나 JPG로 해 보세요.",
      currency: "통화",
      color: "색상",
      customColor: "사용자 지정 색상",
      newInvoice: "새 청구서",
      newInvoiceDone: "새 청구서를 시작했어요. 내 정보와 로고는 그대로 남겨 뒀어요.",
      downloadPdf: "PDF 다운로드",
      print: "인쇄",
      saved: "이 기기에 저장됨",
      pdfFailed: "PDF를 만들지 못했어요. 인쇄를 누른 뒤 PDF로 저장을 선택해 보세요.",
      printInstead: "일부 글자에 빠른 PDF가 쓸 수 없는 글꼴이 필요해서 인쇄 창을 열어요. PDF로 저장을 선택하세요.",
      totalDue: "청구 금액",
      template: "템플릿",
      templates: { classic: "클래식", studio: "스튜디오", midnight: "미드나잇", editorial: "에디토리얼", bold: "볼드" },
      addCover: "커버 이미지 추가",
      uploadCover: "직접 올리기",
      removeCover: "커버 삭제",
      coverError: "이 이미지는 커버로 쓸 수 없어요. JPG나 PNG로 해 보세요.",
    },
  },
  categories: {
    edit: "이미지 편집",
    docs: "문서",
    iphone: "아이폰 사진",
    web: "웹 이미지",
    everyday: "자주 쓰는 형식",
    compress: "용량 줄이기·크기 조절",
    pdf: "이미지를 PDF로",
  },
  formats: {
    heic: {
      fullName: "High Efficiency Image Container",
      origin: "iOS 11부터 아이폰과 아이패드에서 기본으로 쓰는 사진 형식",
      bestFor: "휴대폰 사진을 JPG의 절반 정도 용량으로 저장하기",
      weakSpot: "Windows와 많은 웹사이트, 오래된 앱에서 열리지 않는다는 점",
    },
    heif: {
      fullName: "High Efficiency Image File Format",
      origin: "HEIC의 바탕이 되는 표준으로, 일부 안드로이드 휴대폰과 카메라에서 쓰는 형식",
      bestFor: "작은 파일에 고화질 사진 담기",
      weakSpot: "브라우저와 대부분의 편집 프로그램이 아직 지원하지 않는다는 점",
    },
    avif: {
      fullName: "AV1 Image File Format",
      origin: "AV1 동영상 코덱을 바탕으로 만든 최신 웹 이미지 형식",
      bestFor: "같은 화질에서 가장 작은 웹 이미지 만들기",
      weakSpot: "오래된 편집 프로그램, Office 앱, 많은 업로드 양식에서 받아 주지 않는다는 점",
    },
    jfif: {
      fullName: "JPEG File Interchange Format",
      origin: "Windows와 일부 브라우저가 이미지를 저장할 때 쓰는 JPEG의 한 종류인 형식",
      bestFor: "JPG와 똑같이 사진 저장하기",
      weakSpot: "내용은 JPEG인데도 업로드 양식에서 .jfif 확장자를 자주 거부한다는 점",
    },
    webp: {
      fullName: "WebP Image",
      origin: "구글이 만든 웹 이미지 형식으로, 지금은 대부분의 대형 웹사이트가 쓰는 형식",
      bestFor: "투명 배경을 지원하면서 빠르게 열리는 웹 이미지",
      weakSpot: "많은 PC 프로그램, 프린터, 오래된 소프트웨어에서 열리지 않는다는 점",
    },
    png: {
      fullName: "Portable Network Graphics",
      origin: "화질 손실이 없는 웹의 표준 이미지 형식",
      bestFor: "선명한 테두리나 투명 배경이 필요한 스크린샷, 로고, 그래픽",
      weakSpot: "사진을 PNG로 저장하면 같은 사진의 JPG보다 몇 배나 커진다는 점",
    },
    jpg: {
      fullName: "JPEG Image",
      origin: "거의 모든 곳에서 열리는, 가장 널리 쓰이는 사진 형식",
      bestFor: "공유하거나 업로드하거나 인쇄할 사진",
      weakSpot: "투명 배경을 쓸 수 없고, 다시 저장할 때마다 화질이 조금씩 떨어진다는 점",
    },
    jpeg: {
      fullName: "JPEG Image",
      origin: "JPG와 같은 형식에 확장자만 더 긴 형식",
      bestFor: "공유하거나 업로드하거나 인쇄할 사진",
      weakSpot: "일부 업로드 양식은 .jpg 확장자만 받는다는 점",
    },
    gif: {
      fullName: "Graphics Interchange Format",
      origin: "1987년에 나왔지만 지금도 짧은 움짤에 어디서나 쓰이는 형식",
      bestFor: "어디서나 재생되는 간단한 움짤과 스티커",
      weakSpot: "256색만 쓸 수 있어서 사진이 거칠게 보인다는 점",
    },
    bmp: {
      fullName: "Bitmap Image",
      origin: "압축하지 않은 Windows 이미지 형식",
      bestFor: "압축하지 않은 픽셀 데이터가 필요한 오래된 프로그램과 기기",
      weakSpot: "전혀 압축하지 않아서 파일이 아주 크다는 점",
    },
    tiff: {
      fullName: "Tagged Image File Format",
      origin: "스캐너, 인쇄, 사진 보관용으로 쓰는 형식",
      bestFor: "세부 묘사를 하나도 잃으면 안 되는 스캔본과 인쇄물",
      weakSpot: "브라우저에서 볼 수 없고 파일이 크다는 점",
    },
    ico: {
      fullName: "Windows Icon",
      origin: "Windows 앱 아이콘과 웹사이트 파비콘에 쓰는 아이콘 형식",
      bestFor: "파비콘과 바탕화면 바로가기 아이콘",
      weakSpot: "작은 정사각형 아이콘에만 쓸모가 있다는 점",
    },
    svg: {
      fullName: "Scalable Vector Graphics",
      origin: "픽셀 대신 도형으로 이루어진 벡터 형식",
      bestFor: "어떤 크기에서도 선명해야 하는 로고와 아이콘",
      weakSpot: "SNS, 문서, 많은 앱에서 받아 주지 않는다는 점",
    },
    pdf: {
      fullName: "Portable Document Format",
      origin: "어디서나 열리는 범용 문서 형식",
      bestFor: "이미지를 하나의 문서로 보내고, 인쇄하고, 제출하기",
      weakSpot: "안에 들어간 이미지를 편집하기 어렵다는 점",
    },
  },
  compare: {
    transparent: "투명 배경",
    animation: "애니메이션",
    compression: "압축 방식",
    bestFor: "추천 용도",
    yes: "예",
    no: "아니요",
    types: {
      lossy: "손실 압축",
      lossless: "무손실 압축",
      both: "손실 또는 무손실",
      vector: "벡터 (픽셀 없음)",
      document: "문서",
    },
  },
  tool: {
    heading,
    h1: (v) => `무료 ${heading(v)}`,
    title: (v) => {
      if (v.kind === "resize-kb") return `${heading(v)} – 무료, 회원가입 없이 정확한 용량`;
      if (v.kind === "compress") return `${heading(v)} – 무료, 회원가입·업로드 없음`;
      return `${heading(v)} – 무료, 회원가입·업로드 없이`;
    },
    description: (v) => {
      if (v.kind === "resize-kb")
        return `사진을 몇 초 만에 ${v.kb}KB 이하로 줄여 보세요. 각종 신청서와 업로드에 맞는 사진을 무료로 만들 수 있어요. 회원가입이 필요 없고 사진이 내 기기 밖으로 나가지 않아요.`;
      if (v.kind === "compress")
        return "이미지 용량을 무료로 줄여 보세요. JPG, PNG, WebP, 아이폰 사진을 브라우저에서 바로 작게 만들 수 있어요. 회원가입, 업로드, 워터마크가 없어요.";
      return `${v.from} 파일을 브라우저에서 무료로 ${v.to} 파일로 변환하세요. 여러 파일도 한 번에 변환돼요. 회원가입, 업로드, 워터마크가 없고 파일이 내 기기 밖으로 나가지 않아요.`;
    },
    lead: (v) => {
      if (v.kind === "resize-kb") return `사진을 넣으면 온라인 신청서와 업로드에 바로 쓸 수 있는 ${v.kb}KB 이하 JPG를 받을 수 있어요.`;
      if (v.kind === "compress") return "화질은 그대로, 이미지 용량만 줄여 보세요.";
      return `${v.from} 파일을 몇 초 만에 ${v.to} 파일로 바꿔 드려요. 원하는 만큼 한 번에 변환하세요.`;
    },
    keywords: (v) => {
      const h = heading(v);
      if (v.kind === "resize-kb")
        return [h, `이미지 ${v.kb}KB로 줄이기`, `사진 ${v.kb}KB 이하`, `사진 용량 ${v.kb}KB`];
      if (v.kind === "compress") return [h, "이미지 압축", "사진 용량 줄이기", "이미지 용량 줄이기 무료"];
      return [h, h.toLowerCase(), `${h} 무료`, `${h} 온라인`];
    },
    promises: ["업로드 없음 – 내 기기에서만 처리", "여러 파일을 한 번에 바로 변환", "무료, 회원가입·워터마크 없음"],
    howToUse: (h) => `${h} 사용 방법`,
    versus: (from, to) => `${from} vs ${to}`,
    faqHeading: (h) => `${h} – 자주 묻는 질문`,
    helpfulGuides: "도움이 되는 가이드",
    moreConverters: "다른 무료 변환기",
    breadcrumbHome: "홈",
  },
  content: {
    convert: {
      steps: (v) => [
        `위 상자에 ${v.from} 파일을 끌어다 놓거나, 탭해서 파일을 선택하세요.`,
        `각 파일이 브라우저에서 바로 ${v.to} 파일로 변환돼요.`,
        "파일을 하나씩 받거나, ZIP으로 한 번에 다운로드하세요.",
      ],
      why: (v, from, to) => ({
        heading: `${v.from} 파일을 왜 ${v.to} 파일로 바꿔야 할까요?`,
        body: [
          `${v.from} 형식은 ${from.bestFor}에 좋지만, ${from.weakSpot}이 아쉬워요. ${v.to} 형식은 ${to.origin}이라서 필요한 곳에서 문제없이 열려요.`,
        ],
      }),
      devices: (v) =>
        v.fromId === "heic" || v.fromId === "heif"
          ? [
              {
                heading: `Windows에서 ${v.from} 파일을 ${v.to} 파일로 변환하는 방법`,
                body: [
                  `Windows 10과 11에서는 유료 코덱을 따로 설치하지 않으면 ${v.from} 사진을 열 수 없어요. Edge나 Chrome에서 이 페이지를 열고 사진을 끌어다 놓은 뒤 ${v.to} 파일을 다운로드하세요. 따로 설치할 것은 없어요.`,
                ],
              },
              {
                heading: `Mac에서 ${v.from} 파일을 ${v.to} 파일로 변환하는 방법`,
                body: [
                  "미리보기 앱으로는 사진을 한 장씩만 내보낼 수 있어요. 폴더 전체를 한 번에 바꾸려면 사진을 이 페이지로 끌어다 놓고 ZIP으로 한꺼번에 다운로드하세요.",
                ],
              },
              {
                heading: `아이폰에서 ${v.from} 파일을 ${v.to} 파일로 변환하는 방법`,
                body: [
                  `Safari에서 이 페이지를 열고 파일 넣는 곳을 탭한 뒤 사진을 고르고 다운로드를 탭하세요. 앞으로 찍는 사진이 ${v.from} 형식으로 저장되지 않게 하려면 설정 → 카메라 → 포맷 → 높은 호환성을 선택하세요.`,
                ],
              },
            ]
          : [],
      aboutHeading: (f) => `${f.label} 파일이란?`,
      aboutBody: (f) => [
        `${f.label} 형식(${f.fullName})은 ${f.origin}이에요. ${f.bestFor}에 가장 잘 맞아요.`,
        `다만 ${f.weakSpot}을 알아 두세요.`,
      ],
      safe: (_v, h) => ({
        heading: `${h}, 안전한가요?`,
        body: [
          "네. 변환은 내 기기의 브라우저 안에서 이루어져요. 파일이 서버로 업로드되지 않으니 다른 사람이 볼 수 없고, 페이지가 한 번 열린 뒤에는 인터넷이 끊겨도 작동해요.",
        ],
      }),
      faqs: (v, h) => [
        {
          question: `${h}, 정말 무료인가요?`,
          answer: `네. ${v.from} 파일을 원하는 만큼 ${v.to} 파일로 변환하세요. 회원가입, 횟수 제한, 워터마크가 없어요.`,
        },
        {
          question: `내 ${v.from} 파일이 어딘가에 업로드되나요?`,
          answer: "아니요. 모든 파일은 내 기기의 브라우저 안에서 변환돼요. 서버로 보내지는 것은 없어요.",
        },
        {
          question: `${v.from} 파일 여러 개를 한 번에 ${v.to} 파일로 변환할 수 있나요?`,
          answer: "네. 파일을 한꺼번에 넣고 ZIP 파일 하나로 모두 다운로드하세요.",
        },
        {
          question: `${v.from} 파일을 ${v.to} 파일로 바꾸면 화질이 떨어지나요?`,
          answer: v.toLossless
            ? `아니요. ${v.to} 형식은 모든 픽셀을 그대로 유지해요. 다만 파일 용량은 원본보다 커질 수 있어요.`
            : "거의 차이가 없어요. 화질 슬라이더를 사용하세요. 90%로 설정하면 대부분의 사진이 원본과 똑같아 보여요.",
        },
      ],
    },
    resize: {
      steps: (kb) => [
        "위 상자에 사진이나 서명 이미지를 넣으세요.",
        `${kb}KB 이하에 맞는 가장 좋은 화질을 찾아 드려요.`,
        "JPG를 다운로드해서 신청서에 올리세요.",
      ],
      sections: (kb) => [
        {
          heading: `${kb}KB 이하 사진은 언제 필요할까요?`,
          body: [
            `시험 접수, 입사 지원, 관공서 신청서에서는 정해진 용량을 넘는 사진과 서명을 받지 않는 경우가 많아요. ${kb}KB는 가장 흔한 기준 중 하나예요. 이 도구는 파일 용량을 단계적으로 줄이고, 꼭 필요할 때만 사진 크기를 줄여서 사진을 최대한 선명하게 지켜 줘요.`,
          ],
        },
        {
          heading: "내 사진이 업로드되나요?",
          body: ["아니요. 브라우저 안에서 용량을 줄이기 때문에 증명사진이나 서명이 휴대폰이나 컴퓨터 밖으로 나가지 않아요."],
        },
      ],
      faqs: (kb) => [
        { question: `이미지를 ${kb}KB로 줄이려면 어떻게 하나요?`, answer: `위 상자에 넣기만 하세요. 1~2초 만에 ${kb}KB 이하 JPG를 받을 수 있어요.` },
        {
          question: "사진이 계속 선명하게 보일까요?",
          answer: "네. 용량 기준에 맞는 가장 높은 화질을 고르고, 그것만으로 부족할 때만 사진 크기를 줄여요.",
        },
        { question: "아이폰 HEIC 사진도 줄일 수 있나요?", answer: "네. HEIC, PNG, WebP, AVIF 사진 모두 기준 용량 이하의 JPG로 바꿔 드려요." },
      ],
    },
    compress: {
      steps: [
        "위 상자에 이미지를 넣으세요.",
        "화질을 고르거나, 최대 용량을 KB로 정하세요.",
        "작아진 이미지를 하나씩 받거나 ZIP으로 다운로드하세요.",
      ],
      sections: [
        {
          heading: "이미지 용량은 어떻게 줄어들까요?",
          body: [
            "사진에는 눈으로 알아볼 수 있는 것보다 훨씬 많은 정보가 담겨 있어요. 압축은 눈에 띄지 않는 부분을 덜어 내서, 보기에는 차이 없이 파일 용량을 60~80%까지 줄일 수 있어요.",
          ],
        },
        { heading: "개인정보는 안전한가요?", body: ["네. 이미지는 브라우저 안에서 압축되고 어디에도 업로드되지 않아요."] },
      ],
      faqs: [
        { question: "이미지가 얼마나 작아지나요?", answer: "대부분의 사진은 50~80% 줄어들어요. PNG로 저장한 스크린샷과 그래픽은 더 많이 줄어드는 경우가 많아요." },
        { question: "원하는 용량으로 줄일 수 있나요?", answer: "네. 최대 용량 옵션을 켜고 원하는 용량을 KB로 입력하세요." },
        { question: "이미지 용량 줄이기는 무료인가요?", answer: "네. 회원가입, 횟수 제한, 워터마크가 없어요." },
      ],
    },
    pdf: {
      imageWord: "이미지",
      steps: (label) => [
        `위 상자에 ${label} 파일을 하나 이상 넣으세요.`,
        "원본 크기 또는 A4 페이지를 선택하세요.",
        "이미지마다 한 페이지씩 담긴 PDF 하나를 다운로드하세요.",
      ],
      why: (label) => ({
        heading: `${label} 파일을 왜 PDF로 만들까요?`,
        body: [
          "PDF는 어떤 휴대폰이나 컴퓨터에서도 똑같이 열리고, 깔끔하게 인쇄되며, 여러 장의 사진을 파일 하나에 모아 둘 수 있어요. 신청서, 영수증, 이메일로 서류를 보낼 때 딱 좋아요.",
        ],
      }),
      faqs: (label) => [
        {
          question: `${label} 파일을 PDF로 변환하려면 어떻게 하나요?`,
          answer: `위에 ${label} 파일을 넣고 PDF 다운로드를 누르세요. 넣은 순서대로 이미지가 한 장씩 페이지가 돼요.`,
        },
        { question: "워터마크가 들어가나요?", answer: "아니요. 워터마크 없는 깔끔한 PDF를 무료로, 내 기기에서 만들어요." },
        { question: "여러 이미지를 PDF 하나로 묶을 수 있나요?", answer: "네. 원하는 만큼 추가하세요. 모두 PDF 하나에 담겨요." },
      ],
    },
  },
  home: {
    h1: "무료 파일 변환기",
    h1Accent: "업로드 없이",
    intro: "HEIC, AVIF, WebP, JFIF, PNG, JPG 파일을 브라우저에서 바로 변환하세요.",
    introStrong: "100% 무료, 회원가입·워터마크 없음",
    introEnd: "– 파일이 내 기기 밖으로 나가지 않아요.",
    promises: [
      { title: "안심", text: "파일이 내 기기 밖으로 나가지 않아요" },
      { title: "빠르게", text: "여러 파일을 한 번에 변환" },
      { title: "오프라인 사용", text: "업로드도, 기다림도 없어요" },
    ],
    startWith: "바로 시작하기",
    guides: "가이드",
    allGuides: "전체 가이드 →",
    questions: "자주 묻는 질문",
    faqs: [
      { question: "ConvertLime은 정말 무료인가요?", answer: "네. 모든 변환기가 무료이고, 회원가입, 하루 이용 제한, 파일 워터마크가 없어요." },
      {
        question: "내 파일이 서버에 업로드되나요?",
        answer:
          "아니요. 변환은 내 휴대폰이나 컴퓨터의 웹 브라우저 안에서 이루어져요. 사진이 내 기기 밖으로 나가지 않기 때문에 빠르고, 인터넷이 없어도 작동해요.",
      },
      {
        question: "어떤 파일을 변환할 수 있나요?",
        answer:
          "아이폰 HEIC·HEIF 사진, AVIF, WebP, JFIF, PNG, JPG, GIF, BMP, TIFF, ICO, SVG를 변환할 수 있어요. 이미지 용량 줄이기, 정확한 KB 용량으로 맞추기, 이미지를 PDF로 만들기도 할 수 있어요.",
      },
      {
        question: "아이폰과 안드로이드에서도 되나요?",
        answer:
          "네. Safari나 Chrome에서 사이트를 열고, 파일 넣는 곳을 탭해 사진을 고른 뒤 변환된 파일을 다운로드하세요. 앱처럼 홈 화면에 추가할 수도 있어요.",
      },
    ],
    toolListName: "무료 파일 변환기",
  },
  blog: {
    title: "가이드",
    metaTitle: "가이드 – 이미지 파일 열기, 변환, 용량 줄이기",
    description:
      "HEIC, AVIF, WebP, JFIF 파일을 열고, JPG나 PNG로 변환하고, 신청서용으로 사진 용량을 줄이는 방법을 단계별로 알려 드려요. 무료이고 업로드가 없어요.",
    h1: "이미지 파일 가이드",
    intro: "Windows, Mac, 아이폰, 안드로이드에서 이미지 파일을 열고, 변환하고, 용량을 줄이는 방법을 단계별로 쉽게 알려 드려요.",
    updated: "업데이트",
    minRead: "분 분량",
    onThisPage: "이 페이지의 내용",
    faqTitle: "자주 묻는 질문",
    relatedTools: "관련 무료 도구",
    moreGuides: "다른 가이드",
    ctaTitle: (h) => `${h}, 무료로 바로 해 보세요`,
    ctaButton: "지금 변환하기",
    ctaNote: "회원가입·업로드 없이 브라우저에서 바로 작동해요",
    rssTitle: "ConvertLime 가이드",
    rssDescription: "이미지 파일을 열고, 변환하고, 용량을 줄이는 단계별 가이드예요.",
  },
  about: {
    metaDescription:
      "ConvertLime은 브라우저 안에서 작동하는 무료 파일 변환기라서 사진이 업로드되지 않아요. 작동 방식과 만든 이유를 소개해요.",
    h1: "ConvertLime 소개",
    intro:
      "ConvertLime은 가장 골치 아픈 이미지 파일을 위한 무료 변환기예요. 아이폰 HEIC 사진, 웹사이트에서 저장한 AVIF와 WebP 이미지, JFIF로 받아진 파일, 온라인 신청서에 올리기엔 너무 큰 사진까지 해결해 드려요.",
    whyHeading: "브라우저에서 작동하는 이유",
    whyBody:
      "대부분의 온라인 변환기는 파일을 자기 서버에 올려서 변환한 뒤 다시 보내 줘요. 그래서 느리고, 모르는 사람의 컴퓨터에 내 사진 사본이 남게 돼요. ConvertLime은 대신 내 휴대폰이나 컴퓨터에서 직접 변환해요. 아무것도 업로드되지 않으니 더 빠르고, 인터넷 없이도 작동하며, 파일이 안전하게 지켜져요.",
    costHeading: "이용 요금",
    costBody: "무료예요. 계정도, 하루 이용 제한도, 워터마크도 없어요. 유용하다면",
    installLink: "앱으로 설치해서",
    costEnd: "한 번의 클릭으로 바로 열어 보세요.",
    contactHeading: "문의",
    contactBody: "궁금한 점, 오류 신고, 변환되지 않는 파일이 있나요? 이메일을 보내 주세요:",
    startHeading: "이렇게 시작해 보세요",
    start: [
      { slug: "heic-to-jpg", text: "아이폰 사진을 어디서나 열기" },
      { slug: "compress-image", text: "이메일과 업로드용으로 사진 용량 줄이기" },
      { slug: "resize-image-to-50kb", text: "시험 접수와 입사 지원서용" },
      { slug: "invoice-generator", text: "인보이스를 만들고 PDF로 저장" },
    ],
  },
  privacy: {
    h1: "개인정보 보호",
    metaDescription: "ConvertLime은 파일을 내 기기에서 직접 변환해요. 아무것도 업로드되거나 저장되지 않아요.",
    points: [
      {
        heading: "파일은 내 기기에만 있어요",
        body: "모든 변환은 내 컴퓨터나 휴대폰의 브라우저 안에서 이루어져요. 파일이 저희 서버로 전송되지 않기 때문에 저희는 파일을 보거나, 보관하거나, 공유할 수 없어요.",
      },
      { heading: "계정이 필요 없어요", body: "회원가입도 로그인도 없어요. 어떤 도구를 쓰든 이름이나 이메일을 묻지 않아요." },
      {
        heading: "저희가 수집하는 정보",
        body: "대부분의 웹사이트처럼, 어떤 도구가 많이 쓰이는지 알기 위해 익명으로 페이지 방문 수를 셀 수 있어요. 여기에는 파일이나 파일 내용이 절대 포함되지 않아요.",
      },
      { heading: "문의", body: "개인정보 관련 질문이 있나요? {email}로 이메일을 보내 주세요." },
    ],
  },
  notFound: {
    title: "페이지를 찾을 수 없어요",
    h1: "존재하지 않는 페이지예요",
    body: "오래된 링크일 수 있어요. 아래에서 많이 쓰는 변환기를 이용하거나, 여기로 이동하세요:",
    allTools: "전체 도구",
  },
  removeBg,
  invoice,
};
