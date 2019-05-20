import React from 'react';
import ReactDOM from 'react-dom';
import Footer from '.';
import { StaticRouter as Router } from 'react-router-dom'

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Router><Footer /></Router>, div);
  ReactDOM.unmountComponentAtNode(div);
});
