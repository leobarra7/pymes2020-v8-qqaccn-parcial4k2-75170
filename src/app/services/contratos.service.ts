import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
  HttpParams
} from "@angular/common/http";
import { of } from "rxjs";
import { Contrato } from "../models/contrato";

@Injectable({
  providedIn: "root"
})
export class ContratosService {

 resourceUrl: string;
  constructor(private httpClient: HttpClient) {
    this.resourceUrl = " https://pavii.ddns.net/api/contratos/";
  }
  get() {
    return this.httpClient.get(this.resourceUrl);
  }
  getById(Id: number) {
    return this.httpClient.get(this.resourceUrl + Id);
  }

  post(obj:Contrato) {
    return this.httpClient.post(this.resourceUrl, obj);
  }

  put(Id: number, obj:Contrato) {
    return this.httpClient.put(this.resourceUrl + Id, obj);
  }
  
  delete(Id) {
    return this.httpClient.delete(this.resourceUrl + Id);
  }

}