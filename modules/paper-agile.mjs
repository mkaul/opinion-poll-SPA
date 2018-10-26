/**
 * @overview main script for main HTML page index.html
 * @version 0.0.1
 * @author mkaul2m Manfred.Kaul@h-brs.de
 * @copyright The MIT License (MIT) mkaul2m on 17.08.18.
 */

// use relative paths for module import
// https://developers.google.com/web/fundamentals/primers/modules
import { questions } from "../modules/questions.mjs";
import { histogram } from "../modules/histogram.mjs";
import { histogram_categories } from "../modules/histogram_categories.mjs";
import { delays } from "../modules/delays.mjs";
import { delay_categories } from "../modules/delay_categories.mjs";

let individual_results; // results of a single survey

// get elements from HTML
const start_button = document.getElementById("start");
const start_paper = document.getElementById("start_paper");
start_paper.addEventListener( 'click', () => { window.location = '#paper' } );
const div = (id) => {
  return document.getElementById(id);
};
const span = (class_name) => {
  return document.querySelectorAll('.' + class_name);
};

// convert JavaScript question array into HTML list
let questions_html = "<ol>";
for (const answers of questions){
  questions_html += "<li><ol type='a'>";
  for (const answer of Object.values(answers)){
    questions_html += "<li>" + answer + "</li>";
  }
  questions_html += "</ol></li>";
}
questions_html += "</ol>";

div("questions").innerHTML = questions_html;


// Use Location API for hash changes
// https://developer.mozilla.org/en-US/docs/Web/API/Location
window.onhashchange = function() {
  // in-page anchor
  const anchor = document.querySelector( location.hash );

  if (location.hash.length === 0){
    div("survey").style.display = 'none';
    div("paper").style.display = 'none';
    div("welcome").style.animation = 'fadeIn 2s';
    div("welcome").style.display = 'block';
  }
  if (location.hash.length > 0) {
    if (location.hash.endsWith('paper')) {
      div("welcome").style.display = 'none';
      div("survey").style.display = 'none';
      div("result").style.display = 'none';
      div("paper").style.animation = 'fadeIn 3s';
      div("paper").style.display = 'block';
      draw_figures_in_paper();
    } else if (location.hash.endsWith('survey')) {
      div("welcome").style.display = 'none';
      div("paper").style.display = 'none';
      div("result").style.display = 'none';
      div("survey").style.animation = 'fadeIn 2s';
      div("survey").style.display = 'block';
      start_survey();
    } else if (location.hash.endsWith('result')) {
      div("welcome").style.display = 'none';
      div("survey").style.display = 'none';
      div("paper").style.display = 'none';
      div("result").style.animation = 'fadeIn 2s';
      div("result").style.display = 'block';
      draw_results( individual_results );
    } else { // in-page anchor
      anchor.style.backgroundColor = "rgb(255, 237, 186)";
      anchor.style.transition = "all 3s linear";
    }
  }
};


// event listener for button
// https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener
start_button.addEventListener('click', () => {

  // animate button
  start_button.style.backgroundColor = 'red';
  // await setTimeout(()=>{start_button.style.backgroundColor = 'white'}, 200);
  // await setTimeout(()=>{start_button.style.backgroundColor = 'red'}, 200);

  // start survey
  window.location = '#survey';

});

function start_survey(){
  ccm.start('https://ccmjs.github.io/mkaul-components/fast_poll/versions/ccm.fast_poll-3.0.0.js', {
    root: div("ccm_poll"),
    choices: questions,
    randomize: {
      row: true,
      column: true
    },
    finishListener: (e) => {
      window.location = '#paper';
    },
    onfinish: function( instance, results ){
      const self = instance;

      // // results.navigator = Object.assign( {}, navigator );
      // results.navigator = Object.getOwnPropertyNames(navigator.__proto__).reduce((a,b)=>{a[b]=navigator[b];return a;}, {});
      // results.navi_string = JSON.stringify(results.navigator);
      // // results.history = Object.assign( {}, history );
      // results.history = Object.getOwnPropertyNames(history.__proto__).reduce((a,b)=>{a[b]=history[b];return a;}, {});
      //
      // // collecting additional informations
      // results.client_date = new Date();
      // results.cookies = document.cookie;
      // const w = window,
      //   d = document,
      //   e = d.documentElement,
      //   g = d.getElementsByTagName('body')[0];
      // results.x = w.innerWidth || e.clientWidth || g.clientWidth;
      // results.y = w.innerHeight|| e.clientHeight|| g.clientHeight;
      // // navigator.geolocation.getCurrentPosition( position => {
      // //   results.geolocation = position;
      // // });

      results.client_time = new Date().toLocaleString();

      Object.keys(results).forEach(key=>{results.texts=results.texts.map(t => t.normalize('NFKD'))});

      // log results
      fetch(new Request('https://kaul.inf.h-brs.de/data/2018/prosem/log_post.php'), {
        method: 'POST',
        mode: 'cors',
        cache: 'no-store',
        body: JSON.stringify( results ),
        headers:{
          'Content-Type': 'application/json'
        }
      });

      individual_results = results; // TODO: $.clone( results );

      window.location = '#result';
    }
  });
}

/*
* use local data, calculate individual results and draw them into result_div
* @param individual_results
*/
function draw_results( individual_results ){

  // calculate percentage: How agile is the current user?
  let counters = { agile: 0, planned: 0 }, max = 0;
  individual_results.categories.forEach( cat => {
    max += 1;
    if ( cat === "agil" ){
      counters.agile += 1;
    } else {
      counters.planned += 1;
    }
  });
  [...span('agile_percentage')].forEach(
    span => span.innerText = (100 * counters.agile / max).toFixed(2)
  );

  // plot cake chart
  ccm.start("https://ccmjs.github.io/mkaul-components/plotly/versions/ccm.plotly-1.0.0.js", {
    root: div('poll_result'),
    data: [
      {
        "values": Object.values( counters ),
        "labels": Object.keys( counters ),
        "type": "pie"
      }
    ],
    plot_config: {
      responsive: true
    }
  } );
}

/*
* fetch dataset from server, calculate results and draw them
*/
async function draw_figures_in_paper(){
  // const dataset = await ccm.load( { url: 'https://kaul.inf.h-brs.de/data/2018/prosem/all_objects.php', method: 'GET' } );
  const dataset = await (await fetch(new Request('https://kaul.inf.h-brs.de/data/2018/prosem/all_objects.php'), {
    method: 'GET',
    mode: 'cors',
    cache: 'no-store'
  })).json();

  // count_participants
  const count_participants = dataset.length;
  [...span('count_participants')].forEach( span => {
    span.innerText = count_participants;
  });

  // Browsers encode Umlauts differently
  // Therefore normalize them
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/normalize
  dataset.forEach( data => data.texts = data.texts.map(t => t.normalize('NFKD')) );

  // count categories
  const [ category_counters, sum_categories ] = count_categories();

  function count_categories(){
    const category_counters = {};
    let sum_categories = 0;
    dataset.forEach( data => {
      data.categories.forEach( category => {
        if ( category === "0" ) return;
        if ( ! category_counters[category] ) category_counters[category] = 0;
        category_counters[category] += 1;
        sum_categories += 1;
      })
    });
    return [ category_counters, sum_categories ];
  }


  // count answers
  const counters = count( dataset ); // caching calculation of counters
  const flat_counters = Object.assign({}, ...counters);

  /*
   * count number of answers
   * @param dataset - raw dataset of survey
   */
  function count( dataset ){
    const counters = [];
    questions.forEach(() => {
      counters.push({});
    });
    dataset.forEach((data)=>{
      counters.forEach((counter, i)=>{
        const key = data.texts[i+1].normalize('NFKD');
        if ( ! counter[key] ) counter[key] = 0;
        counter[key] += 1;
      });
    });
    return counters;
  }

  histogram_categories(
    'Histogramm Kategorien absolut <i>(n = ' + count_participants + ')</i>',
    category_counters,
    div("histogram_categories_absolute")
  );

  histogram_categories(
    'Histogramm Kategorien in Prozent <i>(n = ' + count_participants + ')</i>',
    category_counters,
    div("histogram_categories_relative"),
    c => 100 * c / sum_categories
  );

  histogram(
    'Histogramm absolut <i>(n = ' + count_participants + ')</i>',
    dataset,
    counters,
    div("histogram_absolute")
  );

  histogram(
    'Histogramm in Prozent <i>(n = ' + count_participants + ')</i>',
    dataset,
    counters,
    div("histogram_relative"),
    c=>100*c/count_participants
  );

  // ============== Categories =================
  // Sum
  delay_categories(
    'Summe aller Verzögerungen in Millisekunden (msec) <i>(n = ' + count_participants + ')</i>',
    dataset,
    category_counters,
    div("delay_cat_sum"),
    (delay_sums, result, i) => delay_sums[result.categories[i]] += delay_sums[result.categories[i]] += (result.timer[i]-result.timer[i-1]) // sum
  );

  // Average
  delay_categories(
    'Durchschnitt aller Verzögerungen in Millisekunden (msec) <i>(n = ' + count_participants + ')</i>',
    dataset,
    category_counters,
    div("delay_cat_avg"),
    (delay_sums, result, i) => delay_sums[result.categories[i]] += delay_sums[result.categories[i]] += (result.timer[i]-result.timer[i-1]) / category_counters[result.categories[i]]
  );

  // Maximum
  delay_categories(
    'Maximum aller Verzögerungen in Millisekunden (msec) <i>(n = ' + count_participants + ')</i>',
    dataset,
    category_counters,
    div("delay_cat_max"),
    (delay_sums, result, i) => delay_sums[result.categories[i]] = Math.max( delay_sums[ result.categories[i] ], ( result.timer[i] - result.timer[i-1] ) )
  );

  // Minimum
  delay_categories(
    'Minimum aller Verzögerungen in Millisekunden (msec) <i>(n = ' + count_participants + ')</i>',
    dataset,
    category_counters,
    div("delay_cat_min"),
    (delay_sums, result, i) => {
      // avoid 0 as minimum
      if ( delay_sums[result.categories[i]] === 0 ) delay_sums[result.categories[i]] = result.timer[i] - result.timer[i-1];
      delay_sums[result.categories[i]] = Math.min( delay_sums[ result.categories[i] ], ( result.timer[i] - result.timer[i-1] ) );
    }
  );

  // =============== Single Answer ==================

  // Sum
  delays(
    'Summe aller Verzögerungen in Millisekunden (msec) <i>(n = ' + count_participants + ')</i>',
    dataset,
    counters,
    div("delay_sum"),
    (delay_sums, result, i) => delay_sums[result.texts[i]] += delay_sums[result.texts[i]] += (result.timer[i]-result.timer[i-1]) // sum
  );

  // Average
  delays(
    'Durchschnitt aller Verzögerungen in Millisekunden (msec) <i>(n = ' + count_participants + ')</i>',
    dataset,
    counters,
    div("delay_avg"),
    (delay_sums, result, i) => delay_sums[result.texts[i]] += delay_sums[result.texts[i]] += (result.timer[i]-result.timer[i-1]) / flat_counters[result.texts[i]]
  );

  // Maximum
  delays(
    'Maximum aller Verzögerungen in Millisekunden (msec) <i>(n = ' + count_participants + ')</i>',
    dataset,
    counters,
    div("delay_max"),
    (delay_sums, result, i) => delay_sums[result.texts[i]] = Math.max( delay_sums[ result.texts[i] ], ( result.timer[i] - result.timer[i-1] ) )
  );

  // Minimum
  delays(
    'Minimum aller Verzögerungen in Millisekunden (msec) <i>(n = ' + count_participants + ')</i>',
    dataset,
    counters,
    div("delay_min"),
    (delay_sums, result, i) => {
      // avoid 0 as minimum
      if ( delay_sums[result.texts[i]] === 0 ) delay_sums[result.texts[i]] = result.timer[i] - result.timer[i-1];
      delay_sums[result.texts[i]] = Math.min( delay_sums[ result.texts[i] ], ( result.timer[i] - result.timer[i-1] ) );
    }
  );

}





 
