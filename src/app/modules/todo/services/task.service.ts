import {
  Injectable,
  Injector,
  computed,
  effect,
  inject,
  signal,
} from '@angular/core';
import { Task } from '../interfaces/Task';
import { Filter } from '../interfaces/filter';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private injector = inject(Injector);
  private filter = signal<Filter>('all');
  public tasks = signal<Task[]>([]);
  public tasksFiltered = computed(() => {
    const tasks = this.tasks();
    const filter = this.filter();
    switch (filter) {
      case 'all':
        return tasks;
      case 'completed':
        return tasks.filter((t) => t.completed);
      case 'pendient':
        return tasks.filter((t) => !t.completed);
    }
  });

  addTask(task: Task) {
    this.tasks.update((tasks) => [...tasks, task]);
  }

  updateTask(task: Task, title: string) {
    this.tasks.update((tasks) =>
      tasks.map((t) =>
        t.id === task.id ? { ...task, editing: false, title } : t
      )
    );
  }

  markCompleted(task: Task) {
    this.tasks.update((state) => {
      const newState = state.map((t) =>
        t.id === task.id ? { ...t, completed: !t.completed } : t
      );
      return newState;
    });
  }
  deleteTask(task: Task) {
    this.tasks.update((state) => state.filter((t) => t.id !== task.id));
  }
  editTask(task: Task) {
    if (task.completed) return;
    this.tasks.update((state) =>
      state.map((t) =>
        t.id === task.id ? { ...t, editing: true } : { ...t, editing: false }
      )
    );
  }

  filterTasks(filter: Filter) {
    this.filter.set(filter);
  }
  deleteAllCompleted() {
    this.tasks.update((state) => state.filter((t) => !t.completed));
  }
}
