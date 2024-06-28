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
