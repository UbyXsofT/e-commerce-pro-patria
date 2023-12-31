// {
// 	itemsCard?.promozione === 2 ? ( //convenzione
// 		<Typography
// 			marginBottom={3}
// 			variant="h5"
// 		>
// 			<Tooltip
// 				title={
// 					<span style={{ display: "flex", flexDirection: "column" }}>
// 						<Typography
// 							textAlign={"center"}
// 							variant="subtitle2"
// 						>
// 							Convenzione
// 						</Typography>
// 						<Typography variant="subtitle2">
// 							{itemsCard?.descrizione}
// 						</Typography>
// 					</span>
// 				}
// 			>
// 				<IconButton>
// 					<Handshake color="success" />
// 				</IconButton>
// 			</Tooltip>
// 		</Typography>
// 	) : (
// 		<></>
// 	);
// }
// {
// 	itemsCard?.promozione === 1 ? ( //promozione
// 		<Typography
// 			marginBottom={3}
// 			variant="h5"
// 		>
// 			<Tooltip
// 				title={
// 					<span style={{ display: "flex", flexDirection: "column" }}>
// 						<Typography
// 							textAlign={"center"}
// 							variant="subtitle2"
// 						>
// 							Promozione
// 						</Typography>
// 						<Typography variant="subtitle2">
// 							{itemsCard?.descrizione}
// 						</Typography>
// 					</span>
// 				}
// 			>
// 				<IconButton>
// 					<Discount color="error" />
// 				</IconButton>
// 			</Tooltip>
// 		</Typography>
// 	) : (
// 		<></>
// 	);
// }
// {
// 	itemsCard?.sceltaFine > 0 ? (
// 		<Typography
// 			marginBottom={3}
// 			variant="h5"
// 		>
// 			<Tooltip
// 				title={
// 					<span style={{ display: "flex", flexDirection: "column" }}>
// 						<Typography
// 							textAlign={"center"}
// 							variant="subtitle2"
// 						>
// 							Orario Configurabile <br />
// 						</Typography>
// 						<Typography variant="h6">
// 							{`${
// 								itemsCard?.dataIniziale ? itemsCard.dataIniziale : "n.i."
// 							} - ${itemsCard?.periodoAttivabile}`}
// 						</Typography>
// 					</span>
// 				}
// 			>
// 				<IconButton>
// 					<EditCalendar color="info" />
// 				</IconButton>
// 			</Tooltip>
// 		</Typography>
// 	) : (
// 		<></>
// 	);
// }
