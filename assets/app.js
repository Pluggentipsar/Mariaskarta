/* ============================================================
   Mariaskarta — interaktivitet
   Inga ramverk, ingen build. Allt körs direkt i webbläsaren.
   ============================================================ */

(function () {
  "use strict";

  // ----------------------------------------------------------
  // 1. Initiera Mermaid (processkartan)
  // Mermaid laddas via CDN före app.js. Vi initialiserar
  // explicit och kör därefter run() för att rendera diagrammen.
  // ----------------------------------------------------------
  function initMermaid() {
    if (!window.mermaid) return;
    window.mermaid.initialize({
      startOnLoad: false,
      theme: "base",
      securityLevel: "loose",
      themeVariables: {
        primaryColor: "#1B4B7A",
        primaryTextColor: "#FFFFFF",
        primaryBorderColor: "#133657",
        lineColor: "#5A6072",
        secondaryColor: "#E27D60",
        tertiaryColor: "#F2B134",
        clusterBkg: "#F7F5F0",
        clusterBorder: "#D9D3C6",
        fontFamily: "Inter, -apple-system, sans-serif",
        fontSize: "14px"
      },
      flowchart: {
        curve: "basis",
        padding: 18,
        nodeSpacing: 45,
        rankSpacing: 60,
        htmlLabels: true,
        useMaxWidth: true
      }
    });
    try {
      window.mermaid.run({ querySelector: ".mermaid" });
    } catch (e) {
      console.warn("Mermaid run failed:", e);
    }
  }

  // ----------------------------------------------------------
  // 2. Mobilmeny toggle
  // ----------------------------------------------------------
  const navToggle = document.querySelector(".site-nav__toggle");
  const nav = document.querySelector(".site-nav");
  if (navToggle && nav) {
    navToggle.addEventListener("click", function () {
      nav.classList.toggle("is-open");
      const expanded = nav.classList.contains("is-open");
      navToggle.setAttribute("aria-expanded", expanded ? "true" : "false");
    });
    nav.addEventListener("click", function (e) {
      if (e.target.tagName === "A") nav.classList.remove("is-open");
    });
  }

  // ----------------------------------------------------------
  // 2b. Dropdown-meny i nav + auto-active baserat på sidan
  // ----------------------------------------------------------
  function setupDropdownNav() {
    // Identifiera aktuell sida
    const path = window.location.pathname;
    const fileName = (path.split("/").pop() || "index.html");
    const inMallarDir = path.includes("/mallar/");

    // Sätt aria-current på matchande nav-länk
    document.querySelectorAll(".site-nav a[href], .site-nav__menu a[href]").forEach(link => {
      const href = link.getAttribute("href");
      const linkFile = href.split("/").pop();
      const linkInMallar = href.includes("mallar/");
      // Matchning: samma filnamn OCH samma katalog-kontext
      if (linkFile === fileName && linkInMallar === inMallarDir) {
        link.setAttribute("aria-current", "page");
      }
    });

    // Markera dropdown-triggern som aktiv om aktuell sida ligger inom dess undermeny
    document.querySelectorAll(".site-nav__group").forEach(group => {
      const trigger = group.querySelector(".site-nav__trigger");
      const menu = group.querySelector(".site-nav__menu");
      if (!trigger || !menu) return;
      if (menu.querySelector('a[aria-current="page"]')) {
        trigger.classList.add("is-current-section");
      }
    });

    // Dropdown-toggle
    const triggers = document.querySelectorAll(".site-nav__trigger");
    triggers.forEach(trigger => {
      const menuId = trigger.getAttribute("aria-controls");
      const menu = document.getElementById(menuId);
      if (!menu) return;
      trigger.addEventListener("click", e => {
        e.stopPropagation();
        const isOpen = trigger.getAttribute("aria-expanded") === "true";
        // Stäng alla först
        triggers.forEach(t => {
          t.setAttribute("aria-expanded", "false");
          const m = document.getElementById(t.getAttribute("aria-controls"));
          if (m) m.hidden = true;
        });
        if (!isOpen) {
          trigger.setAttribute("aria-expanded", "true");
          menu.hidden = false;
        }
      });
    });

    // Stäng vid klick utanför
    document.addEventListener("click", e => {
      if (e.target.closest(".site-nav__menu") || e.target.closest(".site-nav__trigger")) return;
      triggers.forEach(t => {
        t.setAttribute("aria-expanded", "false");
        const m = document.getElementById(t.getAttribute("aria-controls"));
        if (m) m.hidden = true;
      });
    });

    // Stäng vid Esc
    document.addEventListener("keydown", e => {
      if (e.key !== "Escape") return;
      triggers.forEach(t => {
        if (t.getAttribute("aria-expanded") === "true") {
          t.setAttribute("aria-expanded", "false");
          const m = document.getElementById(t.getAttribute("aria-controls"));
          if (m) m.hidden = true;
          t.focus();
        }
      });
    });
  }

  // ----------------------------------------------------------
  // 3. Årshjulet
  // ----------------------------------------------------------
  const months = [
    {
      name: "Maj",
      short: "Maj",
      theme: "Planering",
      color: "#4A7C59",
      summary: "Planeringsstart för kommande läsår.",
      items: [
        "Strukturschema kring förutsägbarhet för barnen planeras.",
        "Välj projekt/tema som barngruppen ska bjudas in i (t.ex. sagor från Före Bornholm).",
        "Hela arbetslaget behöver inte delta i planeringen om det inte är möjligt."
      ]
    },
    {
      name: "Juni–Juli",
      short: "Sommar",
      theme: "Sommar",
      color: "#BFCBD9",
      summary: "Sommarperiod — ingen aktiv process.",
      items: [
        "Verksamheten anpassad för sommarperiod.",
        "Återstart i augusti enligt nedan."
      ]
    },
    {
      name: "Augusti",
      short: "Aug",
      theme: "Uppstart",
      color: "#1B4B7A",
      summary: "Arbetslaget går igenom strukturschemat.",
      items: [
        "Genomgång av strukturschema kring förutsägbarhet.",
        "Vilken stund, vad erbjuds barnen, stöd vid övergångar, vilka roller behövs i varje stund.",
        "Roller och ansvar i arbetslaget tydliggörs."
      ]
    },
    {
      name: "September",
      short: "Sep",
      theme: "Relationer",
      color: "#E27D60",
      summary: "Pedagogiska relationer i fokus.",
      items: [
        "Kontaktbarometern utförs i alla arbetslag.",
        "Närvaromönster kopplas till resultatet av barn med minus och nollor.",
        "Insatser planeras för de barn som behöver stärkta vuxenrelationer."
      ]
    },
    {
      name: "Oktober",
      short: "Okt",
      theme: "Uppföljning",
      color: "#1B4B7A",
      summary: "Arbetslaget följer upp strukturschemat.",
      items: [
        "Uppföljning av strukturschemat — förutsägbarhet.",
        "Vilken stund, vad erbjuds barnen, stöd vid övergångar, vilka roller behövs.",
        "Justeringar görs i SKA-dokumentationen."
      ]
    },
    {
      name: "November",
      short: "Nov",
      theme: "Relationer + utvärdering",
      color: "#E27D60",
      summary: "Kontaktbarometern + utvärdering av terminen.",
      items: [
        "Kontaktbarometern utförs i alla arbetslag.",
        "Uppföljning utifrån de insatser som planerats för barn med minus och nollor.",
        "Närvaromönster kopplas till resultatet.",
        "Nya insatser planeras.",
        "Utvärdering: struktur, dela barnen i grupper, förutsägbarhet i strukturschema, projekt/tema."
      ]
    },
    {
      name: "December",
      short: "Dec",
      theme: "Julplanering",
      color: "#F2B134",
      summary: "Julens specialstunder — håll i strukturen.",
      items: [
        "Vid julplanering: ställ de sju frågorna i varje stund.",
        "Följ barnens strukturschema.",
        "Byt bara innehållet i stunderna om ni ser behov av det."
      ]
    },
    {
      name: "Januari",
      short: "Jan",
      theme: "Förenklad pedagogisk avstämning",
      color: "#6B4E8C",
      summary: "Förenklad pedagogisk avstämning per arbetslag.",
      items: [
        "Välj stund som ska planeras eller följas upp. Arbetslaget dokumenterar i SKA.",
        "Vid behov: Isbergsmodellen. Rektor/bitr. rektor dokumenterar på papper.",
        "Arbetslaget skriver de behov som tydliggörs att gruppen har.",
        "Pröva den stund/situation som valts ut: ges svar på de sju frågorna?",
        "Frågor: Vad erbjuds barnen? Vad ska ni börja göra? Sluta göra?",
        "Tydliggör rollfördelning och vad som ska följas upp till nästa gång."
      ]
    },
    {
      name: "Februari",
      short: "Feb",
      theme: "Relationer",
      color: "#E27D60",
      summary: "Kontaktbarometern + närvaromönster.",
      items: [
        "Kontaktbarometern utförs i alla arbetslag.",
        "Närvaromönster kopplas till resultatet av barn med minus och nollor."
      ]
    },
    {
      name: "Mars",
      short: "Mar",
      theme: "Uppföljning",
      color: "#1B4B7A",
      summary: "Arbetslaget följer upp strukturschemat.",
      items: [
        "Uppföljning av strukturschema kring förutsägbarhet.",
        "Vilken stund, vad erbjuds barnen, stöd vid övergångar, vilka roller behövs.",
        "SKA uppdateras."
      ]
    },
    {
      name: "April",
      short: "Apr",
      theme: "Relationer + utvärdering",
      color: "#E27D60",
      summary: "Kontaktbarometern + årsutvärdering.",
      items: [
        "Kontaktbarometern utförs i alla arbetslag.",
        "Uppföljning utifrån de insatser som planerats för barn med minus och nollor.",
        "Närvaromönster kopplas till resultatet.",
        "Nya insatser planeras.",
        "Utvärdering: struktur, dela barnen i grupper."
      ]
    }
  ];

  // Förlängningsmånader för att fylla ringen jämnt
  // (vi har 11 poster ovan; för att få 12 segment lägger vi till "Juli" separat)
  // Justera så vi får 12 segment med tydliga rubriker:
  const wheelMonths = [
    months[0],                        // Maj
    { ...months[1], name: "Juni" },   // Juni
    { ...months[1], name: "Juli" },   // Juli
    months[2],                        // Aug
    months[3],                        // Sep
    months[4],                        // Okt
    months[5],                        // Nov
    months[6],                        // Dec
    months[7],                        // Jan
    months[8],                        // Feb
    months[9],                        // Mars
    months[10]                        // April
  ];

  function polarToCartesian(cx, cy, radius, angleDeg) {
    const rad = (angleDeg - 90) * Math.PI / 180;
    return { x: cx + radius * Math.cos(rad), y: cy + radius * Math.sin(rad) };
  }

  function describeArc(cx, cy, rOuter, rInner, startAngle, endAngle) {
    const outerStart = polarToCartesian(cx, cy, rOuter, endAngle);
    const outerEnd = polarToCartesian(cx, cy, rOuter, startAngle);
    const innerStart = polarToCartesian(cx, cy, rInner, startAngle);
    const innerEnd = polarToCartesian(cx, cy, rInner, endAngle);
    const largeArc = endAngle - startAngle <= 180 ? 0 : 1;
    return [
      "M", outerStart.x, outerStart.y,
      "A", rOuter, rOuter, 0, largeArc, 0, outerEnd.x, outerEnd.y,
      "L", innerStart.x, innerStart.y,
      "A", rInner, rInner, 0, largeArc, 1, innerEnd.x, innerEnd.y,
      "Z"
    ].join(" ");
  }

  function renderYearWheel() {
    const svg = document.getElementById("yearwheel-svg");
    if (!svg) return;

    const size = 600;
    const cx = size / 2;
    const cy = size / 2;
    const rOuter = 270;
    const rInner = 130;
    const labelRadius = (rOuter + rInner) / 2;

    svg.setAttribute("viewBox", `0 0 ${size} ${size}`);
    svg.setAttribute("role", "img");
    svg.setAttribute("aria-label", "Årshjul med Marias processaktiviteter månad för månad");

    const segCount = wheelMonths.length;
    const segAngle = 360 / segCount;

    let svgContent = "";

    // Bakomliggande cirkel
    svgContent += `<circle cx="${cx}" cy="${cy}" r="${rOuter + 4}" fill="#FFFFFF" stroke="#D9D3C6" stroke-width="1"/>`;

    wheelMonths.forEach((m, i) => {
      const startA = i * segAngle;
      const endA = (i + 1) * segAngle;
      const midA = startA + segAngle / 2;
      const path = describeArc(cx, cy, rOuter, rInner, startA, endA);
      const labelPos = polarToCartesian(cx, cy, labelRadius, midA);

      // Rotera etiketten så den lutar med ringen
      let textRotate = midA;
      if (midA > 90 && midA < 270) textRotate += 180; // vänd vid undre halvan

      svgContent += `
        <path class="month-segment" data-index="${i}"
              d="${path}"
              fill="${m.color}"
              fill-opacity="0.85"
              stroke="#FFFFFF"
              stroke-width="2"/>
        <text class="month-label"
              x="${labelPos.x}" y="${labelPos.y}"
              text-anchor="middle"
              dominant-baseline="middle"
              transform="rotate(${textRotate} ${labelPos.x} ${labelPos.y})">
          ${m.name}
        </text>`;
    });

    // Inre cirkel
    svgContent += `
      <circle cx="${cx}" cy="${cy}" r="${rInner - 6}" fill="#FFFFFF" stroke="#D9D3C6" stroke-width="1"/>
      <text class="center-label" x="${cx}" y="${cy - 18}" font-size="13" font-weight="600" fill="#E27D60" letter-spacing="2">
        ÅRSHJUL
      </text>
      <text class="center-label" x="${cx}" y="${cy + 6}" font-size="22" font-weight="700">
        Förskola
      </text>
      <text class="center-label" x="${cx}" y="${cy + 30}" font-size="12" fill="#5A6072">
        klicka på en månad
      </text>`;

    svg.innerHTML = svgContent;

    // Klick-handler
    svg.querySelectorAll(".month-segment").forEach(seg => {
      seg.addEventListener("click", function () {
        const idx = parseInt(this.getAttribute("data-index"), 10);
        showMonth(idx);
      });
      seg.addEventListener("keydown", function (e) {
        if (e.key === "Enter" || e.key === " ") {
          const idx = parseInt(this.getAttribute("data-index"), 10);
          showMonth(idx);
        }
      });
      seg.setAttribute("tabindex", "0");
      seg.setAttribute("role", "button");
    });

    // Default: visa Maj (start på året)
    showMonth(0);
  }

  function showMonth(idx) {
    const m = wheelMonths[idx];
    const target = document.getElementById("month-detail");
    if (!target || !m) return;

    target.innerHTML = `
      <div class="month-detail__theme" style="color:${m.color}">${m.theme}</div>
      <h3>${m.name}</h3>
      <p class="text-muted">${m.summary}</p>
      <ul>
        ${m.items.map(t => `<li>${t}</li>`).join("")}
      </ul>
    `;

    // Markera aktivt segment
    document.querySelectorAll("#yearwheel-svg .month-segment").forEach((el, i) => {
      el.classList.toggle("is-active", i === idx);
    });
  }

  // ----------------------------------------------------------
  // 4. Copy-knappar för prompts
  // ----------------------------------------------------------
  function setupCopyButtons() {
    document.querySelectorAll(".prompt__copy").forEach(btn => {
      btn.addEventListener("click", function () {
        const targetId = btn.getAttribute("data-target");
        const codeEl = document.getElementById(targetId);
        if (!codeEl) return;
        const text = codeEl.innerText;
        const setCopied = () => {
          btn.textContent = "Kopierat!";
          btn.classList.add("is-copied");
          setTimeout(() => {
            btn.textContent = "Kopiera prompt";
            btn.classList.remove("is-copied");
          }, 1800);
        };
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(text).then(setCopied).catch(() => {
            fallbackCopy(text); setCopied();
          });
        } else {
          fallbackCopy(text); setCopied();
        }
      });
    });
  }

  function fallbackCopy(text) {
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.style.position = "fixed";
    ta.style.opacity = "0";
    document.body.appendChild(ta);
    ta.select();
    try { document.execCommand("copy"); } catch (e) { /* swallow */ }
    document.body.removeChild(ta);
  }

  // ----------------------------------------------------------
  // 5. Boot
  // ----------------------------------------------------------
  function init() {
    setupDropdownNav();
    initMermaid();
    renderYearWheel();
    setupCopyButtons();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
