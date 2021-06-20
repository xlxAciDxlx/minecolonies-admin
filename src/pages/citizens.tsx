import { Fragment, useEffect, useState } from "react";
import Alert from "react-bootstrap/Alert";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import ListGroup from "react-bootstrap/ListGroup";
import Row from "react-bootstrap/Row";
import Socket from "../socket";
import { Citizen } from "../utils";

export default function Citizens() {
	const [citizens, setCitizens] = useState<Citizen[]>([]);
	useEffect(() => {
		setCitizens(Socket.getData()?.getCitizens);
	}, [Socket.getData()]);

	return citizens === undefined ? (
		<Alert className="mb-0 p-2 text-center" variant="error">
			No Citizens data!
		</Alert>
	) : citizens.length === 0 ? (
		<Alert className="mb-0 p-2 text-center" variant="info">
			No Citizens to display!
		</Alert>
	) : (
		citizens.map((citizen, index) => (
			<Card className={[index < citizens.length - 1 && "mb-4"].filter(Boolean).sort().join(" ")} key={index}>
				<Card.Header>
					{citizen.name} ({citizen.age.slice(0, 1).toUpperCase() + citizen.age.slice(1)}{" "}
					{citizen.sex.slice(0, 1).toUpperCase() + citizen.sex.slice(1)})
				</Card.Header>

				<ListGroup variant="flush">
					<ListGroup.Item>
						<dl>
							<dt>Job:</dt>
							<dd>{citizen.job || <em className="text-muted">Unassigned</em>}</dd>
						</dl>
					</ListGroup.Item>

					<ListGroup.Item>
						<dl>
							<dt>Location:</dt>
							<dd>
								X: {citizen.location.x}, Y: {citizen.location.y}, Z: {citizen.location.z}
							</dd>
						</dl>
					</ListGroup.Item>

					<ListGroup.Item>
						<dl>
							<dt>Skills:</dt>
							<dd>
								<Container className="p-0">
									<Row>
										{Object.keys(citizen.skills).map((skill, skillIndex) => (
											<Col key={skillIndex} lg={4}>
												{skill}{" "}
												<span className="text-muted">
													(Level {citizen.skills[skill].level} &mdash; {citizen.skills[skill].xp} XP)
												</span>
											</Col>
										))}
									</Row>
								</Container>
							</dd>
						</dl>
					</ListGroup.Item>

					<ListGroup.Item>
						<dl>
							<dt>Work:</dt>
							<dd>
								{citizen.work ? (
									<Fragment>
										Level {citizen.work.level.toLocaleString()}{" "}
										{citizen.work.type.slice(0, 1).toUpperCase() + citizen.work.type.slice(1)} &mdash; Working at: (X:{" "}
										{citizen.work.location.x}, Y: {citizen.work.location.y}, Z: {citizen.work.location.z})
									</Fragment>
								) : (
									<em className="text-muted">Not Working</em>
								)}
							</dd>
						</dl>
					</ListGroup.Item>
				</ListGroup>
			</Card>
		))
	);
}
