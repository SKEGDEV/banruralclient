import {store} from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import 'animate.css'

function activate_notifications(title, message, type){
			store.addNotification({
				title: title,
				message: message,
				type: type,
				container: "bottom-right",
				insert:"top",
				animationIn:["animate__animated", "animate__lightSpeedInLeft"],
				animationOut:["animate__animated", "animate__lightSpeedOutLeft"],
				dismiss:{
					duration: 3000,
					showIcon: true,
					pauseOnHover: true
				},
				width:300
			});
}

export default activate_notifications;
