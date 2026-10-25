---
title: "O que é arquivo JFIF? Por que aparece e como resolver"
description: "Arquivo JFIF é só um JPEG com outra terminação. Veja por que o Windows salva imagens como .jfif e três jeitos fáceis de voltar para um .jpg normal, grátis."
keyword: "o que é arquivo jfif"
published: "2026-10-25"
tool: "jfif-to-jpg"
related: ["jfif-to-png", "jfif-to-pdf", "jpg-to-png", "compress-image"]
steps:
  - "Abra o conversor gratuito de JFIF para JPG da ConvertLime."
  - "Arraste suas imagens JFIF para a caixa ou toque nela para escolher."
  - "Aguarde um instante enquanto cada imagem é salva como JPG no seu navegador."
  - "Baixe os arquivos JPG um por um ou todos juntos em um ZIP."
faqs:
  - question: "Arquivo JFIF é a mesma coisa que JPG?"
    answer: "Quase. JFIF é um jeito padrão de guardar uma imagem JPEG, e a maioria dos arquivos .jpg já segue esse padrão. A imagem dentro é do mesmo tipo. Só a terminação do arquivo muda."
  - question: "Posso só renomear .jfif para .jpg?"
    answer: "Sim, na maioria dos casos. Como a imagem dentro já é um JPEG, trocar a terminação para .jpg geralmente basta para aplicativos e sites aceitarem. Se um formulário ainda recusar, faça a conversão de verdade."
  - question: "Por que o Windows salva minhas imagens como JFIF?"
    answer: "O Windows consulta qual terminação usar para as imagens JPEG que você salva da internet. Em alguns computadores essa configuração aponta para .jfif em vez de .jpg, e os downloads acabam saindo como .jfif."
  - question: "Converter JFIF para JPG perde qualidade?"
    answer: "Renomear não perde nada. Converter salva a imagem de novo, e com qualidade alta a diferença não aparece."
  - question: "Como abro um arquivo JFIF?"
    answer: "A maioria dos apps de fotos e todos os navegadores abrem JFIF. No Windows, o app Fotos e o Paint abrem. No Mac, a Pré-Visualização abre."
---

O que é arquivo JFIF? É uma imagem JPEG comum que termina em `.jfif` em vez de `.jpg`. JFIF quer dizer **JPEG File Interchange Format**, que é simplesmente o jeito padrão de guardar imagens JPEG. A imagem dentro é igual à de qualquer JPG; o Windows só deu outro nome na hora de salvar. Por isso um arquivo JFIF abre normalmente no seu PC, mas é recusado por alguns formulários que só aceitam `.jpg` ou `.jpeg`.

<!-- cta -->

## Por que suas imagens são salvas como .jfif

Isso costuma acontecer no Windows quando você clica com o botão direito em uma imagem no navegador e escolhe salvar. O Windows guarda uma lista de qual terminação usar para cada tipo de arquivo. Em alguns computadores, essa lista aponta imagens JPEG para `.jfif` em vez de `.jpg`, muitas vezes porque outro programa mudou a configuração. O navegador segue essa regra, e o download termina em `.jfif`.

Não há nada de errado com a imagem. É a mesma foto, com a mesma qualidade e o mesmo tamanho em pixels.

## JFIF x JPG x JPEG: qual a diferença do arquivo

| | .jfif | .jpg | .jpeg |
| --- | --- | --- | --- |
| Tipo de imagem | JPEG | JPEG | JPEG |
| Qualidade | Igual | Igual | Igual |
| Abre em navegadores e apps de fotos | Sim | Sim | Sim |
| Aceito em formulários de envio | Às vezes não | Sim | Sim |
| De onde costuma vir | Downloads no Windows | Câmeras, celulares, sites | Algumas câmeras e apps |

`.jpg` e `.jpeg` são totalmente equivalentes. Se quiser trocar de um para o outro, use [JPG para JPEG](/jpg-to-jpeg) ou [JPEG para JPG](/jpeg-to-jpg).

## Três jeitos de transformar um arquivo JFIF em JPG

Escolha o que achar mais fácil. Os três entregam um JPG normal.

### Jeito 1: converter online de graça

É a opção mais segura se um site continua recusando seu arquivo ou se você tem muitas imagens.

1. Abra o [conversor de JFIF para JPG](/jfif-to-jpg) gratuito.
2. Arraste suas imagens JFIF para a caixa ou toque nela para escolher.
3. Cada imagem é salva como um JPG de verdade, no próprio navegador. Nada é enviado para a internet.
4. Clique em **Baixar** ou baixe tudo junto em um ZIP.

### Jeito 2: renomear o arquivo

Como o arquivo JFIF já guarda uma imagem JPEG, renomear geralmente funciona.

1. No Windows, abra o **Explorador de Arquivos** e, no menu **Exibir**, ative **Extensões de nomes de arquivos** para enxergar o `.jfif` no final.
2. Clique com o botão direito no arquivo e escolha **Renomear**.
3. Troque `.jfif` por `.jpg` e aperte **Enter**.
4. Clique em **Sim** quando o Windows avisar sobre a mudança da extensão.

No Mac, clique no nome do arquivo no Finder, troque a terminação para `.jpg` e confirme em **Usar .jpg**.

### Jeito 3: salvar uma cópia no Paint ou na Pré-Visualização

- **Windows:** abra o arquivo no Paint, vá em **Arquivo → Salvar como → Imagem JPEG** e salve.
- **Mac:** abra o arquivo na Pré-Visualização, vá em **Arquivo → Exportar**, escolha **JPEG** como formato e salve.

Isso salva a imagem de novo, o que funciona bem para um ou dois arquivos, mas é demorado para uma pasta inteira.

<!-- cta -->

## Como fazer o Windows parar de salvar imagens como JFIF

A causa é uma única configuração no Registro do Windows. Só mude se você se sentir à vontade, porque editar o Registro do jeito errado pode causar problemas. Na dúvida, apenas renomeie ou converta os arquivos conforme forem aparecendo.

1. Aperte **Windows + R**, digite `regedit` e aperte **Enter**.
2. Vá até `HKEY_CLASSES_ROOT\MIME\Database\Content Type\image/jpeg`.
3. Dê dois cliques no valor chamado **Extension**, à direita.
4. Troque `.jfif` por `.jpg` e clique em **OK**.
5. Feche o Editor do Registro e reabra o navegador.

Os próximos downloads devem sair como `.jpg`. Os arquivos que você já salvou continuam como `.jfif`, então renomeie ou converta esses.

## Precisa de PNG ou PDF em vez de JPG?

Às vezes o formulário não pede JPG:

- **Precisa de PNG?** Use [JFIF para PNG](/jfif-to-png). Saiba que um PNG feito a partir de uma imagem JPEG fica maior e não ganha fundo transparente.
- **Precisa de um documento?** Use [JFIF para PDF](/jfif-to-pdf) para juntar uma ou mais imagens em um único PDF.
- **Arquivo grande demais?** Depois de converter, passe o JPG pelo [compressor de imagem](/compress-image) ou [reduza para 200KB](/resize-image-to-200kb) se o formulário tiver um limite exato.

## Arquivo JFIF é seguro?

Um arquivo JFIF é uma imagem, como qualquer JPG. A terminação em si não é sinal de perigo; ela só reflete uma configuração do Windows. Como com qualquer arquivo, abra apenas imagens de pessoas e sites em que você confia.

## Resumindo

Um arquivo JFIF é uma imagem JPEG com uma terminação diferente. Você pode renomear para `.jpg`, salvar uma cópia no Paint ou na Pré-Visualização, ou usar o [conversor de JFIF para JPG](/jfif-to-jpg) gratuito para ter um JPG limpo em segundos. Se você esbarrar em outras terminações estranhas, nossos guias sobre [arquivos AVIF](/blog/what-is-an-avif-file) e [arquivos HEIC](/blog/what-is-a-heic-file) explicam essas também.
