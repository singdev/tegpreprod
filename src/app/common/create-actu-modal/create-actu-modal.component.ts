import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Actu } from 'src/app/logic/actu';
import { ActuService } from 'src/app/services/actu.service';

@Component({
  selector: 'app-create-actu-modal',
  templateUrl: './create-actu-modal.component.html',
  styleUrls: ['./create-actu-modal.component.css']
})
export class CreateActuModalComponent implements OnInit {
  actu: Actu;
  file: File;

  @Output() closeModal = new EventEmitter<boolean>();

  constructor(private actuService: ActuService) { }

  ngOnInit(): void {
    this.actu = new Actu();
  }

  cancel(){
    this.closeModal.emit(false);
  }

  loadIllustration(event){
    const fileList: FileList = event.target.files;

    if(fileList.length > 0){
      this.file = fileList[0];
    }
  }

  createActu(){
    this.actuService.createActu(this.file, this.actu).subscribe(
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
