import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Paper from '@mui/material/Paper';
import Draggable from 'react-draggable';
import OpenInNewSharpIcon from '@mui/icons-material/OpenInNewSharp';
import { Document, Page } from 'react-pdf';

function PaperComponent(props) {
  return (
    <Draggable
      handle="#draggable-dialog-title"
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper {...props} />
    </Draggable>
  );
}

function showCertificateWithFormat(data, credentialId) {

  // PDF Format
  if (data.format === 'pdf') {
    const sourceDataUrl = {url: `${data.url}/${credentialId}.${data.format}`}

    return (
      <Document
        file={sourceDataUrl}
      >
        <Page pageNumber={1} />
      </Document>
    )

  }

  // Image formats
  if (data.format === 'jpg' || data.format === 'png') {
    const sourceDataUrl = `${data.url}/${credentialId}.${data.format}`

    return (
      <>
        <img src={sourceDataUrl}></img>
      </>
    )
  }
}

export default function CertDialog(props) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="contained" color="secondary" endIcon={<OpenInNewSharpIcon />} onClick={handleClickOpen}>
        View certificate
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperComponent={PaperComponent}
        aria-labelledby="draggable-dialog-title"
        maxWidth='md'
      >
        <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
          {props.cert.title}
        </DialogTitle>
        <DialogContent>
          {showCertificateWithFormat(props.data, props.cert.credentialId)}
        </DialogContent>
        <DialogActions>
          <Button variant="contained" color="secondary" onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
