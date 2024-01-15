import StorefrontIcon from "@mui/icons-material/Storefront";
import ToggleOff from "@mui/icons-material/ToggleOff";
import { Divider, IconButton, Tooltip, Typography } from "@mui/material";
import {
	Discount,
	EditCalendar,
	Handshake,
	AutoAwesomeMosaic,
	MotionPhotosAuto,
	Groups,
	Place,
} from "@mui/icons-material";

interface CardHeadTitleProps {
	itemsCard: any;
}

const CardHeadTitle = ({ itemsCard }: CardHeadTitleProps) => {
	//console.log("@@@ CardHeadTitle ---> itemsCard: ", itemsCard);
	return (
		<div>
			<div style={{ display: "flex", alignItems: "center" }}>
				{itemsCard.tipo === "GRUPPO" && <Groups color="success" />}
				{itemsCard.tipo === "SEDE" && <Place color="warning" />}
				{itemsCard.tipo === "AREA" && <AutoAwesomeMosaic color="error" />}
				{itemsCard.tipo === "ABBONAMENTO" && <MotionPhotosAuto color="info" />}

				<div style={{ marginLeft: "8px" }}>{itemsCard?.descrizione}</div>
			</div>

			<Divider />
			<div
				style={{
					display: "flex",
					flexDirection: "row",
					justifyContent: "flex-end",
					alignItems: "center",
					// borderTop: "#454545 1px solid",
					// marginTop: "10px",
				}}
			>
				{itemsCard?.aConvenzioni ? ( //CONVENZIONE
					<Tooltip
						title={
							<span style={{ display: "flex", flexDirection: "column" }}>
								<Typography
									textAlign="center"
									variant="subtitle2"
								>
									Contiene abbonamento in convenzione
								</Typography>
							</span>
						}
					>
						<IconButton>
							<Handshake color="success" />
						</IconButton>
					</Tooltip>
				) : (
					//NESSUNA promo
					<></>
				)}

				{itemsCard?.aPromozioni ? ( //PROMOZIONE
					<Tooltip
						title={
							<span style={{ display: "flex", flexDirection: "column" }}>
								<Typography
									textAlign={"center"}
									variant="subtitle2"
								>
									Contiene abbonamento in promozione
								</Typography>
							</span>
						}
					>
						<IconButton>
							<Discount color="error" />
						</IconButton>
					</Tooltip>
				) : (
					//NESSUNA OFFERTA
					<></>
				)}

				{itemsCard?.aSospensioni ? ( //CONTIENE ABBONAMENTO SOSPENDIBILE
					<Tooltip
						title={
							<span style={{ display: "flex", flexDirection: "column" }}>
								<Typography
									textAlign={"center"}
									variant="subtitle2"
								>
									Contiene abbonamento sospendibile
								</Typography>
							</span>
						}
					>
						<IconButton>
							<ToggleOff color="warning" />
						</IconButton>
					</Tooltip>
				) : (
					<></> //CONTIENE ABBONAMENTO NON SOSPENDIBILE
				)}

				{itemsCard?.aSceltaOrario ? ( //CONTIENE ABBONAMENTO CON SCELTA ATTIVITA' AD ORARIO
					<Tooltip
						title={
							<span style={{ display: "flex", flexDirection: "column" }}>
								<Typography
									textAlign={"center"}
									variant="subtitle2"
								>
									Contiene abbonamento con scelta attività ad orario
								</Typography>
							</span>
						}
					>
						<IconButton>
							<EditCalendar color="info" />
						</IconButton>
					</Tooltip>
				) : (
					<></> //CONTIENE ABBONAMENTO SENZA SCELTA ATTIVITA' AD ORARIO
				)}
				{/* Altre icone... */}
			</div>
		</div>
	);
};

export default CardHeadTitle;
