const { login } = require('../models/user');

const getLogin = async(req, res) => {
  res.render('login');
}

const postLogin = db => async(req, res) =>{
  try{
    const user = await login(db)(req.body.email, req.body.passwd);
    req.session.user = user;
    res.redirect('/');
  }catch(err){
    res.send('Error ' +err);
  }
} 

const logout = (req, res) => {
  req.session.destroy(() => {

  })
  res.redirect('/');
}

module.exports = {
  getLogin,
  postLogin,
  logout,
}