import type { Dictionary } from "@/i18n/types";

export const invoice: Dictionary["invoice"] = {
  heading: "Générateur de facture gratuit",
  title: "Générateur de facture gratuit – Créez votre facture en PDF",
  description:
    "Créez une facture pro en quelques minutes : écrivez sur la facture, ajoutez logo, TVA et remise, puis téléchargez le PDF. Gratuit, sans inscription.",
  lead: "Écrivez directement sur la facture, ajoutez votre logo et vos lignes, puis téléchargez un PDF soigné en un clic. Gratuit, sans compte, et vos données restent sur votre appareil.",
  keywords: [
    "générateur de facture",
    "créer une facture",
    "faire une facture en ligne",
    "facture gratuite",
    "modèle de facture",
    "facture pdf",
    "logiciel facture gratuit",
    "facture auto-entrepreneur",
  ],
  promises: ["Sans inscription ni filigrane", "PDF téléchargé en un clic", "Enregistré sur votre appareil, pas chez nous"],
  steps: [
    "Cliquez n’importe où sur la facture ci-dessus et écrivez : votre nom ou votre entreprise, votre client et ce que vous avez vendu ou réalisé.",
    "Ajoutez une ligne par produit ou prestation, avec sa quantité et son prix. Les totaux, la TVA et les remises se calculent tout seuls.",
    "Choisissez votre devise et une couleur, et ajoutez votre logo si vous en avez un.",
    "Cliquez sur Télécharger le PDF et envoyez le fichier à votre client. Votre facture est enregistrée dans ce navigateur : vous pouvez revenir la modifier.",
  ],
  sections: [
    {
      heading: "Créez la facture telle qu’elle apparaîtra",
      body: [
        "La plupart des générateurs de facture vous font remplir un long formulaire et ne montrent la facture qu’à la fin. Ici, vous écrivez directement sur la facture : ce que vous voyez est exactement ce que votre client recevra.",
        "Cliquez sur le nom de votre entreprise, le client, une date ou une ligne et commencez à écrire. Ajoutez autant de lignes que nécessaire, modifiez un prix, et le montant de la ligne, le sous-total, la TVA et le total se mettent à jour pendant que vous tapez.",
      ],
    },
    {
      heading: "TVA, remises, frais de port et acomptes",
      body: [
        "Indiquez un taux de taxe, comme la TVA : il est calculé sur le sous-total après remise. Ajoutez une remise en pourcentage, des frais de port et un montant déjà réglé si votre client a versé un acompte.",
        "Quand un montant a été réglé, la facture affiche le reste à payer en plus du total, pour que votre client sache exactement ce qu’il lui reste à régler.",
      ],
    },
    {
      heading: "Un PDF soigné que votre client ouvre partout",
      body: [
        "Cliquez sur Télécharger le PDF et vous obtenez un PDF net et professionnel, avec votre logo, vos couleurs et toutes les lignes bien rangées dans un tableau. Le texte du PDF est du vrai texte : il reste net à l’impression et peut être recherché et copié.",
        "Aucun filigrane ni mention « créé avec » sur votre facture. Elle est à vous.",
      ],
    },
    {
      heading: "Vos données restent sur votre appareil",
      body: [
        "Votre facture est créée et enregistrée dans votre navigateur. Votre nom, les coordonnées de votre client et vos prix ne sont jamais envoyés à ConvertLime ni à qui que ce soit.",
        "Comme elle est enregistrée dans ce navigateur, vous pouvez fermer la page et reprendre là où vous en étiez. Quand vous commencez une nouvelle facture, vos coordonnées, votre logo, votre devise et votre taux de taxe sont conservés, et le numéro de facture augmente de un.",
      ],
    },
  ],
  faqs: [
    {
      question: "Ce générateur de facture est-il vraiment gratuit ?",
      answer: "Oui. Vous pouvez créer et télécharger autant de factures que vous voulez. Pas de compte, pas d’essai, pas de filigrane.",
    },
    {
      question: "Dois-je créer un compte ?",
      answer: "Non. Ouvrez la page, remplissez la facture et téléchargez-la. Rien à créer.",
    },
    {
      question: "Où ma facture est-elle enregistrée ?",
      answer:
        "Dans votre propre navigateur, sur cet appareil. Elle n’est jamais envoyée en ligne. Si vous effacez les données du navigateur ou changez d’appareil, elle ne sera plus là : téléchargez le PDF pour en garder une copie.",
    },
    {
      question: "Puis-je ajouter mon logo ?",
      answer: "Oui. Cliquez sur Ajouter un logo en haut de la facture et choisissez une image PNG, JPG, WebP ou SVG.",
    },
    {
      question: "Quelles devises puis-je utiliser ?",
      answer:
        "Vingt devises courantes, dont l’euro, le dollar américain, la livre, la roupie, le yen, le yuan, le won, le réal et le peso. Les montants s’écrivent selon les usages de votre langue et de votre devise.",
    },
    {
      question: "Comment ajouter la TVA ?",
      answer:
        "Saisissez le taux à côté de TVA dans les totaux. Il s’applique au sous-total après remise, et le montant de la taxe et le total se mettent à jour aussitôt.",
    },
    {
      question: "Puis-je modifier une facture après l’avoir téléchargée ?",
      answer:
        "Oui. La facture reste dans ce navigateur après le téléchargement. Modifiez ce que vous voulez et téléchargez-la à nouveau. Utilisez Nouvelle facture quand vous passez à la suivante.",
    },
  ],
};
