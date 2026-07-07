
const container = document.getElementById("container-flex");

data.forEach(p => {
  container.innerHTML += `
    <div class="p-4 project-card" onclick="window.location.href='./detailProject.html?id=${p.id}'">
      <h3>
        <a class="fs-5" href="./detailProject.html?id=${p.id}" target="_blank">${p.title}</a>
      </h3>
      <img src="${p.path}" width="250px" height="150px" alt="${p.title}" />
    </div>
  `;
});

function goToDetail(id) {
  const card = data.find(c => c.id === id);
  localStorage.setItem("card", JSON.stringify(card));
  window.location.href = "detail.html";
}
const searchInput = document.getElementById("query");
const filterProject=document.getElementById("projects");
// fungsi render ulang card
function renderProjects(projects) {
  container.innerHTML = ""; // hapus dulu
  projects.forEach(p => {
    container.innerHTML += `
      <div class="p-4 project-card" onclick="window.location.href='./detailProject.html?id=${p.id}'">
        <h3>
          <a class="fs-5" href="./detailProject.html?id=${p.id}" target="_blank">${p.title}</a>
        </h3>
        <img src="${p.path}" width="250px" height="150px" alt="${p.title}" />
      </div>
    `;
  });
}


// render awal
filterProject.addEventListener("change", (e)=>{
  const category = filterProject.value.toLowerCase();

  const filtered = data.filter(p => {
    const categories = p.category.toLowerCase().split(",").map(c => c.trim());

    const matchCategory =
      category === "" || categories.includes(category); // "" berarti All Projects

    return matchCategory;
  });
  renderProjects(filtered);
})

// filter saat ngetik
searchInput.addEventListener("input", (e) => {
  const keyword = e.target.value.toLowerCase();
  const filtered = data.filter(p =>
    p.title.toLowerCase().includes(keyword) ||
    p.details.toLowerCase().includes(keyword)
  );
  renderProjects(filtered);
});



