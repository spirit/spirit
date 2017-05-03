import List from '../list/list'

class Props extends List {

}

Props.Events = [
  'change:list',
  'add',
  'remove',
  'change',
  'change:name',
  'change:keyframes',
  'change:keyframes:list',
  'change:keyframe',
  'change:keyframe:time',
  'change:keyframe:value',
  'change:keyframe:ease',
  'add:keyframe',
  'remove:keyframe'
]

export default Props
