/**
 * @overview modular test of histogram
 * @version 0.0.1
 * @author mkaul2m Manfred.Kaul@h-brs.de
 * @copyright The MIT License (MIT) mkaul2m on 20.10.18.
 */


import { histogram } from './histogram.mjs';

describe('histogram', () => {
  it('should return correct data', () => {
    let title, results, counters, plot_result, mapping;
    [title, results, counters, plot_result, mapping] = [];
    chai.expect(histogram( title, results, counters, plot_result, mapping )).to.equal(data);
  });
});