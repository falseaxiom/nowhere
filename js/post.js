// populate post.html with single post based on id

var csvUrl = '/postlist.csv';

function handleCSVResultPost(csvString) {
  // populate post.html based on post id
  let currUrl = window.location.href;
  let page = currUrl.split("/").pop();
  let pageId = page.split("=").pop();

  var rows = csvString.split('\n');
  var row = "";

  if (pageId === "random") {
    let randInt = Math.floor(Math.random() * rows.length);
    row = rows[randInt];
  }
  else {
    for (let i = 0; i < rows.length; i++) {
      if (rows[i].includes(pageId)) {
        row = rows[i];
        break;
      }
    }
  }

  var cells = row.split(',');
      
  // get folder and file containing post title and body
  // and populate those parts of post
  var folder = cells[0];
  var file = cells[1];
  var posttitle = document.getElementById("title");
  var postbody = document.getElementById("body");
  displayPost(folder, file, posttitle, postbody);
}

function displayPost(folder, file, posttitle, postbody) {
  fetch("/"+folder+"/"+file)
    .then((res) => res.text())
    .then((text) => {
      // get date of post
      var date = file.includes("-")
        ? file.split("-").shift()
        : file.split(".").shift();

      var title = text.split('\n').shift(); // first line
      posttitle.innerText = date + "..." + title;

      var body = text.substring(title.length+2); // also disclude next \n
      postbody.innerHTML = body;
    })
    .catch((e) => console.error(e));
}

// Init Ajax Object
var ajax = new XMLHttpRequest();

// Set a GET request to the URL which points to your CSV file
ajax.open('GET', csvUrl);

// Set the action that will take place once the browser receives your CSV
ajax.onreadystatechange = function() {
  if (ajax.readyState === XMLHttpRequest.DONE && ajax.status === 200) {
    // Request was successful
    var csvData = ajax.responseText;

    // Do something with that data here
    handleCSVResultPost(csvData);
  }
}

// Send request
ajax.send();