all: angular-prod

angular-prod:
	npm install && npx ng build --prod

deploy: angular-prod
	git checkout -f gh-pages || git checkout --orphan=gh-pages
	git rm -rf --cached .
	git reset .
	for fn in dist/resume/*; do rm -rf $$(basename $$fn) && mv $$fn . && git add $$(basename $$fn); done
	git commit -m 'Deploy GitHub pages site'
	git branch --set-upstream-to="$$(git config "branch.main.remote")/gh-pages"; true


.PHONY: angular-prod deploy
