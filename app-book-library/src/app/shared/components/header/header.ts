import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from "@angular/router";
import { MatButton, MatAnchor } from '@angular/material/button';
import { MatToolbar } from '@angular/material/toolbar';
import { MatIcon } from '@angular/material/icon';
import {MatMenu, MatMenuTrigger, MatMenuItem} from '@angular/material/menu'

@Component({
  selector: 'app-header',
  imports: [RouterLink, MatToolbar, MatAnchor],
  standalone: true,
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class HeaderComponent {

}
