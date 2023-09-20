import { createSelector } from 'reselect';
import { iRootState } from '..';


export const getUser = (state: iRootState): User | null => state.auth.user;