/**
 * @overview description of the component
 * @version 0.0.1
 * @author mkaul2m Manfred.Kaul@h-brs.de
 * @copyright The MIT License (MIT) mkaul2m on 20.10.18.
 */

import { questions } from '../modules/questions.mjs';

export const delay_categories = (title, results, category_counters, plot_result, mapping ) => {

  const delay_sums = {};
  for (const result of results){
    for (let i=0; i<result.categories.length;i++){
      if (i===0) continue;
      if (!delay_sums[result.categories[i]]) delay_sums[result.categories[i]] = 0;
      // sum, average, min, max, std deviation, median
      mapping(delay_sums, result, i);
    }
  }

  const data = [
    {
      "x": Object.keys( category_counters ),
      "y": Object.values( delay_sums ),
      "type": "bar"
    }
  ];

  // render chart
  ccm.start("https://ccmjs.github.io/mkaul-components/plotly/versions/ccm.plotly-1.0.0.js", {
    root: plot_result,
    data: data,
    layout: {
      title: title
    },
    plot_config: {
      responsive: true
    }
  } );

  return data;

};
 
 
