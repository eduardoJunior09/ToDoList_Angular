import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private itens: { title: string; completed: boolean }[] = [];

  //add uum novo item na lista
  addItem(title: string) {
    this.itens.push({ title, completed: false });
  }

  //retorna toda lista de item
  getItens() {
    return this.itens;
  }

  //função para sinalizar conclusão em relação ao item da lista
  completeItens(index: number) {
    if (this.itens[index]) {
      this.itens[index].completed = true;
    }
  }

  // retorna apenas os item marcados como concluídos
  getCompletedItens() {
    return this.itens.filter((item) => item.completed);
  }

  // remover um item da lista com base no índice
  removeItem(index: number) {
    if (this.itens[index]) {
      this.itens.splice(index, 1);
    }
  }
}
