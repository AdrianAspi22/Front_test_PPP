export interface ResearchCompanyModel {
    id: number;
    companyName: string;  // antes 'name'
    identificationNumber: string; // antes 'ruc'
    email: string;
    phoneNumber: string;
    practiceCount: number;
    startDate: Date;
    endDate: Date | null;
}
