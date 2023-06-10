// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;


import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages';
import About from './pages/about';
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
				<Route exact path='/' exact element={<Home />} />
				<Route path='/about' element={<About />} />
				<Route path='/comparePoliticians' element={<ComparePoliticians />} />
				<Route path='/LatestNews' element={<LatestNews />} />
				<Route path='/sign-up' element={<SignUp />} />
				<Route path='/scrape-tweets' element={<ScrapeTweets />} />
			</Routes>
		</Router>
	);
}

export default App;
