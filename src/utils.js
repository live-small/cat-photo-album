export const isDiffState = (originState, nextState) => {
  return JSON.stringify(originState) !== JSON.stringify(nextState);
};
