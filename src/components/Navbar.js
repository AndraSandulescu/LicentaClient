import React from "react";
import { Nav, NavLink, NavMenu }
	from "./NavbarElements";

const Navbar = () => {
	return (
		<>
			<Nav>
				<NavMenu>
					<NavLink to="/about" activeStyle>
						About
					</NavLink>
					<NavLink to="/comparePoliticians" activeStyle>
						Compare Political Views
					</NavLink>
					<NavLink to="/latestNews" activeStyle>
						Latest News
					</NavLink>
					<NavLink to="/sign-up" activeStyle>
						Sign Up
					</NavLink>
					<NavLink to="/scrape-tweets" activeStyle>
						Scrape Tweets
					</NavLink>
				</NavMenu>
			</Nav>
		</>
	);
};

export default Navbar;
