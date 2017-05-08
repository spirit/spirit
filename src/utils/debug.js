import { isBrowser } from './context'

export default process.env.NODE_ENV === 'development' && isBrowser()
