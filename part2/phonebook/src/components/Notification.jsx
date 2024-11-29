const Notification = ({ message }) => {
	if (message.text === null) {
		return null
	}

	return (
		<div className={message.isError ? "message-error" : "message"}>
			{message.text}
		</div>
	);
};

export default Notification;