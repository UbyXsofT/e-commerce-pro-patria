import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useDispatch, useSelector } from "react-redux";
import renderPrice from "src/components/utils/renderPrice";
import { Box, Button, Divider, IconButton, useMediaQuery } from "@mui/material";
import CardHeadTitle from "src/components/listino/card/CardHeadTitle";
import {
	StoreState,
	ListinoCardProps,
	itemsCard,
	ActualProduct,
} from "src/components/CommonTypesInterfaces";
import CardContentData from "src/components/listino/card/CardContentData";
import CardActionsData from "src/components/listino/card/CardActionsData";
import {
	addToCart,
	isInCart,
	removeFromCart,
} from "src/components/listino/utils/functionsCart";
import myIcons from "src/theme/IconsDefine";
import { color } from "@mui/system";
import Calendario from "src/components/utils/Calendario";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";
import dayjs from "dayjs";
import "dayjs/locale/it";
import isoWeek from "dayjs/plugin/isoWeek";
import { Dialog, DialogTitle } from "@mui/material";

//dayjs.extend(isoWeek);

const ListinoCard = ({
	itemsCard,
	setStepSelectOby,
	stepSelectOby,
}: ListinoCardProps) => {
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down("md"));

	return (
		<>
			<Card
				sx={{
					maxWidth: isMobile ? "290px" : "350px",
					width: isMobile ? "290px" : "350px",
					marginTop: "25px",
					marginBottom: "25px",
					height: "auto",
					//cursor: "pointer", // Aggiungi questa riga per cambiare il cursore quando il componente è cliccabile
				}}
				//onClick={() => callProductPage(product.codice)}
			>
				<CardHeader
					sx={{
						minheight: "70px",
						display: "flex",
						flexDirection: "column",
						justifyContent: "space-between",
						alignItems: "stretch",
						padding: "16px",
					}}
					title={<CardHeadTitle itemsCard={itemsCard} />}
				></CardHeader>

				{/* {itemsCard.tipo !== "GRUPPO" ? ( // NON E' UN GRUPPO */}
				<CardContent
					sx={{
						marginTop: "-10px",
						minHeight: "120px",
						backgroundColor: (theme) =>
							theme.palette.mode === "light" ? "#dfdfdf" : "#323232",
						display: "flex",
						flexDirection: "column",
						flexWrap: "nowrap",
						alignItems: "flex-start",
						justifyContent: "space-between",
						// margin: "10px",
					}}
				>
					<CardContentData itemsCard={itemsCard} />
				</CardContent>

				<CardActionsData
					itemsCard={itemsCard}
					setStepSelectOby={setStepSelectOby}
					stepSelectOby={stepSelectOby}
				/>
			</Card>
		</>
	);
};

export default ListinoCard;
