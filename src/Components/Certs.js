import * as React from 'react';
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import CertDialog from './CertDialog'

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  '&:not(:last-child)': {
    borderBottom: 0,
  },
  '&:before': {
    display: 'none',
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === 'dark'
      ? 'rgba(255, 255, 255, .05)'
      : 'rgba(0, 0, 0, .03)',
  flexDirection: 'row-reverse',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(90deg)',
  },
  '& .MuiAccordionSummary-content': {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: '1px solid rgba(0, 0, 0, .125)',
}));

const getPlatformDataType = (platform) => {
  switch (platform) {
    case 'udemy':
      return {url: 'https://udemy-certificate.s3.amazonaws.com/image', format: 'jpg'}
    case 'openwebinars':
      return {url: 'https://openwebinars.net/certificacion', format: 'pdf'}
    default:
      return {url: './certs', format: 'pdf'}
  }
}

export default function CertsAccordions(props) {
  const [expanded, setExpanded] = React.useState('panel1');

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const certsList = Object.entries(props.certs)?.map((platform, index) => {

    const {url, format} = getPlatformDataType(platform[0])
    return platform[1].map( (cert) => {

      const hours = cert?.hours 
        ? <Typography variant="h6">
            <b>Hours:</b> {cert.hours}h
          </Typography>
        : null
      const credentialId = cert?.credentialId 
        ? <Typography variant="h6">
            <b>Credential-id:</b> {cert.credentialId}
          </Typography>
        : null
      const description = cert?.description 
        ? <Typography variant="h7">
            <b>Description:</b>
            <p>
              {cert.description}
            </p>
          </Typography>
        : null

      return (
        <Accordion expanded={expanded === index} onChange={handleChange(index)}>
          <AccordionSummary aria-controls="{index}-content" id="{index}-header">
            <Typography variant="h5"><b>{cert.title}</b></Typography>
          </AccordionSummary>
          <AccordionDetails>
            {hours}
            {credentialId}
            {description}
            <CertDialog cert={cert} data={{url, format}}></CertDialog>
          </AccordionDetails>
        </Accordion>
      )
    })
  });

  return (
    <>
      {certsList}
    </>
  );
}
