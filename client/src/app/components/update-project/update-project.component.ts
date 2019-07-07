import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms'

@Component({
  selector: 'app-update-project',
  templateUrl: './update-project.component.html',
  styleUrls: ['./update-project.component.scss']
})
export class UpdateProjectComponent implements OnInit {

  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router) { }

  project = null
  projectForm = null
  error = null

  ngOnInit() {
    this.apiService.getProjectById(this.route.snapshot.paramMap.get('projectId')).subscribe(
      (data: any) => {
        this.project = data.project
        this.projectForm =
          this.fb.group({
            name: this.fb.control(this.project.name, [Validators.required, Validators.maxLength(64)])
          })
      },
      error => {
        this.error = error.error.msg || 'Failed retrieve project'
      }
    )
  }

  get name() { return this.projectForm.get('name'); }

  onSubmit() {
    if (this.projectForm.invalid) return
    const project = {
      name: this.projectForm.value.name
    }
    this.apiService.updateProject(this.project.id, project).subscribe(
      (data: any) => this.router.navigate(['/']),
      error => {
        this.error = error.error.msg || 'Failed save project'
      }
    )
  }

}
