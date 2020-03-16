import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  @Input() headers: Array<string>;
  @Input() rows: Array<Array<string>>;
  @Output() rowClick = new EventEmitter<number>();
  
  displayRowCount: number;
  currentPage: number;
  display:  Array<Array<string>>;

  constructor() { }

  ngOnInit(): void {
    this.currentPage = 0;
    this.displayRowCount = 5;
    this.updateDisplay();
  }

  range(first:number, last:number): Array<number>{
    let array: Array<number> = [];
    for(let i:any = first; i<= last; i++){
      array.push(i);
    }
    return array;
  }

  updateDisplay(){
    this.display = [];
    this.rows.forEach(r => {
      if(this.isOnCurrentPage(r)){
        this.display.push(r);
      }
    });
  }

  isOnCurrentPage(row: Array<string>): boolean{
    let index: number = this.rows.indexOf(row);
    let rowPage = Math.floor(index / this.displayRowCount);
    return rowPage == this.currentPage;
  }

  pageCount(){
    return Math.floor(this.rows.length / this.displayRowCount);
  }

  changePage(index: number){
    this.currentPage = index;
    this.updateDisplay();
  }

  indexOfRow(row: Array<string>){
    return this.rows.indexOf(row);
  }

  emitRowClickEvent(index: number){
    this.rowClick.emit(index);
  }
}
