export default {
  mongoDBUrl: process.env.MONGODB_URL || 'mongodb://localhost:27017/artifakt',
  projectSchemaRestrictions: {
    name: {
      maxlength: 64
    },
    code: {
      maxlength: 64
    }
  }
}
