// import React, { useState, useEffect } from "react";
// import io from "socket.io-client";

// const socket = io("/");

// function Conversation() {
//   const [messages, setMessages] = useState([]);

//   useEffect(() => {
//     socket.on("newMessageToClient", (data) => {
//       setMessages((prevMessages) => [
//         ...prevMessages,
//         { id: data.id, msg: data.msg },
//       ]);
//     });
//   }, []);

//   return (
//     <section className="conversation">
//       {messages.map((message) => (
//         <div className="chat" key={message.id}>
//           <span className={message.id === socket.id ? "name blue" : "name red"}>
//             {message.id === socket.id ? "You: " : "Stranger: "}
//           </span>
//           <span className="text">{message.msg}</span>
//         </div>
//       ))}
//     </section>
//   );
// }

// function Form() {
//   const [inputValue, setInputValue] = useState("");
//   const [alreadyTyping, setAlreadyTyping] = useState(false);

//   function handleSubmit(event) {
//     event.preventDefault();
//     if (/\S/.test(inputValue)) {
//       socket.emit("doneTyping");
//       socket.emit("newMessageToServer", inputValue);
//       setInputValue("");
//     }
//   }

//   function handleInput(event) {
//     setInputValue(event.target.value);
//     if (!alreadyTyping) {
//       socket.emit("typing", "Stranger is typing...");
//       setAlreadyTyping(true);
//     }
//     if (event.target.value === "") {
//       socket.emit("doneTyping");
//       setAlreadyTyping(false);
//     }
//   }

//   function handleBlur() {
//     socket.emit("doneTyping");
//     setAlreadyTyping(false);
//   }

//   function handleClick(event) {
//     if (event.target.value !== "") {
//       socket.emit("typing", "Stranger is typing...");
//       setAlreadyTyping(true);
//     }
//   }

//   return (
//     <form className="form" onSubmit={handleSubmit}>
//       <button type="button" className="btn start bottom-left-radius" onClick={() => socket.emit("start", socket.id)}>
//         Start
//       </button>
//       <button type="button" className="btn bottom-left-radius hide" id="stop" onClick={() => document.querySelector("#stop").classList.add("hide"), document.querySelector("#really").classList.remove("hide")}>
//         Stop
//       </button>
//       <button type="button" className="btn bottom-left-radius bold hide" id="really" onClick={() => socket.emit("stop")}>
//         Really?
//       </button>
//       <textarea name="text" id="text" className="textarea" disabled={false} value={inputValue} onInput={handleInput} onBlur={handleBlur} onClick={handleClick}></textarea>
//       <button type="submit" id="send" className="btn bottom-right-radius" disabled={inputValue.trim() === ""}>
//         Send
//       </button>
//     </form>
//   );
// }

// function App() {
//   const [alreadyTyping, setAlreadyTyping] = useState(false);
//   const [conversation, setConversation] = useState([]);

//   useEffect(() => {
//     socket.on("strangerIsTyping", (msg) => {
//       setConversation((prevConversation) => [
//         ...prevConversation,
//         { id: "typing", msg },
//       ]);
//     });

//     socket.on("strangerIsDoneTyping", () => {
//       setConversation((prevConversation) =>
//         prevConversation.filter((message) => message.id !== "typing")
//       );
//     });

//     socket.on("searching", (msg) => {
//       setConversation([{ id: "searching", msg }]);
//     });

//     socket.on("chatStart", (msg) => {
//       setConversation([{ id: "chatStart", msg }]);
//       document.querySelector("#stop").classList.remove("hide");
//       document.querySelector("#start").classList.add("hide");
//       document.querySelector("#text").disabled = false;
//       document.querySelector("#send").disabled = false;
//     });

//     socket.on("strangerDisconnected", (msg) => {
//       setConversation((prevConversation) => [
//         ...prevConversation,
//         { id: "strangerDisconnected", msg },
//       ]);
//       reset();
//     });

//     socket.on("endChat", (msg) => {
//       setConversation((prevConversation) => [
//         ...prevConversation,
//         { id: "endChat", msg },
//       ]);
//       reset();
//     });

//     return () => {
//       socket.disconnect();
//     };
//   }, []);

//   function reset() {
//     setAlreadyTyping(false);
//     setConversation([]);
//     document.querySelector("#start").classList.remove("hide");
//     document.querySelector("#stop").classList.add("hide");
//     document.querySelector("#really").classList.add("hide");
//     document.querySelector("#text").disabled = true;
//     document.querySelector("#text").value = "";
//     document.querySelector("#send").disabled = true;
//   }

//   return (
//     <>
//       <nav className="navbar">
//         <img className="logo" src="./img/logo.png" alt="logo" />
//         <h2 className="description">Talk to strangers!</h2>
//         <h2 className="online"></h2>
//       </nav>
//       <main className="main">
//         <Conversation messages={conversation} />
//         <Form alreadyTyping={alreadyTyping} setAlreadyTyping={setAlreadyTyping} />
//       </main>
//     </>
//   );
// }

// export default App;