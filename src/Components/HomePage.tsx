import React, {useContext, useState} from "react";
import {ErrorDiv} from "./Error";
import {Login} from "./Login";
import {Outlet} from "react-router-dom";
import {HomeHeader} from "./HomeHeader";

export const HomePage = () => {



    return (
        <div className="flex flex-col h-screen">
            <div className="h-16 bg-gray-300">
                <HomeHeader />
            </div>
            <div className="w-3/12 mx-auto my-auto">
                <div className="flex flex-col">


                    <Outlet />
                </div>
            </div>
        </div>
    );
}