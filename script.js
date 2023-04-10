// we stored the object in the peer
var peer = new Peer();

// to get the id of the peer when the connection is established
peer.on("open", (id) => {
  console.log("My peer ID is: " + id);
  const userid = peer.id;
  console.log(id);

  //   to display the id in the html page
  const useridinput = document.getElementById("userid");
  useridinput.value = userid;
});

const btn = document.getElementById("call");

// to send the connection to the other peer
btn.addEventListener("click", () => {
  const remoteid = document.getElementById("remoteid").value;
  console.log(remoteid);

  // to start the connection
  //   the remoteid is the target id to connect
  var conn = peer.connect(remoteid);

  const msg = document.getElementById("msg");
  const send = document.getElementById("send");

  //   to send the message
  send.addEventListener("click", async () => {
    // to send file to the other peer
    const file = document.getElementById("file").files[0];
    console.log(file);
    conn.send(file);
    console.log("file sent");
    const filesent = document.getElementById("filesent");
    console.log(filesent)
    filesent.classList.remove("display_none");
  
  });

  //   this will be executed when the connection is established
  conn.on("open", () => {
    console.log("we are successfully connected to the other peer");
    const connected = document.getElementById("icon_done");
    console.log(connected)
    connected.classList.remove("display_none");
  });

  //   to recieve the data from the other peer
  conn.on("data", (data) => {
    console.log("Received data", data);
    // we will use the concept of blob to download the file
    const blob = new Blob([data], { type: "octet/stream" });
    const url = window.URL.createObjectURL(blob);
    const a = Object.assign(document.createElement("a"), {
      href: url,
      download: "file",
    });
    a.click();
    window.URL.revokeObjectURL(url);
    a.remove();
  });
});

// to recieve the connection
peer.on("connection", (conn) => {
  console.log("first user connected to second user");
  console.log(conn);

  const msg = document.getElementById("msg");
  const send = document.getElementById("send");

  conn.on("data", function (data) {
    // to download the upcoming file
    // what we have did here is that we have used the blob to store the data
    // and then we have created a url for the blob so that we can download the data
    // and then we have created a tag and then we have assigned the url to the href attribute
    // and then we have assigned the download attribute to the tag
    // and then we have clicked the tag 😀 so that the file will be downloaded
    // and then we have revoked the url and then we have removed the tag
    const blob = new Blob([data], { type: "octet/stream" });
    const url = window.URL.createObjectURL(blob);
    const a = Object.assign(document.createElement("a"), {
      href: url,
      download: "file",
    });
    a.click();
    window.URL.revokeObjectURL(url);
    a.remove();
  });

  //   to send the message to the other peer
  send.addEventListener("click", () => {
    const file = document.getElementById("file").files[0];
    console.log(file);
    conn.send(file);
    console.log("file sent");

    // to display that the file is sent
    const filesent = document.getElementById("filesent");
    console.log(filesent)
    filesent.classList.remove("display_none");

  });
});

// to handle the error if there is any error during the connection
peer.on("error", function (err) {
  console.log(err);
  console.log("there is some error");
});
