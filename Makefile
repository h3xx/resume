all: angular-prod

angular-prod:
	npm install && npx ng build --prod

deploy: angular-prod
	git branch -D gh-pages; true
	git checkout --orphan=gh-pages
	git reset .
	for fn in dist/resume/*; do mv $$fn . && git add $$(basename $$fn); done
	git commit -m 'Deploy GitHub pages site'


.PHONY: angular-prod deploy
