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

import myIcons from "src/theme/IconsDefine";

const style = {
	// position: "absolute" as "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: 350,
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
								<IconButton>{myIcons.ConvIcon}</IconButton>
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
								<IconButton>{myIcons.PromoIcon}</IconButton>
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
								<IconButton>{myIcons.SospIcon}</IconButton>
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
								<IconButton>{myIcons.OrarioAtvIcon}</IconButton>
								<Typography variant="body2">
									Contiene abbonamento con scelta attività ad orario
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
								<IconButton>{myIcons.GruppoIcon}</IconButton>
								<Typography variant="body2">Identifica un gruppo</Typography>
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
								<IconButton>{myIcons.SedeIcon}</IconButton>
								<Typography variant="body2">Identifica una sede</Typography>
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
								<IconButton>{myIcons.AreaIcon}</IconButton>
								<Typography variant="body2">Identifica un area</Typography>
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
								<IconButton>{myIcons.AbbIcon}</IconButton>
								<Typography variant="body2">
									Identifica un abbonamento
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
