const express = require('express');
const projects_routes = require('./projects');
const multer = require('multer');
const path = require('path');

var router = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        const d = new Date();
        var date = d.getDate() + '.' + (d.getMonth() + 1) + '.' + d.getFullYear()
        var time = d.getHours() + '.' + d.getMinutes() + "." + d.getSeconds() + "." + d.getMilliseconds()
        var fullTime = date + " " + time;
        cb(null, file.fieldname + '-' + fullTime + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage,
    dest: 'uploads/'
});



router.post('/uploadProposalRep/:fileId/:fileName', upload.single('proposal_rpt'), projects_routes.createUploadPropRep);
router.post('/uploadAlfaRep/:fileId/:fileName', upload.single('alfa_rpt'), projects_routes.createUploadAlfaRep);
router.post('/uploadBetaRep/:fileId/:fileName', upload.single('beta_rpt'), projects_routes.createUploadBetaRep);
router.post('/uploadFinalRep/:fileId/:fileName', upload.single('final_rpt'), projects_routes.createUploadFinalRep);

router.post('/addproject', projects_routes.createProject);
router.post('/addmoderator', projects_routes.createModerator);
router.post('/addstudent', projects_routes.createStudent);
router.post('/addcoordinator', projects_routes.createCoordinator);
router.post('/addProjectToModerator/:modID', projects_routes.AddProjectToModerator);
router.post('/addProjectToJudge/:id_judge', projects_routes.AddProjectToJudge);
router.post('/addJudgesToProject/:id_pjt', projects_routes.AddJudgesToProject);
router.post('/saveGrdInPjt/:id_pjt', projects_routes.SaveGrdInPjt);
router.post('/dateOfSub', projects_routes.DateOfSub);
router.post('/createGrdDoc', projects_routes.CreateGradeDoc);
router.post('/createSubDoc', projects_routes.CreateSubDoc);
router.post('/addJudgeGrd/:id', projects_routes.addJudgeGrd);
router.post('/crtActvPjts', projects_routes.createActivePjts);
router.post('/sendEmail', projects_routes.sendEmailFirstSign);

router.get('/projects', projects_routes.getProjects);
router.get('/getModeratorPwd/:username', projects_routes.getPasswordMod);
router.get('/student/:id', projects_routes.getIdSdt);
router.get('/moderator/:id', projects_routes.getIdMod);
router.get('/getStudentPwd/:username', projects_routes.getPasswordSdt);
router.get('/getstudents', projects_routes.getStudents);
router.get('/getmoderators', projects_routes.getModerators);
router.get('/project/:id', projects_routes.getProject);
router.get('/getCoodinator', projects_routes.getCoodinator);
router.get('/getModeratorProjects/:id', projects_routes.getModeratorProjects);
router.get('/getemail/:id', projects_routes.getEmailMod);
router.get('/getdates', projects_routes.getDates);
router.get('/getModeratorProjectsJudge/:id/:idBtn', projects_routes.getModeratorProjectsJudge);
router.get('/download-file/:path', projects_routes.downloadFile);
router.get('/getPjts/:id_mod', projects_routes.getProjetsById);
router.get('/getGradeIdDoc/:id_mod', projects_routes.getGradeIdDoc);
router.get('/getGradeId/:id_pjt', projects_routes.getGradeId);
router.get('/getGrdDoc/:gradeId', projects_routes.getGrdsDoc);
router.get('/getSubDoc/:subId', projects_routes.getSubsDoc);
router.get('/getSdtbyPjtId/:id', projects_routes.getSdtbyPjtId);
router.get('/actvPjtsList', projects_routes.actvPjtsList);
router.get('/getModByIdDoc/:id', projects_routes.getModByIdDoc);
router.get('/checkRptUpload/:nameRpt', projects_routes.checkRptUpload);

router.put('/updatProject/:id', projects_routes.updateProject);
router.put('/updateStudent/:id', projects_routes.updateStudent);
router.put('/updateModerator/:id', projects_routes.updateModerator);
router.put('/updateIdModToProjet/:id', projects_routes.updateIdModToProjet);
router.put('/updateStudentIdPjt/:id', projects_routes.updateStudentIdPjt);
router.put('/saveGrade/:id', projects_routes.SaveGrades);
router.put('/saveSub/:id', projects_routes.SaveSubs);
router.put('/updateGrdDocId/:id_grd', projects_routes.UpdateGradeDocId);
router.put('/saveIdRptInSdt/:id_sdt/:nameRpt', projects_routes.saveIdRptInSdt);
router.put('/saveSubInPjt/:id_pjt', projects_routes.SaveSubInPjt);
router.put('/addJdgNameToActvPjts/:id', projects_routes.addJdgNameToActvPjts);
router.put('/updateActvPjts/:id', projects_routes.updateActvPjts);
router.put('/updateSubDates', projects_routes.updateSubDates);

router.put('/stpPjt/:id', projects_routes.stopedProject);
router.delete('/deleteRpt/:id/:nameRpt', projects_routes.deleteReport);
router.delete('/deleteRptTlt/:nameRpt', projects_routes.deleteRptTlt);
router.delete('/deleteOldCoor', projects_routes.dltOldCoor);


module.exports = router;