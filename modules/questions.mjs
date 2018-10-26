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

  // Manifest // http://agilemanifesto.org/iso/de/manifesto.html
  {agil: 'Individuen und Interaktionen', plan: 'Prozesse und Werkzeuge'},
  {agil: 'Funktionierende Software', plan: 'umfassende Dokumentation'},
  {agil: 'Zusammenarbeit mit dem Kunden', plan: 'Vertragsverhandlung'},
  {agil: 'Reagieren auf Veränderung', plan: 'Befolgen eines Plans'},

  // Gunter Dueck
  {agil: "Individuelle Menschenentwicklung", plan: "Versetzung nach Standardstufen und Klassen"},
  {agil: "Aktivierung von Selbstwirksamkeitsgefühl", plan: "Prüfungs- und Zeugnisdokumentation"},
  {agil: "Folgen von gewecktem Interesse", plan: "Befolgung von Lehrplänen"},
  {agil: "Zukunftsfähigkeit der Bildung", plan: "Bewahren klassischer Vorstellungen"},

  // https://digitaleneuordnung.de/blog/agiles-manifest-fuer-unternehmensentwicklung/
  {agil: "Konkrete Leistung", plan: "Powerpoint"},
  {agil: "(persönliche) Beziehung", plan: "wasserdichter Vertrag"},
  {agil: "sich an neue Herausforderungen anpassen können", plan: "einen festen Plan haben"}

];

// str.normalize('NFKD'):
// Browsers encode Umlauts differently
// Therefore normalize them
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/normalize
 
 
