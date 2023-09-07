import { Typography } from "@mui/material";
import Link from "next/link";
import eCommerceConf from "eCommerceConf.json";
import { PrivacyTip } from "@mui/icons-material";
import { Theme, useTheme } from "@mui/material/styles";

type PrivacyLabelProps = {
  invert?: boolean;
};

const PrivacyLabel = ({ invert }: PrivacyLabelProps) => {
  const theme = useTheme();
  let color = theme.palette.mode === "light" ? "black" : "white";
  invert ? (color === (color = "white") ? (color = "black") : "white") : color;

  return (
    <Typography>
      Iscrivendoti dichiari di aver preso visione dell'
      <span>
        <Link target="_blank" href={eCommerceConf.LinkPrivacy} style={{ userSelect: "none", color: color }}>
          Informativa sulla Privacy {<PrivacyTip sx={{ fontSize: "1rem", color: theme.palette.primary.main }}></PrivacyTip>}
        </Link>
      </span>
    </Typography>
  );
};

export default PrivacyLabel;
