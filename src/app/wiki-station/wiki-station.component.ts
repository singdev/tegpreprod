import { Component, OnInit } from '@angular/core';
import { Wiki } from '../logic/wiki';
import { WikiService } from '../services/wiki.service';

@Component({
  selector: 'app-wiki-station',
  templateUrl: './wiki-station.component.html',
  styleUrls: ['./wiki-station.component.css']
})
export class WikiStationComponent implements OnInit {

  wikiFormation: Array<Wiki>;
  wikiProcedure: Array<Wiki>;
  wikiHSE: Array<Wiki>;
  wikiTopService: Array<Wiki>;


  constructor(private wikiService: WikiService) { }

  ngOnInit(): void {
    this.loadAllWiki();
  }

  loadAllWiki(){
    this.wikiService.getAllWiki().subscribe(
      res => {
        this.wikiTopService = [];
        this.wikiFormation =  [];
        this.wikiHSE = [];
        this.wikiProcedure = [];

        res.forEach(w => {
          if(w.categorie == 'Formation'){
            this.wikiFormation.push(w);
          } else if(w.categorie == 'Top service'){
            this.wikiTopService.push(w);
          } else if(w.categorie == 'HSE'){
            this.wikiHSE.push(w);
          } else if(w.categorie == 'Procedure'){
            this.wikiProcedure.push(w);
          } 
        });
      }
    )
  }
}
