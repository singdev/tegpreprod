import { Component, OnInit, Input } from '@angular/core';
import { StationService } from '../logic/station-service';
import { ObjectifsService } from '../services/objectifs.service';
import { RealisationVolume } from '../logic/realisation-volume';
import { RealisationTopService } from '../logic/realisation-top-service';
import { ObjectifTopService } from '../logic/objectif-top-service';
import { ObjectifVolume } from '../logic/objectif-volume';
import { RealisationVolumeService } from '../services/realisation-volume.service';
import { RealisationTopServiceService } from '../services/realisation-top-service.service';
import { Actu } from '../logic/actu';
import { ActuService } from '../services/actu.service';
import { UserService } from '../services/user.service';
import { URL } from '../common/remote';

@Component({
  selector: 'app-gerant-accueil',
  templateUrl: './gerant-accueil.component.html',
  styleUrls: ['./gerant-accueil.component.css']
})
export class GerantAccueilComponent implements OnInit {

  @Input() stationService: StationService;
  currentYear: number;
  currentMonth: number;

  realisationVolume: Array<RealisationVolume>;
  realisationTopService: RealisationTopService;
  objectifTopService: ObjectifTopService;
  objectifVolume: ObjectifVolume;

  lastActu: Array<Actu>;
  articles: Array<Actu>;
  selectedActu: Array<any>;

  displayListArticles: Array<Array<any>>;
  displayListLastActu: Array<Array<any>>;

  constructor(private objectifService: ObjectifsService,
    private actuService: ActuService,
    private userService: UserService,
    private rvService: RealisationVolumeService,
    private rtsService: RealisationTopServiceService) { }

  ngOnInit(): void {
    this.currentYear = new Date().getFullYear();
    this.currentMonth = new Date().getMonth();
    this.loadObjectifVolume();
    this.loadRealisationTopService();
    this.loadRealisationVolume();
    this.loadObjectifTopService();
    this.loadAllActu();

  }

  selectActu(actu){
    this.selectedActu = actu;
  }

  loadObjectifVolume(){
    this.objectifService.getObjectifVolumeByYear(this.currentYear).subscribe(
      res => {
        this.objectifVolume = res[0];
      }
    )
  }

  moyen(): number{
    return (this.realisationTopService.n_s1 + this.realisationTopService.n_s2)/2;
  }

  loadRealisationTopService(){
    this.rtsService.getRealisationTopServiceByYear(this.currentYear, this.stationService.id).subscribe(
      res => {
        this.realisationTopService = res[0]
      }
    )
  }

  loadObjectifTopService(){
    this.objectifService.getObjectifTopServiceByYear(this.currentYear).subscribe(
      res => {
        this.objectifTopService = res[0];
        console.log(ObjectifTopService);
      }
    )
  }

  loadAllActu(){
    this.actuService.getAllActu().subscribe(
      res => {
        this.articles = res;
        console.log(res);
        this.lastActu = [];
        for(let i = 0; i< 3; i++){
          if(this.articles[this.articles.length - i -1 ]){
            this.lastActu.push(this.articles[this.articles.length - i -1 ]);
          }
        }
        this.loadDisplayable();
      }, err => {
        console.log(err);
      }
    )
  }


  loadDisplayable(){
    this.userService.getAllUsers().subscribe(
      res => {
        console.log(res);
        this.displayListArticles = [];
        this.articles.forEach(a => {
          const author = res.find(u => u.id == a.author);
          const date = new Date(a.publish);
          const img = `${URL}/actu/${a.id}`;
          console.log(img);
          this.displayListArticles.push([a.title, a.content, author.fullname, date.getDate() + '/' + date.getMonth(), date.getFullYear() + '', img, date, a.id])
        });
        this.displayListLastActu = [];
        for(let i = 0; i< 3; i++){
          if(this.displayListArticles[this.displayListArticles.length - i -1 ]){
            this.displayListLastActu.push(this.displayListArticles[this.articles.length - i -1 ]);
          }
        }
      }, err => {
        console.log(err);

    });
}

  loadRealisationVolume(){
    this.rvService.getRealisationVolumeByYear(this.currentYear)
    .subscribe(
      res => {
        this.realisationVolume = [];
        res.forEach(r => {
          const month: any = r.month;
          if(r.ss == this.stationService.id && month <= this.currentMonth+1 ){
            this.realisationVolume.push(r);
          }
        });
        this.realisationVolume.sort((a, b) => {
          const month1:any = a.month;
          const month2:any = b.month;
          return month1-month2;
        });
      },
      err => {

      }
    )
  }

}
