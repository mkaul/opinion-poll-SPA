/**
 * @overview main script for main HTML page index.html: single script version without ES6 import
 * @version 0.0.1
 * @author mkaul2m Manfred.Kaul@h-brs.de
 * @copyright The MIT License (MIT) mkaul2m on 17.08.18.
 */

// IIFE for encapsulating name space
// https://en.wikipedia.org/wiki/Immediately-invoked_function_expression
// import {questions} from "./modules/questions";

;(function(){

  const questions = [
    // ["männlich","weiblich","divers"],
    // ["Alter: 18-25", "Alter: 26-30", "Alter: 31-40", "Alter: 41-50", "jünger", "älter"],
    // Manifest
    ["Individuen und Interaktionen",  "Prozesse und Werkzeuge"],
    ["Funktionierende Software",  "Umfassende Dokumentation"],
    // ["Zusammenarbeit mit dem Kunden",  "Vertragsverhandlung"],
    // ["Reagieren auf Veränderung",  "Befolgen eines Plans"],
    //
    // // Gunter Dueck
    // ["Individuelle Menschenentwicklung", "Versetzung nach Standardstufen und Klassen"],
    // ["Aktivierung von Selbstwirksamkeitsgefühl", "Prüfungs- und Zeugnisdokumentation"],
    // ["Folgen von gewecktem Interesse", "Befolgung von Lehrplänen"],
    // ["Zukunftsfähigkeit der Bildung", "Bewahren klassischer Vorstellungen"],
    //
    // // https://digitaleneuordnung.de/blog/agiles-manifest-fuer-unternehmensentwicklung/
    // ["Konkrete Leistung", "Powerpoint"],
    // ["(persönliche) Beziehung", "wasserdichter Vertrag"],
    // ["sich an neue Herausforderungen anpassen können", "einen festen Plan haben"]
    // ["", ""],
  ];

  // include questions into HTML
  let questions_html = "<ol>";
  for (const answers of questions){
    questions_html += "<li><ol type='a'>";
    for (const answer of answers){
      questions_html += "<li>" + answer + "</li>";
    }
    questions_html += "</ol></li>";
  }
  questions_html += "</ol>";

  const questions_div = document.getElementById("questions");
  questions_div.innerHTML = questions_html;

  // get elements from HTML
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

  // Use Location API for hash changes
  // https://developer.mozilla.org/en-US/docs/Web/API/Location
  window.onhashchange = function() {
    if (location.hash.length > 0) {
      if (location.hash.endsWith('paper') ){
        welcome_div.style.display = 'none';
        survey_div.style.display = 'none';
        paper_div.style.animation = 'fadeIn 3s';
        paper_div.style.display = 'block';
        draw_results();
      } else if (location.hash.endsWith('survey')){
        welcome_div.style.display = 'none';
        paper_div.style.display = 'none';
        survey_div.style.animation = 'fadeIn 2s';
        survey_div.style.display = 'block';
      }
    } else {
      survey_div.style.display = 'none';
      paper_div.style.display = 'none';
      welcome_div.style.animation = 'fadeIn 2s';
      welcome_div.style.display = 'block';
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

      window.location += '#survey';

      // start web component for taking survey
      ccm.start('https://ccmjs.github.io/mkaul-components/fast_poll/versions/ccm.fast_poll-2.0.0.js', {
        root: ccm_poll_div,
        "choices": {
          "de": questions,
        },
        "finishListener": (e) => {
          window.location += '#paper';
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

        // console.log( 'ccm started.' );

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

    // console.log( dataset );

    // count_participants
    const count_participants = dataset.length;
    for (const span of [...count_participants_spans]){
      span.innerText = count_participants;
    }

    // count answers
    const counters = count( dataset ); // caching calculation of counters
    const flat_counters = Object.assign({}, ...counters);

    /*
     * count number of answers
     * @param dataset - raw dataset of dataset of survey
     */
    function count( dataset ){
      const counters = questions.reduce((counters,answer,i)=>{
        const answers = {};
        answers[answer[0]] = 0;
        answers[answer[1]] = 0;
        counters.push( answers );
        return counters;
      }, []);

      for (const data of dataset){
        counters.forEach((counter, i)=>{
          counter[data.texts[i+1]] += 1;
        });
      }

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

  function histogram( title, results, counters, plot_result, mapping ){

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
  }

  function delays( title, results, counters, plot_result, mapping ){

    const delay_sums = {};
    for (const result of results){
      for (let i=0; i<result.texts.length;i++){
        if (i===0) continue;
        if (!delay_sums[result.texts[i]]) delay_sums[result.texts[i]] = 0;
        // sum, average, min, max, std deviation, median
        mapping(delay_sums, result, i);
      }
    }

    const data = questions.reduce((groups,answers,i)=>{
      groups.push({
        x: answers,
        y: answers.map( answer => delay_sums[answer] ),
        name: 'Auswahl ' + (i+1),
        type: 'bar'
      });
      return groups;
    },[]);

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

  }

}());




 
