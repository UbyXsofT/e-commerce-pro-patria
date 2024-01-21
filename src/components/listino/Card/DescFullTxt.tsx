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
import FormatString from "src/components/utils/FormatString";

const style = {
	// position: "absolute" as "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: 400,
	boxShadow: 12,
	p: 0.3,
};

interface DescFullTxtProps {
	isOpen: boolean;
	onClose: () => void;
	fullTxt: string;
}

const DescFullTxt = ({ isOpen, onClose, fullTxt }: DescFullTxtProps) => {
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
							<Typography variant="h6">Descrizione</Typography>
							<Divider />
							<Typography variant="body2">
								<FormatString descrizione={fullTxt} />
							</Typography>
						</Grid>
					</Paper>
				</Box>
			</Fade>
		</Modal>
	);
};

export default DescFullTxt;
