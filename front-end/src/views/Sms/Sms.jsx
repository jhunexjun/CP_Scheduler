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
import TextArea from 'devextreme-react/text-area';
import notify from 'devextreme/ui/notify';
import 'devextreme-react/text-area';
import { Button } from 'devextreme-react/button';
import List from 'devextreme-react/list';
import ArrayStore from 'devextreme/data/array_store';
import TileView from 'devextreme-react/tile-view';

import LabelTemplate from './LabelTemplate';
import LabelNotesTemplate from './LabelNotesTemplate';
import smsData from './data';

import { uriEncode } from '../../utils/util';
import './styles.css';

import UilSearchAlt from '@iconscout/react-unicons/icons/uil-search-alt';
import UilListUl from '@iconscout/react-unicons/icons/uil-list-ul';

const phoneEditorOptions = { mask: '+1 (X00) 000-0000', maskRules: { X: /[02-9]/ }, };


export default () => {
	const [formInstance, setFormInstance] = useState(null);
	const [smsRemainingChar, setSmsRemainingChar] = useState('160/160');
	let [recipient, setRecipient] = useState('');
	let [smsMessage, setSmsMessage] = useState('');
	let [sentSms, setSentSms] = useState([]);
	let [outboxSms, setOutboxSms] = useState([]);

	const [dataSourceOptions, setDataSourceOptions] = useState(null);

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

	const fetchCustomers = useCallback(async () => {
		await fetch(`${process.env.REACT_APP_API_DOMAIN}/admin/customers?sessionId=${sessionId}`)
			.then((res) => {
				return res.json()
			})
			.then((res) => {
				const data = res.data;
				const dataStruct = { store: new ArrayStore({
											data,
											key: 'CUST_NO',
										}),
										searchExpr: ['CUST_NO', 'NAM', 'ADRS_1', 'EMAIL_ADRS_1', 'PHONE_1'],
									}

				setDataSourceOptions(dataStruct);
			});
	}, []);

	useEffect(() => {
		fetchSms();
		fetchCustomers();
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

	// function textMsgInputHandler(event) {
	// 	const maxlength = 160;
	// 	let currentLength = event.value.length;

	// 	if (currentLength > maxlength) {
	// 		console.log("You have reached the maximum number of characters.");
	// 		return;
	// 	}

	// 	setSmsRemainingChar((maxlength - currentLength) + '/160');
	// }

	function renderListItem(item) {
		// console.log('item: ', item);
		return (
			<div>
				<div>{item.CUST_NO}</div>
				<div className="hotel">
					<div className="name">{item.NAM}</div>
					<div className="address">{item.ADRS_1}</div>
				</div>
				<div className="price-container">
					<div className="price"></div>
						&nbsp;
					<div className="caption">per<br />night</div>
				</div>
			</div>
		);
	}

	return (
		<div className="content">
			<div className="row">
				<div className="col-3">
					<div className="left">
						<List
							selectionMode="single"
							dataSource={dataSourceOptions}
							grouped={false}
							searchEnabled={true}
							// selectedItemKeys={null}
							// onSelectionChanged={null}
							itemRender={renderListItem}
							// groupRender={null}
							elementAttr={{ class: 'list' }}
						/>
					</div>
				</div>
				<div className="col-4">

				</div>
			</div>
		</div>
	)
}
