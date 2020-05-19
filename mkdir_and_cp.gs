var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('シート2');
// 参考
//https://officeforest.org/wp/2018/11/25/google-apps-script%E3%81%A7pdf%E3%82%92%E4%BD%9C%E6%88%90%E3%81%99%E3%82%8B/
function makepdf() {
  var url = 
  'https://www.google.com/search?lr=&as_qdr=all&ei=Rhq-XpKTIom2mAWE8ok4&q=%E5%90%89%E7%80%AC%E7%A4%BC+%E8%A1%8C%E6%94%BF%E6%8C%87%E5%B0%8E+OR+%E9%80%81%E6%A4%9C+OR+%E6%8D%9C%E6%9F%BB+OR+%E9%80%AE%E6%8D%95+OR+%E3%82%A4%E3%83%B3%E3%82%B5%E3%82%A4%E3%83%80%E3%83%BC+OR+%E6%9E%B6%E7%A9%BA+OR+%E8%84%B1%E7%A8%8E+OR+%E7%94%B3%E5%91%8A%E6%BC%8F%E3%82%8C+OR+%E7%BD%B0%E9%87%91+OR+%E6%9A%B4%E5%8A%9B%E5%9B%A3+OR+%E3%83%A4%E3%82%AF%E3%82%B6+OR+%E5%AE%B9%E7%96%91+OR+%E5%8F%8D%E7%A4%BE+OR+OR+OR+%E4%BA%8B%E4%BB%B6+OR+%E9%81%95%E6%B3%95+OR+%E9%81%95%E5%8F%8D+OR+%E7%96%91%E3%81%84+OR+%E5%81%BD%E8%A3%85+OR+%E8%A1%8C%E6%94%BF%E5%87%A6%E5%88%86+OR+%E5%91%8A%E8%A8%B4+OR+%E3%82%B9%E3%82%AD%E3%83%A3%E3%83%B3%E3%83%80%E3%83%AB+OR+%E7%BD%AA+OR+%E4%B8%8D%E6%AD%A3+OR+%E3%83%96%E3%83%A9%E3%83%83%E3%82%AF+OR+%E7%B2%89%E9%A3%BE+OR+%E8%BF%B7%E6%83%91&oq=%E5%90%89%E7%80%AC%E7%A4%BC+%E8%A1%8C%E6%94%BF%E6%8C%87%E5%B0%8E+OR+%E9%80%81%E6%A4%9C+OR+%E6%8D%9C%E6%9F%BB+OR+%E9%80%AE%E6%8D%95+OR+%E3%82%A4%E3%83%B3%E3%82%B5%E3%82%A4%E3%83%80%E3%83%BC+OR+%E6%9E%B6%E7%A9%BA+OR+%E8%84%B1%E7%A8%8E+OR+%E7%94%B3%E5%91%8A%E6%BC%8F%E3%82%8C+OR+%E7%BD%B0%E9%87%91+OR+%E6%9A%B4%E5%8A%9B%E5%9B%A3+OR+%E3%83%A4%E3%82%AF%E3%82%B6+OR+%E5%AE%B9%E7%96%91+OR+%E5%8F%8D%E7%A4%BE+OR+OR+OR+%E4%BA%8B%E4%BB%B6+OR+%E9%81%95%E6%B3%95+OR+%E9%81%95%E5%8F%8D+OR+%E7%96%91%E3%81%84+OR+%E5%81%BD%E8%A3%85+OR+%E8%A1%8C%E6%94%BF%E5%87%A6%E5%88%86+OR+%E5%91%8A%E8%A8%B4+OR+%E3%82%B9%E3%82%AD%E3%83%A3%E3%83%B3%E3%83%80%E3%83%AB+OR+%E7%BD%AA+OR+%E4%B8%8D%E6%AD%A3+OR+%E3%83%96%E3%83%A9%E3%83%83%E3%82%AF+OR+%E7%B2%89%E9%A3%BE+OR+%E8%BF%B7%E6%83%91&gs_lcp=CgZwc3ktYWIQA1C0lhVYg58VYOihFWgAcAB4AIABAIgBAJIBAJgBAqABAaABAqoBB2d3cy13aXo&sclient=psy-ab&ved=0ahUKEwiSzrzjg7XpAhUJG6YKHQR5AgcQ4dUDCAw&uact=5'
  //+ '&format=pdf&portrait=false&size=A4&gridlines=false&fitw=true';
  var headers = { 'Content-Type': 'application/pdf'}
  var options = {
    'method' : 'GET',
    'headers': headers,
    'muteHttpExceptions' : true
  }
  //Logger.log('検索URL' + url);

  //URLの組み立て
  //var url = "https://docs.google.com/spreadsheets/d/" + key + "/export?gid=" + sheetID + "&format=pdf&portrait=false&size=A4&gridlines=false&fitw=true"
  //PDF生成するURLをfetchする
  let response = UrlFetchApp.fetch(url); // text -> pdfがダメな組み合わせかも
  Utilities.sleep(1000);
  
  let fileBlob = response.getBlob().setName("test" + ".pdf")  //docファイル(HTMLらしい)
   //   response.getBlob().setName("test" + ".pdf");  //urlfetchappは連続で呼び出すと、途中でアクセス過多で503エラーや403エラー、429エラーが出るので、沢山呼び出す時は、10秒くらいUtilities.sleep入れてウェイトする必要があります。一日に呼び出せるQuotaにも注意が必要です。PDFのファイルサイズにも注意。
  //フォルダーIDにはGoogleドライブURL欄記載の「cap」フォルダーIDを入力
  let folder = DriveApp.getFolderById('1QuL3ZXMmtgklg9HtRQfXHFAxhdF44uwX');
  folder.createFile(fileBlob);
}
function changeToPdf() {
  var doc = DriveApp.getFileById('15KGONfYONP7WJutoigJxrMtleJEGHYqf');
  var pdfFile  = doc.getAs(MimeType.PDF);                // Spreadsheet/File => Blob(pdf)
  DriveApp.getFolderById('1QuL3ZXMmtgklg9HtRQfXHFAxhdF44uwX').createFile('New File', pdfFile,  MimeType.PDF);
}
// 途中 ----------------------------------------------------------------------------------
function myF() {
  //var url = sheet.getRange(1, 1).getValue();  // あらかじめサンプルのURLを入力している前提
  
  // A2、,A3、A4....i行目, 1列目セル(A列順番に)から最終行までの値を取得できる-------------------------
  var lastRow = sheet.getLastRow();
  for(var i = 2; i <= lastRow; i++) {
   if(sheet.getRange(i, 1).getValue()){
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
    var url = 
     'https://www.google.com/search'
     + '?as_q=' + encodeWord
    //+ '?w=' + WIDTH
    //+ '&h=' + HEIGHT
    //+ "&num=" 
     + '&as_oq=' + check_word
    ;
    Logger.log(url);
    sheet.getRange(i, 4).setValue(url); //D列に出力
   }
 }
  
  /* あとで----------------------------------------------------------------------------------
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
  Browser.msgBox("Complete", Browser.Buttons.OK)
}
