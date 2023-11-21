import { CommonModule } from '@angular/common';
import { Component, Injector, computed, effect, inject } from '@angular/core';
import { Task } from '../../interfaces/Task';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'list-task',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './list.component.html',
})
export class ListComponent {
  private taskService = inject(TaskService);
  private injector = inject(Injector);
  tasks = computed(() => this.taskService.tasksFiltered());
  public isEditing = false;

  ngOnInit() {
    const storage = localStorage.getItem('tasks');
    if (storage) {
      const tasks = JSON.parse(storage);
      this.taskService.tasks.set(tasks);
    }
    this.saveLocalStorage();
  }
  saveLocalStorage() {
    effect(
      () => {
        const tasks = this.tasks();
        localStorage.setItem('tasks', JSON.stringify(tasks));
      },
      { injector: this.injector }
    );
  }

  public taskCompleted(task: Task) {
    this.taskService.markCompleted(task);
  }

  public editTask(task: Task) {
    this.taskService.editTask(task);
  }
  public updateTask(task: Task, newTitle: Event) {
    const title = (newTitle.target as HTMLInputElement).value;

    this.taskService.updateTask(task, title);
  }

  public deleteTask(task: Task) {
    this.taskService.deleteTask(task);
  }
}
