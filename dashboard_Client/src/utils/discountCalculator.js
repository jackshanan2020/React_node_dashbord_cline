export const discountCalculator = (discount, amount) => {
  return discount && discount > 0
    ? Math.round(amount - amount * (discount / 100))
    : amount;
};
/*
export const calculateCartGrandTotal = (cart) => {
 
  let total=0;
  for (let i = 0; i < cart.length; i++) {
    total +=discountCalculator(cart[i].discount, (cart[i].price * cart[i].quantity))   
  }
  return total;
};
 */