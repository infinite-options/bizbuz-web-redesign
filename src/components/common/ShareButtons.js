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

const ShareButtons = ({ registrationCode, ...props }) => (
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
	</Stack>
);

export default ShareButtons;
