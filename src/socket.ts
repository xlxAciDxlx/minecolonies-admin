import { EventEmitter } from "events";

export class SocketInstance extends EventEmitter {
	private _INITIALIZED: boolean = false;

	private client?: WebSocket;
	private data?: any;

	async deinitialize() {
		if (!this._INITIALIZED) {
			return Promise.reject("Socket not initialized!");
		}

		this.client.close();
		this.client = undefined;
		this._INITIALIZED = false;
		return Promise.resolve();
	}

	getData() {
		if (!this._INITIALIZED) {
			return undefined;
		}

		return this.data;
	}

	async initialize() {
		if (this.client) {
			return Promise.reject("Socket already initialized!");
		}

		const WS_URL = process.env.WEBSOCKET_URL || process.env.NEXT_PUBLIC_WEBSOCKET_URL;
		if (!WS_URL) {
			throw new Error("No WebSocket URL found from environment!");
		}

		this.client = new WebSocket(WS_URL);

		this.client.onclose = event => {
			const { code, reason } = event;
			console.info("[Socket] Closed", code, reason);
		};

		this.client.onerror = event => {
			console.error("[Socket] Error", event);
		};

		this.client.onmessage = event => {
			let { data } = event;
			if (typeof data === "string") {
				try {
					data = JSON.parse(data);
					this.data = { ...this.data, ...data };
				} catch (error) {
					console.error("[Socket] Unable to parse message:", error);
				}
			}

			// console.info("[Socket] Message:", data);
			this.emit("dataChanged", this.data);
		};

		this.client.onopen = () => {
			console.info("[Socket] Opened");
		};

		this._INITIALIZED = true;
		return Promise.resolve();
	}
}

const Socket = new SocketInstance();
export default Socket;
