// Move elements if a sidebar is open for visability
function moveModGrid() {
    const modGrid = document.querySelector(".modGridContainer");
    const sidebars = document.querySelectorAll(".sidebar.open");
    const arcanes = document.querySelector(".arcanesContainer");
    const archons = document.querySelector(".archonContainer");
  
    // No sidebars open
    if (sidebars.length === 0) {
      modGrid.classList.remove("active");
      arcanes.classList.remove("active");
      archons.classList.remove("active");
    }
    // A sidebar open
    else {
      modGrid.classList.add("active");
      arcanes.classList.add("active");
      archons.classList.add("active");
    }
  }
  
  // previousSlot keeps track of the previous slot that was clicked.
  let previousSlot = null;
  
  const modSlot = document.querySelectorAll(".modSlotContainer img:nth-child(1)");
  const arcaneSlot = document.querySelectorAll(".arcaneSlot img");
  const archonSlot = document.querySelectorAll(".archonSlot img");
  const slotImages = [...modSlot, ...arcaneSlot, ...archonSlot];
  const modsSidebar = document.querySelector("#modsSidebar");
  const arcanesSidebar = document.querySelector("#arcanesSidebar");
  const archonSidebar = document.querySelector("#archonSidebar");
  
  // isSlot tracks if a slot is clicked.
  let isSlot = false;
  
  // Sets up build slot event listeners
  function setupSlotListeners() {
    const modSlot = document.querySelectorAll(
      ".modSlotContainer img:nth-child(1)"
    );
    const arcaneSlot = document.querySelectorAll(".arcaneSlot img");
    const archonSlot = document.querySelectorAll(".archonSlot img");
    const slotImages = [...modSlot, ...arcaneSlot, ...archonSlot];
  
    // Add new listeners to all slot images
    slotImages.forEach((slotImage) => {
      slotImage.addEventListener("click", handleSlotClick);
    });
  }
  
  // If a build slot is clicked, then it will be highlighted. Only one slot can be highlighted at a time.
  function handleSlotClick() {
    // Mark that a slot is clicked
    isSlot = true;
  
    // Get the updated slot images
    const modSlot = document.querySelectorAll(
      ".modSlotContainer img:nth-child(1)"
    );
    const arcaneSlot = document.querySelectorAll(".arcaneSlot img");
    const archonSlot = document.querySelectorAll(".archonSlot img");
    const slotImages = [...modSlot, ...arcaneSlot, ...archonSlot];
  
    // Reset style for previously selected slot
    resetSlotStyles(slotImages);
  
    // Apply the correct style to the currently clicked element
    if (Array.from(modSlot).includes(this)) {
      this.style.filter = "brightness(0) invert(1)";
      if (openSidebarId !== "modsSidebar") {
        modsToggle();
      }
    } else if (Array.from(arcaneSlot).includes(this)) {
      this.style.opacity = "70%";
      if (openSidebarId !== "arcanesSidebar") {
        arcanesToggle();
      }
    } else if (Array.from(archonSlot).includes(this)) {
      this.style.opacity = "90%";
      if (openSidebarId !== "archonSidebar") {
        archonShardsToggle();
      }
    }
  
    // Update the previousSlot
    previousSlot = this;
  }
  
  // Unhighlights slots
  function resetSlotStyles(slotImages) {
    // Reset the style for the previously highlighted slot
    if (previousSlot) {
      if (
        Array.from(
          document.querySelectorAll(".modSlotContainer img:nth-child(1)")
        ).includes(previousSlot)
      ) {
        previousSlot.style.filter = "";
      } else if (
        Array.from(document.querySelectorAll(".arcaneSlot img")).includes(
          previousSlot
        )
      ) {
        previousSlot.style.opacity = "";
      } else if (
        Array.from(document.querySelectorAll(".archonSlot img")).includes(
          previousSlot
        )
      ) {
        previousSlot.style.opacity = "";
      }
    }
  }
  
  setupSlotListeners();
  
  // HTML for a basic mod slot
  function createModSlot(id) {
    return `
      <div class="modSlots">
        <div class="modPolaritySelector">
          <div class="dropdown" id="${id}Polarity">
            <button onclick="toggleDropdown('${id}Polarity')" class="dropbutton" id="${id}PolarityFilter">
              <span>--- </span>
              <img id="downArrowImg" src="assets/images/misc/down-arrow-svgrepo-com.svg" />
            </button>
            <div class="dropdown-content">
              <a id="topOption" href="#" onclick="setDropdownOption(event, '${id}PolarityFilter', '--- ')">
                <span>---</span>
              </a>
              <a href="#" onclick="setDropdownOption(event, '${id}PolarityFilter', '')">
                <img src="assets/images/mods/polarities/madurai_symbol.png" />
              </a>
              <a href="#" onclick="setDropdownOption(event, '${id}PolarityFilter', '')">
                <img src="assets/images/mods/polarities/vazarin_symbol.png" />
              </a>
              <a href="#" onclick="setDropdownOption(event, '${id}PolarityFilter', '')">
                <img src="assets/images/mods/polarities/naramon_symbol.png" />
              </a>
              <a href="#" onclick="setDropdownOption(event, '${id}PolarityFilter', '')">
                <img src="assets/images/mods/polarities/zenurik_symbol.png" />
              </a>
              <a href="#" onclick="setDropdownOption(event, '${id}PolarityFilter', '')">
                <img src="assets/images/mods/polarities/penjaga_symbol.png" />
              </a>
              <a href="#" onclick="setDropdownOption(event, '${id}PolarityFilter', '')">
                <img src="assets/images/mods/polarities/unairu_symbol.png" />
              </a>
              <a id="bottomOption" href="#" onclick="setDropdownOption(event, '${id}PolarityFilter', '')">
                <img src="assets/images/mods/polarities/umbra_symbol.png" />
              </a>
            </div>
          </div>
        </div>
        <div class="modSlotContainer">
          <img src="assets/images/mods/mod_slot.png" onclick="modsToggle()">
        </div>
      </div>
    `;
  }
  
  // Generates mod slots (8 mod slots specifically)
  function generateModSlots(numberOfSlots) {
    const container = document.querySelector(".modGridContainer");
  
    const nums = [
      "Two",
      "Three",
      "Four",
      "Five",
      "Six",
      "Seven",
      "Eight",
      "Nine",
    ];
  
    if (container) {
      container.innerHTML = ""; // Clear any existing content
  
      // Loop to create each HTML mod slot
      for (let i = 0; i <= numberOfSlots - 1; i++) {
        container.innerHTML += createModSlot(`mod${nums[i]}`);
      }
    }
  
    // Update Event Build Slot Listeners
    setupSlotListeners();
  }
  