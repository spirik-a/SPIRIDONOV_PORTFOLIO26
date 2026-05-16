// ==========================================
// 1. ЗАХИСТ КОНТЕНТУ (ANTI-THEFT) — ФІНАЛЬНИЙ
// ==========================================

// Блокування контекстного меню (правої кнопки миші)
document.addEventListener("contextmenu", function (e) {
  e.preventDefault();
});

// Блокування гарячих клавіш за фізичними кодами (Windows, Linux, macOS)
document.addEventListener(
  "keydown",
  function (e) {
    const isCmdOrCtrl = e.ctrlKey || e.metaKey;
    const isShift = e.shiftKey;
    const isAlt = e.altKey;

    // 1. Блокуємо F12
    if (e.code === "F12" || e.keyCode === 123) {
      e.preventDefault();
      e.stopPropagation();
      return false;
    }

    // 2. Блокуємо Ctrl+S / Cmd+S (Збереження всієї сторінки)
    if (isCmdOrCtrl && e.code === "KeyS") {
      e.preventDefault();
      e.stopPropagation();
      return false;
    }

    // 3. Блокуємо Ctrl+P / Cmd+P (Друк сторінки або збереження в PDF)
    if (isCmdOrCtrl && e.code === "KeyP") {
      e.preventDefault();
      e.stopPropagation();
      return false;
    }

    // 4. Блокуємо Ctrl+U / Cmd+U (Перегляд вихідного коду сторінки)
    if (isCmdOrCtrl && e.code === "KeyU") {
      e.preventDefault();
      e.stopPropagation();
      return false;
    }

    // 5. Блокуємо Ctrl+Shift+I, Ctrl+Shift+C, Ctrl+Shift+J (Інструменти розробника)
    if (
      isCmdOrCtrl &&
      (e.code === "KeyI" || e.code === "KeyC" || e.code === "KeyJ")
    ) {
      if (isShift || isAlt) {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }
    }
  },
  true
); // Режим true перехоплює подію до її обробки браузером

// ==========================================
// 2. ЛОГІКА ЛОАДЕРА ТА КНОПКИ "ВГОРУ"
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
  const images = document.querySelectorAll("img");
  const videos = document.querySelectorAll("video");
  const percentEl = document.getElementById("percent");
  const progressBar = document.getElementById("progress-bar");
  const loadingScreen = document.getElementById("loading-screen");
  const backToTopBtn = document.getElementById("back-to-top");

  let totalAssets = images.length + videos.length;
  let loadedAssets = 0;

  function updateProgress() {
    loadedAssets++;
    let percent = Math.round((loadedAssets / totalAssets) * 100);

    if (percentEl) percentEl.textContent = `${percent}%`;
    if (progressBar) progressBar.style.width = `${percent}%`;

    if (loadedAssets >= totalAssets) {
      setTimeout(() => {
        if (loadingScreen) {
          loadingScreen.style.opacity = "0";
          loadingScreen.style.visibility = "hidden";
        }
        document.body.classList.remove("loading");
      }, 500);
    }
  }

  if (images.length === 0 && videos.length === 0) {
    if (percentEl) percentEl.textContent = "100%";
    if (progressBar) progressBar.style.width = "100%";
    setTimeout(() => {
      if (loadingScreen) {
        loadingScreen.style.opacity = "0";
        loadingScreen.style.visibility = "hidden";
      }
      document.body.classList.remove("loading");
    }, 500);
  } else {
    images.forEach((img) => {
      if (img.complete) {
        updateProgress();
      } else {
        img.addEventListener("load", updateProgress);
        img.addEventListener("error", updateProgress);
      }
    });

    videos.forEach((video) => {
      if (video.readyState >= 3) {
        updateProgress();
      } else {
        video.addEventListener("canplaythrough", updateProgress);
        video.addEventListener("error", updateProgress);
      }
    });
  }

  // Логіка кнопки "Вгору"
  window.addEventListener("scroll", () => {
    if (window.scrollY > 800) {
      if (backToTopBtn) backToTopBtn.style.display = "flex";
    } else {
      if (backToTopBtn) backToTopBtn.style.display = "none";
    }
  });

  if (backToTopBtn) {
    backToTopBtn.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  }
});
