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
  constructor() { }
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
    const itemDeep = event.target.dataset.deep;
    // const parrentDeep = event.target.parentElement.dataset.deep;
    const numberOfItem: number = event.target.dataset.index;
    // console.log(itemDeep, this.deep);
    if(itemClassName === 'item') {
      this.itemPath.push(numberOfItem);
      this.createNewItemList(currentItem);
      currentItem.className = 'active-item';
    } else if( itemClassName === 'active-item' ) {
      currentItem.className = 'item';
      currentItem.innerHTML = 'Item' + numberOfItem;
      this.itemPath.splice(itemDeep, this.deep);
    }
  }


  createNewItemList(currentItem) {
    // this.deep++;
    for(let i = 1; i < this.itemList.length+1; i++) {
      const newItem = document.createElement('div');
      newItem.innerHTML = 'Item' + i;
      newItem.style.marginLeft = '10px';
      newItem.setAttribute('data-index', i);
      // newItem.setAttribute('data-deep', this.deep);
      newItem.classList.add('item');
      currentItem.appendChild(newItem);
    }
  }

}
