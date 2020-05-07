var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('main');
var data_sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('data');
var output_sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('output');

const lastRow = data_sheet.getLastRow();
var lastColumn_master = data_sheet.getLastColumn();
// outputのA1から最後の行、最後の列まで範囲を取得
var range_master = output_sheet.getRange(1,1,output_sheet.getLastRow(),lastColumn_master);

const DATA_RANGE = data_sheet.getDataRange().getValues();　//見出しと同じ位置まで

// 格納するフォルダ名（部署の区分ごと）
var section_folder_name = DATA_RANGE[0][5];

var SEARCH_WORD  = "";
const CHECK_WORD = '%E8%A1%8C%E6%94%BF%E6%8C%87%E5%B0%8E%E3%80%80%E9%80%81%E6%A4%9C%E3%80%80%E6%8D%9C%E6%9F%BB%E3%80%80%E9%80%AE%E6%8D%95%E3%80%80%E3%82%A4%E3%83%B3%E3%82%B5%E3%82%A4%E3%83%80%E3%83%BC%E3%80%80%E6%9E%B6%E7%A9%BA%E3%80%80%E8%84%B1%E7%A8%8E%E3%80%80%E7%94%B3%E5%91%8A%E6%BC%8F%E3%82%8C%E3%80%80%E7%BD%B0%E9%87%91%E3%80%80%E6%9A%B4%E5%8A%9B%E5%9B%A3+%E3%80%80%E3%83%A4%E3%82%AF%E3%82%B6%E3%80%80%E5%AE%B9%E7%96%91%E3%80%80%E5%8F%8D%E7%A4%BE+OR+%E4%BA%8B%E4%BB%B6%E3%80%80%E9%81%95%E6%B3%95%E3%80%80%E9%81%95%E5%8F%8D%E3%80%80%E7%96%91%E3%81%84%E3%80%80%E5%81%BD%E8%A3%85%E3%80%80%E8%A1%8C%E6%94%BF%E5%87%A6%E5%88%86+%E3%80%80%E5%91%8A%E8%A8%B4+%E3%80%80%E3%82%B9%E3%82%AD%E3%83%A3%E3%83%B3%E3%83%80%E3%83%AB+%E3%80%80%E7%BD%AA+%E3%80%80%E4%B8%8D%E6%AD%A3%E3%80%80%E3%83%96%E3%83%A9%E3%83%83%E3%82%AF+%E3%80%80%E7%B2%89%E9%A3%BE%E3%80%80%E8%BF%B7%E6%83%91';
const HEAD_URL = 'https://www.google.com/search';
const AND = ' && ';
var set_cmd = "";

//配列で扱う-------------------------------------------------------------------------
function getUrlCmdArray() {
  let new_data_range = [];
  /* [ 
    [検索ワード(名前), check, cmd生成, 検索クエリ出力, 代表名, 【MW】仕入先, 件数], 
    [株式会社LHP(リープ・ヒューマン・プログレス), , cmd, URL, , , ], 
    [和波 宏幸, true, cmd, URL, , , ], 
  ] 
    Logger.log(DATA_RANGE[0], DATA_RANGE[1]); // 配列で、行が表示される
  */
  for (var i = 1; i < DATA_RANGE.length; i++) {
    //Logger.log(DATA_RANGE[i]);  // 1行ずつ取り出し
    
    // URLを作る-------------------------------------------------------------------------
    let encodeWord = encodeURI(DATA_RANGE[i][0]);    
    let url = HEAD_URL
    + '?as_q=' + encodeWord
    + '&as_oq=' + CHECK_WORD
    ;
    //Logger.log(url);
    DATA_RANGE[i][3] = url;
    // --------------------------------------------------------------------------------
    // cmd作る -------------------------------------------------------------------------
    var foward_seachword = DATA_RANGE[i-1][0];
    var checkbox = DATA_RANGE[i][1];
    var seach_word = DATA_RANGE[i][0];
    
    mkdir_cmd = 'mkdir -p \"${section_folder_name}\"/\"${sub_folder_name}\"'
    .replace("${section_folder_name}",section_folder_name)
    .replace("${sub_folder_name}",seach_word);

    cp_cmd_origin = 'cp \.\.\/hansyaPDF\/\"Google検索画面_\${seach_word}\"\.pdf \"${section_folder_name}\"\/\"${sub_folder_name}\"'
    .replace("${seach_word}",seach_word)
    .replace("${section_folder_name}",section_folder_name);    
    
    if (checkbox == false){
      var cp_cmd = cp_cmd_origin
      .replace("${sub_folder_name}",seach_word);
      set_cmd = mkdir_cmd + AND + cp_cmd;
    }else{  // チェックがついてる=代表者の時、mkdirなし、cp先も変える
      var cp_cmd = cp_cmd_origin
      .replace("${sub_folder_name}",foward_seachword)
      set_cmd = cp_cmd;
    }
    DATA_RANGE[i][2] = set_cmd;
    
    new_data_range.push( DATA_RANGE[i]); //新しい配列にいれる
  }
  //Logger.log(new_data_range);
  writeToSheet(output_sheet,new_data_range);
  //Browser.msgBox("cmd & URLs are made!!", Browser.Buttons.OK);
}

// ----------------------------------------------------------------------------------
function checkPresident() {  // 「代表者」列の名前と検索ワードが一致したら、検索ワードにチェックをつける
  let new_data_range = []; 
  for (var j = 1; j < DATA_RANGE.length; j++) {
    //Logger.log(DATA_RANGE[j]);  // 1行ずつ取り出し
    var foward_seachword_president = DATA_RANGE[j-1][4];
    if (DATA_RANGE[j][0] === foward_seachword_president) {
      DATA_RANGE[j][1] = true;
    } else {
      DATA_RANGE[j];
    }
    new_data_range.push( DATA_RANGE[j]);
  }
 writeToSheet(data_sheet,new_data_range);
}

function makePresidentRow() {  //代表者が抜けていたら、行追加＋検索ワードに書き込み
  let new_data_range = [];
  
  let arrData = [
    ['検索ワード', , 'cmd', 'URL', , , ]
  ];
  var rows = arrData.length;
  var cols = arrData[0].length;
  
  for (var k = 2; k <= lastRow; k++) {    
    var after_cell_word = data_sheet.getRange(k+1, 1);
    var foward_cell_president = DATA_RANGE[k-1][4];
    
    if (DATA_RANGE[k][4] == '') {
      ;
    } else if (DATA_RANGE[k][0] == foward_cell_president ) {
      ;
    } else if (DATA_RANGE[k][4] && ( DATA_RANGE[k][4] !== after_cell_word )) {
      //Logger.log(k + 'に行を足そう！！');
      data_sheet.insertRows(k, 1);
      //data_sheet.getRange(k+1, 1,DATA_RANGE.length,DATA_RANGE[0].length).setValues(arrData);
    } else {
      Logger.log(DATA_RANGE[k][0] + 'はOK！！');
      //DATA_RANGE[k];
    }
    //new_data_range.push( DATA_RANGE[k]);
  }
 //writeToSheet(data_sheet,new_data_range);
}

function writeToSheet(sheet_name,data_range) {
  sheet_name.getRange(2, 1, data_range.length, data_range[0].length).setValues(data_range);
}

function clearContent(){
  // 〜行め, 〜列めを起点とし、〜行分まで、〜列分まで
  var result = Browser.msgBox("terminalで実行した?","OKなら消しちゃうよ", Browser.Buttons.OK_CANCEL);
  if (result == "ok"){
    data_sheet.getRange(2, 1, DATA_RANGE.length, DATA_RANGE[0].length).clearContent();
  } else {
    return;
  }
}
// ----------------------------------------------------------------------------------
/*
function sendScreenshotOfWebPage() {  
  var response = UrlFetchApp.fetch(url, options);
  //Logger.log(response);
  
  var filename = '{SEARCH_WORD}.pdf';  //docファイルになってる
  var fileBlob = response.getBlob().setName(filename); //Blob型の便利なデータにする
  //フォルダーIDにはGoogleドライブURL欄記載の「cap」フォルダーIDを入力
  var folder = DriveApp.getFolderById('1QuL3ZXMmtgklg9HtRQfXHFAxhdF44uwX'); 
  folder.createFile(fileBlob);
}
*/