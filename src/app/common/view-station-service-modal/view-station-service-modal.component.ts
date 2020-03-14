import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { StationService } from 'src/app/logic/station-service';
import { StationServiceService } from 'src/app/services/station-service.service';

@Component({
  selector: 'app-view-station-service-modal',
  templateUrl: './view-station-service-modal.component.html',
  styleUrls: ['./view-station-service-modal.component.css']
})
export class ViewStationServiceModalComponent implements OnInit {
  @Input() stationService: StationService;
  @Output() closeModal = new EventEmitter();

  constructor(private stationServiceService: StationServiceService) { }

  ngOnInit(): void {
  }

  cancel(){
    this.closeModal.emit();
  }

  updateStationService(){
    this.stationServiceService.updateStationServiceData(this.stationService).subscribe(
      res => {
        console.log(this.stationService);
        console.log(res);
      },
      err => {
        console.log(this.stationService);
        console.log(err);
      } 
    )
  }

}
