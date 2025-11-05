module.exports = {
  apps: [
    {
      name: 'frontend-app',
      script: 'npx',
      args: 'serve -s . -l 3001',
      cwd: process.env.VPS_DEPLOY_PATH || '/var/www/frontend',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'production',
        PORT: 3001
      },
      error_file: './logs/err.log',
      out_file: './logs/out.log',
      log_file: './logs/combined.log',
      time: true
    }
  ]
};
