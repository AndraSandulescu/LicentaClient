import React from "react";
import { Nav, NavLink, Bars, NavMenu } from "./NavbarElements";

const Navbar = () => {
	return (
		<>
			<Nav>
				<NavMenu>
					<NavLink to="/Home" activeStyle>
						Home
					</NavLink>
					{/* <NavLink to="/sign-up" activeStyle>
						Sign Up
					</NavLink> */}
					{/* <NavLink to="/about" activeStyle>
						About
					</NavLink> */}
					<NavLink to="/comparePoliticians" activeStyle>
						Compare Political Views
					</NavLink>
					<NavLink to="/latestNews" activeStyle>
						Latest News
					</NavLink>
					<NavLink to="/scrape-tweets" activeStyle>
						Scrape Tweets
					</NavLink>
					{/* <NavLink to="/SearchTweets" activeStyle>
						SEARCH Tweets
					</NavLink> */}
				</NavMenu>
			</Nav>
		</>
	);
};

export default Navbar;
