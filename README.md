# Chatbot-using-watson
This is a chatbot built on purpose to get latest response time details on demand for the business user.

A little story....
A requirement came up to monitor the performance of a critical application in production. 

An automated script was developed to perform the agreed critical scenarios and write the transaction response time into a time-series database(influx db)
The data from the influx db is read and shown in the from of charts and graphs using Grafana to the business users.
As an add on, I thought of building a chatbot which will provide latest response time information to the business user when he/she neeeds to see.
the idea was materialized using below items:
1) Response Time data is made available in influx DB(data fed by automated script)
2) written a function in node js and levearged the IBM BlueMix Function service for execution. The function:

  2.1) Calls the http api(provided by influx db) to query the databse and return the results in JSON.
  2.2) Format the results in required format
  
3) IBM WATSON to create chat dialogues as below:<br />

  **user says:** Hello or hi or hey<br />
  **Bot responds:** Good Day. How can I help you?<br />
  **user response**: get me the response time or some statement containing "response time" as key word<br />
  **Bot responds:** a menu option to select 1 application from the list<br />
  **User response:** selects 1 application<br />
  **Bot response:** Here is the latest time details<br />
                    * *transaction name1 : response time<br />
                    * *transaction name2 : response time<br />
                    * *transaction name3 : response time<br />
                    * *transaction name4 : response time<br />
                  Is there anything I can help you with?<br />
  **User response: Yes/No (if YES - bot responds with menu options/ if NO - Bot says: Good Bye)<br />
              
In the above dialogue, the response time details are fetched by calling the bluemix function and response times are displayed.

The watson chatbot is integrated with Slack and Skype for the business user to access

# To use this
1) Login into IBM BlueMIX account
2) Goto Functions and create a Action(in DALLAS region)
3) Select source type as NodeJS and Runtime as NodeJS 10
4) Copy the content of ibm_cloud_function_getLastDataSet.js and paste it in code area
5) Create parameter with name "input" and enter app name as your desired app like O365 or Citrix
6) Goto Watson service and create a skill
7) Import the skill-test22.json file
8) check the connectivity.

Most important thing: data should be available in influx db server and accordingly the transaction names should be changed in javscript file

# Demo
https://youtu.be/vvcKB-BaOjU
