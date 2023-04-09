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
    // to send msg
    // const msgvalue = msg.value;
    // console.log(msgvalue);
    // conn.send(msgvalue);
    // console.log("message sent");

    // to send file
    // let [filehandle] = await window.showOpenFilePicker();
    // let file = await filehandle.getFile();
    // console.log(file);
    // conn.send(file);

    // to send file to the other peer
    const file = document.getElementById("file").files[0];
    console.log(file);
    conn.send(file);
    console.log("file sent");
  });

  //   this will be executed when the connection is established
  conn.on("open", () => {
    conn.send("Hello World! welcome to the first user");
  });

  //   to recieve the data from the other peer
  conn.on("data", (data) => {
    console.log("Received data", data);
    const fileReader = new FileReader();
    fileReader.onload = () => {
      console.log(fileReader.result);
      console.log("file recieved successfully");
    };
  });
});

// to recieve the connection
peer.on("connection", (conn) => {
  console.log("first user connected to second user");
  console.log(conn);

  const msg = document.getElementById("msg");
  const send = document.getElementById("send");

  //   to send the message to the other peer
  send.addEventListener("click", () => {
    const msgvalue = msg.value;
    console.log(msgvalue);
    conn.send(msgvalue);
    console.log("message sent");
  });

  //   to recieve the data from the other peer
  conn.on("data", (data) => {
    conn.send("i am in the reciever side");
    console.log("Received the data", data);

    // to download the upcoming file
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

// to handle the error if there is any error during the connection
peer.on("error", function (err) {
  console.log(err);
  console.log("there is some error");
});
