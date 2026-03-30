/* =========================
   DATA ORIGINAL + REGIONES
========================= */

const teamsNA = [
  { name:"SPACESTATION GAMING", logo:"logos/ssg.png" },
  { name:"NRG", logo:"logos/nrg.png" },
  { name:"SHOPIFY REBELLION", logo:"logos/shopify.png" },
  { name:"FUT ESPORTS", logo:"logos/fut.png" },
  { name:"STRICTLY BUSINESS", logo:"logos/rocket.png" },
  { name:"NEXT2NU ESPORTS", logo:"logos/n2n.png" },
  { name:"1", logo:"logos/rocket.png" },
  { name:"GEN.G MOBIL1 RACING", logo:"logos/geng.png" },
  { name:"FELLAS", logo:"logos/fellas.png" },
  { name:"LOB", logo:"logos/rocket.png" },
  { name:"THE IMMIGRANTS", logo:"logos/rocket.png" },
  { name:"NODOPE", logo:"logos/rocket.png" },
  { name:"DIGNITAS", logo:"logos/dignitas.png" },
  { name:"VIRTUS.PRO", logo:"logos/vp.png" },
  { name:"SOUTHAMPTON ACADEMY", logo:"logos/rocket.png" },
  { name:"KRAKENSEAS", logo:"logos/kraken.png" }
];

const teamsMENA = [
  { name:"R8 ESPORTS", logo:"logos/r8.png" },
  { name:"STALLIONS", logo:"logos/stallions.png" },
  { name:"TEAM FALCONS", logo:"logos/falcons.png" },
  { name:"TWISTED MINDS", logo:"logos/twisted.png" },
  { name:"RAFHA ESPORTS", logo:"logos/rafha.png" },
  { name:"ALYOM W ANA B ALSH8L", logo:"logos/rocket.png" },
  { name:"DOS", logo:"logos/rocket.png" },
  { name:"EVERYTHING", logo:"logos/rocket.png" },
  { name:"DFT", logo:"logos/rocket.png" },
  { name:"SLEEPING", logo:"logos/sleeping.png" },
  { name:"NOTHING", logo:"logos/rocket.png" },
  { name:"WE DON'T KNOW", logo:"logos/rocket.png" },
  { name:"AFK", logo:"logos/afk.png" },
  { name:"THEFIRST", logo:"logos/rocket.png" },
  { name:"RURAL", logo:"logos/rocket.png" },
  { name:"EXCITING1", logo:"logos/rocket.png" }
];

/* =========================
   ESTADO
========================= */

let currentTeams = [...teamsNA];
let currentTournament = "NA OPEN 5";

/* =========================
   DOM
========================= */

const teamsUl = document.getElementById("teams");
const naBtn = document.getElementById("naBtn");
const menaBtn = document.getElementById("menaBtn");

/* =========================
   RENDER
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
   SORTABLE (ORIGINAL)
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
   SWITCH REGION (NUEVO)
========================= */

function switchRegion(region){
  if(region === "NA"){
    currentTeams = [...teamsNA];
    currentTournament = "NA OPEN 5";

    naBtn.classList.add("active");
    menaBtn.classList.remove("active");
  } else {
    currentTeams = [...teamsMENA];
    currentTournament = "MENA OPEN 5";

    menaBtn.classList.add("active");
    naBtn.classList.remove("active");
  }

  renderTeams();
  generateImage();
}

if(naBtn && menaBtn){
  naBtn.addEventListener("click", () => switchRegion("NA"));
  menaBtn.addEventListener("click", () => switchRegion("MENA"));
}

/* =========================
   CANVAS (ORIGINAL + FIX LOGOS)
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

  /* NOMBRE */
  let name = document.getElementById("personName").value.slice(0,25);

  if(name){
    ctx.fillStyle="#ff5419";
    ctx.textAlign="center";
    ctx.font="bold 60px BourgeoisBold";
    ctx.fillText(name.toUpperCase(),538,255);
  }

  /* TEAMS */
  const teams = document.querySelectorAll("#teams li");

  let startY = 335;
  const spacing = 65;

  for(let i=0;i<teams.length;i++){
    const teamName = teams[i].querySelector(".team-name").textContent;
    const logoSrc = teams[i].querySelector("img").src;

    const logo = await loadImage(logoSrc);

    const size = 45;

    /* 🔥 AJUSTE 1:1 SIN FONDO */
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
   INPUT + CONTADOR (ORIGINAL)
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
   DOWNLOAD (ORIGINAL)
========================= */

document.getElementById("downloadBtn").addEventListener("click",()=>{
  const imageData = canvas.toDataURL("image/png");

  const link = document.createElement("a");
  link.download = "rocket-street-power-ranking.png";
  link.href = imageData;
  link.click();
});

/* =========================
   SHARE (MODIFICADO DINÁMICO)
========================= */

document.getElementById("shareBtn").addEventListener("click",()=>{
  const imageData = canvas.toDataURL("image/png");

  const link = document.createElement("a");
  link.download = "rocket-street-power-ranking.png";
  link.href = imageData;
  link.click();

  const tweetText = `Mis Power Rankings del ${currentTournament} 🚀 @RocketStreet`;
  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}`;

  window.open(twitterUrl, "_blank");
});

/* =========================
   INIT
========================= */

generateImage();
