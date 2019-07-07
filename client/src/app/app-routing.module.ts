import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProjectsListComponent } from './components/projects-list/projects-list.component';
import { UpdateProjectComponent } from './components/update-project/update-project.component';


const routes: Routes = [{
  path: '',
  component: ProjectsListComponent
}, {
  path: 'project/:projectId/update',
  component: UpdateProjectComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
