import net from "net";
import tls from "tls";
import chalk from "chalk";
import { log, error, warn } from "./util";

export default class TCPServer {

	/**
	 * @typedef TCPServerOptions
	 * @property {?(string|Buffer)[]} ca Certificate authority, if null then wont use TLS server
	 * @property {?(string|Buffer)[]} cert Certificate for private key, if null then wont use TLS server
	 * @property {?any[]} key Private key, if null then wont use TLS server
	 * @property {string} ip IP to listen to
	 * @property {number} port Port to listen to
	 * @property {number} keepAliveDuration Duration to keep alive a connection
	 */

	/**
     * @param {Client} client
	 * @param {TCPServerOptions} opts
     * @param {object} args net.Server args
     */
	constructor(client, opts, args = {}) {
		if(opts.ca && opts.cert && opts.key) {
			this.server = tls.createServer({
				ca: opts.ca,
				cert: opts.cert,
				key: opts.key,
				requestCert: true,
				...args
			});
		} else {
			this.server = net.createServer(...args);
			if(!["localhost", "127.0.0.1"].includes(opts.ip)) {
				warn("Not using TLS for a public bot is kind of dangerous");
			}
		}
		/**
		 * @type {net.Server}
		 */
		this.server;

		this.client = client;
		/**
		 * @type {Map<string, net.Socket>}
		 */
		this.sockets = new Map();
		this.keepAlive = opts.keepAliveDuration;

		this.setHandlers();
		this.server.listen(opts.port, opts.ip);
	}

	setHandlers() {
		this.server.on("listening", () => {
			const address = this.address();
			log(chalk`Started listening to {magenta ${address.address}:${address.port}}`);
		});

		this.server.on("error", err => {
			const address = this.address();
			error(err === "EADDRINUSE" ? `${address.address}:${address.port} is already in use` : err);
		});

		this.server.on("connection", socket => {
			socket.setEncoding("utf-8");
			socket.setKeepAlive(true, this.keepAlive);

			const address = socket.address();
			this.sockets.set(`${address.address}:${address.port}`, socket);
			log(chalk`Connection established with {magenta ${address.address}:${address.port}}`);
		});
	}
}