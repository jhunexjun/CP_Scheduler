import { useContext } from 'react';
import { SystemUserContext } from '../../../../Context/SystemUserContext';

import { View, Text, StyleSheet, Image } from '@react-pdf/renderer';

import logo from '../../../../assets/compuTant/img/total-offroad-more-transparent.png';

import HeaderAddrsFrom from '../../../Workorders/Prints/Header/HeaderAddrsFrom';

import moment from 'moment';

const styles = StyleSheet.create({
	headerRightContainer: {
							width: 150,
							border: 0.5,
							borderRadius: 3,
							fontWeight: 'ultrabold',
							padding: 5,
						},
	headerLeftPortion: { fontSize: 32, width: 400, fontStyle: 'oblique', /*backgroundColor: 'yellow'*/ },
	label: {
		marginBottom: 5,
		fontWeight: 'ultrabold'
	},
	textValue: {
		color: '#696969',
	},
	logo: {
		width: 150,
		height: 55,
		margin: 10,
	},
});

const SchedulePrintIndex = (props) => {
	const sysUserContext = useContext(SystemUserContext);

	const { selectedView, currentSchedulerDate } = props;

	function getSDate() {
		if (selectedView === 'Day') {
			return moment(currentSchedulerDate).format('MM/DD/YYYY');
		} else if (selectedView === 'Week') {
			const dayNumOfWeek = moment(currentSchedulerDate).format('d');	// starts at 0 as Sunday, 6 as Saturday.
			return moment(currentSchedulerDate).subtract(dayNumOfWeek, 'days').format('MM/DD/YYYY');
		} else {
			return moment().startOf('month').format('MM/DD/YYYY');
		}
	}

	function getEDate() {
		if (selectedView === 'Day') {
			return moment(currentSchedulerDate).format('MM/DD/YYYY');
		} else if (selectedView === 'Week') {
			const dayNumOfWeek = moment(currentSchedulerDate).format('d');	// starts at 0 as Sunday, 6 as Saturday.

			// return moment(currentSchedulerDate).add((6 - dayNumOfWeek) + dayNumOfWeek, 'days').format('MM/DD/YYYY');
			return moment(currentSchedulerDate).add((6 - dayNumOfWeek), 'days').format('MM/DD/YYYY');
		} else {
			return moment().endOf('month').format('MM/DD/YYYY');
		}
	}



	return (<View style={{flexDirection: 'row'}} wrap={false}>
		<View style={{flexDirection: 'row', width: 400}}>
			<Image src={logo} style={styles.logo} />
			<HeaderAddrsFrom />
		</View>
		<View style={styles.headerRightContainer}>
			<Text style={styles.label}>Snapshot:</Text>
			<View>
				<Text>{ `Date From: ` }
					<Text style={styles.textValue}>{ getSDate() }</Text>
				</Text>
				<Text>{ `Date To: ` }
					<Text style={styles.textValue}>{ getEDate() }</Text>
				</Text>
				<Text>{ `Location: ` }
					<Text style={styles.textValue}>{ sysUserContext.location }</Text>
				</Text>
				<Text>{ `Printed By: ` }
					<Text style={styles.textValue}>{ sysUserContext.user.id }</Text>
				</Text>
			</View>
		</View>
	</View>);
};

export default SchedulePrintIndex;