import { Typography } from "@mui/material";
import Link from "next/link";
import eCommerceConf from "eCommerceConf.json";
import { PrivacyTip } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";

const PrivacyLabel = () => {
  const theme = useTheme();

  return (
    <Typography>
      Iscrivendoti dichiari di aver preso visione dell'
      <span>
        <Link href={eCommerceConf.LinkPrivacy} style={{ userSelect: "none", color: theme.palette.mode === "light" ? "black" : "white" }}>
          Informativa sulla Privacy {<PrivacyTip sx={{ fontSize: "1rem", color: theme.palette.primary.main }}></PrivacyTip>}
        </Link>
      </span>
    </Typography>
  );
};

export default PrivacyLabel;
