const ss = SpreadsheetApp.openById("1_Jn5nXyw8teqOMhPfgbqWbFB_bp_-Xhec4fnQ_3PdaA");
const feed_sheet = ss.getSheetByName("feed");
const output_sheet = ss.getSheetByName("output");
// シート関数には +変数+ 
const doda_url = 'https://doda.jp/guide/kyujin_bairitsu/';

function addFeedData() {
  let data_range = feed_sheet.getDataRange().getValues();
  //Logger.log(data_range[2][1], data_range[22][1]); //配列なので０始まり
  
  /* [業種, 求人倍率, 前月比, 前年同月比, 求人数, 転職希望者数] 
  [営業系, 2.33, ↑0.04, ↓-0.14, , ]
  */
  let month = data_range[0][0].match(/(.+)の転職市場の概要/); // 年月データ
  month = month[1];
  // 「全体」は重複するので弾く  
  const unique_data_range = data_range.filter(function(e, index){
    return !data_range.some(function(e2, index2){
      return index > index2 && e[0] == e2[0] && e[1] == e2[1];
    });
  });
  let new_data_array = [];
  let array =[];
  let Reg_exp = /.*IT.*/,
      all_exp = /全体/;

  for (var i = 0; i < unique_data_range.length; i++) {
    if (unique_data_range[i][0].match(Reg_exp) || unique_data_range[i][0].match(all_exp)) {
      new_data_array.push( unique_data_range[i].slice(1,4) ); //  配列を加工。０番と最後の二つを取る
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
  map_array = unique_data_range.flatMap(callback);
  //let result = unique_data_range.flatMap(callback);
  
  //Logger.log(result) // [全体, 2.54, ↑ 0.02, ↓ -0.08, -, -, IT・通信, 7.04, ↑0.24, ↓-0.23, , , 技術系（IT・通信）, 9.41, ↑0.72, ↓-0.16, , ]
  //map_array.concat(unique_data_range.flatMap(callback));
  //Logger.log(result[1])
  */
}
