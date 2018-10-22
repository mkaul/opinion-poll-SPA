/**
 * @overview DRY definition of survey questions for use in both document and scripts as well
 * @description single place for the definition: Don´t Repeat Yourself: DRY!
 * @version 0.0.1
 * @author mkaul2m Manfred.Kaul@h-brs.de
 * @copyright The MIT License (MIT) mkaul2m on 20.10.18.
 */

export const questions = [
  // ["männlich","weiblich","divers"],
  // ["Alter: 18-25", "Alter: 26-30", "Alter: 31-40", "Alter: 41-50", "jünger", "älter"],

  // Manifest
  ["Individuen und Interaktionen",  "Prozesse und Werkzeuge"],
  ["Funktionierende Software",  "Umfassende Dokumentation"],
  ["Zusammenarbeit mit dem Kunden",  "Vertragsverhandlung"],
  ["Reagieren auf Veränderung",  "Befolgen eines Plans"],

  // Gunter Dueck
  ["Individuelle Menschenentwicklung", "Versetzung nach Standardstufen und Klassen"],
  ["Aktivierung von Selbstwirksamkeitsgefühl", "Prüfungs- und Zeugnisdokumentation"],
  ["Folgen von gewecktem Interesse", "Befolgung von Lehrplänen"],
  ["Zukunftsfähigkeit der Bildung", "Bewahren klassischer Vorstellungen"],

  // https://digitaleneuordnung.de/blog/agiles-manifest-fuer-unternehmensentwicklung/
  ["Konkrete Leistung", "Powerpoint"],
  ["(persönliche) Beziehung", "wasserdichter Vertrag"],
  ["sich an neue Herausforderungen anpassen können", "einen festen Plan haben"]
  // ["", ""],
].map( pair => pair.map( str => str.normalize('NFKD') ) );

// str.normalize('NFKD'):
// Browsers encode Umlauts differently
// Therefore normalize them
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/normalize
 
 
