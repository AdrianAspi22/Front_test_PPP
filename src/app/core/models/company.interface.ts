export interface Company {
    id: number;
    companyName: string;
    practiceCount: number;
    email: string;
    phoneNumber: string;
    identificationNumber: string;
    startDate: Date;
    endDate: Date | null;
}
