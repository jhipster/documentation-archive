mkdir public
git clone https://github.com/jhipster/jhipster.github.io.git
cd jhipster.github.io
for tag in $(git tag)
do
    mkdir ../public/$tag
    chmod 777 ../public/$tag

	  echo "Building docs for $tag"
    rm Gemfile
    git checkout $tag
cat >  _config-baseurl.yml << EOF
baseurl: /$tag
url: /$tag
EOF

if [ ! -f Gemfile ]
then
    echo "gem 'github-pages'">Gemfile
fi
    bundle install
    bundle exec jekyll build -d ../public/$tag --config _config.yml,_config-baseurl.yml
done
