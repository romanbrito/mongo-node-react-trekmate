// fetch the data from the api
import React from 'react';
import  ReactDOMServer from 'react-dom/server';

import App from './src/components/App';

import config from './config';
import axios from 'axios';

console.log(`${config.serverUrl}/api/contests`);

const serverRender = () =>
  axios.get(`${config.serverUrl}/api/contests`)
    .then(resp => {
      return {
        initialMarkup:ReactDOMServer.renderToString(
          <App initialContests={resp.data.contests}/>
        ),
        initialData: JSON.stringify(resp.data)
      };
    });

export default serverRender;