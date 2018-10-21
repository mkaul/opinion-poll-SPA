/**
 * @overview list of tests
 * @version 0.0.1
 * @author mkaul2m Manfred.Kaul@h-brs.de
 * @copyright The MIT License (MIT) mkaul2m on 20.10.18.
 *
 * Important: All paths must be relative: Begin with "." or ".."
 */

import './sum1.test.mjs';
import './sum2.test.mjs';
import './histogram.test.mjs';

mocha.checkLeaks();
mocha.run();
