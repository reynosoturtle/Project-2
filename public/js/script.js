

function addFriend() {
  const friendId = this.getAttribute("friendId");
  const myId = this.getAttribute("myId");

  function responseHandler() {
    console.log("response text", this.responseText);
    console.log("status text", this.statusText);
    console.log("status code", this.status);
    document.getElementById("associate").innerText = "Already friends w this loser";
    document.getElementById("associate").removeEventLister("click", addFriend);
  }

  const requestQuery = "myId=" + myId + "&friendId=" + friendId;
  let request = new XMLHttpRequest();
  let url = "http://127.0.0.1:3000/friends/added";
  request.addEventListener("load", responseHandler);
  request.open("POST", url);
  request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  request.send(requestQuery);
}

let friendStatusHTML = document.getElementById("associate");
friendStatusHTML.addEventListener("click", addFriend);