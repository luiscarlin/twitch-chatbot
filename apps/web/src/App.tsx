import axios from 'axios';
import React, { useState } from 'react';
import './App.css';

function App() {
  const [channels, setChannels] = useState([]);
  const [newChannel, setNewChannel] = useState('');
  const [channelToLeave, setChannelToLeave] = useState('');

  const getChannels = async () => {
    const response = await axios.get('/channels');
    setChannels(response.data.channels);
  };

  const addChannel = async () => {
    const response = await axios.post('/join', { channel: newChannel });

    if (response.status === 200) {
      getChannels();
      setNewChannel('');
    } else {
      console.log('error');
    }
  };

  const removeChannel = async () => {
    const response = await axios.post('/part', { channel: channelToLeave });

    if (response.status === 200) {
      getChannels();
      setChannelToLeave('');
    } else {
      console.log('error');
    }
  };

  return (
    <main>
      <h3>Chatbot, what are you spying?</h3>
      <button onClick={() => getChannels()}>Refresh List</button>
      {channels.map((channel) => (
        <div key={channel}>{channel}</div>
      ))}

      <h3>Chatbot, join my channel</h3>
      <input
        placeholder={'channel to join'}
        value={newChannel}
        onChange={(event) => setNewChannel(event.target.value)}
      />
      <button onClick={() => addChannel()}>Join</button>

      <h3>Chatbot, leave my channel</h3>
      <input
        placeholder={'channel to leave'}
        value={channelToLeave}
        onChange={(event) => setChannelToLeave(event.target.value)}
      />
      <button onClick={() => removeChannel()}>Leave</button>
    </main>
  );
}

export default App;
