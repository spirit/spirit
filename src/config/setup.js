import { gsap, is } from '../utils';
import config from './config';
import { isGSAPInstance } from '../utils/gsap';

/**
 * Setup Spirit GSAP
 *
 * @param {object} gsapInstance
 */
export default function setup(gsapInstance = null) {
  return new Promise((resolve, reject) => {
    if (isGSAPInstance(gsapInstance)) {
      config.gsap.instance = gsapInstance;
    }

    gsap
      .ensure()
      .then(resolve)
      .catch(reject);
  });
}
