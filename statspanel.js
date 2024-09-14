// Dropdown toggle specifically for stats panel. This is so that dropdowns from other panels don't close.
function statsToggleDropdown(id) {
    const dropdown = document.getElementById(id);
    const content = dropdown.querySelector(".stats-dropdown-content");
    const generalDropdowns = document.getElementsByClassName("dropdown-content");
  
    // Toggle the dropdown content visibility
    if (content.classList.contains("show")) {
      content.classList.remove("show");
    } else {
      const dropdowns = document.getElementsByClassName("stats-dropdown-content");
  
      // Close all other dropdowns and show only the selected dropdown
      for (let i = 0; i < dropdowns.length; i++) {
        dropdowns[i].classList.remove("show");
      }
      for (let i = 0; i < generalDropdowns.length; i++) {
        generalDropdowns[i].classList.remove("show");
      }
  
      content.classList.add("show");
    }
  }

  // Opens the modal specifically for a new build.
function openNewBuildModal(modalID, buildTypeSelectedID) {
    const modal = document.getElementById(modalID);
    const overlay = document.getElementById("overlay");
    const alert = document.getElementById("buildTypeAlert");
    const buildTypeSelectButton = document.getElementById(buildTypeSelectedID);
    const selectedText = buildTypeSelectButton.textContent.trim();
    const searchBarText = document.getElementById("modalSearchbar");
  
    // Must select an option from the Build Type dropdown in order for the modal to show or else an alert message will show up.
    if (selectedText !== "Select") {
      overlay.classList.add("active");
      modal.classList.add("active");
      closeAllSidebars();
      searchBarText.placeholder = `Search for ${selectedText}`;
    } else {
      alert.classList.add("show");
      setTimeout(() => {
        alert.classList.remove("show");
      }, 2000);
    }
  }
  
  // Closes modal (usually from a click of a button)
  function closeModal(modalID) {
    const modal = document.getElementById(modalID);
    const overlay = document.getElementById("overlay");
    modal.classList.remove("active");
    overlay.classList.remove("active");
  }
  
  function openAbilitiesModal(event, modalID) {
    const clickedDiv = event.currentTarget; // This gets the element that triggered the event
    const spanElement = clickedDiv.querySelector("span"); // Get the span inside the clicked div
    const abilityNumText = document.getElementById("abilityNum");
  
    abilityNumText.innerText = spanElement.innerText;
  
    const modal = document.getElementById(modalID);
    const overlay = document.getElementById("overlay");
  
    closeAllSidebars();
  
    overlay.classList.add("active");
    modal.classList.add("active");
  }
  
  // Get all ability divs and corresponding descriptions
  const abilities = document.querySelectorAll(".ability");
  const abilityDescriptions = document.querySelectorAll(".abilityDescription");
  
  // Loop through each ability div
  abilities.forEach((ability, index) => {
    // Add event listener for mouseenter
    ability.addEventListener("mouseenter", () => {
      // Show the corresponding ability description
      const description = abilityDescriptions[index];
      description.style.display = "block";
  
      // Adjust the position of the description relative to the ability
      const rect = ability.getBoundingClientRect(); // Gets the size and position of the .ability  relative to the viewport
      description.style.top = `${rect.bottom}px`;
      description.style.left = `${rect.right - 45}px`;
    });
  
    // Add event listener for mouseleave (when mouse leaves div)
    ability.addEventListener("mouseleave", () => {
      // Hide all ability descriptions on mouse leave
      abilityDescriptions.forEach((desc) => {
        desc.style.display = "none";
      });
    });
  });
  
  // Increments item rank
  function incrementValue() {
    const input = document.getElementById("numberInput");
    let value = parseInt(input.value, 10);
    const max = input.max;
  
    if (isNaN(value)) {
      value = 0; // Default to 0 if value is NaN
    }
  
    // Increment the value
    value += 1;
  
    // Ensure the value stays within the range
    if (value > max) {
      value = max;
    }
  
    // Update the input value and spans
    input.value = value;
  
    updateSpanNumber(
      "maxCapacity",
      input.classList.contains("orokinActive") ? value * 2 : value
    );
    // If the orokin reactor is active, then the current value of the input (the number inside the item rank) is doubled.
    updateSpanNumber(
      "currentCapacity",
      input.classList.contains("orokinActive") ? value * 2 : value
    );
  }
  
  function decrementValue() {
    const input = document.getElementById("numberInput");
    let value = parseInt(input.value, 10);
    const min = input.min;
  
    if (isNaN(value)) {
      value = 0; // Default to 0 if value is NaN
    }
  
    // Decrement the value
    value -= 1;
  
    // Ensure the value stays within the range
    if (value < min) {
      value = min;
    }
  
    // Update the input value and spans
    input.value = value;
    updateSpanNumber(
      "maxCapacity",
      input.classList.contains("orokinActive") ? value * 2 : value
    );
  
    // If the orokin reactor is active, then the current value of the input (the number inside the item rank) is doubled.
    updateSpanNumber(
      "currentCapacity",
      input.classList.contains("orokinActive") ? value * 2 : value
    );
  }
  
  // When the user manually types in the input (item rank), this checks if the values are within the min and max range.
  function validateInput() {
    const input = document.getElementById("numberInput");
    let value = parseInt(input.value, 10);
    const max = input.max;
    const min = input.min;
  
    // Over the max = max
    if (value > max) {
      value = max;
      // Lower than the min = min
    } else if (value < min) {
      value = min;
    } else if (isNaN(value)) {
      value = 0; // Default to 0 if value is NaN
    }
    input.value = value;
    updateSpanNumber(
      "maxCapacity",
      input.classList.contains("orokinActive") ? value * 2 : value
    );
    updateSpanNumber(
      "currentCapacity",
      input.classList.contains("orokinActive") ? value * 2 : value
    );
  }
  
  function checkAndUpdateReactor() {
    const orokinReactorToggle = document.querySelector(".orokinReactorToggle");
    const input = document.getElementById("numberInput");
  
    if (orokinReactorToggle.classList.contains("active")) {
      input.classList.add("orokinActive");
    } else {
      input.classList.remove("orokinActive");
    }
  
    // Ensure the current value is within the new min and max range
    validateInput();
  }
  
  // Toggles the orokin reactor
  document
    .querySelector(".orokinReactorToggle")
    .addEventListener("click", function () {
      this.classList.toggle("active");
      checkAndUpdateReactor();
    });
  
  // When there is a change, checks if the orokin reactor is active
  document.addEventListener("DOMContentLoaded", checkAndUpdateReactor);
  
  // Toggles the Apply Conditonals
  document
    .querySelector(".conditionalToggle")
    .addEventListener("click", function () {
      this.classList.toggle("active");
    });