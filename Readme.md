run redis
```bash
docker-compose --env-file=./packages/backend/.env  up --build
```

install dependencies
```bash
cd ./packages/backend && npm i && cd ../frontend && npm i && cd ../../
```

 run backend
```bash
cd ./packages/backend && npm run dev
```

run process.ts
```bash
npm run process
```

run frontend
```bash
cd ../frontend && npm run serve
```
