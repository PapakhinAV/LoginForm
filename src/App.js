import { BrowserRouter, Route, Switch } from 'react-router-dom';
import LoginPage from './Components/AuthComponents/LoginPage';
import SignUpPage from './Components/AuthComponents/SignUpPage';
import HomePage from './Components/HomePage/HomePage';


function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <LoginPage />
        </Route>
        <Route path="/signup">
          <SignUpPage />
        </Route>
        <Route path="/home">
          <HomePage />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
