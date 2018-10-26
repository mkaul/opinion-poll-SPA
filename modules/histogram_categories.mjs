/**
 * @overview description of the component
 * @version 0.0.1
 * @author mkaul2m Manfred.Kaul@h-brs.de
 * @copyright The MIT License (MIT) mkaul2m on 20.10.18.
 */

export const histogram_categories = ( title, category_counters, plot_result, mapping ) => {

  // console.log(  title, results, counters, plot_result, mapping  );

  const data = [
    {
      "x": Object.keys(category_counters),
      "y": Object.values(category_counters).map( mapping || ( x => x ) ),
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
 
 
