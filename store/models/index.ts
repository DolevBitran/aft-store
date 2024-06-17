import { Models } from '@rematch/core';
import { media } from './media.model';
import { auth } from './auth.model';
import { app } from './app.model';
import { product } from './product.model';
import { products } from './products.model';
import { cart } from './cart.model';

export interface RootModel extends Models<RootModel> {
    app: typeof app;
    auth: typeof auth;
    media: typeof media;
    product: typeof product;
    products: typeof products;
    cart: typeof cart;
}

export const models: RootModel = { app, auth, media, product, products, cart };