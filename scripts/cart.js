
const myCard = JSON.parse(localStorage.getItem('cart')) || [];
const $cartWrapper = $('.cart-items-wrapper')

$(function() {
  if(myCard.length <= 0) {
    $cartWrapper.text('your cart is empty')
  } else {
    myCard.forEach((item) => {
      const $cardItem = $('<div>', {
        class: "card-item",
        html:`
        <div>${item.itemName}</div>
        <div>${item.itemQuantity}</div>
        <div>x</div>
        <div>${item.itemPrice}</div>        
        <div class="total-price">$${totalPrice(item.itemQuantity, item.itemPrice)}</div>
        `
      });
      $cartWrapper.append($cardItem);
    })
  }
})

function totalPrice(itemQuantity, itemPrice) {
  return itemQuantity * itemPrice
}