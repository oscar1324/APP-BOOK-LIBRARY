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

    getAllBooks(): Observable<Ibook[]> {
      return this.http.get<Ibook[]>(`https://690baaf96ad3beba00f5d716.mockapi.io/api/Libreria_Universal/obtenerLibreria`);
    }

    insertNewBook(formData: any): Observable<any> {
      console.log(formData);
      return this.http.post(`https://690baaf96ad3beba00f5d716.mockapi.io/api/Libreria_Universal/obtenerLibreria`, formData);
    }

    deteleById(formData: any): Observable<any> {
      console.log('deteleById' ,formData);
      return this.http.delete(`https://690baaf96ad3beba00f5d716.mockapi.io/api/Libreria_Universal/obtenerLibreria/${formData}`);
    }
}