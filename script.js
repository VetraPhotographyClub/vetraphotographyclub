document.addEventListener("DOMContentLoaded", function () {
    const orb = document.getElementById("dragObject");
    const door = document.getElementById("door");
    const goal = document.getElementById("goal");

    let isDragging = false;
    let offsetX, offsetY;
    let isDoorHeld = false;

    // Enable door holding with second touch or mouse
    door.addEventListener("mousedown", () => isDoorHeld = true);
    door.addEventListener("mouseup", () => isDoorHeld = false);
    door.addEventListener("touchstart", (e) => {
        e.preventDefault();
        isDoorHeld = true;
    });
    door.addEventListener("touchend", () => isDoorHeld = false);

    // Dragging mechanics
    orb.addEventListener("mousedown", (e) => startDrag(e));
    orb.addEventListener("touchstart", (e) => startDrag(e.touches[0]));

    function startDrag(e) {
        isDragging = true;
        offsetX = e.clientX - orb.getBoundingClientRect().left;
        offsetY = e.clientY - orb.getBoundingClientRect().top;
    }

    document.addEventListener("mousemove", (e) => drag(e));
    document.addEventListener("touchmove", (e) => drag(e.touches[0]));

    function drag(e) {
        if (!isDragging) return;
        orb.style.left = `${e.clientX - offsetX}px`;
        orb.style.top = `${e.clientY - offsetY}px`;

        checkWinCondition();
    }

    document.addEventListener("mouseup", () => isDragging = false);
    document.addEventListener("touchend", () => isDragging = false);

    function checkWinCondition() {
        const orbRect = orb.getBoundingClientRect();
        const goalRect = goal.getBoundingClientRect();
        const doorRect = door.getBoundingClientRect();

        // Check if the orb is inside the goal **and** the door is held open
        if (
            orbRect.left > goalRect.left &&
            orbRect.right < goalRect.right &&
            orbRect.top > goalRect.top &&
            orbRect.bottom < goalRect.bottom &&
            isDoorHeld
        ) {
            completePuzzle();
        }

        // If door is NOT held, block passage
        if (!isDoorHeld && orbRect.bottom > doorRect.top) {
            orb.style.top = `${doorRect.top - 45}px`; // Push it back
        }
    }

    function completePuzzle() {
        document.body.style.transition = "all 1.5s ease-in-out";
        document.body.style.background = "white";
        
        setTimeout(() => {
            window.location.href = "home.html"; // Change to your actual homepage
        }, 1000);
    }
});
