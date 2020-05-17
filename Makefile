all: angular-prod

angular-prod:
	cd site && npm install && npx ng build --prod

deploy: angular-prod
	git branch -D gh-pages; true
	git checkout --orphan=gh-pages
	git reset .
	for fn in site/dist/resume/*; do mv $$fn . && git add $$(basename $$fn); done
	git commit -m 'Deploy GitHub pages site'


.PHONY: angular-prod deploy
