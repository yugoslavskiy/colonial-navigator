#!/usr/bin/env bash
# Сборка трёх языковых эндпоинтов Навигатора в один dist:
#   dist/browser/      — ru (интерфейс и данные по-русски,   /navigator/)
#   dist/browser/en/   — en (                                /navigator/en/)
#   dist/browser/uk/   — uk (                                /navigator/uk/)
# ng build выполняется ОДИН раз: язык интерфейса пайп tr берёт из <html lang>,
# данные — из assets/config.json; обе вещи патчатся в копиях.
# Деплой как раньше: ghp-import -n -p nav-app/dist/browser
set -euo pipefail
cd "$(dirname "$0")/nav-app"

npx ng build --output-path ./dist --base-href /navigator/

BROWSER=./dist/browser
for lang in en uk; do
    rm -rf "$BROWSER/$lang"
    mkdir -p "$BROWSER/$lang"
    # копия всего, кроме языковых подпапок
    find "$BROWSER" -mindepth 1 -maxdepth 1 ! -name en ! -name uk -exec cp -R {} "$BROWSER/$lang/" \;
    # язык интерфейса + base href
    sed -i '' -e "s|lang=\"en\"|lang=\"$lang\"|" \
              -e "s|<base href=\"/navigator/\"|<base href=\"/navigator/$lang/\"|" \
              "$BROWSER/$lang/index.html"
    # данные и дефолтный слой языка
    sed -i '' -e "s|/stix/russia-colonialism.json|/stix/russia-colonialism-$lang.json|g" \
              -e "s|/stix/colonial_full_layer.json|/stix/colonial_full_layer-$lang.json|g" \
              "$BROWSER/$lang/assets/config.json"
done
# корень — русский интерфейс (base href и данные уже правильные)
sed -i '' -e "s|lang=\"en\"|lang=\"ru\"|" "$BROWSER/index.html"

echo "Готово: $BROWSER (ru), $BROWSER/en, $BROWSER/uk"
