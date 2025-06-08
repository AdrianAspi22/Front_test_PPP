import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class IdTransferService {
  private id: any;
  private readonly idKey = "selectedIdKey";

  constructor() { }

  setId(id: any) {
    this.id = id;
  }

  getId() {
    return this.id;
  }

  

  setSelectedIdKey(id: any) {
    localStorage.setItem(this.idKey,  id.toString());
  }

  getSelectedIdKey() {
    const storedId = localStorage.getItem(this.idKey);
    
    return storedId ? storedId : null;
  }
}
