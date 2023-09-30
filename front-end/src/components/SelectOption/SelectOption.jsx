import { useState, useEffect } from 'react';
import { Label, Input, } from 'reactstrap';


export default function SelectOption(props) {
	let optionLabels = null;
	let optionSelected = null;
	let label = null;


	if (props.label === undefined || props.label == null)
		label = "Top";
	else
		label = props.label;

	if (props.optionLabels === undefined || props.optionLabels == null)
		optionLabels = [5, 10, 15, 20];
	else
		optionLabels = props.optionLabels;

	if (props.optionSelected === undefined || props.optionSelected == null)
		optionSelected = 10;
	else
		optionSelected = props.optionSelected;

	let [selectedItem, setSelectedItem] = useState(optionSelected);

	useEffect(() => {
		props.setTopXitems(selectedItem);
	}, [selectedItem]);

	const onChangeSelected = (event) => {
		setSelectedItem(event.target.value);
	}


	return (
		<>
			<Label>{label} &nbsp;</Label>
			<Input type="select" defaultValue={selectedItem} onChange={onChangeSelected}>
				{ optionLabels.map((item, key) => (<option key={key}>{ item }</option>)) }
			</Input>
		</>
	);
}