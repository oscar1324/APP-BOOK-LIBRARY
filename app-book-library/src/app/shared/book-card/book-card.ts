import { Component, Input } from '@angular/core';
import { HttpBookService } from '../../features/services/HttpBookService';
import { Ibook } from '../../models/IBook.model';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-book-card',
  imports: [CommonModule],
  templateUrl: './book-card.html',
  styleUrl: './book-card.css',
})
export class BookCard implements OnInit{

  @Input() book!:Ibook;

  constructor() {

  }

  ngOnInit(): void {
      
  }



}
