const myCard = JSON.parse(localStorage.getItem('cart')) || [];
//dummy product data
$.ajax({
  url: "https://dummyjson.com/products",
  method: "GET",
  success: (data) => {
    const products = data.products;
    products.forEach((item) => {
    $carouselMain.append(`
      <div class="item-card">
       <div class="item-rating">★${item.rating}</div>
       <div class="item-image" style="background-image: url('${item.thumbnail}')"></div>
       <div class="item-title">${item.title}</div>
       <div class="item-price">$${item.price}</div>
      </div>
      `);
    });
    products.slice(12, 16).forEach((item) => {
      $mainFeaturedItems.append(`
        <div class="featured-product-item-route">        
          <div class="featured-product-image" style="background-image: url('${item.thumbnail}')"></div>
          <div class="featured-product-title">${item.title}</div>
          <div class="featured-product-description">${item.description}</div>
        </div>
      `)
    })
  },
  error: (error) => {
    console.error("API error:", error);
  }
});



//Carousel
const $carouselMain = $('.carousel-frame');
let currentOffset = 0;
const moveAmount = 160;

function updateCarousel() {
  $carouselMain.css('transform', `translateX(${currentOffset}px)`);
}

function leftArrow() {
  currentOffset += moveAmount;
  if(currentOffset > 2080) {
    currentOffset = -2080;
  }
  updateCarousel();
}

function rightArrow() {
  currentOffset -= moveAmount;
  if(currentOffset < -2080) {
    currentOffset = 2080;
  }
  updateCarousel();
}

function resetCarousel() {
  currentOffset = 0;
  $carouselMain.css('transform', `translateX(0)`);
}

//
const $mainFeaturedItems = $('.main-featured-item-cards');