export interface Additional {}

export interface AdditionalInfor {
  $id: string;
  Id: string;
  UserId: string;
  User: {
    $ref: string;
  };
  Nation: string;
  IDCardNumber: string;
  DateOfIDCard: string;
  PlaceOfIDCard: string;
  HealthInsurance: string;
  StartingDate: string;
  StartingDateOfficial: string;
  LeavingDate: string;
  StartDateMaternityLeave: string;
  Note: string;
  AcademicLevel: string;
  SpecializedQualification: string;
  BusinessPhone: string;
  HomePhone: string;
  PersonalEmail: string;
  BankName: string;
  BranchNumber: string;
  BankBranchName: string;
  BankAccountNumber: string;
  BankAccountName: string;
  Street: string;
  BuildingOrFlatNumber: string;
  City: string;
  ProvinceOrState: string;
  PostalCode: string;
  Country: string;
  contracts: {
    $id: string;
    $values: Contract[];
  };
}

export interface Contract {
  $id: string;
  Id: string;
  ContractType: string;
  FromDate: string;
  ToDate: string;
  SigningDate: string;
  Subject: string;
  Department: string;
  Note: string;
}

export interface UserInfo {
    $id: string;
    Id: string;
    FirstName: string;
    LastName: string;
    Email: string;
    PhoneNumber: string;
    Avatar: string;
    AccountId: string;
    MyAccount: any;
    Roles: any;
    PaymentRequests: any;
    DetailRequests: any;
    JobTitle: string;
    Overview: OverviewInfor;
    Additional: AdditionalInfor;
    Family: Family;
    Signature: Signature;
    Departments: any;
  }

  interface OverviewInfor {
    $id: string;
    Id: string;
    UserId: string;
    User: {
      $ref: string;
    };
    EmployeeNumber: number;
    Sex: string;
    BirthDay: string;
    Position: string;
    Company: string;
    Unit: string;
    FunctionEmployee: string;
    Department: string;
    SectionsTeams: string;
    Groups: string;
    OfficeLocation: string;
    LineManager: string;
    BelongToDepartments: string;
    CostCenter: string;
    Rank: string;
    EmployeeType: string;
    Rights: string;
  }
  
  
interface EmployeeData {
    family: {
      ContactName: string;
      Relationship: string;
      MartialStatus: string;
      PostalCodeFamily: string;
      BuildingOrFlatNumberFamily: string;
      PhoneFamily: string;
      StreetFamily: string;
      CountryFamily: string;
      relationships: string;
      CityFamily: string;
    };
    additional: {
      BuildingOrFlatNumber: string;
      Phone: string;
      BusinessPhone: string;
      HomePhone: string;
      Street: string;
      SpecializedQualification: string;
      BankName: string;
      Nation: string;
      Country: string;
      BankBranchName: string;
      BranchNumber: string;
      City: string;
      BankAccountNumber: string;
      BankAccountName: string;
      StartingDate: string;
      PersonalEmail: string;
      AcademicLevel: string;
      ProvinceOrState: string;
      DateOfIDCard: string;
      HealthInsurance: string;
      Note: string;
      Contracts: string;
      IDCardNumber: string;
      PostalCode: string;
    };
    overview: {
      Rank: string;
      EmployeeType: string;
    };
    signature: {
      QRcode: string;
      ImageSignature: string;
    };
    Avatar: string;
  }
  interface Family {
    $id: string;
    Id: string;
    UserId: string;
    User: {
      $ref: string;
    };
    MartialStatus: string;
    ContactName: string;
    Relationship: string;
    Phone: string;
    Street: string;
    BuildingOrFlatNumber: string;
    City: string;
    ProvinceOrState: string;
    PostalCode: string;
    Country: string;
    relationships: {
      $id: string;
      $values: Relationship[];
    };
  }
  
  interface Relationship {
    $id: string;
    Id: string;
    FamilyId: string;
    ContactName: string;
    BirthDay: string;
    Relationship: string;
    Note: string;
  }
  
  interface Signature {
    $id: string;
    Id: string;
    UserId: string;
    User: {
      $ref: string;
    };
    QRcode: string;
    dateTime: string;
    ImagePath: string;
  }
  
  
  