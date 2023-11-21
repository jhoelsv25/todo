import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AddTaskComponent } from '../../components/add-task/add-task.component';
import { ListComponent } from '../../components/list/list.component';
import { FilterComponent } from '../../components/filter/filter.component';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, AddTaskComponent, ListComponent, FilterComponent],
})
export class HomeComponent {}
