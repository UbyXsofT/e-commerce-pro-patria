import {
	Discount,
	EditCalendar,
	Handshake,
	ToggleOff,
} from "@mui/icons-material";
import {
	Divider,
	Grid,
	IconButton,
	Paper,
	Typography,
	useTheme,
} from "@mui/material";

import React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";

const style = {
	// position: "absolute" as "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: 400,
	boxShadow: 12,
	p: 0.3,
};

interface LegendaIconeProps {
	isOpen: boolean;
	onClose: () => void;
}

const LegendaIcone = ({ isOpen, onClose }: LegendaIconeProps) => {
	const theme = useTheme();

	return (
		<Modal
			open={isOpen}
			onClose={onClose}
			closeAfterTransition
			BackdropComponent={Backdrop}
			BackdropProps={{
				timeout: 500,
			}}
		>
			<Fade in={isOpen}>
				<Box
					sx={{
						...style,
						position: "fixed",
						zIndex: theme.zIndex.drawer + 1,
					}}
				>
					<Paper
						elevation={2}
						style={{ height: "100%" }}
					>
						<Grid
							container
							sx={{
								display: "flex",
								flexDirection: "column",
								justifyContent: "space-between",
								alignItems: "stretch",
								padding: "16px",
							}}
						>
							<Typography variant="h6">Legenda icone</Typography>
							<Divider />
							<Grid
								sx={{
									display: "flex",
									flexDirection: "row",
									justifyContent: "flex-start",
									alignItems: "center",
									flexWrap: "nowrap",
								}}
							>
								<IconButton>
									<Handshake color="success" />
								</IconButton>
								<Typography variant="body2">
									Contiene abbonamento in convenzione
								</Typography>
							</Grid>
							<Divider
								sx={{
									marginTop: "2px",
									marginBottom: "2px",
									marginLeft: "0px",
									marginRight: "20px",
								}}
							/>
							<Grid
								sx={{
									display: "flex",
									flexDirection: "row",
									justifyContent: "flex-start",
									alignItems: "center",
									flexWrap: "nowrap",
								}}
							>
								<IconButton>
									<Discount color="error" />
								</IconButton>
								<Typography variant="body2">
									Contiene abbonamento in promozione
								</Typography>
							</Grid>
							<Divider
								sx={{
									marginTop: "2px",
									marginBottom: "2px",
									marginLeft: "0px",
									marginRight: "20px",
								}}
							/>
							<Grid
								sx={{
									display: "flex",
									flexDirection: "row",
									justifyContent: "flex-start",
									alignItems: "center",
									flexWrap: "nowrap",
								}}
							>
								<IconButton>
									<ToggleOff color="warning" />
								</IconButton>
								<Typography variant="body2">
									Contiene abbonamento sospendibile
								</Typography>
							</Grid>
							<Divider
								sx={{
									marginTop: "2px",
									marginBottom: "2px",
									marginLeft: "0px",
									marginRight: "20px",
								}}
							/>
							<Grid
								sx={{
									display: "flex",
									flexDirection: "row",
									justifyContent: "flex-start",
									alignItems: "center",
									flexWrap: "nowrap",
								}}
							>
								<IconButton>
									<EditCalendar color="info" />
								</IconButton>
								<Typography variant="body2">
									Contiene abbonamento con scelta attività ad orario
								</Typography>
							</Grid>
						</Grid>
					</Paper>
				</Box>
			</Fade>
		</Modal>
	);
};

export default LegendaIcone;

// import {
// 	Discount,
// 	EditCalendar,
// 	Handshake,
// 	ToggleOff,
// } from "@mui/icons-material";
// import { Divider, Grid, IconButton, Paper, Typography } from "@mui/material";

// import * as React from "react";
// import Backdrop from "@mui/material/Backdrop";
// import Box from "@mui/material/Box";
// import Modal from "@mui/material/Modal";
// import Fade from "@mui/material/Fade";

// const style = {
// 	position: "absolute" as "absolute",
// 	top: "50%",
// 	left: "50%",
// 	transform: "translate(-50%, -50%)",
// 	width: 400,
// 	boxShadow: 12,
// 	p: 0.3,
// };

// interface LegendaIconeProps {
// 	isOpen: boolean;
// 	onClose: () => void;
// }
// const LegendaIcone = ({ isOpen, onClose }: LegendaIconeProps) => {
// 	return (
// 		<div>
// 			<Modal
// 				open={isOpen}
// 				onClose={onClose}
// 				closeAfterTransition
// 				slots={{ backdrop: Backdrop }}
// 				slotProps={{
// 					backdrop: {
// 						timeout: 500,
// 					},
// 				}}
// 			>
// 				{/* <Fade in={open}> */}
// 				<Box sx={style}>
// 					<Paper
// 						elevation={2}
// 						style={{ height: "100%" }}
// 					>
// 						<Grid
// 							container
// 							sx={{
// 								display: "flex",
// 								flexDirection: "column",
// 								justifyContent: "space-between",
// 								alignItems: "stretch",
// 								padding: "16px",
// 							}}
// 						>
// 							<Typography variant="h6">Legenda icone</Typography>
// 							<Divider />
// 							<Grid
// 								sx={{
// 									display: "flex",
// 									flexDirection: "row",
// 									justifyContent: "flex-start",
// 									alignItems: "center",
// 									flexWrap: "nowrap",
// 								}}
// 							>
// 								<IconButton>
// 									<Handshake color="success" />
// 								</IconButton>
// 								<Typography variant="body2">
// 									Contiene abbonamento in convenzione
// 								</Typography>
// 							</Grid>
// 							<Divider
// 								sx={{
// 									marginTop: "2px",
// 									marginBottom: "2px",
// 									marginLeft: "0px",
// 									marginRight: "20px",
// 								}}
// 							/>
// 							<Grid
// 								sx={{
// 									display: "flex",
// 									flexDirection: "row",
// 									justifyContent: "flex-start",
// 									alignItems: "center",
// 									flexWrap: "nowrap",
// 								}}
// 							>
// 								<IconButton>
// 									<Discount color="error" />
// 								</IconButton>
// 								<Typography variant="body2">
// 									Contiene abbonamento in promozione
// 								</Typography>
// 							</Grid>
// 							<Divider
// 								sx={{
// 									marginTop: "2px",
// 									marginBottom: "2px",
// 									marginLeft: "0px",
// 									marginRight: "20px",
// 								}}
// 							/>
// 							<Grid
// 								sx={{
// 									display: "flex",
// 									flexDirection: "row",
// 									justifyContent: "flex-start",
// 									alignItems: "center",
// 									flexWrap: "nowrap",
// 								}}
// 							>
// 								<IconButton>
// 									<ToggleOff color="warning" />
// 								</IconButton>
// 								<Typography variant="body2">
// 									Contiene abbonamento sospendibile
// 								</Typography>
// 							</Grid>
// 							<Divider
// 								sx={{
// 									marginTop: "2px",
// 									marginBottom: "2px",
// 									marginLeft: "0px",
// 									marginRight: "20px",
// 								}}
// 							/>
// 							<Grid
// 								sx={{
// 									display: "flex",
// 									flexDirection: "row",
// 									justifyContent: "flex-start",
// 									alignItems: "center",
// 									flexWrap: "nowrap",
// 								}}
// 							>
// 								<IconButton>
// 									<EditCalendar color="info" />
// 								</IconButton>
// 								<Typography variant="body2">
// 									Contiene abbonamento con scelta attività ad orario
// 								</Typography>
// 							</Grid>
// 						</Grid>
// 					</Paper>
// 				</Box>
// 				{/* </Fade> */}
// 			</Modal>
// 		</div>
// 	);
// };

// export default LegendaIcone;
