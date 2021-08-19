import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Main from '../../tabs/Main';
import './content.css';

function Content() {
  return (
    <main>
      <Switch>
        <Route path='/' exact component={Main} />
      </Switch>
    </main>
  );
}

export default Content;