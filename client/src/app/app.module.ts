import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProjectsListComponent } from './components/projects-list/projects-list.component';
import { ApiService } from './services/api.service';
import { UpdateProjectComponent } from './components/update-project/update-project.component';
import { CreateProjectComponent } from './components/create-project/create-project.component';

@NgModule({
  declarations: [
    AppComponent,
    ProjectsListComponent,
    UpdateProjectComponent,
    CreateProjectComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    ApiService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
