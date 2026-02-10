(function () {
  window.addEventListener("DOMContentLoaded", () => {
    /* ========= DOM ========= */
    const container = document.createElement("div");
    container.className = "entry-container";
    container.innerHTML = `
      <div class="center-line"></div>
      <div class="tap-text">click/tap to wake up</div>
    `;
    document.body.appendChild(container);

    const line = container.querySelector(".center-line");
    const text = container.querySelector(".tap-text");

    /* ========= SEQUENCE ========= */
    function startSequence() {
      text.style.display = "none";

      // STEP 1 — horizontal expand
      line.classList.add("expand-horizontal");

      line.addEventListener(
        "transitionend",
        function onHorizontal(e) {
          if (e.propertyName !== "width") return;
          line.removeEventListener("transitionend", onHorizontal);

          // STEP 2 — vertical expand
          line.classList.add("expand-vertical");

          line.addEventListener(
            "transitionend",
            function onVertical(e) {
              if (e.propertyName !== "height") return;
              line.removeEventListener("transitionend", onVertical);

              // STEP 3 — fade line
              line.classList.add("fade-line");

              line.addEventListener(
                "animationend",
                function onFade() {
                  line.removeEventListener("animationend", onFade);

                  // STEP 4 — fade out container
                  container.style.opacity = "0";
                  container.addEventListener(
                    "transitionend",
                    () => container.remove(),
                    { once: true }
                  );
                }
              );
            }
          );
        }
      );
    }

    /* ========= INPUT ========= */
    container.addEventListener("click", startSequence, { once: true });
    container.addEventListener("touchstart", startSequence, { once: true });
  });
})();