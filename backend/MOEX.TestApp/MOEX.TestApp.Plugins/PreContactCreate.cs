using Microsoft.Xrm.Sdk;
using MOEX.TestApp.Plugins.Models;
using System;
using System.Collections.Generic;

namespace MOEX.TestApp.Plugins
{
    public class PreContactCreate : IPlugin
    {
        public void Execute(IServiceProvider serviceProvider)
        {
            IPluginExecutionContext context = (IPluginExecutionContext)serviceProvider.GetService(typeof(IPluginExecutionContext));
            IOrganizationServiceFactory serviceFactory = (IOrganizationServiceFactory)serviceProvider.GetService(typeof(IOrganizationServiceFactory));
            IOrganizationService service = serviceFactory.CreateOrganizationService(context.UserId);

            var validator = new ContactValidator(service);
            List<string> validationErrors = new List<string>();

            Entity entity = (Entity)context.InputParameters["Target"];

            if (entity.Contains(Constants.Fields.Email))
            {
                string email = (string)entity[Constants.Fields.Email];
                
                if (!validator.EmailIsValid(email))
                    validationErrors.Add("Email has wrong format");
            }

            if (entity.Contains(Constants.Fields.MobilePhone))
            {
                string phone = (string)entity[Constants.Fields.MobilePhone];

                if (!validator.PhoneIsValid(phone))
                    validationErrors.Add("Phone has wrong format");
            }
            
            var contact = new Contact(entity);

            if (!validator.ContactIsUniqueForAccount(contact))
                validationErrors.Add("Contact with same properties already exists for account");

            if (validationErrors.Count > 0)
                throw new InvalidPluginExecutionException(string.Join(", ", validationErrors.ToArray()));
            
        }
    }
}
