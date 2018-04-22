const max = 2
const min = -2

export const directAngleToPosition = (angle) => {
  let x, y
  switch (angle) {
    case 'up':
      x = max
      y = max
      break
    case 'down':
      x = min
      y = min
      break
    case 'left':
      x = min
      y = max
      break
    case 'right':
      x = max
      y = min
      break
    default:
      x = 0
      y = 0
  }

  return {x, y}
}
