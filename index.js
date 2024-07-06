let openSidebarId = null;

// Sets the SVG path color for mods sidebar
function setSvgColor(color) {
  const svg = document.getElementById("anyPolarity");
  const paths = svg.getElementsByTagName("path");
  for (let i = 0; i < paths.length; i++) {
    paths[i].setAttribute("fill", color);
  }
}

//  Rotates SVG, specifically for the mods toggle. 
function rotateSvg(shouldRotate) {
  const svg = document.getElementById("anyPolarity");
  if (shouldRotate) {
    svg.classList.add("rotatedAnyPolarity");
  } else {
    svg.classList.remove("rotatedAnyPolarity");
  }
}


function closeAllSidebars() {
  const sidebars = document.querySelectorAll('.sidebar'); // Get all elements that are in the sidebar class
  // Closes sidebars
  sidebars.forEach(sidebar => {
    sidebar.classList.remove('open');
  });
  setSvgColor("#FF0000"); // Set SVG color to red when closing all sidebars, specifically for mods sidebar
  rotateSvg(false); // Reset SVG rotation for mods sidebar
  openSidebarId = null; // Null since sidebars are closed
}

function toggleSidebar(id, shouldAffectSvg) {
  const sidebar = document.getElementById(id);

  // If a different sidebar is open (id isn't equal to different sidebar id), it calls closeAllSidebars() which sets the openSidebarID = null
  if (openSidebarId !== id) {
    closeAllSidebars();
  }

  const isOpen = sidebar.classList.toggle('open');

  if (shouldAffectSvg) {
    setSvgColor(isOpen ? "#00FF00" : "#FF0000"); // Set SVG color to green when opening the sidebar, red when closing
    rotateSvg(isOpen); // Rotate SVG when opening the sidebar
  }

  // updates openSidebarID that the sidebar is open, if true then openSidebarID is equal to the id which the sidebar is opened
  openSidebarId = isOpen ? id : null;
}

function modsToggle() {
  toggleSidebar('modsSidebar', true); // Set true since modsSidebar has the svg
}

function arcanesToggle() {
  toggleSidebar('arcanesSidebar', false); // Set false since arcanesToggle doesn't have the svg
}

function archonShardsToggle() {
  toggleSidebar('archonSidebar', false); // Set false since archonShardsToggle doesn't have the svg
}

// Toggles the dropdown options
function toggleDropdown(id) {
  const dropdown = document.getElementById(id);
  const content = dropdown.querySelector(".dropdown-content");

// Essentially the toggle to the dropdown button
  if (content.classList.contains("show")) {
    content.classList.remove("show");
  } else {
    const dropdowns = document.getElementsByClassName("dropdown-content");

// Closes all other dropdowns and shows only the selected dropdown
    for (let i = 0; i < dropdowns.length; i++) {
      dropdowns[i].classList.remove("show");
    }

    content.classList.add("show");
  }

}

// Whichever option picked, it will appear on the button
function setDropdownOption(event, buttonId, optionText) {
  event.preventDefault();
  const button = document.getElementById(buttonId);
  const arrowImg = button.querySelector("#downArrowImg");
  const option = event.currentTarget;
  const optionImg = option.querySelector("img");

  // Clear existing content except the arrow image
  button.innerHTML = '';

  // Create a new span element for the option text
  const textSpan = document.createElement('span');
  textSpan.innerText = optionText;
  textSpan.style.fontFamily = 'Roboto';
  textSpan.style.fontSize = '10px';
  textSpan.style.pointerEvents = 'none';

  // Append the option image if it exists
  if (optionImg) {
      const newImg = document.createElement('img');
      newImg.src = optionImg.src;
      newImg.style.height = '10px'; 
      newImg.style.width = '10px';
      newImg.style.filter = 'invert(100%)';
      newImg.style.marginRight = '3px';
      newImg.style.pointerEvents = 'none';
      button.appendChild(newImg);
  }

  // Append the text span and the arrow image
  button.appendChild(textSpan);
  button.appendChild(arrowImg);
}

// Ensures that clicking outside of a dropdown button will close any open dropdowns.
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


