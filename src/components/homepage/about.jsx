import Main_nav from '../navs/principal_navigation.jsx';
import '../../styles/about.css'


function About(){
	return(
		<div>
			<Main_nav />
			<div className="about-content">
					<div className="bar">
						<img src="https://imgr.search.brave.com/qqwWbZHZc5XxIp-zha4gRdExqJf5Yvz35KWDNDuwhdM/fit/900/900/ce/1/aHR0cHM6Ly95dDMu/Z2dwaHQuY29tLy1m/bUFhVWhQcjhjdy9B/QUFBQUFBQUFBSS9B/QUFBQUFBQUFBQS9p/dFJCc2RTZnZWOC9z/OTAwLWMtay1uby1t/by1yai1jMHhmZmZm/ZmYvcGhvdG8uanBn" alt="sorry this photo caducated" />
					</div>
				<h1>About us</h1>
				<p>
Banco de Desarrollo Rural SA (BANRURAL) is a regulated bank that provides funds for the rural and micro-enterprise sector in Guatemala. The bank was founded in Guatemala in 1997 as a development bank, with a special emphasis on micro, small and medium entrepreneurs who were unable to obtain financing in traditional banking.
					<br/>
					<br/>
Nowadays BANRURAL is a large and established bank in Guatemala with about 1,700,000 clients. The bank offers a diverse range of financial services to the less privileged. To reach its clients, BANRURAL chooses to install many of its offices close to pharmacies, parks or commercial centres in order to optimize its accessibility. This ties in with its primary goal: to promote the economic and social development of the rural areas of the country.
					<br/>
					<br/>
Given its ownership structure, BANRURAL is legally obligated to have a minimum percentage of shares owned by indigenous groups such as Mayans, Garifunas and Xincas to enable them to improve their economic development and independence. This is an important feature that distinguishes BANRURAL from other banks.
					<br/>
					<br/>
Banco de Desarrollo Rural SA has been an Oikocredit partner since 2005.
					<br />
					<br/>
This document was produced by Oikocredit, Ecumenical Development Cooperative Society U.A. (Oikocredit International) with the greatest of care and to the
best of its knowledge and belief at the time of writing. Oikocredit International provides no guarantee with regard to its content and completeness and does not
accept any liability for losses which might arise from making use of this information.
				</p>
			</div>
		</div>
	)
}

export default About;
