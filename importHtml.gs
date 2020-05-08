let feed_sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('feed');
const lastColumn = feed_sheet.getLastColumn();
const doda_url = 'https://doda.jp/guide/kyujin_bairitsu/';
let header_all = '//*[@id="con02"]/div/h2';

function setImportHtml() {
  //指定したセルに関数を指定
  feed_sheet.getRange("A34").setFormula('=IMPORTXML(feed_data!B1, feed_data!B2)');
  feed_sheet.getRange("A35").setFormula('=IMPORTHTML(feed_data!B1,"table", 1)');
  feed_sheet.getRange(34, 1, 1, lastColumn).setBackground('yellow');
}
