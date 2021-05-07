import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';
import { MainPage, FileTransfer } from './pages';

function Routes({ candidates }) {
  return (
    <Switch>
      {candidates.map((item) => {
        return (
          <Route
            key={item.path}
            path={`/${item.path}`}
            component={item.component}
          />
        );
      })}
    </Switch>
  );
}

Routes.propTypes = {
  candidates: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const mainCandidates = [
  { path: 'files', component: FileTransfer },
  { path: '', component: MainPage },
];

function MainRoutes() {
  return <Routes candidates={mainCandidates} />;
}

export { MainRoutes };
