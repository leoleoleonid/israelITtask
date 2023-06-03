run dev
```bash
docker-compose  up --build
```

run prod (only to test locally and build prod images)
```bash
docker-compose -f ./docker-compose.prod.yml up -V --build
```

go to localhost:3000/api