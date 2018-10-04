# gphistory
Google Apps Scripts for the Google Sheets to get your JOYSOUND zenkoku-saiten-GP data from the site.

1.Make google sheet for the zenkoku-saiten-GP data and name it such as gphistory and so.
2.To make Apps Script, choose "Tool->Script Editor" and name it such as gphistory and so.
3.Add a Script profile 'SHEET_NAME','USER_ID','DEFAULT_COUNT','DEFAULT_MONTH'. 'USER_ID' is shown in your utasuki-profile page URL.
4.Fill the Scripts from this source code and overwrite your own data. 
5.Make the Scripts as a Web application for POST request. 
6.Throw http POST request MONTH JSON data such as {"months":[{"month":"201801"}]}
7.Getting data showed in the sheet.
