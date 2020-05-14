function getText_fromHtml(){
	//変数宣言(スプレッドシート側) masterが取得したいデータを記載したマスタ、dataが取得したいデータを取っていくデータシート。
	var bookurl_work = "https://docs.google.com/spreadsheets/d/1JdlyRIaxjIxvQ5wNmhq9D-EK1oPYGOuCP_9qJlyLUJY";
	var sheetName_master = "master";
	var sheetName_data = "data";
	var book_work = SpreadsheetApp.openByUrl(bookurl_work);
	var sheet_master = book_work.getSheetByName(sheetName_master);
	var sheet_data = book_work.getSheetByName(sheetName_data);

	//変数宣言(スクリプトを回すために使う変数)
	var lastColumn_master = sheet_master.getLastColumn();
	var lastRow_data = sheet_data.getLastRow() + 1;
	var range_data = sheet_data.getRange(lastRow_data,1,lastRow_data,4);
	var loopCount = sheet_master.getLastRow()-1;
  
    // masterのA1から最後の行、最後の列まで範囲を取得
	var range_master = sheet_master.getRange(1,1,sheet_master.getLastRow(),lastColumn_master);

	//変数宣言(シート入力用の変数関係)
	var cell_productName = "";
	var text_productName = "";
    var cell_storeName =  "";
    var text_storeName = "";
	var url_gethtml = "";
    var cell_url = "";
    var cell_beforetext = "";
    var cell_aftertext = "";

	//変数宣言(今日の日付)
	var date_today = new Date();

	//変数宣言(HTML取得関係)
	var opt = {"contentType":"text/html;","method":"get"};
	var data_html = "";
	var content_html ="";
	var postText = "";

  //繰り返し開始箇所
  for (var i=2; i<=loopCount+1; i++) {
    //html取得
	cell_productName = range_master.getCell(i,1);
	text_productName = cell_productName.getValue();
    cell_storeName =  range_master.getCell(i,2);
    text_storeName = cell_storeName.getValue();
    for (var j=3;j<=5;j++){
      cell_url = range_master.getCell(i,j);
      url_gethtml = url_gethtml+cell_url.getValue();
    }
    //URLのHTMLを取得
    data_html = UrlFetchApp.fetch(url_gethtml ,opt);
    content_html = data_html.getContentText();
    Logger.log(content_html);
    
    cell_beforetext = range_master.getCell(i,6);　　//F
    cell_aftertext = range_master.getCell(i,7);   //G
    
    //getStringSlice関数を呼び出し
    postText = getStringSlice(content_html, cell_beforetext.getValue(),cell_aftertext.getValue());
    range_data.getCell(1, 1).setValue(text_productName);
    range_data.getCell(1, 2).setValue(text_storeName);
    range_data.getCell(1, 3).setValue(postText);
    range_data.getCell(1, 4).setValue(date_today);
    lastRow_data = sheet_data.getLastRow() + 1;
    url_gethtml = "";
    range_data = sheet_data.getRange(lastRow_data,1,lastRow_data,4);
  }
}

function getStringSlice(content, startStr, endStr){
  var indexStart = content.indexOf(startStr);
  if(indexStart == -1){
    return "";
  } else {
    indexStart += startStr.length
    return content.slice(indexStart, content.indexOf(endStr, indexStart));
  }
}
