import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { Task } from '../../interfaces/Task';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'add-task',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `<div
    class="h-16  px-5 rounded-md bg-zinc-800 flex items-center gap-3"
  >
    <span class="text-gray-300"
      ><svg
        xmlns="http://www.w3.org/2000/svg"
        width="1.5em"
        height="1.5em"
        viewBox="0 0 15 15"
      >
        <path
          fill="none"
          stroke="currentColor"
          d="M7.5 4v7M4 7.5h7m-3.5 7a7 7 0 1 1 0-14a7 7 0 0 1 0 14Z"
        /></svg
    ></span>
    <input
      #task
      [(ngModel)]="title"
      type="text"
      (keyup.enter)="addTask()"
      placeholder="Add new task"
      class="py-1.5  focus:outline-none border-none bg-transparent w-full text-gray-300"
    />
  </div>`,
})
export class AddTaskComponent {
  private taskService = inject(TaskService);
  public title = '';

  addTask() {
    if (!this.title.trim()) return;
    const newTask: Task = {
      id: crypto.randomUUID(),
      title: this.title.trim(),
      completed: false,
      createdAt: new Date(),
      updatedAt: new Date(),
      editing: false,
    };
    this.taskService.addTask(newTask);
    this.title = '';
  }
}
