const dropdownMenu = document.querySelector("#dropdown-menu");
const dropdownToggler = document.querySelector("#dropdown-toggler");
const output = document.querySelector("#output-div");
const btnOutput = document.querySelector("#output-btn");
const apiKey = "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";
let repo = null;

btnOutput.addEventListener("click", () => {
  const query = dropdownToggler.textContent;
  fetchData(query);
});

function showData() {
  output.innerHTML = `
    <a href=${repo.html_url} target="_blank" rel="noopener noreferrer">
      <h4>${repo.name}</h4>
    </a>
    <p>${repo.description}</p>
    <div class="row justify-content-between">
      <p class="col-3"><i class="fa-solid fa-circle" style="color: #FFD43B;"></i> ${repo.language}</p>
      <p class="col-3"><i class="fa-solid fa-star" style="color: #676a6f;"></i> ${repo.stargazers_count}</p>
      <p class="col-3"><i class="fa-solid fa-code-fork"></i> ${repo.open_issues_count}</p>
    </div>
  `;
}

function errorBtn() {
  btnOutput.classList.remove("btn-dark");
  btnOutput.classList.remove("hide");
  btnOutput.classList.add("btn-danger");
  btnOutput.textContent = "Retry";
  output.classList.add("bg-danger-subtle");
}

function refreshBtn() {
  btnOutput.classList.remove("hide");
  btnOutput.classList.remove("btn-danger");
  btnOutput.classList.add("btn-dark");
  btnOutput.textContent = "Refresh";
  output.classList.remove("bg-danger-subtle");
}

function fetchData(query) {
  output.innerHTML = `<p id="output-p" class="p-4">Loading, please wait...</p>`;
  fetch(
    `https://api.github.com/search/repositories?q=${encodeURIComponent(query)}`,
    {
      headers: {
        Authorization: `token ${apiKey}`,
      },
    }
  )
    .then((response) => response.json())
    .then((data) => {
      if (data.items && data.items.length > 0) {
        const randNumber = Math.round(Math.random() * data.items.length);
        console.log(randNumber);
        repo = data.items[randNumber]; // Select a random repo from the results
        showData();
        refreshBtn();
      } else {
        output.innerHTML = "<p>No results found</p>";
        errorBtn();
      }
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
      output.innerHTML = `<p>Error: ${error.message}</p>`;
    });
}

window.onload = () => {
  fetch(
    "https://raw.githubusercontent.com/kamranahmedse/githunt/master/src/components/filters/language-filter/languages.json"
  )
    .then((response) => response.json())
    .then((data) => {
      data.forEach(({ title, value }) => {
        dropdownMenu.innerHTML += `
          <li><a class="dropdown-item" href="#" data-value="${value}">${title}</a></li>
        `;
      });
      const allOptions = document.querySelectorAll(".dropdown-item");
      allOptions.forEach((item) => {
        item.addEventListener("click", (e) => {
          e.preventDefault();
          dropdownToggler.textContent = e.target.textContent;
          const query = e.target.getAttribute("data-value");
          fetchData(query); // Call the fetchData function
        });
      });
    })
    .catch((error) => {
      console.error("Error fetching JSON:", error);
    });
};
