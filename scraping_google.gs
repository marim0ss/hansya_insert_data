var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('シート2');
const KEY = 
     PropertiesService.getScriptProperties().getProperty("phantomJS_api");
var crossfor_url = 'https://www.google.com/search?as_q=%E3%82%AF%E3%83%AD%E3%82%B9%E3%83%95%E3%82%A9%E3%83%BC&as_oq=%E8%A1%8C%E6%94%BF%E6%8C%87%E5%B0%8E%E3%80%80%E9%80%81%E6%A4%9C%E3%80%80%E6%8D%9C%E6%9F%BB%E3%80%80%E9%80%AE%E6%8D%95%E3%80%80%E3%82%A4%E3%83%B3%E3%82%B5%E3%82%A4%E3%83%80%E3%83%BC%E3%80%80%E6%9E%B6%E7%A9%BA%E3%80%80%E8%84%B1%E7%A8%8E%E3%80%80%E7%94%B3%E5%91%8A%E6%BC%8F%E3%82%8C%E3%80%80%E7%BD%B0%E9%87%91%E3%80%80%E6%9A%B4%E5%8A%9B%E5%9B%A3+%E3%80%80%E3%83%A4%E3%82%AF%E3%82%B6%E3%80%80%E5%AE%B9%E7%96%91%E3%80%80%E5%8F%8D%E7%A4%BE+OR+%E4%BA%8B%E4%BB%B6%E3%80%80%E9%81%95%E6%B3%95%E3%80%80%E9%81%95%E5%8F%8D%E3%80%80%E7%96%91%E3%81%84%E3%80%80%E5%81%BD%E8%A3%85%E3%80%80%E8%A1%8C%E6%94%BF%E5%87%A6%E5%88%86+%E3%80%80%E5%91%8A%E8%A8%B4+%E3%80%80%E3%82%B9%E3%82%AD%E3%83%A3%E3%83%B3%E3%83%80%E3%83%AB+%E3%80%80%E7%BD%AA+%E3%80%80%E4%B8%8D%E6%AD%A3%E3%80%80%E3%83%96%E3%83%A9%E3%83%83%E3%82%AF+%E3%80%80%E7%B2%89%E9%A3%BE%E3%80%80%E8%BF%B7%E6%83%91'

const GOOGLE_API_KEY2 = PropertiesService.getScriptProperties().getProperty("GOOGLE_API_KEY2");
const SEARCH_ENGIN_ID = PropertiesService.getScriptProperties().getProperty("SEARCH_ENGIN_ID");
//q=以下
var SEARCH_WORDS = '%E3%82%AF%E3%83%AD%E3%82%B9%E3%83%95%E3%82%A9%E3%83%BC&as_oq=%E8%A1%8C%E6%94%BF%E6%8C%87%E5%B0%8E%E3%80%80%E9%80%81%E6%A4%9C%E3%80%80%E6%8D%9C%E6%9F%BB%E3%80%80%E9%80%AE%E6%8D%95%E3%80%80%E3%82%A4%E3%83%B3%E3%82%B5%E3%82%A4%E3%83%80%E3%83%BC%E3%80%80%E6%9E%B6%E7%A9%BA%E3%80%80%E8%84%B1%E7%A8%8E%E3%80%80%E7%94%B3%E5%91%8A%E6%BC%8F%E3%82%8C%E3%80%80%E7%BD%B0%E9%87%91%E3%80%80%E6%9A%B4%E5%8A%9B%E5%9B%A3+%E3%80%80%E3%83%A4%E3%82%AF%E3%82%B6%E3%80%80%E5%AE%B9%E7%96%91%E3%80%80%E5%8F%8D%E7%A4%BE+OR+%E4%BA%8B%E4%BB%B6%E3%80%80%E9%81%95%E6%B3%95%E3%80%80%E9%81%95%E5%8F%8D%E3%80%80%E7%96%91%E3%81%84%E3%80%80%E5%81%BD%E8%A3%85%E3%80%80%E8%A1%8C%E6%94%BF%E5%87%A6%E5%88%86+%E3%80%80%E5%91%8A%E8%A8%B4+%E3%80%80%E3%82%B9%E3%82%AD%E3%83%A3%E3%83%B3%E3%83%80%E3%83%AB+%E3%80%80%E7%BD%AA+%E3%80%80%E4%B8%8D%E6%AD%A3%E3%80%80%E3%83%96%E3%83%A9%E3%83%83%E3%82%AF+%E3%80%80%E7%B2%89%E9%A3%BE%E3%80%80%E8%BF%B7%E6%83%91';
var options = {
  'method' : 'GET',
  'muteHttpExceptions' : true,
};
  //var data = "<?xml version=\"1.0\" encoding=\"utf-8\" ?><env:Envelope xmlns:xsd=\"http://www.w3.org/2001/XMLSchem\" xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\" xmlns:env=\"http://schemas.xmlsoap.org/soap/envelope/\"><env:Body><n1:login xmlns:n1=\"urn:partner.soap.sforce.com\"><n1:username>xxxxxxx@gmail.com</n1:username><n1:password>xxxxxxx7890</n1:password></n1:login></env:Body></env:Envelope>";

  var post_options =
   {
     "contentType" : "text/xml;charset=utf-8",
     "method" : "post"//,
     //"payload" : data
   };
function scraping() {
  var response = UrlFetchApp.fetch(crossfor_url, options);
 //Logger.log(url)
  var c_text = response.getContentText();
  //Logger.log(c_text);
 // -------------------------------------------------------------------------------------
  var xmlDoc = XmlService.parse(c_text);
  var rootDoc = xmlDoc.getRootElement();
  Logger.log(rootDoc);
  
  //result_count = parser.getElementById(xml, "result-stats");
  //Logger.log(result_count.getValue());
 // -------------------------------------------------------------------------------------  
  
  //var json = JSON.parse(response.getContentText());
  //Logger.log(json);
  //DriveApp.createFile('log', Logger.getLog(), MimeType.PLAIN_TEXT);
  
  /*
  var source = json["content"]["data"];  //表示されてる部分の抽出したいならこれは共通？？
  
  
  //Logger.log(source); //<html>以下が出力
  //DriveApp.createFile('content_log', Logger.getLog(), MimeType.PLAIN_TEXT);
  
  var myRegexp = /<div id="result-stats">([\s\S]*?)件/; 
  var title = source.match(myRegexp);
  */
  //Logger.log(title);
}

function useSearchEngine() {
  var cse_url = 
      'https://www.googleapis.com/customsearch/v1?key='
       + GOOGLE_API_KEY2
       + '&cx=' 
       + SEARCH_ENGIN_ID
       + '&q='
       + SEARCH_WORDS;
  var options = {
    'method' : 'GET',
    'muteHttpExceptions' : true,
  }
   // POSTデータ
  var payload = {
    renderType:"HTML",
    outputAsJson:true
  }
  // POSTオプション
  var post_options = {
    "method" : "POST",
    "payload" : payload
  }
  
  var search_result = UrlFetchApp.fetch(cse_url, options).getContentText();
  var json = JSON.parse(search_result);
  var source = json["queries"]["request"];
  /*これが取れる：
  json["queries"]["request"] = [
   {inputEncoding=utf8, title=Google Custom Search - クロスフォー, startIndex=1.0, safe=off, count=10.0, 
   outputEncoding=utf8, cx=003650488624474766190:y5lztnimo8e, searchTerms=クロスフォー, totalResults=14300}
   ]
  */
  
  Logger.log(source.totalResults);  // nullになってしまう。。。
  /*
  ログ出力のサイズが大きすぎます。出力を切捨てます。 {
  "kind": "customsearch#search",
  "url": {
    "type": "application/json",
    "template": "https://www.googleapis.com/customsearch/v1?q={searchTerms}&num={count?}&start={startIndex?}&lr={language?}&safe={safe?}&cx={cx?}&sort={sort?}&filter={filter?}&gl={gl?}&cr={cr?}&googlehost={googleHost?}&c2coff={disableCnTwTranslation?}&hq={hq?}&hl={hl?}&siteSearch={siteSearch?}&siteSearchFilter={siteSearchFilter?}&exactTerms={exactTerms?}&excludeTerms={excludeTerms?}&linkSite={linkSite?}&orTerms={orTerms?}&relatedSite={relatedSite?}&dateRestrict={dateRestrict?}&lowRange={lowRange?}&highRange={highRange?}&searchType={searchType}&fileType={fileType?}&rights={rights?}&imgSize={imgSize?}&imgType={imgType?}&imgColorType={imgColorType?}&imgDominantColor={imgDominantColor?}&alt=json"
  },
  "queries": {
    "request": [
      {
        "title": "Google Custom Search - クロスフォー",
        "totalResults": "14300",
        "searchTerms": "クロスフォー",
        "count": 10,
        "startIndex": 1,
        "inputEncoding": "utf8",
        "outputEncoding": "utf8",
        "safe": "off",
        "cx": "003650488624474766190:y5lztnimo8e"
      }
    ],
  */
}