import React, { useState } from 'react';
import { Popup, ToolbarItem } from 'devextreme-react/popup';
import UilTable from '@iconscout/react-unicons/icons/uil-table';
import { DataGrid, Column, Selection, Paging, /*FilterRow, SearchPanel*/ Editing } from 'devextreme-react/data-grid';
import { notification, isSet } from '../../utils/util'

export default (props) => {
	const [popupVisible, setPopupVisible] = useState(false);

	const dataGridRef = React.createRef();

	// console.log('props.data: ', props.data);

	function onSelectionChanged(e) {

	}

	// function onCellDblClick(e) {

	// }

	function onClickPopup() {
		if (!props.showPdfViewer) {
			notification('No PDF found.', 'error');
			return;
		}

    if (props.data.documentIsSigned === 'Y') {
      notification('Cannot modify signed document.', 'error');
      return;
    }

		setPopupVisible(true);
	}

	function saveBtnAction() {
		props.setShowPdfViewer(false);

		const updatedDataGrid = dataGridRef.current.instance.getDataSource().items();

    if (updatedDataGrid.length > 0) {
      const tableArray = [];

      updatedDataGrid.forEach((current, index) => {
        if (current.newQty === null || current.newQty === undefined)
          return;

        let newQtyTable = {
          itemNo: current.ITEM_NO,
          descr: current.DESCR,
          SalesQty: current.SalesQty,
          newQty: current.newQty
        }

        tableArray.push(newQtyTable);
      });

      // console.log('tableArray: ', tableArray);

      props.setTableNewQtyJson(JSON.stringify(tableArray));
    }

		setTimeout(() => {
			props.setShowPdfViewer(true);
			setPopupVisible(false);
		}, 500)
	}

	const saveBtn = {
		text: 'Save',
		onClick: () => saveBtnAction(),
	}

	const closeBtn = {
		text: 'Close',
		onClick: () => setPopupVisible(false)
	}

	return (
		<>
      <span onClick={ () => onClickPopup() } style={{cursor: 'pointer'}} title='Modify order item qty.'>
        <UilTable size="20" color="#61DAFB" />
      </span>

      <Popup
        visible={popupVisible}
        width={400}
        height={380}
        hideOnOutsideClick={true}
        showCloseButton={false}
			>
        <DataGrid
        	ref={dataGridRef}
          dataSource={isSet(props.data.rawData, 'table') ? props.data.rawData.table : [] }
          columnAutoWidth={true}
          onSelectionChanged={(e) => onSelectionChanged(e)}
          //onCellDblClick={(e) => onCellDblClick(e)}
        >
         	<Editing
         		allowUpdating={true}
         		mode='cell'
         	/>
            <Column dataField='DESCR' allowEditing={false} caption="Descr" />
            <Column dataField='SalesQty' allowEditing={false} caption="Qty" />
            <Column dataField='newQty' caption="New qty" />
            <Selection mode="single" />
            {/*<FilterRow visible={false} />
            <SearchPanel visible={false} />*/}
            <Paging defaultPageSize={10} defaultPageIndex={1} />
        </DataGrid>
        <ToolbarItem
          widget="dxButton"
          toolbar="bottom"
          location="after"
          options={saveBtn}
        />
        <ToolbarItem
          widget="dxButton"
          toolbar="bottom"
          location="after"
          options={closeBtn}
        />
      </Popup>
    </>
	)
}