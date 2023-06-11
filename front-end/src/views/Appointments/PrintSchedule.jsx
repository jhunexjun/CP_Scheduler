import { memo } from 'react';

import { Popup, ToolbarItem } from 'devextreme-react/popup';

import { PDFViewer } from '@react-pdf/renderer';

import scheduleDocumentContainer from './Print/scheduleDocumentContainer';

const PrintSchedule = (props) => {
	let { popupVisible, setShowPrintPopup } = props;

	const closeButtonOptions = {
		text: 'Close',
		onClick: () => setShowPrintPopup(false),
	}

	return (
		<Popup
			visible={popupVisible}
			dragEnabled={false}
			hideOnOutsideClick={true}
			showCloseButton={false}
			showTitle={true}
			// title="Select"
			container=".dx-viewport"
			width={1200}
			height={800}>
			<ToolbarItem
				widget="dxButton"
				toolbar="bottom"
				location="after"
				options={closeButtonOptions}
			/>
			<PDFViewer width={'100%'} height={'100%'}>{scheduleDocumentContainer(props)}</PDFViewer>
		</Popup>
	);
}

export default memo(PrintSchedule);