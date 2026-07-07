function zoomImage(src) {
  const overlay = document.getElementById("overlay");
  const img = document.getElementById("overlayImg");

  img.src = src;
  overlay.classList.remove("hidden");

  // kasih waktu sedikit biar transisinya jalan
  setTimeout(() => {
    overlay.classList.add("opacity-100");
    overlay.classList.remove("opacity-0");

    img.classList.add("scale-100");
    img.classList.remove("scale-90");
  }, 10);
}

document.getElementById("overlay").addEventListener("click", () => {
  const overlay = document.getElementById("overlay");
  const img = document.getElementById("overlayImg");

  overlay.classList.add("opacity-0");
  overlay.classList.remove("opacity-100");

  img.classList.add("scale-90");
  img.classList.remove("scale-100");

  // sembunyiin setelah transisi selesai
  setTimeout(() => {
    overlay.classList.add("hidden");
  }, 700); // harus sama dengan duration-700
});

function renderProjects(projects, currentProjectId) {
  const otherProject=document.getElementById("otherProjectDetail")

  otherProject.innerHTML = ""; // hapus dulu

  // filter project biar gak sama dengan yang sedang ditampilin
  const otherProjects = projects.filter(p => p.id !== currentProjectId);

  // ambil hanya 4 project pertama
  const limitedProjects = otherProjects.slice(0, 4);

  limitedProjects.forEach(p => {
    otherProject.innerHTML += `
      <div class="p-4 project-card" onclick="window.location.href='./detailProject.html?id=${p.id}'">
        <h3>
          <a class="fs-5" href="./detailProject.html?id=${p.id}" target="_blank">${p.title}</a>
        </h3>
        <img src="${p.path}" width="250px" height="150px" alt="${p.title}" />
      </div>
    `;
  });
}
const urlParams = new URLSearchParams(window.location.search);
const projectId = urlParams.get("id");
const detailProject = data.find(p => p.id == projectId);
if (detailProject) {
  async function getLastPushDate() {
    const res = await fetch(detailProject.apiLastDate);
    const dataJson = await res.json();

    // ambil pushed_at (push terakhir ke default branch)
    return dataJson.pushed_at;
  }
function renderLinks(project) {
  let links = "";

  if (project.demoLink!="") {
    links += `
      <a
        href="${project.demoLink}"
        target="__blank"
        aria-label="Demo Project"
        class="px-4 sm:px-6 py-2 bg-gray-600 text-primary-light hover:bg-ternary-dark 
               dark:bg-gray-200 dark:text-secondary-dark dark:hover:bg-primary-light 
               rounded-md focus:ring-1 focus:ring-indigo-900 duration-500">
        Demo
      </a>
    `;
  }

  if (project.githubLink!="") {
    links += `
      <a
        href="${project.githubLink}"
        target="__blank"
        aria-label="GitHub Project"
        class="px-4 sm:px-6 py-2 bg-gray-600 text-primary-light hover:bg-ternary-dark 
               dark:bg-gray-200 dark:text-secondary-dark dark:hover:bg-primary-light 
               rounded-md focus:ring-1 focus:ring-indigo-900 duration-500">
        GitHub
      </a>
    `;
  }

  if (project.prototypeLink!="") {
    links += `
      <a
        href="${project.prototypeLink}"
        target="__blank"
        aria-label="Prototype Project"
        class="px-4 sm:px-6 py-2 bg-gray-600 text-primary-light hover:bg-ternary-dark 
               dark:bg-gray-200 dark:text-secondary-dark dark:hover:bg-primary-light 
               rounded-md focus:ring-1 focus:ring-indigo-900 duration-500">
        Prototype
      </a>
    `;
  }

  return links;
}
  const clients = detailProject.client.split(",").map(c => c.trim());
  let clientList = "";
  clients.forEach(c => {
     clientList += 
     `<li class="font-general-regular text-ternary-dark dark:text-ternary-light">
        <span>${c}</span>
      </li>`;  
  });
  const categoryDet=detailProject.category.replace(/,/g, " / ");
  getLastPushDate().then(lastDate => {
    const formatted = new Date(lastDate).toLocaleDateString("en-US", {
        month: "short", // month
        day: "numeric", // day
        year: "numeric" // year
    });
    if(formatted=="Invalid Date"){
      formatted="-";
    }
    document.getElementById("dateDetail").innerText = formatted;  
  });  
  document.getElementById("picture1").src=detailProject.path;
  document.getElementById("picture2").src=detailProject.path2;
  document.getElementById("picture3").src=detailProject.path3;
  document.getElementById("linkContainer").innerHTML=renderLinks(detailProject)
  
  renderProjects(data,projectId);
  document.getElementById("titleDetail").innerText = detailProject.title;
  document.getElementById("clientDetail").innerHTML=clientList;
  document.getElementById("detail").innerText = detailProject.details;
  document.getElementById("categoryDetail").innerText=categoryDet;
  document.getElementById("objectiveDetail").innerText=detailProject.objective;
  document.getElementById("toolsDetail").innerText=detailProject.tools;

}
document.getElementById("shareBtn").addEventListener("click", async () => {
  if (navigator.share) {
    try {
      await navigator.share({
        title: "Cek Project ini",
        text: "Aku nemu sesuatu yang keren!",
        url: window.location.href
      });
    } catch (err) {
      console.log("Share dibatalkan:", err);
    }
  } else {
    alert("Browser kamu belum mendukung Web Share API.");
  }
});


