import { Component, OnInit } from '@angular/core';
import { ForumSubject } from '../logic/forum-subject';
import { ForumService } from '../services/forum.service';
import { UserService } from '../services/user.service';
import { User } from '../logic/user';

@Component({
  selector: 'app-forum-subject',
  templateUrl: './forum-subject.component.html',
  styleUrls: ['./forum-subject.component.css']
})
export class ForumSubjectComponent implements OnInit {

  showCreateActuModal:boolean;

  subjects: Array<ForumSubject>;
  users: Array<User>

  postCounts: Array<any>;
  finishCount: boolean;

  constructor(private userService: UserService, 
    private forumService: ForumService) { }

  ngOnInit(): void {
    this.postCounts = [];
    this.showCreateActuModal = false;
    this.loadAllSubject();
    this.loadAllUser();
    this.finishCount = false;
  }

  loadAllSubject(){
    this.forumService.getAllSubject().subscribe(
      res => {
        this.subjects = res;
        this.subjects.forEach(s => this.loadAllPost(s));
      }, err => {
        console.log(err);
      }
    )
  }

  loadAllPost(s: ForumSubject){
    this.forumService.getPostBySubject(s.id).subscribe(
      res => {
        console.log("post");
        this.postCounts.push({ count: res.length, id: s.id});
        console.log(this.postCounts);
        if(this.postCounts.length == this.subjects.length){
          this.finishCount = true;
        }
      }, err => {
        console.log(err);
      }
    )
  }

  getPostCount(s: number){
    this.postCounts.forEach(pc => {
      if(pc.id == s){
        return pc;
      } 
    });
    return undefined;
  }

  loadAllUser(){
    this.userService.getAllUsers().subscribe(
      res => {
        this.users = res;
      }, err => {
        console.log(err);
      }
    )
  }

  getUser(id: number){
    return this.users.find(u => u.id == id);
  }

  onCloseCreate(success){
    if(success){

    } else {

    }
    this.hideCreateActuModel();
  }

  displayCreateActuModal(){
    this.showCreateActuModal = true;
  }

  hideCreateActuModel(){
    this.showCreateActuModal = false;
  }

}
