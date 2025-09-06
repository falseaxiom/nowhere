// highlight current category in sidebar

let currUrl = window.location.href;
let page = currUrl.split("/").pop();
let cat = document.getElementById("home");
switch (page) {
  case "":
    cat = document.getElementById("home");
    break;
  case "index.html":
    cat = document.getElementById("home");
    break;
  case "info.html":
    cat = document.getElementById("info");
    break;
  case "post.html?id=random":
    cat = document.getElementById("random");
    break;
  case "filter.html?tag=wp":
    cat = document.getElementById("wordposts");
    break;
  case "filter.html?tag=pp":
    cat = document.getElementById("picposts");
    break;
  case "filter.html?tag=vp":
    cat = document.getElementById("vidposts");
    break;
  case "filter.html?tag=gp":
    cat = document.getElementById("gameposts");
    break;
  default:
    cat = "nocat"
    break;
}
if (cat !== "nocat") cat.classList.add("currCat");
