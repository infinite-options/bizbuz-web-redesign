import {
	EmailIcon,
	EmailShareButton,
	FacebookIcon,
	FacebookShareButton,
	LinkedinIcon,
	LinkedinShareButton,
	TwitterIcon,
	TwitterShareButton,
	WhatsappIcon,
	WhatsappShareButton,
} from "react-share";

import React from "react";
import { Stack } from "@mui/material";
import EmailModal from "./EmailModal";
import { useState } from "react";
import axios from "axios";

// const BASE_URL = process.env.REACT_APP_SERVER_BASE_URI;
const BASE_URL = process.env.REACT_APP_SERVER_LOCAL;


const ShareButtons = ({ registrationCode, ...props }) => {
	
		const [openModal, setOpenModal] = useState(false);
	  	const [emailList, setEmailList] = useState([]);
		const handleOpenModal = () => {
		  setOpenModal(true);
		};
	  
		const handleCloseModal = () => {
		  setOpenModal(false);
		};
	  
		const handleShareEmail = (emailIds) => {
		  // Handle sharing emails here
		  console.log("Email IDs:", emailIds);
		  let list = emailList;
		  list.push(emailIds);
		  setEmailList(list)
		  // Close the modal
		//   handleCloseModal();
		}
	
		const handleSend =(list)=>{
			let payload = {}

			// payload["emailId"] = emailList;
			payload["emailId"] = list;
			payload["registrationCode"] = registrationCode; 
			axios.post(BASE_URL + "/broadCastEmail", payload).then((response) => {

				console.log("response")
			})	
		}
	
	
	
	
	
	return (
	<Stack {...props}>
		<Stack
			direction="row"
			spacing={2}
			sx={{
				justifyContent: "center",
				alignItems: "center",
			}}
		>
			<EmailShareButton
				url="https://bizbuz.design/findEvent"
				subject="You're invited to my bizbuz Event!"
				body={"Registration Code: " + registrationCode}
				separator={"\n"}
				onClick={handleOpenModal}
			>
				<EmailIcon />
			</EmailShareButton>
			<FacebookShareButton
				url="https://bizbuz.design/findEvent"
				hashtag={"bizbuzEvents"}
			>
				<FacebookIcon />
			</FacebookShareButton>
			<LinkedinShareButton
				url="https://bizbuz.design/findEvent"
				title={
					"You're invited to my bizbuz Event!\nRegistration Code: " +
					registrationCode
				}
				source="bizbuzEvents"
			>
				<LinkedinIcon />
			</LinkedinShareButton>
			<TwitterShareButton
				url="https://bizbuz.design/findEvent"
				title={
					"You're invited to my bizbuz Event!\nRegistration Code: " +
					registrationCode
				}
				hashtags={["bizbuzEvents"]}
			>
				<TwitterIcon />
			</TwitterShareButton>
			<WhatsappShareButton
				url="https://bizbuz.design/findEvent"
				title={
					"You're invited to my bizbuz Event!\nRegistration Code: " +
					registrationCode
				}
				separator={"\n"}
			>
				<WhatsappIcon />
			</WhatsappShareButton>
		</Stack>

		<EmailModal
        open={openModal}
        onClose={handleCloseModal}
        onShare={handleShareEmail}
		onSend={handleSend}
      />
	</Stack>
)};

export default ShareButtons;
