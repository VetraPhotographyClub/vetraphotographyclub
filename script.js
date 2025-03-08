document.addEventListener("DOMContentLoaded", function () {
    const fadeIns = document.querySelectorAll(".fade-in");
    const slides = document.querySelectorAll(".slide-in");
    const morphingShape = document.getElementById("morphingShape");

    // Smooth scroll fade-ins
    function handleScroll() {
        fadeIns.forEach(element => {
            let rect = element.getBoundingClientRect();
            if (rect.top < window.innerHeight * 0.85) {
                element.style.opacity = "1";
                element.style.transform = "translateY(0)";
            }
        });

        slides.forEach(element => {
            let rect = element.getBoundingClientRect();
            if (rect.top < window.innerHeight * 0.85) {
                element.style.opacity = "1";
                element.style.transform = "translateX(0)";
            }
        });
    }

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    // Morphing Effect
    const morphPaths = [
        "M300,100C380,110,480,190,480,300C480,410,380,490,300,500C220,490,120,410,120,300C120,190,220,110,300,100Z",
        "M320,120C390,130,490,210,490,320C490,430,390,500,320,520C250,500,150,430,150,320C150,210,250,130,320,120Z",
        "M280,80C360,90,460,180,460,290C460,400,360,470,280,480C200,470,100,400,100,290C100,180,200,90,280,80Z"
    ];

    let morphIndex = 0;

    function morphShape() {
        morphingShape.querySelector("path").setAttribute("d", morphPaths[morphIndex]);
        morphIndex = (morphIndex + 1) % morphPaths.length;
    }

    setInterval(morphShape, 3000);
});
