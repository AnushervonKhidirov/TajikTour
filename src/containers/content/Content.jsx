import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from '../../tabs/Home';
import Packages from '../../tabs/Packages';
import News from '../../tabs/News';
import Contacts from '../../tabs/Contacts';
import './content.css';

function Content() {
  return (
    <main>
      <Switch>
        <Route path='/' exact component={Home} />
        <Route path='/packages' exact component={Packages} />
        <Route path='/news' exact component={News} />
        <Route path='/contacts' exact component={Contacts} />
      </Switch>
    </main>
  );
}

export default Content;