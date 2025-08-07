// نحصل على اسم الوحدة من رابط الصفحة (مثلاً: ?u=s1-analyse1)
const unitId = new URLSearchParams(window.location.search).get("u");
const container = document.getElementById("pdfContainer");

// 🗂️ هنا نُحدد الملفات لكل وحدة
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
     { label: "TD1", file: "TD1.pdf" },
    { label: "TD2", file: "TD2.pdf" },
    { label: "TD3", file: "TD3.pdf" },],
    "s1-info1": [
    { label: "chp 1 et 2", file: "chp1et2.pdf" },
     { label: "chp 3", file: "chp3.pdf" },
    { label: "chp 4", file: "chp4.pdf" },
     { label: "TD", file: "TD1.pdf" },],
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
    { label: "les séries entiers", file: "se.pdf" },
    { label: "séries de fourier", file: "sf.pdf" },],
    "s3-analyse5": [
    { label: "cours complet", file: "cours.pdf" },
     { label: "TDS", file: "TDS.pdf" },
    { label: "corre", file: "corr.pdf" },],
    "s3-algebre4": [
    { label: "cours complet", file: "cours.pdf" },
     { label: "TDS/Corr 22/23", file: "TDS.pdf" },],
"s3-info3": [
    { label: "cours complet", file: "cours.pdf" },
     { label: "TD1", file: "TD1.pdf" },
    { label: "TD2", file: "TD2.pdf" },],
 "s4-analyse6": [
    { label: "cours complet", file: "cours.pdf" },
     { label: "TD1", file: "TD1.pdf" },
      { label: "TD2", file: "TD2.pdf" },
     { label: "DSE", file: "DSE.pdf" },],
 "s4-numerique": [
    { label: "cours complet", file: "cours.pdf" },
     { label: "TDS", file: "TDS.pdf" },],
"s4-proba": [
    { label: "cours complet", file: "cours.pdf" },
     { label: "TD1", file: "TD1.pdf" },
      { label: "TD2", file: "TD2.pdf" },
     {label: "Tableau", file: "Tab.pdf" },],
"s4-algebre5": [
    { label: "cours complet", file: "cours.pdf" },
      { label: "TD1", file: "TD1.pdf" },
          { label: "TD2", file: "TD2.pdf" },],
    "s4-info4": [
    { label: "cours complet", file: "cours.pdf" },
     { label: "TD1", file: "TD1.pdf" },
      { label: "TD2", file: "TD2.pdf" },],
"s5-topologie": [
    { label: "cours complet", file: "cours.pdf" },
     { label: "TDS/corr", file: "TDS.pdf" },
      { label: "Démos", file: "demo.pdf" },],
    "s5-mesure": [
    { label: "cours complet", file: "cours.pdf" },
     { label: "TDS/Corr", file: "TDS.pdf" },
      { label: "Démos", file: "demo.pdf" },],
    "s5-algebrique": [
    { label: "cours complet", file: "cours.pdf" },],
    "s5-didactique": [
    { label: "cours complet", file: "cours.pdf" },],
    "s5-dion": [
    { label: "cours complet", file: "cours.pdf" },],
    
"s6-epi": [
    { label: "cours complet", file: "cours.pdf" },],
"s6-methodes": [
    { label: "cours complet", file: "cours.pdf" },],
 "s6-diff": [
    { label: "cours complet", file: "cours.pdf" },
     { label: "TDS/CORR", file: "TDS.pdf" },],
"s6-complexe": [
    { label: "cours complet", file: "cours.pdf" },
     { label: "Démos", file: "demo.pdf" },],
"s6-geo": [
    { label: "cours complet", file: "cours.pdf" },
     { label: "Démos", file: "demo.pdf" },
      { label: "TDS/CORR", file: "TDS.pdf" },],
"e1": [
    { label: "EX 23/24", file: "2.pdf" },
  { label: "EX 21/22", file: "4.pdf" },],
"e2": [
    { label: "EX 23/24", file: "2.pdf" },
  { label: "EX 21/22", file: "4.pdf" },],
"e3": [
    { label: "EX 24/25", file: "1.pdf" },
     { label: "EX 22/23", file: "2.pdf" },
   { label: "EX 23/24", file: "3.pdf" },],
"e4": [
    { label: "EX 24/25", file: "1.pdf" },
     { label: "EX 22/23", file: "2.pdf" },
     { label: "EX 23/24", file: "3.pdf" },],
"e5": [
    { label: "EX 24/25", file: "1.pdf" },
     { label: "EX 23/24", file: "2.pdf" },
    { label: "EX 22/23", file: "3.pdf" },],
"e6": [ { label: "EX 24/25", file: "1.pdf" },
    { label: "EX 23/24", file: "2.pdf" },
     { label: "EX 22/23", file: "3.pdf" },],

};

// نتحقق هل توجد ملفات لهذه الوحدة
if (unitId && pdfList[unitId]) {
  pdfList[unitId].forEach(doc => {
    const path = `assets/pdfs/${unitId}/${doc.file}`;

    const box = document.createElement("div");
    box.className = "pdf-box";

    const icon = document.createElement("div");
    icon.className = "icon-box";
    icon.textContent = doc.label;

    const viewBtn = document.createElement("button");
    viewBtn.className = "btn-view";
    viewBtn.textContent = " Voir";
    viewBtn.onclick = () => openPdf(path);

    const downloadBtn = document.createElement("a");
    downloadBtn.className = "btn-download";
    downloadBtn.textContent = "Télécharger";
    downloadBtn.href = path;
    downloadBtn.setAttribute("download", doc.file);

    box.appendChild(icon);
     box.appendChild(viewBtn);
    box.appendChild(downloadBtn);
    container.appendChild(box);
  });
} else {
  container.innerHTML = "<p style='color:red; text-align:center;'>📂 Aucun document trouvé pour cette unité.</p>";
}
