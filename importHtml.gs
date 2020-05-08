let feed_sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('feed');
const lastColumn = feed_sheet.getLastColumn();
// +変数+ ,保留
const doda_url = 'https://doda.jp/guide/kyujin_bairitsu/';
let header_all = "//*[@id='con02']/div/h2";  // xpath:  "" -> ''に変更
let header_jobtype = "//*[@id='con03']/div/h2";


function setImportHtml() {
  //指定したセルに関数を指定
  //feed_sheet.getRange("A34").setFormula('=IMPORTXML(feed_data!B1, feed_data!B2)');
  //feed_sheet.getRange("A35").setFormula('=IMPORTHTML(feed_data!B1,"table", 1)');

  
  feed_sheet.getRange("A34").setFormula('=IMPORTXML("'+doda_url+'", "'+header_all+'")'); // 成功
  feed_sheet.getRange("A35").setFormula('=IMPORTHTML("'+doda_url+'","table", 1)');
  setRowColor(34, 'yellow');
  
  setFormula("A40", doda_url, header_all); // 成功
}


function setFormula(range, url_cell, xpath) {
   feed_sheet.getRange(range).setFormula('=IMPORTXML("'+url_cell+'", "'+xpath+'")');
}


function setRowColor(row, color) {
   feed_sheet.getRange(row, 1, 1, lastColumn).setBackground(color);
}
