var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('main');

const lastRow = sheet.getLastRow();
var data_sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('data');
var output_sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('output');

var lastColumn_master = output_sheet.getLastColumn();
// outputのA1から最後の行、最後の列まで範囲を取得
var range_master = output_sheet.getRange(1,1,output_sheet.getLastRow(),lastColumn_master);

const DATA_RANGE = data_sheet.getDataRange().getValues();　//見出しと同じ位置まで

// 格納するフォルダ名（部署の区分ごと）
var section_folder_name = sheet.getRange(1, 6).getValue();

var SEARCH_WORD  = "";
const CHECK_WORD = '%E8%A1%8C%E6%94%BF%E6%8C%87%E5%B0%8E%E3%80%80%E9%80%81%E6%A4%9C%E3%80%80%E6%8D%9C%E6%9F%BB%E3%80%80%E9%80%AE%E6%8D%95%E3%80%80%E3%82%A4%E3%83%B3%E3%82%B5%E3%82%A4%E3%83%80%E3%83%BC%E3%80%80%E6%9E%B6%E7%A9%BA%E3%80%80%E8%84%B1%E7%A8%8E%E3%80%80%E7%94%B3%E5%91%8A%E6%BC%8F%E3%82%8C%E3%80%80%E7%BD%B0%E9%87%91%E3%80%80%E6%9A%B4%E5%8A%9B%E5%9B%A3+%E3%80%80%E3%83%A4%E3%82%AF%E3%82%B6%E3%80%80%E5%AE%B9%E7%96%91%E3%80%80%E5%8F%8D%E7%A4%BE+OR+%E4%BA%8B%E4%BB%B6%E3%80%80%E9%81%95%E6%B3%95%E3%80%80%E9%81%95%E5%8F%8D%E3%80%80%E7%96%91%E3%81%84%E3%80%80%E5%81%BD%E8%A3%85%E3%80%80%E8%A1%8C%E6%94%BF%E5%87%A6%E5%88%86+%E3%80%80%E5%91%8A%E8%A8%B4+%E3%80%80%E3%82%B9%E3%82%AD%E3%83%A3%E3%83%B3%E3%83%80%E3%83%AB+%E3%80%80%E7%BD%AA+%E3%80%80%E4%B8%8D%E6%AD%A3%E3%80%80%E3%83%96%E3%83%A9%E3%83%83%E3%82%AF+%E3%80%80%E7%B2%89%E9%A3%BE%E3%80%80%E8%BF%B7%E6%83%91';
const HEAD_URL = 'https://www.google.com/search';
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
// ----------------------------------------------------------------------------------
      
function makeCommands() {
  var j = 2;
      
  while(sheet.getRange(j, 1).getValue()) {
    var foward_seachword = sheet.getRange(j-1, 1).getValue();
    var checkbox = sheet.getRange(j,2).getValue();
    var seach_word = sheet.getRange(j, 1).getValue();
    
    var mkdir_cmd = 'mkdir -p \"${section_folder_name}\"/\"${sub_folder_name}\"'
     .replace("${section_folder_name}",section_folder_name)
     .replace("${sub_folder_name}",seach_word);
    var cp_cmd_origin = 'cp \.\.\/hansyaPDF\/\"Google検索画面_\${seach_word}\"\.pdf \"${section_folder_name}\"\/\"${sub_folder_name}\"'
     .replace("${seach_word}",seach_word)
     .replace("${section_folder_name}",section_folder_name)
    var and = ' && ';
    var set_cmd = "";
    
    Logger.log(checkbox);
    
    if (checkbox == false){
     var cp_md = cp_cmd_origin
      .replace("${sub_folder_name}",seach_word)
     ;
     set_cmd = mkdir_cmd + and + cp_md;
      
    }else{
     // チェックのついてる代表者の時、mkdirなし、cp先も変える
     var cp_cmd = cp_cmd_origin
      .replace("${sub_folder_name}",foward_seachword)
     ;
     set_cmd = cp_cmd;
    }
    sheet.getRange(j, 3).setValue(set_cmd);
    j++
 }
  Browser.msgBox("Cmds have Made", Browser.Buttons.OK)
}
//配列で扱えるか？-------------------------------------------------------------------------
function getUrlArray() {
  let new_data_range = []; 
  /* [ 
    [検索ワード(名前), check, cmd生成, 検索クエリ出力, 代表名, 【MW】仕入先, 件数], 
    [株式会社LHP(リープ・ヒューマン・プログレス), , cmd, URL, , , ], 
    [和波 宏幸, true, cmd, URL, , , ], 
  ] 
    Logger.log(DATA_RANGE[0], DATA_RANGE[1]); // 配列で、行が表示される
  */
  for (var i = 1; i < DATA_RANGE.length; i++) {
    //Logger.log(DATA_RANGE[i][0]);  // 1行ずつ取り出し
    
    // URLを作る-------------------------------------------------------------------------
    let encodeWord = encodeURI(DATA_RANGE[i][0]);    
    let url = HEAD_URL
    + '?as_q=' + encodeWord
    + '&as_oq=' + CHECK_WORD
    ;
    //Logger.log(url);
    DATA_RANGE[i][3] = url;
    // --------------------------------------------------------------------------------

    /*
    if (DATA_RANGE[i][1] == true ) { // trueに変更
      DATA_RANGE[i][1] = true;
    }
    */
    new_data_range.push( DATA_RANGE[i]); //新しい配列にいれる
  }
  //Logger.log(new_data_range);
  output_sheet.getRange(2, 1, new_data_range.length, new_data_range[0].length).setValues(new_data_range);//書き込み
  }
// ----------------------------------------------------------------------------------
function getUrl() {
  // A2、,A3、A4....i行目, 1列目セル(A列順番に)から最終行までの値を取得できる-------------------------
  //var lastRow = sheet.getLastRow();
  var i = 2;
  while(sheet.getRange(i, 1).getValue()) {
    
    var SEARCH_WORD  = sheet.getRange(i, 1).getValue();
    
    var encodeWord = encodeURI(SEARCH_WORD);
    
    // -----------------------------------------------------------------------------------------
    /*いずれかのキーワードつき:&as_oq=が入ってる
    https://www.google.com/search?
    as_q=%E3%82%AF%E3%83%AD%E3%82%B9%E3%83%95%E3%82%A9%E3%83%BC
    &as_epq=
    &as_oq=%E8%A1%8C%E6%94%BF%E6%8C%87%E5%B0%8E%E3%80%80%E9%80%81%E6%A4%9C%E3%80%80%E6%8D%9C%E6%9F%BB%E3%80%80%E9%80%AE%E6%8D%95%E3%80%80%E3%82%A4%E3%83%B3%E3%82%B5%E3%82%A4%E3%83%80%E3%83%BC%E3%80%80%E6%9E%B6%E7%A9%BA%E3%80%80%E8%84%B1%E7%A8%8E%E3%80%80%E7%94%B3%E5%91%8A%E6%BC%8F%E3%82%8C%E3%80%80%E7%BD%B0%E9%87%91%E3%80%80%E6%9A%B4%E5%8A%9B%E5%9B%A3+%E3%80%80%E3%83%A4%E3%82%AF%E3%82%B6%E3%80%80%E5%AE%B9%E7%96%91%E3%80%80%E5%8F%8D%E7%A4%BE+OR+%E4%BA%8B%E4%BB%B6%E3%80%80%E9%81%95%E6%B3%95%E3%80%80%E9%81%95%E5%8F%8D%E3%80%80%E7%96%91%E3%81%84%E3%80%80%E5%81%BD%E8%A3%85%E3%80%80%E8%A1%8C%E6%94%BF%E5%87%A6%E5%88%86+%E3%80%80%E5%91%8A%E8%A8%B4+%E3%80%80%E3%82%B9%E3%82%AD%E3%83%A3%E3%83%B3%E3%83%80%E3%83%AB+%E3%80%80%E7%BD%AA+%E3%80%80%E4%B8%8D%E6%AD%A3%E3%80%80%E3%83%96%E3%83%A9%E3%83%83%E3%82%AF+%E3%80%80%E7%B2%89%E9%A3%BE%E3%80%80%E8%BF%B7%E6%83%91
    */
    
    var url = HEAD_URL
    + '?as_q=' + encodeWord
    //+ '?w=' + WIDTH
    //+ '&h=' + HEIGHT
    //+ "&num=" 
    + '&as_oq=' + CHECK_WORD
    ;
    //Logger.log(url);
    sheet.getRange(i, 4).setValue(url); //D列に出力
    
    
    /* 実験部分 ------------------------------------------------------------------------------------
    var each_url = "";
    each_url = sheet.getRange(i, 4).getValue();
    var options = {"contentType":"text/html;","method":"get", "muteHttpExceptions":true}; //成功
    
    var fetch = UrlFetchApp.fetch(each_url, options);    
    var response = fetch.getContentText();  //取得できる。文字数超過
    //sheet.getRange(i, 5).setValue(response);
    //Logger.log(response.match(/<div id="result-stats">(.+)件/));
    
    
    var cf_url = 'https://www.google.com/search?as_q=%E3%82%AF%E3%83%AD%E3%82%B9%E3%83%95%E3%82%A9%E3%83%BC&as_oq=%E8%A1%8C%E6%94%BF%E6%8C%87%E5%B0%8E%E3%80%80%E9%80%81%E6%A4%9C%E3%80%80%E6%8D%9C%E6%9F%BB%E3%80%80%E9%80%AE%E6%8D%95%E3%80%80%E3%82%A4%E3%83%B3%E3%82%B5%E3%82%A4%E3%83%80%E3%83%BC%E3%80%80%E6%9E%B6%E7%A9%BA%E3%80%80%E8%84%B1%E7%A8%8E%E3%80%80%E7%94%B3%E5%91%8A%E6%BC%8F%E3%82%8C%E3%80%80%E7%BD%B0%E9%87%91%E3%80%80%E6%9A%B4%E5%8A%9B%E5%9B%A3+%E3%80%80%E3%83%A4%E3%82%AF%E3%82%B6%E3%80%80%E5%AE%B9%E7%96%91%E3%80%80%E5%8F%8D%E7%A4%BE+OR+%E4%BA%8B%E4%BB%B6%E3%80%80%E9%81%95%E6%B3%95%E3%80%80%E9%81%95%E5%8F%8D%E3%80%80%E7%96%91%E3%81%84%E3%80%80%E5%81%BD%E8%A3%85%E3%80%80%E8%A1%8C%E6%94%BF%E5%87%A6%E5%88%86+%E3%80%80%E5%91%8A%E8%A8%B4+%E3%80%80%E3%82%B9%E3%82%AD%E3%83%A3%E3%83%B3%E3%83%80%E3%83%AB+%E3%80%80%E7%BD%AA+%E3%80%80%E4%B8%8D%E6%AD%A3%E3%80%80%E3%83%96%E3%83%A9%E3%83%83%E3%82%AF+%E3%80%80%E7%B2%89%E9%A3%BE%E3%80%80%E8%BF%B7%E6%83%91';
    var parse_url = UrlFetchApp.fetch(cf_url).getContentText("UTF-8");
    var fromText = '<div id="result-stats">';
    var toText = '<nobr>';
    var parser = Parser.data(parse_url).from(fromText).to(toText).build();
    Logger.log(parser); 
*/
    i++   
 }
  
  /* あとで(mkdir作ってるから一旦中断)----------------------------------------------------------------------------------
  var filename = SEARCH_WORD;
  //var pdf = UrlFetchApp.fetch(url, options).getAs('application/pdf')
  
  //var pdf = UrlFetchApp.fetch(url).getAs('application/pdf').setName(filename + '.pdf');
   var pre_pdf = UrlFetchApp.fetch(url);
   var pdf = pre_pdf.getAs(MimeType.PDF).setName(filename);
  
  // Googleドライブへ保存  
  //フォルダーIDにはGoogleドライブURL欄記載の「cap」フォルダーIDを入力
  var folder = DriveApp.getFolderById('1QuL3ZXMmtgklg9HtRQfXHFAxhdF44uwX');  
  folder.createFile(pdf);
   ------------------------------------------------------------------------------------*/

  Browser.msgBox("Gotten URLs", Browser.Buttons.OK)
}
function check_president() {
  //範囲を配列で取得
  const range_row_arrays = sheet.getRange(2,1, lastRow -1, 5).getValues();
  Logger.log('before' + range_row_arrays); 
  /*取得できる配列
  [
   [株式会社Pastoral Dog,(空欄true) ,cmd, URL, 江端一将], 
   [江端一将, false, cmd, URL, (代表)], 
   [株式会社CBコンサルティング,(空欄true) ,cmd,URL, 草刈 孝弘],
   ...
   ]
  */
  const new_arrays = [];
  for (var r = 0; r < range_row_arrays[0].length; r++) {
    //Logger.log('A:', range_row_arrays[r][0]);  // 行最初の値＝検索ワード
    //Logger.log('E:', range_row_arrays[r + 1][4]); // 各行のEの値
    //Logger.log(range_row_arrays);
    
    if (range_row_arrays[r][0] == range_row_arrays[r + 1][4]) {
      range_row_arrays[r + 1][1] = true;
      new_arrays += range_row_arrays// 値を更新してtrueにする
    }
  }
  Logger.log('after:' + range_row_arrays);
}
function scraping() {
 
  const URL = 'https://www.google.com/search?as_q=%E3%82%AF%E3%83%AD%E3%82%B9%E3%83%95%E3%82%A9%E3%83%BC&as_oq=%E8%A1%8C%E6%94%BF%E6%8C%87%E5%B0%8E%E3%80%80%E9%80%81%E6%A4%9C%E3%80%80%E6%8D%9C%E6%9F%BB%E3%80%80%E9%80%AE%E6%8D%95%E3%80%80%E3%82%A4%E3%83%B3%E3%82%B5%E3%82%A4%E3%83%80%E3%83%BC%E3%80%80%E6%9E%B6%E7%A9%BA%E3%80%80%E8%84%B1%E7%A8%8E%E3%80%80%E7%94%B3%E5%91%8A%E6%BC%8F%E3%82%8C%E3%80%80%E7%BD%B0%E9%87%91%E3%80%80%E6%9A%B4%E5%8A%9B%E5%9B%A3+%E3%80%80%E3%83%A4%E3%82%AF%E3%82%B6%E3%80%80%E5%AE%B9%E7%96%91%E3%80%80%E5%8F%8D%E7%A4%BE+OR+%E4%BA%8B%E4%BB%B6%E3%80%80%E9%81%95%E6%B3%95%E3%80%80%E9%81%95%E5%8F%8D%E3%80%80%E7%96%91%E3%81%84%E3%80%80%E5%81%BD%E8%A3%85%E3%80%80%E8%A1%8C%E6%94%BF%E5%87%A6%E5%88%86+%E3%80%80%E5%91%8A%E8%A8%B4+%E3%80%80%E3%82%B9%E3%82%AD%E3%83%A3%E3%83%B3%E3%83%80%E3%83%AB+%E3%80%80%E7%BD%AA+%E3%80%80%E4%B8%8D%E6%AD%A3%E3%80%80%E3%83%96%E3%83%A9%E3%83%83%E3%82%AF+%E3%80%80%E7%B2%89%E9%A3%BE%E3%80%80%E8%BF%B7%E6%83%91';//沖縄県企業局のダム貯水率　
  var key = 'ak-d7x32-qvry0-7xxcc-qsyrq-qf39t';
  
  var option = 
      {//url:URL,
       renderType:"HTML",
       outputAsJson:true};
  var payload = JSON.stringify(option);
  payload = encodeURIComponent(payload);
  var url = "https://phantomjscloud.com/api/browser/v2/"+ key +"/?request=" + URL + payload;

  var response = UrlFetchApp.fetch(url);
 
  var json = JSON.parse(response.getContentText()); 
  var source = json["content"];
  
  var myRegexp = /<div id="result-stats">(.+)<\/div>/;
  var title = source.match(myRegexp);
  Logger.log(title);
  
}

function clearContent(){
  // 〜行め, 〜列めを起点とし、〜行分まで、〜列分まで
  var result = Browser.msgBox("terminalで実行した?","OKなら消しちゃうよ", Browser.Buttons.OK_CANCEL);
  if (result == "ok"){
    sheet.getRange(2, 1, lastRow-1, 6).clearContent();
  } else {
    return;
  }
}