import { isBrowser } from './context'
import config from '../config/config'

const debug = () => process.env.NODE_ENV === 'development' && isBrowser() && Boolean(config.debug)
export default debug
