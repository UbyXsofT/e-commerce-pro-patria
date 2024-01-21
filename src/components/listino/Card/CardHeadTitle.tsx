import { Divider, IconButton, Tooltip, Typography } from "@mui/material";
import { itemsCard } from "src/components/CommonTypesInterfaces";
import myIcons from "src/theme/IconsDefine";
import React from "react";

interface CardHeadTitleProps {
	itemsCard: itemsCard;
}

const CardHeadTitle = ({ itemsCard }: CardHeadTitleProps) => {
	//console.log("@@@ CardHeadTitle ---> itemsCard: ", itemsCard);
	return (
		<div>
			<div style={{ display: "flex", alignItems: "center" }}>
				{itemsCard.tipo === "GRUPPO" &&
					React.cloneElement(myIcons.GruppoIcon, { fontSize: "large" })}
				{itemsCard.tipo === "SEDE" &&
					React.cloneElement(myIcons.SedeIcon, { fontSize: "large" })}
				{itemsCard.tipo === "AREA" &&
					React.cloneElement(myIcons.AreaIcon, { fontSize: "large" })}
				{itemsCard.tipo === "ABBONAMENTO" &&
					React.cloneElement(myIcons.AbbIcon, { fontSize: "large" })}

				<div style={{ marginLeft: "8px" }}>{itemsCard?.descrizione}</div>
			</div>

			<Divider />
			<div
				style={{
					display: "flex",
					flexDirection: "row",
					justifyContent: "flex-end",
					alignItems: "center",
					height: "40px",
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
							{React.cloneElement(myIcons.ConvIcon, { fontSize: "medium" })}
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
							{React.cloneElement(myIcons.PromoIcon, { fontSize: "medium" })}
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
							{React.cloneElement(myIcons.SospIcon, { fontSize: "medium" })}
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
							{React.cloneElement(myIcons.OrarioAtvIcon, {
								fontSize: "medium",
							})}
						</IconButton>
					</Tooltip>
				) : (
					<></> //CONTIENE ABBONAMENTO SENZA SCELTA ATTIVITA' AD ORARIO
				)}
			</div>
		</div>
	);
};

export default CardHeadTitle;
