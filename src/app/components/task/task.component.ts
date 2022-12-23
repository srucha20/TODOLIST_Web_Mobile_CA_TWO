import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { TodoService } from '../../services/todo.service';
import 'hammerjs';
import { Vibration } from '@ionic-native/vibration/ngx';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
})
export class TaskComponent implements OnInit {
  
  @Input() task: any; 
  @Output() onEditTaskClicked: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    private vibrate: Vibration,
    public todoService: TodoService
  ) { }

  ngOnInit() {
  }

  onMove() {
    this.vibrate.vibrate(3000);
    this.todoService.deleteTodo(this.task.taskId);
  }

  openEditPage() {
    this.onEditTaskClicked.emit(this.task);    
  }

}
