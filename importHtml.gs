const feed_sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('feed');
const add_data_sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('add_data');
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
//スプレッドシートの内容をadd_dataシートに追加
function addFeedData() {
  let data_range = feed_sheet.getDataRange().getValues();
  //Logger.log(data_range[2], data_range[22]); //配列なので０始まり
  /* [業種, 求人倍率, 前月比, 前年同月比, 求人数, 転職希望者数] 
  [営業系, 2.33, ↑0.04, ↓-0.14, , ]
  */
  let new_data_array = [];
  let Reg_exp = /.*IT.*|全体/;
  
  for (var i = 0; i < data_range.length; i++) {
    if (data_range[i][0].match(Reg_exp)){
      Logger.log(data_range[i]);
    }
    
  //return new_data_array;
  //Logger.log(new_data_array);
  }
}

function urlfetch() {
  const postheader = {
    "accept":"gzip, */*",
    "timeout":"20000"
  }  

  const parameters = {
    "method": "get",
    "muteHttpExceptions": true,
    "headers": postheader
  }

  //Logger.log(UrlFetchApp.fetch(doda_url, parameters).getContentText('UTF-8'));
  const content = UrlFetchApp.fetch(doda_url, parameters).getContentText('UTF-8');
  
  //let m = content.match(/<td(?: style=".+")?>(?:<span style=".{1,15}">.<\/span>)?([^<]+)<\/td>/gm);
  //Logger.log(M);
  let array = [];
  let num_Regexp = /<td(?: style=".+")?(?:><span style=".+)?>(-*\d\.\d\d)<\/td>/gm;  //数字のみ抜き出せる
  let headnum_Regexp = /<td(?: style=".+")?(?:><span style=".+)?>([^<].{1,15}[^>])<\/td>/gm; // 全体見出し以外の抜き出し可
  
  let myRegexp = /<td(?: style=".+")?>(?:<span style=".{1,15}">.<\/span>)?([^<]+)<\/td>/gm; // 全体見出し抜き出し可(-も入る)
  var elems = content.matchAll(myRegexp);
  
  for(var i = 0; i < elems.length; i++ ) {
    //var str = elems[i];
    Logger.log(elems[i]);
    // 以下の一致したら除外する
    //if (str != '-') { array.push(str) }
  }
  return array;
  //Logger.log(array);
}