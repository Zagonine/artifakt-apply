import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { UpdateProjectComponent } from './update-project.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';

describe('UpdateProjectComponent', () => {
  let component: UpdateProjectComponent;
  let fixture: ComponentFixture<UpdateProjectComponent>;

  beforeEach(async(() => {
    const apiServiceSpy = jasmine.createSpyObj('ApiService', ['getProjectById', 'updateProject']);
    const getProjectsListSpy = apiServiceSpy.getProjectById.and.returnValue(
      of(
        { project:
          {
            id: "5d21e4f84557ae235c13d125",
            name: "Acme Project",
            code: "acme",
            created_at: 1562502392047
          }
        }
      )
    )
    const updateProjectsListSpy = apiServiceSpy.updateProject.and.returnValue(
      of(
        { project:
          {
            id: "5d21e4f84557ae235c13d125",
            name: "Acme Project",
            code: "acme",
            created_at: 1562502392047
          }
        }
      )
    )

    TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule, RouterTestingModule],
      providers: [{provide: ApiService, useValue: apiServiceSpy }],
      declarations: [ UpdateProjectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have prefilled value in name input', () => {
    expect(component.projectForm.value.name).toBe("Acme Project")
  })

  it('should call onSubmit() when save form', () => {
    spyOn(component, 'onSubmit');

    let form = fixture.debugElement.query(By.css('form'));
    form.triggerEventHandler('submit', null);
    fixture.detectChanges();

    expect(component.onSubmit).toHaveBeenCalledWith();
  })
});
