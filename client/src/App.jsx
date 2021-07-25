import './App.css';
import { Switch, Route } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import SigninPage from './components/SigninPage/SigninPage';
import RegisterPage from './components/RegisterPage/RegisterPage';
import UploaderPage from './components/UploadPage/UploaderPage';
import CopyRight from './components/CopyRight/CopyRight';
import { useAuth } from './context/AuthContext';
import Header from './components/Header/Header';
import ProductPage from './components/ProductPage/ProductPage';
import { bannerInfo } from './info/bannerInfo';

const sections = [
  { title: 'HOME', path: '/' },
  { title: 'GREEN', path: '/product/green' },
  { title: 'ROOIBOS', path: '/product/rooibos' },
  { title: 'HERBAL', path: '/product/herbal' },
];

function App({ ImageAdd, productService }) {
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
          <Route exact path='/'>
            <ProductPage
              category=''
              bannerInfo={bannerInfo.landing}
              productService={productService}
            />
          </Route>
          <Route exact path='/product/green'>
            <ProductPage
              category='green'
              bannerInfo={bannerInfo.green}
              productService={productService}
            />
          </Route>
          <Route exact path='/product/rooibos'>
            <ProductPage
              category='rooibos'
              bannerInfo={bannerInfo.rooibos}
              productService={productService}
            />
          </Route>
          <Route exact path='/product/herbal'>
            <ProductPage
              category='herbal'
              bannerInfo={bannerInfo.herbal}
              productService={productService}
            />
          </Route>
          <Route exact path='/signin'>
            <SigninPage user={user} onSignin={signin} />
          </Route>
          <Route exact path='/register'>
            <RegisterPage user={user} onRegister={register} />
          </Route>
          <Route exact path='/product/upload'>
            <UploaderPage
              ImageAdd={ImageAdd}
              productService={productService}
              user={user}
            />
          </Route>
        </Switch>
      </div>
      <CopyRight />
    </>
  );
}

export default App;
