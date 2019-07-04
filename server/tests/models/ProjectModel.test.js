import testDB from '../utils/testDB'
import ProjectModel from '../../src/models/ProjectModel'
import config from '../../src/config'

beforeAll(() => testDB.initConnection())

afterEach(async (done) => {
  await testDB.dump()
  done()
})

afterAll(() => { testDB.close() })

describe('Project Model tests', () => {
  it('it should be a successful save', (done) => {
    const project = new ProjectModel({
      name: 'test',
      code: '01code09'
    })

    project.save((err) => {
      expect(err).toBeNull()
      expect(project._id.toString().length).toBe(24)
      expect(project.code).toBe('01code09')
      expect(project.name).toBe('test')
      expect(typeof project.created_at).toBe('object')
      done()
    })
  })

  it('it should trigger an error for name required', (done) => {
    const project = new ProjectModel({
      code: 'test'
    })
    project.save((err) => {
      expect(err).toBeTruthy()
      expect(err.name).toBe('ValidationError')
      expect(err.message).toBe('projects validation failed: name: Path `name` is required.')
      done()
    })
  })

  it('it should trigger an error for code required', (done) => {
    const project = new ProjectModel({
      name: 'test'
    })
    project.save((err) => {
      expect(err).toBeTruthy()
      expect(err.name).toBe('ValidationError')
      expect(err.message).toBe('projects validation failed: code: Path `code` is required.')
      done()
    })
  })

  it('it should trigger an error for name maxlength reached', (done) => {
    const project = new ProjectModel({
      name: 't'.repeat(config.projectSchemaRestrictions.name.maxlength + 1),
      code: 'test'
    })
    project.save((err) => {
      expect(err).toBeTruthy()
      expect(err.name).toBe('ValidationError')
      expect(err.message).toContain('projects validation failed: name: Path `name`')
      expect(err.message).toContain('is longer than the maximum allowed length')
      done()
    })
  })

  it('it should trigger an error for code maxlength reached', (done) => {
    const project = new ProjectModel({
      name: 'test',
      code: 't'.repeat(config.projectSchemaRestrictions.code.maxlength + 1)
    })
    project.save((err) => {
      expect(err).toBeTruthy()
      expect(err.name).toBe('ValidationError')
      expect(err.message).toContain('projects validation failed: code: Path `code`')
      expect(err.message).toContain('is longer than the maximum allowed length')
      done()
    })
  })

  it('it should trigger an error for code not an alphanumeric value', (done) => {
    const project = new ProjectModel({
      name: 'test',
      code: '$code'
    })
    project.save((err) => {
      expect(err).toBeTruthy()
      expect(err.name).toBe('ValidationError')
      expect(err.message).toBe('projects validation failed: code: Code must be an alphanumeric value')
      done()
    })
  })

  it('it should trigger an error for code not unique', (done) => {
    const project = new ProjectModel({
      name: 'test',
      code: 'test'
    })
    project.save(async (err) => {
      expect(err).toBeNull()

      const project2 = new ProjectModel({
        name: 'test',
        code: 'test'
      })

      // @TODO: mongoose doesn't trigger ensureIndexes ??? Why ???
      await ProjectModel.ensureIndexes()

      project2.save((err) => {
        expect(err).toBeTruthy()
        expect(err.name).toBe('MongoError')
        expect(err.message).toBe('E11000 duplicate key error dup key: { : "test" }')
        done()
      })
    })
  })
})
