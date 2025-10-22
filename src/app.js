import express from 'express';
import startLoader from './loaders/index.js';
import constant from './constant.js';



const app = express();

app.listen(constant.PORT, ()=>{
    console.log(`Server is listening on port: ${constant.PORT} 💪 `);
});

startLoader(app);