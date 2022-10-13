using Microsoft.Xrm.Sdk;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MOEX.TestApp.Plugins.Models
{
    public class Contact
    {
        public Guid Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string MobilePhone { get; set; }
        public string Email { get; set; }
        public string JobTitle { get; set; }
        public Guid AccountId { get; set; }

        public Contact(Entity entity)
        {
            this.Id = entity.Contains(Constants.Fields.ContactId) ? (Guid)entity[Constants.Fields.ContactId] : default;
            this.FirstName = entity.Contains(Constants.Fields.FirstName) ? (string)entity[Constants.Fields.FirstName] : default;
            this.LastName = entity.Contains(Constants.Fields.LastName) ? (string)entity[Constants.Fields.LastName] : default;
            this.MobilePhone = entity.Contains(Constants.Fields.MobilePhone) ? (string)entity[Constants.Fields.MobilePhone] : default;
            this.Email = entity.Contains(Constants.Fields.Email) ? (string)entity[Constants.Fields.Email] : default;
            this.JobTitle = entity.Contains(Constants.Fields.JobTitle) ? (string)entity[Constants.Fields.JobTitle] : default;
            this.AccountId = entity.Contains(Constants.Fields.AccountId) ? (Guid)entity[Constants.Fields.AccountId] : default;
        }


    }
}
