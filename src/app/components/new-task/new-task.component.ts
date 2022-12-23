import { Component, OnInit, Output, EventEmitter, Input, ViewChild } from '@angular/core';
import { Capacitor } from '@capacitor/core';
import { ActionSheetController, ModalController } from '@ionic/angular';
import { TodoService } from '../../services/todo.service';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
import { PhotoService, UserPhoto } from 'src/app/services/photo.service';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.scss'],
})
export class NewTaskComponent implements OnInit {
  
  @Output() onNewTaskClicked: EventEmitter<any> = new EventEmitter<any>();
  private dateValue: any;
  showDate: boolean = false;
  selectedImg;
  showlock: boolean = true;
  showunlock: boolean = false;

  constructor(
    public modalController: ModalController,
    public todoService: TodoService,
    private screenOrientation: ScreenOrientation,
    public photoService: PhotoService, 
    public actionSheetController: ActionSheetController
  ) { 
  }

  async ngOnInit() {
    await this.photoService.loadSaved();
  }

  createNewTask() {
    if(!this.todoService.formData.name.length)
    return this.modalController.dismiss()

    this.dismiss();
    this.onNewTaskClicked.emit(this.todoService.formData)
    this.todoService.resetForm();
  
  }  

  toggleCategory() {
    document.getElementById('radio-icon').classList.remove('radio-'+ this.todoService.formData.category);
    this.todoService.formData.category = (this.todoService.formData.category == 'personal'? 'business': 'personal');
    document.getElementById('radio-icon').className += ' radio-' + this.todoService.formData.category;
  }

  
  
  dismiss() {
    this.modalController.dismiss({
      'dismissed': true
    });
  }

  updateService(name: string | any) {
    this.todoService.formData.name = name;
  }

  @ViewChild('popover') popover;

  isOpen = false;

  presentPopover(e: Event) {
    this.popover.event = e;
    this.isOpen = true;
  }

  checkPlatform(){
    if(Capacitor.getPlatform()== 'web') return true;
    return false;
  }

  
  public async showActionSheet(photo: UserPhoto, position: number) {
    const actionSheet = await this.actionSheetController.create({
      header: 'Photos',
      buttons: [{
        text: 'Delete',
        role: 'destructive',
        icon: 'trash',
        handler: () => {
          this.photoService.deletePicture(photo, position);
        }
      }, {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          // Nothing to do, action sheet is automatically closed
         }
      }]
    });
    await actionSheet.present();
  }
  
  lockOrientation(){
    console.log(this.screenOrientation.type);
    this.showlock = false;
    this.showunlock = true;
   // this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.LANDSCAPE);
   
  }
  unlcokOrientation(){
    this.showlock = true;
    this.showunlock = false;
    console.log(this.screenOrientation.type);
   // this.screenOrientation.unlock();
  }
}

