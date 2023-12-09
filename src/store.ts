const ElectronStore = require('electron-store');

export const store = new ElectronStore({
  options: {
    projectName: 'nigel'
  },
  defaults: {
    devTools: false,
    databaseSettings: {
      type: 'sqlite',
      synchronize: true,
      logging: true,
      logger: 'simple-console',
      database: './database.sqlite'
    },
    windowOptions: {
      height: 800,
      width: 1200
    },
    settings: {
      ready: false,
      route: '/',
      general: {
        expanded: false,
        welcomeDisplayed: true
      },
      navigation: {
        expanded: false,
        sidenavPosition: 'start'
      },
      theme: {
        expanded: false
      }
    }
  },
  schema: {
    devTools: { type: 'boolean' },
    databaseSettings: {
      type: 'object',
      properties: {
        type: { type: 'string' },
        synchronize: { type: 'boolean' },
        logging: { type: 'boolean' },
        logger: { type: 'string' },
        database: { type: 'string' }
      },
      require: ['type', 'synchronize', 'logging', 'logger', 'database']
    },
    windowOptions: {
      type: 'object',
      properties: {
        height: { type: 'number' },
        width: { type: 'number' },
        x: { type: 'number' },
        y: { type: 'number' }
      },
      require: ['height', 'width']
    },
    settings: {
      type: 'object',
      properties: {
        ready: { type: 'boolean' },
        route: {
          type: 'string',
          enum: ['/', '/settings']
        },
        general: {
          type: 'object',
          properties: {
            expanded: { type: 'boolean' },
            welcomeDisplayed: { type: 'boolean' },
          },
          require: ['expanded', 'welcomeDisplayed']
        },
        navigation: {
          type: 'object',
          properties: {
            expanded: { type: 'boolean' },
            sidenavPosition: { type: 'string' }
          },
          require: ['expanded', 'sidenavPosition']
        },
        theme: {
          type: 'object',
          properties: {
            expanded: { type: 'boolean' }
          },
          require: ['expanded']
        }
      },
      require: ['ready', 'route', 'general', 'navigation', 'theme']
    }
  }
});
