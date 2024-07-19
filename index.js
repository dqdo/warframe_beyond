let openSidebarId = null; // Current sidebar opened

// Sets the SVG path color for mods sidebar
function setSvgColor(color) {
  const svg = document.getElementById("anyPolarity");
  if (svg) {
    const paths = svg.getElementsByTagName("path");
    for (let i = 0; i < paths.length; i++) {
      paths[i].setAttribute("fill", color);
    }
  }
}

// Rotates SVG, specifically for the mods toggle
function rotateSvg(shouldRotate) {
  const svg = document.getElementById("anyPolarity");
  if (svg) {
    if (shouldRotate) {
      svg.classList.add("rotatedAnyPolarity");
    } else {
      svg.classList.remove("rotatedAnyPolarity");
    }
  }
}

let arcaneTimeouts = []; // To store the timeouts for arcane animation
// Animation for when the arcanes sidebar button is toggled
function arcaneIconAnimation(start) {
  const images = [
    "images/arcanes/arcane_icon_inactive.png",
    "images/arcanes/arcane_icon_active1.png",
    "images/arcanes/arcane_icon_active2.png",
    "images/arcanes/arcane_icon_active3.png",
    "images/arcanes/arcane_icon_activefull.png",
  ];

  // Clear previous timeouts to prevent multiple animations running simultaneously.
  if (!start) {
    arcaneTimeouts.forEach((timeout) => clearTimeout(timeout));
    arcaneTimeouts = [];
  }

  // Play forward if start is true, meaning sidebar is on
  if (start) {
    // Interates through image array
    images.forEach((src, index) => {
      // stores the ID of each timeout in arcaneTimeouts that is set by setTimeout
      arcaneTimeouts.push(
        // setTimeout is a JavaScript function that executes a specified function after a certain amount of time (in milliseconds).
        setTimeout(() => {
          // Changes images src
          document.getElementById("arcaneIconImage").src = src;
        }, index * 80) // In milliseconds
      );
    });
  } else {
    // Play reverse if start is false, meaning sidebar is off
    images.reverse().forEach((src, index) => {
      arcaneTimeouts.push(
        setTimeout(() => {
          document.getElementById("arcaneIconImage").src = src;
        }, index * 80)
      );
    });
  }
}

// Makes the archon shard png glow
function archonShardGlow(shouldAffectArchonShard) {
  const img = document.getElementById("archonIconImageGlow");
  if (img) {
    if (shouldAffectArchonShard) {
      img.style.opacity = "1";
    } else {
      img.style.opacity = "";
    }
  }
}

function closeAllSidebars() {
  const sidebars = document.querySelectorAll(".sidebar"); // Get all elements that are in the sidebar class
  // Closes sidebars
  sidebars.forEach((sidebar) => {
    sidebar.classList.remove("open");
  });
  setSvgColor("#FF0000"); // Set SVG color to red when closing all sidebars, specifically for mods sidebar
  rotateSvg(false); // Reset SVG rotation for mods sidebar
  if (openSidebarId === "arcanesSidebar") {
    // Prevents the reverse animation from arcaneIconAnimation
    arcaneIconAnimation(false); // Stop arcane animation only if arcanesSidebar was open
  }
  if (openSidebarId === "archonSidebar") {
    archonShardGlow(false);
  }
  openSidebarId = null; // Null since sidebars are closed
}

function toggleSidebar(
  id,
  shouldAffectSvg,
  shouldAffectArcanes,
  shouldAffectArchonShard
) {
  const sidebar = document.getElementById(id);

  // If a different sidebar is open, close all sidebars
  if (openSidebarId && openSidebarId !== id) {
    closeAllSidebars();
  }

  // Toggle the sidebar open/close
  const isOpen = sidebar.classList.toggle("open");

  // Update SVG if required
  if (shouldAffectSvg) {
    setSvgColor(isOpen ? "#00FF00" : "#FF0000"); // Set SVG color to green when opening the sidebar, red when closing
    rotateSvg(isOpen); // Rotate SVG when opening the sidebar
  }

  // Update arcane animation if required
  if (shouldAffectArcanes) {
    arcaneIconAnimation(isOpen); // Start or stop the arcane animation based on the sidebar state
  }

  // Update archon glow if required
  if (shouldAffectArchonShard) {
    archonShardGlow(isOpen);
  }

  // Update the openSidebarId
  openSidebarId = isOpen ? id : null;
}

function modsToggle() {
  toggleSidebar("modsSidebar", true, false, false);
}

function arcanesToggle() {
  toggleSidebar("arcanesSidebar", false, true, false);
}

function archonShardsToggle() {
  toggleSidebar("archonSidebar", false, false, true);
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

// Whichever option is picked, it will appear on the button
function setDropdownOption(event, buttonId, optionText) {
  event.preventDefault();
  const button = document.getElementById(buttonId);
  const arrowImg = button.querySelector("#downArrowImg");
  const option = event.currentTarget;
  const optionImg = option.querySelector("img");

  // Clear existing button text except the arrow image
  button.innerHTML = "";

  // Create a new span element for the option text
  const textSpan = document.createElement("span");
  textSpan.innerText = optionText;

  const buttonStyles = window.getComputedStyle(button);
  textSpan.style.fontFamily = buttonStyles.fontFamily;
  textSpan.style.fontSize = buttonStyles.fontSize;
  textSpan.style.color = buttonStyles.color;
  textSpan.style.pointerEvents = "none";

  // Append the option image if it exists
  if (optionImg) {
    const newImg = document.createElement("img");
    newImg.src = optionImg.src;
    newImg.style.height = "10px";
    newImg.style.width = "10px";
    newImg.style.marginRight = "3px";
    newImg.style.pointerEvents = "none";
    button.appendChild(newImg);
  }

  // Append the text span and the arrow image
  button.appendChild(textSpan);
  button.appendChild(arrowImg);

  // Close the dropdown
  const dropdownContent = button.parentElement.querySelector(
    ".dropdown-content, .stats-dropdown-content"
  );
  if (dropdownContent) {
    dropdownContent.classList.remove("show");
  }
}

// Ensures that clicking outside of a dropdown button will close any open dropdowns.
window.onclick = function (event) {
  if (!event.target.matches(".dropbutton")) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    for (let i = 0; i < dropdowns.length; i++) {
      const openDropdown = dropdowns[i];
      if (openDropdown.classList.contains("show")) {
        openDropdown.classList.remove("show");
      }
    }
  }
};

function statsToggleDropdown(id) {
  const dropdown = document.getElementById(id);
  const content = dropdown.querySelector(".stats-dropdown-content");

  // Toggle the dropdown content visibility
  if (content.classList.contains("show")) {
    content.classList.remove("show");
  } else {
    const dropdowns = document.getElementsByClassName("stats-dropdown-content");

    // Close all other dropdowns and show only the selected dropdown
    for (let i = 0; i < dropdowns.length; i++) {
      dropdowns[i].classList.remove("show");
    }

    content.classList.add("show");
  }
}

// Close the dropdown if the user clicks outside of it
window.onclick = function (event) {
  if (!event.target.matches(".statsDropdownButton")) {
    const dropdowns = document.getElementsByClassName("stats-dropdown-content");
    for (let i = 0; i < dropdowns.length; i++) {
      if (dropdowns[i].classList.contains("show")) {
        dropdowns[i].classList.remove("show");
      }
    }
  }
};
