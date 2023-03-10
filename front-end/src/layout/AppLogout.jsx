import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom'

import events from '../utils/events';
import { extractSessionId, uriEncode } from '../utils/util'


export default function AppLogout({ children }) {
	let timer;

	const navigate = useNavigate();
	const session = useParams();
	const [sessionId, setSessionId] = useState('');

	const adminUrl = process.env.REACT_APP_API_DOMAIN + '/admin';

	// this resets the timer if it exists.
	const resetTimer = () => {
		if (timer) clearTimeout(timer);
	};

	// logs out user
	async function logoutUser() {
		const optionHeaders = {
			method: 'PUT',
			headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
			body: uriEncode({ sessionId: extractSessionId(session['*']), robot: 'Y' }),
		}

		await fetch(`${adminUrl}/logout`, optionHeaders)
		navigate('/');
	}

	// this function sets the timer that logs out the user after 10 secs
	const handleLogoutTimer = async () => {
		timer = setTimeout(async () => {
			// clears any pending timer.
			resetTimer();
			// Listener clean up. Removes the existing event listener from the window
			Object.values(events).forEach((item) => {
				window.removeEventListener(item, resetTimer);
			});

			await logoutUser();
		}, parseInt(process.env.REACT_APP_INACTIVE_LOGOUT_MS)); // 600000ms = 10 min. You can change the time.
	};

	useEffect(() => {
		if (!JSON.parse(process.env.REACT_APP_LOGOUT_AFTER_INACTIVITY))
			return;

		Object.values(events).forEach((item) => {
			window.addEventListener(item, async () => {
				resetTimer();
				await handleLogoutTimer();
			});
		});
	}, []);

	return children;
}