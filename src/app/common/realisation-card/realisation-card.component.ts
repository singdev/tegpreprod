import { Component, OnInit, Input } from '@angular/core';
import { RealisationVolume } from 'src/app/logic/realisation-volume';
import { RealisationTopServiceService } from 'src/app/services/realisation-top-service.service';
import { RealisationVolumeService } from 'src/app/services/realisation-volume.service';

@Component({
  selector: 'app-realisation-card',
  templateUrl: './realisation-card.component.html',
  styleUrls: ['./realisation-card.component.css']
})
export class RealisationCardComponent implements OnInit {

  @Input() realisationVolume: RealisationVolume;
  @Input() canUpdate: boolean;

  months = ['Janvier', 'Fevrier', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Aout', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];
  month: string;

  constructor(private realisationVolumeService:  RealisationVolumeService) { }

  ngOnInit(): void {
    let r:any = this.realisationVolume.month;
    this.month = this.months[r-1];
  }

  updateRealisationVolume(){
    this.realisationVolumeService.updateRealisationVolumeData(this.realisationVolume)
    .subscribe(
      res => {
        console.log(res);
      },
      err => {
        console.log(err);
      }
    );
  }
}
