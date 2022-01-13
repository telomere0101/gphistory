# gphistory
Google Apps Scripts for the Google Sheets to get your JOYSOUND zenkoku-saiten-GP data from the utasuki site.

JOYSOUDの全国採点GPの採点履歴をうたスキサイトから取得するGoogleスプレッドシート用のGoogle Apps Scriptです。
歌唱人数が100人以内の場合は正確な標準偏差を基に偏差値を計算できていますが、歌唱人数が100人以上の場合は標準偏差は「3」で近似して計算しています。
基本的にユーザが自身の採点履歴をスプレッドシートに整理するために利用することを想定しています。


# Getting Started
* Make google sheet for the zenkoku-saiten-GP data and name it such as gphistory and so.
* To make Apps Script, choose "Tool->Script Editor" and name it such as gphistory and so.
* Add a Script profile 'SHEET_NAME','USER_ID','DEFAULT_COUNT','DEFAULT_MONTH'. 'USER_ID' is shown in your utasuki-profile page URL.
* Fill the Scripts from this source code gphistory.gs and overwrite your own data. 
* Make the Scripts as a Web application for POST request. 
* Throw http POST request MONTH JSON data such as {"months":[{"month":"201801"}]} to the gphistory.gs's Web application URL.
* Getting data showed in the sheet.

# Getting Started in Japanese
* 全国採点GP用のGoogleスプレッドシートを作成して「gphistory」などの名前で保存します。
* Google Apps Scriptを作るために、「ツール->スクリプトエディタ」のメニューをクリックします。Apps Scriptを「gphistory」などの名前で保存します。
* Script profileに 'SHEET_NAME','USER_ID','DEFAULT_COUNT','DEFAULT_MONTH'を作成しておきます。 'USER_ID' はうたスキのあなたのプロフィールページのURLに表示されているものを使用します。
* gphistory.gsをコピペして、ブラウザのユーザーエージェント、Cookieなどをあなたの環境のもので上書きします。 
* http POSTリクエストでスクリプトが動作するように、スクリプトをWeb applicationとして導入します。 
* POSTMANなどのアプリを用いてhttp POST requestをgphistory.gsのWebアプリケーションのURLに投げます。データはJSONデータで {"months":[{"month":"201801"}]} のような形式です.
* シートに全国採点GP履歴データが表示されます。
