const ss = SpreadsheetApp.openById("1_Jn5nXyw8teqOMhPfgbqWbFB_bp_-Xhec4fnQ_3PdaA"),
    feed_sheet = ss.getSheetByName("feed"),
    output_sheet = ss.getSheetByName("output");
let feed_data = feed_sheet.getDataRange().getValues(),
    //Logger.log(feed_data[2][1], feed_data[22][1]); //配列なので０始まり
    feed_a1 = feed_data[0][0]; //feedシートの年月（2020年3月の転職市場の概要）

//実際に実行する部分:イベントトリガー設置
function checkDateAndRun() {
  let lastRow_num = output_sheet.getLastRow(),
      output_lastdata = output_sheet.getRange(lastRow_num ,1).getValue(),//GMT
      formatted_lastdata = Utilities.formatDate(output_lastdata, 'JST', 'yyyy年M月');
  formatted_lastdata += 'の転職市場の概要';
  //Logger.log(feed_a1,formatted_lastdata);
  if (feed_a1 == formatted_lastdata) {
    Browser.msgBox("最新データは記入済み");
    return
  } else  {
    addFeedData();
    Browser.msgBox("データ更新しました");
  }
}
function addFeedData() {
  let month = feed_a1.match(/(.+)の転職市場の概要/); // 年月データ
  month = month[1]; //2020年3月
  let it_regExp = /.*IT.*/,
      whole_regExp = /全体/;

  // 「全体」は重複するので弾く  
  const unique_feed_data = feed_data.filter(function(e, index){
    return !feed_data.some(function(e2, index2){
      return index > index2 && e[0] == e2[0] && e[1] == e2[1];
    });
  });

  const callback = element => element[0].match(it_regExp) || element[0].match(whole_regExp) ? element : []
  let sliced_unique_array = unique_feed_data.flatMap(callback); 
  //Logger.log(sliced_unique_array) // [全体, 2.54, ↑ 0.02, ↓ -0.08, -, -, IT・通信, 7.04, ↑0.24, ↓-0.23, , , 技術系（IT・通信）, 9.41, ↑0.72, ↓-0.16, , ]
  
  sliced_unique_array.map( function( value, index, array ) {  // 元の配列を更新,flatMapしても、空白[]が残ってしまう。(mapの挙動と変わらない)→後ろでflatする。
    if( index == 0  || index % 6 == 0) {
      array[index] = [];
    }
    else if (value == '-' || value == '') {
     array[index] = [];
    }
    else if ( value.toString().match(/[↑↓]-?.+/) ) { // 一度文字列変換してから正規表現match,replace->数字に戻す
       array[index] = Number(value.replace(/[↑↓]/, ''));
    }
    else {
      array[index] = value;
    }
  });
  let result = sliced_unique_array.flat();
  result.unshift(month);
  console.log(result);
  output_sheet.appendRow(result);
}
