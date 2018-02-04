const max = 2;
const min = -2;

export const directAngleToPosition = (angle) => {
    let x, y;
    switch (angle) {
        case 'up': 
          x = max;
          y = max;
        break;
        case 'down':
          x = min;
          y = min;
        break;
        case 'left':
          x = max;
          y = min;
        break;
        case 'right':
          x = min;
          y = max;
        break;
        default:
          x = 0;
          y = 0;
    }

    return {x, y};
}