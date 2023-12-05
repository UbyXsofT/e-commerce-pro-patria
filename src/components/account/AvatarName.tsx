import { Avatar } from "@mui/material";
import { useSelector } from "react-redux";
import { StoreState } from "../CommonTypesInterfaces";

function stringToColor(string: string) {
	let hash = 0;
	let i;

	for (i = 0; i < string.length; i += 1) {
		hash = string.charCodeAt(i) + ((hash << 5) - hash);
	}

	let color = "#";

	for (i = 0; i < 3; i += 1) {
		const value = (hash >> (i * 8)) & 0xff;
		color += `00${value.toString(16)}`.slice(-2);
	}

	return color;
}

function getContrastRatio(color1: string, color2: string): number {
	const luminance1 = calculateLuminance(color1);
	const luminance2 = calculateLuminance(color2);

	const brighter = Math.max(luminance1, luminance2);
	const darker = Math.min(luminance1, luminance2);

	return (brighter + 0.05) / (darker + 0.05);
}

function calculateLuminance(color: string): number {
	const rgb = parseInt(color.substr(1), 16);
	const r = (rgb >> 16) & 0xff;
	const g = (rgb >> 8) & 0xff;
	const b = (rgb >> 0) & 0xff;

	const rsrgb = r / 255.0;
	const gsrgb = g / 255.0;
	const bsrgb = b / 255.0;

	const rLinear =
		rsrgb <= 0.03928 ? rsrgb / 12.92 : Math.pow((rsrgb + 0.055) / 1.055, 2.4);
	const gLinear =
		gsrgb <= 0.03928 ? gsrgb / 12.92 : Math.pow((gsrgb + 0.055) / 1.055, 2.4);
	const bLinear =
		bsrgb <= 0.03928 ? bsrgb / 12.92 : Math.pow((bsrgb + 0.055) / 1.055, 2.4);

	return 0.2126 * rLinear + 0.7152 * gLinear + 0.0722 * bLinear;
}

function ensureContrast(color1: string, color2: string): string {
	const contrastRatio = getContrastRatio(color1, color2);
	const threshold = 4.5;

	if (contrastRatio < threshold) {
		return invertColor(color2);
	}

	return color2;
}

function invertColor(color: string): string {
	const hex = color.slice(1);
	const invertedHex = (0xffffff ^ parseInt(hex, 16))
		.toString(16)
		.padStart(6, "0");
	return `#${invertedHex}`;
}

function stringAvatar(name: string | undefined) {
	if (!name) {
		return {
			sx: {
				bgcolor: "",
				color: "",
			},
			children: "",
		};
	}

	const nameParts = name.split(" ");
	const firstNameInitial = nameParts[0]?.[0] || "";
	const lastNameInitial = nameParts[1]?.[0] || "";

	const bgColor = stringToColor(name);
	const textColor = ensureContrast("#FFFFFF", bgColor); // Inverte il testo se necessario

	return {
		sx: {
			bgcolor: bgColor,
			color: textColor,
		},
		children: `${firstNameInitial}${lastNameInitial}`,
	};
}

const AvatarName = () => {
	const authUser = useSelector((state: StoreState) => state.authUser);
	return <Avatar {...stringAvatar(authUser?.NOMINATIVO ?? "N.D.")} />;
};

export default AvatarName;
