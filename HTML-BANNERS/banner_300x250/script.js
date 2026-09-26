// =========================================================
// HTML5 BANNER CLICKTAG & INTERACTIVITY SCRIPT
// Google Ads / Display & Video 360 (DV360) Compatible
// =========================================================

document.addEventListener("DOMContentLoaded", function () {
    // 1. Отримуємо елемент банера
    var banner = document.getElementById("banner");

    // 2. Безпечне зчитування змінної clickTag
    // У разі якщо рекламний сервер передає параметр через URL query
    function getClickTagUrl() {
        var match = window.location.search.match(/[?&]clicktag=([^&]+)/i);
        if (match) {
            return decodeURIComponent(match[1]);
        }
        return window.clickTag || "https://spirik-a.github.io/SPIRIDONOV_PORTFOLIO26/";
    }

    // 3. Обробник кліку по банеру
    if (banner) {
        banner.addEventListener("click", function (e) {
            e.preventDefault();
            var targetUrl = getClickTagUrl();
            
            // Відкриваємо посилання у новому вікні відповідно до вимог Google Display Network
            window.open(targetUrl, "_blank");
        });
    }

    // 4. Додаткова мікро-взаємодія при наведенні (Hover effect)
    var ctaBtn = document.querySelector(".cta-btn");
    if (banner && ctaBtn) {
        banner.addEventListener("mouseenter", function () {
            ctaBtn.style.transform = "scale(1.08)";
            ctaBtn.style.transition = "transform 0.2s ease-in-out";
        });

        banner.addEventListener("mouseleave", function () {
            ctaBtn.style.transform = "scale(1)";
        });
    }
});