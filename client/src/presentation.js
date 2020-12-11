
import { Switch, Route } from 'react-router-dom';
import { useState } from 'react';
import { useUser } from './usercontext';
import Login from './routes/users/register-login/login';
import Register from './routes/users/register-login/register';
import Header from './header';
import MainPage from './landing';
import ReadArticle from './routes/articles/readarticle'
import SelectedArticle from './routes/articles/selectedarticle'


function Presentation() {
  const [isRegister, setRegister] = useState(false)

  const me = useUser()
  if (!me) {
    return (
      <div>
        {isRegister ? <Register /> : <Login />}
        <div onClick={() => setRegister(!isRegister)} className="toggle">
          {isRegister ? 'Ya tienes cuenta? Logeate' : 'No tienes cuenta? Registrate'}
        </div>
      </div>
    )
  }

  return (
    <div className="page users">
      <main>
        <Header />
        <Switch>
          <Route path="/articles">
            <ReadArticle />
          </Route>
          <Route path="/">
            <MainPage />
          </Route>
        </Switch>
      </main>
    </div>
  );
}

export default Presentation;
