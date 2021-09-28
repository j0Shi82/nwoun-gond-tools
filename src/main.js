// import 'intersection-observer'; uncomment if needed
import browserUpdate from 'browser-update';
import App from './App.svelte';

const app = new App({
  target: document.body,
});

// generate with npx browserslist-useragent-regexp --ignorePatch --ignoreMinor --allowHigherVersions
if (navigator.userAgent.match(/((CPU[ +]OS|iPhone[ +]OS|CPU[ +]iPhone|CPU IPhone OS)[ +]+(10|(1[1-9]|[2-9]\d|\d{3,})|11|(1[2-9]|[2-9]\d|\d{3,})|12|(1[3-9]|[2-9]\d|\d{3,})|13|(1[4-9]|[2-9]\d|\d{3,})|14|(1[5-9]|[2-9]\d|\d{3,}))[_.]\d+(?:[_.]\d+)?)|(CFNetwork\/808\.(\d))|(CFNetwork\/8.* Darwin\/16\.5\.\d+)|(CFNetwork\/8.* Darwin\/16\.6\.\d+)|(CFNetwork\/8.* Darwin\/16\.7\.\d+)|(CFNetwork\/8.* Darwin\/16\.\d+)|(CFNetwork\/8.* Darwin\/17\.0\.\d+)|(CFNetwork\/8.* Darwin\/17\.2\.\d+)|(CFNetwork\/8.* Darwin\/17\.3\.\d+)|(CFNetwork\/8.* Darwin\/17\.\d+)|(Opera\/.+Opera Mobi.+Version\/(62|(6[3-9]|[7-9]\d|\d{3,}))\.\d+)|(Opera\/(62|(6[3-9]|[7-9]\d|\d{3,}))\.\d+.+Opera Mobi)|(Opera Mobi.+Opera(?:\/|\s+)(62|(6[3-9]|[7-9]\d|\d{3,}))\.\d+)|(SamsungBrowser\/(6|([7-9]|\d{2,})|7|([8-9]|\d{2,})|8|(9|\d{2,})|10|(1[1-9]|[2-9]\d|\d{3,})|11|(1[2-9]|[2-9]\d|\d{3,})|12|(1[3-9]|[2-9]\d|\d{3,}))\.\d+)|(Edge\/(16|(1[7-9]|[2-9]\d|\d{3,})|81|(8[2-9]|9\d|\d{3,})|84|(8[5-9]|9\d|\d{3,}))(?:\.\d+)?)|((Chromium|Chrome)\/(57|(5[8-9]|[6-9]\d|\d{3,})|83|(8[4-9]|9\d|\d{3,}))\.\d+(?:\.\d+)?([\d.]+$|.*Safari\/(?![\d.]+ Edge\/[\d.]+$)))|(Version\/(0|([1-9]|\d{2,})|10|(1[1-9]|[2-9]\d|\d{3,})|11|(1[2-9]|[2-9]\d|\d{3,})|12|(1[3-9]|[2-9]\d|\d{3,})|13|(1[4-9]|[2-9]\d|\d{3,})|14|(1[5-9]|[2-9]\d|\d{3,})|15|(1[6-9]|[2-9]\d|\d{3,}))\.\d+(?:\.\d+)? Safari\/)|(Firefox\/(52|(5[3-9]|[6-9]\d|\d{3,})|56|(5[7-9]|[6-9]\d|\d{3,})|60|(6[1-9]|[7-9]\d|\d{3,})|63|(6[4-9]|[7-9]\d|\d{3,})|66|(6[7-9]|[7-9]\d|\d{3,})|68|(69|[7-9]\d|\d{3,})|70|(7[1-9]|[8-9]\d|\d{3,})|72|(7[3-9]|[8-9]\d|\d{3,})|75|(7[6-9]|[8-9]\d|\d{3,})|78|(79|[8-9]\d|\d{3,}))\.\d+\.\d+)|(Firefox\/(52|(5[3-9]|[6-9]\d|\d{3,})|56|(5[7-9]|[6-9]\d|\d{3,})|60|(6[1-9]|[7-9]\d|\d{3,})|63|(6[4-9]|[7-9]\d|\d{3,})|66|(6[7-9]|[7-9]\d|\d{3,})|68|(69|[7-9]\d|\d{3,})|70|(7[1-9]|[8-9]\d|\d{3,})|72|(7[3-9]|[8-9]\d|\d{3,})|75|(7[6-9]|[8-9]\d|\d{3,})|78|(79|[8-9]\d|\d{3,}))\.\d+(pre|[ab]\d+[a-z]*)?)/) === null) {
  browserUpdate({
    required: {
      e: -1, f: -1, o: -1, s: -1, c: -1,
    },
    insecure: true,
    unsupported: true,
    reminder: 0,
    reminderClosed: 150,
    no_permanent_hide: true,
    api: 2020.08,
  });
}

window.app = app;

export default app;
