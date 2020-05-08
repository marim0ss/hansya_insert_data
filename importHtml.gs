const feed_sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('feed');
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
  
  //const m = content.match(/<td(?: style=".+")?>(?:<span style=".{1,15}">.<\/span>)?([^<]+)<\/td>/gm);
  let m = /<td(?: style=".+")?>(?:<span style=".{1,15}">.<\/span>)?([^<]+)<\/td>/gm;
  let array = [];
  while ((i = m.exec(content)) != null) {
  array.push(i[1]);
  }

  Logger.log(array);
  /*<table class="tableBase v-al-m bg--blue">
.
.
<tr>
<td style="border-bottom:solid 1px;">全体</td>
<td style="border-bottom:solid 1px;">2.54</td>
<td style="border-bottom:solid 1px;"><span style="color:#ff6600;">↑</span>　  0.02</td>
<td style="border-bottom:solid 1px;"><span style="color:#0a50a1;">↓</span>　 -0.08</td>
<td style="border-bottom:solid 1px;">-</td>
<td style="border-bottom:solid 1px;">-</td>
</tr>
<tr>
<td>IT・通信</td><td>7.04</td>
<td><span style="color:#ff6600;">↑</span>0.24</td>
<td><span style="color:#0a50a1;">↓</span>-0.23</td>
<td><span class="pict-graph"><img src="/guide/kyujin_bairitsu/img/pict-graph_b10plus.png" alt="10＋"></span></td><td><span class="pict-graph"><img src="/guide/kyujin_bairitsu/img/pict-graph_a10plus.png" alt="10＋"></span></td></tr>
<tr><td>メディア</td><td>1.70</td><td><span style="color:#0a50a1;">↓</span>-0.10</td><td><span style="color:#0a50a1;">↓</span>-0.41</td><td><span class="pict-graph"><img src="/guide/kyujin_bairitsu/img/pict-graph_b07.png" alt="7"></span></td>
<td><span class="pict-graph"><img src="/guide/kyujin_bairitsu/img/pict-graph_a04.png" alt="4"></span></td></tr>
<tr><td>金融</td><td>2.19</td><td><span style="color:#ff6600;">↑</span>0.02</td><td><span style="color:#ff6600;">↑</span>0.33</td><td><span class="pict-graph"><img src="/guide/kyujin_bairitsu/img/pict-graph_b10plus.png" alt="10＋"></span></td><td><span class="pict-graph"><img src="/guide/kyujin_bairitsu/img/pict-graph_a06.png" alt="6"></span></td></tr>		
<tr><td>メディカル</td><td>2.28</td><td><span style="color:#ff6600;">↑</span>0.05</td><td><span style="color:#ff6600;">↑</span>0.21</td><td><span class="pict-graph"><img src="/guide/kyujin_bairitsu/img/pict-graph_b10plus.png" alt="10＋"></span></td><td><span class="pict-graph"><img src="/guide/kyujin_bairitsu/img/pict-graph_a04.png" alt="4"></span></td></tr>
<tr><td>メーカー</td><td>1.90</td><td><span style="color:#ff6600;">↑</span>0.03</td><td><span style="color:#0a50a1;">↓</span>-0.22</td><td><span class="pict-graph"><img src="/guide/kyujin_bairitsu/img/pict-graph_b10plus.png" alt="10＋"></span></td><td><span class="pict-graph"><img src="/guide/kyujin_bairitsu/img/pict-graph_a10plus.png" alt="10＋"></span></td></tr>
<tr><td>商社・流通</td><td>1.15</td><td><span style="color:#222222;">→</span>0.00</td><td><span style="color:#0a50a1;">↓</span>-0.06</td><td><span class="pict-graph"><img src="/guide/kyujin_bairitsu/img/pict-graph_b06.png" alt="6"></span></td><td><span class="pict-graph"><img src="/guide/kyujin_bairitsu/img/pict-graph_a05.png" alt="5"></span></td></tr>
<tr><td>小売・外食</td><td>1.32</td><td><span style="color:#ff6600;">↑</span>0.02</td><td><span style="color:#ff6600;">↑</span>0.37</td><td><span class="pict-graph"><img src="/guide/kyujin_bairitsu/img/pict-graph_b10plus.png" alt="10＋"></span></td><td><span class="pict-graph"><img src="/guide/kyujin_bairitsu/img/pict-graph_a10plus.png" alt="10＋"></span></td></tr>
<tr><td>サービス</td><td>2.75</td><td><span style="color:#0a50a1;">↓</span>-0.02</td><td><span style="color:#0a50a1;">↓</span>-0.15</td><td><span class="pict-graph"><img src="/guide/kyujin_bairitsu/img/pict-graph_b10plus.png" alt="10＋"></span></td><td><span class="pict-graph"><img src="/guide/kyujin_bairitsu/img/pict-graph_a10plus.png" alt="10＋"></span></td></tr>
<tr><td>その他</td><td>1.20</td><td><span style="color:#ff6600;">↑</span>0.07</td><td><span style="color:#0a50a1;">↓</span>-0.22</td><td><span class="pict-graph"><img src="/guide/kyujin_bairitsu/img/pict-graph_b05.png" alt="5"></span></td><td><span class="pict-graph"><img src="/guide/kyujin_bairitsu/img/pict-graph_a04.png" alt="4"></span></td></tr>
</tbody></table>
*/
}