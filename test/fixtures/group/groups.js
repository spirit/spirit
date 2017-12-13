const divA = document.createElement('div')
const divB = document.createElement('div')
const divC = document.createElement('div')
const divD = document.createElement('div')
const divE = document.createElement('div')

export const simpleGroups = [
  {
    name: 'puppet',
    timelines: [
      {
        label: 'head',
        transformObject: divA,
        path: 'div[1]',
        props: {
          x: { '0s': { value: 0 }, '10s': { value: 300 } },
          y: { '0s': { value: 0 }, '10s': { value: 1000 } }
        }
      },
      {
        label: 'body',
        transformObject: divB,
        path: 'div[2]',
        props: {
          scale: { '10s': { value: 2 } }
        }
      }
    ]
  },
  {
    name: 'ghost',
    timelines: [
      {
        label: 'outline',
        transformObject: divC,
        path: 'div[2]',
        props: {
          scale: {
            '0s': { value: 0 },
            '25s': { value: 1, ease: 'Elastic.easeOut' }
          }
        }
      },
      {
        label: 'eyes',
        transformObject: divD,
        path: 'div[3]',
        props: {
          scaleY: {
            '20s': { value: 1 },
            '20.1s': { value: 0.1 },
            '20.2s': { value: 1 }
          }
        }
      },
      {
        label: 'shadow',
        transformObject: divE,
        path: 'div[4]',
        props: {
          y: {
            '0s': { value: 0 },
            '5s': { value: 100 },
            '15s': { value: 0 }
          }
        }
      }
    ]
  }
]
