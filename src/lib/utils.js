export function createReducer(initialState, reduceMap) {
  return (state = initialState, action) => {
    const reducer = reduceMap[action.type]

    return reducer
      ? reducer(state, action.payload)
      : state
  }
}