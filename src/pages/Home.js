import React, { useState } from "react";
import './centralizedStyling.css';
import './Home.css'
import axios from "axios";
import { MDBRow, MDBCol } from 'mdb-react-ui-kit';
import { useNavigate } from "react-router-dom";
import SignUp from './signup.js';

// import "./Button.css";
const Home = () => {

    const navigate = useNavigate();

    const redirectToSignUp = () => {
        navigate("/sign-up");
    };



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
                            <h3>Ești curios să afli ce gândesc politicienii tăi preferați? Ei bine, ai ajuns în locul potrivit!</h3>
                            <br /><br />
                            <h4>
                                Vei descoperi rapid cine împărtășește valorile tale și cine face ocoluri în jurul subiectelor fierbinți!
                                Noi iti oferim puterea de a explora si de a analiza sentimentele ascunse in spatele cuvintelor acestora.
                                <br /><br />Intra in aplicatie si aruncă o privire în culisele politicii!
                            </h4>
                            <br />
                        </MDBCol>
                        <MDBCol className="col d-flex align-items-center justify-content-center">
                            {/* <button
                                className="btn-login"
                                type="logInPage"
                                onClick={redirectToSignUp}
                            >
                                Log In / Sign Up
                            </button> */}
                            <SignUp />
                        </MDBCol>
                    </MDBRow>

                </div>
            </div>
        </div>
    )
}

export default Home;