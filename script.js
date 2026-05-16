/* SEND MESSAGE */

async function sendMessage(){

  const input =
    document.getElementById("userInput");

  const text =
    input.value;

  if(text.trim() === ""){
    return;
  }

  addMessage(text, "user");

  input.value = "";

  try{

    const response =
      await fetch("/chat", {

        method:"POST",

        headers:{
          "Content-Type":"application/json"
        },

        body:JSON.stringify({
          message:text
        })

      });

    const data =
      await response.json();

    addMessage(
      data.reply,
      "bot"
    );

  }catch(error){

    addMessage(
      "Error connecting to AI.",
      "bot"
    );
  }
}

/* ADD MESSAGE */

function addMessage(text, sender){

  const chatbox =
    document.getElementById("chatbox");

  const message =
    document.createElement("div");

  message.classList.add(
    "message"
  );

  message.classList.add(
    sender
  );

  message.innerText =
    text;

  chatbox.appendChild(
    message
  );

  chatbox.scrollTop =
    chatbox.scrollHeight;
}

/* MENU */

const menuBtn =
  document.getElementById("menuBtn");

const menu =
  document.getElementById("menu");

menuBtn.onclick = () => {

  menu.classList.toggle(
    "hidden"
  );

};

/* ENTER KEY */

document
.getElementById("userInput")
.addEventListener(
  "keypress",

  function(event){

    if(event.key === "Enter"){

      sendMessage();

    }

  }
);
