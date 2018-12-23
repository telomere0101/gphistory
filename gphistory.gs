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
  
  //全国採点GP採点履歴ページより履歴を取得
  for(var i in months){
    defaultMonth = months[i].month;
    var nowdate = new Date();
    var nowdatestr = nowdate.tostring;
    var headers = {
      "Connection": "keep-alive",
      "Accept": "application/json, text/javascript, */*; q=0.01",
      "X-JSP-APP-NAME": "www.joysound.com",
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/66.0.3359.181 Safari/537.36",
      "Referer": "https://www.joysound.com/utasuki/userpage/gp/index.htm?usr="+userId+"&month="+defaultMonth+"&startIndex=0&orderBy=0&sortOrder=asc",
      "Accept-Encoding": "gzip, deflate, br",
      "Accept-Language": "ja,en-US;q=0.9,en;q=0.8",
      "Cookie":"sp-access=true; _ga=GA1.2.1178563689.1524728043; optimizelyBuckets=%7B%7D; optimizelyEndUserId=oeu1526324470851r0.1498558574068578; optimizelySegments=%7B%224760320023%22%3A%22search%22%2C%224757440016%22%3A%22gc%22%2C%224751650021%22%3A%22false%22%7D; _JSPALFLG=true; _gid=GA1.2.1552642533.1526746396; _JSPALK=FoTur3c2MfnNeSmQ4QAxQZpkfzipbS8usXUtZeFAa0w; _gat_UA-3748042-19=1; _gat=1; jsp-access=true; NSC_wtw_vubtvlj-yhktdvtl_8080=ffffffffaf1bd48945525d5f4f58455e445a4a4229a0; NSC_wtw_qpsubm-yhktdqsu_8080=ffffffffaf1bd48245525d5f4f58455e445a4a4229a0; _JSPSID=t_Igue_yfsAKm8Isa_MAdDUjWT1TSIEU-yqiavUZ0Vo; _SJSPSID=khWTU3P4dXwZ7WRmVS1aIYw8ZoQ5fajbPd8RZavEk0g; _JSPALTKN=bsdyWR_sq_a4FLU1w7J7W8PFTw8yUSdb6Cj1NcunEDnIDrwM7E9p3JjJb29oHql_HKwdVNXQPJm9DP5_fcuxuw; NSC_wtw_ejtqbudifs-yhktdejq_8080=ffffffffaf1bd48845525d5f4f58455e445a4a4229a0; NSC_wtw_qpsubm-yhktdqsu_8080=ffffffffaf1bd48245525d5f4f58455e445a4a4229a0; NSC_wtw_ejtqbudifs-yhktdejq_8080=ffffffffaf1bd48845525d5f4f58455e445a4a4229a0; optimizelyPendingLogEvents=%5B%5D"
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
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/66.0.3359.181 Safari/537.36",
        "Referer": "https://www.joysound.com/web/joy/gp/popular/song?selSongNo="+selSongNo,
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "ja,en-US;q=0.9,en;q=0.8",
        "Cookie":"jsp-access=true; _ga=GA1.2.1178563689.1524728043; optimizelyBuckets=%7B%7D; optimizelyEndUserId=oeu1526324470851r0.1498558574068578; optimizelySegments=%7B%224760320023%22%3A%22search%22%2C%224757440016%22%3A%22gc%22%2C%224751650021%22%3A%22false%22%7D; _gid=GA1.2.1552642533.1526746396; _JSPALK=yyag_3sv87pDj2xz74Leh0Yz2DBiFlsmTVZ4aOVJF9U; NSC_wtw_vubtvlj-yhktdvtl_8080=ffffffffaf1bd48945525d5f4f58455e445a4a4229a0; NSC_wtw_qpsubm-yhktdqsu_8080=ffffffffaf1bd48545525d5f4f58455e445a4a4229a0; _JSPSID=ske--t35pX6TQTzt7sw1nE47UVyuTb54Ssm7kGXY75A; _SJSPSID=TeY9sopMXSPBvzuOQ489eERd3IPsKGSltwS_rM7c-68; _gat_UA-3748042-19=1; NSC_wtw_ejtqbudifs-yhktdejq_8080=ffffffffaf1bd48b45525d5f4f58455e445a4a4229a0; jsp-access=true; NSC_wtw_ejtqbudifs-yhktdejq_8080=ffffffffaf1bd48b45525d5f4f58455e445a4a4229a0; NSC_wtw_qpsubm-yhktdqsu_8080=ffffffffaf1bd48545525d5f4f58455e445a4a4229a0; NSC_wtw_vubtvlj-yhktdvtl_8080=ffffffffaf1bd48945525d5f4f58455e445a4a4229a0; optimizelyPendingLogEvents=%5B%5D"
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
