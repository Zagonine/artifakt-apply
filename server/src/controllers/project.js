import config from '../config'
import ProjectModel from '../models/ProjectModel'
import logger from '../utils/logger'

export default {
  createProject: (req, res) => {
    const { name, code } = req.body

    if (!name || name.length > config.projectSchemaRestrictions.name.maxlength) {
      return res.status(400).json({
        err: 'NameParamValidation',
        msg: `Body param "name" is required with a maximum length of ${config.projectSchemaRestrictions.name.maxlength} chars`
      })
    }

    if (!code || code.length > config.projectSchemaRestrictions.code.maxlength) {
      return res.status(400).json({
        err: 'CodeParamValidation',
        msg: `Body param "code" is required with a maximum length of ${config.projectSchemaRestrictions.name.maxlength} chars`
      })
    }

    // Check code is unique
    ProjectModel.countDocuments({ code: code })
      .then((count) => {
        if (count !== 0) return res.status(403).json({ err: 'CodeNotUnique', msg: 'Code provided is already taken' })

        const project = new ProjectModel({
          name: name,
          code: code
        })

        project.save((err) => {
          if (err) {
            logger.error('createProject', 'Save project failed', err)
            return res.status(500).json({ err: 'FailedSaveProject', msg: 'Failed save project in database' })
          }

          res.json({ project: project })
        })
      })
      .catch(err => {
        logger.error('createProject', 'Failed count project in order to know if not already taken', err)
        res.status(500).json({ err: 'FailedCheckUniqueCode', msg: 'Failed check "code" is unique' })
      })
  }
}
