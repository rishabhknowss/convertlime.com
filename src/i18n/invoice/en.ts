import type { Dictionary } from "@/i18n/types";

export const invoice: Dictionary["invoice"] = {
  heading: "Free Invoice Maker",
  title: "Free Invoice Maker – Create & Download PDF Invoices, No Sign-up",
  description:
    "Make a professional invoice in minutes. Type straight onto the invoice, add your logo, taxes and discounts, then download a PDF. Free, no sign-up, no watermark.",
  lead: "Type straight onto the invoice, add your logo and items, and download a clean PDF in one click. Free, no account, and your details stay on your device.",
  keywords: [
    "invoice maker",
    "invoice generator",
    "free invoice maker",
    "create invoice",
    "invoice template",
    "invoice pdf",
    "online invoice maker",
    "make an invoice",
  ],
  promises: ["No sign-up, no watermark", "Download as PDF in one click", "Saved on your device, not ours"],
  steps: [
    "Click any part of the invoice above and type: your name or business, your client, and what you sold or did.",
    "Add a line for each product or service with its quantity and price. Totals, tax and discounts work themselves out.",
    "Pick your currency and a color, and add your logo if you have one.",
    "Click Download PDF and send the file to your client. Your invoice is saved in this browser, so you can come back and edit it.",
  ],
  sections: [
    {
      heading: "Make an invoice the way it will look",
      body: [
        "Most invoice makers give you a long form to fill in and only show the invoice at the end. Here you type straight onto the invoice itself, so what you see is exactly what your client will get.",
        "Click your business name, the client, a date or a line and start typing. Add as many lines as you need, change a price, and the line amount, subtotal, tax and total update as you type.",
      ],
    },
    {
      heading: "Taxes, discounts, shipping and part payments",
      body: [
        "Add a tax rate such as VAT or GST and it is worked out on the subtotal after any discount. Add a discount as a percentage, a shipping charge, and an amount already paid if your client paid a deposit.",
        "When an amount has been paid, the invoice shows the balance due as well as the total, so your client sees exactly what is left to pay.",
      ],
    },
    {
      heading: "A clean PDF your client can open anywhere",
      body: [
        "Click Download PDF and you get a sharp, professional PDF with your logo, your colors and every line laid out in a neat table. The text in the PDF is real text, so it stays crisp when printed and can be searched and copied.",
        "There is no watermark and no 'made with' badge on your invoice. It is yours to send.",
      ],
    },
    {
      heading: "Your details stay on your device",
      body: [
        "Your invoice is made and saved inside your browser. Your name, your client's details and your prices are never uploaded to ConvertLime or anyone else.",
        "Because it is saved in this browser, you can close the page and pick up where you left off. When you start a new invoice, your business details, logo, currency and tax rate are kept, and the invoice number goes up by one.",
      ],
    },
  ],
  faqs: [
    {
      question: "Is this invoice maker really free?",
      answer: "Yes. You can make and download as many invoices as you like. There is no account, no trial and no watermark.",
    },
    {
      question: "Do I need to sign up?",
      answer: "No. Open the page, fill in the invoice and download it. Nothing to register.",
    },
    {
      question: "Where is my invoice saved?",
      answer:
        "In your own browser, on this device. It is never uploaded. If you clear your browser data or use a different device, it will not be there, so download the PDF to keep a copy.",
    },
    {
      question: "Can I add my logo?",
      answer: "Yes. Click Add logo at the top of the invoice and pick a PNG, JPG, WebP or SVG image.",
    },
    {
      question: "Which currencies can I use?",
      answer:
        "Twenty common currencies including US dollar, euro, pound, rupee, yen, yuan, won, real and peso. Amounts are written the way your language and currency expect.",
    },
    {
      question: "How do I add tax or VAT?",
      answer:
        "Type the tax rate next to Tax in the totals. It is applied to the subtotal after any discount, and the tax amount and total update straight away.",
    },
    {
      question: "Can I edit an invoice after downloading it?",
      answer:
        "Yes. The invoice stays in this browser after you download it. Change anything and download it again. Use New invoice when you are ready for the next one.",
    },
  ],
};
