import {
	BsYoutube, 
	BsFacebook,
	BsTwitter,
	BsInstagram
} from 'react-icons/bs';
import {RiWhatsappFill} from 'react-icons/ri';
import '../styles/footer.css';

function Footer(){
	return(
		<footer>	
			<div className="footer-orange-line"></div>
			<div className="footer-container">
				<div className="content">
					<h4>Follow us in:</h4>
					<a href="https://www.facebook.com/BanruralGuate/" target="_blank">	<BsFacebook className="icon"/></a>
					<a href="https://www.instagram.com/banruralgt" target="_blank">	<BsInstagram className="icon"/></a>
					<a href="https://twitter.com/banruralgt" target="_blank">	<BsTwitter className="icon" /></a>
					<a href="https://www.youtube.com/user/gfbanrural" target="_blank">	<BsYoutube className="icon" /></a>
					<a href="https://api.whatsapp.com/send?phone=50223083000&text=Gracias%20por%20contactarnos" target="_blank">	<RiWhatsappFill className="icon" /></a>
				</div>
				<img src="https://imgr.search.brave.com/qqwWbZHZc5XxIp-zha4gRdExqJf5Yvz35KWDNDuwhdM/fit/900/900/ce/1/aHR0cHM6Ly95dDMu/Z2dwaHQuY29tLy1m/bUFhVWhQcjhjdy9B/QUFBQUFBQUFBSS9B/QUFBQUFBQUFBQS9p/dFJCc2RTZnZWOC9z/OTAwLWMtay1uby1t/by1yai1jMHhmZmZm/ZmYvcGhvdG8uanBn" />
			</div>
		</footer>
	)
}

export default Footer;
