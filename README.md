# Chatbot-using-watson
This is a chatbot built on purpose to get latest response time details on demand for the business user.

A little story....
A requirement came up to monitor the performance of a critical application in production. 

An automated script was developed to perform the agreed critical scenarios and write the transaction response time into a time-series database(influx db)
The data from the influx db is read and shown in the from of charts and graphs using Grafana to the business users.
As an add on, I thought of building a chatbot which will provide latest response time information to the business user when he/she neeeds to see.
the idea was materialized using below items:
1) Response Time data is made available in influx DB(data fed by automated script)
2) IBM BlueMix function service(written in node js) which:
  2.1) calls the http api(provided by influx db) to query the databse and return the results in JSON.
  2.2) Format the results in required format
3) IBM WATSON to create chat dialogues as below:
  3.1) user says: Hello or hi or hey
       Bot responds: Good Day. How can I help you?
       user response time: get me the response time or some statement containing "response time" as key word
       Bot responds: a menu option to select 1 application from the list
       User response: selects 1 application
       Bot response: Here is the latest time details
                     transaction name1 : response time
                     transaction name2 : response time
                     transaction name3 : response time
                     transaction name4 : response time
                    Is there anything I can help you with?
       User response: Yes/No (if YES - bot responds with menu options/ if NO - Bot says: good Bye)
       
       In the above dialogue, the response time details are fetched by calling the bluemix function and response times are displayed.
