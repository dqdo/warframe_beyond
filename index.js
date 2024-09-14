
// Whichever option is picked, it will appear on the button
function setDropdownOption(event, buttonId, optionText) {
  event.preventDefault();
  const button = document.getElementById(buttonId);
  const arrowImg = button.querySelector("#downArrowImg");
  const option = event.currentTarget;
  const optionImg = option.querySelector("img");
  const svg = option.querySelector("svg");

  // Clear existing button text except the arrow image
  button.innerHTML = "";

  // Create a new span element for the option text
  const textSpan = document.createElement("span");
  textSpan.innerText = optionText;

  // Styling text to match with button CSS
  const buttonStyles = window.getComputedStyle(button);
  textSpan.style.fontFamily = buttonStyles.fontFamily;
  textSpan.style.fontSize = buttonStyles.fontSize;
  textSpan.style.color = buttonStyles.color;
  textSpan.style.pointerEvents = "none";

  // Regular expression to match the button IDs from auraPolarityFilter to modNinePolarityFilter.
  const modPolarityFilterRegex =
    /^(auraPolarityFilter|exilusPolarityFilter|modOnePolarityFilter|modTwoPolarityFilter|modThreePolarityFilter|modFourPolarityFilter|modFivePolarityFilter|modSixPolarityFilter|modSevenPolarityFilter|modEightPolarityFilter|modNinePolarityFilter)$/;

  // Append the option image if it exists.
  if (optionImg && !modPolarityFilterRegex.test(buttonId)) {
    const newImg = document.createElement("img");
    newImg.src = optionImg.src;
    newImg.style.height = "0.625rem";
    newImg.style.width = "0.625rem";
    newImg.style.marginRight = "0.188rem";
    newImg.style.pointerEvents = "none";
    button.appendChild(newImg);
  }

  // Specific if statement for the mod slots.
  // if the buttonId is equal to any of the strings in Regex then it is true.
  if (optionImg && modPolarityFilterRegex.test(buttonId)) {
    const newImg = document.createElement("img");
    newImg.src = optionImg.src;
    newImg.style.height = "0.938rem";
    newImg.style.width = "0.938rem";
    newImg.style.marginRight = "0.188rem";
    newImg.style.pointerEvents = "none";
    button.appendChild(newImg);
  }

  if (svg) {
    const newSVG = svg.cloneNode(true);
    newSVG.style.height = "0.938rem";
    newSVG.style.width = "0.938rem";
    newSVG.style.marginRight = "0.188rem";
    newSVG.style.pointerEvents = "none";
    button.appendChild(newSVG);
  }

  // Append the text span and the arrow image
  button.appendChild(textSpan);
  button.appendChild(arrowImg);

  handleBuildTypeChange(optionText, buttonId);

  // Close the dropdown after an option is selected
  const dropdownContent = button.parentElement.querySelector(
    ".dropdown-content, .stats-dropdown-content"
  );
  if (dropdownContent) {
    dropdownContent.classList.remove("show");
  }
}

function handleBuildTypeChange(optionText, buttonId) {
  const auraSlot = document.querySelector("#auraSlot");
  const exilusSlot = document.querySelector("#exilusSlot");
  const archonSlots = document.querySelector(".archonContainer");
  const arcaneSlots = document.querySelector("#arcaneSlotOne");
  const arcaneSlotsTwo = document.querySelector("#arcaneSlotTwo");
  const ability = document.querySelector(".abilityContainer");
  let auraImage = document.querySelector(".modSlotContainer img:nth-child(2)");

  // Adjust slots according to what is selected in Build Type
  if (optionText === "Warframe" && buttonId === "buildTypeSelect") {
    auraSlot.classList.add("show");
    exilusSlot.classList.add("show");
    arcaneSlots.classList.add("show");
    arcaneSlotsTwo.classList.add("show");
    archonSlots.classList.add("show");
    ability.classList.add("show");
    auraImage.src = "assets/images/mods/IconAura.png";
    resetOptions();
    resetSlotStyles(slotImages);
    clearSearchbar();
    closeAllSidebars();
    generateModSlots(8);
  } else if (optionText === "Melee Weapon" && buttonId === "buildTypeSelect") {
    auraSlot.classList.add("show");
    exilusSlot.classList.add("show");
    auraImage.src = "assets/images/mods/IconStance.png";
    arcaneSlots.classList.remove("show");
    arcaneSlotsTwo.classList.add("show");
    archonSlots.classList.remove("show");
    ability.classList.remove("show");
    resetOptions();
    resetSlotStyles(slotImages);
    clearSearchbar();
    closeAllSidebars();
    generateModSlots(8);
  } else if (buttonId === "buildTypeSelect") {
    exilusSlot.classList.add("show");
    auraSlot.classList.remove("show");
    arcaneSlots.classList.remove("show");
    arcaneSlotsTwo.classList.add("show");
    archonSlots.classList.remove("show");
    ability.classList.remove("show");
    resetOptions();
    resetSlotStyles(slotImages);
    clearSearchbar();
    closeAllSidebars();
    generateModSlots(8);
  }
}

function clearSearchbar() {
  const searchbars = document.querySelectorAll(".searchbar");
  searchbars.forEach((searchbar) => {
    searchbar.value = "";
  });
}

// Reset any selected dropdown option.
function resetOptions() {
  document.querySelectorAll(".dropbutton").forEach((button) => {
    const originalContent = button.getAttribute("data-original-content");
    button.innerHTML = originalContent;
  });
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

// Converts a span to a number
function spanToNum(span) {
  const spanElement = document.getElementById(span);
  const spanText = spanElement.textContent;
  return Number(spanText);
}

// Updates that span with a number (usually from the spanToNum function)
function updateSpanNumber(span, newNumber) {
  const spanElement = document.getElementById(span);
  spanElement.textContent = newNumber;
}