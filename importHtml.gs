const feed_sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('feed');
const lastColumn = feed_sheet.getLastColumn();
// シート関数には +変数+ 
const doda_url = 'https://doda.jp/guide/kyujin_bairitsu/';
let header_all = "//*[@id='con02']/div/h2";  // xpath:  "" -> ''に変更
let header_jobtype = "//*[@id='con03']/div/h2";


function setImportHtml() {
  //指定したセルに関数を指定
  //feed_sheet.getRange("A34").setFormula('=IMPORTXML(feed_data!B1, feed_data!B2)');
  //feed_sheet.getRange("A35").setFormula('=IMPORTHTML(feed_data!B1,"table", 1)');

  setHeaderAndTable(2, doda_url, header_all);
  setRowColor(2, 4);
  
  setHeaderAndTable(20, doda_url, header_jobtype, 2);
  setRowColor(20, 25);
}


function setHeaderAndTable(header_row_num, url_cell, xpath, table_num = 1) {
  //feed_sheet.getRange("A2").setFormula('=IMPORTXML("'+doda_url+'", "'+header_all+'")'); // 成功
  feed_sheet.getRange(header_row_num, 1).setFormula('=IMPORTXML("'+url_cell+'", "'+xpath+'")');
  //見出しの下にtableを置く
  feed_sheet.getRange(header_row_num+1, 1).setFormula('=IMPORTHTML("'+url_cell+'","table", '+table_num+' )');
}


function setRowColor(header_row, inner_row) {
  feed_sheet.getRange(header_row, 1, 1, lastColumn).setBackground('#84e1ef');
  feed_sheet.getRange(inner_row, 1, 1, lastColumn).setBackground('yellow');
}
