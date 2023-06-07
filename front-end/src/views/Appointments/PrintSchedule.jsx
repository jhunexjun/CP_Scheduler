import { useState, memo } from 'react';

import { Popup, ToolbarItem } from 'devextreme-react/popup';

import { PDFViewer } from '@react-pdf/renderer';

import scheduleDocumentContainer from './Print/scheduleDocumentContainer';

const PrintSchedule = (params) => {
	let { popupVisible, setShowPrintPopup, selectedView, scheduleData } = params;

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
			width={900}
			height={640}>
			<ToolbarItem
				widget="dxButton"
				toolbar="bottom"
				location="after"
				options={closeButtonOptions}
			/>
			<PDFViewer width={'100%'} height={'100%'}>{scheduleDocumentContainer(params)}</PDFViewer>
		</Popup>
	);
}

export default memo(PrintSchedule);