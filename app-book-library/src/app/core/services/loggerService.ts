import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})

export class LoggerService {

    private isProduction = false;

    log(mensaje: string, datoError: any) {
        const time = new Date().toISOString();
        console.log(`%c[LOG]-[${time}]  ${mensaje}`, 'color: #1976d2', datoError ?? '');
    }

    warn(mensaje: string, dataError:any) {
        const time = new Date().toISOString();
        console.warn(`%c[WARN] [${time}] ${mensaje}`, 'color: #fbc02d', dataError ?? '');
    }

    error(mensaje: string, dataError: any) {     
        const time = new Date().toISOString();   
        console.error(`%c[ERROR] [${time}] ${mensaje}`, 'color: #d32f2f', dataError ?? '');

    }
}