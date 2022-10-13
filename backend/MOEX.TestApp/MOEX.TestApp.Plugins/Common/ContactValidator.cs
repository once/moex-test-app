using Microsoft.Xrm.Sdk;
using Microsoft.Xrm.Sdk.Query;
using MOEX.TestApp.Plugins.Models;
using System.ComponentModel.DataAnnotations;

namespace MOEX.TestApp.Plugins
{
    public class ContactValidator
    {
        private IOrganizationService service;

        public ContactValidator(IOrganizationService service)
        {
            this.service = service;
        }

        public bool PhoneIsValid(string phone) => phone.StartsWith(Constants.MobilePhonePrefix);

        public bool EmailIsValid(string email) => new EmailAddressAttribute().IsValid(email);

        public bool ContactIsUniqueForAccount(Contact contact)
        {
            var query = new QueryExpression
            {
                EntityName = "contact",
                ColumnSet = new ColumnSet(Constants.Fields.FirstName, Constants.Fields.LastName),
                Criteria =
                {
                    FilterOperator = LogicalOperator.And,
                    Conditions =
                    {
                        new ConditionExpression
                        {
                            AttributeName = Constants.Fields.FirstName,
                            Operator = ConditionOperator.Equal,
                            Values = { contact.FirstName }
                        },
                        new ConditionExpression
                        {
                            AttributeName = Constants.Fields.LastName,
                            Operator = ConditionOperator.Equal,
                            Values = { contact.LastName }
                        },
                        new ConditionExpression
                        {
                            AttributeName = Constants.Fields.MobilePhone,
                            Operator = ConditionOperator.Equal,
                            Values = { contact.MobilePhone }
                        },
                        new ConditionExpression
                        {
                            AttributeName = Constants.Fields.Email,
                            Operator = ConditionOperator.Equal,
                            Values = { contact.Email }
                        },
                        new ConditionExpression
                        {
                            AttributeName = Constants.Fields.JobTitle,
                            Operator = ConditionOperator.Equal,
                            Values = { contact.JobTitle }
                        },
                        new ConditionExpression
                        {
                            AttributeName = Constants.Fields.AccountId,
                            Operator = ConditionOperator.Equal,
                            Values = { contact.AccountId }
                        },
                        new ConditionExpression
                        {
                            AttributeName = Constants.Fields.ContactId,
                            Operator = ConditionOperator.NotEqual,
                            Values = { contact.Id }
                        }
                    }
                }
            };

            var records = service.RetrieveMultiple(query);

            // if no duplicates found, contact is valid
            return (records.TotalRecordCount == 0);
            
        }
    }
}
