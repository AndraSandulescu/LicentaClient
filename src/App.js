import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './App.css';

import Navbar from './components/Navbar';

import Home from './pages/Home';
import LatestNews from './pages/LatestNews';
import SignUp from './pages/signup';
import ComparePoliticians from './pages/comparePoliticians';
import ScrapeTweets from './pages/scrapeTweets';


//fisier doar pt rute

function App() {
	return (
		<Router>
			<Navbar />

			<Routes>
				{/* <Route exact path='/' element={<Home />} /> */}
				
				<Route  exact path="/" element={<Home />} />
				<Route  exact path="/Home" element={<Home />} />
				<Route path='/comparePoliticians' element={<ComparePoliticians />} />
				<Route path='/LatestNews' element={<LatestNews />} />
				<Route path='/sign-up' element={<SignUp />} />
				<Route path='/scrape-tweets' element={<ScrapeTweets />} />
			</Routes>
		</Router>
	);
}

export default App;
