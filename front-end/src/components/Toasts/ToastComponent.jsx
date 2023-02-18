import React from 'react';
// import { Link, useNavigate } from "react-router-dom";

import { Toast, ToastHeader, ToastBody } from 'reactstrap';


export default React.memo(function ToastComponent(props) {

	return (
		<div className="p-3 bg-success my-2 rounded">
		    <Toast isOpen={props.isOpen} fade={props.fade}>
				<ToastHeader>
					Reactstrap
				</ToastHeader>
				<ToastBody>
					This is a toast on a success background — check it out!
				</ToastBody>
		    </Toast>
		  </div>
	);
});