document.addEventListener("DOMContentLoaded", function () {
    const body = document.body;
    const text = document.querySelector(".trippy-text");
    const buttons = document.querySelectorAll(".trippy-btn");

    // Phase 1: Come-up (Faster Pulsing & Colors Shift)
    setTimeout(() => {
        body.style.animation = "backgroundPulse 1.5s infinite alternate ease-in-out";
        text.style.animation = "glitchText 0.1s infinite alternate, fractalGlow 3s infinite alternate ease-in-out";
    }, 2000);

    // Phase 2: The Breakthrough (Fractal Explosion)
    setTimeout(() => {
        body.classList.add("breakthrough");

        buttons.forEach(btn => {
            btn.style.animation = "none"; // Remove floating effect
            btn.style.transform = "scale(1.5) rotate(20deg)";
            btn.style.boxShadow = "0px 0px 50px red, 0px 0px 100px yellow";
        });

        text.style.transform = "scale(2) rotate(-5deg)";
        text.style.textShadow = "0px 0px 50px red, 0px 0px 100px yellow";

    }, 5000);

    // Phase 3: The Return (Smooth, Clean UI)
    setTimeout(() => {
        body.classList.remove("breakthrough");
        body.classList.add("peaceful");

        text.style.transition = "all 3s ease-in-out";
        text.style.textShadow = "none";
        text.style.color = "black";

        buttons.forEach(btn => {
            btn.style.transition = "all 3s ease-in-out";
            btn.style.background = "white";
            btn.style.color = "black";
            btn.style.boxShadow = "none";
            btn.style.transform = "scale(1)";
        });

    }, 9000);
});
