# ---- Base image ----
FROM hmctspublic.azurecr.io/base/node:20-alpine as base
USER root
RUN corepack enable
COPY --chown=hmcts:hmcts . .
USER hmcts
RUN yarn workspaces focus --all --production && rm -rf $(yarn cache clean)

# ---- Build image ----
FROM base as build
RUN PUPPETEER_SKIP_DOWNLOAD=true yarn install && yarn build:prod

# ---- Runtime image ----
FROM base as runtime
RUN rm -rf webpack/ webpack.config.js
COPY --from=build $WORKDIR/src/main ./src/main
# TODO: expose the right port for your application
EXPOSE 3001

#
HEALTHCHECK --interval=30s --timeout=15s --start-period=60s --retries=3 \
    CMD wget -q --spider localhost:3001/health || exit 1
