import { FaBars } from "react-icons/fa";
import { NavLink as Link } from "react-router-dom";
import styled from "styled-components";

export const Nav = styled.nav`
position : fixed;
top: 0;
left: 0;
right: 0;
background: #001731;
height: 85px;
display: flex;
justify-content: space-between;
// padding: 0.2rem calc((100vw - 1000px) / 2);

padding: 0.2rem 1rem;


// margin-left: calc((100vw + 200px));
// margin-left: -30px;
padding-right: 100px;
width: 100vw;
z-index: 12;
`;

export const NavLink = styled(Link)`

color: #ffffff;
display: flex;
align-items: center;
text-decoration: none;
padding: 0 1rem;
height: 100%;
cursor: pointer;
&.active {
	color: #f2b407;
}
`;

export const Bars = styled(FaBars)`
display: none;
color: #ffffff;
@media screen and (max-width: 768px) {
	display: block;
	position: absolute;
	top: 0;
	right: 0;
	transform: translate(-100%, 75%);
	font-size: 1.8rem;
	cursor: pointer;
}
`;

export const NavMenu = styled.div`

display: flex;
align-items: center;
/*margin-right: -24px;*/
/* Second Nav */
/* margin-right: 24px; */
/* Third Nav */
/* width: 100vw;
white-space: nowrap; */
// width: 100vw;
flex: 1;
white-space: nowrap;


@media screen and (max-width: 768px) {
	display: none;
}
`;
