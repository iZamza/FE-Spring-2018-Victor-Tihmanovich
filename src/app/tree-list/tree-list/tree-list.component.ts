import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tree-list',
  templateUrl: './tree-list.component.html',
  styleUrls: ['./tree-list.component.css']
})
export class TreeListComponent implements OnInit {
  itemList;
  itemPath = [];
  constructor() { }
  ngOnInit() {
    this.createList();
  }

  createList() {
    const arrayList = new Array(100);
    this.itemList = arrayList.fill(' ', 0, 100);
  }

  chooseItem(event) {
    const currentItem: HTMLElement = event.target;
    const numberOfItem: number = event.target.dataset.index;
    this.itemPath.push(numberOfItem);
    currentItem.classList.remove('item');
    currentItem.classList.add('current-item');
    const items = document.querySelectorAll('.item');
    this.deleteItems(items);
    this.createNewList(currentItem);
  }

  deleteItems(elements) {
    elements.forEach(elem => elem.parentNode.removeChild(elem));
  }

  createNewList(currentItem) {
    const newItems = document.createElement('div');
    this.setManyAttribute(newItems, {"class": "item",
    "*ngFor" : "let item of itemList; let i = index",
    "[attr.data-index]" : "i+1",
    "(click)" : "chooseItem($event)"});
    currentItem.appendChild(newItems);
  }

  setManyAttribute(element, attributes) {
    for(let key in attributes) {
      element.setAttribute(key, attributes[key]);
    }
  }

}
