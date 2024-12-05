const slider = document.querySelector('.slider');
const slides = Array.from(slider.querySelectorAll('img'));
const slideCount = slides.length;
const slideWidth = 100; // 100%
let currentIndex = 0;

function updateSliderPosition() {
    slider.style.transform = `translateX(-${currentIndex * slideWidth}%)`;
}

function moveToNextSlide() {
    currentIndex = (currentIndex + 1) % slideCount;
    updateSliderPosition();
}

function moveToPrevSlide() {
    currentIndex = (currentIndex - 1 + slideCount) % slideCount;
    updateSliderPosition();
}

// Set initial position
updateSliderPosition();

// Automatic transition
let intervalId = setInterval(moveToNextSlide, 5000);

// Pause on hover
slider.addEventListener('mouseenter', () => {
    clearInterval(intervalId);
});

// Resume on mouse leave
slider.addEventListener('mouseleave', () => {
    intervalId = setInterval(moveToNextSlide, 5000);
});

// Navigation buttons
document.querySelector('.prev-btn').addEventListener('click', moveToPrevSlide);
document.querySelector('.next-btn').addEventListener('click', moveToNextSlide);

// Responsive image loading
function loadAppropriateImages() {
    const width = window.innerWidth;
    slides.forEach((slide, index) => {
        let imageSize;
        if (width <= 480) {
            imageSize = '300x200';
        } else if (width <= 768) {
            imageSize = '500x300';
        } else {
            imageSize = '800x400';
        }
        slide.src = `/placeholder.svg?height=${imageSize.split('x')[1]}&width=${imageSize.split('x')[0]}`;
        slide.alt = `Modern Scene ${index + 1}`;
    });

    const gridItems = document.querySelectorAll('.grid-item img');
    gridItems.forEach((img, index) => {
        let imageSize;
        if (width <= 480) {
            imageSize = '150x150';
        } else if (width <= 768) {
            imageSize = '200x200';
        } else {
            imageSize = '300x300';
        }
        img.src = `/placeholder.svg?height=${imageSize.split('x')[0]}&width=${imageSize.split('x')[1]}`;
        img.alt = `Modern Image ${index + 1}`;
    });
}

// Initial load and resize event
loadAppropriateImages();
window.addEventListener('resize', loadAppropriateImages);
