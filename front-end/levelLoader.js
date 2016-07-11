var hideOptions = "";
var achievementScripts = [];
var achievementValues = [];
var achievementDisplayed = -1;
var achievementAccomplished = [];
var yearToCheck = 0;

//loadLevel is triggered by clicking a level button on the html page
function loadLevel(level){
    
    switch(level){
        case 1:
            //parse level options file
            loadLevelDetails("./front-end/level1Specifications.txt");
            initWorkspace('./front-end/pewiNewMapUpload.csv');
            break;
        case 2:
            
            break;
        case 3:
            
            break;
    }
    
    
    
} //end loadLevel

function parseLevelDetails(data) {
 
    //get data from invisible div on page
    var strRawContents = data;
    //split based on escape chars
    while (strRawContents.indexOf("\r") >= 0)
        strRawContents = strRawContents.replace("\r", "");
    var arrLines = strRawContents.split("\n");

    var curLine = arrLines[0];
    //parse id's of items to hide using the parameters div in index.html
    hideOptions = curLine.split("*").join("\n");
    document.getElementById("parameters").innerHTML = hideOptions;
    
    for(var i = 2; i < arrLines.length - 2; i++){
        
        var tempScripts = [];
        var tempValues = [];
        
        //Add the start up script to tempScripts
        tempScripts.push(arrLines[1]);
        
        //Parse the items in each line
        var tempParsed = arrLines[i].split("*");
        
        //Add the name of the score being checked to the values array
        tempValues.push(tempParsed[0]);
        for(var j = 1; j < tempParsed.length; j++){
            if(j%2 != 0){
                tempValues.push(tempParsed[j]);
            } else {
                tempScripts.push(tempParsed[j]);
            }
        }
        
        //Add the final script to tempScripts
        tempScripts.push(arrLines[arrLines.length - 2]);
        
        //Determine which year is being checked
        yearToCheck = arrLines[arrLines.length - 1];
        
        //Add tempScripts and tempValues to the achievements Arrays
        achievementValues.push(tempValues);
        achievementScripts.push(tempScripts);
    
    }
    
    console.log(achievementValues);
    console.log(achievementScripts);
    
        
} //end parseInitial()

//load the data from given fileString into the given board object
function loadLevelDetails(fileString) {
    
    $.ajax({
        async: false,
       type: "GET",
       url: fileString,
       dataType: "text",
       contentType: "application/x-www-form-urlencoded;charset=UTF-8",
       success: function (data) {
           parseLevelDetails(data);
       }
    });
    
}