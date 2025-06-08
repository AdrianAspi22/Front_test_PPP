export interface ResearchAreaModel {
    id: number;
    name: string;
}

export interface ResearchGroupModel {
    researchGroupId: number;
    acronym: string;
    researchAreas: ResearchAreaModel[];
  }
  