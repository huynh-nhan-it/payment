﻿namespace PaymentModule.DTOs
{
    public class UserDto
    {
        public string firstName {  get; set; } = string.Empty;
        public string lastName { get; set; } = string.Empty;
        public string email { get; set; } = string.Empty;
        public string password { get; set; } = string.Empty;
        public string confirmPassword { get; set; } = string.Empty;
        public string phoneNumber { get; set; }  = string.Empty;
    }
}
