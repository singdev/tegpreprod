import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ExcelService } from 'src/app/services/excel.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-excel',
  templateUrl: './excel.component.html',
  styleUrls: ['./excel.component.css']
})
export class ExcelComponent implements OnInit {

  @Input() jsonData: Array<any>;
  @Input() exportFileName: string;

  @Output() jsonLoaded = new EventEmitter<Array<any>>();

  constructor(private excelService: ExcelService) { }

  ngOnInit(): void {
  }

  downloadExcelFile(){
    this.excelService.exportAsExcelFile(this.jsonData, this.exportFileName);
  }

  importJson(e){
    var files = e.target.files, f = files[0];
    var reader = new FileReader();
    reader.onload = (e) => {
      var data = new Uint8Array(e.target.result);
      var workbook = XLSX.read(data, {type: 'array'});
      console.log(workbook.Sheets);
      var workSheet = workbook.Sheets['data'];
      var json = XLSX.utils.sheet_to_json(workSheet);
      console.log(json);
      this.jsonLoaded.emit(json);
      /* DO SOMETHING WITH workbook HERE */
    };
    reader.readAsArrayBuffer(f);
  }

}
