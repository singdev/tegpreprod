import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ForumSubject } from 'src/app/logic/forum-subject';
import { ForumService } from 'src/app/services/forum.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-create-subject-modal',
  templateUrl: './create-subject-modal.component.html',
  styleUrls: ['./create-subject-modal.component.css']
})
export class CreateSubjectModalComponent implements OnInit {
  subject: ForumSubject;

  @Output() closeModal = new EventEmitter<boolean>();

  constructor(private forumService: ForumService, private authService: AuthService) { }

  ngOnInit(): void {
    this.subject = new ForumSubject();
  }

  cancel(){
    this.closeModal.emit(false);
  }

  createSubject(){
    this.subject.author = this.authService.getAuthenticatedUser().id;
    this.subject.publish = new Date().toISOString();

    this.forumService.addSubject(this.subject).subscribe(
      res => {
        console.log(res);
        this.closeModal.emit(true);
      },

      err => {
        console.log(err);
        if(err.status == 201){
          this.closeModal.emit(true);
        } else {
          alert("Cette enregistrment ne peut pas être effectué !");
        }

      }
    )
  }

}
