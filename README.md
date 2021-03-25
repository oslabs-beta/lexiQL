# lexiQL

An open-source GraphQL tool that visualizes your relational database relationships and facilitates GraphQL API prototyping and configuration. Currently in production.

COMING APRIL 2021!



added to webpack:

    fallback: {
      'stream': false,
      'fs': false,
      'constants': false,
      'os': false,
      'inspector': false,
      'child_process': false,
      'worker_threads': false,
      'vm': false,
      "https": false,
      'crypto': require.resolve('crypto-browserify')
    },