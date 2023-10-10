import {
  Document,
  Page,
  StyleSheet,
  BlobProvider
} from "@react-pdf/renderer";

import HeadersContent from './Header/HeadersContent';
import TableIndex from './TableData/TableIndex';
import WorkOrderNotes from './WorkOrderNotes/WorkOrderNotes';
import PolicyIndex from './Policy/PolicyIndex';
import Signature from './Signature/Signature';


const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    margin: 30,
    fontSize: 7,
    lineHeight: 1.2,
  },
});


const workOrderDocumentContainer = (props) => {
  // console.log('dfsdfs props: ', props);

  return (
          <Document>
            <Page size='LETTER' style={styles.page}>
              <HeadersContent {...props} />
              <TableIndex {...props} />
              <WorkOrderNotes {...props} />
              <PolicyIndex />
              <Signature {...props} />
            </Page>
          </Document>
        )
}

export default workOrderDocumentContainer