export const isDiff = (originState, nextState) => {
  return JSON.stringify(originState) !== JSON.stringify(nextState);
};
