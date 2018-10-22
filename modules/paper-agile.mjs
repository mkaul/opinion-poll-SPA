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
import { delays } from "../modules/delays.mjs";

// get elements from HTML
const questions_div = document.getElementById("questions");
const start_button = document.getElementById("start");
const welcome_div = document.getElementById("welcome");
const survey_div = document.getElementById("survey");
const ccm_poll_div = document.getElementById("ccm_poll");
const paper_div = document.getElementById("paper");
const histogram_absolute_div = document.getElementById("histogram_absolute");
const histogram_relative_div = document.getElementById("histogram_relative");
const delay_sum_div = document.getElementById("delay_sum");
const delay_avg_div = document.getElementById("delay_avg");
const delay_max_div = document.getElementById("delay_max");
const delay_min_div = document.getElementById("delay_min");
const count_participants_spans = document.querySelectorAll(".count_participants");

// convert JavaScript question array into HTML list
let questions_html = "<ol>";
for (const answers of questions){
  questions_html += "<li><ol type='a'>";
  for (const answer of answers){
    questions_html += "<li>" + answer + "</li>";
  }
  questions_html += "</ol></li>";
}
questions_html += "</ol>";

questions_div.innerHTML = questions_html;


// Use Location API for hash changes
// https://developer.mozilla.org/en-US/docs/Web/API/Location
window.onhashchange = function() {
  // in-page anchor
  const anchor = document.querySelector( location.hash );

  if (location.hash.length === 0){
    survey_div.style.display = 'none';
    paper_div.style.display = 'none';
    welcome_div.style.animation = 'fadeIn 2s';
    welcome_div.style.display = 'block';
  }
  if (location.hash.length > 0) {
    if (location.hash.endsWith('paper')) {
      welcome_div.style.display = 'none';
      survey_div.style.display = 'none';
      paper_div.style.animation = 'fadeIn 3s';
      paper_div.style.display = 'block';
      draw_results();
    } else if (location.hash.endsWith('survey')) {
      welcome_div.style.display = 'none';
      paper_div.style.display = 'none';
      survey_div.style.animation = 'fadeIn 2s';
      survey_div.style.display = 'block';
    } else { // in-page anchor
      anchor.style.backgroundColor = "rgb(255, 237, 186)";
      anchor.style.transition = "all 3s linear";
    }
  }
};


// event listener for button
// https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener
start_button.addEventListener('click', async (e) => {
  // animate button
  start_button.style.backgroundColor = 'red';
  await setTimeout(()=>{start_button.style.backgroundColor = 'white'}, 200);
  await setTimeout(()=>{start_button.style.backgroundColor = 'red'}, 200);
  setTimeout(()=>{ // start survey

    window.location = '#survey';

    // start web component for taking survey
    ccm.start('https://ccmjs.github.io/mkaul-components/fast_poll/versions/ccm.fast_poll-2.0.0.js', {
      root: ccm_poll_div,
      "choices": {
        "de": questions,
      },
      "finishListener": (e) => {
        window.location = '#paper';
      },
      "onfinish": function( instance, results ){
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
      }
    }, instance => {

      console.log( 'ccm started.' );

    });
  },200);
});

/*
* fetch dataset from server, calculate results and draw them
*/
async function draw_results(){
  // const dataset = await ccm.load( { url: 'https://kaul.inf.h-brs.de/data/2018/prosem/all_objects.php', method: 'GET' } );
  const dataset = await (await fetch(new Request('https://kaul.inf.h-brs.de/data/2018/prosem/all_objects.php'), {
    method: 'GET',
    mode: 'cors',
    cache: 'no-store'
  })).json();

  // count_participants
  const count_participants = dataset.length;
  for (const span of [...count_participants_spans]){
    span.innerText = count_participants;
  }

  // Browsers encode Umlauts differently
  // Therefore normalize them
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/normalize
  dataset.forEach( data => data.texts = data.texts.map(t => t.normalize('NFKD')) );

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
        const key = data.texts[i+1];
        if ( ! counter[key] ) counter[key] = 0;
        counter[key] += 1;
      });
    });
    return counters;
  }

  histogram(
    'Histogramm absolut <i>(n = ' + count_participants + ')</i>',
    dataset,
    counters,
    histogram_absolute_div
  );

  histogram(
    'Histogramm in Prozent <i>(n = ' + count_participants + ')</i>',
    dataset,
    counters,
    histogram_relative_div,
    c=>100*c/count_participants
  );

  // Sum
  delays(
    'Summe aller Verzögerungen in Millisekunden (msec) <i>(n = ' + count_participants + ')</i>',
    dataset,
    counters,
    delay_sum_div,
    (delay_sums, result, i) => delay_sums[result.texts[i]] += delay_sums[result.texts[i]] += (result.timer[i]-result.timer[i-1]) // sum
  );

  // Average
  delays(
    'Durchschnitt aller Verzögerungen in Millisekunden (msec) <i>(n = ' + count_participants + ')</i>',
    dataset,
    counters,
    delay_avg_div,
    (delay_sums, result, i) => delay_sums[result.texts[i]] += delay_sums[result.texts[i]] += (result.timer[i]-result.timer[i-1]) / flat_counters[result.texts[i]]
  );

  // Maximum
  delays(
    'Maximum aller Verzögerungen in Millisekunden (msec) <i>(n = ' + count_participants + ')</i>',
    dataset,
    counters,
    delay_max_div,
    (delay_sums, result, i) => delay_sums[result.texts[i]] = Math.max( delay_sums[ result.texts[i] ], ( result.timer[i] - result.timer[i-1] ) )
  );

  // Minimum
  delays(
    'Minimum aller Verzögerungen in Millisekunden (msec) <i>(n = ' + count_participants + ')</i>',
    dataset,
    counters,
    delay_min_div,
    (delay_sums, result, i) => {
      // avoid 0 as minimum
      if ( delay_sums[result.texts[i]] === 0 ) delay_sums[result.texts[i]] = result.timer[i] - result.timer[i-1];
      delay_sums[result.texts[i]] = Math.min( delay_sums[ result.texts[i] ], ( result.timer[i] - result.timer[i-1] ) );
    }
  );

}





 
