import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { Provider } from 'react-redux';
import App from "./app/App";
import {store} from "./app/store";


const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

root.render(
    <Provider store={store}>
        <App />
    </Provider>
);



// {
//     "name": "todo15v3",
//     "version": "0.1.0",
//     "private": true,
//     "dependencies": {
//     "@emotion/react": "11.10.5",
//         "@emotion/styled": "11.10.5",
//         "@mui/icons-material": "5.10.9",
//         "@mui/material": "5.10.11",
//         "@testing-library/jest-dom": "5.16.5",
//         "@testing-library/react": "13.4.0",
//         "@testing-library/user-event": "14.4.3",
//         "@types/jest": "29.2.0",
//         "@types/node": "18.11.7",
//         "@types/react": "18.0.24",
//         "@types/react-dom": "18.0.7",
//         "@types/react-redux": "7.1.24",
//         "@types/uuid": "^10.0.0",
//         "axios": "1.1.3",
//         "react": "18.2.0",
//         "react-dom": "18.2.0",
//         "react-redux": "8.0.4",
//         "react-scripts": "5.0.1",
//         "redux": "4.2.0",
//         "redux-thunk": "2.4.1",
//         "typescript": "4.8.4",
//         "uuid": "^10.0.0",
//         "web-vitals": "3.0.4"
// },
//     "scripts": {
//     "start": "react-scripts start",
//         "build": "react-scripts build",
//         "test": "react-scripts test",
//         "eject": "react-scripts eject"
// },
//     "eslintConfig": {
//     "extends": [
//         "react-app",
//         "react-app/jest"
//     ],
//         "rules": {
//         "jsx-a11y/anchor-is-valid": "off"
//     }
// },
//     "browserslist": {
//     "production": [
//         ">0.2%",
//         "not dead",
//         "not op_mini all"
//     ],
//         "development": [
//         "last 1 chrome version",
//         "last 1 firefox version",
//         "last 1 safari version"
//     ]
// },
//     "jest": {
//     "moduleNameMapper": {
//         "axios": "axios/dist/node/axios.cjs"
//     }
// }
// }
