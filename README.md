# Audio Analysis Project

Task to implement extract audio metadata using nodejs & typescript.

# Steps to run this project.

1. Clone repository into your local machine `git clone https://github.com/mohammad-quanit/audio-analysis.git`
2. Go to the directory by `cd audio-analysis` and run `yarn install` to install dependencies.
3. This project is configured using typescript, and all scripts are available in `package.json`
4. After installing deps, run this project using the command `yarn start` and a web server will be up and running.

# API Documentation

1. a POST endpoint `http://localhost:3000/api/v1/file-upload` will be up after running the server.
2. You can use Postman or simply cURL to hit the endpoint. e.g
### Request
``` bash
  curl  -X POST \
  'http://localhost:3000/api/v1/file-upload' \
  --form 'file=@/yourpath/sample.mp3'
```

### Response
``` json
{
  "frameCount": 6089
}
```
