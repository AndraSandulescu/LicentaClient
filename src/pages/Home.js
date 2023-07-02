import React, { useState } from "react";
import './centralizedStyling.css';
import './Home.css'
import SignUp from './signup.js';

import axios from "axios";

import { MDBRow, MDBCol } from 'mdb-react-ui-kit';
import { useNavigate } from "react-router-dom";

const Home = () => {

    const navigate = useNavigate();


    return (
        <div className="homePage">
            <div className="centralizeContainer">
                <div className="chenarContinut">
                    {/* <MDBCol> */}
                    <h1>
                        Welcome to PolitiMood!
                    </h1>

                    <MDBRow d-flex align-items-center justify-content-center>
                        <MDBCol className="col align-items-center justify-content-center line">
                            <br />
                            <h3>Curious to know what your favorite politicians think? Well, you've come to the right place!</h3>
                            <br /><br />
                            <h4>
                                You'll quickly discover who shares your values and who skirts around hot topics!
                                We give you the power to explore and analyze the feelings hidden behind their words.<br /><br />
                                Enter the app and take a look behind the scenes of politics!
                            </h4>
                            <br />
                        </MDBCol>
                        <MDBCol className="col d-flex align-items-center justify-content-center">
                            <SignUp />
                        </MDBCol>
                    </MDBRow>

                </div>
            </div>
        </div>
    )
}

export default Home;