import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.scss']
})
export class CreateProjectComponent implements OnInit {

  constructor(
    private apiService: ApiService,
    private fb: FormBuilder,
    private router: Router
  ) { }

  error = null;
  createProjectForm = this.fb.group({
    name: this.fb.control('', [Validators.required, Validators.maxLength(64)]),
    code: this.fb.control('', [Validators.required, Validators.maxLength(64), Validators.pattern('^[a-zA-Z0-9]+$')])
  });

  get name() { return this.createProjectForm.get('name'); }
  get code() { return this.createProjectForm.get('code'); }

  ngOnInit() {
  }

  onSubmit() {
    if (this.createProjectForm.invalid) { return; }
    const project = {
      name: this.createProjectForm.value.name,
      code: this.createProjectForm.value.code
    };
    this.apiService.createProject(project).subscribe(
      (data: any) => this.router.navigate(['/']),
      error => {
        this.error = error.error.msg || 'Failed create project';
      }
    );
  }

}
