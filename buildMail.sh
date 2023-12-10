BASE_PATH=$PWD

# Compile handlebars templates
compile_templates() {
  echo "Compiling mail templates..."

  cd $BASE_PATH/src/lib/server/mail/templates
  rm -rf ./*/build

  for dir in */; do
    mkdir ./$dir/build
    echo "import Handlebars from 'handlebars';" > ./$dir/build/templates.ts
    npx handlebars ./$dir/* >> ./$dir/build/templates.ts
  done
}


# Transform images to base64
transform_images() {
  echo "Transforming mail images..."

  cd $BASE_PATH/src/lib/server/mail/images
  rm -rf ./build
  mkdir ./build

  for img in *.png; do
    cat $img | base64 >> ./build/${img%.png}.txt
  done
}

if [ -z $1 ]; then
  compile_templates
  transform_images
elif [ $1 == "templates" ]; then
  compile_templates
elif [ $1 == "images" ]; then
  transform_images
fi
