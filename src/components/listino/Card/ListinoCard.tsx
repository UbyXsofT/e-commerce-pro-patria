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
import {
	Box,
	Button,
	Divider,
	IconButton,
	Paper,
	Skeleton,
	useMediaQuery,
} from "@mui/material";
import CardHeadTitle from "src/components/listino/card/CardHeadTitle";
import {
	StoreState,
	ListinoCardProps,
	itemsCard,
	ActualProduct,
} from "src/components/CommonTypesInterfaces";
import CardContentData from "src/components/listino/card/CardContentData";
import CardActionsData from "src/components/listino/card/CardActionsData";

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
import { setLoading } from "src/store/actions";
import chiaveRandom from "src/components/utils/chiaveRandom";

//dayjs.extend(isoWeek);

const ListinoCard = ({
	itemsCard,
	setStepSelectOby,
	stepSelectOby,
}: ListinoCardProps) => {
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down("md"));
	const [isHovered, setIsHovered] = React.useState(false);
	const dispatch = useDispatch(); // Usa il hook useDispatch per ottenere la funzione dispatch dallo store
	const isLoadingRedux = useSelector((state: StoreState) => state.loading);
	const [isLoading, setIsLoading] = React.useState(isLoadingRedux);

	React.useEffect(() => {
		const intervalId = setInterval(() => {
			setIsLoading((prevLoading) => {
				if (prevLoading !== isLoadingRedux) {
					return isLoadingRedux;
				}
				return prevLoading;
			});
		}, 1000);

		return () => clearInterval(intervalId);
	}, [isLoadingRedux]);

	return isLoading ? (
		<Skeleton
			key={chiaveRandom()}
			variant="rounded"
			sx={{
				width: isMobile ? "290px" : "350px",
				marginTop: "25px",
				marginBottom: "25px",
				height: "350px",
			}}
		/>
	) : (
		<Paper
			elevation={isHovered ? 6 : 1} // Imposta l'elevation a 5 quando il mouse è sopra la Card, altrimenti 1
		>
			<Card
				onMouseEnter={() => setIsHovered(true)}
				onMouseLeave={() => setIsHovered(false)}
				sx={{
					maxWidth: isMobile ? "290px" : "350px",
					width: isMobile ? "290px" : "350px",
					marginTop: "25px",
					marginBottom: "25px",
					height: "auto",
					cursor: "pointer", // Cambia il cursore quando il componente è cliccabile
				}}
			>
				<CardHeader
					sx={{
						minHeight: "70px",
						display: "flex",
						flexDirection: "column",
						justifyContent: "space-between",
						alignItems: "stretch",
						padding: "16px",
					}}
					title={<CardHeadTitle itemsCard={itemsCard} />}
				/>
				<CardContent
					sx={{
						marginTop: "-10px",
						display: "flex",
						flexDirection: "column",
						flexWrap: "nowrap",
						alignItems: "flex-start",
						justifyContent: "space-between",
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
		</Paper>
	);
};

export default ListinoCard;
function dispatch(arg0: any) {
	throw new Error("Function not implemented.");
}
