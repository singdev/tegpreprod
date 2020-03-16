import { Component, OnInit } from '@angular/core';
import { Actu } from 'src/app/logic/actu';
import { ActuService } from 'src/app/services/actu.service';
import { UserService } from 'src/app/services/user.service';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { URL } from 'src/app/common/remote';

@Component({
  selector: 'app-actu-management',
  templateUrl: './actu-management.component.html',
  styleUrls: ['./actu-management.component.css']
})
export class ActuManagementComponent implements OnInit {

  lastActu: Array<Actu>;
  articles: Array<Actu>;

  displayListArticles: Array<Array<any>>;
  displayListLastActu: Array<Array<any>>;

  selectedActu: Array<any>;

  editorConfig: AngularEditorConfig = {
    editable: false,
      spellcheck: false,
      height: 'auto',
      minHeight: '0',
      maxHeight: 'auto',
      width: '100%',
      minWidth: '0',
      translate: 'no',
      enableToolbar: false,
      showToolbar: false,
      placeholder: 'Enter text here...',
      defaultParagraphSeparator: '',
      defaultFontName: '',
      defaultFontSize: '',
      outline: false
};

  constructor(private actuService: ActuService,
    private userService: UserService) { }

  ngOnInit(): void {
    this.loadAllActu();
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

  close(){
    this.selectedActu = undefined;
  }

  selectActu(actu){
    console.log(actu);
    this.selectedActu = actu;
  }

}
