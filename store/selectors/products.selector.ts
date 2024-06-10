import { createSelector } from 'reselect';
import { iRootState } from '..';

export const selectProduct = (state: iRootState): ProductState['product'] => state.product.product
export const selectCategories = (state: iRootState) => state.products.categories
export const selectProducts = (state: iRootState) => state.products.products


const selectCategoryId = (state: iRootState, categoryId: string) => categoryId

export const selectCategoryById = createSelector(
    [selectCategories, selectCategoryId],
    (categories, categoryId) => categories.find((c: Category) => c._id === categoryId)
)

export const selectCategoriesProducts = createSelector(
    [selectProducts, selectCategoryId],
    (products, categoryId) => products.filter((product: ProductData) => product.category.find(c => c._id === categoryId))
)


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
