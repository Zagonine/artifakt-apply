import app from '../../../src/app.js'
import testDB from '../../utils/testDB'
import supertest from 'supertest'
import ProjectModel from '../../../src/models/ProjectModel'

const request = supertest(app)

beforeAll(() => testDB.initConnection())

// Create an event
beforeEach(async (done) => {
  const project = new ProjectModel({
    name: 'Test project',
    code: 'code'
  })
  const project2 = new ProjectModel({
    name: 'Test project 2',
    code: 'code2'
  })
  const project3 = new ProjectModel({
    name: 'Test project 3',
    code: 'code3'
  })
  await project.save()
  await project2.save()
  await project3.save()
  done()
})

afterEach(async (done) => {
  await testDB.dump()
  done()
})

afterAll(async (done) => {
  await testDB.close()
  await app.close()
  done()
})

describe('GET /projects', () => {
  it('it should be a successfull get projects', async (done) => {
    const res = await request.get(`/projects`)
    expect(res.status).toBe(200)
    expect(res.body.projects).toBeTruthy()
    expect(res.body.projects.length).toBe(3)
    expect(res.body.projects[0].name).toBe('Test project')
    expect(res.body.projects[1].name).toBe('Test project 2')
    expect(res.body.projects[2].name).toBe('Test project 3')
    done()
  })
})
