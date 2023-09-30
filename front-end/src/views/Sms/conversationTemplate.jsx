import { useRef, useEffect } from 'react';

import isInboxTemplate from './isInboxTemplate';
import sentItemsTemplate from './sentItemsTemplate';


const Converse = (conversation) => {
	useEffect(() => {
		scrollToBottom();
	}, [conversation]);

	const messagesEndRef = useRef(null);

	function scrollToBottom() {
		messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
	}

	let messages = conversation.map((item, index) => {
		if (item.fromTable === 'inbox')
			return isInboxTemplate(item, index);
		else
			return sentItemsTemplate(item, index);
	});

	return <>
			{messages}
			<div ref={messagesEndRef} />
		</>
}

export default Converse;