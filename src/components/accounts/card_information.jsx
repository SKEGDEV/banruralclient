import {useEffect, useState} from 'react';
import Profile_nav from '../navs/profile_nav.jsx';
import axios from 'axios';
import {Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import activate_notifications from '../../helpers/notifications.js';


function Card_information (){
	const [card_data, setCard_data] = useState([]);
	const [modal_add, setModal_add] = useState(false);
	const [type_card, setType_card] = useState("0");

	const add_card = async()=>{
		const url="http://192.168.1.8:4000/card/add-card";
		const card = {
			card_type:type_card
		}
		try{
			if(type_card !="0"){
				const message = await axios.post(
					url,
					card,
					{headers: { Authorization: `Bearer ${localStorage.getItem('token')}`}}
		);
				activate_notifications(
					"All is correct",
					message.data["message"],
					"success"
				)
			}else{
				activate_notifications(
					"Sorry",
					"Please select a type of card to continue",
					"warning"
				)
			}
			window.location.reload();
		}catch(e){
			activate_notifications(
				"Sorry an error ocurred",
				e.message,
				"danger"
			);
		}
	}

	const get_cards = async ()=>{
		const url = "http://192.168.1.8:4000/card/get-cards-information";
		try{
			const data = await axios.get(url,{headers: { Authorization: `Bearer ${localStorage.getItem('token')}`}});
			if(data.data["message"]=="welcome this is your card information"){
				setCard_data(data.data["data"]);
				activate_notifications(
					"All is correct",
					data.data["message"],
					"success"
				);
			}else{
				setCard_data([]);
				activate_notifications(
					"Sorry",
					data.data["message"],
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

	useEffect(()=>{
		get_cards();
	},[])

	return (
		<div>
			<Profile_nav />
			<div className="bank-account-container">
					{card_data.map(data=>(
				<div className="account">
					<div className="header">
						<h4>Card number:{" "+data[1]}</h4>
						<h4>Card balance: ${data[2]}</h4>
						<h4>Card type:{" "+data[3]}</h4>
						<h4>Name:{" "+data[4]+" "+data[5]}</h4>
						<h4>NIT:{" "+data[6]}</h4>	
					</div>		
				</div>
				))}
				<div className="create-account">
					<button onClick={()=>{setModal_add(true);}}>Get a new card</button>
				</div>
			</div>
			<Modal isOpen={modal_add}>
				<ModalHeader>
					<img className="logo-modal" src="https://imgr.search.brave.com/ZRWctC7Q7wIB0_8-QtlLM6n_1fCRCneWCejuv51xfmE/fit/800/421/ce/1/aHR0cHM6Ly93d3cu/bWVyY2FkZW9pbm1v/YmlsaWFyaW8uY29t/Lmd0L3dwLWNvbnRl/bnQvdXBsb2Fkcy8y/MDIwLzAyL051ZXZv/X0xvZ29fQmFucnVy/YWwtMTAyNHg1Mzkt/MS04MDB4NDIxLnBu/Zw" alt="Sorry this image is caducated" />
				</ModalHeader>
				<ModalBody>
					<div className="input">
						<select onChange={(event)=>{setType_card(event.target.value);}} className="form-select">
							<option value="0">Please select a card type</option>
							<option value="1">Credit card</option>
							<option value="2">Debit card</option>
						</select>
					</div>
				</ModalBody>
				<ModalFooter>
					<button onClick={()=>{add_card();}} className="btn btn-success">Add card</button>
					<button onClick={()=>{setModal_add(false);}} className="btn btn-danger">Cancel</button>
				</ModalFooter>
			</Modal>
		</div>
	);
}

export default Card_information;
