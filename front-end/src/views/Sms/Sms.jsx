import { useCallback, useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import Form, {
	Item,
	Label,
	ButtonItem,
	PatternRule,
	RequiredRule,
	GroupItem,
	SimpleItem,
	TabbedItem,
	TabPanelOptions,
	Tab
} from 'devextreme-react/form';
import { DataGrid, Selection, Paging } from 'devextreme-react/data-grid';
import notify from 'devextreme/ui/notify';
import 'devextreme-react/text-area';
import { Button } from 'devextreme-react/button';

import LabelTemplate from './LabelTemplate';
import LabelNotesTemplate from './LabelNotesTemplate';
import smsData from './data';

import { uriEncode } from '../../utils/util';

const phoneEditorOptions = { mask: '+1 (X00) 000-0000', maskRules: { X: /[02-9]/ }, };


export default () => {
	const [formInstance, setFormInstance] = useState(null);
	const [smsRemainingChar, setSmsRemainingChar] = useState('160/160');
	let [recipient, setRecipient] = useState('');
	let [smsMessage, setSmsMessage] = useState('');
	let [sentSms, setSentSms] = useState([]);
	let [outboxSms, setOutboxSms] = useState([]);

	let dataGridAllData

	const navigate = useNavigate();
	const { sessionId } = useParams();

	const fetchSms = useCallback(async () => {
		await fetch(`${process.env.REACT_APP_API_DOMAIN}/admin/sms?sessionId=${sessionId}`)
			.then((res) => {
				return res.json()
			})
			.then((res) => {
				setSentSms(filterSms(res.data, 'Sent'));
				setOutboxSms(filterSms(res.data, 'Outbox'));
			});
	}, []);

	useEffect(() => {
		fetchSms();
	}, []);


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
				// console.log('res: ', res);

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

	function filterSms(data, filterBy) {
		return data.reduce((prevValue, currentValue) => {
			const { Status } = currentValue;
			if (Status == filterBy) {
				prevValue.push({	Id: currentValue.Id,
							UserId: currentValue.UserId,
							Recipient: currentValue.Recipient,
							Sms: currentValue.Sms,
							Status: currentValue.Status,
							MessageSid: currentValue.MessageSid,
							DateTimeSent: currentValue.DateTimeSent,
						});
			}

			return prevValue;
		}, []);
	}

	// function refreshSmsMessages() {
	// 	fetchSms();
	// }

	return (
		<div className="content">
			<div className="row">
				<div className="col-6 offset-1" style={{position: 'relative'}}>
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
			<div className="row mt-4">
				<div className="col-8 offset-1">
					<hr />
					<Form
						//colCount={2}
						id="forwefedfdsf"
						formData={null}>
						<GroupItem caption="SMS messages">
							<TabbedItem>
								<TabPanelOptions deferRendering={false} />
								<Tab title="Sent">
									<DataGrid dataSource={sentSms}>
										<Selection mode="single" />
										<Paging defaultPageSize={5} defaultPageIndex={1} />
									</DataGrid>
								</Tab>
								<Tab title="Outbox">
									<DataGrid dataSource={outboxSms}>
										<Selection mode="single" />
										<Paging defaultPageSize={5} defaultPageIndex={1} />
									</DataGrid>
								</Tab>
							</TabbedItem>
						</GroupItem>
					</Form>
				</div>
			</div>
			<div className="row">
				<div className="col-9">
					<div class="position-relative">
						<div class="position-absolute top-0 end-0">
							<Button text="Refresh" onClick={async () => await fetchSms()} />
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
