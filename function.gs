// (シート側)メニューバーにカスタムメニューを追加。初回はこれを実行して許可する
function onOpen() {
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  var entries = [{
    name : "CSVで出力",
    functionName : "csvDownload" // 関数設定
  }];
  spreadsheet.addMenu("その他", entries);
};

// JSを用いてCSVファイルをダウンロードする
function csvDownload() {
  // dialog.html をもとにHTMLファイルを生成
  // evaluate() は dialog.html 内の GAS を実行するため（ <?= => の箇所）
  var html = HtmlService.createTemplateFromFile("dialog").evaluate();
  // 上記HTMLファイルをダイアログ出力
  SpreadsheetApp.getUi().showModalDialog(html, "ダウンロードなう");
}

// JS側で使用
function getData() {
  // スプレッドシート上の値を二次元配列の形で取得
  var sheet = SpreadsheetApp.getActiveSheet();
  var values = sheet.getDataRange().getValues();

  // 二次元配列をCSV形式のテキストデータに変換
  var dataArray = [];
  for (var i = 0; i < values.length; i++) {
    dataArray.push(values[i].join(","));
  }
  return dataArray.join("\r\n");  // 改行コードは windows を想定
}

// JS側で使用
// ファイル名の設定はここで！！
function getFileName() {
  var spreadSheet = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = spreadSheet.getActiveSheet();
  var now = new Date();
  var datetime = Utilities.formatDate( now, 'Asia/Tokyo', 'yyyyMMddHHmm');
  // アクティブシート名+現在日時
  return sheet.getName() + '_' + datetime + '.csv';
}