echo "Installing Frontend dependencies"
yarn
echo "Installing backend dependencies"
cd backend && npm i
cd ..
yarn add -D concurrently
yarn start
