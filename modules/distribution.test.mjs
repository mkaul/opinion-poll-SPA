/**
 * @overview modular test of distribution
 * @version 0.0.1
 * @author mkaul2m Manfred.Kaul@h-brs.de
 * @copyright The MIT License (MIT) mkaul2m on 20.10.18.
 */


import { distribution } from './distribution.mjs';

describe('distribution', () => {
  it('should return correct data', () => {
    const x_axis = [50,100];
    const y_axis = [1,1];
    const result = [
      {
        "x": x_axis,
        "y": y_axis,
        "type": "bar"
      }
    ];

    // https://www.chaijs.com/api/bdd/#method_eql
    chai.expect(distribution( null, null, x_axis, [{final_percentage:10},{final_percentage:90}], {start: ()=>{}} )).to.eql(result);
  });
});