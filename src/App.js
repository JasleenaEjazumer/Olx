
import React ,{useEffect,useContext} from 'react';
import './App.css';
import { AuthContext, FirebaseContext } from './store/Context';
import { BrowserRouter as Router ,Route} from 'react-router-dom';
import PostDetails, { PostContext } from './store/PostContext';
/**
 * ?  =====Import Components=====
 */
import Home from './Pages/Home';
import Signup from './Pages/Signup';
import Login from './Pages/Login';
import Create from './Pages/Create';
import ViewPost from  './Pages/ViewPost'

function App() {
  const {user,setUser} =useContext(AuthContext)
  const{firebase}=useContext(FirebaseContext)
  useEffect(()=>{
    firebase.auth().onAuthStateChanged((user)=>
    {
      setUser(user)
    })
  })
  return (
    <div>
      <Router>
        <PostDetails>
        <Route exact path='/'>
      <Home />
      </Route>
      <Route path='/ViewPost'>
        <ViewPost/>
      
      </Route>
      </PostDetails>
      <Route path='/Signup'>
        <Signup/>
      </Route>
  
      <Route path='/Login'>
        <Login/>
      </Route>
      <Route path='/Create'>
        <Create/>
      
      </Route>
     
      </Router>
    
    </div>
  );
}

export default App;