import { Component, OnInit, Input } from '@angular/core';
import { Wiki } from 'src/app/logic/wiki';
import { URL } from 'src/app/common/remote';
import { UserService } from 'src/app/services/user.service';
import { WikiService } from 'src/app/services/wiki.service';

@Component({
  selector: 'app-wiki',
  templateUrl: './wiki.component.html',
  styleUrls: ['./wiki.component.css']
})
export class WikiComponent implements OnInit {

  @Input() wikis: Array<Wiki>;
  @Input() category: string;

  headers: Array<string>;
  rows: Array<Array<string>>;

  constructor(private userService: UserService,
   private wikiService: WikiService) { }

  ngOnInit(): void {
    this.headers = ['Nom du fichier', 'Taille', 'Par'];
    this.loadRow();
  }

  loadRow() {
    this.userService.getAllUsers().subscribe(
      res => {
        this.rows = [];
        this.wikis.forEach(w => {
          const user = res.find(u => u.id == w.author)
          this.rows.push([w.filename, (w.size / 1028) + 'Ko', user.fullname]);
        });
      }
    );
  }

  createWiki(event) {
      const fileList: FileList = event.target.files;

      if(fileList.length > 0){
          const file = fileList.item(0);
          const wiki: any = { categorie: this.category };
          this.wikiService.createWiki(file, wiki).subscribe(
            res => {
              console.log(res);
            },
            err => {
              console.log(err);
            }
          );
      }
  }

  getUrl(wiki: Wiki) {
    return `${URL}/wiki-station/${wiki.id}`;
  }
}
