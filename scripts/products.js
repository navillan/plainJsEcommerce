
const $productsWrapper = $('.products-wrapper');
const $categoriesWrapper = $('.categories-wrapper');
const $searchInput = $('.search-input');
const $categoryButton = $('.category-button');
const $itemCards = $('.item-card')
const myCard = JSON.parse(localStorage.getItem('cart')) || [];

$.ajax({
  url: "https://dummyjson.com/products",
  method: "GET",
  success: (data) => {
    $.each(data.products, (_, item) => {
      const itemCategory = item.category;
      const $card = $('<div>', {
        class: "item-card",
        "data-category": itemCategory,
        html: `
          <div class="item-stars">${renderStars(item.rating)}</div>
          <div class="item-rating">★${item.rating}</div>
          <div class="item-image" style="background-image: url('${item.thumbnail}')"></div>
          <div class="item-title">${item.title}</div>
          <div class="item-price">$${item.price}</div>
          <button class="add-to-cart-button" data-product-id="${item.id}">Add to Cart</button>
        `
      });
      $card.find('.add-to-cart-button').on('click', function() {
        addToCart(item);
      });
      $productsWrapper.append($card);
    });
    $.each(data.products, (_, item) => {
      const category = item.category;
      if ($categoriesWrapper.find(`[data-category='${category}']`).length === 0) {
        const $categoryElement = $('<div>', {          
          class: "category-button",
          "data-category": category,
          text: category.toUpperCase()
        });
        $categoryElement.on('click', function() {filterByCategoryButton(this)})
        $categoriesWrapper.append($categoryElement);
      }
    });
  },
  error: (error) => {
    console.error("API error:", error);
  }
});

function filterByCategoryButton(categoryElement) {
  const selectedCategory = $(categoryElement).data('category');
  $('.item-card').each(function() {
    if ($(this).data('category') !== selectedCategory) {
      $(this).addClass('item-card-invisible');
    } else {
      $(this).removeClass('item-card-invisible');
    }
  });
};

function clearCategoryFilter() {
  $('.item-card').each(function() {
    $(this).removeClass('item-card-invisible')
  });
};

function renderStars(rating) {
  const productRating = Math.round(rating);
  const finalRating = "★".repeat(productRating) + "☆".repeat(5 - productRating);
  return finalRating;
};

function addToCart(item) {
  const cartItem = myCard.find(card => card.itemName === item.title);
  if (cartItem) {
    cartItem.itemQuantity += 1;
  } else {
    myCard.push({ itemName: item.title, itemQuantity: 1, itemPrice: item.price });
  }
  console.log(myCard);
  localStorage.setItem('cart', JSON.stringify(myCard));
}