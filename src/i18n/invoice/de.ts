import type { Dictionary } from "@/i18n/types";

export const invoice: Dictionary["invoice"] = {
  heading: "Rechnung schreiben – kostenlos und online",
  title: "Rechnung schreiben kostenlos, ohne Anmeldung – Vorlage & PDF",
  description:
    "Rechnung schreiben kostenlos: Vorlage wählen, direkt auf der Rechnung tippen, Logo und MwSt. ergänzen, als PDF laden. Ohne Anmeldung, ohne Wasserzeichen.",
  lead: "Rechnung schreiben in wenigen Minuten: Wähle eine Rechnungsvorlage, tippe direkt darauf und lade mit einem Klick ein sauberes PDF herunter. Kostenlos, ohne Konto, ohne Wasserzeichen – und deine Daten bleiben auf deinem Gerät.",
  keywords: [
    "rechnung schreiben",
    "rechnung schreiben kostenlos",
    "rechnung schreiben online",
    "rechnung erstellen",
    "rechnung erstellen kostenlos",
    "rechnungsvorlage",
    "rechnungsgenerator",
    "rechnung als pdf",
    "rechnung ohne anmeldung",
    "rechnung kleinunternehmer",
  ],
  promises: ["Ohne Anmeldung, ohne Wasserzeichen", "Mit einem Klick als PDF", "Gespeichert auf deinem Gerät, nicht bei uns"],
  steps: [
    "Wähle eine Rechnungsvorlage: Klassisch, Studio, Mitternacht, Editorial oder Kräftig.",
    "Klicke auf eine beliebige Stelle der Rechnung und tippe deine Firma, deinen Kunden und für jedes Produkt oder jede Leistung eine Position mit Menge und Preis ein.",
    "Ergänze MwSt., Rabatt, Versand oder einen bereits bezahlten Betrag. Wähle Währung und Farbe und füge dein Logo hinzu.",
    "Klicke auf PDF herunterladen und schick die Rechnung an deinen Kunden. Sie bleibt in diesem Browser gespeichert, du kannst sie also später noch bearbeiten.",
  ],
  sections: [
    {
      heading: "Rechnung schreiben direkt auf der Rechnung",
      body: [
        "Die meisten Rechnungsgeneratoren geben dir ein langes Formular und zeigen die fertige Rechnung erst ganz am Ende. Hier schreibst du die Rechnung direkt auf dem Blatt – was du siehst, bekommt dein Kunde genau so.",
        "Klicke auf deinen Firmennamen, den Kunden, ein Datum oder eine Position und fang an zu tippen. Füge so viele Positionen hinzu, wie du brauchst. Beträge, Zwischensumme, MwSt. und Gesamtbetrag rechnen sich beim Tippen von selbst aus.",
      ],
    },
    {
      heading: "Fünf Rechnungsvorlagen zur Auswahl",
      body: [
        "Klassisch ist ein schlichtes, traditionelles Layout. Studio und Mitternacht haben einen großen Titel und ein Titelbild über die ganze Breite, hell oder dunkel. Editorial setzt auf eine elegante Serifenschrift, und Kräftig stellt den Gesamtbetrag groß in den Mittelpunkt.",
        "Jede Rechnungsvorlage übernimmt dein Logo und deine Akzentfarbe. Du kannst jederzeit zwischen den Vorlagen wechseln, ohne dass etwas von dem verloren geht, was du schon eingetippt hast.",
      ],
    },
    {
      heading: "Was auf eine Rechnung gehört",
      body: [
        "Eine vollständige Rechnung enthält deinen Namen oder deine Firma mit Anschrift, Name und Anschrift deines Kunden, eine eindeutige Rechnungsnummer, das Rechnungsdatum und das Fälligkeitsdatum. In Deutschland gehört außerdem deine Steuernummer oder USt-IdNr. dazu – trag sie einfach unter deine Firmendaten ein.",
        "Darunter listest du jedes Produkt und jede Leistung mit Menge und Preis auf, dann folgen Zwischensumme, ein eventueller Rabatt, die Umsatzsteuer und der fällige Betrag. Deine Bankverbindung oder das Zahlungsziel schreibst du in die Zahlungsbedingungen, damit dein Kunde weiß, wie er zahlen soll.",
      ],
    },
    {
      heading: "MwSt., Rabatt, Versand und Anzahlungen",
      body: [
        "Trag einen Steuersatz wie 19 % oder 7 % MwSt. ein; er wird auf die Zwischensumme nach Abzug des Rabatts berechnet. Bist du Kleinunternehmer und weist keine Umsatzsteuer aus, lässt du den Satz einfach auf null und schreibst den passenden Hinweis in die Notizen. Dazu kommen Rabatt in Prozent, Versandkosten und ein bereits bezahlter Betrag, falls dein Kunde eine Anzahlung geleistet hat.",
        "Wurde schon etwas bezahlt, zeigt die Rechnung neben dem Gesamtbetrag auch den offenen Betrag – so sieht dein Kunde genau, was noch zu zahlen ist.",
      ],
    },
    {
      heading: "Rechnungsnummern, die von selbst weiterzählen",
      body: [
        "Jede Rechnung braucht ihre eigene, fortlaufende Rechnungsnummer. Fang mit INV-0001 oder deinem eigenen Format an, zum Beispiel RE-2026-001. Wenn du auf Neue Rechnung klickst, zählt die Nummer um eins hoch und dein Präfix bleibt erhalten.",
        "Deine Firmendaten, dein Logo, die Währung, die Vorlage und der Steuersatz werden in die nächste Rechnung übernommen. So ist eine neue Rechnung in Sekunden erstellt.",
      ],
    },
    {
      heading: "Rechnung als PDF, ohne Wasserzeichen",
      body: [
        "Mit PDF herunterladen bekommst du ein scharfes, professionelles PDF mit deinem Logo, deinen Farben und allen Positionen in einer ordentlichen Tabelle. Der Text im PDF ist echter Text: Er bleibt beim Drucken scharf und lässt sich durchsuchen und kopieren.",
        "Es gibt kein Wasserzeichen und keinen „Erstellt mit“-Hinweis. Du kannst die Rechnung auch direkt aus dem Browser drucken.",
      ],
    },
    {
      heading: "Deine Daten bleiben auf deinem Gerät",
      body: [
        "Dieser Rechnungsgenerator läuft komplett in deinem Browser. Dein Name, die Daten deines Kunden und deine Preise werden nie zu ConvertLime oder sonst irgendwohin hochgeladen.",
        "Deine Rechnung wird in diesem Browser gespeichert. Du kannst die Seite also schließen und später genau dort weitermachen, wo du aufgehört hast.",
      ],
    },
  ],
  faqs: [
    {
      question: "Kann ich hier wirklich kostenlos eine Rechnung schreiben?",
      answer: "Ja. Du kannst so viele Rechnungen erstellen und herunterladen, wie du willst. Kein Konto, keine Testphase, kein Limit und kein Wasserzeichen.",
    },
    {
      question: "Muss ich mich anmelden?",
      answer: "Nein. Seite öffnen, Rechnung ausfüllen, herunterladen. Eine Registrierung gibt es nicht.",
    },
    {
      question: "Wie schreibe ich eine Rechnung?",
      answer:
        "Wähle eine Vorlage, tippe deine Daten und die deines Kunden ein, füge für jede Leistung eine Position mit Menge und Preis hinzu, ergänze bei Bedarf MwSt. oder Rabatt und klicke auf PDF herunterladen.",
    },
    {
      question: "Welche Rechnungsvorlagen gibt es?",
      answer:
        "Fünf: Klassisch, Studio, Mitternacht, Editorial und Kräftig. Jede übernimmt dein Logo und deine Farbe, und du kannst die Vorlage jederzeit wechseln.",
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
        "Zwanzig gängige Währungen, darunter Euro, US-Dollar, Pfund, Schweizer Franken, Rupie, Yen, Yuan, Won, Real und Peso. Die Rechnung startet in Euro und schreibt Beträge so, wie es für die gewählte Währung üblich ist.",
    },
    {
      question: "Wie füge ich die Mehrwertsteuer hinzu?",
      answer:
        "Trag den Steuersatz neben MwSt. bei den Summen ein, zum Beispiel 19. Er wird auf die Zwischensumme nach Rabatt angewendet, und Steuerbetrag und Gesamtbetrag aktualisieren sich sofort.",
    },
    {
      question: "Kann ich eine Rechnung nach dem Herunterladen noch ändern?",
      answer:
        "Ja. Die Rechnung bleibt nach dem Download in diesem Browser. Ändere, was du möchtest, und lade sie erneut herunter. Mit Neue Rechnung beginnst du die nächste.",
    },
  ],
};
