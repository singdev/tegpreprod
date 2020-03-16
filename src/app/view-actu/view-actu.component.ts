import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { CommentService } from '../services/comment.service';
import { Comment} from 'src/app/logic/comment';

@Component({
  selector: 'app-view-actu',
  templateUrl: './view-actu.component.html',
  styleUrls: ['./view-actu.component.css']
})
export class ViewActuComponent implements OnInit {

  @Input() actu: any;

  comment: string;
  comments: Array<Comment>;

  constructor(private authService: AuthService,
     private commentService: CommentService) { }

  ngOnInit(): void {
    this.getAllComment();
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
