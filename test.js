((self) => {
  const classes = {
    style:"mrt-ins-custom-style",
    title: "mrt-ins-preview-title",
    mainCarouselWrapper: "main-carousel-wrapper",
    leftArrow: "left-arrow",
    rightArrow: "right-arrow",
    leftCarouselBlock: "left-carousel-block",
    rightCarouselBlock: "right-carousel-block",
    carouselFrame: "carousel-frame",
    itemCard: "item-card",
    itemImage: "item-image",
    itemPrice: "item-price",
    itemRating: "item-rating",
    itemTitle: "item-title"
  };

  const selectors = Object.keys(classes).reduce((createdSelector, key) => {
    createdSelector[key] = `.${classes[key]}`;
    return createdSelector;
  }, {});

  self.init = () => {
    !window.jQuery ? 
      self.loadJquery() :
      (self.onreset(), self.buildCss(), self.buildCarouselHtml(), self.carouselEvents())
  };

  self.loadJquery = () => {
    const script = document.createElement("script");
    script.src = "https://code.jquery.com/jquery-3.7.1.min.js";
    script.onload = () => {
      self.init();
    };
    document.head.appendChild(script);
  };

  self.onreset = () => {
    const { style } = selectors;
    $(style).remove();
   }

  self.buildCss = () => {
     const { style } = classes;
     const { 
      mainCarouselWrapper, 
      leftArrow, 
      rightArrow, 
      leftCarouselBlock, 
      rightCarouselBlock, 
      carouselFrame, 
      itemCard, 
      itemRating, 
      itemImage, 
      itemTitle, 
      itemPrice 
    } = selectors;


    const customStyle = `
     <style class="${style}">
      $("head").append(customStyle)
      ${mainCarouselWrapper} {
        position: relative;
        margin: 20px auto;
        width: 800px;
        display: flex;
        flex-direction: row;
        justify-content: center;
        overflow: hidden;
        gap: 30px;
      }
      ${leftArrow}, ${rightArrow} {
        position: absolute;
        cursor: pointer;
        user-select: none;
        padding: 0 15px;
        color: #333;
        font-size: 20px;
        transition: all 0.2s ease;
      }
      ${leftArrow}:hover, ${rightArrow}:hover {
        text-shadow: rgb(27, 27, 27) 0 0 3px;
        font-size: 26px;
      }
      ${leftArrow} {
        left: 2%;
        top: 50%;
        transform: translateY(-50%);
        z-index: 2;
      }
      ${rightArrow} {
        right: 2%;
        top: 50%;
        transform: translateY(-50%);
        z-index: 2;
      }

      ${rightCarouselBlock}, ${leftCarouselBlock} {
        width: 70px;
        height: 250px;
        background-color: #f4f4f4;
        position: absolute;
        z-index: 1;
      }
      ${leftCarouselBlock} {
        left: 0;
        top: 50%;
        transform: translateY(-50%);
      }
      ${rightCarouselBlock} {
        right: 0;
        top: 50%;
        transform: translateY(-50%);
      }

      ${carouselFrame} {
        display: flex;
        gap: 20px;
        pointer-events: none;
        transition: all 0.5s ease;
      }
      ${itemCard} {
        position: relative;
        display: flex;
        flex-direction: column;
        min-width: 140px;
        background-color: #fff;
        border: 1px solid #ddd;
        border-radius: 4px;
        padding: 8px;
        box-sizing: border-box;
        text-align: center;
      }
      ${itemRating} {
        position: absolute;
        top: 5px;
        right: 5px;
        color: #ffcc00;
        font-size: 10px;
      }
      ${itemImage} {
        width: 60px;
        height: 60px;
        background-size: cover;
        background-position: center;
        background-color: #cccccc;
        margin: 8px auto 10px auto;
      }
      ${itemTitle} {
        font-size: 14px;
        font-weight: bold;
        margin-bottom: 5px;
        color: #333;
      }
      ${itemPrice} {
        font-size: 14px;
        color: #e91e63;
        margin-top: auto;
        font-weight: bold;
      }
     </style>
    `
    $("head").append(customStyle)
  }

  self.buildCarouselHtml = () => {
    const {
      mainCarouselWrapper,
      leftArrow,
      leftCarouselBlock,
      carouselFrame,
      rightCarouselBlock,
      rightArrow
    } = classes;

     const carouselHtml = `
     <div class="${mainCarouselWrapper}">
        <div class="${leftArrow}">←</div>
        <div class="${leftCarouselBlock}"></div>
        <div class="${carouselFrame}"></div>
        <div class="${rightCarouselBlock}"></div>
        <div class="${rightArrow}">→</div>
      </div>`;
    $("body").append(carouselHtml);
  }

  self.carouselEvents = () => {
    //dummy product data
    $.ajax({
      url: "https://dummyjson.com/products",
      method: "GET",
      success: (data) => {
        const products = data.products;
        products.forEach((item) => {
        $(".carousel-frame").append(`<div class="item-card">
          <div class="item-rating">★${item.rating}</div>
          <div class="item-image" style="background-image: url('${item.thumbnail}')"></div>
          <div class="item-title">${item.title}</div>
          <div class="item-price">$${item.price}</div>
          </div>`);
      });
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

    $('.left-arrow').on('click', leftArrow);
    $('.right-arrow').on('click', rightArrow);
    $('.main-carousel-wrapper').on('mouseleave', resetCarousel);
  };  

  self.init()
})(window);