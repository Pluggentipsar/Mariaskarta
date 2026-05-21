# Mariaskarta

Ett digitalt navigationsverktyg för **biträdande förskolechef Maria Blixt Ekström** — interaktiv processkarta, årshjul, kommunikationsplan, mallar och AI-stöd för likvärdig och inkluderande utbildning i förskolan.

> **Vision:** Alla barn ska känna tilltro till sin förmåga som en lärande individ.

## Struktur

Sajten är en statisk multi-page-app utan byggprocess. En tight landningssida som dirigerar vidare till åtta fokuserade subpages.

```
/
├── index.html              Landningssida — aha-bild + "jag vill..."-kort
├── karta.html              Den centrala processkartan (Mermaid)
├── berattelse.html         Solrosens år — berättelsen som knyter ihop
├── arshjul.html            Interaktivt årshjul
├── kommunikation.html      Kotters 8 steg + ADKAR-modellen
├── verktyg.html            Pedagogisk verktygslåda (12 begrepp)
├── promptar.html           AI-promptar för Claude / ChatGPT
├── kallor.html             Verifierbar referensförteckning
│
├── mallar/                 Utskrivbara A4-mallar (subdomän)
│   ├── index.html
│   ├── pedagogisk-avstamning.html
│   ├── isbergsmodellen.html
│   ├── kontaktbarometer.html
│   └── nohra-samtal.html
│
├── assets/
│   ├── styles.css          Huvudstilar
│   ├── mall.css            Mallspecifika stilar (A4 print)
│   ├── app.js              Mermaid-init + årshjul-SVG + copy-knappar
│   └── mermaid.min.js      Vendat lokalt för offline-stöd
│
└── till-maria.md           Färdig mailmall till Maria
```

## UX-principer

Varje subpage följer samma mönster:

1. **Sticky toppnav** — samma på alla sidor, aktiv sida markerad med `aria-current="page"`.
2. **Breadcrumb** — "Hem › Sektion" så användaren alltid vet var hen är.
3. **Page hero** — kort titel + ledtext.
4. **Purpose strip** — en rad: "Använd när …" — tydliggör syftet.
5. **Innehåll** — fokuserat på en uppgift.
6. **Pager** — föregående/nästa knappar för linjär läsning.
7. **Footer** — samma kategoristruktur överallt.

Landningssidan har dessutom **"Vad vill du göra idag?"-kort** som dirigerar till rätt subpage utifrån användarens jobb (inte utifrån innehållstyp).

## Centrala visualiseringar

- **Aha-bilden** (på landningen): koncentriskt SVG-diagram med barnet i centrum, arbetslaget runt om, sp/rektor i tredje ringen, förvaltningen ytterst. Året som rytm runt allt.
- **Processkartan** (`/karta.html`): Mermaid-flowchart med klickbara noder som hoppar till rätt mall.
- **Årshjulet** (`/arshjul.html`): interaktiv SVG där varje månad är klickbar.
- **Berättelsen** (`/berattelse.html`): 9 scenkort i horisontell tidslinje som följer arbetslaget Solrosen genom ett år.

## Användning

### Som webbsida
Öppna `index.html` i en webbläsare. Ingen server behövs.

### Som utskrift
Tryck **Ctrl+P / Cmd+P** på vilken sida som helst. Varje sida har egen utskriftsoptimerad stylesheet.

### Som mall för vidareutveckling
Allt innehåll är i HTML-filer som kan redigeras direkt i en texteditor. Inga build-steg, inga dependencies att underhålla.

### Deployment
- **GitHub Pages**: aktivera i Settings → Pages, peka mot `main` root `/`. Sajten live på `https://<owner>.github.io/<repo>/` inom någon minut.
- **Netlify/Vercel**: dra-och-släpp mappen.

## Tekniska val

| Val | Varför |
|---|---|
| Multi-page (statisk HTML) | Varje sida har ett syfte. Delbar URL per ämne. Skriver ut en sida i taget. |
| Inga ramverk | Ingen React, ingen build. Långtidshållbart. |
| Mermaid vendat lokalt | Funkar offline + på sandboxade nätverk. |
| Inter + Source Serif Pro | Lugn typografi som passar svensk kommunal kontext. |
| Skolverket-inspirerad palett | Djupblå primär, varm accent, dämpat. |

## Pedagogiska källor

Verifierbar referensförteckning på `/kallor.html`. Inkluderar Lpfö 18 rev 2025, SPSM:s tillgänglighetsmodell, David Edfelt, NÖHRA, Isbergsmodellen, Eidevalds rapport "Rätt start i livet", Kotter, ADKAR och mer.

## Licens

Fri att använda, modifiera och vidareutveckla inom svensk kommunal verksamhet. Källkoden är MIT (se `LICENSE`). Pedagogiska referenser ligger hos sina respektive upphovsmän.
