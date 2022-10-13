import React from "react";
import { DataGrid } from '@mui/x-data-grid';
import Typography from "@mui/material/Typography";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

const columns = [
    { field: 'firstname', headerName: 'Имя', width: 130 },
    { field: 'lastname', headerName: 'Фамилия', width: 130 },
    { field: 'mobilephone', headerName: 'Телефон', width: 130 },
    { field: 'emailaddress1', headerName: 'Email', width: 130 },
    { field: 'jobtitle', headerName: 'Должность', width: 130 },
  ];

function ContactGrid({accountId, accountName, crmService}) {

    const [contacts, setContacts] = React.useState([]);
    const [contactsLoading, setContactsLoading] = React.useState(false);

    React.useEffect(() => {
        const loadContacts = async () => {
          setContactsLoading(true);
          const contacts = await crmService.GetContactsByAccountId(accountId);
          setContacts(contacts);
          setContactsLoading(false);
        };
        
        if (accountId == null) return;

        loadContacts();
      }, [accountId, crmService]);


    const onAddContactClick = () => crmService.NewContactFormForAccount(accountId, accountName);

      
    const renderToolbar = () => {
      
      if (accountId == null || contactsLoading) return;

      return (
        <Stack spacing={2} direction="row">
          <Button variant="text" onClick={onAddContactClick}>Add</Button>
        </Stack>
      )
    }

    const renderContacts = () => {
        return (
            <div style={{ height: 400, width: '100%' }}>
            <DataGrid
              rows={contacts}
              columns={columns}
              pageSize={5}
              rowsPerPageOptions={[5]}
            />
          </div>
        )
    }

    return (
        <div>
            <div><Typography variant="h6" gutterBottom>Контакты</Typography></div>
            {renderToolbar()}
            <div>{contactsLoading ? "Loading contacts..." : renderContacts()}</div>
        </div>
    );
}

export default ContactGrid;