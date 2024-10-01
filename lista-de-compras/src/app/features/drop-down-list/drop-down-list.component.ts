import { Component } from '@angular/core';
import {MatExpansionModule} from '@angular/material/expansion';
import { ItemComponent } from './../item/item.component';


@Component({
  selector: 'app-drop-down-list',
  standalone: true,
  imports: [MatExpansionModule, ItemComponent],

templateUrl: './drop-down-list.component.html',
  styleUrl: './drop-down-list.component.scss'
})
export class DropDownListComponent {
 
}
