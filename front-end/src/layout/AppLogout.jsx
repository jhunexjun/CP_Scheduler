import { useEffect } from 'react';

import events from '../utils/events';


export default function AppLogout({ children }) {
	let timer;

	// this resets the timer if it exists.
	const resetTimer = () => {
		if (timer) clearTimeout(timer);
	};

	// this function sets the timer that logs out the user after 10 secs
	const handleLogoutTimer = () => {
		timer = setTimeout(() => {
			// clears any pending timer.
			resetTimer();
			// Listener clean up. Removes the existing event listener from the window
			Object.values(events).forEach((item) => {
				window.removeEventListener(item, resetTimer);
			});
			// logs out user
			//logoutAction();
			console.log('logged out.', process.env.REACT_APP_INACTIVE_LOGOUT_MS)
		}, process.env.REACT_APP_INACTIVE_LOGOUT_MS); // 600000ms = 10 min. You can change the time.
	};

	useEffect(() => {
		Object.values(events).forEach((item) => {
			window.addEventListener(item, () => {
				resetTimer();
				handleLogoutTimer();
			});
		});
	}, []);

	return children;
}