/* =========================
   DATA
========================= */

const teamsNA = [
  { name:"FURIA", logo:"logos/furia.png" },
  { name:"NRG", logo:"logos/rocket.png" },
  { name:"GEN.G", logo:"logos/rocket.png" },
  { name:"G2", logo:"logos/rocket.png" },
  { name:"SSG", logo:"logos/rocket.png" },
  { name:"SHOPIFY", logo:"logos/rocket.png" },
  { name:"COMPLEXITY", logo:"logos/rocket.png" },
  { name:"M80", logo:"logos/rocket.png" },
  { name:"DIG", logo:"logos/rocket.png" },
  { name:"OPTIC", logo:"logos/rocket.png" },
  { name:"TSM", logo:"logos/rocket.png" },
  { name:"VERSION1", logo:"logos/rocket.png" },
  { name:"KOI", logo:"logos/rocket.png" },
  { name:"LUMINOSITY", logo:"logos/rocket.png" },
  { name:"PIRATES", logo:"logos/rocket.png" },
  { name:"AKREW", logo:"logos/rocket.png" }
];

const teamsMENA = [
  { name:"FALCONS", logo:"logos/rocket.png" },
  { name:"TWISTED MINDS", logo:"logos/rocket.png" },
  { name:"RULE ONE", logo:"logos/rocket.png" },
  { name:"VISION", logo:"logos/rocket.png" },
  { name:"ANKAA", logo:"logos/rocket.png" },
  { name:"SCYTES", logo:"logos/rocket.png" },
  { name:"DARKSIDE", logo:"logos/rocket.png" },
  { name:"BRAVADO", logo:"logos/rocket.png" },
  { name:"EXILE", logo:"logos/rocket.png" },
  { name:"VENOM", logo:"logos/rocket.png" },
  { name:"UNITY", logo:"logos/rocket.png" },
  { name:"LEGION", logo:"logos/rocket.png" },
  { name:"PHOENIX", logo:"logos/rocket.png" },
  { name:"NEXUS", logo:"logos/rocket.png" },
  { name:"VOID", logo:"logos/rocket.png" },
  { name:"ASCENT", logo:"logos/rocket.png" }
];

/* =========================
   ESTADO
========================= */

let currentTeams = [...teamsNA]; // NA por defecto
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
   SORTABLE
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

naBtn.onclick = () => switchRegion("NA");
menaBtn.onclick = () => switchRegion("MENA");

/* =========================
   CANVAS
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

    ctx.drawImage(logo,210,startY-35,45,45);

    ctx.fillStyle="white";
    ctx.textAlign="left";
    ctx.font="bold 36px BourgeoisBold";
    ctx.fillText(teamName.toUpperCase(),300,startY);

    startY += spacing;
  }

  document.getElementById("previewImage").src = canvas.toDataURL("image/png");
}

/* =========================
   INPUT
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
   DOWNLOAD
========================= */

document.getElementById("downloadBtn").onclick = ()=>{
  const link = document.createElement("a");
  link.download = "rocket-street-power-ranking.png";
  link.href = canvas.toDataURL("image/png");
  link.click();
};

/* =========================
   SHARE (DINÁMICO)
========================= */

document.getElementById("shareBtn").onclick = ()=>{
  const link = document.createElement("a");
  link.download = "rocket-street-power-ranking.png";
  link.href = canvas.toDataURL("image/png");
  link.click();

  const tweetText = `Mis Power Rankings del ${currentTournament} 🚀 @RocketStreet`;
  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}`;

  window.open(twitterUrl, "_blank");
};

/* =========================
   INIT
========================= */

generateImage();
