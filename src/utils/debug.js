import { isBrowser } from './context';
import config from '../config/config';

const debug = () => isBrowser() && Boolean(config.debug);
export default debug;
