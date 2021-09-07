import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from '../../pages/Home';
import Packages from '../../pages/Packages';
import News from '../../pages/News';
import Contacts from '../../pages/Contacts';
import './content.css';

function Content() {
  return (
    <main>
      <Switch>
        <Route path='/' exact component={Home} />
        <Route path='/packages/:tour?' exact component={Packages} />
        <Route path='/news/:newsItem?' exact component={News} />
        <Route path='/contacts' exact component={Contacts} />
      </Switch>
    </main>
  );
}

export default Content;