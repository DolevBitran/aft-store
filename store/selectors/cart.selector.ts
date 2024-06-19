import { createSelector } from 'reselect';
import { iRootState } from '..';

export const selectCart = (state: iRootState): CartState['cartItems'] => state.cart.cartItems
export const selectCartArray = createSelector(
    selectCart,
    (cart: CartState['cartItems']) => cart ? Object.values(cart) : cart
)
