import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {Routing} from "./Components/Routing";
import {BrowserRouter} from "react-router-dom";
import {AuthProvider} from "./Context/Provider/AuthProvider";
import {HttpProvider} from "./Context/Provider/HttpProvider";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
    <HttpProvider>
        <AuthProvider>
            <BrowserRouter>
                <Routing />
            </BrowserRouter>
        </AuthProvider>
    </HttpProvider>
);


