import { useCallback, useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import Cookies from 'universal-cookie';

import 'devextreme-react/text-area';
import List from 'devextreme-react/list';
import ArrayStore from 'devextreme/data/array_store';
// import TileView from 'devextreme-react/tile-view';

// import LabelTemplate from './LabelTemplate';
// import LabelNotesTemplate from './LabelNotesTemplate';
// import smsData from './data';

import { uriEncode, isSet, notification } from '../../utils/util';
import './styles.css';
import { Row, Col, Card, CardBody, Button } from 'reactstrap';

import conversationTemplate from './conversationTemplate';

import {
  // MDBContainer,
  // MDBRow,
  MDBCol,
  // MDBCard,
  // MDBCardBody,
  // MDBIcon,
  MDBBtn,
  MDBTypography,
  MDBTextArea,
  // MDBCardHeader,
} from "mdb-react-ui-kit";

// import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";

import validator from 'validator';

export default () => {
	// const [formInstance, setFormInstance] = useState(null);
	const [smsRemainingChar, setSmsRemainingChar] = useState('160/160');
	// let [recipient, setRecipient] = useState('');
	let [smsMessage, setSmsMessage] = useState('');	// text message on write textbox.
	// let [sentSms, setSentSms] = useState([]);
	// let [outboxSms, setOutboxSms] = useState([]);
	// const [selectedItemKeys, setSelectedItemKeys] = useState([0]);
	const [convoByCustomer, setConvoByCustomer] = useState([]);
	const [currentCustomer, setCurrentCustomer] = useState(undefined);
	// const [intervalIdSmsByCust, setIntervalIdSmsByCust] = useState(undefined);	// timer to fetch sms by a customer.
	// const [intervalIdCust, setIntervalIdCust] = useState(undefined);	// timer to fetch customers.

	const [dataSourceOptions, setDataSourceOptions] = useState(null);

	const messagesEndRef = useRef();

	const [rerender, setRerender] = useState(false);

	const navigate = useNavigate();

	const cookies = new Cookies();

	// const fetchSms = useCallback(async () => {
	// 	await fetch(`${process.env.REACT_APP_API_DOMAIN}/admin/sms2?sessionId=${sessionId}`)
	// 		.then((res) => {
	// 			return res.json()
	// 		})
	// 		.then((res) => {
	// 			setSentSms(filterSms(res.data, 'Sent'));
	// 			setOutboxSms(filterSms(res.data, 'Outbox'));
	// 		});
	// }, []);

	const fetchCustomers = useCallback(async () => {
		await fetch(`${process.env.REACT_APP_API_DOMAIN}/admin/customers?sessionId=${cookies.get('sessionId')}`)
			.then((res) => {
				return res.json()
			})
			.then((res) => {
				const data = res.data;
				const dataStruct = { store: new ArrayStore({
											data,	// data should be named 'data'
											key: 'CUST_NO',
										}),
										searchExpr: ['CUST_NO', 'NAM', 'ADRS_1', 'EMAIL_ADRS_1', 'MBL_PHONE_1'],
									}

				setDataSourceOptions(dataStruct);
			});
	}, [currentCustomer]);

	// Upon customer selection.
	const fetchSmsByCustomers = useCallback(async (customerNo = '') => {
		if (customerNo === '') return;

		await fetch(`${process.env.REACT_APP_API_DOMAIN}/admin/sms/customer?sessionId=${cookies.get('sessionId')}&custNo=${customerNo}`)
			.then((res) => {
				return res.json()
			})
			.then((res) => {
				setConvoByCustomer(res.data);
				scrollToBottom();
			});
	}, []);

	useEffect(() => {
		//fetchSms();
		fetchCustomers();

		let customersTimer = fetchCustomersTimer();
		let smsByCustTimer = fetchSmsByCustTimer(currentCustomer);

		return () => {
			clearInterval(customersTimer);
			clearInterval(smsByCustTimer);
		};

	}, [currentCustomer]);
	// }, []);

	function fetchCustomersTimer() {
		return setInterval(async () => {
			await fetchCustomers();
		}, 8000);
	}

	const fetchSmsByCustTimer = (currentCustomer) => {
		if (currentCustomer === undefined || currentCustomer === null)
			return null;

		return setInterval(async () => {
				await fetchSmsByCustomers(currentCustomer.CUST_NO);
			}, 8000);
	}

	// function onInitialized(e) {
	// 	// setFormInstance(e.component);
	// }

	const postSms = useCallback(async (sms) => {
		const uriEncoded = uriEncode(sms);
		const optionHeaders = {
			method: 'POST',
			headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
			body: uriEncoded,
		};

		await fetch(`${process.env.REACT_APP_API_DOMAIN}/admin/sms2?sessionId=${cookies.get('sessionId')}`, optionHeaders)
			.then((res) => {
				return res.json()
			})
			.then(async (res) => {
				if (res.status === 'Error') {
					navigate('/');
					return;
				}
				notification('SMS has been sent!', 'success');
				setSmsMessage('');
				await fetchSmsByCustomers(sms.customerNo);
				scrollToBottom();	// not working yet.
			});
	}, []);

	async function handleSubmit(e) {
		if (!isSet(currentCustomer, 'MBL_PHONE_1')) {
			notification('Please select a client.', 'error');
			return;
		}

		if (!validator.isMobilePhone(currentCustomer.MBL_PHONE_1, ['en-US', 'en-PH'])) {
			notification('Mobile number is not a US phone number.', 'error');
			return;
		}

		// Vincent cellphone number: 808-341-9365

		const sms = { customerNo: currentCustomer.CUST_NO, recipient: currentCustomer.MBL_PHONE_1, smsMessage: smsMessage };
		await postSms(sms);
	}

	// function filterSms(data, filterBy) {
	// 	return data.reduce((prevValue, currentValue) => {
	// 		const { Status } = currentValue;
	// 		if (Status == filterBy) {
	// 			prevValue.push({	Id: currentValue.Id,
	// 						UserId: currentValue.UserId,
	// 						Recipient: currentValue.Recipient,
	// 						Sms: currentValue.Sms,
	// 						Status: currentValue.Status,
	// 						MessageSid: currentValue.MessageSid,
	// 						DateTimeSent: currentValue.DateTimeSent,
	// 					});
	// 		}

	// 		return prevValue;
	// 	}, []);
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

	function smsNewMessage(item) {
		if (parseInt(item.newSmsMsg) > 0)
			return item.newSmsMsg;
	}

	function renderListItem(item) {
		// console.log('item: ', item);
		return (
			<div className="d-flex flex-row justify-content-between">
				<div className="cmpt-customer-list">
					<div>{item.CUST_NO}</div>
					<div className="name">{item.NAM}</div>
					<div className="phone">{item.MBL_PHONE_1}</div>
					<div className="address">{item.ADRS_1}</div>
				</div>
				<div className="pt-4">
					<span className="badge bg-danger float-end">{smsNewMessage(item)}</span>
				</div>
			</div>

			// <div>
			// 	<div>{item.CUST_NO}</div>
			// 	<div className="customer-list">
			// 		<div className="name">{item.NAM}</div>
			// 		<div className="phone">{item.MBL_PHONE_1}</div>
			// 		<div className="address">{item.ADRS_1}</div>
			// 	</div>
			// 	{/*<div className="price-container">
			// 		<div className="price"></div>
			// 			&nbsp;
			// 		<div className="caption">per<br />night</div>
			// 	</div>*/}
			// </div>
		);
	}

	async function handleListSelectionChange(e) {
		const current = JSON.parse(JSON.stringify(e.addedItems[0]));

		setCurrentCustomer(current);
		// setSelectedItemKeys([current.CUST_NO]);
		await fetchSmsByCustomers(current.CUST_NO);

		// facilitate the timer for selected customer.
		// clearInterval(intervalIdSmsByCust);
		// let returnIntervalId = fetchSmsByCustTimer(current);
		// setIntervalIdSmsByCust(returnIntervalId);
	}

	function scrollToBottom() {
		messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
		setRerender(!rerender);
	}

	function onSelectedItemKeysChanged(e) {
		if (e.fullName === 'searchValue') {
			// clearInterval(intervalIdSmsByCust);
			setCurrentCustomer(null);
			setConvoByCustomer([]);
		}
	}

	return (
		<div className="content">
			<Row>
				<Col md="12">
					<Card>
						<CardBody>
							<div className="d-flex flex-row" style={{height: '685px'}}>
								<div className="w-25">
									<List
										selectionMode="single"
										dataSource={dataSourceOptions}
										grouped={false}
										searchEnabled={true}
										//selectedItemKeys={setSelectedItemKeys}
										onSelectionChanged={async (e) => await handleListSelectionChange(e)}
										itemRender={renderListItem}
										// groupRender={null}
										elementAttr={{ class: 'list' }}
										onOptionChanged={onSelectedItemKeysChanged}
									/>
								</div>
								<div className="w-50 ml-4 cmpt-customer-and-text">
									<div className="d-flex flex-column p-2">
										<div className="d-flex flex-column p-2">
											<div className="mb-2" style={{minHeight: '67px'}}>
												<div className="cmpt-customer-no">{ currentCustomer?.CUST_NO }</div>
												<div className="d-flex flex-row">
													<div className="cmpt-customer-name mr-auto">{currentCustomer?.NAM}</div>
													{currentCustomer ? (<i className={`dx-icon dx-icon-tel`}></i> ) : ``}
													<span className="ms-1">{currentCustomer?.MBL_PHONE_1}</span>
												</div>
												<div>
													<span>
														<span className="mr-2">{ currentCustomer ? (<i className={`nc-icon nc-istanbul`}></i>) : `` }</span>
														<span>{ currentCustomer?.ADRS_1 }</span>
													</span>
												</div>
											</div>
											<div><hr className="cmpt-hr" /></div>
											<div>
												<MDBTypography listUnStyled style={{overflowY: 'auto', height: '430px'}}>
													{conversationTemplate(convoByCustomer)}
												</MDBTypography>
											</div>
											<div>
												<MDBTextArea
													// label="Message"
													rows={4}
													//style={{background: 'white'}}
													onChange={(e) => { textMsgInputHandler(e) }}
													maxLength={160}
													value={smsMessage}
												/>
											</div>
											<div className="text-right">
												<Button className="btn-round" color="primary" onClick={async (e) => await handleSubmit(e)}>
												  Send
												</Button>
											</div>

										</div>
										

									</div>
								</div>
							</div>
						</CardBody>
					</Card>
				</Col>
			</Row>
		</div>
	)
}
