import type { Dictionary } from "@/i18n/types";

export const invoice: Dictionary["invoice"] = {
  heading: "Gerador de fatura grátis",
  title: "Gerador de fatura grátis – Crie e baixe sua fatura em PDF",
  description:
    "Faça uma fatura profissional em minutos. Digite direto na fatura, adicione seu logo, impostos e descontos e baixe em PDF. Grátis, sem cadastro e sem marca d’água.",
  lead: "Digite direto na fatura, adicione seu logo e seus itens e baixe um PDF caprichado com um clique. Grátis, sem conta, e seus dados ficam no seu aparelho.",
  keywords: [
    "gerador de fatura",
    "fazer fatura online",
    "criar fatura grátis",
    "modelo de fatura",
    "fatura em pdf",
    "como fazer uma fatura",
    "invoice online",
    "fatura para cliente",
  ],
  promises: ["Sem cadastro, sem marca d’água", "Baixe em PDF com um clique", "Fica salvo no seu aparelho, não no nosso"],
  steps: [
    "Clique em qualquer parte da fatura acima e digite: seu nome ou empresa, seu cliente e o que você vendeu ou fez.",
    "Adicione uma linha para cada produto ou serviço, com quantidade e preço. Os totais, impostos e descontos são calculados sozinhos.",
    "Escolha a moeda e uma cor, e adicione seu logo, se tiver.",
    "Clique em Baixar PDF e envie o arquivo para o seu cliente. A fatura fica salva neste navegador, então você pode voltar e editar depois.",
  ],
  sections: [
    {
      heading: "Monte a fatura do jeito que ela vai ficar",
      body: [
        "A maioria dos geradores de fatura mostra um formulário enorme e só exibe a fatura no final. Aqui você digita direto na própria fatura, então o que você vê é exatamente o que o cliente vai receber.",
        "Clique no nome da sua empresa, no cliente, numa data ou numa linha e comece a digitar. Adicione quantas linhas precisar, mude um preço, e o valor da linha, o subtotal, os impostos e o total se atualizam enquanto você digita.",
      ],
    },
    {
      heading: "Impostos, descontos, frete e pagamentos parciais",
      body: [
        "Informe uma alíquota de imposto e ela é calculada sobre o subtotal depois do desconto. Adicione um desconto em porcentagem, um valor de frete e um valor já pago, se o cliente deu um sinal.",
        "Quando há um valor pago, a fatura mostra o saldo a pagar além do total, para o cliente ver exatamente quanto ainda falta.",
      ],
    },
    {
      heading: "Um PDF caprichado que o cliente abre em qualquer lugar",
      body: [
        "Clique em Baixar PDF e receba um PDF nítido e profissional, com seu logo, suas cores e todas as linhas organizadas numa tabela. O texto do PDF é texto de verdade, então fica nítido na impressão e pode ser pesquisado e copiado.",
        "Sua fatura não tem marca d’água nem selo de “feito com”. Ela é sua para enviar.",
      ],
    },
    {
      heading: "Seus dados ficam no seu aparelho",
      body: [
        "A fatura é criada e salva dentro do seu navegador. Seu nome, os dados do cliente e seus preços nunca são enviados para a ConvertLime nem para ninguém.",
        "Como fica salva neste navegador, você pode fechar a página e continuar de onde parou. Ao começar uma nova fatura, os dados da sua empresa, o logo, a moeda e a alíquota de imposto são mantidos, e o número da fatura sobe um.",
      ],
    },
  ],
  faqs: [
    {
      question: "Esse gerador de fatura é grátis mesmo?",
      answer: "Sim. Você pode fazer e baixar quantas faturas quiser. Sem conta, sem período de teste e sem marca d’água.",
    },
    {
      question: "Preciso me cadastrar?",
      answer: "Não. Abra a página, preencha a fatura e baixe. Não tem nada para cadastrar.",
    },
    {
      question: "Onde minha fatura fica salva?",
      answer:
        "No seu próprio navegador, neste aparelho. Ela nunca é enviada. Se você limpar os dados do navegador ou usar outro aparelho, ela não vai estar lá, então baixe o PDF para guardar uma cópia.",
    },
    {
      question: "Posso adicionar meu logo?",
      answer: "Sim. Clique em Adicionar logo no topo da fatura e escolha uma imagem PNG, JPG, WebP ou SVG.",
    },
    {
      question: "Quais moedas posso usar?",
      answer:
        "Vinte moedas comuns, entre elas o real, o dólar americano, o euro, a libra, a rúpia, o iene, o yuan, o won e o peso. Os valores aparecem no formato certo para o seu idioma e a sua moeda.",
    },
    {
      question: "Como adiciono impostos?",
      answer:
        "Digite a alíquota ao lado de Imposto, nos totais. Ela é aplicada ao subtotal depois do desconto, e o valor do imposto e o total se atualizam na hora.",
    },
    {
      question: "Posso editar uma fatura depois de baixar?",
      answer:
        "Sim. A fatura continua neste navegador depois do download. Mude o que quiser e baixe de novo. Use Nova fatura quando for fazer a próxima.",
    },
  ],
};
