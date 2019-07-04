import app from '../../../src/app.js'
import testDB from '../../utils/testDB'
import supertest from 'supertest'
import config from '../../../src/config'

const request = supertest(app)

beforeAll(() => testDB.initConnection())

afterEach(async (done) => {
  await testDB.dump()
  done()
})

afterAll(() => { testDB.close() })

describe('POST /project', () => {
  it('it should be a successfull creation of a project', async (done) => {
    const project = {
      name: 'Test project',
      code: 'code'
    }
    const res = await request.post(`/project`).send({ code: project.code, name: project.name })
    expect(res.status).toBe(200)
    expect(res.body.project).toBeTruthy()
    expect(res.body.project.id.length).toBe(24)
    expect(res.body.project._id).not.toBeTruthy()
    expect(res.body.project.name).toBe('Test project')
    expect(res.body.project.code).toBe('code')
    expect(typeof res.body.project.created_at).toBe('number')
    done()
  })

  it('it should trigger an error for name required', async (done) => {
    const project = {
      code: 'code'
    }
    const res = await request.post(`/project`).send({ code: project.code })
    expect(res.status).toBe(400)
    expect(res.body.err).toBe('NameValidationError')
    expect(res.body.msg).toBe(`Body param "name" is required with a maximum length of ${config.projectSchemaRestrictions.name.maxlength} chars`)
    done()
  })

  it('it should trigger an error for code required', async (done) => {
    const project = {
      name: 'Test project'
    }
    const res = await request.post(`/project`).send({ name: project.name })
    expect(res.status).toBe(400)
    expect(res.body.err).toBe('CodeValidationError')
    expect(res.body.msg).toBe(`Body param "code" is required with a maximum length of ${config.projectSchemaRestrictions.code.maxlength} chars`)
    done()
  })

  it('it should trigger an error for name maxlength reached', async (done) => {
    const project = {
      name: 't'.repeat(config.projectSchemaRestrictions.name.maxlength + 1),
      code: 'code'
    }
    const res = await request.post(`/project`).send({ code: project.code })
    expect(res.status).toBe(400)
    expect(res.body.err).toBe('NameValidationError')
    expect(res.body.msg).toBe(`Body param "name" is required with a maximum length of ${config.projectSchemaRestrictions.name.maxlength} chars`)
    done()
  })

  it('it should trigger an error for code maxlength reached', async (done) => {
    const project = {
      name: 'Test project',
      code: 't'.repeat(config.projectSchemaRestrictions.name.maxlength + 1)
    }
    const res = await request.post(`/project`).send({ name: project.name })
    expect(res.status).toBe(400)
    expect(res.body.err).toBe('CodeValidationError')
    expect(res.body.msg).toBe(`Body param "code" is required with a maximum length of ${config.projectSchemaRestrictions.name.maxlength} chars`)
    done()
  })

  it('it should trigger an error for code not unique', async (done) => {
    const project = {
      name: 'Test project',
      code: 'code'
    }
    const firstRes = await request.post(`/project`).send({ code: project.code, name: project.name })
    expect(firstRes.status).toBe(200)
    const res = await request.post(`/project`).send({ code: project.code, name: project.name })
    expect(res.status).toBe(403)
    expect(res.body.err).toBe('CodeNotUnique')
    expect(res.body.msg).toBe('Code provided is already taken')
    done()
  })
})
