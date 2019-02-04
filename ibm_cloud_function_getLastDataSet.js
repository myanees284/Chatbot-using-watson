
const { promisify } = require('util');
const request = promisify(require('request'));

async function main(params) {
 
  var ApplicationName=params.input;
  var url;
  var response;
  var processedMessage;
 
  try {
      if(ApplicationName=="O365"){
          
          url = 'http://<hostname>:<port>/query?db=rpt&q=select%20transactionName,last(responseTime)%20from%20healthCheckTestV1%20where%20transactionName=%27HomePage%27%20and%20transactionStatus=%27PASS%27%3B%3Bselect%20transactionName,last(responseTime)%20from%20healthCheckTestV1%20where%20transactionName=%27Login_OKTA%27%20and%20transactionStatus=%27PASS%27%3B%3Bselect%20transactionName,last(responseTime)%20from%20healthCheckTestV1%20where%20transactionName=%27Security_Question%27%20and%20transactionStatus=%27PASS%27%3B%3Bselect%20transactionName,last(responseTime)%20from%20healthCheckTestV1%20where%20transactionName=%27Open_TEAM%27%20and%20transactionStatus=%27PASS%27%3B%3Bselect%20transactionName,last(responseTime)%20from%20healthCheckTestV1%20where%20transactionName=%27Open_OneDrive%27%20and%20transactionStatus=%27PASS%27%3B%3Bselect%20transactionName,last(responseTime)%20from%20healthCheckTestV1%20where%20transactionName=%27File_Upload%27%20and%20transactionStatus=%27PASS%27%3B%3Bselect%20transactionName,last(responseTime)%20from%20healthCheckTestV1%20where%20transactionName=%27View_File%27%20and%20transactionStatus=%27PASS%27%3B%3Bselect%20transactionName,last(responseTime)%20from%20healthCheckTestV1%20where%20transactionName=%27File_Download%27%20and%20transactionStatus=%27PASS%27%3B%3Bselect%20transactionName,last(responseTime)%20from%20healthCheckTestV1%20where%20transactionName=%27Logout%27%20and%20transactionStatus=%27PASS%27%3B' 
    response = await request(url);
   processedMessage= ProcessData(response,ApplicationName);
      }else if(ApplicationName=="Citrix"){
         
          url = 'http://<hostname>:<port>/query?db=test1&q=select%20transactionName,last(responseTime)%20from%20healthCheckTestV1%20where%20transactionName=%27HomePage%27%20and%20transactionStatus=%27PASS%27%3Bselect%20transactionName,last(responseTime)%20from%20healthCheckTestV1%20where%20transactionName=%27Login%27%20and%20transactionStatus=%27PASS%27%3Bselect%20transactionName,last(responseTime)%20from%20healthCheckTestV1%20where%20transactionName=%27DesktopLaunch%27%20and%20transactionStatus=%27PASS%27%3Bselect%20transactionName,last(responseTime)%20from%20healthCheckTestV1%20where%20transactionName=%27OpenPowerPoint%27%20and%20transactionStatus=%27PASS%27%3Bselect%20transactionName,last(responseTime)%20from%20healthCheckTestV1%20where%20transactionName=%27OpenNotePad%27%20and%20transactionStatus=%27PASS%27%3Bselect%20transactionName,last(responseTime)%20from%20healthCheckTestV1%20where%20transactionName=%27OpenIE%27%20and%20transactionStatus=%27PASS%27%3Bselect%20transactionName,last(responseTime)%20from%20healthCheckTestV1%20where%20transactionName=%27DesktopSignOff%27%20and%20transactionStatus=%27PASS%27%3Bselect%20transactionName,last(responseTime)%20from%20healthCheckTestV1%20where%20transactionName=%27CitrixSignoff%27%20and%20transactionStatus=%27PASS%27%3B';
          response = await request(url);
           processedMessage= ProcessData(response,ApplicationName);
      }
  } catch (err) {
    return {
    statusCode: 500,
    headers: { 'Content-Type': 'application/json' },
    body: 'Error Occured. Please try later',
  };
  }

  return {
    statusCode: 200,
    headers: { 'Content-Type': 'application/json' },
    body: processedMessage,
  };
}

function ProcessData(response,ApplicationName){
    
    
   if(ApplicationName=="O365"){
   var BaselineData = {
  HomePage: "4",
  Login_OKTA: "5",
  Security_Question: 3,
  Open_TEAM: "15",
  Open_OneDrive: "100",
  File_Upload: "6",
  View_File: "7",
  File_Download: "2",
  Logout: "7"
    };
   }else if(ApplicationName=="Citrix"){
  var BaselineData = {
  HomePage: "4",
  Login: "5",
  DesktopLaunch: 3,
  OpenPowerPoint: "15",
  OpenNotePad: "100",
  OpenIE: "6",
  DesktopSignOff: "7",
  CitrixSignoff: "2"
    };
   }
    var BaseTransactionName = Object.keys(BaselineData);
    var BaseTransactionValue=Object.values(BaselineData);
 
  var toDisplay = []; 
   
   for(var i=0;i<=(JSON.parse(response.body).results.length-1);i++){
    var name_1=JSON.parse(response.body).results[i].series[0].values[0][1];
    var value_1=parseInt(JSON.parse(response.body).results[i].series[0].values[0][2],10);
console.log("The name is :: "+name_1);
console.log("The value is :: "+value_1);
  if(name_1==BaseTransactionName[i] && BaseTransactionValue[i]<value_1){
      
      toDisplay.push(name_1+" = `"+value_1+" seconds`\n");
     // console.log("The value is: "+toDisplay);
  }else if(name_1==BaseTransactionName[i] && BaseTransactionValue[i]>value_1){
      toDisplay.push(name_1+" = "+value_1+" seconds \n");
     // console.log("The value is: "+toDisplay);
  }
   }
  
   
  
  toDisplay.join();

  var fileMessage="Latest Response Time Details for "+ApplicationName+"\n"+toDisplay.toString().trim().replace(/,/g, " ");
  //console.log(fileMessage);
  return fileMessage;
}
exports.main = main;
