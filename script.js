const dropdownMenu = document.querySelector("#dropdown-menu");
const dropdownToggler = document.querySelector("#dropdown-toggler");
const apiKey = "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";

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
        fetch(`https://api.github.com/search/repositories?q=${encodeURIComponent(query)}`, {
            headers: {
              'Authorization': `token ${apiKey}`
            }
          })
          .then((response) => response.json())
          .then((data) => {
            console.log(data.items); // Process the search results
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
