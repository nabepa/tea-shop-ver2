import './App.css';
import { Switch, Route } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import LandingPage from './components/LandingPage/LandingPage';
import SigninPage from './components/SigninPage/SigninPage';
import RegisterPage from './components/RegisterPage/RegisterPage';
import CopyRight from './components/CopyRight/CopyRight';
import { useAuth } from './context/AuthContext';
import Header from './components/Header/Header';

const sections = [
  { title: 'page1', path: 'page1' },
  { title: 'page2', path: 'page2' },
  { title: 'page3', path: 'page3' },
  { title: 'page4', path: 'page4' },
  { title: 'page5', path: 'page5' },
  { title: 'page6', path: 'page6' },
  { title: 'page7', path: 'page7' },
  { title: 'page8', path: 'page8' },
  { title: 'page9', path: 'page9' },
];

function App() {
  const { user, register, signin, signout } = useAuth();

  return (
    <>
      <CssBaseline />
      <div className='app'>
        <Header
          title='TEA SHOP'
          sections={sections}
          user={user}
          signout={signout}
        />
        <Switch>
          <Route exact path='/' component={LandingPage} />
          <Route exact path='/signin'>
            <SigninPage user={user} onSignin={signin} />
          </Route>
          <Route exact path='/register'>
            <RegisterPage user={user} onRegister={register} />
          </Route>
        </Switch>
      </div>
      <CopyRight />
    </>
  );
}

export default App;
