import { AMOUNT_ASSERT, SCORE_USER } from '.';

export const userScore = (payload) => ({
  type: SCORE_USER,
  payload,
});

export const amountHits = (payload) => ({
  type: AMOUNT_ASSERT,
  payload,
});
