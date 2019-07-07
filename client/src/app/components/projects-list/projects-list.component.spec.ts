import { async, ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';

import { ProjectsListComponent } from './projects-list.component';
import { RouterTestingModule } from '@angular/router/testing';
import { ApiService } from 'src/app/services/api.service';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';

describe('ProjectsListComponent', () => {
  let component: ProjectsListComponent;
  let fixture: ComponentFixture<ProjectsListComponent>;

  beforeEach(async(() => {
    const apiServiceSpy = jasmine.createSpyObj('ApiService', ['getProjectsList', 'deleteProject']);
    const getProjectsListSpy = apiServiceSpy.getProjectsList.and.returnValue(
      of({
        projects: [{
          id: '5d21e4f84557ae235c13d125',
          name: 'Acme Project',
          code: 'acme',
          created_at: 1562502392047
        }, {
          id: '5d21e5074557ae235c13d126',
          name: 'Pink Floyd project',
          code: 'pinkfloyd',
          created_at: 1562502407867
        }]
      })
    );
    const deleteProjectSpy = apiServiceSpy.deleteProject.and.returnValue(
      of({status: 'success', msg: 'Project deleted'})
    );

    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [{provide: ApiService, useValue: apiServiceSpy }],
      declarations: [ ProjectsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have two items in projectsList', () => {
    expect(component.projectsList.length).toBe(2);
  });

  it('should have two rows in HTML tabled', () => {
    const htmlElement: HTMLElement = fixture.nativeElement;
    const table = htmlElement.querySelectorAll('table tbody tr');
    expect(table.length).toBe(2);
  });

  it('should display name and code in HTML table', () => {
    const htmlElement: HTMLElement = fixture.nativeElement;
    const td = htmlElement.querySelectorAll('table tbody tr td');
    expect(td[0].textContent).toBe(component.projectsList[0].name);
    expect(td[1].textContent).toBe(component.projectsList[0].code);
    expect(td[3].textContent).toBe(component.projectsList[1].name);
    expect(td[4].textContent).toBe(component.projectsList[1].code);
  });

  it('should delete one item', () => {
    const button = fixture.debugElement.query(By.css('.deleteProject'));
    button.triggerEventHandler('click', null);

    fixture.detectChanges();

    // Test item is delete from projectsList
    expect(component.projectsList.length).toBe(1);

    // Test item has been delete from html table
    const htmlElement: HTMLElement = fixture.nativeElement;
    const table = htmlElement.querySelectorAll('table tbody tr');
    expect(table.length).toBe(1);
  });

});

