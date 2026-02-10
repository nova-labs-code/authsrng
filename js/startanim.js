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

      // Fade out the container AFTER the line animation ends
      container.style.transition = "opacity 1.2s ease";
      container.style.opacity = "0";

      container.addEventListener(
        "transitionend",
        () => container.remove(),
        { once: true }
      );
    }

    function startSequence() {
      text.style.display = "none";

      // STEP 1: horizontal expand
      line.classList.add("expand-horizontal");

      line.addEventListener("transitionend", function stepWidth(e) {
        if (e.propertyName !== "width") return;
        line.removeEventListener("transitionend", stepWidth);

        // STEP 2: vertical expand
        line.classList.add("expand-vertical");

        line.addEventListener("transitionend", function stepHeight(e) {
          if (e.propertyName !== "height") return;
          line.removeEventListener("transitionend", stepHeight);

          // STEP 3: fade line
          line.classList.add("fade-line");

          line.addEventListener(
            "animationend",
            () => {
              // Now fade out the container AFTER line animation finishes
              cleanup();
            },
            { once: true }
          );
        });
      });

      // Optional failsafe: in case events get skipped
      setTimeout(cleanup, 4000);
    }

    container.addEventListener("click", startSequence, { once: true });
    container.addEventListener("touchstart", startSequence, { once: true });
  });
})();