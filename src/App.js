
import { useEffect, useState } from 'react';
import { Route } from 'react-router-dom';
import './App.css';
import Activities from './components/Activities';
import Home from './components/Home';
import Login from './components/Login';
import Myroutines from './components/Myroutines';
import Navbar from './components/Navbar';
import Register from './components/Register';
import Routines from './components/Routines';

export const baseURL = "https://fitnesstrac-kr.herokuapp.com/api";

function App() {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState("")

  //check for token in localstorage and if exists, get user from server
  useEffect(() => {
    if (!token) {
      return setUser(null);
    }
    const fetchUser = async () => {
      const response = await fetch(`${baseURL}/users/me`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      });
      const data = await response.json();

      setUser({ id: data.id, username: data.username, token: token })
      console.log(user)
    };
    fetchUser();
  }, [token])

  useEffect(() => {
    const toke = localStorage.getItem('token')
    if (toke) {
      return setToken(toke);
    }
  }, [])


  return (
    <div>
      <Navbar setUser={setUser} user={user} />
      <Route exact path="/"><Home user={user} /></Route>
      <Route path="/routines"><Routines /></Route>
      <Route path="/my-routines"><Myroutines user={user} token={token} /></Route>
      <Route path="/activities"><Activities token={token} user={user} /></Route>
      <Route path="/login"><Login setUser={setUser} /></Route>
      <Route path="/register"><Register setUser={setUser} /></Route>
    </div>
  );
}

export default App;
