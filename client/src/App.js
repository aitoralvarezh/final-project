import { Switch, Route } from 'react-router-dom';

import './App.css';
import Header from './header';
import MainPage from './landing';

// USERS
import Login from './routes/users/register-login/login';
import Register from './routes/users/register-login/register';
import EditProfile from './routes/users/user-menu/users';
import Presentation from './presentation'

//ARTICLES
import SelectedArticle from './routes/articles/selectedarticle'
import ReadArticle from './routes/articles/readarticle';

//TOPICS
import Topics from './routes/topics/topics'


function App() {
  return (
    <div className="App">

      {/* <Header />
 */}
      <Switch>
        <Route path="/users/me">
          <EditProfile />
        </Route>
        <Route path="/register">
          <Register />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/articles/:id">
          <SelectedArticle />
        </Route>
        <Route path="/topics">
          <Topics />
        </Route>
        <Route path="/articles">
          <ReadArticle />
        </Route>
        <Route path="/">
          <Presentation />
        </Route>
       
      </Switch>

    </div>
  );
}

export default App;
