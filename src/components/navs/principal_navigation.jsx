import '../../styles/nav.css';
import {Link} from 'react-router-dom';


function Main_nav(){
		var change = 1;

	const activate = ()=>{
		const btn = document.getElementById("btn");
		const menu = document.getElementById("menu");
		if(change != 0){
			btn.classList.add("activate_btn");
			menu.classList.add("activate-menu");
			change = 0;
		}else{
			btn.classList.remove("activate_btn");
			menu.classList.remove("activate-menu")
			change = 1;
		}
	}

	return(
		<header id="nav">
			<img id="header_background" src="https://www.banrural.com.gt/banruralc/Portals/_default/Skins/banrural/images/header.jpg" />
			<div  className="container" id="menu">

			<ul className="menu">
				<Link to="/"><li><a href="">Home</a></li></Link>
				<Link to="/about"><li><a href="">About us</a></li></Link>
				<Link to="/mision-vision"><li><a href="">Mision and Vision</a></li></Link>
				<div className="logged">
					<Link to="/signin"><li ><a href="">Signin</a></li></Link>
					<Link to="/signup"><li ><a href="">Signup</a></li></Link>
				</div>
			</ul>
			</div>
			<div className="orange_line"></div>
				<div onClick={()=>{activate();}} className="btn-menu" id="btn">
					<div className="line1"></div>
					<div className="line2"></div>
					<div className="line3"></div>
				</div>
		</header>
	);
}

export default Main_nav;
