import express from "express"
import bodyParser from "body-parser"
import cors from "cors"
import usersRoutes from "./routes/users.routes.js"
import publicationsRoutes from "./routes/publications.routes.js"
import connectDataBase from "./database/connectdb.js"
import commentsRoutes from "./routes/comments.routes.js"
import notificationsRoutes from "./routes/notifications.routes.js"
import surveyRoutes from "./routes/survey.routes.js"


const app = express()
const port = 4000

app.use(express.json())
app.use(express.text())
app.use(cors())

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json({type:"*/*"}))
app.use(express.urlencoded({extended:true}))

app.use(usersRoutes)
app.use(publicationsRoutes)
app.use(commentsRoutes)
app.use(notificationsRoutes)
app.use(surveyRoutes)


app.get('/', (req, res) => {
    res.send('Citizens App Server is Correctly Upload')
  })
  
app.listen(port, () => {
    console.log(`El servidor esta funcionando correctamente en el puerto ${port} ✔✔`)
    connectDataBase()
   
  })

  