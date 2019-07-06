import projectCtrl from './controllers/project'
import params from './middlewares/params'

export default function (app) {
  app.param('projectId', params.projectId)

  app.get('/', (req, res) => res.json({ msg: 'Hello Artifakt :)' }))

  // Projects routing
  app.post('/project', projectCtrl.createProject)
  app.put('/project/:projectId', projectCtrl.updateProject)

  // No route match
  app.use((req, res) => {
    return res.status(404).json({
      error: 'URLNotFound',
      msg: 'URL not found'
    })
  })
}
