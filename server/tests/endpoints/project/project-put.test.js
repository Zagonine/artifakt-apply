import app from '../../../src/app.js'
import testDB from '../../utils/testDB'
import supertest from 'supertest'
import config from '../../../src/config'
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

describe('PUT /project/:projectId', () => {
  it('it should be a successfull update of a project', async (done) => {
    const project = {
      name: 'Test name project changed',
      code: 'ShouldNotChange'
    }
    const res = await request.put(`/project/${projectId}`).send({ name: project.name, code: project.code })
    expect(res.status).toBe(200)
    expect(res.body.project).toBeTruthy()
    expect(res.body.project.id).toBe(projectId)
    expect(res.body.project._id).not.toBeTruthy()
    expect(res.body.project.name).toBe('Test name project changed')
    expect(res.body.project.code).toBe('code56')
    expect(typeof res.body.project.created_at).toBe('number')
    done()
  })

  it('it should trigger a 404 cause not an id', async (done) => {
    const project = {
      name: 'Test name project changed'
    }
    const res = await request.put(`/project/fakeId`).send({ name: project.name })
    expect(res.status).toBe(404)
    expect(res.body.err).toBe('ProjectNotFound')
    expect(res.body.msg).toBe('Project not found')
    done()
  })

  it('it should trigger a 404 cause id not found', async (done) => {
    const project = {
      name: 'Test name project changed'
    }
    const res = await request.put(`/project/5d20d575e92b50f219bff392`).send({ name: project.name })
    expect(res.status).toBe(404)
    expect(res.body.err).toBe('ProjectNotFound')
    expect(res.body.msg).toBe('Project not found')
    done()
  })

  it('it should trigger a name validation error maxlength', async (done) => {
    const project = {
      name: 't'.repeat(config.projectSchemaRestrictions.name.maxlength + 1)
    }
    const res = await request.put(`/project/${projectId}`).send({ name: project.name })
    expect(res.status).toBe(400)
    expect(res.body.err).toBe('NameValidationError')
    expect(res.body.msg).toBe('Body param "name" is required with a maximum length of 64 chars')
    done()
  })

  it('it should trigger a name validation error name cannot be empty', async (done) => {
    const project = {
      name: ''
    }
    const res = await request.put(`/project/${projectId}`).send({ name: project.name })
    expect(res.status).toBe(400)
    expect(res.body.err).toBe('NameValidationError')
    expect(res.body.msg).toBe('Body param "name" is required with a maximum length of 64 chars')
    done()
  })
})
