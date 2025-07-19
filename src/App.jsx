import { useState,useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const[items, setItems] = useState([])
  const[name,setNames] = useState('')
  const[message,setMessage] = useState('')

  useEffect(() => {
    fetchItems();
  }, [])

  const fetchItems = async () => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/items`);
    const data = await response.json();
    setItems(data);
  };

  const addItem = async () => {
    if (!name) {
      return;
    }
    const item = { name };
    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/items`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(item),
    });
    if (response.ok) {
      setMessage('Item added successfully');
      setNames('');
      fetchItems();
    } else {
      setMessage('Failed to add item');
    }
  };

  return (
    <div className="App">
      <h1>Items List</h1>
      <input type="text"
       value={name}
        onChange={(e) => setNames(e.target.value)}
        placeholder='Enter item name' 
        />
      <button onClick={addItem}>Add Item</button>
      {message && <p>{message}</p>}
      <ul>
        {items.map((item, index) => (
          <li key={index}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default App
