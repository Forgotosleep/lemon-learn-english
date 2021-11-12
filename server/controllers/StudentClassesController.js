const { StudentClass, Class, Student } = require('../models/index')
const { Op } = require("sequelize");

class StudentClassController {
  static async addStudentClass(req, res, next) {
    try {
      const { id } = req.user
      const { classId } = req.params
      if (!Number(classId)) throw ({ name: "InvalidClassId" })
      const classData = await Class.findByPk(classId)
      if (!classData) throw ({ name: "ClassNotFound", id: classId })
      const resp = await StudentClass.create({
        studentId: id,
        classId,
        status: 'Incomplete'
      })
      res.status(201).json({ message: "Success add student to the class" })
    } catch (err) {
      next(err)
    }
  }

  static async updateStudentComplete(req, res, next) {
    try {
      const { studentClassID } = req.params
      if (!Number(studentClassID)) throw ({ name: "InvalidStudentClassId" })
      const studentClassData = await StudentClass.findByPk(studentClassID)
      if (!studentClassData) throw ({ name: "StudentClassNotFound", id: studentClassID })
      const resp = await StudentClass.update({
        status: "Complete"
      }, {
        where: {
          studentClassID
        }
      })
    } catch (err) {
      next(err)
    }
  }

  static async updateStudentHidden(req, res, next) {
    try {
      const { id } = req.params
      if (!Number(id)) throw ({ name: "InvalidStudentClassId" })
      const studentClassData = await StudentClass.findByPk(id)
      if (!studentClassData) throw ({ name: "StudentClassNotFound", id})
      const resp = await StudentClass.update({
        status: "Hidden"
      }, {
        where: {
          id
        }
      })
      res.status(200).json({messsage: "Success update status"})
    } catch (err) {
      next(err)
    }
  }

  static async getStudentEnrolledClass(req, res, next) {
    try {
      const { classId } = req.params
      if (!Number(classId)) throw ({ name: "InvalidClassId" })
      const classData = await Class.findByPk(classId)
      if (!classData) throw ({ name: "ClassNotFound", id: classId })
      const resp = await StudentClass.findAll({
        where: {
          classId,
          status: {
            [Op.notLike]: 'Hidden'
          }
        },
        include: {
          model: Student
        }
      })
      res.status(200).json(resp)
    } catch (err) {
      next(err)
    }
  }

  static async getClassEnrolled(req, res, next) {
    try {
      const { id } = req.user
      if (!Number(id)) throw ({ name: "InvalidUserId" })
      const resp = await StudentClass.findAll({
        where: {
          studentId: id
        },
        include: {
          model: Class
        }
      })
      res.status(200).json(resp)
    } catch (err) {
      next(err)
    }
  }




}


module.exports = StudentClassController