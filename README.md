shows device not found if using HTTP in LAN instead of using HTTPS
frontend and backend also need to use SSL cert for webRTC to find out the device
for localhost, HTTP is fine

server addr: 5443
backend addr: 5442
frontend addr: 4200

run frontend:
npx ng serve --ssl --host 0.0.0.0

run backend:
npm run dev:start

run server:
docker-compose up