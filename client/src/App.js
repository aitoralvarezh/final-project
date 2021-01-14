import { Switch, Route } from 'react-router-dom';

import './App.css';
import Header from './header';
import MainPage from './welcome/landing';

// USERS
import Login from './routes/users/register-login/login';
import Register from './routes/users/register-login/register';
import Options from './routes/users/options-menu';

//ARTICLES
import SelectedArticle from './routes/articles/selectedarticle'
import ReadArticle from './routes/articles/readarticle';

//TOPICS
import Topics from './routes/topics/topics'
import CreateArticles from './routes/articles/createarticle';
import TopicArticle from './routes/articles/article-topic';
import ConfirmBox from './routes/users/user-menu/TESTS';



function App() {
  return (
    <div className="App">

      <Header />
      <ConfirmBox/>
      <Switch>
        <Route path="/articles/write" >
          <CreateArticles />
        </Route>
        <Route path="/articles/read/:id" >
          <SelectedArticle className={'amen'}/>
        </Route>
        <Route path="/topics/read/:id" >
          <TopicArticle/>
        </Route>
        <Route path="/users/me">
          <Options />
        </Route>
        <Route path="/register">
          <Register />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/articles">
          <ReadArticle />
        </Route>
        <Route path="/topics/:id">
          <TopicArticle  />
        </Route>
        <Route path="/topics">
          <Topics />
        </Route>
        <Route path="/">
          <MainPage />
        </Route>

      </Switch>

    </div>
  );
}

export default App;
