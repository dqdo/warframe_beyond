// Toggles mods sidebar
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


