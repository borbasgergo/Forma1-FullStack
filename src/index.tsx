import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {Routing} from "./Components/Routing";
import {BrowserRouter} from "react-router-dom";
import {AuthProvider} from "./Context/Provider/AuthProvider";
import {DependencyContainerProvider} from "./Context/Provider/DCProvider";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
    <DependencyContainerProvider>
        <AuthProvider>
            <BrowserRouter>
                <Routing />
            </BrowserRouter>
        </AuthProvider>
    </DependencyContainerProvider>
);


