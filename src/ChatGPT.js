import React, { useState, useEffect } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { useSpeechSynthesis } from 'react-speech-kit';
import './ChatGPT.css';

const ChatGPT = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const { transcript, resetTranscript } = useSpeechRecognition();
  const { speak } = useSpeechSynthesis();

  useEffect(() => {
    if (transcript) {
      setInputValue(transcript);
    }
  }, [transcript]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSendMessage = () => {
    if (inputValue.trim()) {
      setMessages([...messages, { sender: 'user', text: inputValue }]);
      setInputValue('');
      resetTranscript();

      // Simulate ChatGPT's response
      setTimeout(() => {
        setMessages([
          ...messages,
          { sender: 'user', text: inputValue },
          { sender: 'chatgpt', text: 'This is a simulated response from ChatGPT.' },
        ]);
        speak('This is a simulated response from ChatGPT.');
      }, 1000);
    }
  };

  const startListening = () => {
    SpeechRecognition.startListening({ continuous: true });
  };

  return (
    <div className="chat-container">
      <div className="chat-header">
        <h1>ChatGPT</h1>
      </div>
      <div className="chat-messages">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`message ${message.sender === 'user' ? 'user' : 'chatgpt'}`}
          >
            <div className="message-content">
              {message.text}
            </div>
          </div>
        ))}
      </div>
      <div className="chat-input">
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Type your message..."
        />
        <div className="chat-buttons">
          <button className="send-button" onClick={handleSendMessage}>
            <i className="fa fa-paper-plane"></i>
          </button>
          <button className="mic-button" onClick={startListening}>
            <i className="fa fa-microphone"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatGPT;