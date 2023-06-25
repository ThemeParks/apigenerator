# Client Generator

Generates OpenAPI clients to interact with ThemeParks.wiki

## Usage

Requires the v1.yaml file to exist at ../themeparksapi/docs/v1.yaml

```
npm start
```

Will checkout folders in parent directory to this script, titled "tpw_clients". Then generate updated clients ready for committing.

To auto-commit, you can run:

```
npm run commit
```

## Configuration

Configure client outputs in config.json

openapitools.json will be automatically updated during generation.

## Publishing

### JavaScript

Bump version in config.json, then run the generator above.

```
npm run build
npm publish
```

### Python

Bump version in config.json, then run the generator above.

```
python setup.py sdist
twine upload .\dist\*
```