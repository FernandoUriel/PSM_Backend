module.exports = {
  apps: [
    {
      name: 'PROSISM',
      script: './bin/www'
    }
  ],
  deploy: {
    production: {
      user: 'amaurytobias',
      host: 'amaurytq.me',
      ref: 'origin/master',
      repo: 'git@github.com:amaury-tobias/unire_backend.git',
      path: '/home/amaurytobias/production/unire_backend',
      'post-deploy': 'npm install && pm2 startOrRestart ecosystem.config.js'
    }
  }
}
