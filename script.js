const dropdownMenu = document.querySelector("#dropdown-menu")


window.onload = fetch('https://raw.githubusercontent.com/kamranahmedse/githunt/master/src/components/filters/language-filter/languages.json')
.then(response => response.json())
.then(data => {
  console.log(data); // Process the JSON data
for ({title , value} of data){
    dropdownMenu.innerHTML +=`
          <li id=${value}><a class="dropdown-item" href="#">${title}</a></li>
    `
}
})
.catch(error => {
  console.error('Error fetching JSON:', error)});


