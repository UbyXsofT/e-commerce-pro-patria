import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import eCommerceConfig from "./../../../../ecommerceConfig.json";
export default function Copyright() {
	return (
		<Typography variant='caption'>
			{"Copyright © "}
			<Link
				color='inherit'
				href={eCommerceConfig.LinkHomeCenter}
			>
				{eCommerceConfig.Copyright}
			</Link>{" "}
			{new Date().getFullYear()}
			{"."}
		</Typography>
	);
}
