# recruitment-server-cntt2
Server for Recruitment website

Login Admin: admin/admin
Login User: user/user

# -- Config debug --
{
    "version": "0.2.0",
    "configurations": [
        {
            "console": "integratedTerminal",
            "internalConsoleOptions": "neverOpen",
            "name": "Debug Express",
            "program": "${workspaceFolder}/index.ts",
            "request": "launch",
            "restart": true,
            "skipFiles": [
                "<node_internals>/**"
            ],
            "type": "pwa-node",
            "runtimeExecutable": "yarn",
            "runtimeArgs": [
                "dev-debug"
            ],
            "env": {
                "PORT": "3000"
            }
        }
    ]
}

# For connect DB Local
Download Mariadb in website: https://mariadb.org/download/?t=mariadb&p=mariadb&r=11.1.1&os=windows&cpu=x86_64&pkg=msi&m=bkns

Config mariadb local:
port: 3306
username: root
password: 1234

Config mariadb production:
DB_USERNAME=root
DB_PASSWORD=1234
DB_DATABASE=recruitment_cntt2
DB_HOST=localhost

# For deployment
BASE_URL = https://ws-recruitment-43540c5ce7c7.herokuapp.com

# -- Download file in production
heroku ps:copy login-2023-07-18.log --app ws-recruitment

