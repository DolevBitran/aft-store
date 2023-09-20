import { Models } from '@rematch/core';
import { media } from './media.model';
import { auth } from './auth.model';
import { app } from './app.model';

export interface RootModel extends Models<RootModel> {
    app: typeof app;
    auth: typeof auth;
    media: typeof media;
}

export const models: RootModel = { app, auth, media };