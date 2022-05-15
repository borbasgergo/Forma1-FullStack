import React from 'react';
import {Outlet} from "react-router-dom";


const App = () => {


    return (
        <div className="flex flex-col">

          <div className="h-16 bg-gray-300">
            header
          </div>

          <div>
            <Outlet />
          </div>

        </div>
    );
}


export default App