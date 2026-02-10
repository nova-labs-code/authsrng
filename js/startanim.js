(function () {
  window.addEventListener("DOMContentLoaded", () => {
    const container = document.createElement("div");
    container.className = "entry-container";
    container.innerHTML = `
      <div class="center-line"></div>
      <div class="tap-text">click/tap to wake up</div>
    `;
    document.body.appendChild(container);

    const line = container.querySelector(".center-line");
    const text = container.querySelector(".tap-text");

    let finished = false;

    function cleanup() {
      if (finished) return;
      finished = true;

      container.style.pointerEvents = "none";
      container.style.opacity = "0";

      setTimeout(() => {
        container.remove();
      }, 1300); // matches CSS fade
    }

    function startSequence() {
      text.style.display = "none";

      // horizontal
      line.classList.add("expand-horizontal");

      line.addEventListener("transitionend", function w(e) {
        if (e.propertyName !== "width") return;
        line.removeEventListener("transitionend", w);

        // vertical
        line.classList.add("expand-vertical");

        line.addEventListener("transitionend", function h(e) {
          if (e.propertyName !== "height") return;
          line.removeEventListener("transitionend", h);

          // fade line
          line.classList.add("fade-line");

          line.addEventListener(
            "animationend",
            () => cleanup(),
            { once: true }
          );
        });
      });

      // 🔒 absolute failsafe (matches authsrng)
      setTimeout(cleanup, 4000);
    }

    container.addEventListener("click", startSequence, { once: true });
    container.addEventListener("touchstart", startSequence, { once: true });
  });
})();