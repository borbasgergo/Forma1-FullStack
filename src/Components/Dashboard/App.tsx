import React from 'react';
import {Outlet} from "react-router-dom";
import {AppHeader} from "./Header/AppHeader";


const App = () => {


    return (
        <div className="flex flex-col">

          <div className="h-16">
            <AppHeader/>
          </div>

          <div className="pl-8 pr-8">
            <Outlet />
          </div>

        </div>
    );
}


export default App