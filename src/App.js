import './App.css';
import { BrowserRouter as Router, Redirect, Route, Switch} from 'react-router-dom';
import Home from './components/Home/Home';
import Post from './components/Post/Post';
import CreatePost from './components/CreatePost/CreatePost';
import Navbar from './components/Navbar/Navbar';

function App() {
  return (
    <Router>
      <div className="App"> 
      <div>
        <Navbar />
      </div>     
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/posts/:id">
          <Post />
        </Route>
        <Route exact path="/create">
          <CreatePost />
        </Route>
      </Switch>
    </div>
    </Router>    
  );
}

export default App;
