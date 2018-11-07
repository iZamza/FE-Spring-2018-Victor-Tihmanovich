import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tree-list',
  templateUrl: './tree-list.component.html',
  styleUrls: ['./tree-list.component.css']
})
export class TreeListComponent implements OnInit {
  itemList;
  itemPath = [];
  constructor() {}
  ngOnInit() {
    this.createList();
  }

  createList() {
    const arrayList = new Array(100);
    this.itemList = arrayList.fill('Item', 0, 100);
  }

  chooseItem(event) {
    const currentItem: HTMLElement = event.target;
    const itemClassName = event.target.className;
    const numberOfItem = event.target.dataset.index;
    const path = event.target.dataset.path;
    if (itemClassName === 'item') {
      this.createNewItemList(currentItem, path, numberOfItem);
      currentItem.className = 'active-item';
    } else if (itemClassName === 'active-item') {
      currentItem.className = 'item';
      currentItem.innerHTML = 'Item' + numberOfItem;
    }
    this.checkPath(path, numberOfItem);
  }

  createNewItemList(currentItem, path, numberOfItem) {
    for (let i = 1; i < this.itemList.length + 1; i++) {
      const index = i.toString();
      const newItem = document.createElement('div');
      newItem.innerHTML = 'Item' + i;
      newItem.style.marginLeft = '10px';
      newItem.setAttribute('data-index', index);
      newItem.setAttribute('data-path', `${path}+${numberOfItem}`);
      newItem.classList.add('item');
      currentItem.appendChild(newItem);
    }
  }

  checkPath(path, numberOfItem) {
    const currentPath = path.split('+');
    currentPath.push(numberOfItem);
    currentPath.shift();
    this.itemPath = currentPath;
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
