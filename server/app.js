const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express();

const {mongoose} = require('./database');

//settings
app.set('port', process.env.PORT || 3000);

//middlewares
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

//routes
app.use('/api/usuarios', require('./routes/user.routes'));
app.use('/api/registros', require('./routes/register.routes'));

//starting server
app.listen(app.get('port'), ()=>{
    console.log('Server on port '+app.get('port'));
})