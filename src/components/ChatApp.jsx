import React, { useEffect, useState } from "react";
import Pusher from "pusher-js";
import styled from "styled-components";


const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 95vh;
  background: #D3CCE3;  /* fallback for old browsers */
  background: -webkit-linear-gradient(to bottom, #E9E4F0, #D3CCE3);  /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to bottom, #E9E4F0, #D3CCE3); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  padding:50px,
  `;

const Card = styled.div`
  font-family: "Lucida Console", "Courier New", monospace;
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
  box-shadow: 1px 1px 0px #999;
  2px 2px 0px #999,
  3px 3px 0px #999,
  4px 4px 0px #999,
  5px 5px 0px #999,
  6px 6px 0px #999;
  `;

const Input = styled.input`
  width: 90%;
  margin-bottom: 20px;
  padding: 10px;
  font-size: 1rem;
  border: 1px solid #dddddd;
  border-radius: 5px;
`;

const MessageContainer = styled.div`
  max-height: 300px;
  overflow-y: auto;
`;

const MessageItem = styled.div`
  margin-bottom: 10px;
`;

function App() {
  const [username, setUsername] = useState('username');
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    Pusher.logToConsole = true;

    const pusher = new Pusher('ebce9d26533cc1d5184d', {
      cluster: 'eu'
    });

    const channel = pusher.subscribe('chat');
    channel.bind('messageCreated', function(data) {
      setMessages(prevMessages => [...prevMessages, data]);
    });

    return () => {
      channel.unbind('messageCreated');
      pusher.unsubscribe('chat');
    };
  }, []);

  const submit = async (e) => {
    e.preventDefault();
  
    const response = await fetch('http://localhost:8000/api/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username,
        message,
      }),
    });
  
    const data = await response.json();
  
    if (data.success) {
      setMessage('');
    }
  };
  

  return (
    <Container>
      <Card>
        <h3>Chat App</h3>
        <MessageContainer>
          {messages.map((message, index) => (
            <MessageItem key={index}>
              <strong>{message.username}</strong>: {message.message}
            </MessageItem>
          ))}
        </MessageContainer>
        <form onSubmit={(e) => submit(e)}>
          <Input
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <Input
            type="text"
            placeholder="Write a message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button type="submit">Envoyer !</button>
        </form>
      </Card>
    </Container>
  );
}

export default App;
