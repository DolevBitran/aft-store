import { createSelector } from 'reselect';
import { iRootState } from '..';

export const selectProduct = (state: iRootState): ProductState['product'] => state.product.product
export const selectCategories = (state: iRootState) => state.products.categories
export const selectProducts = (state: iRootState) => state.products.products
export const selectCategoryProducts = (state: iRootState) => state.products.categoryProducts

const selectCategoryId = (state: iRootState, categoryId: string) => categoryId

export const selectCategoryById = createSelector(
    [selectCategories, selectCategoryId],
    (categories, categoryId) => categories.find((c: Category) => c._id === categoryId)
)

export const selectCategoriesProducts = createSelector(
    [selectCategoryProducts, selectCategoryId],
    (categoryProducts, categoryId) => categoryProducts[categoryId]
)
// export const selectCategoryById = createSelector(
//     [selectCategories, selectCategoryId],
//     (categories, categoryId) => categories.find((c: Category) => c._id === categoryId)
// )

// export const selectCategoriesProducts = createSelector(
//     [selectProducts, selectCategoryId],
//     (products, categoryId) => products.filter((product: ProductData) => product.category.find(c => c._id === categoryId))
// )
