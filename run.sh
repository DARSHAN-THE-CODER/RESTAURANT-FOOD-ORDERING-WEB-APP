echo "Installing Frontend dependencies"
yarn
echo "Installing backend dependencies"
cd backend && cp .env.example .env && npm i
cd ..
yarn add -D concurrently
yarn start
