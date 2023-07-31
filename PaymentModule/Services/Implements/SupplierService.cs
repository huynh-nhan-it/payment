﻿using PaymentModule.Context;
using PaymentModule.Services.IServices;

namespace PaymentModule.Services.Implements
{
    public class SupplierService : ISupplierService
    {
        private PaymentContext _context;

        public SupplierService(PaymentContext context)
        {
            _context = context;
        }
        Guid ISupplierService.GetIdBySupplierName(string supplierName)
        {
            var supplier = _context.Suppliers.FirstOrDefault(sup => sup.Name.Contains(supplierName) == true);
            if (supplier != null)
            {
                return supplier.Id;
            }
            return new Guid("8E1FBDEB-07D2-4FBB-83E5-0115A22A2F3F");
        }

        List<string> ISupplierService.GetSupplierList()
        {
            List<string> suppNameList = new List<string>();
            foreach(var suppEnti in _context.Suppliers.ToList())
            {
                suppNameList.Add(suppEnti.Name);
            }
            return suppNameList;
        }

        string ISupplierService.GetSupplierNameById(Guid supplierId)
        {
            var supplier = _context.Suppliers.FirstOrDefault(de => de.Id.Equals(supplierId) == true);
            if (supplier != null)
            {
                return supplier.Name;
            }
            return "";
        }
    }
}
