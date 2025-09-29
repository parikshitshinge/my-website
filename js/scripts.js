const filterButtons = document.querySelectorAll('[data-filter]');
const projects = document.querySelectorAll('.project-item');

const techColors = {
  "Python": "bg-primary",
  "SQL": "bg-primary",
  "Snowflake": "bg-primary",
  "dbt": "bg-primary",
  "Airflow": "bg-primary",
  "Microsoft SSIS": "bg-primary",

  "Tableau": "bg-success",
  "Power BI": "bg-success", 
  "Superset": "bg-success",
  "Adobe Analytics": "bg-success",
  "Google Analytics": "bg-success", 

  "Scikit-learn": "bg-danger" 

  
};

document.querySelectorAll(".filter-btn").forEach(button => {
  button.addEventListener("click", () => {
    const filter = button.getAttribute("data-filter");

    // Remove "active" class from all buttons
    document.querySelectorAll(".filter-btn").forEach(btn => btn.classList.remove("active"));
    
    // Add "active" class to clicked button
    button.classList.add("active");

    document.querySelectorAll(".project-item").forEach(item => {
      const categories = item.getAttribute("data-category").split(" ");
      
      if (filter === "all" || categories.includes(filter)) {
        item.style.display = "block";
      } else {
        item.style.display = "none";
      }
    });
  });
});

async function loadProjects() {
  try {
    const response = await fetch("json/projects.json"); // same folder
    const projects = await response.json();
    const container = document.getElementById("projects-list");

    container.innerHTML = projects.map(project => `
      <div class="card shadow-sm mb-3 project-item" data-category="${project.categories.join(' ')}">
        <div class="card-body p-3">
          <h4 class="fw-bold mb-2">${project.title}</h4>
          ${project.client ? `
            <p class="mb-1"><span class="fw-semibold text-muted">Client:</span> ${project.client}</p>
          ` : ""}  
          <p class="mb-2">
            <span class="fw-semibold text-muted">Technologies:</span>
            ${project.technologies.map(tech =>
              `<span class="badge ${techColors[tech] || "bg-warning text-dark"} me-1">${tech}</span>`
            ).join('')}
          </p>
          <p class="text-dark mb-0">
            <span class="fw-semibold text-muted">Project Description: </span>
            ${project.description}
          </p>
          ${project.github ? `
            <p class="mt-2">
              <a href="${project.github}" target="_blank" class="btn btn-sm btn-outline-dark">
                <i class="bi bi-github me-1"></i> View on GitHub
              </a>
            </p>` : ""}
        </div>
      </div>
    `).join('');
  } catch (error) {
    console.error("Error loading projects:", error);
  }
}

// Run after page load
document.addEventListener("DOMContentLoaded", loadProjects);

