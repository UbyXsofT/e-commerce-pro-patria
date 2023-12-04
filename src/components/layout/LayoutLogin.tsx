// import Header from "./Header";
// import Footer from "./Footer";
import Head from "next/head";
import { useSpring, animated } from "@react-spring/web";
import eCommerceConf from "../../../eCommerceConf.json";
// TODO: Spec out Children and think about Optionals
type LayoutType = {
	children?: any[];
	title: string;
	description: string;
	ogImage?: undefined;
	url?: undefined;
};

const Layout = ({ children, title, description, ogImage, url }: LayoutType) => {
	const mainAnimation = useSpring({
		opacity: 1,
		from: { opacity: 0 },
		config: {
			duration: 1000,
		},
	});
	return (
		<>
			<Head>
				<title>
					{title
						? title
						: "E-commerce per il tuo centro fitness in React Next MUI"}
				</title>
				<meta
					name="description"
					key="description"
					content={
						description
							? description
							: "E-commerce per il tuo centro fitness in React Next MUI"
					}
				/>
				<meta
					property="og:title"
					content={
						title
							? title
							: "E-commerce per il tuo centro fitness in React Next MUI"
					}
					key="og:title"
				/>
				<meta
					property="og:url"
					content={eCommerceConf.LinkHomeCenter}
					key="og:url"
				/>
				<meta
					property="og:image"
					content="/images/banner-social.png"
					key="og:image"
				/>
				<meta
					property="og:description"
					content={
						description
							? description
							: "E-commerce per il tuo centro fitness in React Next MUI."
					}
					key="og:description"
				/>
			</Head>

			<animated.main style={mainAnimation}>{children}</animated.main>
		</>
	);
};

export default Layout;
