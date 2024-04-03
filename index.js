import express from 'express'
import csvtojson from 'csvtojson'
import multer from 'multer'
const upload = multer({ dest: 'uploads/' })
import cors from 'cors'

const app = express()
app.use(express.json())
app.use(cors())


app.get('/', (req, res) => {
  res.send("hello")
})

app.post('/upload', upload.single('csvFile'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const jsonArray = await csvtojson().fromFile(req.file.path);

    res.status(200).json({ message: 'Data inserted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/add-faculty', upload.single('csvFile'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const jsonArray = await csvtojson().fromFile(req.file.path);

    res.status(200).json({ message: 'Faculty Data inserted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/og', async (req, res) => {
  await organizeStudents().then((e) => { res.send("ok") })
})

app.get('/fetch', async (req, res) => {
  const data = await Faculty.find({}).then((e) => { res.send(e) })
})

app.listen('3001', () => {
  console.log('server is running on http://127.0.0.1:3001')
})