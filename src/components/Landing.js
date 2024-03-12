import { Paper, Popover } from "@mui/material";
import React, { useCallback, useEffect, useRef, useState } from "react";

import { ReactComponent as Attend } from "../assets/attend.svg";
import { ReactComponent as BizCard } from "../assets/biz-card.svg";
import Box from "@mui/material/Box";
import { ReactComponent as Brand } from "../assets/brand.svg";
import { ReactComponent as Create } from "../assets/create.svg";
import { ReactComponent as Footer } from "../assets/footer.svg";
import Grid from "@mui/material/Grid";
import Loading from "./common/Loading";
import { ReactComponent as Logout } from "../assets/logout.svg";
import { ReactComponent as RSVPs } from "../assets/rsvps.svg";
import { ReactComponent as Search } from "../assets/search.svg";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const BASE_URL = process.env.REACT_APP_SERVER_BASE_URI;

const Landing = () => {
	const navigate = useNavigate();
	const [isLoggedOut, setLoggedOut] = useState(false);
	const globeRef = useRef(null);
	const [anchor, setAnchor] = useState(null); // controls popup appearing
	// console.log("cookie:", document.cookie);
	const [isLoading, setIsLoading] = useState(false);

	const [event, setEvent] = useState();
	const [user, setUser] = useState();
	const [email, setEmail] = useState();
	const [userUID, setUserUID] = useState();

	const getCookieParam = (param) => {
		if (document.cookie === "") return undefined;

		const str = document.cookie
			.split("; ")
			.find((row) => row.startsWith(param));

		if (str === undefined) return undefined;

		return str.split("=")[1];
	};

	const handleGlobeClick = (event) => {
		if (getCookieParam("loggedIn=") === "true") {
			// If logged in
			setAnchor(event.currentTarget); // Open popup
		} else {
			// If logged out
			handleLogin();
		}
	};

	const handlePopupClose = () => {
		setAnchor(null); // CLose popup
	};

	const handleLogin = () => {
		navigate("/login", {
			state: { path: "/" },
		});
	};

	const handleLogout = () => {
		document.cookie =
			"loggedIn=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
		setLoggedOut(true);
		setTimeout(() => {
			setLoggedOut(false);
		}, 1000);
		navigate("/");
	};

	const getUserDetails = async (userUID) => {
		const response = await axios.get(
			BASE_URL + `/CheckUserProfile/${userUID}`
		);
		const result = response.data.result[0];
		// console.log("result:", result);
		return result;
	};

	useEffect(() => {
		setEvent("");
		setUser(getCookieParam("user_details="));
		setEmail(getCookieParam("user_email="));
		setUserUID(getCookieParam("user_uid="));
	}, []);

	return (
		<Box display="flex" justifyContent="center" flexDirection="column">
			<Brand style={{ marginTop: "36px", marginBottom: "5rem" }} />
			<Loading isLoading={isLoading} />
			<Grid
				container
				rowSpacing={{ xs: 1, sm: 10 }}
				columnSpacing={{ xs: 1 }}
			>
				<Grid item xs={6} align="center">
					<Search
						onClick={() => {
							if (getCookieParam("loggedIn=") !== undefined) {
								getCookieParam("loggedIn=") === "true"
									? navigate("/findEvent", {
											state: {
												email: getCookieParam(
													"user_email="
												),
												user: JSON.parse(
													getCookieParam(
														"user_details="
													)
												),
												isUserLoggedIn: true,
											},
									  })
									: navigate("/findEvent", {
											state: {
												isUserLoggedIn: false,
											},
									  });
							} else {
								navigate("/findEvent", {
									state: {
										isUserLoggedIn: false,
									},
								});
							}
						}}
						style={{ cursor: "pointer" }}
					/>
				</Grid>
				<Grid item xs={6} align="center">
					<RSVPs
						onClick={() => {
							if (getCookieParam("loggedIn=") !== undefined) {
								getCookieParam("loggedIn=") === "true"
									? navigate("/currentRsvp", {
											state: {
												email: getCookieParam(
													"user_email="
												),
												user: JSON.parse(
													getCookieParam(
														"user_details="
													)
												),
											},
									  })
									: navigate("/login", {
											state: { path: "/currentRsvp" },
									  });
							} else {
								navigate("/login", {
									state: { path: "/currentRsvp" },
								});
							}
						}}
						style={{ cursor: "pointer" }}
					/>
				</Grid>
				<Grid item xs={6} align="center">
					<Attend
						onClick={() => {
							if (
								document.cookie !== "" &&
								document.cookie
									.split("; ")
									.find((row) =>
										row.startsWith("loggedIn=")
									) !== undefined
							) {
								document.cookie
									.split("; ")
									.find((row) => row.startsWith("loggedIn="))
									.split("=")[1] === "true"
									? navigate("/currentEvents", {
											state: {
												email: document.cookie
													.split("; ")
													.find((row) =>
														row.startsWith(
															"user_email="
														)
													)
													.split("=")[1],
												user: JSON.parse(
													document.cookie
														.split("; ")
														.find((row) =>
															row.startsWith(
																"user_details="
															)
														)
														.split("=")[1]
												),
												isUserLoggedIn: true,
											},
									  })
									: navigate("/currentEvents", {
											state: {
												isUserLoggedIn: false,
											},
									  });
							} else {
								navigate("/currentEvents", {
									state: {
										isUserLoggedIn: false,
									},
								});
							}
						}}
						// onClick={() => navigate("/currentEvents")}
						style={{ cursor: "pointer" }}
					/>
				</Grid>
				<Grid item xs={6} align="center">
					<Create
						onClick={() => {
							if (getCookieParam("loggedIn=") !== undefined) {
								getCookieParam("loggedIn=") === "true"
									? navigate("/createEvent", {
											state: {
												email: getCookieParam(
													"user_email="
												),
												user: JSON.parse(
													getCookieParam(
														"user_details="
													)
												),
											},
									  })
									: navigate("/login", {
											state: { path: "/createEvent" },
									  });
							} else {
								navigate("/login", {
									state: { path: "/createEvent" },
								});
							}
						}}
						style={{ cursor: "pointer" }}
					/>
				</Grid>
			</Grid>
			{isLoggedOut && (
				<p
					style={{
						alignSelf: "center",
						color: "#FFF",
						fontFamily: "Fira Sans Condensed",
						fontSize: "24px",
						fontStyle: "normal",
						fontWeight: 700,
						lineHeight: "normal",
					}}
				>
					You have logged out
				</p>
			)}
			<Footer
				style={{
					alignSelf: "center",
					position: "fixed",
					bottom: "0",
					height: "25%",
					width: "100%",
					zIndex: "auto",
					cursor: "pointer",
				}}
				ref={globeRef}
				onClick={(event) => handleGlobeClick(event)}
			/>
			<Popover
				open={Boolean(anchor)}
				anchorEl={anchor}
				onClose={() => handlePopupClose()}
				anchorOrigin={{
					vertical: "top",
					horizontal: "center",
				}}
				transformOrigin={{
					vertical: "bottom",
					horizontal: "center",
				}}
				slotProps={{
					paper: {
						sx: { background: "transparent", boxShadow: "none" },
					},
				}}
				style={{}}
			>
				<Paper
					style={{
						backgroundColor: "rgba(200, 230, 255, 1",
						padding: 10,
						borderRadius: 15,
					}}
				>
					<Grid
						container
						spacing={2}
						direction={"row"}
						justifyContent={"center"}
						alignItems={"center"}
						style={{ padding: 0 }}
					>
						<Grid item xs={6} align="center">
							<BizCard
								onClick={async () => {
									setIsLoading(true);
									const userDetails = await getUserDetails(
										userUID
									);
									navigate("/createBizCard", {
										state: {
											event: event,
											user: user,
											userDetails: userDetails,
											email: email,
											user_uid: userUID,
										},
									});
								}}
								style={{ cursor: "pointer" }}
							/>
						</Grid>
						<Grid item xs={6} align="center">
							<Logout
								onClick={() => {
									handlePopupClose();
									handleLogout();
								}}
								style={{ cursor: "pointer" }}
							/>
						</Grid>
					</Grid>
				</Paper>
			</Popover>
		</Box>
	);
};

export default Landing;
