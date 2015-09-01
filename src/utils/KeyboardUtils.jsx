/*
 * @flow-weak
 */

export default {
	keyShouldTriggerAction( ev ) {
		const key = ev.key;
		const modState = ev.altKey || ev.ctrlKey || ev.metaKey;
		const disregardKeys = [
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
		];

		return disregardKeys.indexOf( key ) === -1 && !modState;
	},

	keyShouldPassValue( ev ) {
		const activateWithoutValueKeys = [
			"Tab",
			"Enter"
		];

		return activateWithoutValueKeys.indexOf( ev.key ) === -1;
	}
};
