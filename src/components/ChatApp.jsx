import React, { useEffect, useState } from "react";
import Pusher from "pusher-js";
import styled from "styled-components";


const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  margin-left:250px;
  margin-right:250px;
  background-image: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  `;

const Card = styled.div`
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
  box-shadow:10px;
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

    await fetch('http://localhost:8000/api/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username,
        message
      })
    });

    setMessage('');
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
