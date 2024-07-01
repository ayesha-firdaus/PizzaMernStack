import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartitems: []
};

const CartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addCart(state, action) {
      const item = state.cartitems.find((item) => item.id === action.payload.id);
      if (!item) {
        state.cartitems.push({
          ...action.payload.items, 
          quantity: 1, 
          totalprice: action.payload.items.price
        });
      } else {
        item.quantity++;
        item.totalprice = item.quantity * item.price;
      }
    },
    deletePizza(state, action) {
      state.cartitems = state.cartitems.filter((item) => item.id !== action.payload);
    },
    increaseItem(state, action) {
      const item = state.cartitems.find((el) => el.id === action.payload);
      if (item) {
        item.quantity++;
        item.totalprice = item.quantity * item.price;
      }
    },
    decreaseItem(state, action) {
      const item = state.cartitems.find((el) => el.id === action.payload);
      if (item) {
        item.quantity--;
        item.totalprice = item.quantity * item.price;
        if (item.quantity === 0) {
          state.cartitems = state.cartitems.filter((el) => el.id !== action.payload);
        }
      }
    },
    clearCart(state) {
      state.cartitems = [];
    }
  }
});

export const { addCart, deletePizza, increaseItem, decreaseItem, clearCart } = CartSlice.actions;
export default CartSlice.reducer;
export const getCart=(state)=>{
return state.cart.cartitems;
}
export const getQunatityById=(id)=>(state)=>{
  return state.cart.cartitems.find(item=>item.id===id)?.quantity??0;
  
}
export const getTotalQuantity=state=>{
  return state.cart.cartitems.reduce((acc,el)=>acc+el.quantity,0);

}
export const getTotalPrice=state=>{
  return state.cart.cartitems.reduce((acc,el)=>acc+el.totalprice,0)
}