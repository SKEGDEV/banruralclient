import Profile_nav from '../navs/profile_nav.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../styles/profile.css';
import {useEffect, useState} from 'react';
import {Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap' 
import axios from 'axios';
import activate_notifications from '../../helpers/notifications.js';

function Accounts(){
	const [account_info, setAccount_info] = useState([]); 
	const [transactions_info, setTransactions_info] = useState([]);
	const [modal_account, setModal_account] = useState(false);
	const [modal_transaction, setModal_transaction] = useState(false);
	const [modal_see, setModal_see] = useState(false);
	const [modal_loan, setModal_loan] = useState(false);
	const [account_type, setAccount_type] = useState("0");
	const [account_out_id, setAccount_out_id] = useState("1");
	const [transaction_description, setTransaction_description] = useState("");
	const [transaction_amount, setTransaction_amount] = useState("");
	const [transaction_account_in, setTransaction_account_in] = useState("");
	const [loan_id, setLoan_id] = useState("");

	const make_loan = async ()=>{
		const url = "http://192.168.1.8:4000/loan/add-loan";
		const new_loan = {
			loan_balance:transaction_amount,
			account_id:loan_id
		}
		try{
			if(transaction_amount != ""){
			const message = await axios.post(
				url,
				new_loan,
				{headers: { Authorization: `Bearer ${localStorage.getItem('token')}`}}
		);
			activate_notifications(
				"All is correct",
				message.data["message"],
				"success"
			);
				window.location.reload();
			}else{
				activate_notifications(
					"Sorry",
					"All fields is required please enter all fields",
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

	const make_new_transaction = async()=>{
		const url="http://192.168.1.8:4000/transaction/add-transaction";
		const transaction_info = {
			description:transaction_description,
			account_out:account_out_id,
			account_in:transaction_account_in,
			ammount:transaction_amount
		}
		if(transaction_account_in != "" || transaction_amount != "" || transaction_description !=""){
		try{
			const message = await axios.post(
				url,
				transaction_info,
				{headers: { Authorization: `Bearer ${localStorage.getItem('token')}`}}
			);
			activate_notifications(
				"All is correct",
				message.data["message"],
				"success"
			);
			setModal_transaction(false);
			window.location.reload();
		}catch(e){
			activate_notifications(
				"Sorry an error ocurred",
				e.message,
				"danger"
			);
		}}
		else{
			activate_notifications(
				"Sorry",	
				"All fields is required please enter all fields",
				"warning"
			);
		}
		setTransaction_account_in("");
		setTransaction_amount("");
		setTransaction_description("");
	}

	const create_bank_account=async()=>{
		if(account_type == "0"){
			activate_notifications(
				"Sorry",
				"You dont select some type of bank account",
				"warning"
			);
		}else{
			const url="http://192.168.1.8:4000/account/add-account";
			const new_account ={
				account_type:account_type
			}
			try{
				const message = await axios.post(
					url,
					new_account,
					{headers: { Authorization: `Bearer ${localStorage.getItem('token')}`}});
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

	const get_transaction_info = async(account)=>{
		const url = "http://192.168.1.8:4000/transaction/get-transactions/"+account;
		try{
			const data = await axios.get(url,{headers: { Authorization: `Bearer ${localStorage.getItem('token')}`}});
			if(data.data["message"] == "sorry you dont make a transaction"){
				setTransactions_info([]);
				activate_notifications(
					"All is correct",
					data.data["message"],
					"success"
				)
			}else{
				setTransactions_info(data.data["data"]);
				activate_notifications(
					"All is correct",
					data.data["message"],
					"success"
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

	const get_account_info = async()=>{
		const url="http://192.168.1.8:4000/account/get-accounts";
		try{
			const data = await axios.get(url, {headers: { Authorization: `Bearer ${localStorage.getItem('token')}`}});				if(data.data["message"] == "sorry you dont have a bank account"){
				setAccount_info([]);
			}
			else{
				setAccount_info(data.data["data"]);
			}
			activate_notifications(
				"All is correct",
				data.data["message"],
				"success"
			);
		}catch(e){
			activate_notifications(
				"Sorry an error ocurred",
				e.message,
				"danger"
			);
		}
	}

	useEffect(()=>{
		get_account_info();	
	},[]);

	return (
		<div>
			<Profile_nav />
			<div className="bank-account-container">
					{	account_info.map(set_data=>(
				<div className="account">
	
					<div className="header">
						<h4>Account number:{" "+set_data[1]}</h4>	
						<h4>Account name:{" "+set_data[2]+" "+set_data[3]}</h4>	
						<h4>User NIT:{" "+set_data[4]}</h4>	
						<h4>Account balance: ${set_data[5]}</h4>	
						<h4>Loan limit: ${set_data[6]}</h4>	
						<h4>Account type: {" "+set_data[7]}</h4>	
					</div>
					<div className="footer">
						<button onClick={()=>{setLoan_id(set_data[0]);setModal_loan(true);}} >
						Make loan
						</button>
						<button onClick={()=>{setAccount_out_id(set_data[0]);setModal_transaction(true);}}>
						Make a transaction
						</button>
						<button className="btn-see" onClick={()=>{get_transaction_info(set_data[0]); setModal_see(true);}}>
						See transaction register
						</button>
					</div>
				</div>
					))}
				<div className="create-account">
					<button onClick={()=>{setModal_account(true);}} >Create new bank account</button>
				</div>
			</div>

				<Modal isOpen={modal_account}>
					<ModalHeader>
						<img className="logo-modal" src="https://imgr.search.brave.com/ZRWctC7Q7wIB0_8-QtlLM6n_1fCRCneWCejuv51xfmE/fit/800/421/ce/1/aHR0cHM6Ly93d3cu/bWVyY2FkZW9pbm1v/YmlsaWFyaW8uY29t/Lmd0L3dwLWNvbnRl/bnQvdXBsb2Fkcy8y/MDIwLzAyL051ZXZv/X0xvZ29fQmFucnVy/YWwtMTAyNHg1Mzkt/MS04MDB4NDIxLnBu/Zw" alt="sorry this image is caducated" />
					</ModalHeader>
						<ModalBody>
							<select onChange={(event)=>{setAccount_type(event.target.value);}} id="" className="form-select" name="">
								<option value="0">Please select your type bank account</option>
								<option value="1">Savings account</option>
								<option value="2">Monetary account</option>
							</select>
						</ModalBody>
							<ModalFooter>
								<button className="btn btn-success" onClick={create_bank_account}>Add new account</button>
								<button className="btn btn-danger" onClick={()=>{setModal_account(false);}} >Cancel</button>
							</ModalFooter>
				</Modal>

			<Modal isOpen={modal_transaction}>
				<ModalHeader>
					<img className="logo-modal" src="https://imgr.search.brave.com/ZRWctC7Q7wIB0_8-QtlLM6n_1fCRCneWCejuv51xfmE/fit/800/421/ce/1/aHR0cHM6Ly93d3cu/bWVyY2FkZW9pbm1v/YmlsaWFyaW8uY29t/Lmd0L3dwLWNvbnRl/bnQvdXBsb2Fkcy8y/MDIwLzAyL051ZXZv/X0xvZ29fQmFucnVy/YWwtMTAyNHg1Mzkt/MS04MDB4NDIxLnBu/Zw" alt="sorry this image is caducated" />
				</ModalHeader>
				<ModalBody>
					<div className="input">
						<input
						type="number" placeholder=" "
							onChange={(event)=>{setTransaction_account_in(event.target.value);}}
							value={transaction_account_in}
						/>
						<p>Please enter destination account</p>
					</div>
					<div className="input">
						<input type="number" placeholder=" "
							onChange={(event)=>{setTransaction_amount(event.target.value);}}
						  value={transaction_amount}/>
						<p>Please enter amount transaction</p>
					</div>
					<div className="input">
						<input type="text" placeholder=" "
							onChange={(event)=>{setTransaction_description(event.target.value);}}
						  value={transaction_description}/>
						<p>Why you do this transaction?</p>
					</div>
				</ModalBody>
				<ModalFooter>
					<button onClick={make_new_transaction} className="btn btn-success">Make transaction</button>
					<button onClick={()=>{setModal_transaction(false);}} className="btn btn-danger">Cancel</button>
				</ModalFooter>
			</Modal>

			<Modal isOpen={modal_see}>
				<ModalHeader>
					<img className="logo-modal" src="https://imgr.search.brave.com/ZRWctC7Q7wIB0_8-QtlLM6n_1fCRCneWCejuv51xfmE/fit/800/421/ce/1/aHR0cHM6Ly93d3cu/bWVyY2FkZW9pbm1v/YmlsaWFyaW8uY29t/Lmd0L3dwLWNvbnRl/bnQvdXBsb2Fkcy8y/MDIwLzAyL051ZXZv/X0xvZ29fQmFucnVy/YWwtMTAyNHg1Mzkt/MS04MDB4NDIxLnBu/Zw" alt="sorry this image is caducated" />
				</ModalHeader>
				<ModalBody>
					<div className="body  table-responsive">
						<table className="table">
							<thead className="table-dark">
								<tr>
									<td>Id</td>
									<td>Description</td>
									<td>Account out</td>
									<td>Account in</td>
									<td>Transaction balance</td>
									<td>Transaction Date</td>
								</tr>
							</thead>
							<tbody>
								{transactions_info.map(set_data_transaction=>(
								<tr>
									<td>{set_data_transaction[0]}</td>
									<td>{set_data_transaction[1]}</td>
									<td>{set_data_transaction[2]}</td>
									<td>{set_data_transaction[3]}</td>
									<td>${set_data_transaction[4]}</td>
									<td>{set_data_transaction[5]}</td>
								</tr>
								))}
							</tbody>
						</table>
					</div>
				</ModalBody>
				<ModalFooter>
					<button className="btn btn-success" onClick={()=>{setModal_see(false);}}>Close</button>
				</ModalFooter>
			</Modal>

			<Modal isOpen={modal_loan}>
				<ModalHeader>
				<img className="logo-modal" src="https://imgr.search.brave.com/ZRWctC7Q7wIB0_8-QtlLM6n_1fCRCneWCejuv51xfmE/fit/800/421/ce/1/aHR0cHM6Ly93d3cu/bWVyY2FkZW9pbm1v/YmlsaWFyaW8uY29t/Lmd0L3dwLWNvbnRl/bnQvdXBsb2Fkcy8y/MDIwLzAyL051ZXZv/X0xvZ29fQmFucnVy/YWwtMTAyNHg1Mzkt/MS04MDB4NDIxLnBu/Zw" alt="this image is caducated" />
				</ModalHeader>
				<ModalBody>
					<div className="input">
						<input
							value={transaction_amount}
							onChange={(event)=>{setTransaction_amount(event.target.value);}}
							type="number" placeholder=" " 
						/>
						<p>Please enter your loan amount</p>
					</div>
				</ModalBody>
				<ModalFooter>
					<button className="btn btn-success"
						onClick={()=>{make_loan();}}
					>
					Make loan
					</button>
					<button onClick={()=>{setModal_loan(false);}} className="btn btn-danger">
					Cancel
					</button>
				</ModalFooter>
			</Modal>
		</div>
	)
}

export default Accounts;
