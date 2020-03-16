import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { CommentService } from '../services/comment.service';
import { Comment} from 'src/app/logic/comment';
import { UserService } from '../services/user.service';
import { User } from '../logic/user';
import { AngularEditorConfig } from '@kolkov/angular-editor';

@Component({
  selector: 'app-view-actu',
  templateUrl: './view-actu.component.html',
  styleUrls: ['./view-actu.component.css']
})
export class ViewActuComponent implements OnInit {

  @Input() actu: any;

  comment: string;
  comments: Array<Comment>;
  users: Array<User>;

  editorConfig: AngularEditorConfig = {
    editable: true,
      spellcheck: true,
      height: '200px',
      minHeight: '0',
      maxHeight: '400px',
      width: 'auto',
      minWidth: '0',
      translate: 'yes',
      enableToolbar: true,
      showToolbar: true,
      placeholder: 'Enter text here...',
      defaultParagraphSeparator: '',
      defaultFontName: '',
      defaultFontSize: '',
      fonts: [
        {class: 'arial', name: 'Arial'},
        {class: 'times-new-roman', name: 'Times New Roman'},
        {class: 'calibri', name: 'Calibri'},
        {class: 'comic-sans-ms', name: 'Comic Sans MS'}
      ],
      customClasses: [
      {
        name: 'quote',
        class: 'quote',
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: 'titleText',
        class: 'titleText',
        tag: 'h1',
      },
    ],
    uploadUrl: 'v1/image',
    uploadWithCredentials: false,
    sanitize: true,
    toolbarPosition: 'top',
    toolbarHiddenButtons: [
      ['bold', 'italic'],
      ['fontSize']
    ]
};

  constructor(private authService: AuthService,
     private commentService: CommentService,
     private userService: UserService) { }

  ngOnInit(): void {
    this.getAllComment();
    this.loadAllUser();
  }

  loadAllUser(){
    this.userService.getAllUsers().subscribe(
      res => {
        this.users = res;
      }
    )
  }

  getUser(id: number){
    return this.users.find(u => u.id == id);
  }

  commentArticle(){
    const c: Comment = new Comment();
    c.content = this.comment;
    c.article = this.actu[this.actu.length -1];
    c.author = this.authService.getAuthenticatedUser().id;
    c.publish = new Date().toISOString();

    this.commentService.addComment(c).subscribe(
      res => {
        console.log(res);
      },
      err => {
        console.log(err);
        if(err.status == 201){
          this.comments = undefined;
          this.getAllComment();
        }
      }
    )
  }

  getAllComment(){
    console.log(this.actu[this.actu.length-1]);
    this.commentService.getCommentByYear(this.actu[this.actu.length-1]).subscribe(
      res =>{
        console.log("resultat");
        console.log(res);
        this.comments = res;
      }
    )
  }

}
