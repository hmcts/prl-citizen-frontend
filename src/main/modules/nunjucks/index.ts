// import * as path from 'path';

// import * as express from 'express';
// import * as nunjucks from 'nunjucks';

// export class Nunjucks {
//   constructor(public developmentMode: boolean) {
//     this.developmentMode = developmentMode;
//   }

//   enableFor(app: express.Express): void {
//     app.set('view engine', 'njk');
//     const govUkFrontendPath = path.join(__dirname, '..', '..', '..', '..', 'node_modules', 'govuk-frontend');
//     nunjucks.configure([path.join(__dirname, '..', '..', 'views'), govUkFrontendPath], {
//       autoescape: true,
//       watch: this.developmentMode,
//       express: app,
//     });

//     app.use((req, res, next) => {
//       res.locals.pagePath = req.path;
//       next();
//     });
//   }
// }

import path from 'path';

import express from 'express';
import nunjucks from 'nunjucks';

import { FormInput } from '../../app/form/Form';

export class Nunjucks {
  enableFor(app: express.Express): void {
    app.set('view engine', 'njk');
    const govUkFrontendPath = path.join(__dirname, '..', '..', '..', '..', 'node_modules', 'govuk-frontend');
    const hmctsFrontendPath = path.join(__dirname, '..', '..', '..', '..', 'node_modules', '@hmcts', 'frontend');
    const commonForC100 = path.join(__dirname, '..', '..', 'steps', 'c100-rebuild', 'common');
    const env = nunjucks.configure(
      [path.join(__dirname, '..', '..', 'steps'), govUkFrontendPath, hmctsFrontendPath, commonForC100],
      {
        autoescape: true,
        watch: app.locals.developmentMode,
        express: app,
      }
    );

    env.addGlobal('getContent', function (prop): string {
      return typeof prop === 'function' ? prop(this.ctx) : prop;
    });

    env.addGlobal('getError', function (fieldName: string): { text?: string } | boolean {
      const { /*form,*/ sessionErrors, errors } = this.ctx;
      //const hasMoreThanTwoFields = new Form(form.fields).getFieldNames().size >= 2;
      if (!sessionErrors?.length /*|| !hasMoreThanTwoFields*/) {
        return false;
      }

      const fieldError = sessionErrors.find(error => error.propertyName === fieldName);
      if (!fieldError) {
        return false;
      }

      return { text: errors[fieldName][fieldError.errorType] };
    });

    env.addGlobal('formItems', function (items: FormInput[], userAnswer: string | Record<string, string>) {
      return items.map(i => {
        const itemConfig = {
          id: i.id,
          text: this.env.globals.getContent.call(this, i.label),
          name: i.name,
          classes: i.classes,
          disabled: i.disabled,
          value: i.value ?? userAnswer?.[i.name as string] ?? (userAnswer as string),
          attributes: i.attributes,
          checked: i.selected ?? userAnswer?.[i.name as string]?.includes(i.value as string) ?? i.value === userAnswer,
          hint: i.hint && {
            html: this.env.globals.getContent.call(this, i.hint),
          },
          //divider: this.env.globals.getContent.call(this, i.divider),
          divider:
            typeof i.divider === 'function' ? this.env.globals.getContent.call(this, i.divider) : i.divider && 'or',
          behaviour: (i.exclusive && 'exclusive') || this.env.globals.getContent.call(this, i.behaviour),
          open: i.open,
          conditional: (() => {
            if (i.warning) {
              return {
                html: env.render(`${__dirname}/../../steps/common/error/warning.njk`, {
                  message: this.env.globals.getContent.call(this, i.warning),
                  warning: this.ctx.warning,
                }),
              };
            } else if (i.conditionalText) {
              return {
                html: this.env.globals.getContent.call(this, i.conditionalText),
              };
            } else if (i.subFields) {
              return {
                html: env.render(`${__dirname}/../../steps/common/form/fields.njk`, {
                  ...this.ctx,
                  form: { fields: i.subFields },
                }),
              };
            } else {
              return undefined;
            }
          })(),
        };

        if (i.name && ['day', 'month', 'year'].includes(i.name)) {
          Object.assign(itemConfig, {
            label: this.env.globals.getContent.call(this, i.label),
          });
        }

        return itemConfig;
      });
    });

    env.addGlobal('summaryDetailsHtml', function (subFields: FormInput) {
      return env.render(`${__dirname}/../../steps/common/form/fields.njk`, {
        ...this.ctx,
        form: { fields: subFields },
      });
    });

    env.addFilter('json', function (value, spaces) {
      if (value instanceof nunjucks.runtime.SafeString) {
        value = value.toString();
      }
      const jsonString = JSON.stringify(value, null, spaces).replace(/</g, '\\u003c');
      return new nunjucks.runtime.SafeString(jsonString);
    });

    env.addFilter('uniqueConfidentials', array => {
      return [...new Map(array.map(item => [item['name'], item])).values()];
    });

    env.addFilter('orderStringParser', str => {
      const orderNumber = str
        .split('')
        .map(num => {
          if (Number.isInteger(Number(num))) {
            return num;
          }
        })
        .filter(num => num !== undefined)
        .join('');
      return orderNumber;
    });

    app.use((req, res, next) => {
      res.locals.host = req.headers['x-forwarded-host'] || req.hostname;
      res.locals.pagePath = req.path;
      res.locals.serviceType = 'PRLAPPS';
      env.addGlobal('currentHost', req.headers?.host?.toLowerCase());
      next();
    });
  }
}
