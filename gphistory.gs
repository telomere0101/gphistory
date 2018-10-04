var prop = PropertiesService.getScriptProperties();
// SHEET_NAME,USER_ID,DEFAULT_COUNTを,DEFAULT_MONTHプロパティに登録しておく
var sheetName = prop.getProperty('SHEET_NAME');
var userId = prop.getProperty('USER_ID');
var defaultCount = prop.getProperty('DEFAULT_COUNT');
var defaultMonth = prop.getProperty('DEFAULT_MONTH');

function doPost(e) {
  // シート取得
  var ss = SpreadsheetApp.openById(SpreadsheetApp.getActiveSpreadsheet().getId());
  var sheet = ss.getSheetByName(sheetName);

  
  var postjsonString = e.postData.getDataAsString();
  var postdata = JSON.parse(postjsonString);
  var months = postdata.months;
  
  var messages = "";
  
  messages = "{'selSongNos':[";
  
  for(var i in months){
    defaultMonth = months[i].month;
    var nowdate = new Date();
    var nowdatestr = nowdate.tostring;
    var headers = {
      "Connection": "keep-alive",
      "Accept": "application/json, text/javascript, */*; q=0.01",
      "X-JSP-APP-NAME": "www.joysound.com",
      "User-Agent": "Overwrite your web Browser's user-agent", //overwrite your own data
      "Referer": "https://www.joysound.com/utasuki/userpage/gp/index.htm?usr="+userId+"&month="+defaultMonth+"&startIndex=0&orderBy=0&sortOrder=asc",
      "Accept-Encoding": "gzip, deflate, br",
      "Accept-Language": "ja,en-US;q=0.9,en;q=0.8",
      "Cookie":"Overwrite your Cookie data on Referer page" //overwrite your own data
    };
    var options = {
      "method" : "get",
      "headers" : headers,
      "muteHttpExceptions": true
    };
    var requestUrl = "https://www.joysound.com/api/1.0/member/"+userId+"/score/gpHistory/user?usr="+userId+"&startIndex=0&count="+defaultCount+"&month="+defaultMonth+"&orderBy=0&sortOrder=asc&selectMonth="+defaultMonth+"&maxPageNum=1&_="+nowdatestr;
    Logger.log(requestUrl);
    Logger.log(headers);
    var response = UrlFetchApp.fetch(requestUrl, options);
  
    var jsonString = response.getContentText();
    var data = JSON.parse(jsonString);
  
    var count = data.pager.count;
    var pageIndex = data.pager.pageIndex;
    var gpHistories = data.gpHistories;
    var selSongNo = null;
    var selSongName = null;
    var artistId = null;
    var artistName = null;
    var markNum = null;
    var znkkDcsnRnk = null;
    var playNumNy = null;
    var knbtDcsnRnk = null;
    var prefecCd = null;    
    var prefecNm = null;
    var playDtTm = null;
    var hensachi = null;
    var date = null;
    var playDateTime = null;
    var targetYm = data.targetYm;
    var baseYm = data.baseYm;


  
    // データ入力
    for(var idx in gpHistories){

      selSongNo = gpHistories[idx].selSongNo;
      selSongName = gpHistories[idx].selSongName;
      artistId = gpHistories[idx].artistId;
      artistName = gpHistories[idx].artistName;
      markNum = gpHistories[idx].markNum;
      znkkDcsnRnk = gpHistories[idx].znkkDcsnRnk;
      playNumNy = gpHistories[idx].playNumNy;
      knbtDcsnRnk = gpHistories[idx].knbtDcsnRnk;
      prefecCd = gpHistories[idx].prefecCd;
      prefecNm = gpHistories[idx].prefecNm;
      playDtTm = gpHistories[idx].playDtTm;

      //平均値の取得
      //request Headerの作成
      var headers1 = {
        "Connection": "keep-alive",
        "Accept": "application/json, text/javascript, */*; q=0.01",
        "X-JSP-APP-NAME": "www.joysound.com",
        "User-Agent": "Overwrite your web Browser's user-agent", //overwrite your own data
        "Referer": "https://www.joysound.com/web/joy/gp/popular/song?selSongNo="+selSongNo,
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "ja,en-US;q=0.9,en;q=0.8",
        "Cookie":"Overwrite your Cookie data on Referer page" //overwrite your own data
      };
      var options1 = {
        "method" : "get",
        "headers" : headers1,
        "muteHttpExceptions": true
      };
      var requestUrl1 = "https://www.joysound.com/api/1.0/score/rankingBySong/"+selSongNo+"?count=100&maxPageNum=0&selectMonth="+defaultMonth+"&startIndex=0";
      Logger.log(requestUrl1);
      Logger.log(headers1);
      //UrlFetchAppでrequestUrlをfetch
      var response1 = UrlFetchApp.fetch(requestUrl1, options1);
      var jsonString1 = response1.getContentText();
      var data1 = JSON.parse(jsonString1);
      
      var markNum1 =  new Array(100);
      var hensa = new Array(100);
      var hyoujyunhensa = 0;
      var hensa2 = 0;
      var bunsan = 0;
      var m = Math;
      
      var averageNy = data1.averageNy;
      var rankingBySong = data1.rankingBySong;
      
      
      
      
      
      
      for(var k in rankingBySong){
      
        markNum1[k] = rankingBySong[k].markNum;
        hensa[k] = markNum1[k] - averageNy;
        hensa2 = 0;
        for(var j = 0 ; j <= k; j++){
          hensa2 += hensa[j]*hensa[j];
        }
        
        bunsan = hensa2/(k+1);
        if (playNumNy > 100 ){
          hyoujyunhensa = "-";
        } else {
          hyoujyunhensa = m.sqrt(bunsan);
        }
      }

      
      if (hyoujyunhensa != "-" ){
        if (hyoujyunhensa == 0 ) {
          hensachi = 50;
        }   else {
          hensachi = 50 + ((10 * (markNum-averageNy))/hyoujyunhensa);
        }
      } else {
        hensachi = 50 + ((10 * (markNum-averageNy))/3);
      }
      date = new Date(playDtTm);
      playDateTime =  Utilities.formatDate(date, 'JST', 'yyyy年M月d日 H時m分')
      sheet.appendRow([targetYm,selSongNo,selSongName,artistId,artistName,markNum,hensachi,averageNy,hyoujyunhensa,znkkDcsnRnk,playNumNy,knbtDcsnRnk,prefecCd,prefecNm,playDateTime,count]);
    } 
  }
  var temp = "";
  if (i == 0){
    for(var idx in gpHistories){
      selSongNo = gpHistories[idx].selSongNo;
      temp = "{'selSongNo':"+selSongNo +"},"
      messages += temp;
    }
    messages += "]}";  
    
    var output = ContentService.createTextOutput();
    output.setMimeType(ContentService.MimeType.JSON);
    output.setContent(JSON.stringify(messages));

    
  } else { 
    
 
  var output = ContentService.createTextOutput();
  output.setMimeType(ContentService.MimeType.JSON);
    output.setContent(JSON.stringify({ message: "success!" }));
  }
  return output;

}
