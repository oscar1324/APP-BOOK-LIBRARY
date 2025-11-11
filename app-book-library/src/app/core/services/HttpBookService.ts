import { Observable } from "rxjs";
import { Ibook } from "../../models/IBook.model";
import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})

export class HttpBookService {

    constructor(private http: HttpClient) {

    }

    getAllBooks(): Observable<any> {
      return this.http.get<any>(`https://690baaf96ad3beba00f5d716.mockapi.io/api/Libreria_Universal/obtenerLibreria` , {
        observe: 'response'
      });
    }

    insertNewBook(formData: any): Observable<any> {
      return this.http.post(`https://690baaf96ad3beba00f5d716.mockapi.io/api/Libreria_Universal/obtenerLibreria`, formData);
    }

    updateBook(formData: any): Observable<any> {
      return this.http.put(`https://690baaf96ad3beba00f5d716.mockapi.io/api/Libreria_Universal/obtenerLibreria/${formData.id}`, formData);
    }

    deteleById(formData: any): Observable<any> {
      return this.http.delete(`https://690baaf96ad3beba00f5d716.mockapi.io/api/Libreria_Universal/obtenerLibreria/${formData}`);
    }
}