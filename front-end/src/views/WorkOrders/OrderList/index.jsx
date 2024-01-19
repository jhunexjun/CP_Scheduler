import React, { useState } from 'react';
import { Popup, ToolbarItem } from 'devextreme-react/popup';
import UilTable from '@iconscout/react-unicons/icons/uil-table';
import { DataGrid, Column, Selection, Paging, Editing, Scrolling, Lookup } from 'devextreme-react/data-grid';
import { notification, isSet } from '../../../utils/util'

import { modifyReason } from './ModifyReasonData';

const Workorder = (props) => {
	const [popupVisible, setPopupVisible] = useState(false);

	const dataGridRef = React.createRef();

	// function onSelectionChanged(e) {

	// }

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

  function sanitize(item) {
    if (item.newQty === '') item.newQty = null;

    if (item.newQty === undefined) item.newQty = null

    if (item.reasonId === null) item.reasonId = 0;

    if (item.reasonId === undefined) item.reasonId = 0;

    return item;
  }

	function saveBtnAction() {
    let allowSave = true;
		props.setShowPdfViewer(false);

		const updatedDataGrid = dataGridRef.current.instance.getDataSource().items();
    // const updatedDataGrid = props.data.rawData.table;

    if (updatedDataGrid.length === 0) {
      notification('No input qty found.', 'error');
      return;
    }

    const tableNewQty = [];

    updatedDataGrid.every((current) => {
      current = sanitize(current);

      if (current.newQty === null && current.reasonId > 0) { // null and >0
        allowSave = false;
        notification('Please enter qty in every reason.', 'error');
        props.setShowPdfViewer(true);
        return false;
      }

      if (current.newQty !== null && current.reasonId === 0) {  // 0,1,2,3 and 0
        allowSave = false;
        notification('Please enter reason in every modified qty', 'error');
        props.setShowPdfViewer(true);
        return false;
      }

      if (parseFloat(current.newQty) < 0) {
        allowSave = false;
        notification('New qty must be greater than zero.', 'error');
        return false;
      }

      // Disregard same qty but allow saving.
      if (parseFloat(current.SalesQty) === parseFloat(current.newQty)) {
        props.setData(prevData => {
          let newData = { ...prevData }
          newData.rawData.table[0].newQty = null;
          newData.rawData.table[0].reasonId = null;

          return newData;
        });

        // let's overwrite since nothing real change.
        current.newQty = null;
        current.reasonId = null;
        // return false;
      }

      // Do not allow bigger than sales qty.
      if (parseFloat(current.SalesQty) < parseFloat(current.newQty)) {
        allowSave = false;
        notification('New qty is bigger than sales qty', 'error');
        return false;
      }

      if ((parseFloat(current.newQty) < parseFloat(current.SalesQty))
            && (current.reasonId == 0)) {
        allowSave = false;
        notification('(3) Please enter reason in every modified qty', 'error');
        props.setShowPdfViewer(true);
        return false;
      }

      let newQtyTable = {
        itemNo: current.ITEM_NO,
        descr: current.DESCR,
        SalesQty: current.SalesQty,
        newQty: current.newQty,
        reasonId: current.reasonId
      }

      tableNewQty.push(newQtyTable);
      return true;
    });

    if (!allowSave) return;

    props.setTableNewQtyJson(JSON.stringify(tableNewQty));

		setTimeout(() => {
			props.setShowPdfViewer(true);
			setPopupVisible(false);
		}, 500)
	}

	const saveBtn = {
		text: 'Save',
		onClick: () => saveBtnAction(),
	}

  const resetBtn = {
    text: 'Reset',
    onClick: async () => await props.fetchWorkorder() // Resets from the server.
  }

	const closeBtn = {
		text: 'Close',
		onClick: () => setPopupVisible(false)
	}

	return (
		<>
      <span onClick={ () => onClickPopup() } style={{cursor: 'pointer'}} title='Modify qty ordered.'>
        <UilTable size="20" color="#38A5E4" />
      </span>

      <Popup
        visible={popupVisible}
        width={700}
        height={380}
        hideOnOutsideClick={true}
        showCloseButton={false}
			>
        <DataGrid
        	ref={dataGridRef}
          dataSource={isSet(props.data.rawData, 'table') ? props.data.rawData.table : [] }
          columnAutoWidth={true}
          // onSelectionChanged={(e) => onSelectionChanged(e)}
          //onCellDblClick={(e) => onCellDblClick(e)}
          height={250}
        >
          <Editing allowUpdating={true} mode="batch" /*mode='cell'*/ />
          <Paging defaultPageSize={10} defaultPageIndex={1} />
          <Scrolling mode='standard' />
          <Selection mode="single" />

          <Column dataField='DESCR' allowEditing={false} caption="Descr" />
          <Column dataField='SalesQty' allowEditing={false} caption="Qty" />
          <Column dataField='newQty' caption="New qty" />

          <Column dataField="reasonId" caption="Reason" width={125}>
            <Lookup dataSource={modifyReason} valueExpr="id" displayExpr="descr" />
          </Column>
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
          options={resetBtn}
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

export default Workorder;