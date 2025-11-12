# APP-BOOK-LIBRARY

This web application was developed in Angular, which allow manages a digital librery, it can list, add, edit and delete books of the best seller catalog.

# Main characteristic
- Dinamic list books (responsive cards).
- Register of new books using a reactive forms with validators and toast notification.
- Edit books with an instant previous card and toast notification.
- Delete the books and recieve and toast notification.
- Integration with MockApi for CRUD operations.
- Modular arquitecture: CoreModule, Shared, HttpBookService.
- Globar error handling  and LoggerService.
- Styles with Angular Material and Flex/Grid for a responsive design.

# Technologies used
- Angular 20
- Angular Material
- TypeScript
- RxJS
- CSS/Flexbox/ CSS Grid
- MockAPI 
- Visual Studio
- GitHub
- Git Bash

# Instalation and execution
- git clone https://github.com/oscar1324/APP-BOOK-LIBRARY.git cd APP-BOOK-LIBRARY
- npm install
- ng serve
- Open localhost: http://localhost:4200


# Proyect structure
src/
 ├── app/
 │   ├── core/               # Global Service
 |       |---- Services/     # HttpBookService and LoggerSergice  
 │   ├── models/             # Ibook Interface     
 │   ├── pages/              # Main Components (BookList and BookDetail)      
 │   ├── shared/             # Reusable Components 
 |       |---- Components/   # BestSeller, BookCard, Footer and Header
 |       |---- Dialogs/      # NewRegisterBook
 |       |---- Forms/        # FormInput and FormSelect
 │   ├── app.routes.ts       # Main routes
 │   └── app.config.ts       # Main Sets
 ├── assets/                 # Pictures and audios
 └── main.ts

