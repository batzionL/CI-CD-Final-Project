const { json } = require('express');
const fs = require('fs');
const Project = require('../models/Project.js');
const ProposalReport = require('../models/ProposalReport.js');
const AlfaReport = require('../models/AlfaReport.js');
const BetaReport = require('../models/BetaReport.js');
const FinalReport = require('../models/FinalReport.js');
const Moderator = require('../models/Moderator.js')
const Student = require('../models/Student.js')
const Coordinator = require('../models/Coordinator.js');
const DateOfSubmission = require('../models/DateOfSubmission.js');
const Grade = require('../models/Grades.js');
const SubRpt = require('../models/SubmissionReport.js');
const ActvPjts = require('../models/ActiveProjects.js');
const path = require('path');
const nodemailer = require('nodemailer');
require('dotenv').config();
const userEmail = process.env.USEREMAIL;
const passEmail = process.env.PASSEMAIL;

module.exports = {

    createProject: function (req, res) {
        if (!req.body) res.status(400).send("There is no body")
        else {
            const project = new Project(req.body);

            project.save().then(project =>
                res.status(200).send(project)
            ).catch(e => res.status(400).send(e))
        }
    },

    createUploadPropRep: async function (req, res) {
        const fileName = req.params.fileName;
        const filePath = path.join('uploads', fileName);

        const newFile = new ProposalReport({
            propos_rpt_name: fileName,
            propos_rpt_path: filePath,
            propos_rpt_id: req.params.fileId
        });
        // const oldFileName = req.file.filename;
        // await uploadHandle(newFile, oldFileName, fileName, res);

        try {
            await newFile.save();
            // console.log(newFile)
            res.status(200).send(newFile);
            const oldFilePath = path.join('uploads', req.file.filename); // Use req.file.filename to get the file path
            const newFilePath = path.join('uploads', fileName);
            fs.rename(oldFilePath, newFilePath, function (err) {
                if (err) {
                    console.error("Error renaming file:", err);
                } else {
                    // console.log(newFile)
                    console.log("File renamed successfully.");
                }
            });
        } catch (error) {
            console.error("Error saving file to MongoDB:", error);
            res.status(500).send("Internal Server Error");
        }
    },

    createUploadAlfaRep: async function (req, res) {
        const fileName = req.params.fileName;
        const filePath = path.join('uploads', fileName);

        const newFile = new AlfaReport({
            alfa_rpt_name: fileName,
            alfa_rpt_path: filePath,
            alfa_rpt_id: req.params.fileId
        });
        try {
            await newFile.save();
            res.status(200).send(newFile);
            const oldFilePath = path.join('uploads', req.file.filename); // Use req.file.filename to get the file path
            const newFilePath = path.join('uploads', fileName);
            fs.rename(oldFilePath, newFilePath, function (err) {
                if (err) {
                    console.error("Error renaming file:", err);
                } else {
                    console.log("File renamed successfully.");
                }
            });
        } catch (error) {
            console.error("Error saving file to MongoDB:", error);
            res.status(500).send("Internal Server Error");
        }
    },

    createUploadBetaRep: async function (req, res) {
        console.log(req.params)
        // console.log(req.body)
        const fileName = req.params.fileName;
        const filePath = path.join('uploads', fileName);

        const newFile = new BetaReport({
            beta_rpt_name: fileName,
            beta_rpt_path: filePath,
            beta_rpt_id: req.params.fileId
        });
        try {
            await newFile.save();
            // console.log(newFile)
            res.status(200).send(newFile);
            const oldFilePath = path.join('uploads', req.file.filename); // Use req.file.filename to get the file path
            const newFilePath = path.join('uploads', fileName);
            fs.rename(oldFilePath, newFilePath, function (err) {
                if (err) {
                    console.error("Error renaming file:", err);
                } else {
                    console.log("File renamed successfully.");
                }
            });
        } catch (error) {
            console.error("Error saving file to MongoDB:", error);
            res.status(500).send("Internal Server Error");
        }
    },

    createUploadFinalRep: async function (req, res) {
        const fileName = req.params.fileName;
        const filePath = path.join('uploads', fileName);

        const newFile = new FinalReport({
            final_rpt_name: fileName,
            final_rpt_path: filePath,
            final_rpt_id: req.params.fileId
        });
        try {
            await newFile.save();
            res.status(200).send(newFile);
            const oldFilePath = path.join('uploads', req.file.filename); // Use req.file.filename to get the file path
            const newFilePath = path.join('uploads', fileName);
            fs.rename(oldFilePath, newFilePath, function (err) {
                if (err) {
                    console.error("Error renaming file:", err);
                } else {
                    console.log("File renamed successfully.");
                }
            });
        } catch (error) {
            console.error("Error saving file to MongoDB:", error);
            res.status(500).send("Internal Server Error");
        }
    },

    createStudent: function (req, res) {
        if (!req.body) res.status(400).send("There is no body")
        else {
            const student = new Student(req.body);
            student.save().then(student =>
                res.status(200).send(student)
            ).catch(e => res.status(400).send(e))
        }
    },

    createModerator: function (req, res) {
        if (!req.body) res.status(400).send("There is no body")
        else {
            const moderator = new Moderator(req.body);
            moderator.save().then(moderator =>
                res.status(200).send(moderator)
            ).catch(e => res.status(400).send(e))
        }
    },

    createCoordinator: function (req, res) {
        if (!req.body) res.status(400).send("There is no body")
        else {
            const coordinator = new Coordinator(req.body);
            coordinator.save().then(coordinator =>
                res.status(200).send(coordinator)
            ).catch(e => res.status(400).send(e))
        }
    },

    //שמירת תאריכי הגשה
    DateOfSub: function (req, res) {
        if (!req.body) res.status(400).send("There is no body")
        else {
            const dateOfSub = new DateOfSubmission(req.body);
            dateOfSub.save().then(dateOfSub =>
                res.status(200).send(dateOfSub)
            ).catch(e => res.status(400).send(e))
        }
    },

    CreateGradeDoc: function (req, res) {
        if (!req.body) res.status(400).send("There is no body")
        else {
            const gradeDoc = new Grade(req.body);
            gradeDoc.save().then(gradeDoc =>
                res.status(200).send(gradeDoc._id)
            ).catch(e => res.status(400).send(e))
        }
    },

    CreateSubDoc: function (req, res) {
        if (!req.body) res.status(400).send("There is no body")
        else {
            const subDoc = new SubRpt(req.body);
            subDoc.save().then(subDoc =>
                res.status(200).send(subDoc._id)
            ).catch(e => res.status(400).send(e))
        }
    },

    createActivePjts: function (req, res) {
        if (!req.body) res.status(400).send("There is no body")
        else {
            const actvPjts = new ActvPjts(req.body);
            actvPjts.save().then(actvPjts =>
                res.status(200).send(actvPjts)
            ).catch(e => res.status(400).send(e))
        }
    },

    sendEmailFirstSign: function (req, res) {
        const { email, password } = req.body;

        const transporter = nodemailer.createTransport({
            service: 'Gmail', // You can use other services
            auth: {
                user: userEmail,
                pass: passEmail,
            }
        });

        const mailOptions = {
            from: userEmail,
            to: email,
            subject: 'סיסמה לכניסה ראשונה',
            text: "הסיסמה היא: " + password
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return res.status(500).send(error.toString());
            }
            res.status(200).send('Email sent: ' + info.response);
        });
    },

    getModByUsername: function (req, res) {
        // console.log(req.params)
        // if (!req.params["id"]) res.status(400).send("There is no id");
        Moderator.find({ "username": req.params.username }).then(moderator => {
            // console.log(moderator)
            res.status(200).send(moderator)
        }
        ).catch(e => res.status(500).send())
    },

    getProjects: async function (req, res) {
        await Project.find().then(project =>
            res.send(project)
        ).catch(e => res.status(500).send())
    },

    getIdSdt: function (req, res) {
        Student.find({ "sdt_ID": req.params.id }).then(student => {
            res.status(200).send(student)
        }
        ).catch(e => res.status(500).send())
    },

    getIdMod: function (req, res) {
        Moderator.find({ "mod_ID": req.params.id }).then(moderator => {
            res.status(200).send(moderator)
        }
        ).catch(e => res.status(500).send())
    },

    getPasswordSdt: function (req, res) {
        Student.find({ "username": req.params.username }).then(student => {
            res.status(200).send(student)
        }
        ).catch(e => res.status(500).send())
    },

    getPasswordMod: function (req, res) {
        Moderator.find({ "username": req.params.username }).then(moderator => {
            // console.log(moderator)
            res.status(200).send(moderator)
        }
        ).catch(e => res.status(500).send())
    },

    getStudents: function (req, res) {
        Student.find().then(student =>
            res.send(student)
        ).catch(e => res.status(500).send())
    },

    getModerators: function (req, res) {
        // console.log('getModerators')
        Moderator.find().then(moderator =>
            // console.log(moderator)
            res.send(moderator)
        ).catch(e => res.status(500).send())
    },

    getCoodinator: function (req, res) {
        // if (!req.params["id"]) res.status(400).send("There is no id");
        Coordinator.find().then(coordinator =>
            // console.log('getCoodinator - ', coordinator[0]),
            res.send(coordinator)
        ).catch(e => res.status(500).send())
    },

    /* getProject()
    get id conference and show lecturer list of this conference
    return with status 200 in success
    */
    getProject: function (req, res) {
        if (!req.params["id"]) res.status(400).send("There is no id");
        //If the conference doesnt exist
        // console.log('getProject - ')
        // console.log(req.params)
        Project.find({ "_id": req.params.id }).then(project => {
            // console.log(project),
            res.status(200).send(project)
        }
        ).catch(e => res.status(500).send())
    },

    //מחזיר את רשימת הפרויקטים שמנחה זה מנחה
    getModeratorProjects: function (req, res) {
        // console.log(req.params.id)
        Moderator.find({ "mod_ID": req.params.id }).then(moderator => {
            // console.log(moderator[0])
            res.status(200).send(moderator[0].projects_arr)
        }
        ).catch(e => res.status(500).send())
    },

    getEmailMod: function (req, res) {
        // console.log(req.params.id)
        Moderator.find({ "mod_ID": req.params.id }).then(moderator => {
            // console.log(moderator[0].mod_email)
            res.status(200).send(moderator[0].mod_email)
        }
        ).catch(e => res.status(500).send())
    },

    //מחזיר את הפרויקטים שמנחה זה שופט
    getProjetsById: function (req, res) {
        // console.log(req.params.id)
        Moderator.find({ "mod_ID": req.params.id_mod }).then(moderator => {
            // console.log(moderator[0].mod_email)
            res.status(200).send(moderator[0].judge_project_arr)
        }
        ).catch(e => res.status(500).send())
    },

    //מחזיר את רשימת האיידי של הציונים של הפרויקטים שהמנחה שופט
    getGradeIdDoc: function (req, res) {
        // console.log(req.params.id)
        Moderator.find({ "mod_ID": req.params.id_mod }).then(moderator => {
            // console.log(moderator[0].mod_email)
            res.status(200).send(moderator[0].Grades_arr_judge)
        }
        ).catch(e => res.status(500).send())
    },

    //מחזיר את רשימת האיידי של הציונים של אותו פרויקט
    getGradeId: function (req, res) {
        Project.find({ "_id": req.params.id_pjt }).then(project => {
            res.status(200).send(project[0].Grades_arr)
        }
        ).catch(e => res.status(500).send())
    },

    // //מחזיר את רשימת האיידי של האישורים של הפרויקטים שהמנחה שופט
    // getSubRptIdDoc: function (req, res) {
    //     Moderator.find({ "mod_ID": req.params.id_mod }).then(moderator => {
    //         res.status(200).send(moderator[0].SubRpt)
    //     }
    //     ).catch(e => res.status(500).send())
    // },

    // //מחזיר את רשימת האיידי של האישורים של אותו פרויקט
    // getSubRptId: function (req, res) {
    //     Project.find({ "_id": req.params.id_pjt }).then(project => {
    //         res.status(200).send(project[0].SubRpt)
    //     }
    //     ).catch(e => res.status(500).send())
    // },

    getDates: function (req, res) {
        DateOfSubmission.find().then(dateOfSub =>
            res.send(dateOfSub)
        ).catch(e => res.status(500).send())
    },

    //הצמדת פרויקט לכפתור
    getModeratorProjectsJudge: function (req, res) {
        const idBtn = req.params.idBtn;
        Moderator.find({ "mod_ID": req.params.id }).then(moderator => {
            if (idBtn === "firstPjt") {
                if (moderator[0].judge_project_arr[0] != "") {
                    res.status(200).send(moderator[0].judge_project_arr[0])
                }
            }
            else if (idBtn === "secondPjt") {
                if (moderator[0].judge_project_arr[1] != "") {
                    res.status(200).send(moderator[0].judge_project_arr[1])
                }
            }
            else {
                if (moderator[0].judge_project_arr[2] != "") {
                    res.status(200).send(moderator[0].judge_project_arr[2])
                }
            }
        }
        ).catch(e => res.status(500).send())
    },

    //מחזיר את מסמך הציונים התואם לאיידי שנשלח
    getGrdsDoc: function (req, res) {
        Grade.find({ "_id": req.params.gradeId }).then(grade => {
            res.status(200).send(grade)
        }
        ).catch(e => res.status(500).send())
    },

    //מחזיר את מסמך האישורים התואם לאיידי שנשלח
    getSubsDoc: function (req, res) {
        SubRpt.find({ "_id": req.params.subId }).then(subRpt => {
            res.status(200).send(subRpt)
        }
        ).catch(e => res.status(500).send())
    },

    getSdtbyPjtId: function (req, res) {
        Student.find({ "id_pjt": req.params.id }).then(student => {
            res.status(200).send(student)
        }
        ).catch(e => res.status(500).send())
    },

    actvPjtsList: async function (req, res) {
        await ActvPjts.find().then(actvPjts =>
            res.send(actvPjts)
        ).catch(e => res.status(500).send())
    },

    getModByIdDoc: function (req, res) {
        Moderator.find({ "_id": req.params.id }).then(moderator => {
            // console.log(moderator)
            res.status(200).send(moderator)
        }
        ).catch(e => res.status(500).send())
    },

    checkRptUpload: function (req, res) {
        const nameRpt = req.params.nameRpt;
        if (nameRpt == 'prop') [
            ProposalReport.find().then(proposalRpt => {
                res.status(200).send(proposalRpt)
            }).catch(e => res.status(500).send())
        ]
        else if (nameRpt == 'alfa') [
            AlfaReport.find().then(alfaRpt => {
                res.status(200).send(alfaRpt)
            }).catch(e => res.status(500).send())
        ]
        else if (nameRpt == 'beta') [
            BetaReport.find().then(betaRpt => {
                res.status(200).send(betaRpt)
            }).catch(e => res.status(500).send())
        ]
        else[
            FinalReport.find().then(finalRpt => {
                res.status(200).send(finalRpt)
            }).catch(e => res.status(500).send())
        ]
    },

    updateProject: function (req, res) {
        Project.findOneAndUpdate({ "_id": req.params.id }, req.body, { new: true, runValidators: true }).then(project => {
            if (!project) {
                return res.status(404).send('There is no project')
            }
            else {
                res.send(project)
            }
        }).catch(e => res.status(400).send(e))
    },

    updateStudent: function (req, res) {
        // console.log('updateStudent')
        const updates = Object.keys(req.body)
        const allowedUpdates = ['password'];
        const isValidOperation = updates.length === 1 && updates[0] === 'password';

        if (!isValidOperation) {
            return res.status(400).send({ error: 'Invalid updates!' })
        }

        Student.findOneAndUpdate({ "sdt_ID": req.params.id }, { "password": req.body.password }, { new: true, runValidators: true })
            .then(student => {
                if (!student) {
                    return res.status(404).send('There is no project')
                }
                else {
                    res.send(student)
                }
            }).catch(e => res.status(400).send(e))
    },

    updateModerator: function (req, res) {
        // console.log('in updateS')
        const updates = Object.keys(req.body)
        const allowedUpdates = ['password'];
        const isValidOperation = updates.length === 1 && updates[0] === 'password';
        if (!isValidOperation) {
            return res.status(400).send({ error: 'Invalid updates!' })
        }
        Moderator.findOneAndUpdate({ "mod_ID": req.params.id }, { "password": req.body.password }, { new: true, runValidators: true })
            .then(moderator => {
                if (!moderator) {
                    return res.status(404).send('There is no project')
                }
                else {
                    res.send(moderator)
                }
            }).catch(e => res.status(400).send(e))
    },


    ///////////////////////////////////
    // updateDateOfSub: function (req, res) {
    //     console.log('in updates')
    //     console.log(req.body)
    //     const update = Object.keys(req.body)
    //     // console.log(updates)
    //     //var myObject = { a: 'c', b: 'a', c: 'b' };
    //     // var keyNames = Object.keys(myObject);
    //     // const allowedUpdates = ['password'];
    //     // const allowedUpdates = [updates];
    //     // const isValidOperation = updates.length === 1 && updates[0] === 'password';
    //     // if (!isValidOperation) {
    //     //     return res.status(400).send({ error: 'Invalid updates!' })
    //     // }
    //     if (update === "alfaRpt") {
    //         DateOfSubmission.findOneAndUpdate({ updates: req.body.password }, { new: true, runValidators: true })
    //             .then(moderator => {
    //                 if (!moderator) {
    //                     return res.status(404).send('There is no project')
    //                 }
    //                 else {
    //                     res.send(moderator)
    //                 }
    //             }).catch(e => res.status(400).send(e))
    //     }
    //     // DateOfSubmission.findOneAndUpdate({ updates: req.body.password }, { new: true, runValidators: true })
    //     //     .then(moderator => {
    //     //         if (!moderator) {
    //     //             return res.status(404).send('There is no project')
    //     //         }
    //     //         else {
    //     //             res.send(moderator)   
    //     //         }
    //     //     }).catch(e => res.status(400).send(e))
    // },

    updateStudentIdPjt: function (req, res) {
        // console.log('in updateS')
        // console.log(req.body)
        const updates = Object.keys(req.body)
        const allowedUpdates = ['id_pjt', 'id_grade'];
        const isValidOperation = updates.every((update) => allowedUpdates.includes(update));
        if (!isValidOperation) {
            return res.status(400).send({ error: 'Invalid updates!' })
        }
        Student.findOneAndUpdate({ "sdt_ID": req.params.id }, req.body, { new: true, runValidators: true })
            .then(student => {
                if (!student) {
                    return res.status(404).send('There is no student')
                }
                else {
                    // console.log(student)
                    res.send(student)
                }
            }).catch(e => res.status(400).send(e))
    },

    SaveGrades: function (req, res) {
        // console.log('in updateS')
        // console.log(req.body)
        const idBtn = req.body.idBtn;
        // // const allowedUpdates = ['id_pjt'];
        // const isValidOperation = updates.length === 1 && updates[0] === 'id_pjt';
        // if (!isValidOperation) {
        //     return res.status(400).send({ error: 'Invalid updates!' })
        // }

        if (idBtn === "alfa") {
            Grade.findOneAndUpdate({ "_id": req.params.id }, { "alfa_rpt_grd": req.body.grd }, { new: true, runValidators: true })
                .then(grade => {
                    if (!grade) {
                        return res.status(404).send('There is no student')
                    }
                    else {
                        res.send(grade)
                    }
                }).catch(e => res.status(400).send(e))
        }

        else if (idBtn === "final") {
            Grade.findOneAndUpdate({ "_id": req.params.id }, { "final_rpt_grd": req.body.grd }, { new: true, runValidators: true })
                .then(grade => {
                    if (!grade) {
                        return res.status(404).send('There is no student')
                    }
                    else {
                        res.send(grade)
                    }
                }).catch(e => res.status(400).send(e))
        }

        else {
            Grade.findOneAndUpdate({ "_id": req.params.id }, { "final_grd_pjt": req.body.grd }, { new: true, runValidators: true })
                .then(grade => {
                    if (!grade) {
                        return res.status(404).send('There is no student')
                    }
                    else {
                        res.send(grade)
                    }
                }).catch(e => res.status(400).send(e))
        }
    },

    SaveSubs: function (req, res) {
        if (req.body.idBtn === "proposal") {
            SubRpt.findOneAndUpdate({ "_id": req.params.id }, { "prop_rpt_sub": "ok" }, { new: true, runValidators: true })
                .then(subRpt => {
                    if (!subRpt) {
                        return res.status(404).send('There is no submission')
                    }
                    else {
                        res.send(subRpt)
                    }
                }).catch(e => res.status(400).send(e))
        }

        else if (req.body.idBtn === "alfa") {
            SubRpt.findOneAndUpdate({ "_id": req.params.id }, { "alfa_rpt_sub": "ok" }, { new: true, runValidators: true })
                .then(subRpt => {
                    if (!subRpt) {
                        return res.status(404).send('There is no submission')
                    }
                    else {
                        res.send(subRpt)
                    }
                }).catch(e => res.status(400).send(e))
        }

        else if (req.body.idBtn === "beta") {
            SubRpt.findOneAndUpdate({ "_id": req.params.id }, { "beta_rpt_sub": "ok" }, { new: true, runValidators: true })
                .then(subRpt => {
                    if (!subRpt) {
                        return res.status(404).send('There is no submission')
                    }
                    else {
                        res.send(subRpt)
                    }
                }).catch(e => res.status(400).send(e))
        }

        else if (req.body.idBtn === "final") {
            SubRpt.findOneAndUpdate({ "_id": req.params.id }, { "final_rpt_sub": "ok" }, { new: true, runValidators: true })
                .then(subRpt => {
                    if (!subRpt) {
                        return res.status(404).send('There is no submission')
                    }
                    else {
                        res.send(subRpt)
                    }
                }).catch(e => res.status(400).send(e))
        }

        // else {
        //     Grade.findOneAndUpdate({ "_id": req.params.id }, { "final_grd_pjt": req.body.grd }, { new: true, runValidators: true })
        //         .then(grade => {
        //             if (!grade) {
        //                 return res.status(404).send('There is no student')
        //             }
        //             else {
        //                 res.send(grade)
        //             }
        //         }).catch(e => res.status(400).send(e))
        // }
    },

    UpdateGradeDocId: function (req, res) {
        const updates = Object.keys(req.body)
        const allowedUpdates = ['id_judge']
        const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

        if (!isValidOperation) {
            return res.status(400).send({ error: 'Invalid updates!' })
        }
        Grade.findOneAndUpdate({ "_id": req.params.id_grd }, { "id_judge": req.body.id_judge }, { new: true, runValidators: true }).then(grade => {
            if (!grade) {
                return res.status(404).send('There is no project')
            }
            else {
                res.send(grade)
            }
        }).catch(e => res.status(400).send(e))
    },

    // UpdateSubDocId: function (req, res) {
    //     // console.log("UpdateSubDocId")
    //     // console.log(req.body)
    //     const updates = Object.keys(req.body)
    //     const allowedUpdates = ['id_judge']
    //     const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    //     if (!isValidOperation) {
    //         return res.status(400).send({ error: 'Invalid updates!' })
    //     }
    //     SubRpt.findOneAndUpdate({ "_id": req.params.id_sub }, { "id_judge": req.body.id_judge }, { new: true, runValidators: true }).then(subRpt => {
    //         if (!subRpt) {
    //             return res.status(404).send('There is no project')
    //         }
    //         else {
    //             res.send(subRpt)
    //         }
    //     }).catch(e => res.status(400).send(e))
    // },

    //שומר את האיידי של המסמך שהועלה אצל הסטודנט
    saveIdRptInSdt: function (req, res) {
        if (req.params.nameRpt === "prop") {
            Student.findOneAndUpdate({ "sdt_ID": req.params.id_sdt }, { "id_prop_rpt": req.body.id_prop_rpt }, { new: true, runValidators: true })
                .then(student => {
                    if (!student) {
                        return res.status(404).send('There is no submission')
                    }
                    else {
                        res.send(student)
                    }
                }).catch(e => res.status(400).send(e))
        }

        else if (req.params.nameRpt === "alfa") {
            Student.findOneAndUpdate({ "sdt_ID": req.params.id_sdt }, { "id_alfa_rpt": req.body.id_alfa_rpt }, { new: true, runValidators: true })
                .then(student => {
                    if (!student) {
                        return res.status(404).send('There is no submission')
                    }
                    else {
                        res.send(student)
                    }
                }).catch(e => res.status(400).send(e))
        }

        else if (req.params.nameRpt === "beta") {
            Student.findOneAndUpdate({ "sdt_ID": req.params.id_sdt }, { "id_beta_rpt": req.body.id_beta_rpt }, { new: true, runValidators: true })
                .then(student => {
                    if (!student) {
                        return res.status(404).send('There is no submission')
                    }
                    else {
                        res.send(student)
                    }
                }).catch(e => res.status(400).send(e))
        }

        else if (req.params.nameRpt === "final") {
            Student.findOneAndUpdate({ "sdt_ID": req.params.id_sdt }, { "id_final_rpt": req.body.id_final_rpt }, { new: true, runValidators: true })
                .then(student => {
                    if (!student) {
                        return res.status(404).send('There is no submission')
                    }
                    else {
                        res.send(student)
                    }
                }).catch(e => res.status(400).send(e))
        }
    },

    AddProjectToModerator: function (req, res) {
        // console.log('AddProjectToModerator')
        // console.log(req.body)
        // console.log(req.params.modID)
        if (!req.body) res.status(400).send("There is no body");
        // else if (!req.params["_id"] || !req.body.modID) res.status(400).send("Missing parameters");
        else {
            //find the specific moderator and update it
            Moderator.findOneAndUpdate({ "mod_ID": req.params.modID }, { $push: { projects_arr: req.body.projectID } }, { new: true, runValidators: true }).then(moderator => {
                if (!moderator) {
                    return res.status(404).send()
                }
                else {
                    res.status(200).send(moderator)
                }
            }).catch(e => res.status(400).send(e))
        }
    },

    SaveGrdInPjt: function (req, res) {
        // console.log('SaveGrdInPjt')
        if (!req.body) res.status(400).send("There is no body");
        else {
            //find the specific project and update it
            Project.findOneAndUpdate({ "_id": req.params.id_pjt }, { $push: { Grades_arr: req.body.GradeID } }, { new: true, runValidators: true }).then(project => {
                if (!project) {
                    return res.status(404).send()
                }
                else {
                    res.status(200).send(project)
                }
            }).catch(e => res.status(400).send(e))
        }
    },

    SaveSubInPjt: function (req, res) {
        // console.log('SaveSubInPjt')
        // console.log(req.params)
        // console.log(req.body)


        // const updates = Object.keys(req.body)
        // const allowedUpdates = ['password'];
        // const isValidOperation = updates.length === 1 && updates[0] === 'password';
        // if (!isValidOperation) {
        //     return res.status(400).send({ error: 'Invalid updates!' })
        // }
        Project.findOneAndUpdate({ "_id": req.params.id_pjt }, { "sub_rpt_id": req.body.SubRptID }, { new: true, runValidators: true })
            .then(project => {
                if (!project) {
                    return res.status(404).send('There is no project')
                }
                else {
                    res.send(project)
                }
            }).catch(e => res.status(400).send(e))
    },

    addJdgNameToActvPjts: function (req, res) {
        // console.log('oops')
        // console.log(req.params)
        // console.log(req.body)

        const num = req.body.num;

        if (num == 1) {
            ActvPjts.findOneAndUpdate({ "idPjt": req.params.id }, { "jdgName1": req.body.jdgName }, { new: true, runValidators: true })
                .then(actvPjts => {
                    if (!actvPjts) {
                        return res.status(404).send('There is no doc of this pjt')
                    }
                    else {
                        res.send(actvPjts)
                    }
                }).catch(e => res.status(400).send(e))
        }

        else if (num == 2) {
            ActvPjts.findOneAndUpdate({ "idPjt": req.params.id }, { "jdgName2": req.body.jdgName }, { new: true, runValidators: true })
                .then(actvPjts => {
                    if (!actvPjts) {
                        return res.status(404).send('There is no doc of this pjt')
                    }
                    else {
                        res.send(actvPjts)
                    }
                }).catch(e => res.status(400).send(e))
        }

        else if (num == 3) {
            ActvPjts.findOneAndUpdate({ "idPjt": req.params.id }, { "jdgName3": req.body.jdgName }, { new: true, runValidators: true })
                .then(actvPjts => {
                    if (!actvPjts) {
                        return res.status(404).send('There is no doc of this pjt')
                    }
                    else {
                        res.send(actvPjts)
                    }
                }).catch(e => res.status(400).send(e))
        }
    },

    updateActvPjts: function (req, res) {
        const num = req.body.num;
        // console.log(req.params)
        // console.log(req.body)

        if (num == 1) {
            ActvPjts.findOneAndUpdate({ "idPjt": req.params.id }, { "sdtName1": req.body.name }, { new: true, runValidators: true })
                .then(actvPjts => {
                    if (!actvPjts) {
                        return res.status(404).send('There is no doc of this pjt')
                    }
                    else {
                        // console.log('actvPjts 1- ', actvPjts)
                        res.send(actvPjts)
                    }
                }).catch(e => res.status(400).send(e))
        }

        else if (num == 2) {
            ActvPjts.findOneAndUpdate({ "idPjt": req.params.id }, { "sdtName2": req.body.name }, { new: true, runValidators: true })
                .then(actvPjts => {
                    if (!actvPjts) {
                        return res.status(404).send('There is no doc of this pjt')
                    }
                    else {
                        // console.log('actvPjts 2-', actvPjts)
                        res.send(actvPjts)
                    }
                }).catch(e => res.status(400).send(e))
        }
    },

    updateSubDates: function (req, res) {

        DateOfSubmission.updateOne({}, req.body, { new: true, runValidators: true })
            .then(dateOfSub => {
                if (dateOfSub.nModified === 0) {
                    res.status(404).send('No document updated');
                }
                else {
                    // console.log(dateOfSub),
                    res.send(dateOfSub)
                }
            }).catch(e => res.status(400).send(e))
    },

    AddProjectToJudge: function (req, res) {
        if (!req.body) res.status(400).send("There is no body");
        else {
            //find the specific moderator and update it
            Moderator.findOneAndUpdate({ "_id": req.params.id_judge }, { $push: { judge_project_arr: req.body.projectID } }, { new: true, runValidators: true }).then(moderator => {
                if (!moderator) {
                    return res.status(404).send()
                }
                else {
                    res.status(200).send(moderator)
                }
            }).catch(e => res.status(400).send(e))
        }
    },

    // This function add id's judges to project
    AddJudgesToProject: function (req, res) {
        if (!req.body) res.status(400).send("There is no body");
        else {
            //find the specific moderator and update it
            Project.findOneAndUpdate({ "_id": req.params.id_pjt }, { $push: { Judges_arr: req.body.JudgeID, } }, { new: true, runValidators: true }).then(project => {
                if (!project) {
                    return res.status(404).send()
                }
                else {
                    res.status(200).send(project)
                }
            }).catch(e => res.status(400).send(e))
        }
    },

    addJudgeGrd: function (req, res) {
        if (!req.body) res.status(400).send("There is no body");
        else {
            //find the specific moderator and update it
            Moderator.findOneAndUpdate({ "_id": req.params.id }, { $push: { Grades_arr_judge: req.body.id_grade, } }, { new: true, runValidators: true }).then(moderator => {
                if (!moderator) {
                    return res.status(404).send()
                }
                else {
                    res.status(200).send(moderator)
                }
            }).catch(e => res.status(400).send(e))
        }
    },

    updateIdModToProjet: function (req, res) {
        // console.log('updateIdModToProjet')
        // console.log(req.body)
        const updates = Object.keys(req.body)
        const allowedUpdates = ['mod_id'];
        const isValidOperation = updates.length === 1 && updates[0] === 'mod_id';

        if (!isValidOperation) {
            return res.status(400).send({ error: 'Invalid updates!' })
        }

        Project.findOneAndUpdate({ "_id": req.params.id }, { "mod_id": req.body.mod_id }, { new: true, runValidators: true })
            .then(project => {
                if (!project) {
                    return res.status(404).send('There is no project')
                }
                else {
                    res.send(project)
                }
            }).catch(e => res.status(400).send(e))
    },


    downloadFile: function (req, res) {

        res.download('./uploads/' + req.params.path);
    },

    stopedProject: function (req, res) {
        Project.findOneAndUpdate({ "_id": req.params.id }, { "status": req.body.status }, { new: true, runValidators: true })
            .then(project => {
                if (!project) {
                    return res.status(404).send('There is no project')
                }
                else {
                    res.send(project)
                }
            }).catch(e => res.status(400).send(e));
    },


    deleteReport: function (req, res) {
        if (req.params.nameRpt === 'prop') {
            ProposalReport.deleteOne({ _id: req.params.id }, function (err) {
                if (!err) {
                    res.status(200).send();
                }
                else {
                    res.status(500).send()
                }
            });
        }

        else if (req.params.nameRpt === 'alfa') {
            AlfaReport.deleteOne({ _id: req.params.id }, function (err) {
                if (!err) {
                    res.status(200).send();
                }
                else {
                    res.status(500).send()
                }
            });
        }

        else if (req.params.nameRpt === 'beta') {
            BetaReport.deleteOne({ _id: req.params.id }, function (err) {
                if (!err) {
                    res.status(200).send();
                }
                else {
                    res.status(500).send()
                }
            });
        }

        else if (req.params.nameRpt === 'final') {
            FinalReport.deleteOne({ _id: req.params.id }, function (err) {
                if (!err) {
                    res.status(200).send();
                }
                else {
                    res.status(500).send()
                }
            });
        }
    },

    dltOldCoor: function (req, res) {
        Coordinator.deleteMany({}, function (err) {
            if (!err) {
                res.status(200).send();
            } else {
                res.status(500).send();
            }
        });
    },

    deleteRptTlt: function (req, res) {
        const nameRpt = req.params.nameRpt;
        if (nameRpt === 'prop') {
            ProposalReport.deleteOne({ propos_rpt_id: '0000' }, function (err) {
                if (!err) {
                    res.status(200).send();
                }
                else {
                    res.status(500).send()
                }
            });
        }

        else if (nameRpt === 'alfa') {
            AlfaReport.deleteOne({ alfa_rpt_id: '0001' }, function (err) {
                if (!err) {
                    res.status(200).send();
                }
                else {
                    res.status(500).send()
                }
            });
        }

        else if (nameRpt === 'beta') {
            BetaReport.deleteOne({ beta_rpt_id: '0010' }, function (err) {
                if (!err) {
                    res.status(200).send();
                }
                else {
                    res.status(500).send()
                }
            });
        }

        else if (nameRpt === 'final') {
            FinalReport.deleteOne({ final_rpt_id: '0011' }, function (err) {
                if (!err) {
                    res.status(200).send();
                }
                else {
                    res.status(500).send()
                }
            });
        }
    }
};