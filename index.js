const carouselMain = $('.carousel-frame');
let currentOffset = 0;
const moveAmount = 120;

function updateCarousel() {
  carouselMain.css('transform', `translateX(${currentOffset}px)`);
}

function leftArrow() {
  currentOffset += moveAmount;
  updateCarousel();
}

function rightArrow() {
  currentOffset -= moveAmount;
  updateCarousel();
}

function resetCarousel() {
  carouselMain.css('transform', `translateX(0)`);
}