import './App.css';
import { Switch, Route } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import LandingPage from './components/LandingPage/LandingPage';
import SigninPage from './components/SigninPage/SigninPage';
import RegisterPage from './components/RegisterPage/RegisterPage';
import CopyRight from './components/CopyRight/CopyRight';

function App() {
  return (
    <>
      <CssBaseline />
      <div className='app'>
        <Switch>
          <Route exact path='/' component={LandingPage} />
          <Route exact path='/signin' component={SigninPage} />
          <Route exact path='/register' component={RegisterPage} />
        </Switch>
      </div>
      <CopyRight />
    </>
  );
}

export default App;
