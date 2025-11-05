import { Routes } from '@angular/router';

export const routes: Routes = [
    {path: '', redirectTo: 'Libreria-Salamanca', pathMatch:'full'},
    {path: 'Libreria-Salamanca', loadComponent: () => import('./pages/book-list-component/book-list-component').then(componente => componente.BookListComponent)},
    {path: 'Detalle-libro', loadComponent: () => import('./pages/book-detail-component/book-detail-component').then( componente => componente.BookDetailComponent)}
];

