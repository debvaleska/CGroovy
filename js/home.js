$(document).ready(function() {
let currentSlide = 0;
const slides = $('.slider-container .slider-image');
const captions = $('.slider-container .slider-caption');
const totalSlides = slides.length;

function showSlide(index) {
    slides.eq(currentSlide).fadeOut(600);
    captions.eq(currentSlide).fadeOut(600);
    currentSlide = (index + totalSlides) % totalSlides;
    slides.eq(currentSlide).fadeIn(600);
    captions.eq(currentSlide).fadeIn(600);
}

if (totalSlides > 0) {
    slides.eq(0).css('display', 'block');
    captions.eq(0).css('display', 'block');
}


$('#nextSlide').click(function() {
    if (totalSlides > 0) showSlide(currentSlide + 1);
});

$('#prevSlide').click(function() {
        if (totalSlides > 0) showSlide(currentSlide - 1);
});

if (totalSlides > 1) {
    setInterval(function() {
        showSlide(currentSlide + 1);
    }, 5000);
}
});