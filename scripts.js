let currentExpanded = null;
let modal = document.getElementById("modal");
function expandTab(clickedTab) {
  // Get all columns and tool headers
  const gallery = document.querySelector(".gallery");
  const line = document.getElementById("line");
  const columns = gallery.querySelectorAll(".gallery-column");
  const tabs = gallery.querySelectorAll(".tool-header");

  // Find index of clicked tab
  let clickedIndex = -1;
  tabs.forEach((tab, i) => {
    if (tab === clickedTab) clickedIndex = i;
  });
  if (clickedIndex === -1) return;

  // If clicked the currently expanded tab, reset all to default 50/50
  if (currentExpanded === clickedIndex) {
    currentExpanded = null;
    columns.forEach((col) => {
      col.classList.remove("expanded", "collapsed");
      col.querySelector(".masonry").classList.remove("expanded");
      col.querySelector(".masonry").classList.add("normal");
    });
    tabs.forEach((tab) => {
      tab.classList.remove("collapsed");
    });
    line.classList.add("fade");
    void line.offsetWidth; // force reflow
    line.classList.add("show");
    return;
  }

  // Otherwise expand clicked, collapse others
  currentExpanded = clickedIndex;
  line.classList.remove("fade", "show");
  columns.forEach((col, i) => {
    if (i === clickedIndex) {
      col.querySelector(".masonry").classList.add("expanded");
      col.querySelector(".masonry").classList.remove("normal");
      col.classList.add("expanded");
      col.classList.remove("collapsed");
    } else {
      col.querySelector(".masonry").classList.remove("expanded");
      col.querySelector(".masonry").classList.add("normal");
      col.classList.add("collapsed");
      col.classList.remove("expanded");
    }
  });
  tabs.forEach((tab, i) => {
    if (i === clickedIndex) {
      tab.classList.remove("collapsed");
    } else {
      tab.classList.add("collapsed");
    }
  });
}

// Reset to 50/50 on clicking outside of any tool-header
document.addEventListener("click", (e) => {
  if (!e.target.closest(".tool-header")) {
    if (currentExpanded !== null) {
      currentExpanded = null;
      const gallery = document.querySelector(".gallery");
      const columns = gallery.querySelectorAll(".gallery-column");
      const tabs = gallery.querySelectorAll(".tool-header");

      columns.forEach((col) => {
        col.classList.remove("expanded", "collapsed");
      });
      tabs.forEach((tab) => {
        tab.classList.remove("collapsed");
      });
    }
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const images = document.querySelectorAll(".masonry img, .img-container img");
  const hoverImages = document.querySelectorAll(".img-container");

  images.forEach((img) => {
    img.addEventListener("click", (e) => {
      e.stopPropagation();
      showImageFull(img.src);
    });
  });
  let modalImg = document.getElementById("modalImg");
  function showImageFull(src) {
    modal.style.display = "flex";
    modalImg.src = src;
  }
});
modal.addEventListener("click", () => {
  closeModal();
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeModal();
  }
});

function closeModal() {
  setTimeout(() => {
    modal.style.display = "none";
  }, 25);
}
function copyDiscord() {
  navigator.clipboard.writeText("fireninja.");

  const popup = document.getElementById("popup");
  popup.classList.add("show");

  setTimeout(() => {
    popup.classList.remove("show");
  }, 1000);
}
