import { Component, OnInit, Input } from '@angular/core';
import { RealisationVolume } from 'src/app/logic/realisation-volume';
import { RealisationVolumeService } from 'src/app/services/realisation-volume.service';
import { StationService } from 'src/app/logic/station-service';

@Component({
  selector: 'app-update-realisation-volume',
  templateUrl: './update-realisation-volume.component.html',
  styleUrls: ['./update-realisation-volume.component.css']
})
export class UpdateRealisationVolumeComponent implements OnInit {

  @Input() stationService: StationService;
  realisationVolumes: Array<RealisationVolume>;

  constructor(private realisationVolumeService: RealisationVolumeService) { }

  ngOnInit(): void {
    this.loadAllRealisationForCurrentYear();
  }

  loadAllRealisationForCurrentYear(){
    let currentYear: number = this.getCurrentYear();
    this.realisationVolumeService.getRealisationVolumeByYear(currentYear).subscribe(
      res => {
        if(res.length == 0){
          this.createRealisationForCurrentYear();
          this.loadAllRealisationForCurrentYear();
        } else {
          this.realisationVolumes = res;
          console.log(this.realisationVolumes);
        }
      }
    )
  }

  createRealisationForCurrentYear(){
    for(let i = 1; i <= 12; i++) {
      const realisationVolume: RealisationVolume =  new RealisationVolume();
      realisationVolume.ss = this.stationService.id;
      realisationVolume.month = ''+i;
      realisationVolume.year = this.getCurrentYear();
      this.realisationVolumeService.addRealisationVolume(realisationVolume).subscribe(
        res => console.log(res),
        err => console.log(err)
      );
    }
  }

  getCurrentYear(){
    return new Date().getFullYear();
  }
}
