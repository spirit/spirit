const random = function(arr) {
  return arr[Math.floor(Math.random() * (arr.length - 1))]
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
export function timeline(id, path, label) {
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

  return tl
}

export const jsonGhost = JSON.stringify({
  "VERSION_APP": "0.1.0-10501025",
  "VERSION_LIB": "1.0.7",
  "groups": [
    {
      "name": "ghost", "fps": 14,
      "timelines": [
        {
          "path": "svg[1]",
          "props": {}
        },
        {
          "path": "svg[1]/path[1]",
          "props": {}
        },
        {
          "id": "eyes",
          "props": {}
        },
        {
          "path": "svg[1]/path[2]",
          "props": {}
        }
      ],
    }
  ]
})
