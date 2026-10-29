import type { Dictionary } from "@/i18n/types";

export const invoice: Dictionary["invoice"] = {
  heading: "Faire une facture en ligne gratuitement",
  title: "Faire une facture en ligne gratuitement, sans inscription",
  description:
    "Faire une facture en ligne gratuitement : choisissez un modèle, écrivez dessus, ajoutez logo et TVA, puis téléchargez le PDF. Sans inscription ni filigrane.",
  lead: "Faire une facture prend quelques minutes : choisissez un modèle de facture, écrivez directement dessus et téléchargez un PDF propre en un clic. Gratuit, sans compte, sans filigrane, et vos données ne quittent jamais votre appareil.",
  keywords: [
    "faire une facture",
    "faire une facture en ligne",
    "facture en ligne",
    "créer une facture",
    "générateur de facture",
    "modèle de facture",
    "facture gratuite",
    "facture pdf",
    "faire une facture gratuitement",
    "créer une facture en ligne gratuit",
  ],
  promises: ["Sans inscription ni filigrane", "PDF téléchargé en un clic", "Enregistré sur votre appareil, pas chez nous"],
  steps: [
    "Choisissez un modèle de facture : Classique, Studio, Minuit, Éditorial ou Audacieux.",
    "Cliquez n’importe où sur la facture et écrivez vos coordonnées, celles de votre client, puis une ligne par produit ou prestation avec sa quantité et son prix.",
    "Ajoutez la TVA, une remise, des frais de livraison ou un montant déjà réglé. Choisissez votre devise et votre couleur, et ajoutez votre logo.",
    "Cliquez sur Télécharger le PDF et envoyez-le à votre client. La facture reste enregistrée dans ce navigateur : vous pourrez la modifier plus tard.",
  ],
  sections: [
    {
      heading: "Un générateur de facture où l’on écrit sur la facture",
      body: [
        "La plupart des outils de facture en ligne vous font remplir un long formulaire et ne montrent la facture qu’à la fin. Ici, vous écrivez directement sur la facture : ce que vous voyez est exactement ce que votre client recevra.",
        "Cliquez sur le nom de votre entreprise, le client, une date ou une ligne et commencez à écrire. Ajoutez autant de lignes que nécessaire : les montants, le sous-total, la TVA et le total se mettent à jour pendant que vous tapez.",
      ],
    },
    {
      heading: "Cinq modèles de facture au choix",
      body: [
        "Classique offre une mise en page sobre et traditionnelle. Studio et Minuit ajoutent un grand titre et une image de couverture en haut, en version claire ou sombre. Éditorial utilise une élégante police à empattements, et Audacieux met le total bien en avant.",
        "Chaque modèle reprend votre logo et votre couleur, et vous pouvez passer de l’un à l’autre à tout moment sans perdre ce que vous avez saisi.",
      ],
    },
    {
      heading: "Que mettre sur une facture ?",
      body: [
        "Une facture complète indique le nom et les coordonnées de votre entreprise, le nom et l’adresse de votre client, un numéro de facture unique, la date d’émission et la date d’échéance.",
        "En dessous, listez chaque produit ou prestation avec sa quantité et son prix, puis le sous-total, l’éventuelle remise, la TVA et le total à payer. Précisez les modalités de paiement dans les notes pour que votre client sache comment vous régler.",
      ],
    },
    {
      heading: "TVA, remises, frais de livraison et acomptes",
      body: [
        "Indiquez un taux de TVA : il est calculé sur le sous-total après remise. Ajoutez une remise en pourcentage, des frais de livraison et un montant déjà réglé si votre client a versé un acompte.",
        "Quand une partie a été payée, la facture affiche le reste à payer en plus du total, pour que votre client sache exactement ce qu’il lui reste à régler.",
      ],
    },
    {
      heading: "Des numéros de facture qui se suivent tout seuls",
      body: [
        "Chaque facture doit avoir son propre numéro. Commencez par INV-0001 ou par votre propre format : quand vous cliquez sur Nouvelle facture, le numéro augmente de un et garde votre préfixe.",
        "Vos coordonnées, votre logo, votre devise, votre modèle et votre taux de TVA sont repris sur la facture suivante : en créer une nouvelle ne prend que quelques secondes.",
      ],
    },
    {
      heading: "Une facture PDF propre, sans filigrane",
      body: [
        "Télécharger le PDF vous donne un document net et professionnel, avec votre logo, vos couleurs et toutes les lignes rangées dans un tableau. Le texte est du vrai texte : il reste net à l’impression et peut être recherché et copié.",
        "Aucun filigrane, aucune mention « créé avec ». Vous pouvez aussi imprimer la facture directement depuis votre navigateur.",
      ],
    },
    {
      heading: "Vos données restent sur votre appareil",
      body: [
        "Ce générateur de facture fonctionne entièrement dans votre navigateur. Votre nom, les coordonnées de vos clients et vos tarifs ne sont jamais envoyés à ConvertLime ni à qui que ce soit.",
        "Votre facture est enregistrée dans ce navigateur : vous pouvez fermer la page et reprendre là où vous en étiez.",
      ],
    },
  ],
  faqs: [
    {
      question: "Ce générateur de facture est-il vraiment gratuit ?",
      answer: "Oui. Créez et téléchargez autant de factures que vous voulez. Pas de compte, pas d’essai, pas de limite et pas de filigrane.",
    },
    {
      question: "Faut-il créer un compte ?",
      answer: "Non. Ouvrez la page, remplissez la facture et téléchargez-la. Il n’y a rien à créer.",
    },
    {
      question: "Comment faire une facture ?",
      answer:
        "Choisissez un modèle, écrivez vos coordonnées et celles de votre client, ajoutez une ligne par article avec sa quantité et son prix, indiquez la TVA ou une remise si besoin, puis cliquez sur Télécharger le PDF.",
    },
    {
      question: "Quels modèles de facture sont proposés ?",
      answer:
        "Cinq : Classique, Studio, Minuit, Éditorial et Audacieux. Chacun reprend votre logo et votre couleur, et vous pouvez changer de modèle à tout moment.",
    },
    {
      question: "Où ma facture est-elle enregistrée ?",
      answer:
        "Dans votre propre navigateur, sur cet appareil. Elle n’est jamais envoyée en ligne. Si vous effacez les données du navigateur ou changez d’appareil, elle n’y sera plus : téléchargez le PDF pour en garder une copie.",
    },
    {
      question: "Puis-je ajouter mon logo ?",
      answer: "Oui. Cliquez sur Ajouter un logo en haut de la facture et choisissez une image PNG, JPG, WebP ou SVG.",
    },
    {
      question: "Quelles devises puis-je utiliser ?",
      answer:
        "Vingt devises courantes, dont l’euro, le dollar américain, la livre sterling, le franc suisse, la roupie, le yen, le yuan, le won, le real et le peso. La facture démarre dans la devise de votre langue et écrit les montants comme le veut votre devise.",
    },
    {
      question: "Comment ajouter la TVA ?",
      answer:
        "Tapez le taux à côté de TVA dans les totaux. Il s’applique au sous-total après remise, et la TVA et le total se mettent à jour aussitôt.",
    },
    {
      question: "Puis-je modifier une facture après l’avoir téléchargée ?",
      answer:
        "Oui. La facture reste dans ce navigateur après le téléchargement. Modifiez ce que vous voulez et téléchargez-la à nouveau, ou cliquez sur Nouvelle facture pour la suivante.",
    },
  ],
};
