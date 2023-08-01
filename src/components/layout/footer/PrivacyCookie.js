import * as React from "react";
import {useTheme} from "@mui/material/styles";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import {HowToReg, PrivacyTip, Cookie} from "@mui/icons-material";
import {Box} from "@mui/material";
import eCommerceConfig from "../../../../eCommerceConfig.json";

export function PrivacyCookie() {
	const [isFooterFixed, setIsFooterFixed] = React.useState(false);
	const theme = useTheme();

	return (
		<Grid
			item
			xs={12}
			sm={4}
			// mt={5}
		>
			<Box sx={{display: "flex", flexDirection: "column"}}>
				<Box>
					<HowToReg sx={{mr: 1, fontSize: "1rem", color: (theme) => theme.palette.primary.main}} />
					<Link
						href={eCommerceConfig.LinkCondizioni}
						sx={{color: (theme) => (theme.palette.mode === "light" ? "black" : "white")}}
					>
						Condizioni generali di uso e vendita
					</Link>
				</Box>
				<Box>
					<PrivacyTip sx={{mr: 1, fontSize: "1rem", color: (theme) => theme.palette.primary.main}} />
					<Link
						href={eCommerceConfig.LinkPrivacy}
						sx={{color: (theme) => (theme.palette.mode === "light" ? "black" : "white")}}
					>
						Informativa sulla privacy
					</Link>
				</Box>
				<Box>
					<Cookie sx={{mr: 1, fontSize: "1rem", color: (theme) => theme.palette.primary.main}} />
					<Link
						href={eCommerceConfig.LinkCookie}
						sx={{color: (theme) => (theme.palette.mode === "light" ? "black" : "white")}}
					>
						Cookie
					</Link>
				</Box>
			</Box>
		</Grid>
	);
}
