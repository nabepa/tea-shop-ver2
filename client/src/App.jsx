import './App.css';
import { Switch, Route } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import LandingPage from './components/LandingPage/LandingPage';
import SigninPage from './components/SigninPage/SigninPage';
import RegisterPage from './components/RegisterPage/RegisterPage';
import CopyRight from './components/CopyRight/CopyRight';
import { useAuth } from './context/AuthContext';

function App() {
  const { user, register, signin, signout } = useAuth();

  return (
    <>
      <CssBaseline />
      <div className='app'>
        <Switch>
          <Route exact path='/' component={LandingPage} />
          <Route exact path='/signin'>
            <SigninPage onSignin={signin} />
          </Route>
          <Route exact path='/register'>
            <RegisterPage onRegister={register} />
          </Route>
        </Switch>
      </div>
      <CopyRight />
    </>
  );
}

export default App;
