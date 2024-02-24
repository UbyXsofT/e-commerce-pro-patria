import {
	AutoAwesomeMosaic,
	Discount,
	EditCalendar,
	Groups,
	Handshake,
	MotionPhotosAuto,
	Place,
	ToggleOff,
	ShoppingCart,
	Notifications,
	Mail,
	CheckCircleOutline,
	ArrowBackIosNew,
	ArrowForwardIos,
	HighlightOff,
	Summarize,
	Rowing,
	Schedule,
	Alarm,
} from "@mui/icons-material";

const myIcons = {
	ConvIcon: <Handshake color="success" />, //Contiene abbonamento in convenzione
	PromoIcon: <Discount color="error" />, // Contiene abbonamento in promozione
	SospIcon: <ToggleOff color="warning" />, //Contiene abbonamento sospendibile
	OrarioAtvIcon: <Alarm color="info" />, //Contiene abbonamento con scelta attività ad orario
	GruppoIcon: <Groups color="success" />, //Identifica un gruppo
	SedeIcon: <Place color="warning" />, //Identifica una sede
	AreaIcon: <AutoAwesomeMosaic color="error" />, //Identifica un area
	AbbIcon: <MotionPhotosAuto color="info" />, //Identifica un abbonamento
	DataCalendarIcon: <EditCalendar />,
	AttivitaIcon: <Rowing />,
	ShoppingCartIcon: <ShoppingCart />,
	NotificationsIcon: <Notifications />,
	MailIcon: <Mail />,
	CheckCircleOutlineIcon: <CheckCircleOutline />,
	ArrowBackIosNewIcon: <ArrowBackIosNew />,
	ArrowForwardIosIcon: <ArrowForwardIos />,
	HighlightOffIcon: <HighlightOff />,
	SummarizeIcon: <Summarize />,

	ScheduleIcon: <Schedule />,
};

export default myIcons;
