const dropdownMenu = document.querySelector("#dropdown-menu");
const dropdownToggler = document.querySelector("#dropdown-toggler");
const output = document.querySelector("#output-div");
const btnOutput = document.querySelector("#output-btn");
const apiKey = "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";
let repo = null;



function showData() {
    output.innerHTML = `
  <h4>${repo.name}</h4>
  <p>${repo.description}</p>
  <div class="row justify-content-between">
      <p class="col-3">${repo.name}</p>
      <p class="col-3"> ${repo.stargazers_count}</p>
      <p class="col-3">${repo.open_issues_count}</p>
  </div>
  `;
  }

window.onload = fetch(
  "https://raw.githubusercontent.com/kamranahmedse/githunt/master/src/components/filters/language-filter/languages.json"
)
  .then((response) => response.json())
  .then((data) => {
    for ({ title, value } of data) {
      dropdownMenu.innerHTML += `
          <li ><a class="dropdown-item" href="#" data-value="${value}">${title}</a></li>
 `;
    }

    const allOptions = document.querySelectorAll(".dropdown-item");
    allOptions.forEach((item) => {
      item.addEventListener("click", (e) => {
        e.preventDefault();
        dropdownToggler.textContent = e.target.textContent;
        const query = e.target.getAttribute("data-value");
        fetch(
          `https://api.github.com/search/repositories?q=${encodeURIComponent(
            query
          )}`,
          {
            headers: {
              Authorization: `token ${apiKey}`,
            },
          }
        )
          .then((response) => response.json())
          .then((data) => {
            if (data.items && data.items.length > 0) {
              repo = data.items[0]; // Assuming you want to display the first repo from the results
              showData();
            } else {
              output.innerHTML = "<p>No results found</p>";
            }
          })
          .catch((error) => {
            console.error("Error fetching data:", error);
          });
      });
    });
  })
  .catch((error) => {
    console.error("Error fetching JSON:", error);
  });
