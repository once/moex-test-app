export default class CrmService {
    constructor() {
        this.Xrm = window.Xrm;
    }

    // adding 'id' field as required by MUI DataGrid, so using this helper method to init 'id' field with 'accountid' or 'contactid'
    AddGridId(objectArray, mappedField) {
        return objectArray.map(obj => ({ ...obj, id: obj[mappedField]}))
    }

    async GetAccounts() {

        try {
            const accounts = await this.Xrm.WebApi.retrieveMultipleRecords("account", `?$select=name,okir_inn,okir_kpp&$top=100`);

            if (!accounts || !Array.isArray(accounts.entities) || accounts.entities.length === 0) 
                return [];

            return this.AddGridId(accounts.entities,"accountid");
        }
        catch(ex) {
            this.Xrm.Navigation.openAlertDialog({
                title: "Error",
                text: `Error occurred while fetching accounts: ${ex.message}`
            });
            return [];
        }
    }
   

    async GetContactsByAccountId(accountId) {
        
        if (accountId == null) return [];
        
        try {
            const contacts = await this.Xrm.WebApi.retrieveMultipleRecords("contact", 
            `?$select=firstname,lastname,emailaddress1,mobilephone,jobtitle&$filter=_accountid_value eq ${accountId}&$top=100`);

            if (!contacts || !Array.isArray(contacts.entities) || contacts.entities.length === 0) 
                return [];

            return this.AddGridId(contacts.entities,"contactid");
        }
        catch(ex) {
            this.Xrm.Navigation.openAlertDialog({
                title: "Error",
                text: `Error occurred while fetching contacts: ${ex.message}`
            });
            return [];
        }

        
    }

    async NewContactFormForAccount(accountId, accountName) {
        
        const entityFormOptions = { entityName : "contact"};
        
        const formParameters = {
            accountid: accountId,
            accountidname: accountName
        };

        try {
            await this.Xrm.Navigation.openForm(entityFormOptions, formParameters);
        }
        catch(ex) {
            this.Xrm.Navigation.openAlertDialog({
                title: "Error",
                text: `Error loading contact new form: ${ex.message}`
            });
        }
    }
}