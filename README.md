# sml

a simple DSL modeling lang to target plantuml

# getting started

# DSL

## usecase - 用例图

```typescript
sml.UsecaseDiagram(title, (ml) => {
  const user = ml.actor('user')
  const uc1 = ml.usecase('blog')
  const us2 = ml.usecase('music')
  const us3 = ml.usecase('play')

  user.link([uc1, us2, us3], (l) => l.commentOf(`like`))
})
```

## class - 类视图

## component - 组件视图

## deployment - 部署视图

## json - json 视图

```ts
sml.JsonDiagram(title, (ml) => {
  ml.highlights(['lastName', 'address.city', 'phoneNumbers.0.number']).json({
    firstName: 'John',
    lastName: 'Smith',
    isAlive: true,
    age: 28,
    address: {
      streetAddress: '21 2nd Street',
      city: 'New York',
      state: 'NY',
      postalCode: '10021-3100',
    },
    phoneNumbers: [
      {
        type: 'home',
        number: '212 555-1234',
      },
      {
        type: 'office',
        number: '646 555-4567',
      },
    ],
    children: [],
    spouse: null,
  })
})
```

## yaml - yaml 视图

```typescript
sml.YamlDiagram(title, (ml) => {
  ml.highlights(['french-hens', 'xmas-fifth-day.partridges']).yaml(
    `doe: "a deer, a female deer"
ray: "a drop of golden sun"
pi: 3.14159
xmas: true
french-hens: 3
calling-birds:
	- huey
	- dewey
	- louie
	- fred
xmas-fifth-day:
	calling-birds: four
	french-hens: 3
	golden-rings: 5
	partridges:
		count: 1
		location: "a pear tree"
	turtle-doves: two`,
  )
})
```

```

```
