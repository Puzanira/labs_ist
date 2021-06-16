let xmlhttp = new XMLHttpRequest();

xmlhttp.open("GET", "lab1.xml", false);
xmlhttp.send();

if (xmlhttp.status !== 200) {
    console.log(xmlhttp.status + ": " + xmlhttp.statusText);
} else {
    console.log(xmlhttp.responseXML);
}

let xmlDoc = xmlhttp.responseXML;
console.log(xmlDoc);
document.getElementById("xmlcode").textContent = new XMLSerializer().serializeToString(xmlDoc.documentElement);

document.getElementById("title").innerHTML = xmlDoc.getElementsByTagName(
    "title"
)[0].childNodes[0].nodeValue;
document.getElementById("url").innerHTML = xmlDoc.getElementsByTagName(
    "url"
)[0].childNodes[0].nodeValue;
document.getElementById("text").innerHTML = xmlDoc.getElementsByTagName(
    "text"
)[0].childNodes[0].nodeValue;
