export interface ResearchCompanyRequest {
    id: number;
    companyName: string;
    practiceCount: number;
    email: string;
    phoneNumber: string;
    identificationNumber: string;
    startDate: string; // Se usa string para fechas en JSON/TS
    endDate?: string | null; // opcional y puede ser null
}
