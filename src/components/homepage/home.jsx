import Main_nav from '../navs/principal_navigation.jsx';
import '../../styles/home.css'

function Home(){
	return (
		<div>
			<Main_nav />
			<div className="home-container">
				<div className="home-content">
					<div className="bar">
						<img src="https://imgr.search.brave.com/qqwWbZHZc5XxIp-zha4gRdExqJf5Yvz35KWDNDuwhdM/fit/900/900/ce/1/aHR0cHM6Ly95dDMu/Z2dwaHQuY29tLy1m/bUFhVWhQcjhjdy9B/QUFBQUFBQUFBSS9B/QUFBQUFBQUFBQS9p/dFJCc2RTZnZWOC9z/OTAwLWMtay1uby1t/by1yai1jMHhmZmZm/ZmYvcGhvdG8uanBn" alt="" />
					</div>
					<h1>WELCOME BANRURAL FRIEND</h1>
					<p>
						Welcome, in this application you can do:<br/>
						-transaction account to account <br />
						-loan in two steps<br/>
						-get your credit or debit card <br />
						-you can make the payment of your loan <br/>
						<br />
						<br />
						we hope you find what you need!!
					</p>
				</div>
				<div className="home-video">
					<div className="bar">
						<img src="https://imgr.search.brave.com/qqwWbZHZc5XxIp-zha4gRdExqJf5Yvz35KWDNDuwhdM/fit/900/900/ce/1/aHR0cHM6Ly95dDMu/Z2dwaHQuY29tLy1m/bUFhVWhQcjhjdy9B/QUFBQUFBQUFBSS9B/QUFBQUFBQUFBQS9p/dFJCc2RTZnZWOC9z/OTAwLWMtay1uby1t/by1yai1jMHhmZmZm/ZmYvcGhvdG8uanBn" alt="" />
					</div>
					<h1>Do you need help to do a transfer on your phone application?<br />
						see this video with a example <br />
					</h1>
					<iframe width="660" height="415" src="https://www.youtube.com/embed/0dD7iNma1_c" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
					<h1>Do you need more videos to help you?
						<br />
						follow us on our youtube channel link in the bottom
					</h1>
				</div>
			</div>
		</div>
	)
}

export default Home;
