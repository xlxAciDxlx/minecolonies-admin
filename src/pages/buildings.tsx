import { useEffect, useState } from "react";
import Alert from "react-bootstrap/Alert";
import Badge from "react-bootstrap/Badge";
import Card from "react-bootstrap/Card";
import ProgressBar from "react-bootstrap/ProgressBar";
import Socket from "../socket";
import { Building } from "../utils";

export default function Buildings() {
	const [buildings, setBuildings] = useState<Building[]>([]);
	useEffect(() => {
		setBuildings(Socket.getData()?.getBuildings);
	}, [Socket.getData()]);

	return buildings === undefined ? (
		<Alert className="mb-0 p-2 text-center" variant="error">
			No Buildings data!
		</Alert>
	) : buildings.length === 0 ? (
		<Alert className="mb-0 p-2 text-center" variant="info">
			No Buildings to display!
		</Alert>
	) : (
		buildings.map((building, index) => (
			<Card className={[index < buildings.length - 1 && "mb-4"].filter(Boolean).sort().join(" ")} key={index}>
				<Card.Header>
					{building.name || <em className="text-muted">No Name Specified</em>}

					<Badge variant={building.built ? "success" : "primary"}>{building.built ? "" : "Not "}Built</Badge>

					<Badge variant={building.guarded ? "info" : "dark"}>{building.guarded ? "" : "Not "}Guarded</Badge>
				</Card.Header>

				<Card.Body>
					<dl>
						<dt>Citizens ({building.citizens.length.toLocaleString()}):</dt>
						<dd>
							{building.citizens.map((citizen, citizenIndex) => (
								<div key={citizenIndex}>
									{citizen.name || <em className="text-muted">No Name Provided</em>} (
									{citizen.work?.type || <em className="text-muted">Not Working</em>})
								</div>
							))}
						</dd>
					</dl>

					<dl>
						<dt>
							Level ({building.level.toLocaleString()} / {building.maxLevel.toLocaleString()}):
						</dt>
						<dd>
							<ProgressBar now={building.maxLevel / building.level} />
						</dd>
					</dl>
				</Card.Body>
			</Card>
		))
	);
}
