document.addEventListener("DOMContentLoaded", () => {
  const assets = document.querySelectorAll(
    ".main-column img, .main-column video"
  );
  const percentText = document.getElementById("percent");
  const progressBar = document.getElementById("progress-bar");
  const loader = document.getElementById("loading-screen");
  const btnTop = document.getElementById("back-to-top");

  let loadedCount = 0;
  const totalAssets = assets.length;

  function assetLoaded() {
    loadedCount++;
    let progress = Math.round((loadedCount / totalAssets) * 100);
    percentText.innerText = progress + "%";
    progressBar.style.width = progress + "%";

    if (loadedCount >= totalAssets) {
      setTimeout(() => {
        loader.style.opacity = "0";
        setTimeout(() => (loader.style.display = "none"), 800);
      }, 1000);
    }
  }

  assets.forEach((asset) => {
    if (asset.tagName === "IMG") {
      if (asset.complete) assetLoaded();
      else {
        asset.onload = assetLoaded;
        asset.onerror = assetLoaded;
      }
    } else if (asset.tagName === "VIDEO") {
      asset.oncanplaythrough = assetLoaded;
      asset.onerror = assetLoaded;
    }
  });

  window.onscroll = () => {
    btnTop.style.display = window.scrollY > 800 ? "block" : "none";
  };
  btnTop.onclick = () => window.scrollTo({ top: 0, behavior: "smooth" });
});
