import { HttpHeaders } from '@angular/common/http';

export const endpoint = {
  // AUTH MODULE
  LOGIN: 'identity/login',
  REFRSHTOKEN: 'identity/refreshToken',

  // ACCOUNT MODULE
  UPDATE_PROFILE: 'identity/account/UpdateProfile',
  CHANGE_PASSWORD: 'identity/account/ChangePassword',

  // ROLE MODULE
  LIST_ROLE: 'identity/role',
  PERMISSION_BY_ROLEID: 'identity/role/permissions/',
  ROLE_REGISTER: 'identity/role',
  ROLE_UPDATE: 'identity/role/permissions/update',
  ROLE_DELETE: 'identity/role/',

  // USER MODULE
  LIST_USERS: 'identity/user',
  SELECT_LIST_USERS: 'identity/user/GetUserSelect',
  USER_BY_ID: 'identity/user/',
  USER_BY_BRANCHOFFICEID: 'identity/user/GetUserByBranchOfficeId/',
  USER_ROLES_BY_ID: 'identity/user/roles/',
  USER_ROLES_UPDATE_BY_ID: 'identity/user/roles/',
  USER_REGISTER: 'identity/user',
  USER_ACTIVATE: 'identity/user/toggle-status',

  //CONSULTA EXPERTA MODULE
  GET_DATA_SUNAT_RENIEC: "v1/SunatReniec/GetData",

  // GETALL DOCUMENT TYPE
  DOCUMENT_TYPE_SELECT: "v1/DocumentType/GetSelectDocumentType",



  //MODULE RESEARCH GROUP
  RESEARCH_GROUP_LIST: "v1/ResearchGroup/GetAllResearchGroup",
  RESEARCH_GROUP_SELECT: "v1/ResearchGroup/GetSelectResearchGroup",
  RESEARCH_GROUP_BY_ID: "v1/ResearchGroup/GetResearchGroupById/",
  RESEARCH_GROUP_REGISTER: "v1/ResearchGroup/Create",
  RESEARCH_GROUP_UPDATE: "v1/ResearchGroup/Update",
  RESEARCH_GROUP_DELETE: "v1/ResearchGroup/Delete/",
  RESEARCH_GROUP_CHANGE_STATE: "v1/ResearchGroup/ChangeState/",
  RESEARCH_GROUP_SELECT_ACRONYM: "v1/ResearchGroup/GetSelectResearchGroupAcronyms",
  RESEARCH_GROUP_BY_GROUP: "v1/ResearchGroup/GetResearchAreaByGroup/",
  RESEARCH_GROUP_FILTERED: "v1/ResearchGroup/GetFilteredResearchGroups",

  //MODULE RESEARCH COMPANY
  RESEARCH_COMPANY_LIST: "Actor/companiesWithPracticeCount",
  RESEARCH_COMPANY_SELECT: "/Actor/companiesWithPracticeCount",
  RESEARCH_COMPANY_BY_ID: "/Actor/companiesWithPracticeCount",

  //MODULE RESEARCH AREA
  RESEARCH_AREA_LIST: "v1/ResearchArea/GetAllResearchArea",
  RESEARCH_AREA_SELECT: "v1/ResearchArea/GetSelectResearchArea",
  RESEARCH_AREA_BY_ID: "v1/ResearchArea/GetResearchAreaById/",
  RESEARCH_AREA_REGISTER: "v1/ResearchArea/Create",
  RESEARCH_AREA_UPDATE: "v1/ResearchArea/Update",
  RESEARCH_AREA_DELETE: "v1/ResearchArea/Delete/",
  RESEARCH_AREA_CHANGE_STATE: "v1/ResearchArea/ChangeState/",

  //MODULE RESEARCH LINE
  RESEARCH_LINE_LIST: "v1/ResearchLine/GetAllResearchLine",
  RESEARCH_LINE_SELECT: "v1/ResearchLine/GetSelectResearchLine",
  RESEARCH_LINE_BY_ID: "v1/ResearchLine/GetResearchLineById/",
  RESEARCH_LINE_REGISTER: "v1/ResearchLine/Create",
  RESEARCH_LINE_UPDATE: "v1/ResearchLine/Update",
  RESEARCH_LINE_DELETE: "v1/ResearchLine/Delete/",
  RESEARCH_LINE_CHANGE_STATE: "v1/ResearchLine/ChangeState/",

  //MODULE AdvisoringContract
  ADVISORINGCONTRACT_LIST: "v1/AdvisoringContract/GetAllAdvisoringContract",
  ADVISORINGCONTRACT_REGISTER: "v1/AdvisoringContract/Create",
  ADVISORINGCONTRACT_DELETE: "v1/AdvisoringContract/Delete/",

  //MODULE AdvisoringRequest
  ADVISORINGREQUEST_LIST: "v1/AdvisoringRequest/GetAllAdvisoringRequest",
  ADVISORINGREQUEST_BY_ID: "v1/AdvisoringRequest/GetContractById",
  ADVISORINGREQUEST_SELECT: "v1/AdvisoringRequest/GetSelectAdvisoringRequest",
  ADVISORINGREQUEST_REGISTER: "v1/AdvisoringRequest/Respond",
  ADVISORINGREQUEST_DELETE: "v1/AdvisoringRequest/Delete/",
};

export const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};
