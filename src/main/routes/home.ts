import { Application } from 'express';
import { commonJson } from '../steps/content'

export default function (app: Application): void {
  app.get('/', (req, res) => {
    res.render('home', commonJson);
  });
}
