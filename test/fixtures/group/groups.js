const divA = document.createElement('div')
const divB = document.createElement('div')
const divC = document.createElement('div')
const divD = document.createElement('div')
const divE = document.createElement('div')

export const simpleGroups = [
  {
    name: 'puppet',
    fps: 20,
    timelines: [
      {
        label: 'head',
        transformObject: divA,
        path: 'div[0]',
        transitions: [
          { frame: 0, ease: 'Strong.easeOut', params: [{ x: 0 }, { y: 0 }] },
          { frame: 100, params: { x: 300, y: 1000 } }
        ]
      },
      {
        label: 'body',
        transformObject: divB,
        path: 'div[1]',
        transitions: [
          { frame: 100, params: { scale: 2 } }
        ]
      }
    ]
  },
  {
    name: 'ghost',
    fps: 5,
    timelines: [
      {
        label: 'outline',
        transformObject: divC,
        path: 'div[2]',
        transitions: [
          { frame: 0, params: { scale: 0 } },
          { frame: 250, params: { scale: 1 }, ease: 'Elastic.easeOut' }
        ]
      },
      {
        label: 'eyes',
        transformObject: divD,
        path: 'div[3]',
        transitions: [
          { frame: 200, params: { scaleY: 1 } },
          { frame: 201, params: { scaleY: 0.1 } },
          { frame: 202, params: { scaleY: 1 } }
        ]
      },
      {
        label: 'shadow',
        transformObject: divE,
        path: 'div[4]',
        transitions: [
          { frame: 0, params: { y: 0 } },
          { frame: 50, params: { y: 100 } },
          { frame: 150, params: { y: 0 } }
        ]
      }
    ]
  }
]
