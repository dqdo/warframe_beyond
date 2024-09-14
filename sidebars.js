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
    "assets/images/arcanes/arcane_icon_inactive.png",
    "assets/images/arcanes/arcane_icon_active1.png",
    "assets/images/arcanes/arcane_icon_active2.png",
    "assets/images/arcanes/arcane_icon_active3.png",
    "assets/images/arcanes/arcane_icon_activefull.png",
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

  moveModGrid();

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

  // If the same sidebar is already open and the click is from a slot image, do not close it
  if (openSidebarId === id && isSlot) {
    return; // Prevent toggling (off) if the same sidebar is already open due to a slot click.
  }

  // Resets previous slot style, this is so when toggling off the sidebar buttons, the slot will be unhighlighted.
  resetSlotStyles(slotImages);

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

  // Moves mod slots to accomodate for space.
  moveModGrid();
}

// Toggle buttons for sidebars
document.getElementById("modsToggleButton").addEventListener("click", () => {
  isSlot = false; // Reset flag for sidebar button click
  modsToggle();
});

document.getElementById("arcanesToggleButton").addEventListener("click", () => {
  isSlot = false; // Reset flag for sidebar button click
  arcanesToggle();
});

document.getElementById("archonToggleButton").addEventListener("click", () => {
  isSlot = false; // Reset flag for sidebar button click
  archonShardsToggle();
});

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
  const statsContent = document.querySelector(".stats-dropdown-content");

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
    statsContent.classList.remove("show");
  }
}

// Aquires the original text of the dropdown button.
document.querySelectorAll(".dropbutton").forEach((button) => {
  button.setAttribute("data-original-content", button.innerHTML);
});
