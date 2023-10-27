import { useState, useCallback, } from "react";
import { useNavigate } from 'react-router-dom';

import Cookies from 'universal-cookie';

import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/TextLayer.css';
import 'react-pdf/dist/Page/AnnotationLayer.css';

import { PDFViewer, pdf } from '@react-pdf/renderer';
import workOrderDocumentContainer from './Prints/WorkOrderDocumentContainer';

// import PdfViewerComponent from '../../components/PdfViewerComponent';

import JsBarcode from 'jsbarcode';

// See it live, https://iconscout.com/unicons/free-line-icons
import UilSearchAlt from '@iconscout/react-unicons/icons/uil-search-alt';
import UilListUl from '@iconscout/react-unicons/icons/uil-list-ul';

import { isNullOrWhiteSpace, notification } from '../../utils/util';
import ResendDocument from './ResendDocument';
import SavePdfToFlatFile from './SavePdfToFlatFile'
import Signature from './Signature';
import OrderList from './OrderList';

// https://js.devexpress.com/Documentation/Guide/UI_Components/Popup/Getting_Started_with_Popup/
import { Popup, ToolbarItem } from 'devextreme-react/popup';
// import ScrollView from 'devextreme-react/scroll-view';
import { DataGrid, Column, Selection, Paging, FilterRow, SearchPanel } from 'devextreme-react/data-grid';

// import DefaultData from './DefaultData';

const adminUrl = process.env.REACT_APP_API_DOMAIN + '/admin';

export default () => {
  const [invoiceNo, setInvoiceNo] = useState(''); // invoiceNo = workorder no.
  // const [data, setData] = useState(DefaultData);
  const [data, setData] = useState({});
  const [popupVisible, setPopupVisible] = useState(false);
  const navigate = useNavigate();
  const [workOrders, setWorkOrders] = useState([]);
  const [showPdfViewer, setShowPdfViewer] = useState(false);
  const [selectedWorkOrderNo, setSelectedWorkOrderNo] = useState(null);

  // const [docIsModified, setDocIsModified] = useState(false);
  const [sigPad, setSigPad] = useState(null);
  // Note: data.documentIsSigned is different which is from the server. Below is local only. Don't use interchangeably.
  const [documentIsSigned, setDocumentIsSigned] = useState(false);
  // const [psPdfKitInstance, setPsPdfKitInstance] = useState(null);
  const [tableNewQtyJson, setTableNewQtyJson] = useState(null);

  const cookies = new Cookies();

  const [numPages, /*setNumPages*/] = useState(null);
  pdfjs.GlobalWorkerOptions.workerSrc = '/static/js/pdfjs-dist/build/pdf.worker.min.js';

  const fetchWorkorderDataCb = useCallback(async (invoiceNo) => {
    if (sigPad != null)
      sigPad.clear();

    setSigPad(null);

    // return await fetch(`${adminUrl}/workorder?sessionId=${cookies.get('sessionId')}&workOrderNo=${invoiceNo}&rawData=${rawData}`)
    return await fetch(`${adminUrl}/workorder?sessionId=${cookies.get('sessionId')}&workOrderNo=${invoiceNo}`)
      .then((res) => {
        return res.json()
      })
      .then(async (response) => {
        if (response.status === 'Error') {
          navigate('/');
          return;
        }

        if (response.data.rawData !== null && response.data.rawData.table.length > 0) {
          response.data.rawData.barcode.base64 = getImgBase64String(response.data.rawData.table[0].TKT_NO);
        }

        setData(response.data);
        setDocumentIsSigned(response.data.documentIsSigned === 'Y');
        setShowPdfViewer(true);

        return response.data;
      });
  }, []);

  const fetchWorkorderListCb = useCallback(async () => {
    await fetch(`${process.env.REACT_APP_API_DOMAIN}/admin/invoiceslist?sessionId=${cookies.get('sessionId')}`)
      .then((res) => {
        return res.json()
      })
      .then((res) => {
        setWorkOrders(res.data);
      });
  }, []);

  function getImgBase64String(value) {
    const barcodeNode = document.getElementById('barcode');
    JsBarcode(barcodeNode, value, {displayValue: false});
    return barcodeNode.src;
  }

  async function fetchWorkorder() {
    if (isNullOrWhiteSpace(invoiceNo)) {
      notification('Enter workorder number.', 'error');
      return
    }

    setShowPdfViewer(false);
    await fetchWorkorderDataCb(invoiceNo);
  }

  const selectButtonOptions = {
    text: 'Select',
    onClick: hideAndSelect,
  }

  const closeButtonOptions = {
    text: 'Close',
    onClick: () => { setPopupVisible(false) },
  }

  async function hideAndSelect() {
    setInvoiceNo(selectedWorkOrderNo);
    setPopupVisible(false);
    await fetchWorkorder();
  }

  async function showWorkorderList() {
    // setShowPdfViewer(false);

    setPopupVisible(true);
    await fetchWorkorderListCb();
  }

  function onSelectionChanged({ selectedRowsData }) {
    setShowPdfViewer(false);
    const data = selectedRowsData[0];

    setSelectedWorkOrderNo(data && data.TKT_NO);
    setInvoiceNo(data.TKT_NO);
  }

  async function onCellDblClick(e) {
    setSelectedWorkOrderNo(e.values[2]);
    setInvoiceNo(e.values[2]);
    setPopupVisible(false);
    setShowPdfViewer(false);
    await fetchWorkorder();
  }

  const pdfBlob = async () => await pdf(workOrderDocumentContainer(data.rawData)).toBlob();

  // function onDocumentLoadSuccess(nextNumPages) {
  //   setNumPages(nextNumPages ?? 0);
  // }

  const options = {
    cMapUrl: '/cmaps/',
  };

  return (
    <div className="content">
      <div className="row">
        <div className="col">
          <div style={{display: 'none'}}>
            <img id="barcode" alt='' />
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <div className="row g-3 align-items-center">
            <div className="col-auto">
              <label htmlFor="inputWorkorderNo" className="col-form-label">Workorder #</label>
            </div>
            <div className="col-auto">
              <input type="text" id="inputWorkorderNo" className="form-control" value={invoiceNo} onChange={(e) => setInvoiceNo(e.target.value)} />
            </div>
            <div className="col-auto">
              <span onClick={ async () => await fetchWorkorder() } style={{cursor: 'pointer'}} title="Show a workorder">
                <UilSearchAlt size="20" color="#61DAFB" />
              </span>
            </div>
            <div className="col-auto">
              <span onClick={ async () => await showWorkorderList() } style={{cursor: 'pointer'}} title="Show the list of workorders" >
                <UilListUl size="20" color="#61DAFB" />
              </span>
            </div>
            <div className="col-auto">
              <ResendDocument
                showPdfViewer={showPdfViewer}
                workOrderNo={invoiceNo}
                pdfBlob={pdfBlob}
                documentIsSigned={documentIsSigned}
              />
            </div>
            <div className="col-auto">
              <Signature
                data={data}
                setData={setData}
                showPdfViewer={showPdfViewer}
                setShowPdfViewer={setShowPdfViewer}
                workOrderNo={invoiceNo}
                setDocumentIsSigned={setDocumentIsSigned}
                // psPdfKitInstance={psPdfKitInstance}
                // fetchWorkorderDataCb={fetchWorkorderDataCb}
                sigPad={sigPad}
                setSigPad={setSigPad}
                //setDocIsModified={setDocIsModified}
              />
            </div>
            <div className="col-auto">
              <OrderList
                data={data}
                setData={setData}
                showPdfViewer={showPdfViewer}
                setShowPdfViewer={setShowPdfViewer}
                setTableNewQtyJson={setTableNewQtyJson}
              />
            </div>
            <div className="col-auto">
              <SavePdfToFlatFile
                data={data}
                // setData={setData}
                showPdfViewer={showPdfViewer}
                setShowPdfViewer={setShowPdfViewer}
                //psPdfKitInstance={psPdfKitInstance}
                workorderNo={invoiceNo}
                documentIsSigned={documentIsSigned}
                sigPad={sigPad}
                fetchWorkorderDataCb={fetchWorkorderDataCb}
                pdfBlob={pdfBlob}
                tableNewQtyJson={tableNewQtyJson}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col">
          {
            showPdfViewer
            ?
              // <PdfViewerComponent
              //   workOrderNo={invoiceNo}
              //   blobDocument={ pdfBlob }
              //   data={data}
              //   setPsPdfKitInstance={setPsPdfKitInstance}
              // />

                data.documentIsSigned === 'Y'
                ?
                  <div className="d-flex justify-content-center overflow-auto vh-100 shadow bg-secondary">
                    <Document file={`data:application/pdf;base64,${data.pdf.base64 ?? ''}`} options={options}>
                      {Array.from(new Array(numPages), (el, index) => (
                        <Page key={`page_${index + 1}`} pageNumber={index + 1} className="border mb-1" />
                      ))}
                    </Document>
                  </div>
                :
                  <PDFViewer width={'100%'} height={700}>{workOrderDocumentContainer(data.rawData)}</PDFViewer>
            :
            null
          }
        </div>
      </div>
      <div className="row">
        <div className="col">
          <Popup
            visible={popupVisible}
            //onHiding={this.hideInfo}
            dragEnabled={false}
            hideOnOutsideClick={true}
            showCloseButton={false}
            showTitle={true}
            // title="Select"
            // container=".dx-viewport"
            container=".content"
            width={900}
            height={640}>
            <ToolbarItem
              widget="dxButton"
              toolbar="bottom"
              location="after"
              options={selectButtonOptions}
            />
            <ToolbarItem
              widget="dxButton"
              toolbar="bottom"
              location="after"
              options={closeButtonOptions}
            />
            <DataGrid
              dataSource={workOrders}
              columnAutoWidth={true}
              onSelectionChanged={(e) => onSelectionChanged(e)}
              onCellDblClick={async (e) => await onCellDblClick(e)}>
                <Column dataField="BILL_NAM" caption="Customer Name" />
                <Column dataField="BILL_PHONE_1" caption="Phone" />
                <Column dataField="TKT_NO" caption="Workorder #" />
                <Column dataField="TKT_DAT" dataType="date" caption="Date" />
                <Column dataField="USR_MAKE" caption="Car make" />
                <Column dataField="USR_MODEL" caption="Car model" />
                <Column dataField="USR_LIC_PLATE" caption="Plate #" />
                <Column dataField="USR_VIN_NO" caption="VIN #" />
                <Selection mode="single" />
                <FilterRow visible={true} />
                <SearchPanel visible={true} />
                <Paging defaultPageSize={10} defaultPageIndex={1} />
            </DataGrid>
          </Popup>
        </div>
      </div>

    </div>
  )
}
