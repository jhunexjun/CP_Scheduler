import { useCallback, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import Form, { Item, Label, ButtonItem, PatternRule, RequiredRule } from 'devextreme-react/form';
import notify from 'devextreme/ui/notify';
import 'devextreme-react/text-area';

import LabelTemplate from './LabelTemplate';
import LabelNotesTemplate from './LabelNotesTemplate';
import smsData from './data';

import { uriEncode } from '../../utils/util';


export default () => {
	const [formInstance, setFormInstance] = useState(null);
	const [smsRemainingChar, setSmsRemainingChar] = useState('160/160');
	let [recipient, setRecipient] = useState('');
	let [smsMessage, setSmsMessage] = useState('');

	const navigate = useNavigate();
	const { sessionId } = useParams();

	const phoneEditorOptions = { mask: '+1 (X00) 000-0000',
								maskRules: { X: /[02-9]/ },
								onOptionChanged(event) {
									if (event.name === 'text') {
										//console.log('event phone: ', event);
										//setRecipient(event.value);
									}
								}};

	const txtEditorOptions = { height: 90,
							maxLength: 160,
							onOptionChanged(event) {
								if(event.name === "text") {
									const maxlength = 160;
									let currentLength = event.value.length;

									if (currentLength > maxlength) {
										console.log("You have reached the maximum number of characters.");
										return;
									}

									setSmsRemainingChar((maxlength - currentLength) + '/160');

								}
							},
						};

	function onInitialized(e) {
		setFormInstance(e.component);
	}

	const postSms = useCallback(async (sms) => {
		const uriEncoded = uriEncode(sms);
		const optionHeaders = {
			method: 'POST',
			headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
			body: uriEncoded,
		};

		await fetch(`${process.env.REACT_APP_API_DOMAIN}/admin/sms?sessionId=${sessionId}`, optionHeaders)
			.then((res) => {
				return res.json()
			})
			.then((res) => {
				if (res.status === 'Error') {
					navigate('/');
					return;
				}
				console.log('res: ', res);

				notify({
					message: 'SMS has been sent!',
					position: {
						my: 'center middle',
						at: 'center middle',
					},
				}, 'success', 3000);
			});
	}, []);

	async function handleSubmit(e) {
		e.preventDefault();
		const phoneEditor = formInstance.getEditor('phone');
		const textMsgEditor = formInstance.getEditor('textMsg');

		const sms = { recipient: phoneEditor.option('value'), smsMessage: textMsgEditor.option('value') }
		await postSms(sms);
	}


	return (
		<div className="content">
			<div className="row">
				<div className="col-6 offset-2" style={{position: 'relative'}}>
					<form action="none" onSubmit={async (e) => await handleSubmit(e)}>
						<Form formData={smsData} onInitialized={onInitialized}>
							<Item dataField="Phone" name="phone" editorOptions={phoneEditorOptions} helpText="Enter the phone number in USA phone format">
								<Label render={LabelTemplate('tel')} />
								<PatternRule message="The phone must have a correct USA phone format" pattern={/^[02-9]\d{9}$/} />
								<RequiredRule message="Phone number is required" />
							</Item>
							<Item dataField="textMsg" name="textMsg" editorType="dxTextArea" editorOptions={txtEditorOptions}>
								<Label render={LabelNotesTemplate} />
								<RequiredRule message="Sms message is required" />
							</Item>
							<ButtonItem horizontalAlignment="right" buttonOptions={{text: 'Send', type: 'success', useSubmitBehavior: true}}></ButtonItem>
						</Form>
					</form>
					<div style={{position: 'absolute', bottom: '25px', left: '105px'}}>{smsRemainingChar}</div>
				</div>
			</div>
		</div>
	)
}
