import { Component } from '@angular/core';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { EditButtonComponent } from '../../shared/buttons/edit-button/edit-button.component';
import { RemoveButtonComponent } from '../../shared/buttons/remove-button/remove-button.component';
@Component({
  selector: 'app-item',
  standalone: true,
  imports: [MatCheckboxModule, EditButtonComponent, RemoveButtonComponent],
  templateUrl: './item.component.html',
  styleUrl: './item.component.scss'
})
export class ItemComponent {
  typesOfShoes: string[] = ['Boots', 'Clogs', 'Loafers', 'Moccasins', 'Sneakers'];
}
