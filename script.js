/* =========================
   🌍 TRADUCCIONES
========================= */

const translations = {
  es: {
    title: "ARMA TU POWER RANKING",
    placeholder: "TU NOMBRE",
    preview: "PREVIEW",
    download: "Descargar imagen",
    share: "Descargar y Compartir en X",
    discord: "Unirse al Discord",
    tweet: (t) => `Mis Power Rankings del ${t} 🚀 @RocketStreet`
  },
  en: {
    title: "BUILD YOUR POWER RANKING",
    placeholder: "YOUR NAME",
    preview: "PREVIEW",
    download: "Download image",
    share: "Download & Share on X",
    discord: "Join Discord",
    tweet: (t) => `My Power Rankings for ${t} 🚀 @RocketStreet`
  }
};

/* =========================
   🌐 IDIOMA (AUTO + GUARDADO)
========================= */

const savedLang = localStorage.getItem("lang");
const browserLang = navigator.language.toLowerCase();
let lang = savedLang || (browserLang.startsWith("es") ? "es" : "en");

/* =========================
   DATA ORIGINAL + REGIONES
========================= */

const teamsSAM = [
  { name:"FURIA", logo:"logos/furia.png" },
  { name:"MIBR", logo:"logos/mibr.png" },
  { name:"TEAM SECRET", logo:"logos/secret.png" },
  { name:"BS+COMPETITION", logo:"logos/bs.png" },
  { name:"NUTORIOUS", logo:"logos/nutorious.png" },
  { name:"NOVADRIFT", logo:"logos/rocket.png" },
  { name:"DREAM ESPORTS", logo:"logos/dream.png" },
  { name:"BIGODES", logo:"logos/rocket.png" },
  { name:"NOVA LEGION", logo:"logos/rocket.png" },
  { name:"SANGRES", logo:"logos/rocket.png" },
  { name:"NO FEAR", logo:"logos/nofear.png" },
  { name:"MOCKIT APES", logo:"logos/rocket.png" },
  { name:"25 SHOT CLUB", logo:"logos/25shot.png" },
  { name:"ENOSIS ESPORTS", logo:"logos/enosis.png" },
  { name:"O ESFORÇO FC 2", logo:"logos/rocket.png" },
  { name:"21909120", logo:"logos/rocket.png" }
];

const teamsEU = [
  { name:"TEAM VITALITY", logo:"logos/vitality.png" },
  { name:"NINJAS IN PYJAMAS", logo:"logos/nip.png" },
  { name:"MANCHESTER CITY ESPORTS", logo:"logos/city.png" },
  { name:"KARMINE CORP", logo:"logos/kc.png" },
  { name:"TOAD IN THE HOLE", logo:"logos/rocket.png" },
  { name:"SYNERGY", logo:"logos/synergy.png" },
  { name:"KAYDOP CORP", logo:"logos/rocket.png" },
  { name:"GENTLE MATES", logo:"logos/m8.png" },
  { name:"WIP ESPORTS", logo:"logos/wip.png" },
  { name:"GRIDDYGOOSE", logo:"logos/griddy.png" },
  { name:"ERAH ESPORT", logo:"logos/erah.png" },
  { name:"GEEKAY ESPORTS", logo:"logos/geekay.png" },
  { name:"GHT", logo:"logos/rocket.png" },
  { name:"PCS STRIDE", logo:"logos/pcs.png" },
  { name:"KALOGERAS", logo:"logos/rocket.png" },
  { name:"MAGNIFICO", logo:"logos/magnifico.png" }
];

/* =========================
   ESTADO
========================= */

let currentTeams = [...teamsSAM];
let currentTournament = "SAM OPEN 5";

/* =========================
   DOM
========================= */

const teamsUl = document.getElementById("teams");
const samBtn = document.getElementById("samBtn");
const meuBtn = document.getElementById("euBtn");

const langEsBtn = document.getElementById("langEs");
const langEnBtn = document.getElementById("langEn");

/* =========================
   🌍 APLICAR IDIOMA
========================= */

function applyTranslations(){
  const t = translations[lang];

  document.querySelector(".section-title").textContent = t.title;
  document.getElementById("personName").placeholder = t.placeholder;
  document.querySelector(".preview-box h3").textContent = t.preview;
  document.getElementById("downloadBtn").textContent = t.download;
  document.getElementById("shareBtn").textContent = t.share;
  document.querySelector(".discord").textContent = t.discord;

  langEsBtn.classList.toggle("active", lang === "es");
  langEnBtn.classList.toggle("active", lang === "en");
}

/* =========================
   CAMBIAR IDIOMA
========================= */

function setLanguage(newLang){
  lang = newLang;
  localStorage.setItem("lang", newLang);
  applyTranslations();
}

langEsBtn.addEventListener("click", ()=> setLanguage("es"));
langEnBtn.addEventListener("click", ()=> setLanguage("en"));

/* =========================
   RENDER ORIGINAL
========================= */

function renderTeams() {
  teamsUl.innerHTML = "";

  currentTeams.forEach((team, index) => {
    const li = document.createElement("li");

    li.innerHTML = `
      <span class="position">#${index+1}</span>
      <div class="logo-box"><img src="${team.logo}"></div>
      <span class="team-name">${team.name}</span>
    `;

    teamsUl.appendChild(li);
  });
}

renderTeams();

/* =========================
   SORTABLE ORIGINAL
========================= */

new Sortable(teamsUl, {
  animation: 150,
  onEnd: () => {
    updatePositions();
    generateImage();
  }
});

function updatePositions(){
  document.querySelectorAll("#teams li").forEach((item, i) => {
    item.querySelector(".position").textContent = `#${i+1}`;
  });
}

/* =========================
   SWITCH REGION
========================= */

function switchRegion(region){
  if(region === "SAM"){
    currentTeams = [...teamsSAM];
    currentTournament = "SAM OPEN 5";

    samBtn.classList.add("active");
    euBtn.classList.remove("active");
  } else {
    currentTeams = [...teamsEU];
    currentTournament = "EU OPEN 5";

    menaBtn.classList.add("active");
    naBtn.classList.remove("active");
  }

  renderTeams();
  generateImage();
}

naBtn.addEventListener("click", () => switchRegion("SAM"));
menaBtn.addEventListener("click", () => switchRegion("EU"));

/* =========================
   CANVAS ORIGINAL
========================= */

const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");

canvas.width = 1080;
canvas.height = 1350;

function loadImage(src) {
  return new Promise(resolve=>{
    const img = new Image();
    img.onload = ()=> resolve(img);
    img.src = src;
  });
}

async function generateImage() {
  ctx.clearRect(0,0,canvas.width,canvas.height);

  const bg = await loadImage("background.png");
  ctx.drawImage(bg,0,0,canvas.width,canvas.height);

  let name = document.getElementById("personName").value.slice(0,25);

  if(name){
    ctx.fillStyle="#ff5419";
    ctx.textAlign="center";
    ctx.font="bold 60px BourgeoisBold";
    ctx.fillText(name.toUpperCase(),538,255);
  }

  const teams = document.querySelectorAll("#teams li");

  let startY = 335;
  const spacing = 65;

  for(let i=0;i<teams.length;i++){
    const teamName = teams[i].querySelector(".team-name").textContent;
    const logoSrc = teams[i].querySelector("img").src;

    const logo = await loadImage(logoSrc);

    const size = 45;

    const ratio = Math.min(size / logo.width, size / logo.height);
    const newWidth = logo.width * ratio;
    const newHeight = logo.height * ratio;

    const offsetX = 210 + (size - newWidth) / 2;
    const offsetY = (startY - 35) + (size - newHeight) / 2;

    ctx.drawImage(logo, offsetX, offsetY, newWidth, newHeight);

    ctx.fillStyle="white";
    ctx.textAlign="left";
    ctx.font="bold 36px BourgeoisBold";
    ctx.fillText(teamName.toUpperCase(),300,startY);

    startY += spacing;
  }

  document.getElementById("previewImage").src = canvas.toDataURL("image/png");
}

/* =========================
   INPUT ORIGINAL
========================= */

document.getElementById("personName").addEventListener("input", function(){
  const counter = document.getElementById("charCounter");

  counter.textContent = `${this.value.length} / 25`;

  if(this.value.length >= 25){
    counter.classList.add("limit");
    this.classList.add("limit");
  } else {
    counter.classList.remove("limit");
    this.classList.remove("limit");
  }

  generateImage();
});

/* =========================
   DOWNLOAD ORIGINAL
========================= */

document.getElementById("downloadBtn").addEventListener("click",()=>{
  const imageData = canvas.toDataURL("image/png");

  const link = document.createElement("a");
  link.download = "rocket-street-power-ranking.png";
  link.href = imageData;
  link.click();
});

/* =========================
   SHARE DINÁMICO
========================= */

document.getElementById("shareBtn").addEventListener("click",()=>{
  const imageData = canvas.toDataURL("image/png");

  const link = document.createElement("a");
  link.download = "rocket-street-power-ranking.png";
  link.href = imageData;
  link.click();

  const tweetText = translations[lang].tweet(currentTournament);
  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}`;

  window.open(twitterUrl, "_blank");
});

/* =========================
   INIT
========================= */

applyTranslations();
generateImage();
