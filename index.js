function modsToggle() {
  const svg = document.getElementById("anyPolarity");
  const paths = svg.getElementsByTagName("path");
  const sidebar = document.getElementById('modsSidebar');

  //Toggle mods sidebar
   sidebar.classList.toggle('open');

  // Toggle SVG Rotation for any_polarity.svg
  svg.classList.toggle("rotatedAnyPolarity");

  // Toggle SVG Color for any_polarity.svg
  for (let i = 0; i < paths.length; i++) {
    if (paths[i].getAttribute("fill") === "#FF0000") {
      paths[i].setAttribute("fill", "#00FF00");
    } else {
      paths[i].setAttribute("fill", "#FF0000");
    }
  }
}

function toggleDropdown(id) {
  const dropdown = document.getElementById(id);
  const content = dropdown.querySelector(".dropdown-content");

  if (content.classList.contains("show")) {
    content.classList.remove("show");
  } else {
    
    const dropdowns = document.getElementsByClassName("dropdown-content");
    for (let i = 0; i < dropdowns.length; i++) {
      dropdowns[i].classList.remove("show");
    }

    content.classList.add("show");
  }

}

function setDropdownOption(event, buttonId, optionText) {
  event.preventDefault();
  const button = document.getElementById(buttonId);
  const arrowImg = button.querySelector("img");
  const textSpan = button.querySelector(".button-text");
  button.innerText = optionText;
  button.appendChild(arrowImg);
}

window.onclick = function(event) {
  if (!event.target.matches(".dropbutton")) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    for (let i = 0; i < dropdowns.length; i++) {
      const openDropdown = dropdowns[i];
      if (openDropdown.classList.contains("show")) {
        openDropdown.classList.remove("show");
      }
    }
  }
}


