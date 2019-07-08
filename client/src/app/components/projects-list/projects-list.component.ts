import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-projects-list',
  templateUrl: './projects-list.component.html',
  styleUrls: ['./projects-list.component.scss']
})
export class ProjectsListComponent implements OnInit {

  constructor(private apiService: ApiService) {}

  projectsList = [];
  error = null;

  ngOnInit() {
    this.apiService.getProjectsList().subscribe(
      (data: any) => this.projectsList = data.projects,
      error => {
        this.error = error.error.msg || 'Failed retrieve projects';
      }
    );
  }

  deleteProject(projectId, index) {
    this.apiService.deleteProject(projectId).subscribe(
      (data: any) => this.projectsList.splice(index, 1),
      error => {
        this.error = error.error.msg || 'Failed delete project';
      }
    );
  }
}
