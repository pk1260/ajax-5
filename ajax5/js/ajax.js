function showList(str, typeSearch) {
    console.log(typeSearch); //debug
    if (str == "") {
    } //Alse lege string
        if (window.XMLHttpRequest) {} //De rest
        else {}  //Code for IE6 IE5
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState === 4) {
                if (xmlhttp.status === 200) {
                    let responseText = xmlhttp.responseText;
                    if(typeSearch == 'list') {
                        printArray(responseText);
                    }
                    if(typeSearch == 'answer'){
                        parseJson(responseText);
                    }
                } else {
                    reject(xmlhttp.status);
                    console.log("xmlhttp failed");
                }
            } else {
                console.log("xmlhttp processing going on");
            }
        }
        xmlhttp.open("GET", "getData.php?q=" + str + "&type=" + typeSearch, true);
        xmlhttp.send();
}
/*
function ajax(str, typeSearch) {
    let promiseObj = new Promise(function(resolve, reject){
        console.log(typeSearch);
        let xmlhttp = new XMLHttpRequest();
        xmlhttp.open("GET", "getData.php?q=" + str + "&type=" + typeSearch, true);
        xmlhttp.send();
        xmlhttp.onreadystatechange = function() {
            if(xmlhttp.readyState === 4) {
                if(xmlhttp.status === 200) {
                    console.log("xmlhttp done succesfully");
                    let serverResponse = xmlhttp.responseText; // server antwoord met string
                    console.log(serverResponse); // debug
                    resolve(serverResponse); // wordt via return promiseObj teruggegeven
                } else {
                    reject(xmlhttp.status);
                    console.log("xmlhttp failed"); //debug
                }
            } else {
                console.log("xmlhttp processing going on");
            }
        }
        console.log("xmlhttp sent succesfuly");
    });
    return promiseObj;
}
function showList( str, typeSearch){
    let resultString = ajax(str, typeSearch);//ontvangt een JSON gecodeerde string
    let resultArray = JSON.parse(resultString);//maak van JSON string weer een array
    printArray(resultArray);

}
*/
function printArray(text) {
    let responseArray = JSON.parse(text);
    let out = "";
    let i;
    for (i = 0; i < responseArray.length; i++) {
        //console.log(arr[i]);
        out += '<span id="' + responseArray[i] + '" onClick="showList(this.id,\'answer\')">' + responseArray[i] + '</span><br>';
    }
    document.getElementById("txtHint").innerHTML = out;
}

function parseJson(result) {
    result2 = JSON.parse(result);
    result3 = result2[0];
    let displayString = "<h1 id="+result3['Code']+">" + result3['Name'] + "</h1><table>";
    for (let [key, value] of Object.entries(result3)) {
        displayString += "<tr><td>" + key + '</td><td>' + value + '</td></tr>';
    }
    displayString += "</table>"
    document.getElementById("txtHint").innerHTML = displayString;
}