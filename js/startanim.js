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

    function startSequence() {
      text.style.display = "none";

      // STEP 1: horizontal
      line.classList.add("expand-horizontal");

      line.addEventListener("transitionend", function step1(e) {
        if (e.target !== line || e.propertyName !== "width") return;
        line.removeEventListener("transitionend", step1);

        // STEP 2: vertical
        line.classList.add("expand-vertical");

        line.addEventListener("transitionend", function step2(e) {
          if (e.target !== line || e.propertyName !== "height") return;
          line.removeEventListener("transitionend", step2);

          // STEP 3: fade line
          line.classList.add("fade-line");

          line.addEventListener("animationend", function step3() {
            line.removeEventListener("animationend", step3);

            // STEP 4: fade container
            requestAnimationFrame(() => {
              container.style.opacity = "0";
            });

            container.addEventListener(
              "transitionend",
              function cleanup(e) {
                if (e.target !== container || e.propertyName !== "opacity") return;
                container.remove();
              },
              { once: true }
            );
          });
        });
      });
    }

    container.addEventListener("click", startSequence, { once: true });
    container.addEventListener("touchstart", startSequence, { once: true });
  });
})();