# gphistory
Google Apps Scripts for the Google Sheets to get your JOYSOUND zenkoku-saiten-GP data from the site.

# Getting Started
* Make google sheet for the zenkoku-saiten-GP data and name it such as gphistory and so.<br>
* To make Apps Script, choose "Tool->Script Editor" and name it such as gphistory and so.<br>
* Add a Script profile 'SHEET_NAME','USER_ID','DEFAULT_COUNT','DEFAULT_MONTH'. 'USER_ID' is shown in your utasuki-profile page URL.<br>
* Fill the Scripts from this source code gphistory.gs and overwrite your own data. 
* Make the Scripts as a Web application for POST request. 
* Throw http POST request MONTH JSON data such as {"months":[{"month":"201801"}]} to the gphistory.gs's Web application URL.
* Getting data showed in the sheet.
