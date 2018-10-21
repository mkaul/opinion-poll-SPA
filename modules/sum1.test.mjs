/**
 * @overview modular test of sum
 * @version 0.0.1
 * @author mkaul2m Manfred.Kaul@h-brs.de
 * @copyright The MIT License (MIT) mkaul2m on 20.10.18.
 */


import sum from './sum1.mjs';

describe('sum', () => {
  it('should return sum of arguments', () => {
    chai.expect(sum(1, 2)).to.equal(3);
  });
});