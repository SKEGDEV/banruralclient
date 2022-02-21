import Main_nav from '../navs/principal_navigation.jsx';
import '../../styles/signin_and_signout.css'
import '../../styles/input.css'
import { FiLogIn } from 'react-icons/fi';
import {MdCancelScheduleSend} from 'react-icons/md';
import {BiUserPlus} from 'react-icons/bi';
import {Link} from 'react-router-dom';
import {useState} from 'react';
import axios from 'axios';
import activate_notifications from '../../helpers/notifications.js';

function Signup(){
	const [first_name, setFirst_name] = useState("");
	const [last_name, setLast_name] = useState("");
	const [dpi_number, setDpi_number] = useState("");
	const [nit_number, setNit_number] = useState("");
	const [password, setPassword] = useState("");
	const [confirm_password, setConfirm_password] = useState("");

	const validate_fields = ()=>{
		if(first_name === "" || last_name === "" || dpi_number === "" ||
		   nit_number === "" || password ==="" || confirm_password === ""){
			activate_notifications(
				"All required fields",
				"Please enter all fields",
				"warning"
			);
		}else if(password != confirm_password){
			activate_notifications(
				"Password don't match",
				"Sorry passwords don't match",
				"warning"
			);
		}
		else{
			create_user();
		}
		setFirst_name("");
		setLast_name("");
		setDpi_number("");
		setNit_number("");
		setPassword("");
		setConfirm_password("");
	}

	const create_user = async ()=>{
		const new_user={
			first_name:first_name,
			last_name: last_name,
			dpi : dpi_number,
			nit:nit_number,
			password:password
		}
		const url = "http://192.168.1.8:4000/signup"
		try{
			const message = await axios.post(url, new_user);
			if(message.data["message"] == "this user is correct"){
				activate_notifications(
					"All is correct",
					"Welcome new friend: "+message.data["first_name"],
					"success"
				);
				localStorage.clear();
				localStorage.setItem("token", message.data["token"]);
				localStorage.setItem("name", message.data["first_name"]);
				window.location.replace("http://192.168.1.8:3000/user/home");
			}
			else{
				activate_notifications(
					"Sorry an error ocurred",
					"error: "+message.data["message"],
					"danger"
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

	return (
		<div>
			<Main_nav />
		<div className="signup-container">
			<div className="signin-form">
				<img src="https://imgr.search.brave.com/ZRWctC7Q7wIB0_8-QtlLM6n_1fCRCneWCejuv51xfmE/fit/800/421/ce/1/aHR0cHM6Ly93d3cu/bWVyY2FkZW9pbm1v/YmlsaWFyaW8uY29t/Lmd0L3dwLWNvbnRl/bnQvdXBsb2Fkcy8y/MDIwLzAyL051ZXZv/X0xvZ29fQmFucnVy/YWwtMTAyNHg1Mzkt/MS04MDB4NDIxLnBu/Zw" alt="sorry this image is caducated" />
	<div className="inputs">
				<div className="input">
					<input value={first_name} onChange={(event)=>{setFirst_name(event.target.value);}} type="text" placeholder=" " />
					<p>Please enter your first name*</p> 
				</div>
			
				<div className="input">
					<input value={last_name} onChange={(event)=>{setLast_name(event.target.value);}} type="text" placeholder=" "/>
					<p>Please enter your last name*</p>
				</div>
				<div className="input">
					<input value={dpi_number} onChange={(event)=>{setDpi_number(event.target.value);}} type="number" placeholder=" "/>
					<p>Please enter your DPI number*</p>
				</div>
				<div className="input">
					<input value={nit_number} onChange={(event)=>{setNit_number(event.target.value);}} type="number" placeholder=" "/>
					<p>Please enter your NIT number*</p>
				</div>
				<div className="input">
					<input value={password} onChange={(event)=>{setPassword(event.target.value);}} type="password" placeholder=" "/>
					<p>Please enter your password*</p>
				</div>
				<div className="input">
					<input value={confirm_password} onChange={(event)=>{setConfirm_password(event.target.value);}} type="password" placeholder=" "/>
					<p>Please confirm your password*</p>
				</div>
				</div>
				<br />
				<button onClick={validate_fields}  className="create">	
					<BiUserPlus  className="icon" />	
					Create account
				</button>
				<button className="cancel-btn">
					<MdCancelScheduleSend className = "icon" />
					Cancel
				</button>
				<h3>You do have a user account?</h3>

				<Link to="/signin"><button className="create-btn">
					<FiLogIn className = "icon" />
					Login
				</button></Link>
			</div>
			<div className="slider-signup">
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

export default Signup;
