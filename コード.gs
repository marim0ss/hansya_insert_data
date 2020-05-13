const ss = SpreadsheetApp.openById("1_Jn5nXyw8teqOMhPfgbqWbFB_bp_-Xhec4fnQ_3PdaA"),
    feed_sheet = ss.getSheetByName("feed"),
    output_sheet = ss.getSheetByName("output");

let feed_data = feed_sheet.getDataRange().getValues();
//Logger.log(feed_data[2][1], feed_data[22][1]); //配列なので０始まり
function checkDataAndRun() {
  let feed_a1 = feed_data[0][0], //feedシートの月（2020年3月の転職市場の概要）
      lastRow_num = output_sheet.getLastRow(),
      output_lastdata = output_sheet.getRange(lastRow_num ,1).getValue(),//GMT
      formatted_lastdata = Utilities.formatDate(output_lastdata, 'JST', 'yyyy年M月');
  formatted_lastdata += 'の転職市場の概要';
  //Logger.log(feed_a1,formatted_lastdata)
  (feed_a1 == formatted_lastdata) ? Logger.log('最新データは記入済み') :  Logger.log('関数実行します')
}
function addFeedData() {
 let month = feed_data[0][0].match(/(.+)の転職市場の概要/); // 年月データ
  month = month[1]; //2020年3月
  // 「全体」は重複するので弾く  
  const unique_feed_data = feed_data.filter(function(e, index){
    return !feed_data.some(function(e2, index2){
      return index > index2 && e[0] == e2[0] && e[1] == e2[1];
    });
  });
  let new_data_array = [],
      array =[];
  let Reg_exp = /.*IT.*/,
      all_exp = /全体/;

  for (var i = 0; i < unique_feed_data.length; i++) {
    if (unique_feed_data[i][0].match(Reg_exp) || unique_feed_data[i][0].match(all_exp)) {
      new_data_array.push( unique_feed_data[i].slice(1,4) ); //  配列を加工。０番と最後の二つを取る
     //Logger.log(new_data_array);
    }
  }
  new_data_array = new_data_array.flat();
  for (var j = 0; j < new_data_array.length; j++) {
    array.push( new_data_array[j].toString() ) // ログ表示されているのは修正がかっている。実際の値を取得するには.toString()や.Stringify（）が必要、、らしい
  }
  Logger.log(array);
  array.unshift(month);
  output_sheet.appendRow(array);
  /*
    let map_array = [];
  const callback = element => element[0].match(Reg_exp) || element[0].match(all_exp) ? element : [] // [element]にするとflatは相殺される
  map_array = unique_feed_data.flatMap(callback);
  //let result = unique_feed_data.flatMap(callback);
  
  //Logger.log(result) // [全体, 2.54, ↑ 0.02, ↓ -0.08, -, -, IT・通信, 7.04, ↑0.24, ↓-0.23, , , 技術系（IT・通信）, 9.41, ↑0.72, ↓-0.16, , ]
  //map_array.concat(unique_feed_data.flatMap(callback));
  //Logger.log(result[1])
  */
}
