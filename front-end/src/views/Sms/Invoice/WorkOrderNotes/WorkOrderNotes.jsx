import { View, Text } from '@react-pdf/renderer';


const WorkOrderNotes = (props) => {

	// console.log(props);

	const notes = props.notes.map((item, index) => 
		<View key={ index + 1 }>
			<View>
				<Text>{ item.id }</Text>
			</View>
			<View>
				<Text>{ item.text }</Text>
			</View>
		</View>
	);

	return (<>
		<View>
			<Text>Work order notes:</Text>
			{ notes }
		</View>
	</>);
};

export default WorkOrderNotes;