import ProjectModel from '../models/ProjectModel'
import logger from '../utils/logger'

export default {
  projectId (req, res, next, projectId) {
    if (projectId.length !== 24) {
      return res.status(404).json({ err: 'ProjectNotFound', msg: 'Project not found' })
    }

    ProjectModel.findById(projectId).then((project) => {
      if (!project) {
        return res.status(404).json({ err: 'ProjectNotFound', msg: 'Project not found' })
      }
      req.project = project
      next()
    }).catch((err) => {
      logger.error('projectIdParams', 'Failed retrieve project', err)
      res.status(500).json({ err: 'FailedRetrieveProject', msg: 'Failed retrieve project' })
    })
  }
}
