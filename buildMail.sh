cd src/lib/server/mail/templates
rm -rf ./*/build

for dir in */; do
  mkdir ./$dir/build
  echo "import Handlebars from 'handlebars';" > ./$dir/build/templates.ts
  npx handlebars ./$dir/* >> ./$dir/build/templates.ts
done
