import React, { useState } from "react";
import './scrapeTweets.css';

import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";

const ScrapeTweets = () => {
    //formular cautare
    const [text, setText] = useState("");
    const [username, setUsername] = useState("");
    const [since, setSince] = useState(null);
    const [until, setUntil] = useState(null);
    const [retweet, setRetweet] = useState("");
    const [replies, setReplies] = useState("");
    const [count, setCount] = useState(-1);

    //cautari anterioare si index
    const [searchIndex, setSearchIndex] = useState(null); // Adăugată stare pentru indexul căutării
    const [previousSearches, setPreviousSearches] = useState([]); // Adăugată stare pentru lista de căutări anterioare

    //tabel cautare curenta
    const [tableData, setTableData] = useState([]);
    //tabel analiza sentiment
    const [sentimentData, setSentimentData] = useState([]);




    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
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
        } catch (error) {
            console.error(error);
        }
    };

    const handleSentimentAnalysis = async () => {
        let selectedIndex = searchIndex;
        if (selectedIndex === null && previousSearches.length > 0) {
            selectedIndex = previousSearches[previousSearches.length - 1].searchIndex;
        }

        if (selectedIndex !== null) {
            try {
                console.log(selectedIndex);
                const response = await axios.get("https://localhost:7112/api/Search/ModelScript", {
                    params: {
                        index: selectedIndex,
                    },
                });

                console.log(response.data);
                setSentimentData(response.data); // Actualizați starea cu rezultatele analizei sentimentului
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

    return (
        <div>
            <h1>Scrape Tweets</h1>
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
                    />

                    <label htmlFor="until">Until:</label>
                    <DatePicker
                        id="until"
                        selected={until}
                        onChange={(date) => setUntil(date)}
                        placeholderText="Until"
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


            {tableData.length > 0 && (
                <div>
                    <h2>Rezultate</h2>
                    <table>
                        <thead>
                            <tr>
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
                                    <td>{item.username}</td>
                                    <td>{item.dateTime}</td>
                                    {/* <td>{item.tweetId}</td> */}
                                    <td>{item.text}</td>
                                    {/* Adaugă aici alte celule dorite */}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}




            <h2>Căutări anterioare</h2>
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




            {sentimentData.length > 0 && (
                <div>
                    <h2>Analiza sentimentului</h2>
                    <p>
                        <button className="btn btn-indigo" onClick={handleSentimentAnalysis}>Analiza sentimentului</button>
                    </p>
                    <table>
                        <thead>
                            <tr>
                                <th>User</th>
                                <th>Date Time</th>
                                <th>Text</th>
                                <th>Sentiment</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sentimentData.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.username}</td>
                                    <td>{item.dateTime}</td>
                                    <td>{item.text}</td>
                                    <td>{item.sentiment}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}


        </div>
    );
};

export default ScrapeTweets;