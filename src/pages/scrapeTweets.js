import React, { useState } from "react";
import './scrapeTweets.css';
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";
import Sidebar from '../components/Sidebar'
import { slide as Menu } from 'react-burger-menu';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell, ResponsiveContainer } from "recharts";


const ScrapeTweets = () => {
    const rootElement = document.getElementById("root");

    //hide si show
    const [isVisibleTableScraped, setIsVisibleTableScraped] = useState(false);
    const [isVisiblepreviousSearches, setIsVisiblepreviousSearches] = useState(false);
    const [isVisibleSentAnButton, setIsVisibleSentAnButton] = useState(false);
    const [isVisibleSentTable, setIsVisibleSentTable] = useState(false);

    //stari:
    //formular cautare
    const [text, setText] = useState('covid');
    const [username, setUsername] = useState('JoeBiden');
    const [since, setSince] = useState(null);
    const [until, setUntil] = useState(null);
    const [retweet, setRetweet] = useState('n');
    const [replies, setReplies] = useState('n');
    const [count, setCount] = useState(5);


    //cautari anterioare si index
    const [searchIndex, setSearchIndex] = useState(null); // Adăugată stare pentru indexul căutării
    const [previousSearches, setPreviousSearches] = useState([]); // Adăugată stare pentru lista de căutări anterioare

    //tabel cautare curenta
    const [tableData, setTableData] = useState([]);

    //raspuns de la ModelScript
    //tabel analiza sentiment corespondent SentimentCSV
    const [sentimentData, setSentimentData] = useState([]);
    //aici mai primesc si indexul
    const [posTweets, setPosTweets] = useState(0);
    const [totalTweets, setTotalTweets] = useState(0);
    const [sentimentMed, setSentimentMed] = useState(0);
    const [sentimentPerMonth, setSentimentPerMonth] = useState({});
    const [tweetsPerMonth, setTweetsPerMonth] = useState({});
    const [tweetSentiments, setTweetSentiments] = useState([]);

    const tweetData = [
        { sentiment: 'pozitiv', count: posTweets },
        { sentiment: 'restul', count: totalTweets - posTweets }
    ];

    const COLORS = ['#7b26eb', '#f5390a'];
    // const RADIAN = Math.PI / 180;


    //sidebar
    // const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    // const openSidebar = () => {
    //     setIsSidebarOpen(true);
    // };

    // // Exemplu de cod pentru a închide sidebar-ul
    // const closeSidebar = () => {
    //     rootElement.
    //         setIsSidebarOpen(false);
    // };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setIsVisibleTableScraped(true);

        try {
            const userId = localStorage.getItem('user_id');

            const formattedSince = since ? format(since, "yyyy-MM-dd") : "";
            const formattedUntil = until ? format(until, "yyyy-MM-dd") : "";

            const response = await axios.get("https://localhost:7112/api/Search/SearchScript", {
                params: {
                    text,
                    username,
                    since: formattedSince,
                    until: formattedUntil,
                    retweet,
                    replies,
                    count,
                    userId
                },
            });

            console.log("raspuns")
            console.log(response.data); // Handle the response data as per your requirements
            setSearchIndex(response.data.searchIndex); // Setează indexul căutării în stare
            setTableData(response.data.results); // Adăugați această linie pentru a actualiza datele tabelului

            console.log("Results == table data: ")
            // console.log(response.data.results)
            console.log(tableData)

            const newSearch = {
                text,
                username,
                since: formattedSince,
                until: formattedUntil,
                retweet,
                replies,
                searchIndex: response.data.searchIndex,
            };
            setPreviousSearches([...previousSearches, newSearch]);
            setIsVisibleSentAnButton(true);
        } catch (error) {
            console.error(error);
        }
        setIsVisiblepreviousSearches(true);
    };

    const handleSentimentAnalysis = async () => {
        let selectedIndex = searchIndex;
        if (selectedIndex === null && previousSearches.length > 0) {
            selectedIndex = previousSearches[previousSearches.length - 1].searchIndex;
        }

        setIsVisibleSentTable(true);

        if (selectedIndex !== null) {
            try {
                console.log(selectedIndex);
                const response = await axios.get("https://localhost:7112/api/Search/ModelScript", {
                    params: {
                        index: selectedIndex,
                    },
                });

                //primesc: list sentimentCSV-> searchCSV-DateTime,tweetID.....QuoteCount>;Sentiment;Value(coloane)
                //          SearchIndex; PosTweets; TotalTweets; SentimentMediu; SentimentPerMonth; TweetsPerMonth
                // console.log("Params: ");
                // console.log(response.config.params);
                // console.log(response.config.params.index);

                console.log(response.data);
                const responseData = response.data; // Salvăm răspunsul complet într-o variabilă

                setSentimentData(responseData.results); // Actualizați starea cu rezultatele analizei sentimentului

                // const dateTime = sentimentData[0].searchCsv.dateTime;
                // console.log(dateTime);

                setPosTweets(response.data.posTweets); // Actualizează starea cu numărul de tweet-uri pozitive
                setTotalTweets(response.data.totalTweets); // Actualizează starea cu numărul total de tweet-uri
                setSentimentPerMonth(responseData.sentimentPerMonth); // Actualizează starea cu dicționarul SentimentPerMonth
                setTweetsPerMonth(responseData.tweetsPerMonth); // Actualizează starea cu dicționarul TweetsPerMonth

                setTweetSentiments(response.data.results.map((item) => ({
                    item,
                    sentiment: item.sentiment === 'positive' ? 'Positive' : 'Negative'
                })));

                console.log("(response.data.results")
                console.log(response.data.results)



            } catch (error) {
                console.error(error);
            }
        } else {
            console.log("Niciun search selectat");
        }
    };


    const handleSelectSearch = (index) => {
        setSearchIndex(index);
    };


    const renderLabel = ({ sentiment, count }) => {
        if (sentiment === 'pozitiv') {
            return `${sentiment}: ${count}`;
        }
        else {
            return `total: ${totalTweets}`;
        }
        return null;
    };



    return (

        <div class = "entirePage"id="root">


            <h1>Scrape Tweets</h1><br/><br/><br/>

            {/* <aside className="sidebar">
                <Sidebar />
            </aside> */}




            <div id="scrapeForm">
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="text">Text:</label>
                        <input
                            type="text"
                            id="text"
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                        />

                        <label htmlFor="username">Username:</label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>

                    <div>
                        <label htmlFor="since">Since:</label>
                        <DatePicker
                            id="since"
                            selected={since}
                            onChange={(date) => setSince(date)}
                            placeholderText="Since"
                            dateFormat="yyyy/MM/dd"
                        />

                        <label htmlFor="until">Until:</label>
                        <DatePicker
                            id="until"
                            selected={until}
                            onChange={(date) => setUntil(date)}
                            placeholderText="Until"
                            dateFormat="yyyy/MM/dd"
                        />
                    </div>

                    <div>
                        <label htmlFor="retweet">Retweets:</label>
                        <select id="retweet" value={retweet} onChange={(e) => setRetweet(e.target.value)}>
                            <option value="">Retweets</option>
                            <option value="yes">Yes</option>
                            <option value="no">No</option>
                        </select>

                        <label htmlFor="replies">Replies:</label>
                        <select id="replies" value={replies} onChange={(e) => setReplies(e.target.value)}>
                            <option value="">Replies</option>
                            <option value="yes">Yes</option>
                            <option value="no">No</option>
                        </select>

                        <label htmlFor="count">Count:</label>
                        <input
                            type="number"
                            id="count"
                            value={count}
                            onChange={(e) => setCount(parseInt(e.target.value))}
                        />
                    </div>

                    <p>
                        <button className="btn btn-indigo" type="submit">Submit</button></p>
                </form>
            </div>


            {isVisibleTableScraped &&
                <div className="tableContainer" id="scrapeTable">
                    {tableData.length > 0 && (
                        <div>
                            <h2>Rezultate</h2>
                            <table>
                                <thead>
                                    <tr>
                                        <th>#</th> {/* Adaugă antetul coloanei de index */}
                                        <th>User</th>
                                        <th>Date Time</th>
                                        {/* <th>Tweet ID</th> */}
                                        <th>Text</th>
                                        {/* Adaugă aici alte coloane dorite */}
                                    </tr>
                                </thead>
                                <tbody>
                                    {tableData.map((item, index) => (
                                        <tr key={index}>
                                            <td>{index + 1}</td> {/* Adaugă valoarea de index în fiecare rând */}
                                            <td>{item.username}</td>
                                            <td>{format(new Date(item.dateTime), "yyyy-MM-dd")}</td>
                                            {/* <td>{item.tweetId}</td> */}
                                            <td>{item.text}</td>
                                            {/* Adaugă aici alte celule dorite */}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            }

            {isVisiblepreviousSearches &&
                <div id="previousSearches" >
                    <h2><br /><br />Căutări anterioare</h2>
                    <ul>
                        {previousSearches.map((search) => (
                            <li key={search.searchIndex}>
                                <label>
                                    <input
                                        type="radio"
                                        name="selectedSearch"
                                        checked={search.searchIndex === searchIndex}
                                        onChange={() => handleSelectSearch(search.searchIndex)}
                                    />
                                    Text: {search.text || "N/A"}, Username: {search.username || "N/A"}, Since: {search.since || "N/A"}, Until: {search.until || "N/A"}, Retweet: {search.retweet || "N/A"}, Replies: {search.replies || "N/A"}
                                </label>
                            </li>
                        ))}
                    </ul>
                </div>
            }

            <div id="sentimentAnalyze">

                {isVisibleSentAnButton &&
                    <p>
                        <h2><br /><br />Analiza sentimentului</h2>
                        <button className="btn btn-indigo" onClick={handleSentimentAnalysis}>Analiza sentimentului</button>
                    </p>
                }
                {isVisibleSentTable &&
                    <div className="tableContainer">
                        {sentimentData.length > 0 && (
                            <div>

                                <table>
                                    <thead>
                                        <tr>
                                            <th>#</th> {/* Adaugă antetul coloanei de index */}
                                            <th>User</th>
                                            <th>Data</th>
                                            <th>Text</th>
                                            <th>Sentiment</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {sentimentData.map((item, index) => (
                                            <tr key={index}>
                                                <td>{index + 1}</td> {/* Adaugă valoarea de index în fiecare rând */}
                                                <td>{item.searchCsv.username}</td>
                                                <td>{format(new Date(item.searchCsv.dateTime), "yyyy-MM-dd")}</td>
                                                <td>{item.searchCsv.text}</td>
                                                <td>{item.sentiment}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                }
            </div>


            <div id="Statistici">
                <h2><br /><br />Statistici</h2>

                {Object.keys(sentimentPerMonth).length > 0 && (
                    <div>
                        <h3>Evolutia sentimentului pe luni</h3>
                        <LineChart width={600} height={300} data={Object.entries(sentimentPerMonth)}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="0" reversed={true} />
                            <YAxis />
                            {/* <Tooltip formatter={(value, name, entry) => `${entry.payload[0]}: ${entry.payload[1].toFixed(3)}`} /> */}
                            {/* <Tooltip labelFormatter={(label) => `${label}:`} formatter={(value) => value.toFixed(3)} /> */}
                            <Tooltip labelFormatter={(label) => `${label}:`} formatter={(value, name) => [value.toFixed(3)]} />
                            <Legend />
                            <Line type="monotone" dataKey="1" stroke="#8884d8" name="Evolutia sentimentului pe luni" />
                        </LineChart>
                    </div>
                )}


                {Object.keys(sentimentPerMonth).length > 0 && (
                    <div>
                        <h3><br />Numarul tweet-urilor pe luni</h3>
                        <LineChart width={600} height={300} data={Object.entries(tweetsPerMonth)}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="0" reversed={true} />
                            <YAxis />
                            {/* <Tooltip formatter={(value, name, entry) => `${entry.payload[0]}: ${entry.payload[1].toFixed(3)}`} /> */}
                            {/* <Tooltip labelFormatter={(label) => `${label}:`} formatter={(value) => value.toFixed(3)} /> */}
                            <Tooltip labelFormatter={(label) => `${label}:`} formatter={(value, name) => [value.toFixed(0)]} />
                            <Legend />
                            <Line type="monotone" dataKey="1" stroke="#8884d8" name="Numarul tweet-urilor pe luni" />
                        </LineChart>
                    </div>
                )}

                <ResponsiveContainer width="100%" height={300}>
                    <PieChart width={400} height={400}>
                        <Pie
                            data={tweetData}
                            dataKey="count"
                            nameKey="sentiment"
                            cx="50%"
                            cy="50%"
                            outerRadius={100}
                            fill="#8884d8"
                            label={renderLabel}
                            labelLine={false} // Adăugați această opțiune pentru a elimina linia de conectare a etichetelor
                        >
                            {tweetData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        {/* <Tooltip /> */}
                        {/* <Legend /> */}
                    </PieChart>
                </ResponsiveContainer>
            </div>


        </div>
    );
};

export default ScrapeTweets;