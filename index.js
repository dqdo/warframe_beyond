function modsToggleButtonAnimation() {
  const svg = document.getElementById("anyPolarity");
  const paths = svg.getElementsByTagName("path");
  svg.classList.toggle("rotatedAnyPolarity");
  for (let i = 0; i < paths.length; i++) {
    if (paths[i].getAttribute("fill") === "#FF0000") {
      paths[i].setAttribute("fill", "#00FF00");
    } else {
      paths[i].setAttribute("fill", "#FF0000");
    }
  }
}
