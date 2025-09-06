// populate maincontainer with posts in index.html

var csvUrl = './postlist.csv';

var tagAbbrevs = {
  "wp": "wordpost",
  "pp": "picpost",
  "vp": "vidpost",
  "gp": "gamepost",

  // wordpost types
  "po": "poetry",
  "es": "essay",
  "fi": "fiction",

  // picpost types
  "co": "comic",

  // vidpost types
  "an": "animation",
  "ac": "animatic",

  // gamepost types
}

function handleCSVResult(csvString) {
  // Get the div element to append the data to
  var putpostshere = document.querySelector('#putpostshere');
  
  // Split csv to rows
  var rows = csvString.split('\n');
  
  // Iterate over each row
  for (var i = 0; i < rows.length; i++) {
    // make post structure
    var post = document.createElement("div"); // post
    post.classList.add("post");
    post.classList.add("flexCol");
    putpostshere.appendChild(post);
    var posttitle = document.createElement("h2"); // title
    posttitle.classList.add("postTitle");
    post.appendChild(posttitle);
    var posttitle_a = document.createElement("a"); // link to post inside title
    posttitle.appendChild(posttitle_a);
    var tags = document.createElement("div"); // taglist
    tags.classList.add("tags");
    tags.classList.add("flexRow");
    post.appendChild(tags);
    var postbody = document.createElement("div"); // body
    postbody.classList.add("postBody");
    post.appendChild(postbody);
    
    // get row, split row to cells
    var row = rows[i];
    var cells = row.split(',');
    
    // get folder and file containing post title and body
    // and populate those parts of post
    var folder = cells[0];
    var file = cells[1];
    displayPost(folder, file, posttitle_a, postbody);

    // populate post tags
    for (var j = 2; j < cells.length; j++) {
      var tag = document.createElement("a");
      tag.classList.add("tag");
      tag.innerText = "#" + tagAbbrevs[cells[j]];
      tags.appendChild(tag);
    }
  }
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
      posttitle.href = "./post.html?id=" + file.split(".")[0]; // link to post

      var body = text.substring(title.length+1); // tagline
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
    handleCSVResult(csvData);
  }
}

// Send request
ajax.send();