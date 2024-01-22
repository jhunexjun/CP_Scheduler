/* Notes:
 * 12/26/2023 HST: Francis: No need to restrict duplicate mobile numbers in Counterpoint.
 */

import { useCallback, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import Cookies from 'universal-cookie';

import 'devextreme-react/text-area';
import List from 'devextreme-react/list';
import ArrayStore from 'devextreme/data/array_store';

import { uriEncode, isSet, notification } from '../../utils/util';
import './styles.css';
// import { searchMobileNoByInboxId } from './util';

import { Row, Col, Card, CardBody, Button } from 'reactstrap';

import conversationTemplate from './conversationTemplate';

import {
  MDBTypography,
  MDBTextArea,
} from "mdb-react-ui-kit";

// import 'mdb-react-ui-kit/dist/css/mdb.min.css'; do not use this, it affects the UI of the entire system.
import "@fortawesome/fontawesome-free/css/all.min.css";

import validator from 'validator';

function Sms() {
	let { custNo } = useParams();

	const [, setSmsRemainingChar] = useState('160/160');
	let [smsMessage, setSmsMessage] = useState('');	// text message on write textbox.
	const [convoByCustomer, setConvoByCustomer] = useState([]);
	const [currentCustomer, setCurrentCustomer] = useState(undefined);
	const [listSearchValue, setListSearchValue] = useState('');

	const [dataSourceOptions, setDataSourceOptions] = useState(null);

	// const navigate = useNavigate();

	const cookies = new Cookies();

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
	const fetchSmsByCustomer = useCallback(async (customerNo = '') => {
		if (customerNo === '') return;

		await fetch(`${process.env.REACT_APP_API_DOMAIN}/admin/sms/customer?sessionId=${cookies.get('sessionId')}&custNo=${customerNo}`)
			.then((res) => {
				return res.json()
			})
			.then((res) => {
				setConvoByCustomer(res.data);
			});
	}, []);

	useEffect(() => {
		fetchCustomers();
		setListSearchValue(custNo);

		// let customersTimer = fetchCustomersTimer();
		let smsByCustTimer = fetchSmsBySelectedCustTimer(currentCustomer);

		return () => {
			// clearInterval(customersTimer);
			clearInterval(smsByCustTimer);
		};

	// }, [currentCustomer]);
	}, []);

	// useEffect(() => {
	// 	let customersTimer = fetchCustomersTimer();

	// 	return () => {
	// 		clearInterval(customersTimer);
	// 	};
	// }, []);

	// function fetchCustomersTimer() {
	// 	return setInterval(async () => {
	// 		await fetchCustomers();
	// 	}, 8000);
	// }

	const fetchSmsBySelectedCustTimer = (currentCustomer) => {
		if (currentCustomer === undefined || currentCustomer === null)
			return null;

		return setInterval(async () => {
				await fetchSmsByCustomer(currentCustomer.CUST_NO);
			}, 8000);
	}

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
					notification(res.message, 'error');
					return;
				}
				notification('SMS has been sent!', 'success');
				setSmsMessage('');
				await fetchSmsByCustomer(sms.customerNo);
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
		else
			return '';
	}

	function renderListItem(item) {
		return (
			<div className="d-flex flex-row justify-content-between">
				<div className="cmpt-customer-list">
					<div>Cust. No. {item.CUST_NO}</div>
					<div className="name">{item.NAM}</div>
					<div className="phone">{item.MBL_PHONE_1}</div>
					<div className="address">{item.ADRS_1}</div>
				</div>
				<div className="pt-4">
					<span className="badge bg-danger float-end">{smsNewMessage(item)}</span>
				</div>
			</div>
		);
	}

	async function handleListSelectionChange(e) {
		const current = JSON.parse(JSON.stringify(e.addedItems[0]));

		setCurrentCustomer(current);
		await fetchSmsByCustomer(current.CUST_NO);

		// facilitate the timer for selected customer.
		// clearInterval(intervalIdSmsByCust);
		// let returnIntervalId = fetchSmsBySelectedCustTimer(current);
		// setIntervalIdSmsByCust(returnIntervalId);
	}

	function onSelectedItemKeysChanged(e) {
		if (e.fullName === 'searchValue') {
			// clearInterval(intervalIdSmsByCust);
			setCurrentCustomer(null);
			setConvoByCustomer([]);
			setListSearchValue(e.value);
		}
	}

	return (
		<div className="content">
			<Row>
				<Col md="12">
					<Card id="sms-card">
						<CardBody>
							<div className="d-flex align-items-strech flex-row gap-2" style={{height: '81.5vh'}}>
								<div className="w-25">
									<List
										selectionMode="single"
										dataSource={dataSourceOptions}
										grouped={false}
										searchEnabled={true}
										onSelectionChanged={async (e) => await handleListSelectionChange(e)}
										itemRender={renderListItem}
										elementAttr={{ class: 'list' }}
										onOptionChanged={onSelectedItemKeysChanged}
										searchValue={listSearchValue}
									/>
								</div>
								<div className="w-50 ml-4 cmpt-customer-and-text">
									{/* <div className="d-flex flex-column p-2 align-items-strech"> */}
										<div className="d-flex flex-column p-2 align-items-strech">
											<div className="mb-2" /* style={{minHeight: '67px'}} */>
												<div className="cmpt-customer-no">Customer no.: { currentCustomer?.CUST_NO }</div>
												<div className="d-flex flex-row">
													<div className="cmpt-customer-name mr-auto">{currentCustomer?.NAM}</div>
													{currentCustomer ? (<i className={`dx-icon dx-icon-tel`}></i> ) : ``}
													<span className="ms-1">{currentCustomer?.MBL_PHONE_1}</span>
												</div>
												<div>
													<span>
														<span className="mr-2">{ currentCustomer ? (<i className={`nc-icon nc-istanbul`}></i>): null }</span>
														<span>{currentCustomer?.ADRS_1 }</span>
													</span>
												</div>
											</div>
											<div><hr className="cmpt-hr" /></div>
											<div className="d-flex flex-column p-2 align-items-strech">
												<MDBTypography listUnStyled style={{overflowY: 'auto', height: '49.5vh'}}>
													{conversationTemplate(convoByCustomer)}
												</MDBTypography>
											</div>
											<div>
												<MDBTextArea
													rows={4}
													style={{background: '#fafafa'}}
													onChange={(e) => { textMsgInputHandler(e) }}
													maxLength={160}
													value={smsMessage}
													id="cmpt-textbox"
												/>
											</div>
											<div className="text-right">
												<Button className="btn-round" color="primary" onClick={async (e) => await handleSubmit(e)}>
												  Send
												</Button>
											</div>
										</div>
									{/* </div> */}
								</div>
							</div>
						</CardBody>
					</Card>
				</Col>
			</Row>
		</div>
	)
}

export default Sms;