/**
 * @overview description of the component
 * @version 0.0.1
 * @author mkaul2m Manfred.Kaul@h-brs.de
 * @copyright The MIT License (MIT) mkaul2m on 20.10.18.
 */

export const histogram = ( title, results, counters, plot_result, mapping ) => {

  // console.log(  title, results, counters, plot_result, mapping  );

  const data = [];
  counters.forEach((counter, i)=>{
    const group = {
      name: 'Auswahl ' + (i+1),
      type: 'bar'
    };
    group.x = Object.keys(counter);
    group.y = Object.values(counter).map( mapping ? mapping : c => c );
    data.push(group);
  });

  // render chart
  ccm.start("https://ccmjs.github.io/mkaul-components/plotly/versions/ccm.plotly-1.0.0.js", {
    root: plot_result,
    data: data,
    layout: {
      title: title,
      barmode: 'group'
    },
    plot_config: {
      responsive: true
    }
  } );

  return data;

};
 
 
