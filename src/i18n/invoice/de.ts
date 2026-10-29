import type { Dictionary } from "@/i18n/types";

export const invoice: Dictionary["invoice"] = {
  heading: "Rechnung erstellen – kostenlos",
  title: "Rechnung erstellen kostenlos – als PDF, ohne Anmeldung",
  description:
    "Erstelle in Minuten eine professionelle Rechnung: direkt tippen, Logo, MwSt. und Rabatt hinzufügen, als PDF laden. Kostenlos, ohne Anmeldung.",
  lead: "Tippe direkt auf die Rechnung, füge dein Logo und deine Positionen hinzu und lade mit einem Klick ein sauberes PDF herunter. Kostenlos, ohne Konto, und deine Daten bleiben auf deinem Gerät.",
  keywords: [
    "rechnung erstellen",
    "rechnung erstellen kostenlos",
    "rechnung schreiben online",
    "rechnungsvorlage",
    "rechnung pdf erstellen",
    "rechnungsgenerator",
    "rechnung kleinunternehmer",
    "rechnungsprogramm kostenlos",
  ],
  promises: ["Ohne Anmeldung, ohne Wasserzeichen", "Mit einem Klick als PDF", "Gespeichert auf deinem Gerät, nicht bei uns"],
  steps: [
    "Klicke auf eine beliebige Stelle der Rechnung oben und tippe los: deinen Namen oder deine Firma, deinen Kunden und was du verkauft oder geleistet hast.",
    "Füge für jedes Produkt und jede Leistung eine Position mit Menge und Preis hinzu. Summen, Steuer und Rabatte rechnen sich von selbst aus.",
    "Wähle deine Währung und eine Farbe und füge dein Logo hinzu, falls du eins hast.",
    "Klicke auf PDF herunterladen und schick die Datei an deinen Kunden. Deine Rechnung bleibt in diesem Browser gespeichert, du kannst sie also später weiter bearbeiten.",
  ],
  sections: [
    {
      heading: "Die Rechnung so erstellen, wie sie aussehen wird",
      body: [
        "Die meisten Rechnungstools geben dir ein langes Formular und zeigen die Rechnung erst am Ende. Hier tippst du direkt auf die Rechnung selbst – was du siehst, bekommt dein Kunde genau so.",
        "Klicke auf deinen Firmennamen, den Kunden, ein Datum oder eine Position und fang an zu tippen. Füge so viele Positionen hinzu, wie du brauchst, ändere einen Preis – Betrag, Zwischensumme, Steuer und Gesamtbetrag passen sich beim Tippen an.",
      ],
    },
    {
      heading: "Steuer, Rabatt, Versand und Anzahlungen",
      body: [
        "Trag einen Steuersatz wie die MwSt. ein; er wird auf die Zwischensumme nach Abzug des Rabatts berechnet. Füge einen Rabatt in Prozent, Versandkosten und einen bereits bezahlten Betrag hinzu, falls dein Kunde eine Anzahlung geleistet hat.",
        "Wurde schon etwas bezahlt, zeigt die Rechnung neben dem Gesamtbetrag auch den offenen Betrag – so sieht dein Kunde genau, was noch zu zahlen ist.",
      ],
    },
    {
      heading: "Ein sauberes PDF, das dein Kunde überall öffnen kann",
      body: [
        "Klicke auf PDF herunterladen und du bekommst ein scharfes, professionelles PDF mit deinem Logo, deinen Farben und allen Positionen in einer ordentlichen Tabelle. Der Text im PDF ist echter Text: Er bleibt beim Drucken scharf und lässt sich durchsuchen und kopieren.",
        "Auf deiner Rechnung gibt es kein Wasserzeichen und keinen „Erstellt mit“-Hinweis. Sie gehört ganz dir.",
      ],
    },
    {
      heading: "Deine Daten bleiben auf deinem Gerät",
      body: [
        "Deine Rechnung wird in deinem Browser erstellt und gespeichert. Dein Name, die Daten deines Kunden und deine Preise werden nie zu ConvertLime oder sonst irgendwohin hochgeladen.",
        "Weil sie in diesem Browser gespeichert ist, kannst du die Seite schließen und später weitermachen. Wenn du eine neue Rechnung beginnst, bleiben deine Firmendaten, dein Logo, die Währung und der Steuersatz erhalten, und die Rechnungsnummer zählt um eins hoch.",
      ],
    },
  ],
  faqs: [
    {
      question: "Ist das Erstellen von Rechnungen hier wirklich kostenlos?",
      answer: "Ja. Du kannst so viele Rechnungen erstellen und herunterladen, wie du willst. Kein Konto, keine Testphase, kein Wasserzeichen.",
    },
    {
      question: "Muss ich mich anmelden?",
      answer: "Nein. Seite öffnen, Rechnung ausfüllen, herunterladen. Eine Registrierung gibt es nicht.",
    },
    {
      question: "Wo wird meine Rechnung gespeichert?",
      answer:
        "In deinem eigenen Browser, auf diesem Gerät. Sie wird nie hochgeladen. Wenn du die Browserdaten löschst oder ein anderes Gerät nutzt, ist sie dort nicht vorhanden – lade also das PDF herunter, um eine Kopie zu behalten.",
    },
    {
      question: "Kann ich mein Logo hinzufügen?",
      answer: "Ja. Klicke oben auf der Rechnung auf Logo hinzufügen und wähle ein PNG-, JPG-, WebP- oder SVG-Bild.",
    },
    {
      question: "Welche Währungen kann ich verwenden?",
      answer:
        "Zwanzig gängige Währungen, darunter Euro, US-Dollar, Pfund, Rupie, Yen, Yuan, Won, Real und Peso. Beträge werden so geschrieben, wie es in deiner Sprache und Währung üblich ist.",
    },
    {
      question: "Wie füge ich die Mehrwertsteuer hinzu?",
      answer:
        "Trag den Steuersatz neben MwSt. bei den Summen ein. Er wird auf die Zwischensumme nach Rabatt angewendet, und Steuerbetrag und Gesamtbetrag aktualisieren sich sofort.",
    },
    {
      question: "Kann ich eine Rechnung nach dem Herunterladen noch ändern?",
      answer:
        "Ja. Die Rechnung bleibt nach dem Download in diesem Browser. Ändere, was du möchtest, und lade sie erneut herunter. Mit Neue Rechnung beginnst du die nächste.",
    },
  ],
};
