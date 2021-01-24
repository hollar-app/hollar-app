
export function getLocalStorageCartItems(){
  var cartCurrent = localStorage.getItem("hollar-cart");
  if (cartCurrent === null || cartCurrent === "" || cartCurrent === "null") {
    cartCurrent = [];
    localStorage.setItem("hollar-cart", JSON.stringify(cartCurrent));
    cartCurrent = localStorage.getItem("hollar-cart");
  }
  cartCurrent = JSON.parse(cartCurrent);
  return cartCurrent;
}

export function setLocalStorageCartItems(cartCurrent){
  localStorage.setItem("hollar-cart", JSON.stringify(cartCurrent));
}

