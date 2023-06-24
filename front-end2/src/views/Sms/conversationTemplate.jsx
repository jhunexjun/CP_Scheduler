import isInboxTemplate from './isInboxTemplate';
import sentItemsTemplate from './sentItemsTemplate';

const conv = (conversation) => {
	let messages = conversation.map((item, index) => {
		if (item.fromTable === 'inbox')
			return isInboxTemplate(item, index);
		else
			return sentItemsTemplate(item, index);
	});

	return <>{messages}</>
}

export default conv;