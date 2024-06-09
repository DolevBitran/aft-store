import { createSelector } from 'reselect';
import { iRootState } from '..';

export const getCategories = (state: iRootState): ProductsState['categories'] => state.products.categories
export const getProducts = (state: iRootState): ProductsState['products'] => state.products.products.reverse()
export const getProduct = (state: iRootState): ProductState['product'] => state.product.product


// export const getRoom = (state: iRootState): IRoom => ({
// 	id: state.room.id,
// 	name: state.room.name,
// 	guests: state.room.guests,
// 	roundsHistory: state.room.roundsHistory,
// 	options: state.room.options,
// });


// chained selector example
// export const getRoute = createSelector(
//     getTrail,
//     (trialObj: MapState['trail']) => trialObj && ROUTES[trialObj.trail]
// )
