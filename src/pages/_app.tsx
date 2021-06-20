import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { Fragment, useEffect, useState } from "react";
import Alert from "react-bootstrap/Alert";
import Badge from "react-bootstrap/Badge";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Row from "react-bootstrap/Row";
import Socket from "../socket";
import "../styles/global.scss";
import { Colony } from "../utils";

const DEFAULT_TITLE = "Minecolonies Admin";

function routeToTitle(route: string): JSX.Element | string {
	switch (route) {
		case "/":
			return <Fragment>{DEFAULT_TITLE} &bull; Home</Fragment>;

		default:
			return DEFAULT_TITLE;
	}
}

function MyApp({ Component, pageProps }) {
	const [socketData, setSocketData] = useState(Socket.getData());
	console.info("Socket Data:", socketData);

	const socketDataHandler = (data: any) => {
		setSocketData(data);
	};

	useEffect(() => {
		Socket.initialize()
			.then(() => {
				console.info("Successfully initialized Socket!");
				Socket.on("dataChanged", socketDataHandler);
			})
			.catch((error: Error) => {
				console.error("Unable to initialize Socket:", error);
			});

		return () => {
			Socket.deinitialize()
				.then(() => {
					console.info("Successfully deinitialized Socket!");
					Socket.off("dataChanged", socketDataHandler);
				})
				.catch((error: Error) => {
					console.error("Unable to deinitialize Socket:", error);
				});
		};
	}, []);

	const router = useRouter();
	const [title, setTitle] = useState<JSX.Element | string>(DEFAULT_TITLE);
	useEffect(() => {
		setTitle(routeToTitle(router.asPath));
	}, [router.asPath]);

	const [colonyData, setColonyData] = useState<Colony | undefined>();
	useEffect(() => {
		setColonyData(socketData?.colonyInfo);
	}, [socketData?.colonyInfo]);

	if (socketData === undefined) {
		return (
			<Fragment>
				<Head>
					<title>{title}</title>
				</Head>

				<Container>
					<Alert variant="error">No Socket data available!</Alert>
				</Container>
			</Fragment>
		);
	}

	return (
		<Fragment>
			<Head>
				<title>{title}</title>
			</Head>

			<Navbar bg="dark" expand="lg" variant="dark">
				<Container>
					<Navbar.Brand href="/">{DEFAULT_TITLE}</Navbar.Brand>
				</Container>
			</Navbar>

			<Container className="pt-4">
				<Card>
					<Card.Header>
						<Breadcrumb className="p-0">
							<Link href="/" passHref>
								<Breadcrumb.Item>{DEFAULT_TITLE}</Breadcrumb.Item>
							</Link>

							<Link href={router.asPath} passHref>
								<Breadcrumb.Item active>
									{router.asPath.slice(1, 2).toUpperCase() + router.asPath.slice(2)}
								</Breadcrumb.Item>
							</Link>
						</Breadcrumb>
					</Card.Header>
				</Card>

				{colonyData ? (
					<Card style={{ marginTop: "1em" }}>
						<Card.Header>
							<Container className="p-0" style={{ alignItems: "center" }}>
								<Row>
									<Col>
										<Card.Title as="h5" className="m-0">
											{colonyData.name} Info
										</Card.Title>
									</Col>

									<Col>
										<Badge pill variant={colonyData.active ? "primary" : "secondary"}>
											{colonyData.active ? "Active" : "Inactive"}
										</Badge>

										<Badge pill variant={colonyData.mourning ? "info" : "dark"}>
											{colonyData.mourning ? "" : "Not "}Mourning
										</Badge>
									</Col>
								</Row>
							</Container>
						</Card.Header>

						<Card.Body>
							<Container className="p-0">
								<Row>
									<Col lg={4}>
										Citizens: {colonyData.citizens.toLocaleString()} / {colonyData.maxCitizens.toLocaleString()}
									</Col>

									<Col lg={4}>Happiness: {colonyData.happiness}</Col>

									<Col lg={4}>
										Location: {colonyData.location.world} &mdash; X: {colonyData.location.x}, Y: {colonyData.location.y}
										, Z: {colonyData.location.z}
									</Col>

									<Col lg={4}>Style: {colonyData.style}</Col>
								</Row>
							</Container>
						</Card.Body>
					</Card>
				) : (
					<Card style={{ marginTop: "1em" }}>
						<Card.Header>
							<Card.Title as="h5">Colony Info</Card.Title>
							<Card.Subtitle className="text-muted">Unknown Colony</Card.Subtitle>
						</Card.Header>

						<Card.Body>
							<Card.Text>No Colony data provided</Card.Text>
						</Card.Body>
					</Card>
				)}
				<hr />

				<Card className="mb-4">
					<Card.Header>
						<Nav defaultActiveKey={router.asPath} fill variant="pills">
							<Nav.Item>
								<Link href="/buildings" passHref>
									<Nav.Link>Buildings</Nav.Link>
								</Link>
							</Nav.Item>

							<Nav.Item>
								<Link href="/citizens" passHref>
									<Nav.Link>Citizens</Nav.Link>
								</Link>
							</Nav.Item>
						</Nav>
					</Card.Header>
				</Card>

				<Component {...pageProps} />
			</Container>
		</Fragment>
	);
}

export default MyApp;
