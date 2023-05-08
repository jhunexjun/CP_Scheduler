import { useCallback, useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

// import Form, {
// 	Item,
// 	Label,
// 	ButtonItem,
// 	PatternRule,
// 	RequiredRule,
// 	GroupItem,
// 	SimpleItem,
// 	TabbedItem,
// 	TabPanelOptions,
// 	Tab
// } from 'devextreme-react/form';
// import { DataGrid, Selection, Paging } from 'devextreme-react/data-grid';
// import TextArea from 'devextreme-react/text-area';
import 'devextreme-react/text-area';
// import { Button } from 'devextreme-react/button';
import List from 'devextreme-react/list';
import ArrayStore from 'devextreme/data/array_store';
import TileView from 'devextreme-react/tile-view';

import LabelTemplate from './LabelTemplate';
import LabelNotesTemplate from './LabelNotesTemplate';
import smsData from './data';

import { uriEncode, isSet, notification } from '../../utils/util';
import './styles.css';
import conversationTemplate from './conversationTemplate';

import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBIcon,
  MDBBtn,
  MDBTypography,
  MDBTextArea,
  MDBCardHeader,
} from "mdb-react-ui-kit";

import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";

import validator from 'validator';


// const phoneEditorOptions = { mask: '+1 (X00) 000-0000', maskRules: { X: /[02-9]/ }, };


export default () => {
	const [formInstance, setFormInstance] = useState(null);
	const [smsRemainingChar, setSmsRemainingChar] = useState('160/160');
	let [recipient, setRecipient] = useState('');
	let [smsMessage, setSmsMessage] = useState('');
	let [sentSms, setSentSms] = useState([]);
	let [outboxSms, setOutboxSms] = useState([]);
	const [selectedItemKeys, setSelectedItemKeys] = useState([0]);
	const [convoByCustomer, setConvoByCustomer] = useState([]);
	const [currentCustomer, setCurrentCustomer] = useState(undefined);

	const [dataSourceOptions, setDataSourceOptions] = useState(null);

	// let dataGridAllData

	const navigate = useNavigate();
	const { sessionId } = useParams();

	const fetchSms = useCallback(async () => {
		await fetch(`${process.env.REACT_APP_API_DOMAIN}/admin/sms2?sessionId=${sessionId}`)
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
											data,	// data should be named 'data'
											key: 'CUST_NO',
										}),
										searchExpr: ['CUST_NO', 'NAM', 'ADRS_1', 'EMAIL_ADRS_1', 'PHONE_1'],
									}

				setDataSourceOptions(dataStruct);
			});
	}, []);

	const fetchSmsByCustomers = useCallback(async (customerNo = '') => {
		// await fetch(`${process.env.REACT_APP_API_DOMAIN}/admin/sms2/customer?sessionId=${sessionId}&custNo=${`9000180`}`)
		await fetch(`${process.env.REACT_APP_API_DOMAIN}/admin/sms/customer?sessionId=${sessionId}&custNo=${customerNo}`)
			.then((res) => {
				return res.json()
			})
			.then((res) => {
				// console.log('res.data: ', res.data);
				setConvoByCustomer(res.data);
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

		await fetch(`${process.env.REACT_APP_API_DOMAIN}/admin/sms2?sessionId=${sessionId}`, optionHeaders)
			.then((res) => {
				return res.json()
			})
			.then((res) => {
				if (res.status === 'Error') {
					navigate('/');
					return;
				}
				// console.log('res: ', res);

				notification('SMS has been sent!', 'success');
			});
	}, []);

	async function handleSubmit(e) {
		if (!isSet(currentCustomer, 'PHONE_1')) {
			notification('Please select a client.', 'error');
			return;
		}

		// if (!validator.isMobilePhone(currentCustomer.PHONE_1, 'en-US')) {
		// 	notification('Mobile number is not a US phone number.', 'error');
		// 	return;
		// }

		// Vincent cellphone number: 808-341-9365

		const sms = { recipient: currentCustomer.PHONE_1, smsMessage: smsMessage };
		// console.log('sms: ', sms);
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

	function textMsgInputHandler(event) {
		setSmsMessage(event.target.value);
		const maxlength = 160;
		const currentLength = event.target.value.length;

		if (currentLength > maxlength) {
			console.log("You have reached the maximum number of characters.");
			return;
		}

		setSmsRemainingChar((maxlength - currentLength) + '/160');
	}

	function renderListItem(item) {
		// console.log('item: ', item);
		return (
			<div>
				<div>{item.CUST_NO}</div>
				<div className="customer-list">
					<div className="name">{item.NAM}</div>
					<div className="phone">{item.PHONE_1}</div>
					<div className="address">{item.ADRS_1}</div>
				</div>
				{/*<div className="price-container">
					<div className="price"></div>
						&nbsp;
					<div className="caption">per<br />night</div>
				</div>*/}
			</div>
		);
	}

	// function renderConversation() {
	// 	// return conversationTemplate();
	// 	return "";
	// }

	async function handleListSelectionChange(e) {
		const current = e.addedItems[0];
		setCurrentCustomer(current);
		setSelectedItemKeys([current.CUST_NO]);
		await fetchSmsByCustomers(current.CUST_NO);
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
							selectedItemKeys={selectedItemKeys}
							onSelectionChanged={async (e) => await handleListSelectionChange(e)}
							itemRender={renderListItem}
							// groupRender={null}
							elementAttr={{ class: 'list' }}
						/>
					</div>
				</div>
				<div className="col-8">
					<div className="row">
						<MDBCol md="6" lg="7" xl="8">
							{currentCustomer?.CUST_NO}
						</MDBCol>
					</div>
					<div className="row">
						<MDBCol md="6" lg="7" xl="8">
							<div className="header">
								<div className="name-container">
									<div className="name">{currentCustomer?.NAM}</div>
								</div>
								<div className="mobile-phone-container pt-2">
									<div className="name">
										<i className={`dx-icon dx-icon-tel`}></i>
										<span className="ms-2">{currentCustomer?.PHONE_1}</span>
									</div>
								</div>
							</div>
						</MDBCol>
					</div>
					<div className="row">
						<MDBCol md="6" lg="7" xl="8">
							{currentCustomer?.ADRS_1}
						</MDBCol>
					</div>
					<div className="row">
						<MDBCol md="6" lg="7" xl="8">
							<hr />
						</MDBCol>
					</div>
					<div className="row">
						<MDBCol md="6" lg="7" xl="8">
							<div style={{height: '550px', overflowY: 'auto'}}>
								<MDBTypography listUnStyled>
									{conversationTemplate(convoByCustomer)}
									<li className="d-flex justify-content-between mb-4">
										<img
											src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-6.webp"
											alt="avatar"
											className="rounded-circle d-flex align-self-start me-3 shadow-1-strong"
											width="60"
										/>
										<MDBCard>
											<MDBCardHeader className="d-flex justify-content-between p-3">
												<p className="fw-bold mb-0">Brad Pitt</p>
												<p className="text-muted small mb-0">
													<MDBIcon far icon="clock" /> 10 mins ago
												</p>
											</MDBCardHeader>
											<MDBCardBody>
												<p className="mb-0">
													Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
													do eiusmod tempor incididunt ut labore et dolore magna
													aliqua.
												</p>
											</MDBCardBody>
										</MDBCard>
									</li>
								</MDBTypography>
							</div>
							<MDBTextArea
								label="Message"
								rows={4}
								style={{background: 'white'}}
								onChange={(e) => { textMsgInputHandler(e) }}
								maxLength={160}
							/>
							<MDBBtn color="info" rounded className="float-end" onClick={async (e) => await handleSubmit(e)}>
								Send
							</MDBBtn>
						</MDBCol>
					</div>
				</div>
			</div>
		</div>
	)
}
