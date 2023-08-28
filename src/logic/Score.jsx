export const POINTS_ACTIONS = {
  INCR_LEVEL: "INCREMENT-LEVEL",
  SOFT_DROP: 1,
  HARD_DROP: 2,
  SINGLE: 100,
  DOUBLE: 300,
  TRIPLE: 500,
  TETRIS: 800
};

export const initialPointState = {
  score: 0,
  lines: 0,
  level: 0
}

export function scoreReducer(state, action){
  switch(action.type){
    case POINTS_ACTIONS.INCR_LEVEL: 
      console.log("POINTS_ACTIONS.INCR_LEVEL");
      return {...state, level: state.level + 1};
    case POINTS_ACTIONS.SOFT_DROP:
        //const newScore = (state.level + 1) * POINT_ACTIONS.SOFT_DROP;
      return {...state, score: state.score + POINTS_ACTIONS.SOFT_DROP}
    case POINTS_ACTIONS.HARD_DROP:
        //const newScore = (state.level + 1) * POINT_ACTIONS.DROP_DROP;
      return {...state, score: state.score + POINTS_ACTIONS.HARD_DROP}
    case POINTS_ACTIONS.SINGLE:
        const newScore = (state.level + 1) * POINTS_ACTIONS.SINGLE;
      return {...state, score: newScore, lines: state.lines + 1}
    case POINTS_ACTIONS.DOUBLE:
        //const newScore = (state.level + 1) * POINT_ACTIONS.DOUBLE;
      return {...state, score: state.score + POINTS_ACTIONS.DOUBLE, lines: state.lines + 1}
    case POINTS_ACTIONS.TRIPLE:
        //const newScore = (state.level + 1) * POINT_ACTIONS.TRIPLE;
      return {...state, score: state.score + POINTS_ACTIONS.TRIPLE, lines: state.lines + 1}
    case POINTS_ACTIONS.TETRIS:
        //const newScore = (state.level + 1) * POINT_ACTIONS.TETRIS;
      return {...state, score: state.score + POINTS_ACTIONS.TETRIS, lines: state.lines + 1}
  }
}