import { Application } from 'express';

import { REASONABLE_ADJUSTMENTS_BACK_URL } from '../../steps/urls';

import { RAProvider } from './index';

export class ReasonableAdjustmentsRoute {
  public routes: string[];

  constructor() {
    this.routes = [REASONABLE_ADJUSTMENTS_BACK_URL];
  }

  enable(app: Application): void {
    const { errorHandler } = app.locals;
    app.get(this.routes[0], errorHandler(RAProvider.controller.handleBackNavigation));
  }
}

export const RARoute = new ReasonableAdjustmentsRoute();
