import React, { Component, useState } from 'react';
import axios from 'axios';
import DatePicker from "react-datepicker";
import { format } from "date-fns";
import { MDBContainer, MDBRow, MDBCol } from 'mdb-react-ui-kit';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import "./scrapeTweets.css"
import "./comparePoliticians.css"


const ComparePoliticians = () => {


    // const politicians = []; // inițializăm array-ul de politicieni
    const [selectedPolitician1, setSelectedPolitician1] = useState(''); // folosim hook-ul useState pentru a gestiona starea politicianului selectat
    const [selectedPolitician2, setSelectedPolitician2] = useState(''); // folosim hook-ul useState pentru a gestiona starea politicianului selectat

    const [response1, setResponse1] = useState({});
    const [response2, setResponse2] = useState({});



    const [text, setText] = useState('text');
    const [since, setSince] = useState(null);
    const [until, setUntil] = useState(null);


    //statistici
    const [isVisibleStatistics, setIsVisibleStatistics] = useState(false);
    const COLORS = ['#7b26eb', '#00c7a2'];

    const [posTweets1, setPosTweets1] = useState(0);
    const [totalTweets1, setTotalTweets1] = useState(0);
    const [sentimentMed1, setSentimentMed1] = useState(0);
    const [sentimentPerMonth1, setSentimentPerMonth1] = useState({});
    const [tweetsPerMonth1, setTweetsPerMonth1] = useState({});
    const tweetData1 = [
        { sentiment: 'pozitiv', count: posTweets1 },
        { sentiment: 'negativ sau incert', count: totalTweets1 - posTweets1 }
    ];


    const [posTweets2, setPosTweets2] = useState(0);
    const [totalTweets2, setTotalTweets2] = useState(0);
    const [sentimentMed2, setSentimentMed2] = useState(0);
    const [sentimentPerMonth2, setSentimentPerMonth2] = useState({});
    const [tweetsPerMonth2, setTweetsPerMonth2] = useState({});
    const tweetData2 = [
        { sentiment: 'pozitiv', count: posTweets2 },
        { sentiment: 'negativ sau incert', count: totalTweets2 - posTweets2 }
    ];

    const handlePoliticianChange1 = event => {
        const selectedPolitician1 = event.target.value;
        setSelectedPolitician1(selectedPolitician1);
    };
    const handlePoliticianChange2 = event => {
        const selectedPolitician2 = event.target.value;
        setSelectedPolitician2(selectedPolitician2);
    };


    const politiciansList = [
        { id: 0, name: 'AlexandriaOcasioCortez' },
        { id: 1, name: 'Barack Obama' },
        { id: 2, name: 'Bill Clinton' },
        { id: 3, name: 'Chuck Schumer' },
        { id: 4, name: 'CoryBooker' },
        { id: 5, name: 'Elizabeth Warren' },
        { id: 6, name: 'Hillary Clinton' },
        { id: 7, name: 'Ilhan Omar' },
        { id: 8, name: 'Joe Biden' },
        { id: 9, name: 'Kamala Harris' },
        { id: 10, name: 'Lindsey Graham' },
        { id: 11, name: 'Marco Rubio' },
        { id: 12, name: 'Michelle Obama' },
        { id: 13, name: 'Mitch McConnell' },
        { id: 14, name: 'Nancy Pelosi' },
        { id: 15, name: 'Rand Paul' },
        { id: 16, name: 'Ted Cruz' }
    ]



    //submit la formular
    const handleSubmit = async event => {
        event.preventDefault(); // Prevent page reload
        // Get the values
        const formattedSince = since ? format(since, "yyyy-MM-dd") : "";
        const formattedUntil = until ? format(until, "yyyy-MM-dd") : "";

        const formValues = {
            text,
            formattedSince,
            formattedUntil,
            politician1: selectedPolitician1,
            politician2: selectedPolitician2,
        };
        console.log(formValues); // Log the values to the console

        // Send the values to the server using Axios and receive response1 and response2
        try {
            const response = await axios.get('https://localhost:7112/api/ComparePoliticians/Compare', { params: formValues });

            const { response1, response2 } = response.data;
            setResponse1(response1); // Update the state for politician 1 response
            setResponse2(response2); // Update the state for politician 2 response



            console.log("raspuns1")
            console.log(response1)


            setPosTweets1(response1.posTweets); // Actualizează starea cu numărul de tweet-uri pozitive
            setTotalTweets1(response1.totalTweets); // Actualizează starea cu numărul total de tweet-uri
            setSentimentPerMonth1(response1.sentimentPerMonth); // Actualizează starea cu dicționarul SentimentPerMonth
            console.log("sentimentPerMonth1")
            console.log(sentimentPerMonth1)

            setTweetsPerMonth1(response1.tweetsPerMonth); // Actualizează starea cu dicționarul TweetsPerMonth
            console.log("tweetsPerMonth1")
            console.log(tweetsPerMonth1)


            /////////////////////////
            setPosTweets2(response2.posTweets); // Actualizează starea cu numărul de tweet-uri pozitive
            setTotalTweets2(response2.totalTweets); // Actualizează starea cu numărul total de tweet-uri
            setSentimentPerMonth2(response2.sentimentPerMonth); // Actualizează starea cu dicționarul SentimentPerMonth
            console.log("sentimentPerMonth2")
            console.log(sentimentPerMonth2)

            setTweetsPerMonth2(response2.tweetsPerMonth); // Actualizează starea cu dicționarul TweetsPerMonth
            console.log("tweetsPerMonth2")
            console.log(tweetsPerMonth2)

            setIsVisibleStatistics(true)

        } catch (error) {
            console.error(error); // Log the error to the console in case of failure
        }


        //statistici


    };

    const renderLabel = ({ sentiment, count }) => {
        if (sentiment === 'pozitiv') {
            return `${sentiment}: ${count}`;
        }
        else {
            return `${sentiment}: ${count}`;
        }
        return null;
    };


    return (
        <div className="entirePage" id="root">
            <h1> Comparati opiniile politice </h1><br /><br /><br /><br />
            <div className="topOfPage">
                {/* Conținutul formularului de filtrare */}
                {/* <form onSubmit={handleSubmit}> */}
                {/* Elementele formularului */}
                <MDBRow>
                    <MDBCol className="col d-flex align-items-center justify-content-center">
                        <label htmlFor="text">Text de cautat:</label>
                        <input
                            type="text"
                            id="text"
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                        />
                    </MDBCol>
                    <MDBCol className="col d-flex align-items-center justify-content-center">
                        <label htmlFor="since">De la data:</label>
                        <DatePicker
                            id="since"
                            selected={since}
                            onChange={(date) => setSince(date)}
                            placeholderText="Selecteaza data"
                            dateFormat="yyyy/MM/dd"
                        />
                    </MDBCol>
                    <MDBCol className="col d-flex align-items-center justify-content-center">
                        <label htmlFor="until">Pana la data:</label>
                        <DatePicker
                            id="until"
                            selected={until}
                            onChange={(date) => setUntil(date)}
                            placeholderText="Selecteaza data"
                            dateFormat="yyyy/MM/dd"
                        />
                    </MDBCol>
                    <MDBCol className="col d-flex align-items-center justify-content-center">
                        <button className="btn btn-indigo" type="submit" onClick={handleSubmit}>Submit</button>
                    </MDBCol>
                </MDBRow>
                {/* </form>F */}
            </div>
            <MDBRow>
                <MDBCol className="col d-flex align-items-center justify-content-center">
                    {/* Conținutul primei părți a paginii */}
                    <label>
                        Politician:
                    </label>
                    <select value={selectedPolitician1} onChange={handlePoliticianChange1} id="politician1">
                        <option value="">Alegeți un politician</option>
                        {politiciansList.map(politician => (
                            <option key={politician.id} value={politician.id}>
                                {`${politician.name}`}
                            </option>
                        ))}
                    </select>
                </MDBCol>
                <MDBCol className="col d-flex align-items-center justify-content-center">
                    {/* Conținutul celei de-a doua părți a paginii */}
                    <form>
                        <label>
                            Politician:
                        </label>
                        <select value={selectedPolitician2} onChange={handlePoliticianChange2} id="politician2">
                            <option value="">Alegeți un politician</option>
                            {politiciansList.map(politician => (
                                <option key={politician.id} value={politician.id}>
                                    {`${politician.name}`}
                                </option>
                            ))}
                        </select>
                    </form>
                </MDBCol>
            </MDBRow>
            <br />
            <MDBRow>
                <MDBCol className="col d-flex align-items-top justify-content-center">
                    <div className="table-responsive">
                        {/* Tabelul pentru politicianul 1 */}
                        {response1.results && (
                            <div>
                                <h2>Tweet-uri pentru primul politician</h2>
                                <div className="tableContainer">
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>Data</th>
                                                <th>Text</th>
                                                <th>Sentiment</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {response1.results.map((item, index) => (
                                                <tr key={index}>
                                                    <td>{index + 1}</td>
                                                    <td>{format(new Date(item.searchCsv.dateTime), "yyyy-MM-dd")}</td>
                                                    <td>{item.searchCsv.text}</td>
                                                    <td>{item.sentiment}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}
                    </div>
                </MDBCol>
                <MDBCol className="col d-flex align-items-top justify-content-center">
                    <div className="table-responsive">
                        {/* Tabelul pentru politicianul 2 */}
                        {response2.results && (
                            <div>
                                <h2>Tweet-uri pentru al doilea politician</h2>
                                <div className="tableContainer">
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>Data</th>
                                                <th>Text</th>
                                                <th>Sentiment</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {response2.results.map((item, index) => (
                                                <tr key={index}>
                                                    <td>{index + 1}</td>
                                                    <td>{format(new Date(item.searchCsv.dateTime), "yyyy-MM-dd")}</td>
                                                    <td>{item.searchCsv.text}</td>
                                                    <td>{item.sentiment}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}
                    </div>
                </MDBCol>
            </MDBRow>

            {isVisibleStatistics &&
                <MDBRow>
                    <div className='statisticsContainer'>
                        <MDBCol>
                            <br /><br /><br />
                            <h3>Statistici:</h3>

                            <ResponsiveContainer width="100%" height={300}>
                                <PieChart width={400} height={400}>
                                    <Pie
                                        data={tweetData1}
                                        dataKey="count"
                                        nameKey="sentiment"
                                        cx="50%"
                                        cy="50%"
                                        outerRadius={100}
                                        fill="#8884d8"
                                        label={renderLabel}
                                        labelLine={false} // Adăugați această opțiune pentru a elimina linia de conectare a etichetelor
                                    >
                                        {tweetData1.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    {/* <Tooltip /> */}
                                    {/* <Legend /> */}
                                </PieChart>
                            </ResponsiveContainer>

                            {Object.keys(sentimentPerMonth1).length > 0 && (
                                <div>
                                    <br /><br /><h4>Evolutia sentimentului pe luni</h4><br />
                                    <ResponsiveContainer width="100%" height={300}>
                                        <LineChart data={Object.entries(sentimentPerMonth1)}
                                            margin={{ top: 10, right: 70, left: 70, bottom: 10 }}>
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis dataKey="0" reversed={true} />
                                            <YAxis />
                                            {/* <Tooltip formatter={(value, name, entry) => `${entry.payload[0]}: ${entry.payload[1].toFixed(3)}`} /> */}
                                            {/* <Tooltip labelFormatter={(label) => `${label}:`} formatter={(value) => value.toFixed(3)} /> */}
                                            <Tooltip labelFormatter={(label) => `${label}:`} formatter={(value, name) => [value.toFixed(3)]} />
                                            <Legend />
                                            <Line type="monotone" dataKey="1" stroke="#8884d8" name="Evolutia sentimentului pe luni" />
                                        </LineChart>

                                    </ResponsiveContainer>
                                </div>
                            )}


                            {Object.keys(sentimentPerMonth1).length > 0 && (
                                <div>
                                    <br /><br /><h4><br />Numarul tweet-urilor pe luni</h4><br />
                                    <ResponsiveContainer width="100%" height={300}>
                                        <LineChart width={600} height={300} data={Object.entries(tweetsPerMonth1)}
                                            margin={{ top: 10, right: 70, left: 70, bottom: 10 }}>
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis dataKey="0" reversed={true} />
                                            <YAxis />
                                            {/* <Tooltip formatter={(value, name, entry) => `${entry.payload[0]}: ${entry.payload[1].toFixed(3)}`} /> */}
                                            {/* <Tooltip labelFormatter={(label) => `${label}:`} formatter={(value) => value.toFixed(3)} /> */}
                                            <Tooltip labelFormatter={(label) => `${label}:`} formatter={(value, name) => [value.toFixed(0)]} />
                                            <Legend />
                                            <Line type="monotone" dataKey="1" stroke="#8884d8" name="Numarul tweet-urilor pe luni" />
                                        </LineChart>
                                    </ResponsiveContainer>
                                </div>
                            )}



                        </MDBCol>
                    </div>
                    <div className='statisticsContainer'>
                        <MDBCol>
                            <br /><br /><br />
                            <h3>Statistici:</h3>

                            <ResponsiveContainer width="100%" height={300}>
                                <PieChart width={400} height={400}>
                                    <Pie
                                        data={tweetData2}
                                        dataKey="count"
                                        nameKey="sentiment"
                                        cx="50%"
                                        cy="50%"
                                        outerRadius={100}
                                        fill="#8884d8"
                                        label={renderLabel}
                                        labelLine={false} // Adăugați această opțiune pentru a elimina linia de conectare a etichetelor
                                    >
                                        {tweetData2.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    {/* <Tooltip /> */}
                                    {/* <Legend /> */}
                                </PieChart>
                            </ResponsiveContainer>

                            {Object.keys(sentimentPerMonth2).length > 0 && (
                                <div>
                                    <br /><br /><h4>Evolutia sentimentului pe luni</h4><br />
                                    <ResponsiveContainer width="100%" height={300}>
                                        <LineChart width={600} height={300} data={Object.entries(sentimentPerMonth2)}
                                            margin={{ top: 10, right: 70, left: 70, bottom: 10 }}>
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis dataKey="0" reversed={true} />
                                            <YAxis />
                                            {/* <Tooltip formatter={(value, name, entry) => `${entry.payload[0]}: ${entry.payload[1].toFixed(3)}`} /> */}
                                            {/* <Tooltip labelFormatter={(label) => `${label}:`} formatter={(value) => value.toFixed(3)} /> */}
                                            <Tooltip labelFormatter={(label) => `${label}:`} formatter={(value, name) => [value.toFixed(3)]} />
                                            <Legend />
                                            <Line type="monotone" dataKey="1" stroke="#8884d8" name="Evolutia sentimentului pe luni" />
                                        </LineChart>
                                    </ResponsiveContainer>
                                </div>
                            )}


                            {Object.keys(sentimentPerMonth2).length > 0 && (
                                <div>
                                    <br /><br /><h4><br />Numarul tweet-urilor pe luni</h4><br />
                                    <ResponsiveContainer width="100%" height={300}>
                                        <LineChart width={600} height={300} data={Object.entries(tweetsPerMonth2)}
                                            margin={{ top: 10, right: 70, left: 70, bottom: 10 }}>
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis dataKey="0" reversed={true} />
                                            <YAxis />
                                            {/* <Tooltip formatter={(value, name, entry) => `${entry.payload[0]}: ${entry.payload[1].toFixed(3)}`} /> */}
                                            {/* <Tooltip labelFormatter={(label) => `${label}:`} formatter={(value) => value.toFixed(3)} /> */}
                                            <Tooltip labelFormatter={(label) => `${label}:`} formatter={(value, name) => [value.toFixed(0)]} />
                                            <Legend />
                                            <Line type="monotone" dataKey="1" stroke="#8884d8" name="Numarul tweet-urilor pe luni" />
                                        </LineChart>
                                    </ResponsiveContainer>
                                </div>
                            )}


                        </MDBCol>
                    </div>
                </MDBRow>
            }
        </div>
    );

}

export default ComparePoliticians;