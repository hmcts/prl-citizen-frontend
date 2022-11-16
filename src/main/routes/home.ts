import { Application } from 'express';

export default function (app: Application): void {
  app.get('/', (req, res) => {
    console.log(req);
    res.render('home');
  });
}
