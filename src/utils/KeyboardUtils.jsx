/*
 * @flow-weak
 */

export default {
	"disregardKeys": [
		"Cancel",
		"Clear",
		"ScrollLock",
		"Scroll",
		"Pause",
		"NumLock",
		"ContextMenu",
		"Menu",
		"OS",
		"Help",
		"Delete",
		"Del",
		"Insert",
		"PrintScreen",
		"Unidentified",
		"Select",
		"Left",
		"ArrowLeft",
		"Up",
		"ArrowUp",
		"Right",
		"Down",
		"ArrowRight",
		"ArrowDown",
		"Spacebar",
		"PageDown",
		"PageUp",
		"Home",
		"End",
		"Backspace",
		"Shift",
		"Control",
		"Alt",
		"CapsLock",
		"Esc",
		"Escape",
		"F1",
		"F2",
		"F3",
		"F4",
		"F5",
		"F6",
		"F7",
		"F8",
		"F9",
		"F10",
		"F11",
		"F12",
		"Win"
	],

	"noValueTriggerKeys": [
		"Tab",
		"Enter"
	],

	"noValueTriggerCodes": [
		13, // Enter
		9 // Tab
	],

	keyShouldTriggerWithValue( ev ) {
		const key = ev.key;
		const modState = ev.altKey || ev.ctrlKey || ev.metaKey;
		const disregardKey = this.disregardKeys.indexOf( key ) === -1;
		const noValueTriggerKey = this.noValueTriggerKeys.indexOf( key ) !== -1;

		if ( modState || disregardKey || noValueTriggerKey ) {
			return false;
		} else {
			return true;
		}
	},

	keyShouldTriggerWithNoValue( ev ) {
		if ( ev.key ) {
			return this.noValueTriggerKeys.indexOf( ev.key ) !== -1;
		} else {
			if ( ev.which ) {
				return this.noValueTriggerCodes.indexOf( ev.which ) !== -1;
			}
		}

		return false;
	}
};
