import config from '../config'
import ProjectModel from '../models/ProjectModel'
import logger from '../utils/logger'
import stringUtils from '../utils/string'

export default {
  createProject (req, res) {
    const { name, code } = req.body

    if (!name || name.length === 0 || name.length > config.projectSchemaRestrictions.name.maxlength) {
      return res.status(400).json({
        err: 'NameValidationError',
        msg: `Body param "name" is required with a maximum length of ${config.projectSchemaRestrictions.name.maxlength} chars`
      })
    }

    if (!code || code.length === 0 || code.length > config.projectSchemaRestrictions.code.maxlength) {
      return res.status(400).json({
        err: 'CodeValidationError',
        msg: `Body param "code" is required with a maximum length of ${config.projectSchemaRestrictions.name.maxlength} chars`
      })
    }

    if (!stringUtils.isAlphaNumeric(code)) {
      return res.status(400).json({
        err: 'CodeValidationError',
        msg: `Body param "code" must be an alphanumeric value`
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
  },

  updateProject (req, res) {
    const project = req.project

    const { name } = req.body

    if (!name || name.length === 0 || name.length > config.projectSchemaRestrictions.name.maxlength) {
      return res.status(400).json({
        err: 'NameValidationError',
        msg: `Body param "name" is required with a maximum length of ${config.projectSchemaRestrictions.name.maxlength} chars`
      })
    }

    project.name = name

    project.save((err) => {
      if (err) {
        logger.error('updateProject', 'Failed save project', err)
        return res.status(500).json({ err: 'FailedSaveProject', msg: 'Failed save project' })
      }

      res.json({
        project: project
      })
    })
  },

  getProject (req, res) {
    res.json({ project: req.project })
  }
}
