/**
 * @overview description of the component
 * @version 0.0.1
 * @author mkaul2m Manfred.Kaul@h-brs.de
 * @copyright The MIT License (MIT) mkaul2m on 20.10.18.
 */

export const distribution = ( title, plot_div, x_axis, raw_data, ccm ) => {

  const y_axis = [];
  x_axis.forEach( (max, i) => {
    raw_data.forEach( rec => {
      if ( ! y_axis[i] ) y_axis[i] = 0;
      if ( rec.final_percentage < max && !(i > 0 && rec.final_percentage < x_axis[i-1]) ) y_axis[i] += 1;
    });
  });

  const data = [
    {
      "x": x_axis,
      "y": y_axis,
      "type": "bar"
    }
  ];

  // render distribution graph
  ccm.start("https://ccmjs.github.io/mkaul-components/plotly/versions/ccm.plotly-1.0.0.js", {
    root: plot_div,
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
 
 
