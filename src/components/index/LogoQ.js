import React from "react";
import {useSpring, animated} from "@react-spring/web";
import Image from "next/image";
import {Box} from "@mui/system";
import {styled} from "@mui/material/styles";

const StyledImage = styled(Image)({
	padding: "10px",
	maxWidth: 300,
});

const FadeInImage = () => {
	const fadeInProps = useSpring({
		from: {opacity: 0},
		to: {opacity: 1},
		config: {duration: 3000},
	});

	return (
		<Box
			style={{
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
			}}
		>
			<Box
				style={{
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					margin: "auto",
				}}
			>
				<animated.div style={fadeInProps}>
					<StyledImage
						src='/images/LogoQ.png'
						alt='Logo'
						width={300}
						height={300}
						priority={true}
					/>
				</animated.div>
			</Box>
		</Box>
	);
};

export default FadeInImage;
