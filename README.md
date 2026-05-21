# Mariaskarta

Ett digitalt navigationsverktyg för **biträdande förskolechef Maria Blixt Ekström** — en interaktiv processkarta, ett årshjul, en kommunikationsplan och en samling färdiga AI-promptar för likvärdig och inkluderande utbildning i förskolan.

> **Vision:** Alla barn ska känna tilltro till sin förmåga som en lärande individ.

## Vad är det här?

Maria skickade ett mail där hon kämpade med att tydliggöra processen för stöd till arbetslag på olika nivåer i styrkedjan — barngrupp → arbetslag → specialpedagog/rektor → förvaltning. Hennes anteckningar var rika men ostrukturerade. Mariaskarta är ett försök att göra hennes vision konkret, delningsbar, utskrivbar och presenterbar.

Sajten innehåller:

1. **Processkartan** — En visuell flowchart i Mermaid med fyra nivåer i styrkedjan, plus förvaltningens stödfunktioner och kollegialt lärande som horisontella linjer.
2. **Årshjulet** — Ett interaktivt SVG-årshjul med konkreta insatser månad för månad (Kontaktbarometern, strukturschema, pedagogisk avstämning, utvärdering).
3. **Kommunikationsplan** — Kotters 8 steg som strategisk grund, ADKAR-modellen som budskap till varje rektor, plus förslag på svar till troliga invändningar.
4. **Pedagogisk verktygslåda** — Tolv begrepp och ramverk med korta förklaringar och länkar till primärkällor (Lpfö 18 rev 2025, SPSM, David Edfelt, NÖHRA, Isbergsmodellen, Före Bornholm m.fl.).
5. **AI-promptar** — Fem färdiga prompts på svenska, inklusive en återanvändbar system-prompt för en Claude Project / Custom GPT specialiserad på svensk förskolepedagogik.
6. **Källor** — Komplett referensförteckning med alla länkar verifierbara.

## Hur används den?

### Som webbsida
Öppna `index.html` i en webbläsare. Allt är statiskt — ingen server, inga beroenden utöver Mermaid.js (via CDN). Fungerar offline efter första besöket om man cachear sidan.

### Som utskrift
Tryck **Ctrl+P / Cmd+P** i webbläsaren och välj "Spara som PDF". Sidan har en utskriftsoptimerad stylesheet som tar bort navigation och justerar paginering för A4. Kan användas som handout till rektorer eller delas i Teams.

### Som mall för vidareutveckling
Filerna är tre stycken: `index.html`, `assets/styles.css`, `assets/app.js`. Allt innehåll bor i HTML. För att ändra ett månadsinnehåll i årshjulet — redigera `months`-arrayen överst i `app.js`. För att ändra processkartan — redigera Mermaid-koden i `#processkarta`-sektionen i `index.html`.

### Som källa för AI-assistent
Använd prompt #5 i sektionen "AI-promptar" för att sätta upp en återanvändbar Claude Project eller Custom GPT som är "påläst" på svensk förskolepedagogik. Ladda upp Lpfö 18 + kommunens egna riktlinjer som projektfiler.

## Deployment

### GitHub Pages (rekommenderat)
1. Pusha repot till GitHub.
2. Repository Settings → Pages → Source: `main` branch, root `/`.
3. Sajten är live på `https://<användare>.github.io/<repo>` inom någon minut.

### Netlify / Vercel / Cloudflare Pages
Dra och släpp mappen till respektive plattforms gränssnitt. Ingen byggprocess behövs.

### Lokalt
```bash
# Med Python:
python3 -m http.server 8080

# Med Node:
npx serve .
```

Öppna `http://localhost:8080`.

## Tekniska val (för den som vill veta)

| Val | Varför |
|---|---|
| **Statisk HTML/CSS/JS** | Ingen build-process. Maria (eller en kollega) kan redigera direkt i en texteditor utan kunskap om npm, webpack, React. |
| **Mermaid.js** | Bästa lågtröskelvalet för processkartor. Textbaserad syntax (lätt att versionera). Renderas client-side. |
| **Custom SVG för årshjulet** | Inget moget årshjuls-bibliotek finns. ~150 rader vanilla JS räcker, och SVG skalar perfekt för utskrift. |
| **Inter + Source Serif Pro** | Lugn, professionell typografi som ser hemma ut i kommunalt sammanhang. |
| **Skolverket-inspirerad palett** | Djupblå primärfärg + varm accent, tillgängliga kontraster, dämpat. |
| **Inga ramverk** | Ingen React, ingen Vue. Långtidshållbart utan dependency-skuld. |

## Begrepp som processkartan referenser

- **Lpfö 18 rev 2025** — Läroplan för förskolan, gäller från 1 juli 2025
- **SKA** — Systematiskt kvalitetsarbete (Skolverkets fyra faser)
- **SPSM:s tillgänglighetsmodell** — Pedagogisk, social, fysisk lärmiljö
- **De sju frågorna** — Tydliggörande pedagogik: Vad? Var? När? Hur? Med vem? Hur länge? Varför?
- **Kontaktbarometern** — Veckorutin för att kartlägga pedagog-barn-relationer
- **NÖHRA-modellen** — Nuläge, Önskat läge, Hinder, Resurser, Aktiviteter
- **Isbergsmodellen** — Anna Hellberg Björklund, för perspektivskifte i pedagogisk avstämning
- **Före Bornholm** — Görel Sterner & Ingvar Lundberg, språkutvecklande material
- **En förskola för var och en** — David Edfelts åtta moduler
- **Kotters 8 steg + ADKAR** — Förändringsledning

Se sektionen "Verktygslåda" i sajten för fullständiga referenser och källor.

## Licens

Fri att använda, modifiera och vidareutveckla inom svensk kommunal verksamhet. Källkoden är offentlig (MIT-licensanda). Pedagogiska referenser och citat ligger hos sina respektive upphovsmän — kontrollera deras licensvillkor innan kommersiell användning.
