import './App.css';
import React from 'react';
import Container from '@mui/material/Container';
import AccountGrid from './AccountGrid';
import ContactGrid from './ContactGrid';
import CrmService from '../CrmService';

function App() {

  const crmService = new CrmService();

  const [accounts, setAccounts] = React.useState([]);
  const [accountsLoading, setAccountsLoading] = React.useState(true);
  const [selectedAccountId, setSelectedAccountId] = React.useState(null);
  

  React.useEffect(() => {
    const loadAccounts = async () => {
      const accounts = await crmService.GetAccounts();
      setAccounts(accounts);
      setAccountsLoading(false);
    };

    loadAccounts();
  }, []);

  const onSelectAccount = (params) => setSelectedAccountId(params.row.id);  

  return (
    <Container maxWidth="lg" className="App">
      {accountsLoading ? "Loading accounts..." : <AccountGrid accounts={accounts} onSelectAccount={onSelectAccount}></AccountGrid>}
      <ContactGrid accountId={selectedAccountId} crmService={crmService}></ContactGrid>
    </Container>
    
  );
}

export default App;
