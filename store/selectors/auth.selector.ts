import { createSelector } from 'reselect';
import { iRootState } from '..';


export const selectUser = (state: iRootState): User | null => state.auth.user;
// export const selectUser = createSelector(selectUser, (user => user))