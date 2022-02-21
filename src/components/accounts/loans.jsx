import {useEffect, useState} from 'react';
import Profile_nav from '../navs/profile_nav.jsx'; 
import activate_notifications from '../../helpers/notifications.js';
import axios from 'axios';
import {Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import '../../styles/loans.css';

function Loans(){

	const [loans, setLoans] = useState([]);
	const [payments, setPayments] = useState([]);
	const [id_loan, setId_loan] = useState("");
	const [id_type, setId_type] = useState("0");
	const [modal_pay, setModal_pay] = useState(false);

	const pay_coute = async ()=>{
		if(id_type == "0"){
			activate_notifications(
				"Sorry",
				"Please select a payment type",
				"warning"
			);
		}else{
			const url="http://192.168.1.8:4000/loan/make-payment";
			const payment = {
				type_payment:id_type,
				id_loan:id_loan
			};
			try{
				const message = await axios.post(
					url,
					payment,
					{headers: { Authorization: `Bearer ${localStorage.getItem('token')}`}}
				);
				activate_notifications(
					"All is correct",
					message.data["message"],
					"success"
				);
				window.location.reload();
			}catch(e){
				activate_notifications(
					"Sorry an error ocurred",
					e.message,
					"danger"
				);
			}
		}
	}

	const get_loans = async ()=>{
		const url = "http://192.168.1.8:4000/loan/get-loan-information";
		try{
			const data = await axios.get(url,{headers: { Authorization: `Bearer ${localStorage.getItem('token')}`}});
			if(data.data["message"] == "this is data of loans"){
				setLoans(data.data["data"]);
				activate_notifications(
					"All is correct",
					data.data["message"],
					"success"
				);
			}else{
				setLoans([]);
				activate_notifications(
					"Sorry",
					"You dont have a loan, if you needed money please make a loan on accounts",
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
	
	const get_payments = async()=>{
		const url = "http://192.168.1.8:4000/loan/get-payments";
		try{
			const data = await axios.get(url, {headers: { Authorization: `Bearer ${localStorage.getItem('token')}`}});
			if(data.data["message"] == "this is information of your payments"){
				setPayments(data.data["data"]);
				activate_notifications(
					"All is correct",
					data.data["message"],
					"success"
				);
			}else{
				setPayments([]);
				activate_notifications(
					"Sorry",
					"you dont have a payment of loans please verify your payment date",
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
		get_loans();
		get_payments();
	},[])

	return(
		<div>
			<Profile_nav />
			<div className="bank-account-container">
				<div className="table-information table-responsive">
					<table className="table">
						<thead className="table-dark">
							<tr>
								<th>Loans Register</th>
							</tr>
						</thead>
						<tbody>
							<tr className="table-dark">
								<td>Loan Balance</td>
								<td>Loan cuote</td>
								<td>Next payment date</td>
								<td>First name</td>
								<td>Last name</td>
								<td>NIT number</td>
								<td></td>
							</tr>
							{loans.map(set_data=>(
							<tr>
								<td>${set_data[0]}</td>
								<td>${set_data[1]}</td>
								<td>{set_data[2]}</td>
								<td>{set_data[3]}</td>
								<td>{set_data[4]}</td>
								<td>{set_data[5]}</td>
								<td>
									<div className="create-account">
										<button
											onClick={()=>{setId_loan(set_data[6]); setModal_pay(true);}}

										>pay cuote</button>
									</div>
								</td>
							</tr>
							))}
						</tbody>
					</table>
				</div>
				<div className="table-information table-responsive">
					<table className="table">
						<thead className="table-dark">
							<tr>
								<th>Payment register</th>
							</tr>
						</thead>
						<tbody>
							<tr className="table-dark">
								<td>First name</td>
								<td>DPI number</td>
								<td>Payment date</td>
								<td>Payment type</td>
							</tr>
							{payments.map(set_data=>(
							<tr >
								<td>{set_data[0]}</td>
								<td>{set_data[1]}</td>
								<td>{set_data[2]}</td>
								<td>{set_data[3]}</td>
							</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
			<Modal isOpen={modal_pay}>
				<ModalHeader>
				<img className="logo-modal" src="https://imgr.search.brave.com/ZRWctC7Q7wIB0_8-QtlLM6n_1fCRCneWCejuv51xfmE/fit/800/421/ce/1/aHR0cHM6Ly93d3cu/bWVyY2FkZW9pbm1v/YmlsaWFyaW8uY29t/Lmd0L3dwLWNvbnRl/bnQvdXBsb2Fkcy8y/MDIwLzAyL051ZXZv/X0xvZ29fQmFucnVy/YWwtMTAyNHg1Mzkt/MS04MDB4NDIxLnBu/Zw" alt="sorry this imgage is caducated" />
				</ModalHeader>
				<ModalBody>
					<select onChange={(event)=>{setId_type(event.target.value);}} className="form-select">
						<option value="0">Please select your payment method</option>
						<option value="1">Credit card</option>
						<option value="2">Debit card</option>
						<option value="3">Savings account</option>
						<option value="4">Monetary account</option>
					</select>
				</ModalBody>
				<ModalFooter>
					<button onClick={()=>{pay_coute();}} className="btn btn-success">Make payment</button>
					<button onClick={()=>{setModal_pay(false);}} className="btn btn-danger">Cancel</button>
				</ModalFooter>
			</Modal>
		</div>
	);
}

export default Loans;
