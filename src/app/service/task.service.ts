import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private itens: { title: string; completed: boolean }[] = [];

  constructor() {
   
    this.itens = [
      { title: 'Tarefa 1', completed: false },
      { title: 'Tarefa 2', completed: true },
      { title: 'Tarefa 3', completed: false },
    ];
  }

  addItem(title: string) {
    this.itens.push({ title, completed: false });
  }

  getItens() {
    return this.itens;
  }

  completeItens(index: number) {
    if (this.itens[index]) {
      this.itens[index].completed = !this.itens[index].completed; 
    }
  }

  removeItem(index: number) {
    if (this.itens[index]) {
      this.itens.splice(index, 1);
    }
  }

  updatetitle(index: number, newTitle: string){
    if(this.itens[index]){
      this.itens[index].title = newTitle; 
    }
  }
}
