import '../../styles/profile_nav.css';
import axios from 'axios';
import {Link} from 'react-router-dom';
import activate_notifications from '../../helpers/notifications.js';

function Profile_nav(){

	var state_btn = 1;

	const activate = ()=>{
		const btn = document.getElementById("btn_user");
		const menu = document.getElementById("nav_profile");
		if(state_btn==1){

			btn.classList.add("activate_user");
			menu.classList.add("expand");
			state_btn = 0;
		}else{
			btn.classList.remove("activate_user");
			menu.classList.remove("expand");
			state_btn = 1;
		}
	}

	const signout = async ()=>{
		const url = "http://192.168.1.8:4000/signout";
		try{
			const message = await axios.get(url, {headers: { Authorization: `Bearer ${localStorage.getItem('token')}`}});
			localStorage.clear();
			activate_notifications(
				"All is correct",
				message.data["message"],
				"success"
			);
			window.location.replace('http://192.168.1.8:3000');
		}catch(e){
			activate_notifications(
				"Sorry an error ocurred",
				e.message,
				"danger"
			);
		}
	}


	return(
		<header className="header-user-navigation">
			<img src="https://imgr.search.brave.com/qqwWbZHZc5XxIp-zha4gRdExqJf5Yvz35KWDNDuwhdM/fit/900/900/ce/1/aHR0cHM6Ly95dDMu/Z2dwaHQuY29tLy1m/bUFhVWhQcjhjdy9B/QUFBQUFBQUFBSS9B/QUFBQUFBQUFBQS9p/dFJCc2RTZnZWOC9z/OTAwLWMtay1uby1t/by1yai1jMHhmZmZm/ZmYvcGhvdG8uanBn" alt="sorry this image is caducated" />
			<h4 >Welcome: {localStorage.getItem("name")}</h4>
			<ul className="user-navigation-menu" id="nav_profile" >
				<Link to="/user/home"><li><a href="">Accounts</a></li></Link>
				<Link to="/user/loans"><li><a href="">Loans</a></li></Link>
				<Link to="/user/card"><li><a href="">Cards</a></li></Link>
			</ul>
			<button className="btn-signout" onClick={signout}>Sign out</button>
			<div onClick={()=>{activate();}} className="btn-menu-user" id="btn_user">
					<div className="line1"></div>
					<div className="line2"></div>
					<div className="line3"></div>
				</div>
		</header>
	)
}

export default Profile_nav;
