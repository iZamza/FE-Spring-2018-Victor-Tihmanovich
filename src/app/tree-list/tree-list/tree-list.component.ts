import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tree-list',
  templateUrl: './tree-list.component.html',
  styleUrls: ['./tree-list.component.css']
})
export class TreeListComponent implements OnInit {
  itemList;
  deep = 0;
  itemPath = [];
  constructor() {}
  ngOnInit() {
    this.createList();
  }

  createList() {
    const arrayList = new Array(100);
    this.itemList = arrayList.fill('Item', 0, 100);
  }

  getDeep() {
    return this.deep;
  }

  chooseItem(event) {
    const currentItem: HTMLElement = event.target;
    const itemClassName = event.target.className;
    const parrentDeep = event.target.parentElement.dataset.deep;
    const numberOfItem: number = event.target.dataset.index;
    if (parrentDeep < this.deep) {
      this.deep += parrentDeep;
    }
    if (itemClassName === 'item') {
      this.itemPath.push(numberOfItem);
      this.createNewItemList(currentItem);
      currentItem.className = 'active-item';
    } else if (itemClassName === 'active-item') {
      currentItem.className = 'item';
      currentItem.innerHTML = 'Item' + numberOfItem;
      this.itemPath.splice(parrentDeep, this.itemPath.length);
    }
  }

  createNewItemList(currentItem) {
    this.deep++;
    const currentDeep = this.deep.toString();
    for (let i = 1; i < this.itemList.length + 1; i++) {
      const index = i.toString();
      const newItem = document.createElement('div');
      newItem.innerHTML = 'Item' + index;
      newItem.style.marginLeft = '10px';
      newItem.setAttribute('data-index', index);
      newItem.setAttribute('data-deep', currentDeep);
      newItem.classList.add('item');
      currentItem.appendChild(newItem);
    }
  }

  filterItems() {
    const input = document.querySelector('#filterInput') as HTMLInputElement;
    const filterData = input.value.toUpperCase();
    const itemFromList = document.querySelectorAll('.item');
    const itemArray = Array.from(itemFromList);
    itemArray.forEach((item: HTMLElement) => {
      if (item.innerHTML.toUpperCase().indexOf(filterData) > -1) {
        item.style.display = '';
      } else {
        item.style.display = 'none';
      }
    });
  }
}
