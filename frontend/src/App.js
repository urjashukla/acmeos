import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './components/Login/Login';
import Navbar from './components/Navbar/Navbar';
import Homepage from './components/Homepage/Homepage';
import Contentpage from './components/Contentpage/Contentpage';
import TerminalUI from './components/Terminal/Terminal';
import Container from 'react-bootstrap/Container';
import Doubtpage from './components/Doubtpage/Doubtpage';
import DoubtForm from './components/Doubtpage/DoubtForm/DoubtForm';
import Commentpage from './components/Commentpage/Commentpage';
import Profile from './components/Profile/Profile';
import Test from './components/Testpage/Test';
import ProfileEditForm from './components/Profile/ProfileEditForm';
import chap1 from './components/Contentpage/chapters/chap1';
import chap2 from './components/Contentpage/chapters/chap2';
import chap3 from './components/Contentpage/chapters/chap3';
import chap4 from './components/Contentpage/chapters/chap4';
import chap5 from './components/Contentpage/chapters/chap5';
import chap6 from './components/Contentpage/chapters/chap6';
import chap7 from './components/Contentpage/chapters/chap7';
import chap8 from './components/Contentpage/chapters/chap8';
import './App.css';

function App() {
  const [status, setStatus] = useState(false); //loggedout
  const [mainDivClass, setMainDivClass] = useState('');

  const user = window.localStorage.user;

  const manipulateClass = () => {
    if (localStorage.getItem('user')) {
      setMainDivClass('main');
    } else {
      setMainDivClass('');
    }
  };

  useEffect(() => {
    if (user) {
      setStatus(true);
      manipulateClass();
    } else {
      manipulateClass();
    }
  }, [status]);

  return (
    <React.Fragment>
      <Router>
        <Navbar />
        <Container className="p-0" fluid>
          <div id="mainDiv" className={mainDivClass}>
            <Switch>
              <Route exact path="/" component={Homepage} />
              <Route path="/login" component={Login} />
              <Route path="/chapters" component={Contentpage} />
              <Route path="/terminal" component={TerminalUI} />
              <Route path="/doubt/ask" component={DoubtForm} />
              <Route path="/doubt" component={Doubtpage} />
              <Route path="/comment" component={Commentpage} />
              <Route path="/test" component={Test} />
              <Route path="/profile" component={Profile} />
              <Route path="/profileEdit" component={ProfileEditForm} />
              <Route path="/chap1" component={chap1} />
              <Route path="/chap2" component={chap2} />
              <Route path="/chap3" component={chap3} />
              <Route path="/chap4" component={chap4} />
              <Route path="/chap5" component={chap5} />
              <Route path="/chap6" component={chap6} />
              <Route path="/chap7" component={chap7} />
              <Route path="/chap8" component={chap8} />
            </Switch>
          </div>
        </Container>
      </Router>
    </React.Fragment>
  );
}

export default App;
