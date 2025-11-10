
const $productsWrapper = $('.products-wrapper');
const $categoriesWrapper = $('.categories-wrapper');
const $searchInput = $('.search-input');

$.ajax({
  url: "https://dummyjson.com/products",
  method: "GET",
  success: (data) => {
    $.each(data.products, (_, item) => {
      const $card = $('<div>', {
        class: "item-card",
        html: `
          <div class="item-rating">★${item.rating}</div>
          <div class="item-image" style="background-image: url('${item.thumbnail}')"></div>
          <div class="item-title">${item.title}</div>
          <div class="item-price">$${item.price}</div>
          <button class="add-to-cart-button" data-product-id="${item.id}">Add to Cart</button>
        `
      });
      $productsWrapper.append($card);
    });
    $.each(data.products, (_, item) => {
      const category = item.category;
      if ($categoriesWrapper.find(`[data-category='${category}']`).length === 0) {
        const $categoryElement = $('<div>', {
          class: "category-item",
          "data-category": category,
          text: category.toUpperCase()
        });
        $categoriesWrapper.append($categoryElement);
      }
    });
  },
  error: (error) => {
    console.error("API error:", error);
  }
});