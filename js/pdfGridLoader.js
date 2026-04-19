// Get unit ID from URL
const unitId = new URLSearchParams(window.location.search).get("u");
const container = document.getElementById("pdfContainer");

// PDF Data
const pdfList = {
  "s1-analyse1": [
    { label: "Chp 1", file: "cour1.pdf" },
    { label: "Chp 2", file: "cour2.pdf" },
    { label: "Chp 3", file: "cour3.pdf" },
    { label: "TD1", file: "TD1.pdf" },
    { label: "TD2", file: "TD2.pdf" }],
  "s1-statistiques": [
    { label: "Chp 1", file: "Chp1.pdf" },
    { label: "Chp 2", file: "Chp2.pdf" },
    { label: "TD1", file: "TD1.pdf" },
    { label: "TD2", file: "TD2.pdf" }],
  "s1-algebre1": [
    { label: "chp 1", file: "chp1.pdf" },
    { label: "chp 2", file: "chp2.pdf" },
    { label: "chp 3", file: "chp3.pdf" },
    { label: "chp 4", file: "chp4.pdf" },
    { label: "TD1 24/25", file: "TD1.pdf" },
    { label: "TD2 24/25", file: "TD2.pdf" },
    { label: "TD 1.2.3 21/22", file: "TD1.2.3.pdf" }],
  "s1-algebre2": [
    { label: "chp 1", file: "chp1.pdf" },
    { label: "chp 2", file: "chp2.pdf" },
    { label: "TD1", file: "td.pdf" },
    { label: "TD2", file: "TD2.pdf" },
    { label: "TD3", file: "TD3.pdf" },],
  "s1-info1": [
    { label: "chp 1 et 2", file: "chp1et2.pdf" },
    { label: "chp 3", file: "chp3.pdf" },
    { label: "chp 4", file: "chp4.pdf" },
    { label: "TD", file: "TD1.pdf" },],
  "s1-thermo": [
    { label: "cours complet", file: "cours.pdf" },
    { label: "résumé", file: "résum.pdf" },
    { label: "TDS", file: "TDS.pdf" },],
  "s2-analyse2": [
    { label: "cours complet", file: "cours.pdf" },
    { label: "TD1", file: "TD1.pdf" },
    { label: "TD2", file: "TD2.pdf" },
    { label: "TD3", file: "TD3.pdf" },],
  "s2-analyse3": [
    { label: "cours complet", file: "cours.pdf" },
    { label: "TD", file: "TD.pdf" },
    { label: "DL usuels", file: "DL.pdf" },
  ],
  "s2-optique": [
    { label: "cours complet", file: "cours.pdf" },
    { label: "TDS", file: "TDS.pdf" },],
  "s2-electro": [
    { label: "cours complet", file: "cours.pdf" },
    { label: "TDS", file: "TDS.pdf" },],
  "s2-algebre3": [
    { label: "cours complet", file: "cours.pdf" },
    { label: "TD1", file: "TD1.pdf" },
    { label: "TD2", file: "TD2.pdf" },
    { label: "TD3", file: "TD3.pdf" },],
  "s2-info2": [
    { label: "cours complet", file: "cours.pdf" },
    { label: "TD1", file: "TD1.pdf" },
    { label: "TD2", file: "TD2.pdf" },
    { label: "TD3", file: "TD3.pdf" },
    { label: "TD4", file: "TD4.pdf" },],
  "s3-analyse4": [
    { label: "chp1", file: "chp1.pdf" },
    { label: "chp2", file: "chp2.pdf" },
    { label: "chp3", file: "chp3.pdf" },
    { label: "TD1", file: "TD1.pdf" },
    { label: "TD2", file: "TD2.pdf" },
    { label: "CORR TDS", file: "corr.pdf" },
    { label: "les séries entiers", file: "se.pdf" },
    { label: "séries de fourier", file: "sf.pdf" },],
  "s3-analyse5": [
    { label: "cours complet", file: "cours.pdf" },
    { label: "TDS", file: "TDS.pdf" },
    { label: "corr TDS", file: "corr.pdf" },],
  "s3-algebre4": [
    { label: "cours complet", file: "cours.pdf" },
    { label: "TDS/Corr 22/23", file: "TDS.pdf" },],
  "s3-sc": [
    { label: "cours complet", file: "sc.pdf" },
    { label: "résumé", file: "rsm.pdf" },],
  "s3-info3": [
    { label: "cours complet", file: "cours.pdf" },
    { label: "TD1", file: "TD1.pdf" },
    { label: "TD2", file: "TD2.pdf" },],
  "s3-mecanique": [
    { label: "mc point", file: "mp.pdf" },
    { label: "mc solide", file: "ms.pdf" },
    { label: "résumé mp", file: "rs.pdf" },
    { label: "TDS", file: "TDS.pdf" },
    { label: "corr TDS", file: "corr.pdf" },],
  "s4-analyse6": [
    { label: "cours complet", file: "cours.pdf" },
    { label: "TD1", file: "TD1.pdf" },
    { label: "TD2", file: "TD2.pdf" },
    { label: "CORR TDS", file: "corr.pdf" },
    { label: "CORR2 TDS", file: "corr2.pdf" },
    { label: "DSE", file: "DSE.pdf" },],
  "s4-numerique": [
    { label: "cours complet", file: "cours.pdf" },
    { label: "CORR TDS", file: "corr.pdf" },
    { label: "TDS", file: "TDS.pdf" },],
  "s4-dida": [
    { label: "cours complet", file: "cours.pdf" },
    { label: "cours complet 2", file: "cours2.pdf" },],
  "s4-proba": [
    { label: "cours complet", file: "cours.pdf" },
    { label: "TD1", file: "TD1.pdf" },
    { label: "TD2", file: "TD2.pdf" },
    { label: "CORR TDS", file: "corr.pdf" },
    { label: "Tableau", file: "Tab.pdf" },],
  "s4-algebre5": [
    { label: "cours", file: "cours.pdf" },
    { label: "cours complet 2", file: "cours2526.pdf" },
    { label: "TD1", file: "TD1.pdf" },
    { label: "TD2", file: "TD2.pdf" },],
  "s4-info4": [
    { label: "cours complet", file: "cours.pdf" },
    { label: "TD1", file: "TD1.pdf" },
    { label: "TD2", file: "TD2.pdf" },],
  "s5-topologie": [
    { label: "cours complet", file: "cours.pdf" },
    { label: "Espaces Métriques", file: "EM.pdf" },
    { label: "TDS/corr", file: "TDS.pdf" },
    { label: "Démos", file: "demo.pdf" },],
  "s5-mesure": [
    { label: "cours complet", file: "cours.pdf" },
    { label: "TDS/Corr", file: "TDS.pdf" },
    { label: "Démos", file: "demo.pdf" },],
  "s5-algebrique": [
    { label: "démos", file: "Démos.pdf" },
    { label: "cours complet", file: "cours.pdf" },],

  "s5-diontologie": [
    { label: "cours complet", file: "cours.pdf" },],
  "s5-didactique": [
    { label: "cours complet", file: "cours.pdf" },],

  "s6-epi": [
    { label: "cours complet", file: "cours.pdf" },],
  "s6-methodes": [
    { label: "cours complet", file: "cours.pdf" },],
  "s6-diff": [
    { label: "cours", file: "cours.pdf" },
    { label: "cours2 (complet) ", file: "cours2.pdf" },
    { label: "TDS/CORR", file: "TDS.pdf" },],
  "s6-complexe": [
    { label: "Analyse complexe : Cours", file: "cours Mr Lamarti Sefian Mohammed.pdf" },
    { label: "cours (autre)", file: "cours (autre).pdf" },
    { label: "cours complet (autre)", file: "complet (autre).pdf" },
    { label: "Démos", file: "demo.pdf" },],
  "s6-geo": [
    { label: "cours complet", file: "cours.pdf" },
    { label: "Démos", file: "demo.pdf" },
    { label: "TDS/CORR", file: "TDS.pdf" },],
  "e1": [
    { label: "EX SN 25/26", file: "SN26.pdf" },
    { label: "EX 24/25", file: "1.pdf" },
    { label: "EX 23/24", file: "2.pdf" },
    { label: "EX 21/22", file: "4.pdf" },],
  "e2": [
    { label: "EX 23/24", file: "2.pdf" },
    { label: "EX SN 24/25", file: "SN 2425 s2.pdf" },
    { label: "EX 21/22", file: "4.pdf" },],
  "e3": [
    { label: "EX SN 25/26", file: "SN S3 26.pdf" },
    { label: "EX SR 25/26", file: "SR 26 S3.pdf" },
    { label: "EX 24/25", file: "1.pdf" },
    { label: "EX 22/23", file: "2.pdf" },
    { label: "EX 23/24", file: "3.pdf" },],
  "e4": [
    { label: "EX 24/25", file: "1.pdf" },
    { label: "EX 22/23", file: "2.pdf" },
    { label: "EX 23/24", file: "3.pdf" },],
  "e5": [
    { label: "EX SN 25/26", file: "SN26.pdf" },
    { label: "EX SR 25/26", file: "SR 26 S5.pdf" },
    { label: "EX SN 24/25", file: "1.pdf" },
    { label: "EX SR 24/25", file: "SR25.pdf" },
    { label: "EX 23/24", file: "2.pdf" },
    { label: "EX 22/23", file: "3.pdf" },],
  "e6": [{ label: "EX 24/25", file: "1.pdf" },
  { label: "EX 23/24", file: "2.pdf" },
  { label: "EX 22/23", file: "3.pdf" },],
  "24": [
    { label: "MATHS", file: "M24.pdf" },],
  "23": [
    { label: "MATHS", file: "M23.pdf" },
    { label: "didactique", file: "S23.pdf" },],
  "22": [
    { label: "MATHS", file: "M22.pdf" },
    { label: "didactique", file: "D22.pdf" },],
  "21": [
    { label: "MATHS", file: "M21.pdf" },
    { label: "didactique", file: "D21.pdf" },
    { label: "CORR MATHS", file: "MC21.pdf" },],
  "20": [
    { label: "MATHS DIDACTIQUE", file: "MD20.pdf" },
    { label: "CORR MATHS", file: "MC20.pdf" },],
  "19": [
    { label: "MATHS DIDACTIQUE", file: "MD19.pdf" },
    { label: "CORR MATHS", file: "MC19.pdf" },],
  "18": [
    { label: "MATHS DIDACTIQUE", file: "MD18.pdf" },
    { label: "CORR MATHS", file: "MC18.pdf" },],
  "17": [
    { label: "MATHS DIDACTIQUE", file: "MD17.pdf" },
    { label: "CORR MATHS", file: "MC17.pdf" },],
  "16": [
    { label: "DIDACTIQUE sc", file: "D16.pdf" },],
};

// Render Logic
const renderPDFs = (filter) => {
  container.innerHTML = '';

  if (unitId && pdfList[unitId]) {
    const docs = pdfList[unitId];

    docs.forEach(doc => {
      const label = doc.label.toLowerCase();
      let type = "all";
      if (label.includes("cours") || label.includes("chp") || label.includes("rsm") || label.includes("résum") || label.includes("démo") || label.includes("dl") || label.includes("sc") || label.includes("mp") || label.includes("ms")) type = "cours";
      else if (label.includes("td")) type = "td";
      else if (label.includes("ex ") || unitId.startsWith('e') || !isNaN(unitId) || label.includes("sn") || label.includes("sr") || label.includes("maths") || label.includes("didactique")) type = "examen";
      else type = "cours";

      if (filter !== "all" && type !== filter) return;

      const path = `assets/pdfs/${unitId}/${doc.file}`;

      const card = document.createElement("div");
      card.className = "card pdf-card";

      const icon = document.createElement("div");
      icon.className = "pdf-icon";
      icon.textContent = "📄";

      const title = document.createElement("h3");
      title.textContent = doc.label;

      const actions = document.createElement("div");
      actions.className = "pdf-actions";

      const viewBtn = document.createElement("button");
      viewBtn.className = "btn-small btn-view";
      viewBtn.textContent = "Voir";
      viewBtn.onclick = () => openPdf(path);

      const downloadBtn = document.createElement("a");
      downloadBtn.className = "btn-small btn-download";
      downloadBtn.textContent = "Télécharger";
      downloadBtn.href = path;
      downloadBtn.setAttribute("download", doc.file);

      actions.appendChild(viewBtn);
      actions.appendChild(downloadBtn);

      card.appendChild(icon);
      card.appendChild(title);
      card.appendChild(actions);

      container.appendChild(card);
    });

    if (container.children.length === 0) {
      container.innerHTML = `<div style="grid-column: 1/-1; text-align: center; margin-top: 2rem; color: var(--text-muted);"><p>Aucun document trouvé pour ce type.</p></div>`;
    }
  } else {
    container.innerHTML = `
        <div style="grid-column: 1/-1; text-align: center;">
          <p style="color:red; font-size: 1.2rem;">📂 Aucun document trouvé pour cette unité.</p>
          <p><a href="semestres.html" class="btn-secondary">Retour aux semestres</a></p>
        </div>
    `;
  }
};

renderPDFs("all");

// Filter buttons
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', (e) => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    e.target.classList.add('active');
    renderPDFs(e.target.getAttribute('data-filter'));
  });
});

// Modal Functions (Global)
window.openPdf = function (path) {
  // Mobile detection
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  if (isMobile) {
    // Open in new tab on mobile to avoid blocking issues
    window.open(path, '_blank');
  } else {
    // Desktop modal
    const modal = document.getElementById('pdfModal');
    const viewer = document.getElementById('pdfViewer');
    if (modal && viewer) {
      viewer.contentWindow.location.replace(new URL(path, window.location.href).href);
      modal.classList.add('active');
    }
  }
};

window.closePdf = function () {
  const modal = document.getElementById('pdfModal');
  const viewer = document.getElementById('pdfViewer');
  if (modal && viewer) {
    viewer.contentWindow.location.replace('about:blank');
    modal.classList.remove('active');
  }
};

// Close modal when clicking outside
document.addEventListener('click', (e) => {
  const modal = document.getElementById('pdfModal');
  if (modal && e.target === modal) {
    window.closePdf();
  }
});
