var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('シート2');
var SEARCH_WORD  = "";
const lastRow = sheet.getLastRow();
var sheet_master = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('master');
var sheet_data = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('data');
var lastColumn_master = sheet_master.getLastColumn();
// masterのA1から最後の行、最後の列まで範囲を取得
var range_master = sheet_master.getRange(1,1,sheet_master.getLastRow(),lastColumn_master);

var cell_beforetext = "";
var cell_aftertext = "";
var postText = "";

// 格納するフォルダ名（部署の区分ごと）
var section_folder_name = sheet.getRange(1, 6).getValue();
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
// ----------------------------------------------------------------------------------
function getUrl() {
  //var url = sheet.getRange(1, 1).getValue();  // あらかじめサンプルのURLを入力している前提
  
  // A2、,A3、A4....i行目, 1列目セル(A列順番に)から最終行までの値を取得できる-------------------------
  //var lastRow = sheet.getLastRow();
  var i = 2;
  while(sheet.getRange(i, 1).getValue()) {
    //Logger.log(sheet.getRange(i, 1).getValue());
    
    var SEARCH_WORD  = sheet.getRange(i, 1).getValue();
    Logger.log('SEARCH_WORD:' + SEARCH_WORD);
    var encodeWord = encodeURI(SEARCH_WORD);
    
    // -----------------------------------------------------------------------------------------
    /*いずれかのキーワードつき:&as_oq=が入ってる
    https://www.google.com/search?
    as_q=%E3%82%AF%E3%83%AD%E3%82%B9%E3%83%95%E3%82%A9%E3%83%BC
    &as_epq=
    &as_oq=%E8%A1%8C%E6%94%BF%E6%8C%87%E5%B0%8E%E3%80%80%E9%80%81%E6%A4%9C%E3%80%80%E6%8D%9C%E6%9F%BB%E3%80%80%E9%80%AE%E6%8D%95%E3%80%80%E3%82%A4%E3%83%B3%E3%82%B5%E3%82%A4%E3%83%80%E3%83%BC%E3%80%80%E6%9E%B6%E7%A9%BA%E3%80%80%E8%84%B1%E7%A8%8E%E3%80%80%E7%94%B3%E5%91%8A%E6%BC%8F%E3%82%8C%E3%80%80%E7%BD%B0%E9%87%91%E3%80%80%E6%9A%B4%E5%8A%9B%E5%9B%A3+%E3%80%80%E3%83%A4%E3%82%AF%E3%82%B6%E3%80%80%E5%AE%B9%E7%96%91%E3%80%80%E5%8F%8D%E7%A4%BE+OR+%E4%BA%8B%E4%BB%B6%E3%80%80%E9%81%95%E6%B3%95%E3%80%80%E9%81%95%E5%8F%8D%E3%80%80%E7%96%91%E3%81%84%E3%80%80%E5%81%BD%E8%A3%85%E3%80%80%E8%A1%8C%E6%94%BF%E5%87%A6%E5%88%86+%E3%80%80%E5%91%8A%E8%A8%B4+%E3%80%80%E3%82%B9%E3%82%AD%E3%83%A3%E3%83%B3%E3%83%80%E3%83%AB+%E3%80%80%E7%BD%AA+%E3%80%80%E4%B8%8D%E6%AD%A3%E3%80%80%E3%83%96%E3%83%A9%E3%83%83%E3%82%AF+%E3%80%80%E7%B2%89%E9%A3%BE%E3%80%80%E8%BF%B7%E6%83%91
    */
    
    var check_word = '%E8%A1%8C%E6%94%BF%E6%8C%87%E5%B0%8E%E3%80%80%E9%80%81%E6%A4%9C%E3%80%80%E6%8D%9C%E6%9F%BB%E3%80%80%E9%80%AE%E6%8D%95%E3%80%80%E3%82%A4%E3%83%B3%E3%82%B5%E3%82%A4%E3%83%80%E3%83%BC%E3%80%80%E6%9E%B6%E7%A9%BA%E3%80%80%E8%84%B1%E7%A8%8E%E3%80%80%E7%94%B3%E5%91%8A%E6%BC%8F%E3%82%8C%E3%80%80%E7%BD%B0%E9%87%91%E3%80%80%E6%9A%B4%E5%8A%9B%E5%9B%A3+%E3%80%80%E3%83%A4%E3%82%AF%E3%82%B6%E3%80%80%E5%AE%B9%E7%96%91%E3%80%80%E5%8F%8D%E7%A4%BE+OR+%E4%BA%8B%E4%BB%B6%E3%80%80%E9%81%95%E6%B3%95%E3%80%80%E9%81%95%E5%8F%8D%E3%80%80%E7%96%91%E3%81%84%E3%80%80%E5%81%BD%E8%A3%85%E3%80%80%E8%A1%8C%E6%94%BF%E5%87%A6%E5%88%86+%E3%80%80%E5%91%8A%E8%A8%B4+%E3%80%80%E3%82%B9%E3%82%AD%E3%83%A3%E3%83%B3%E3%83%80%E3%83%AB+%E3%80%80%E7%BD%AA+%E3%80%80%E4%B8%8D%E6%AD%A3%E3%80%80%E3%83%96%E3%83%A9%E3%83%83%E3%82%AF+%E3%80%80%E7%B2%89%E9%A3%BE%E3%80%80%E8%BF%B7%E6%83%91';
    var url = HEAD_URL
    + '?as_q=' + encodeWord
    //+ '?w=' + WIDTH
    //+ '&h=' + HEIGHT
    //+ "&num=" 
    + '&as_oq=' + check_word
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

  // 完了メッセージ
  Browser.msgBox("Gotten URLs", Browser.Buttons.OK)
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