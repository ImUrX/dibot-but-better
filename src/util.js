import chalk from "chalk";

/**
 * console.debug(s) but with style
 * @param {any} debug Debug to log
 * @param {boolean} doDebug Boolean for config
 * @param {?any} prefix Prefix to tag the info with
 * @param {...any} opts console.log(s, ...opts)
 */
export function debug(debug, doDebug, prefix = "", ...opts) {
	if(doDebug) console.debug(chalk`{bgWhite ${prefix}[DEBUG]} ${debug}`, ...opts);
}

/**
 * console.log(s) but with style
 * @param {any} info Info to log
 * @param {?any} prefix Prefix to tag the info with
 * @param {...any} opts console.log(s, ...opts)
 */
export function log(info, prefix = "", ...opts) {
	console.log(chalk`{bgBlue ${prefix}[INFO]} ${info}`, ...opts);
}

/**
 * console.warn(s) but with style
 * @param {any} warn Warn to log
 * @param {?any} prefix Prefix to tag the warn with
 * @param {...any} opts console.log(s, ...opts)
 */
export function warn(warn, prefix = "", ...opts) {
	console.warn(chalk`{bgYellow ${prefix}[WARN]} {yellow ${warn}}`, ...opts);
}

/**
 * console.error(s) but with style
 * @param {any} error Error to log
 * @param {?any} prefix Prefix to tag the warn with
 * @param {...any} opts console.log(s, ...opts)
 */
export function error(error, prefix = "", ...opts) {
	console.error(chalk`{bgRed ${prefix}[ERROR]} {red ${error}}`, ...opts);
}
