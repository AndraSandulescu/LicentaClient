import React from "react";
// import { Nav, NavLink, Bars, NavMenu } from "./NavbarElements";
import '../pages/centralizedStyling.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

const Navigation = () => {
	return (
		<Navbar expand="lg" className="navigationBar">
			<Container>
				<Navbar.Brand href="Home"><div className="logo">PolitiMood</div></Navbar.Brand>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
						<Nav.Link href="Home">Home</Nav.Link>
						<Nav.Link href="latestNews">Latest News</Nav.Link>
						<Nav.Link href="comparePoliticians">Compare Politicians</Nav.Link>
						<Nav.Link href="scrape-tweets">Scrape Tweets</Nav.Link>

				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
};

export default Navigation;
