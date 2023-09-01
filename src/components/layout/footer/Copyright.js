import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import eCommerceConf from "/eCommerceConf.json";

const date = new Date().getFullYear();
export default function Copyright() {
  return (
    <Typography variant="caption">
      {"Copyright © "}
      <Link color="inherit" href={eCommerceConf.LinkHomeCenter}>
        {eCommerceConf.Copyright}
      </Link>{" "}
      {date}
      {"."}
    </Typography>
  );
}
