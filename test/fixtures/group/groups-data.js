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

export const jsonGhost = JSON.stringify({
  "VERSION_APP": "0.1.0-10501025",
  "VERSION_LIB": "1.0.7",
  "groups": [
    {
      "name": "ghost", "fps": 14,
      "timelines": [
        {
          "path": "svg[1]",
          "transitions": [
            { "frame": 0, "ease": "Linear.easeNone", "params": { "autoAlpha": "0.995" } },
            { "frame": 54, "ease": "Linear.easeNone", "params": { "x": 0, "y": 0 } },
            { "frame": 66, "ease": "Back.easeInOut", "params": { "x": -2, "y": 361 } }
          ]
        },
        {
          "path": "svg[1]/path[1]",
          "transitions": [
            { "frame": 0, "ease": "Linear.easeNone", "params": { "autoAlpha": "0" } },
            { "frame": 46, "ease": "Linear.easeNone", "params": { "autoAlpha": "0" } },
            { "frame": 50, "ease": "Linear.easeNone", "params": { "autoAlpha": "1" } }
          ]
        },
        {
          "id": "eyes",
          "transitions": [
            { "frame": 0, "params": { "scaleX": "3", "scaleY": "3", "x": -16.74, "y": 2.31, "autoAlpha": "0" } },
            { "frame": 11, "ease": "Power2.easeOut", "params": { "autoAlpha": 1 } },
            { "frame": 15, "ease": "Linear.easeNone", "params": { "scaleY": 3.95525 } },
            { "frame": 16, "ease": "Linear.easeNone", "params": { "scaleY": 0.1 } },
            { "frame": 17, "ease": "Linear.easeNone", "params": { "scaleY": 3.95525 } },
            { "frame": 29, "ease": "Linear.easeNone", "params": { "scaleY": 3.95525 } },
            { "frame": 30, "ease": "Linear.easeNone", "params": { "scaleY": 0.1 } },
            { "frame": 31, "ease": "Linear.easeNone", "params": { "scaleY": 3.95525 } },
            { "frame": 34, "ease": "Linear.easeNone", "params": { "scaleY": 3.95525 } },
            { "frame": 35, "ease": "Linear.easeNone", "params": { "scaleY": 0.1 } },
            { "frame": 36, "ease": "Linear.easeNone", "params": { "scaleY": 3.95525 } },
            { "frame": 53, "ease": "Elastic.easeInOut", "params": { "scaleX": 1, "scaleY": 1, "x": -5.76, "y": 1.15 } }
          ]
        },
        {
          "path": "svg[1]/path[2]",
          "transitions": [{ "frame": 0, "ease": "Linear.easeNone", "params": { "autoAlpha": "0" } }]
        }
      ],
    }
  ]
})
