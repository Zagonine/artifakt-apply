import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

const API_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) {}

  getProjectsList() {
    return this.http.get(`${API_URL}/projects`)
  }

  getProjectById(projectId) {
    return this.http.get(`${API_URL}/project/${projectId}`)
  }

  updateProject(projectId, project) {
    return this.http.put(`${API_URL}/project/${projectId}`, project)
  }

  deleteProject(projectId) {
    return this.http.delete(`${API_URL}/project/${projectId}`)
  }
}
