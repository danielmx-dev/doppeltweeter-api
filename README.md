# Runing this webtask

Update secrets.env with the required information

## Webtask CLI

Run the following command to upload the webtask
```
  wt create --bundle src/tasks/api.js --bundle-minify --secrets-file secrets.env
```
