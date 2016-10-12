const random = function(arr) {
  return arr[Math.floor(Math.random() * arr.length - 1)]
}

const eases = [
  "Linear.easeNone",
  "Quint.easeOut",
  "Expo.easeOut",
  "Strong.easeInOut"
]

const params = [
  { x: "-180px", y: 0 },
  { x: 0, y: 0 },
  { autoAlpha: 0, x: 0 },
  { autoAlpha: 1, x: 0 },
  { scale: 1 },
  { scale: 0 },
  { scale: 1.5 },
]

/**
 * Get random timeline
 * @param id
 * @param label
 * @param transitions
 */
export function timeline(id, path, label, transitions = 2) {
  const tl = {}

  if (id) {
    tl.id = id
  }

  if (path) {
    tl.path = path
  }

  if (label) {
    tl.label = label
  }

  tl.transitions = []

  for (let i = 0; i < transitions; i++) {
    tl.transitions.push({
      frame: parseInt(Math.random() * 600),
      ease: random(eases),
      params: random(params)
    })
  }

  return tl
}
