import '../../styles/signin_and_signout.css';
import '../../styles/input.css';
import { FiLogIn } from 'react-icons/fi';
import {MdCancelScheduleSend} from 'react-icons/md';
import {BiUserPlus} from 'react-icons/bi';
import {useState} from 'react';
import axios from 'axios';
import Main_nav from '../navs/principal_navigation.jsx'
import {Link} from 'react-router-dom'
import activate_notifications from '../../helpers/notifications.js';

function Signin(){
	const [user_nit, setUser_nit] = useState("");
	const [user_password, setUser_password] = useState("");

	const validate_required_fields = async()=>{
		if(user_nit === "" || user_password === ""){
			activate_notifications(
				"All required fields",
				"Please enter all fields, both nit number and password",
				"warning"
		);
		}else{
			user_query();
		}
		setUser_password("");
		setUser_nit("");
	}

	const user_query = async ()=>{
		const user = {
			nit: user_nit,
			password: user_password 
		}
		const url = "http://192.168.1.8:4000/signin";	
		try{
			const answer = await axios.post(url, user);
			if(answer.data["message"] == "this user is correct"){	
			activate_notifications(
				"All is correct!",
				"Welcome friend: "+answer.data["name"],
				"success"
		);
				localStorage.clear();
				localStorage.setItem("token", answer.data["token"]);
				localStorage.setItem("name", answer.data["name"]);
				window.location.replace("http://192.168.1.8:3000/user/home");
			}else{
			activate_notifications(
				"Sorry but this user is incorrect",
				answer.data["message"],
				"warning"
		);
			}
		}catch(e){
			activate_notifications(
				"Sorry an error ocurred",
				e.message,
				"danger"
		);
		}
	}

	return(
		<div>
			<Main_nav />
		<div className="signin-container">
			<div className="signin-form">
				<img src="https://imgr.search.brave.com/ZRWctC7Q7wIB0_8-QtlLM6n_1fCRCneWCejuv51xfmE/fit/800/421/ce/1/aHR0cHM6Ly93d3cu/bWVyY2FkZW9pbm1v/YmlsaWFyaW8uY29t/Lmd0L3dwLWNvbnRl/bnQvdXBsb2Fkcy8y/MDIwLzAyL051ZXZv/X0xvZ29fQmFucnVy/YWwtMTAyNHg1Mzkt/MS04MDB4NDIxLnBu/Zw" alt="sorry this image is caducated" />
				<div className="input">
					<input value={user_nit} onChange={(nit)=>{setUser_nit(nit.target.value);}} type="number" placeholder=" " />
					<p>Please enter your NIT*</p> 
				</div>
				<div className="input">
					<input value={user_password} onChange={(password)=>{setUser_password(password.target.value);}} type="password" placeholder=" "/>
					<p>Please enter your password*</p>
				</div>
				<br />
				<button onClick={validate_required_fields} className="login-btn">	
					<FiLogIn className = "icon" />
					Login
				</button>
				<button className="cancel-btn">
					<MdCancelScheduleSend className = "icon" />
					Cancel
				</button>
				<h3>You don't have a user account?</h3>
				<Link to="/signup"><button className="create-btn">
					<BiUserPlus  className="icon" />
					Create account
				</button></Link>
			</div>
			<div className="slider">
				<ul>
					<li><img src="https://www.banrural.com.gt/banruralc/portals/0/Slider/Banner-Acreditame.jpg" alt="sorry this image is caducated" /></li>
					<li><img src="https://www.banrural.com.gt/banruralc/portals/0/Slider/BANNER_HAZ%20BIEN%20TUS%20CUENTAS%20NOV_.jpg" alt="sorry this image is caducated" /></li>
					<li><img src="https://www.banrural.com.gt/banruralc/portals/0/Slider/CAJA%20BANRURAL%20banner%20rotativo-01.jpg" alt="sorry this image is caducated" /></li>
					<li><img src="https://www.banrural.com.gt/banruralc/portals/0/Slider/Web_Banrural_Nueva-Weeb_717x338.jpg" alt="sorry this image is caducated" /></li>
				</ul>
			</div>
		</div>
		</div>
	)
}

export default Signin;
