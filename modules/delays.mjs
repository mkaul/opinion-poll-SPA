/**
 * @overview description of the component
 * @version 0.0.1
 * @author mkaul2m Manfred.Kaul@h-brs.de
 * @copyright The MIT License (MIT) mkaul2m on 20.10.18.
 */

export const delays = ( title, questions, results, counters, plot_result, mapping ) => {

  const delay_sums = [{"0":0}]; // Start Button

  // one sum per question
  questions.forEach( question => {
    const sum = {};
    Object.keys(question).forEach(key => {sum[key] = 0});
    delay_sums.push( sum ) ;
  });

  for (const result of results){
    for (let i=0; i<result.categories.length;i++){
      if (i===0) continue;
      // sum, average, min, max, std deviation, median
      mapping(delay_sums, result, i);
    }
  }

  const data = [];
  questions.forEach((question,i) => {
    const group = {
      name: 'Auswahl ' + (i+1),
      type: 'bar'
    };
    group.x = [];
    group.y = [];
    Object.keys(question).forEach(key=>{
      group.x.push( question[key] );
      group.y.push( delay_sums[i+1][ key ] || 0 );
    });
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
 
 
