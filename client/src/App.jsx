import './App.css';
import { Switch, Route } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import LandingPage from './components/LandingPage/LandingPage';
import SigninPage from './components/SigninPage/SigninPage';
import RegisterPage from './components/RegisterPage/RegisterPage';
import UploaderPage from './components/UploadPage/UploaderPage';
import CopyRight from './components/CopyRight/CopyRight';
import { useAuth } from './context/AuthContext';
import Header from './components/Header/Header';

const sections = [
  { title: 'GREEN', path: '/product/green' },
  { title: 'ROOIBOS', path: '/product/rooibos' },
  { title: 'HERBAL', path: '/product/herbal' },
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
          <Route exact path='/product/upload'>
            <UploaderPage user={user} />
          </Route>
        </Switch>
      </div>
      <CopyRight />
    </>
  );
}

export default App;
