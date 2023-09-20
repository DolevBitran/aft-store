import { createSelector } from 'reselect';
import { iRootState } from '..';

export const getMediaUploadPercentage = (state: iRootState): MediaState['upload'] => state.media.upload
export const getMediaAssets = (state: iRootState): MediaState['upload'] => state.media.assets
export const getMediaAssetArray = (state: iRootState): IAsset[] => Object.values(state.media.assets)

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
