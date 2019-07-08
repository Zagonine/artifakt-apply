import app from '../../../src/app.js'
import testDB from '../../utils/testDB'
import supertest from 'supertest'
import ProjectModel from '../../../src/models/ProjectModel'

const request = supertest(app)

beforeAll(() => testDB.initConnection())

let projectId = null
// Create an event
beforeEach((done) => {
  const project = new ProjectModel({
    name: 'Test project',
    code: 'code56'
  })
  project.save((err) => {
    if (err) return done(err)
    projectId = project._id.toString()
    done()
  })
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

describe('DELETE /project/:projectId', () => {
  it('it should be a successfull deletion', async (done) => {
    const res = await request.delete(`/project/${projectId}`)
    expect(res.status).toBe(200)
    expect(res.body.status).toBe('success')
    expect(res.body.msg).toBe('Project deleted')
    done()
  })

  it('it should trigger a 404 cause not an id', async (done) => {
    const res = await request.get(`/project/fakeId`)
    expect(res.status).toBe(404)
    expect(res.body.err).toBe('ProjectNotFound')
    expect(res.body.msg).toBe('Project not found')
    done()
  })

  it('it should trigger a 404 cause id not found', async (done) => {
    const res = await request.get(`/project/5d20d575e92b50f219bff392`)
    expect(res.status).toBe(404)
    expect(res.body.err).toBe('ProjectNotFound')
    expect(res.body.msg).toBe('Project not found')
    done()
  })
})
