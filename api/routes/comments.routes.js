import express from "express"
const commentsRoutes = express.Router()
import { saveComment, getMyComments, getMyCommentsSent, sendResponseToOneComment, getResponsesToMyComments, viewPublicationComments } from "../controllers/comments.controllers.js"



commentsRoutes.post("/saveComment", saveComment)
commentsRoutes.get("/getPublicationComments/:userId", getMyComments)
commentsRoutes.post("/saveResponseToComment", sendResponseToOneComment)
commentsRoutes.get("/getResponsesToMyComments", getResponsesToMyComments)
commentsRoutes.get("/getAllMyComments")
commentsRoutes.get("/getMyCommentsSent/:userId", getMyCommentsSent)
commentsRoutes.put("/editComment/")
commentsRoutes.delete("/deleteMyComment/:id")
commentsRoutes.get("/viewPublicationComments/:idPublication", viewPublicationComments)




export default commentsRoutes;