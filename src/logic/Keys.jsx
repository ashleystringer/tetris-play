export const KEY_ACTIONS = {
    UP: 87,
    LEFT: 65,
    RIGHT: 68,
    DOWN: 83,
    PAUSE: 32
};

export function keyReducer(key, action){
    switch(action.keyCode){
        case KEY_ACTIONS.UP:
            console.log("UP");
            return { action: "rotate" };
        case KEY_ACTIONS.LEFT:
            console.log("LEFT");
            return { action: "move", movement: { x: -1, y: 0 } };
        case KEY_ACTIONS.RIGHT:
            console.log("RIGHT");
            return { action: "move", movement: { x: 1, y: 0 } };
        case KEY_ACTIONS.DOWN:
            console.log("DOWN");
            return { action: "move", movement: { x: 0, y: 1 } };
        case KEY_ACTIONS.PAUSE:
            console.log("PAUSE");
            return { action: "pause" };
        default:
            return { action: "default" };
    }
}