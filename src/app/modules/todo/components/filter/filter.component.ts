import { CommonModule } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { Filter } from '../../interfaces/filter';

@Component({
  selector: 'filter-task',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './filter.component.html',
})
export class FilterComponent {
  private taskService = inject(TaskService);
  public totalTasks = computed(() => this.taskService.tasks().length);
  public currentFilter: string = 'all';

  public filterTasks(filter: Filter) {
    this.taskService.filterTasks(filter);
    this.currentFilter = filter;
  }
  public deleteAllCompleted() {
    this.taskService.deleteAllCompleted();
  }
}
