#Makefile
install:
	npm install
start:
	npm run babel-node -- src/bin/gendiff.js
publish:
	npm publish
lint:
	npm run eslint ./src
build:
	npm run build
test:
	npm run test
watch-test:
	npm run test -- --watchAll