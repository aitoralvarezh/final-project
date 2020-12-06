import { Switch, Route } from 'react-router-dom';
import ReadArticle from './articles/readarticle';
import SelectedArticle from './articles/selectedarticle'
import './App.css';
import Header from './header'
import Topics from './topics/topics'
import MainPage from './landing';

function App() {
  return (
    <div className="App">
      <Header />
      <Switch>
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
          <MainPage />         
        </Route>
      </Switch>
  
    </div>
  );
}

export default App;
