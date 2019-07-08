import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProjectsListComponent } from './components/projects-list/projects-list.component';
import { UpdateProjectComponent } from './components/update-project/update-project.component';
import { CreateProjectComponent } from './components/create-project/create-project.component';


const routes: Routes = [{
  path: '',
  component: ProjectsListComponent
}, {
  path: 'project/:projectId/update',
  component: UpdateProjectComponent
}, {
  path: 'project/create',
  component: CreateProjectComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
