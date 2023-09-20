import { createSelector } from 'reselect';
import { iRootState } from '..';


export const getRTLMode = (state: iRootState) => state.app.RTL;