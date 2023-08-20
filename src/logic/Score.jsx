export const POINTS_ACTIONS = {
  SOFT_DROP: 1,
  HARD_DROP: 2,
  SINGLE: 100,
  DOUBLE: 300,
  TRIPLE: 500,
  TETRIS: 800
};

export const initialPointState = {
  score: 0,
  lines: 0
}

export function scoreReducer(state, action){
  switch(action.type){
    case POINTS_ACTIONS.SOFT_DROP:
      return {...state, score: state.score + POINTS_ACTIONS.SOFT_DROP}
    case POINTS_ACTIONS.HARD_DROP:
      //states.score += ACTIONS.HARD_DROPS;
      return {...state, score: state.score + POINTS_ACTIONS.HARD_DROP}
    case POINTS_ACTIONS.SINGLE:
      //states.lines++;
      //states.score += ACTIONS.SINGLE;
      return {...state, score: state.score + POINTS_ACTIONS.SINGLE, lines: state.lines + 1}
    case POINTS_ACTIONS.DOUBLE:
      //states.lines++;
      //states.score += ACTIONS.DOUBLE;
      return {...state, score: state.score + POINTS_ACTIONS.DOUBLE, lines: state.lines + 1}
    case POINTS_ACTIONS.TRIPLE:
      //states.lines++;
      //states.score += ACTIONS.TRIPLE;
      return {...state, score: state.score + POINTS_ACTIONS.TRIPLE, lines: state.lines + 1}
    case POINTS_ACTIONS.TETRIS:
      //states.lines++;
      //states.score += ACTIONS.TETRIS;
      return {...state, score: state.score + POINTS_ACTIONS.TETRIS, lines: state.lines + 1}
  }
}