import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { OfferTypes } from '../mocks/offer';

export const getCurrentOffer = (state: RootState) => state.currentOffer;
export const getNearbyOffers = (state: RootState) => state.nearbyOffers;
export const getIsLoading = (state: RootState) => state.isLoading;
export const selectFavoriteOffers = (state: RootState) => state.favoriteOffers;
export const selectUser = (state: RootState) => state.user;

export const selectIsAuthorized = createSelector(
  [selectUser],
  (user) => Boolean(user)
);

export const selectRecentComments = createSelector(
  [(state: RootState) => state.comments],
  (comments) => {
    return [...comments]
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 10);
  }
);

export const getOfferWithNearby = createSelector(
  [
    (state: RootState) => state.currentOffer,
    (state: RootState) => state.nearbyOffers,
    (state: RootState) => state.isLoading,
  ],
  (currentOffer: OfferTypes | null, nearby: OfferTypes[], isLoading: boolean) => ({
    currentOffer,
    nearby,
    isLoading,
  })
);
